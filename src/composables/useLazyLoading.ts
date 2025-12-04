/**
 * @fileoverview Vue 3 composable for lazy loading chart data.
 *
 * This composable monitors the visible range of a chart and automatically
 * requests more data when the user scrolls near the edges of loaded data.
 * It implements the infinite history loading pattern.
 */

import { ref, watch, onUnmounted, type Ref } from 'vue';
import type { IChartApi, LogicalRange, Time, BusinessDay } from 'lightweight-charts';
import type { SeriesConfig, LazyLoadingConfig, DataPoint } from '../types';
import { normalizeTime } from '../utils/time';

/**
 * Helper to safely convert Time (UTCTimestamp or BusinessDay) to seconds.
 * BusinessDay objects need special handling - can't be passed to normalizeTime.
 */
function timeToSeconds(time: Time): number {
  // Check if it's a BusinessDay object
  if (typeof time === 'object' && time !== null && 'year' in time && 'month' in time && 'day' in time) {
    const bd = time as BusinessDay;
    // Convert BusinessDay to UTC timestamp (seconds since epoch)
    // Treat as midnight UTC of that day
    const date = new Date(Date.UTC(bd.year, bd.month - 1, bd.day));
    return Math.floor(date.getTime() / 1000);
  }

  // Otherwise it's a UTCTimestamp or string - use normalizeTime
  return normalizeTime(time as any);
}

/**
 * Calculate average bar spacing from data.
 * Returns the average time difference between consecutive bars in seconds.
 * Returns null if insufficient data (< 2 bars).
 */
function calculateAverageBarSpacing(data: DataPoint[]): number | null {
  if (!data || data.length < 2) return null;

  // Sample first 100 bars for performance (sufficient to estimate spacing)
  const sampleSize = Math.min(100, data.length);
  let totalSpacing = 0;
  let spacingCount = 0;

  for (let i = 1; i < sampleSize; i++) {
    const prevTime = normalizeTime(data[i - 1].time);
    const currTime = normalizeTime(data[i].time);
    const spacing = currTime - prevTime;

    // Only count positive spacings (data should be sorted ascending)
    if (spacing > 0) {
      totalSpacing += spacing;
      spacingCount++;
    }
  }

  return spacingCount > 0 ? totalSpacing / spacingCount : null;
}

/**
 * State for tracking lazy loading per series.
 */
interface SeriesLazyState {
  seriesId: string;
  paneId: number;
  lazyLoading: LazyLoadingConfig;
  isLoadingBefore: boolean;
  isLoadingAfter: boolean;
  lastRequestTime: number;
  // Cached normalized timestamps for performance (avoid recomputing on every scroll)
  minTime: number | null;
  maxTime: number | null;
  // Cached average bar spacing in seconds (derived from data, not hardcoded)
  averageBarSpacing: number | null;
}

/**
 * Lazy loading state returned by the composable.
 */
export interface UseLazyLoadingState {
  /** Whether any series is currently loading */
  isLoading: Ref<boolean>;
  /** Map of series ID to loading state */
  loadingStates: Ref<Map<string, SeriesLazyState>>;
  /** Set of pending request keys */
  pendingRequests: Ref<Set<string>>;
}

/**
 * Lazy loading methods returned by the composable.
 */
export interface UseLazyLoadingMethods {
  /** Manually trigger a history request */
  requestHistory: (
    seriesId: string,
    beforeTime: number,
    direction: 'before' | 'after'
  ) => void;
  /** Update lazy loading state after receiving history */
  handleHistoryResponse: (
    seriesId: string,
    direction: 'before' | 'after',
    hasMoreBefore: boolean,
    hasMoreAfter: boolean
  ) => void;
  /** Reset all loading states */
  reset: () => void;
  /** Manually sync bounds for a series after data changes */
  syncBounds: (seriesId: string) => void;
}

/**
 * Return type of the useLazyLoading composable.
 */
export type UseLazyLoadingReturn = UseLazyLoadingState & UseLazyLoadingMethods;

/**
 * Options for the useLazyLoading composable.
 */
export interface UseLazyLoadingOptions {
  /** Chart API instance ref */
  chart: Ref<IChartApi | null>;
  /** Series configurations ref */
  seriesConfigs: Ref<SeriesConfig[]>;
  /** Threshold (in bars) to trigger loading more data */
  loadThreshold?: number;
  /** Debounce delay in milliseconds */
  debounceMs?: number;
  /** Callback to request history from backend */
  onRequestHistory: (
    seriesId: string,
    paneId: number,
    beforeTime: number,
    direction: 'before' | 'after',
    count: number
  ) => void;
  /** Callback when history is loaded */
  onHistoryLoaded?: (seriesId: string, data: DataPoint[]) => void;
}

/**
 * Vue 3 composable for lazy loading chart data.
 *
 * This composable subscribes to the chart's time scale changes and automatically
 * requests more data when the user scrolls near the boundaries of loaded data.
 *
 * @param options - Lazy loading configuration options
 * @returns Lazy loading state and methods
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { ref } from 'vue';
 * import { useLazyLoading, useChartApi } from '@lightweight-charts-pro/vue3';
 * import type { IChartApi } from 'lightweight-charts';
 *
 * const chart = ref<IChartApi | null>(null);
 * const seriesConfigs = ref([
 *   {
 *     seriesId: 'price',
 *     seriesType: 'candlestick',
 *     data: [],
 *     lazyLoading: {
 *       enabled: true,
 *       chunkSize: 500,
 *       hasMoreBefore: true,
 *       hasMoreAfter: false,
 *     }
 *   }
 * ]);
 *
 * const { getHistory } = useChartApi();
 *
 * const { isLoading, handleHistoryResponse } = useLazyLoading({
 *   chart,
 *   seriesConfigs,
 *   onRequestHistory: async (seriesId, paneId, beforeTime, direction, count) => {
 *     const response = await getHistory('my-chart', paneId, seriesId, beforeTime, count);
 *     handleHistoryResponse(seriesId, direction, response.hasMoreBefore, response.hasMoreAfter);
 *   }
 * });
 * </script>
 * ```
 */
export function useLazyLoading(options: UseLazyLoadingOptions): UseLazyLoadingReturn {
  const {
    chart,
    seriesConfigs,
    loadThreshold = 50,
    debounceMs = 300,
    onRequestHistory,
  } = options;

  // Reactive state
  const isLoading = ref(false);
  const loadingStates = ref<Map<string, SeriesLazyState>>(new Map());
  const pendingRequests = ref<Set<string>>(new Set());

  // Internal state
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  let unsubscribe: (() => void) | null = null;

  /**
   * Initialize lazy loading states from series configs.
   * Preserves existing loading states for in-flight requests.
   * Caches min/max normalized timestamps for performance.
   */
  function initializeStates(): void {
    const newStates = new Map<string, SeriesLazyState>();

    seriesConfigs.value.forEach((config, index) => {
      if (config.lazyLoading?.enabled) {
        const seriesId = config.seriesId || config.name || `series_${index}`;
        const existingState = loadingStates.value.get(seriesId);

        // Cache normalized min/max timestamps and average bar spacing for performance
        let minTime: number | null = null;
        let maxTime: number | null = null;
        let averageBarSpacing: number | null = null;
        if (config.data?.length) {
          const firstDataTime = config.data[0]?.time;
          const lastDataTime = config.data[config.data.length - 1]?.time;
          if (firstDataTime) minTime = normalizeTime(firstDataTime);
          if (lastDataTime) maxTime = normalizeTime(lastDataTime);

          // Calculate average bar spacing from data (replaces hardcoded 60s assumption)
          averageBarSpacing = calculateAverageBarSpacing(config.data);
        }

        // Preserve loading state if series already exists and has pending requests
        if (existingState && (existingState.isLoadingBefore || existingState.isLoadingAfter)) {
          newStates.set(seriesId, {
            ...existingState,
            lazyLoading: { ...config.lazyLoading },
            paneId: config.paneId || 0,
            minTime,
            maxTime,
            averageBarSpacing,
          });
        } else {
          newStates.set(seriesId, {
            seriesId,
            paneId: config.paneId || 0,
            lazyLoading: { ...config.lazyLoading },
            isLoadingBefore: false,
            isLoadingAfter: false,
            lastRequestTime: 0,
            minTime,
            maxTime,
            averageBarSpacing,
          });
        }
      }
    });

    // Clean up pending requests for series that no longer exist
    const seriesIds = new Set(newStates.keys());
    const keysToDelete: string[] = [];
    pendingRequests.value.forEach((key) => {
      const seriesId = key.split('_')[0];
      if (!seriesIds.has(seriesId)) {
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach((key) => pendingRequests.value.delete(key));

    loadingStates.value = newStates;
  }

  /**
   * Request historical data for a series.
   */
  function requestHistory(
    seriesId: string,
    beforeTime: number,
    direction: 'before' | 'after'
  ): void {
    const state = loadingStates.value.get(seriesId);
    if (!state) return;

    // Prevent duplicate requests
    const requestKey = `${seriesId}_${direction}`;
    if (pendingRequests.value.has(requestKey)) {
      return;
    }

    // Check if we can load more in this direction
    if (direction === 'before' && !state.lazyLoading.hasMoreBefore) {
      return;
    }
    if (direction === 'after' && !state.lazyLoading.hasMoreAfter) {
      return;
    }

    // Mark as loading
    pendingRequests.value.add(requestKey);
    if (direction === 'before') {
      state.isLoadingBefore = true;
    } else {
      state.isLoadingAfter = true;
    }
    state.lastRequestTime = Date.now();
    isLoading.value = true;

    // Call the request callback
    onRequestHistory(
      seriesId,
      state.paneId,
      beforeTime,
      direction,
      state.lazyLoading.chunkSize
    );
  }

  /**
   * Handle history response and update loading state.
   * CRITICAL: Also updates cached min/max timestamps from seriesConfigs.
   */
  function handleHistoryResponse(
    seriesId: string,
    direction: 'before' | 'after',
    hasMoreBefore: boolean,
    hasMoreAfter: boolean
  ): void {
    const state = loadingStates.value.get(seriesId);
    if (!state) return;

    // Update loading state
    const requestKey = `${seriesId}_${direction}`;
    pendingRequests.value.delete(requestKey);

    if (direction === 'before') {
      state.isLoadingBefore = false;
      state.lazyLoading.hasMoreBefore = hasMoreBefore;
    } else {
      state.isLoadingAfter = false;
      state.lazyLoading.hasMoreAfter = hasMoreAfter;
    }

    // CRITICAL: Update cached min/max timestamps and bar spacing after history merge
    // Find the series config to get updated data boundaries
    const config = seriesConfigs.value.find(
      (c, i) => (c.seriesId || c.name || `series_${i}`) === seriesId
    );

    if (config?.data?.length) {
      const firstDataTime = config.data[0]?.time;
      const lastDataTime = config.data[config.data.length - 1]?.time;

      if (firstDataTime) {
        state.minTime = normalizeTime(firstDataTime);
      }
      if (lastDataTime) {
        state.maxTime = normalizeTime(lastDataTime);
      }

      // Recalculate average bar spacing with new data
      state.averageBarSpacing = calculateAverageBarSpacing(config.data);
    }

    // Update global loading state
    isLoading.value = Array.from(loadingStates.value.values()).some(
      (s) => s.isLoadingBefore || s.isLoadingAfter
    );
  }

  /**
   * Check if we need to load more data based on visible range.
   * Uses cached normalized timestamps for performance (avoids recomputing on every scroll).
   * Time-based boundaries ensure accuracy with gappy/irregular series.
   */
  function checkAndLoadData(logicalRange: LogicalRange | null): void {
    if (!logicalRange || !chart.value) return;

    // Get visible time range from the chart
    const timeScale = chart.value.timeScale();
    const visibleRange = timeScale.getVisibleRange();
    if (!visibleRange) return;

    // Convert visible range to normalized timestamps (seconds)
    // Use timeToSeconds to handle both UTCTimestamp and BusinessDay
    const visibleFromTime = timeToSeconds(visibleRange.from as Time);
    const visibleToTime = timeToSeconds(visibleRange.to as Time);

    // Validate converted times (check for NaN)
    if (isNaN(visibleFromTime) || isNaN(visibleToTime)) {
      return;
    }

    loadingStates.value.forEach((state, seriesId) => {
      if (!state.lazyLoading.enabled) return;

      // Use cached min/max timestamps - avoids array access and normalizeTime() calls
      const minTime = state.minTime;
      const maxTime = state.maxTime;

      if (minTime === null || maxTime === null) return;

      // Calculate time threshold based on actual bar spacing (not hardcoded 60s)
      // If bar spacing unknown, fallback to 60s for 1-minute bars
      const barSpacing = state.averageBarSpacing || 60;
      const timeThreshold = loadThreshold * barSpacing;

      // Check if we're near the start (visible range approaching first data point)
      if (
        state.lazyLoading.hasMoreBefore &&
        !state.isLoadingBefore &&
        visibleFromTime <= minTime + timeThreshold
      ) {
        requestHistory(seriesId, minTime, 'before');
      }

      // Check if we're near the end (visible range approaching last data point)
      if (
        state.lazyLoading.hasMoreAfter &&
        !state.isLoadingAfter &&
        visibleToTime >= maxTime - timeThreshold
      ) {
        requestHistory(seriesId, maxTime, 'after');
      }
    });
  }

  /**
   * Debounced range change handler.
   */
  function handleVisibleRangeChange(logicalRange: LogicalRange | null): void {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(() => {
      checkAndLoadData(logicalRange);
    }, debounceMs);
  }

  /**
   * Subscribe to chart's visible range changes.
   */
  function subscribeToChart(): void {
    if (!chart.value) return;

    // Unsubscribe first if already subscribed to prevent memory leaks
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }

    // Check if any series has lazy loading enabled
    const hasLazyLoading = Array.from(loadingStates.value.values()).some(
      (state) => state.lazyLoading.enabled
    );

    if (!hasLazyLoading) return;

    const timeScale = chart.value.timeScale();
    timeScale.subscribeVisibleLogicalRangeChange(handleVisibleRangeChange);

    unsubscribe = () => {
      timeScale.unsubscribeVisibleLogicalRangeChange(handleVisibleRangeChange);
    };
  }

  /**
   * Unsubscribe from chart changes.
   */
  function unsubscribeFromChart(): void {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
    if (debounceTimer) {
      clearTimeout(debounceTimer);
      debounceTimer = null;
    }
  }

  /**
   * Reset all loading states.
   */
  function reset(): void {
    unsubscribeFromChart();
    loadingStates.value.clear();
    pendingRequests.value.clear();
    isLoading.value = false;
    initializeStates();
    subscribeToChart();
  }

  /**
   * Manually sync bounds for a specific series after data mutation.
   * Call this after live data updates to ensure lazy-loading boundaries are current.
   */
  function syncBounds(seriesId: string): void {
    const state = loadingStates.value.get(seriesId);
    if (!state) return;

    // Find the series config to get updated data boundaries
    const config = seriesConfigs.value.find(
      (c, i) => (c.seriesId || c.name || `series_${i}`) === seriesId
    );

    if (config?.data?.length) {
      const firstDataTime = config.data[0]?.time;
      const lastDataTime = config.data[config.data.length - 1]?.time;

      if (firstDataTime) {
        state.minTime = normalizeTime(firstDataTime);
      }
      if (lastDataTime) {
        state.maxTime = normalizeTime(lastDataTime);
      }

      // Recalculate average bar spacing with new data
      state.averageBarSpacing = calculateAverageBarSpacing(config.data);
    }
  }

  // Watch for chart changes - immediate to subscribe if chart is already set
  watch(
    chart,
    (newChart) => {
      unsubscribeFromChart();
      if (newChart) {
        subscribeToChart();
      }
    },
    { immediate: true }
  );

  // Watch for series config changes
  watch(
    seriesConfigs,
    () => {
      initializeStates();
    },
    { deep: true }
  );

  // Initialize on creation
  initializeStates();

  // Cleanup on unmount
  onUnmounted(() => {
    unsubscribeFromChart();
  });

  return {
    // State
    isLoading,
    loadingStates,
    pendingRequests,
    // Methods
    requestHistory,
    handleHistoryResponse,
    reset,
    syncBounds,
  };
}

export default useLazyLoading;
