<script setup lang="ts">
/**
 * @fileoverview Main chart component for Vue 3.
 *
 * This component creates and manages a TradingView Lightweight Chart
 * with optional backend API integration for data fetching and real-time updates.
 */

import {
  ref,
  shallowRef,
  triggerRef,
  computed,
  watch,
  onMounted,
  onUnmounted,
  provide,
  type PropType,
} from "vue";
import {
  createChart,
  createSeriesMarkers,
  type IChartApi,
  type MouseEventParams,
  type LogicalRange,
  type DeepPartial,
  type TimeChartOptions,
} from "lightweight-charts";
import type {
  ChartOptions,
  SeriesConfig,
  DataPoint,
  Annotation,
} from "../types";
import { RequestDirection } from "../types";
import { useChartApi } from "../composables/useChartApi";
import { useChartWebSocket } from "../composables/useChartWebSocket";
import { useLazyLoading } from "../composables/useLazyLoading";
import { normalizeDataPoints } from "../utils/time";

// Import from core package for custom series and features
import {
  // Unified series factory (like Streamlit uses)
  createSeriesWithConfig,
  type ExtendedSeriesApi,
  type ExtendedSeriesConfig,

  // Annotation system (for chart-level annotations)
  createAnnotationVisualElements,

  // Primitives (for legends and range switchers)
  LegendPrimitive,
  RangeSwitcherPrimitive,
  TimeRange,
  type RangeConfig,

  // Utilities
  logger,
} from "@lightweight-charts-pro/core";

/**
 * Generate a namespaced series ID to prevent collisions across panes.
 * @param paneId - The pane index
 * @param seriesId - The series identifier
 * @returns Namespaced series ID in format "pane{paneId}-{seriesId}"
 */
function getNamespacedSeriesId(paneId: number, seriesId: string): string {
  return `pane${paneId}-${seriesId}`;
}

// Define props
const props = defineProps({
  /** Unique chart identifier */
  chartId: {
    type: String,
    required: true,
  },
  /** Backend API URL */
  apiUrl: {
    type: String,
    default: "/api/charts",
  },
  /** WebSocket URL */
  wsUrl: {
    type: String,
    default: "",
  },
  /** Chart configuration options */
  options: {
    type: Object as PropType<ChartOptions>,
    default: () => ({}),
  },
  /** Initial series configurations */
  series: {
    type: Array as PropType<SeriesConfig[]>,
    default: () => [],
  },
  /** Chart-level annotations */
  annotations: {
    type: Array as PropType<Annotation[]>,
    default: () => [],
  },
  /** Legend configurations (config-driven like Streamlit) */
  legends: {
    type: Array as PropType<
      Array<{
        text?: string;
        corner?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
        paneId?: number;
        valueFormat?: string;
        style?: Record<string, string | number>;
        isPanePrimitive?: boolean;
      }>
    >,
    default: () => [],
  },
  /** Range switcher configurations (config-driven like Streamlit) */
  rangeSwitchers: {
    type: Array as PropType<
      Array<{
        ranges?: RangeConfig[];
        corner?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
        paneId?: number;
        style?: Record<string, string | number>;
      }>
    >,
    default: () => [],
  },
  /** Whether to auto-connect to WebSocket */
  autoConnect: {
    type: Boolean,
    default: false,
  },
  /** Whether to auto-fit content after data changes */
  autoFit: {
    type: Boolean,
    default: true,
  },
  /** Whether to enable lazy loading */
  lazyLoading: {
    type: Boolean,
    default: true,
  },
  /** CSS class for container */
  containerClass: {
    type: String,
    default: "",
  },
  /** Show loading indicator during data fetches */
  showLoadingIndicator: {
    type: Boolean,
    default: true,
  },
  /** Show error indicator when requests fail */
  showErrorIndicator: {
    type: Boolean,
    default: true,
  },
  /** Show empty state when no data */
  showEmptyState: {
    type: Boolean,
    default: true,
  },
});

// Define emits
const emit = defineEmits<{
  /** Emitted when chart is ready */
  (e: "ready", chart: IChartApi): void;
  /** Emitted when crosshair moves */
  (e: "crosshairMove", params: MouseEventParams): void;
  /** Emitted when time range changes */
  (e: "visibleTimeRangeChange", range: LogicalRange | null): void;
  /** Emitted when series is clicked */
  (e: "click", params: MouseEventParams): void;
  /** Emitted on WebSocket connection */
  (e: "connected"): void;
  /** Emitted on WebSocket disconnection */
  (e: "disconnected"): void;
  /** Emitted on error */
  (e: "error", error: Error): void;
  /** Emitted when data is loaded */
  (e: "dataLoaded", seriesId: string, count: number): void;
}>();

// Template refs
const containerRef = ref<HTMLElement | null>(null);

// Chart state
const chart = shallowRef<IChartApi | null>(null);
const seriesMap = shallowRef<Map<string, ExtendedSeriesApi>>(new Map());
const seriesConfigs = ref<SeriesConfig[]>([...props.series]);
const isInitialized = ref(false);
const error = ref<string | null>(null);

// Track pending history requests to preserve direction
// Key: `${seriesId}_${paneId}_${direction}`, Value: true (presence indicates pending)
// Direction is now part of the key to handle concurrent before/after requests
const pendingHistoryRequests = new Set<string>();

// Primitives (legends and range switchers) created from config
const legendPrimitives: LegendPrimitive[] = [];
const rangeSwitcherPrimitives: RangeSwitcherPrimitive[] = [];

// Chart-level annotation visuals to be applied to series
let chartLevelAnnotationMarkers: any[] = [];

// Cleanup references
let resizeObserver: ResizeObserver | null = null;
let initialFitDone = false; // Track if initial auto-fit has been done

// API composable
const api = useChartApi({ baseUrl: props.apiUrl });

// WebSocket composable (conditionally used)
const ws = props.wsUrl
  ? useChartWebSocket(
      {
        url: props.wsUrl,
        chartId: props.chartId,
        reconnect: { enabled: true },
      },
      {
        onConnected: () => emit("connected"),
        onDisconnected: () => emit("disconnected"),
        onError: (err) => emit("error", err),
        onInitialData: (response) => {
          // Handle WebSocket initial data response
          if (response.error) {
            const errorMsg = `Initial data request failed: ${response.error}`;
            error.value = errorMsg;
            emit("error", new Error(errorMsg));
            return;
          }

          // Apply chart options if provided
          if (response.options && chart.value) {
            chart.value.applyOptions(
              response.options as DeepPartial<TimeChartOptions>,
            );
          }

          // Apply pane data if provided
          if (response.panes) {
            Object.entries(response.panes).forEach(([paneIdStr, paneData]) => {
              const paneId = parseInt(paneIdStr, 10);
              Object.entries(paneData).forEach(([seriesId, seriesData]) => {
                // Check if this series already exists in config
                const existingConfigIndex = seriesConfigs.value.findIndex(
                  (c) =>
                    (c.seriesId || c.name) === seriesId &&
                    (c.paneId ?? 0) === paneId,
                );

                if (existingConfigIndex >= 0) {
                  // Update existing series with WS data
                  updateSeriesData(paneId, seriesId, seriesData.data, true);
                } else {
                  // Create new series from WS data
                  const newConfig: SeriesConfig = {
                    seriesType: seriesData.seriesType as any,
                    data: seriesData.data,
                    options: seriesData.options as any,
                    paneId: paneId,
                    seriesId: seriesId,
                  };
                  seriesConfigs.value.push(newConfig);
                  createSeries(newConfig);
                }
              });
            });
          }

          logger.info(
            "WebSocket initial data applied to chart",
            "LightweightChart",
          );
        },
        onHistoryResponse: (response) => {
          // Extract direction from response (should be provided by WebSocket message)
          // Fallback to 'before' if not specified (backward compatibility)
          const direction = response.direction || RequestDirection.Before;
          const paneId = response.paneId || 0;
          // Namespace series ID to match seriesMap keys
          const namespacedId = getNamespacedSeriesId(paneId, response.seriesId);
          const requestKey = `${namespacedId}_${direction}`;
          pendingHistoryRequests.delete(requestKey);

          // Check for server-side errors in history response
          if (response.error) {
            const errorMsg = `History request failed for series "${response.seriesId}": ${response.error}`;
            error.value = errorMsg;
            emit("error", new Error(errorMsg));

            // Stop lazy-loading for this series (no more data available due to error)
            lazyLoadingState?.handleHistoryResponse(
              namespacedId,
              direction,
              false, // No more data before
              false, // No more data after
            );
            return;
          }

          if (response.data?.length) {
            mergeHistoryData(
              paneId,
              response.seriesId,
              response.data,
              direction,
            );
          }
          lazyLoadingState?.handleHistoryResponse(
            namespacedId,
            direction,
            response.hasMoreBefore,
            response.hasMoreAfter,
          );
        },
        onDataUpdate: async (update) => {
          // OPTIMIZATION: Use incremental data from WebSocket if available
          // instead of refetching entire dataset via REST
          if (
            update.data &&
            Array.isArray(update.data) &&
            update.data.length > 0
          ) {
            // Apply incremental update directly - O(m) instead of full refetch
            updateSeriesData(update.paneId, update.seriesId, update.data);
          } else {
            // Fallback: refetch via REST if no data in message (backward compatibility)
            await refreshSeriesData(update.paneId, update.seriesId);
          }
        },
      },
    )
  : null;

// Lazy loading composable
const lazyLoadingState = props.lazyLoading
  ? useLazyLoading({
      chart,
      seriesConfigs,
      onRequestHistory: (seriesId, paneId, beforeTime, direction, count) => {
        // Namespace series ID for seriesMap lookups
        const namespacedId = getNamespacedSeriesId(paneId, seriesId);
        // Track the request with direction in the key to support concurrent before/after requests
        const requestKey = `${namespacedId}_${direction}`;
        pendingHistoryRequests.add(requestKey);

        if (ws) {
          ws.requestHistory(paneId, seriesId, beforeTime, count, direction);
        } else {
          // Use REST API for history
          api
            .getHistory(
              props.chartId,
              paneId,
              seriesId,
              beforeTime,
              count,
              direction,
            )
            .then((response) => {
              mergeHistoryData(paneId, seriesId, response.data, direction);
              lazyLoadingState?.handleHistoryResponse(
                namespacedId,
                direction,
                response.hasMoreBefore,
                response.hasMoreAfter,
              );
            })
            .catch((err) => {
              error.value =
                err instanceof Error ? err.message : "Failed to load history";
              emit(
                "error",
                err instanceof Error ? err : new Error(String(err)),
              );
              lazyLoadingState?.handleHistoryResponse(
                namespacedId,
                direction,
                false,
                false,
              );
            })
            .finally(() => {
              // Clean up pending request
              pendingHistoryRequests.delete(requestKey);
            });
        }
      },
    })
  : null;

// Provide chart instance to child components
provide("chart", chart);
provide("seriesMap", seriesMap);

// Computed states for UI indicators
const isLoadingData = computed(() => {
  return api.isLoading.value || (lazyLoadingState?.isLoading.value ?? false);
});

const errorMessage = computed(() => {
  return api.error.value || error.value;
});

const isEmptyState = computed(() => {
  // Empty if initialized but no series have data AND no more data to load
  // Don't show "No data" during initial load or lazy loading
  return (
    isInitialized.value &&
    !isLoadingData.value && // Don't show empty state while loading
    seriesConfigs.value.every((s) => {
      const noData = !s.data?.length;
      // If lazy loading is enabled but flags not set yet, assume data might exist
      if (s.lazyLoading?.enabled && s.lazyLoading.hasMoreBefore === undefined) {
        return false; // Don't consider empty during initial lazy-load setup
      }
      // Only consider truly empty if lazy loading explicitly says no more data
      const noMoreData =
        s.lazyLoading?.hasMoreBefore === false &&
        s.lazyLoading?.hasMoreAfter === false;
      return noData && noMoreData;
    })
  );
});

/**
 * Create and initialize the chart.
 */
function initializeChart(): void {
  if (!containerRef.value || chart.value) return;

  const chartOptions = {
    width: containerRef.value.clientWidth,
    height: props.options?.height || 400,
    ...props.options,
  } as DeepPartial<TimeChartOptions>;

  chart.value = createChart(containerRef.value, chartOptions);

  // Subscribe to events
  chart.value.subscribeCrosshairMove((params) => {
    emit("crosshairMove", params);
  });

  chart.value.subscribeClick((params) => {
    emit("click", params);
  });

  chart.value.timeScale().subscribeVisibleLogicalRangeChange((range) => {
    emit("visibleTimeRangeChange", range);
  });

  // Add chart-level annotations if available
  if (props.annotations?.length) {
    try {
      const annotationVisuals = createAnnotationVisualElements(
        props.annotations as any,
      );

      // Store chart-level annotation markers to apply to series
      if (annotationVisuals.markers?.length) {
        chartLevelAnnotationMarkers = annotationVisuals.markers;
        logger.info(
          `Chart-level annotations created: ${annotationVisuals.markers.length} markers`,
          "LightweightChart",
        );
      }

      // Log other annotation elements (shapes/texts not yet supported)
      if (annotationVisuals.shapes?.length) {
        logger.info(
          `Annotation shapes available: ${annotationVisuals.shapes.length}`,
          "LightweightChart",
        );
      }
      if (annotationVisuals.texts?.length) {
        logger.info(
          `Text annotations available: ${annotationVisuals.texts.length}`,
          "LightweightChart",
        );
      }
    } catch (err) {
      logger.error(
        "Failed to create chart annotations",
        "LightweightChart",
        err,
      );
    }
  }

  isInitialized.value = true;
  emit("ready", chart.value);
}

/**
 * Create a series on the chart using the unified factory (like Streamlit).
 * This delegates to core's createSeriesWithConfig which handles all series types,
 * markers, price lines, trades, annotations, and more.
 */
function createSeries(config: SeriesConfig): ExtendedSeriesApi | null {
  if (!chart.value) return null;

  const paneId = config.paneId ?? 0;
  const baseSeriesId =
    config.seriesId || config.name || `series_${seriesMap.value.size}`;
  // Namespace series ID with pane to prevent cross-pane collisions
  const seriesId = getNamespacedSeriesId(paneId, baseSeriesId);

  try {
    // Normalize data timestamps to ensure consistent time handling (ms/s/string → seconds)
    const normalizedData = config.data ? normalizeDataPoints(config.data) : [];

    // Convert our SeriesConfig to ExtendedSeriesConfig format expected by core
    const extendedConfig: ExtendedSeriesConfig = {
      type: config.seriesType,
      data: normalizedData,
      options: config.options || {},
      paneId: paneId,
      priceLines: config.priceLines as any,
      markers: config.markers,
      seriesId: seriesId,
      chartId: props.chartId,
      // Pass trade visualization config
      trades: config.trades as any,
      tradeVisualizationOptions: config.tradeVisualizationOptions as any,
    };

    // Use core's unified factory (same as Streamlit)
    const series = createSeriesWithConfig(chart.value, extendedConfig);

    if (!series) {
      logger.error(
        `Failed to create series: ${config.seriesType}`,
        "LightweightChart",
      );
      return null;
    }

    // Collect all markers to apply: series annotations + chart-level annotations + config markers
    const allMarkers: any[] = [];

    // Add config markers
    if (config.markers?.length) {
      allMarkers.push(...config.markers);
    }

    // Add series-level annotations if present
    if (config.annotations?.length) {
      try {
        const annotationVisuals = createAnnotationVisualElements(
          config.annotations as any,
        );

        if (annotationVisuals.markers?.length) {
          allMarkers.push(...annotationVisuals.markers);
        }

        // Log other annotation elements (shapes/texts)
        if (annotationVisuals.shapes?.length) {
          logger.info(
            `Annotation shapes available: ${annotationVisuals.shapes.length}`,
            "LightweightChart",
          );
        }
        if (annotationVisuals.texts?.length) {
          logger.info(
            `Text annotations available: ${annotationVisuals.texts.length}`,
            "LightweightChart",
          );
        }
      } catch (err) {
        logger.error("Failed to create annotations", "LightweightChart", err);
      }
    }

    // Add chart-level annotations
    if (chartLevelAnnotationMarkers.length) {
      allMarkers.push(...chartLevelAnnotationMarkers);
    }

    // Apply all markers at once
    if (allMarkers.length) {
      try {
        createSeriesMarkers(series, allMarkers);
      } catch (err) {
        logger.error("Failed to apply markers", "LightweightChart", err);
      }
    }

    // Update config with normalized data for consistent time handling in lazy loading
    const configIndex = seriesConfigs.value.findIndex(
      (c) =>
        (c.seriesId || c.name) === baseSeriesId && (c.paneId ?? 0) === paneId,
    );
    if (configIndex >= 0) {
      seriesConfigs.value[configIndex].data = normalizedData;
    }

    seriesMap.value.set(seriesId, series);
    // Trigger reactivity for shallowRef Map mutation
    triggerRef(seriesMap);
    return series;
  } catch (err) {
    logger.error(
      `Failed to create series ${config.seriesType}`,
      "LightweightChart",
      err,
    );
    return null;
  }
}

/**
 * Remove a series from the chart.
 */
function removeSeries(seriesId: string): void {
  const series = seriesMap.value.get(seriesId);
  if (series && chart.value) {
    chart.value.removeSeries(series);
    seriesMap.value.delete(seriesId);
    // Trigger reactivity for shallowRef Map mutation
    triggerRef(seriesMap);
  }
}

/**
 * Update series data with time normalization and incremental updates.
 *
 * **Mutation Contracts:**
 * - Uses `setData()` for: initial load, history prepends (backfill), dataset shrink, time range changes
 * - Uses `update()` for: monotonic appends (fast path O(m)), non-monotonic incremental updates (slow path O(n log n))
 *
 * **Parameters:**
 * @param paneId - Pane index
 * @param baseSeriesId - Series identifier (not namespaced)
 * @param data - Data points to apply (will be normalized unless skipNormalization=true)
 * @param isInitialLoad - If true, uses setData() regardless of content
 * @param skipNormalization - If true, skips time normalization (data already normalized)
 *
 * **Performance:**
 * - Monotonic append: O(m) where m = new bars
 * - Non-monotonic: O(n log n) where n = total bars
 * - Initial load / replacement: O(n)
 */
function updateSeriesData(
  paneId: number,
  baseSeriesId: string,
  data: DataPoint[],
  isInitialLoad = false,
  skipNormalization = false,
): void {
  const namespacedId = getNamespacedSeriesId(paneId, baseSeriesId);
  const series = seriesMap.value.get(namespacedId);
  if (!series) return;

  // Normalize timestamps to seconds for consistent time handling (unless already normalized)
  const normalizedData = skipNormalization ? data : normalizeDataPoints(data);

  // Find config
  const configIndex = seriesConfigs.value.findIndex(
    (c) =>
      (c.seriesId || c.name) === baseSeriesId && (c.paneId ?? 0) === paneId,
  );

  if (
    isInitialLoad ||
    configIndex < 0 ||
    !seriesConfigs.value[configIndex].data?.length
  ) {
    // Initial load: use setData() for full dataset
    series.setData(normalizedData as Parameters<typeof series.setData>[0]);

    if (configIndex >= 0) {
      seriesConfigs.value[configIndex].data = normalizedData;
    }
  } else {
    const existingData = seriesConfigs.value[configIndex].data || [];

    // Detect if we need setData() instead of update()
    let needsSetData = false;
    let reason = "";

    // Case 1: History prepend (backfill) - incoming data extends before first bar
    if (existingData.length > 0 && normalizedData.length > 0) {
      const firstExistingTime = existingData[0].time;
      const firstNewTime = normalizedData[0].time;

      if (firstNewTime < firstExistingTime) {
        needsSetData = true;
        reason = "history prepend";
      }
    }

    // Case 2: Dataset replacement - significant shrink or different time range
    if (!needsSetData && existingData.length > 0 && normalizedData.length > 0) {
      // Check for significant dataset shrink (< 50% of original size)
      const sizeShrink = normalizedData.length < existingData.length * 0.5;

      // Check if new data starts much later (e.g., symbol switch)
      const firstExistingTime = existingData[0].time;
      const lastExistingTime = existingData[existingData.length - 1].time;
      const firstNewTime = normalizedData[0].time;
      const lastNewTime = normalizedData[normalizedData.length - 1].time;

      // If new data starts after existing data ended, it's a replacement
      const timeRangeDisjoint = firstNewTime > lastExistingTime;

      // If new data ends before existing data started, it's a replacement
      const timeRangeReversed = lastNewTime < firstExistingTime;

      if (sizeShrink || timeRangeDisjoint || timeRangeReversed) {
        needsSetData = true;
        reason = sizeShrink
          ? "dataset shrink"
          : "time range change (likely symbol switch)";
      }
    }

    if (needsSetData) {
      // Use setData() for dataset replacement or history backfill
      series.setData(normalizedData as Parameters<typeof series.setData>[0]);

      if (configIndex >= 0) {
        seriesConfigs.value[configIndex].data = normalizedData;
      }

      if (import.meta.env.DEV) {
        console.log(
          `[LightweightChart] Using setData() for series "${baseSeriesId}" (pane ${paneId}) due to ${reason}`,
        );
      }
    } else {
      // OPTIMIZATION: Check for monotonic append (common real-time case)
      // If all new bars are >= last existing bar, we can skip the expensive merge/sort
      let isMonotonicAppend = false;
      if (existingData.length > 0 && normalizedData.length > 0) {
        const lastExistingTime = existingData[existingData.length - 1].time;
        const firstNewTime = normalizedData[0].time;
        isMonotonicAppend = firstNewTime >= lastExistingTime;
      }

      // VALIDATION: Verify incoming data is sorted before taking fast path
      // If data is unsorted, fall back to slow path to avoid dropping bars
      let isIncomingDataSorted = true;
      if (isMonotonicAppend && normalizedData.length > 1) {
        for (let i = 1; i < normalizedData.length; i++) {
          if (normalizedData[i].time < normalizedData[i - 1].time) {
            isIncomingDataSorted = false;
            if (import.meta.env.DEV) {
              console.warn(
                `[LightweightChart] Incoming data for series "${baseSeriesId}" (pane ${paneId}) is not sorted. Falling back to slow path.`,
              );
            }
            break;
          }
        }
      }

      if (isMonotonicAppend && isIncomingDataSorted) {
        // FAST PATH: Monotonic append - O(m) instead of O(n log n)
        const lastExistingTime = existingData[existingData.length - 1].time;

        // Update last bar if it's in the new data
        const updatedLastBar = normalizedData.find(
          (bar) => bar.time === lastExistingTime,
        );
        if (updatedLastBar) {
          series.update(updatedLastBar as Parameters<typeof series.update>[0]);
          // Replace last bar in existing data
          existingData[existingData.length - 1] = updatedLastBar;
        }

        // Append only truly new bars (time > lastExistingTime)
        const newBars = normalizedData.filter(
          (bar) => bar.time > lastExistingTime,
        );
        newBars.forEach((bar) => {
          series.update(bar as Parameters<typeof series.update>[0]);
        });

        // Simple append to config (no map, no sort needed!)
        if (configIndex >= 0 && newBars.length > 0) {
          seriesConfigs.value[configIndex].data = [...existingData, ...newBars];
        }
      } else {
        // SLOW PATH: Non-monotonic update - use optimized merge logic
        const existingTimes = new Set(existingData.map((d) => d.time));

        // Find new bars (not in existing data)
        const newBars = normalizedData.filter(
          (bar) => !existingTimes.has(bar.time),
        );

        // Update existing bars that may have changed (e.g., last bar update)
        // Only update the last bar if it exists in new data (common for real-time updates)
        if (existingData.length > 0 && normalizedData.length > 0) {
          const lastExistingTime = existingData[existingData.length - 1].time;
          const updatedLastBar = normalizedData.find(
            (bar) => bar.time === lastExistingTime,
          );
          if (updatedLastBar) {
            series.update(
              updatedLastBar as Parameters<typeof series.update>[0],
            );
          }
        }

        // Append new bars using update() - O(1) per bar instead of O(n) for entire dataset
        newBars.forEach((bar) => {
          series.update(bar as Parameters<typeof series.update>[0]);
        });

        // CRITICAL: Merge new bars into existing array to preserve history for lazy loading
        // Don't overwrite with just the new payload - this would lose all prior history
        if (configIndex >= 0) {
          // OPTIMIZATION: Check if we can avoid expensive merge + sort
          // Case 1: No new bars - just update existing (common for last bar tick updates)
          if (newBars.length === 0) {
            // No merge needed, existing data is already correct
            // Just update the last bar if it changed (already done above with series.update)
            if (existingData.length > 0 && normalizedData.length > 0) {
              const lastExistingTime =
                existingData[existingData.length - 1].time;
              const updatedLastBar = normalizedData.find(
                (bar) => bar.time === lastExistingTime,
              );
              if (updatedLastBar) {
                // Update the last bar in the config array
                existingData[existingData.length - 1] = updatedLastBar;
              }
            }
          } else {
            // Case 2: Small number of new bars - check if they're all after existing
            const lastExistingTime =
              existingData.length > 0
                ? existingData[existingData.length - 1].time
                : -Infinity;
            const allNewBarsAfterExisting = newBars.every(
              (bar) => bar.time > lastExistingTime,
            );

            if (allNewBarsAfterExisting) {
              // OPTIMIZATION: Simple append, no merge or sort needed
              // This handles the case where incoming data has both old and new bars,
              // but the new bars are all after existing (e.g., backfill + new ticks)
              seriesConfigs.value[configIndex].data = [
                ...existingData,
                ...newBars,
              ];
            } else {
              // Case 3: True non-monotonic merge - need full merge and sort
              // Build time-to-bar map for deduplication (newer bars overwrite older)
              const mergedMap = new Map<number | string, DataPoint>();

              // Add existing bars
              existingData.forEach((bar) => {
                mergedMap.set(bar.time, bar);
              });

              // Add/overwrite with new bars (newer data wins)
              normalizedData.forEach((bar) => {
                mergedMap.set(bar.time, bar);
              });

              // Convert back to sorted array
              const mergedData = Array.from(mergedMap.values()).sort((a, b) => {
                const timeA =
                  typeof a.time === "string"
                    ? new Date(a.time).getTime() / 1000
                    : a.time;
                const timeB =
                  typeof b.time === "string"
                    ? new Date(b.time).getTime() / 1000
                    : b.time;
                return timeA - timeB;
              });

              seriesConfigs.value[configIndex].data = mergedData;
            }
          }
        }
      }
    }
  }

  emit("dataLoaded", baseSeriesId, normalizedData.length);

  // Sync lazy-loading bounds after data update (critical for live data)
  lazyLoadingState?.syncBounds(namespacedId);

  // Only auto-fit on initial load, not on every update/merge
  if (props.autoFit && (isInitialLoad || !initialFitDone)) {
    chart.value?.timeScale().fitContent();
    initialFitDone = true;
  }
}

/**
 * Merge history data into existing series data.
 * Uses shared time normalization to handle both strings and ms/s timestamps.
 */
function mergeHistoryData(
  paneId: number,
  baseSeriesId: string,
  newData: DataPoint[],
  direction: "before" | "after",
): void {
  const configIndex = seriesConfigs.value.findIndex(
    (c) =>
      (c.seriesId || c.name) === baseSeriesId && (c.paneId ?? 0) === paneId,
  );
  if (configIndex < 0) return;

  const namespacedId = getNamespacedSeriesId(paneId, baseSeriesId);

  try {
    const config = seriesConfigs.value[configIndex];
    // OPTIMIZATION: config.data is already normalized (set via updateSeriesData)
    // Only normalize incoming data to avoid O(n) re-normalization of full dataset
    const existingData = config.data || [];
    const incomingData = normalizeDataPoints(newData || []);

    const merged =
      direction === RequestDirection.Before
        ? [...incomingData, ...existingData]
        : [...existingData, ...incomingData];

    // Deduplicate by time (later entries win)
    const deduplicated = Array.from(
      new Map(merged.map((point) => [point.time, point])).values(),
    );

    deduplicated.sort((a, b) => (a.time as number) - (b.time as number));

    // Don't trigger auto-fit on history merges (only on initial load)
    // Data is already normalized, so skip re-normalization (performance optimization)
    updateSeriesData(paneId, baseSeriesId, deduplicated, false, true);
  } catch (err) {
    // Critical: catch normalization errors to prevent leaving chart in broken state
    const errorMessage =
      err instanceof Error ? err.message : "Failed to merge history data";
    error.value = errorMessage;
    emit(
      "error",
      new Error(
        `History merge failed for series "${baseSeriesId}" (pane ${paneId}): ${errorMessage}`,
      ),
    );

    // Clear pending lazy-load flags to prevent infinite loading state
    lazyLoadingState?.handleHistoryResponse(
      namespacedId,
      direction,
      false,
      false,
    );

    console.error(
      `[LightweightChart] History merge error for series "${baseSeriesId}" (pane ${paneId}):`,
      err,
    );
  }
}

/**
 * Refresh series data from API.
 */
async function refreshSeriesData(
  paneId: number,
  seriesId: string,
): Promise<void> {
  try {
    const response = await api.getSeriesData(props.chartId, paneId, seriesId);
    updateSeriesData(paneId, seriesId, response.data);

    // Update lazy loading state if chunked
    if (response.chunked && lazyLoadingState) {
      const configIndex = seriesConfigs.value.findIndex(
        (c) =>
          (c.seriesId || c.name) === seriesId && (c.paneId ?? 0) === paneId,
      );
      if (configIndex >= 0) {
        seriesConfigs.value[configIndex].lazyLoading = {
          enabled: true,
          chunkSize: response.chunkInfo?.count || 500,
          hasMoreBefore: response.hasMoreBefore,
          hasMoreAfter: response.hasMoreAfter,
          chunkInfo: response.chunkInfo,
        };
      }
    }
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : "Failed to refresh series data";
    emit("error", err instanceof Error ? err : new Error(String(err)));
  }
}

/**
 * Initialize all series from props.
 * @param shouldAutoFit - Whether to auto-fit the chart after initialization (only on initial mount)
 */
function initializeSeries(shouldAutoFit = false): void {
  if (!chart.value) return;

  // Clear existing series
  seriesMap.value.forEach((_, seriesId) => removeSeries(seriesId));

  // Create new series
  seriesConfigs.value.forEach((config) => {
    createSeries(config);
  });

  // Only auto-fit if explicitly requested (e.g., on initial mount) and not already done
  if (
    shouldAutoFit &&
    props.autoFit &&
    seriesConfigs.value.some((c) => c.data?.length) &&
    !initialFitDone
  ) {
    chart.value.timeScale().fitContent();
    initialFitDone = true;
  }
}

/**
 * Initialize legends from config (like Streamlit)
 */
function initializeLegends(): void {
  if (!chart.value || !props.legends.length) return;

  // Detach existing legends before clearing to prevent duplicates
  if (legendPrimitives.length > 0 && chart.value) {
    const panes = (chart.value as any).panes?.() || [];
    legendPrimitives.forEach((primitive) => {
      try {
        // Try to detach from all panes
        panes.forEach((pane: any) => {
          if (typeof pane.detachPrimitive === "function") {
            pane.detachPrimitive(primitive);
          }
        });
      } catch {
        // Ignore errors during detachment
      }
    });
  }

  // Clear existing legends
  legendPrimitives.length = 0;

  // Create legends from config
  props.legends.forEach((legendConfig, index) => {
    try {
      const config = {
        corner: legendConfig.corner ?? "top-left",
        text:
          legendConfig.text ??
          '<div style="color: #fff;">$$title$$: $$close$$</div>',
        valueFormat: legendConfig.valueFormat,
        isPanePrimitive: legendConfig.isPanePrimitive ?? false,
        style: legendConfig.style,
        ...(legendConfig.paneId !== undefined
          ? { paneId: legendConfig.paneId }
          : {}),
      };

      const legendPrimitive = new LegendPrimitive(
        `legend-${props.chartId}-${index}`,
        config,
      );

      const targetPaneId = legendConfig.paneId ?? 0;
      const panes = (chart.value as any).panes?.() || [];
      const targetPane = panes[targetPaneId] || panes[0];

      if (targetPane && typeof targetPane.attachPrimitive === "function") {
        targetPane.attachPrimitive(legendPrimitive);
        legendPrimitives.push(legendPrimitive);
        logger.info(`Created legend at ${config.corner}`, "LightweightChart");
      } else {
        logger.warn(
          "Could not attach legend primitive to pane",
          "LightweightChart",
        );
      }
    } catch (err) {
      logger.error("Failed to create legend", "LightweightChart", err);
    }
  });
}

/**
 * Initialize range switchers from config (like Streamlit)
 */
function initializeRangeSwitchers(): void {
  if (!chart.value || !props.rangeSwitchers.length) return;

  // Detach existing range switchers before clearing to prevent duplicates
  if (rangeSwitcherPrimitives.length > 0 && chart.value) {
    const panes = (chart.value as any).panes?.() || [];
    rangeSwitcherPrimitives.forEach((primitive) => {
      try {
        // Try to detach from all panes
        panes.forEach((pane: any) => {
          if (typeof pane.detachPrimitive === "function") {
            pane.detachPrimitive(primitive);
          }
        });
      } catch {
        // Ignore errors during detachment
      }
    });
  }

  // Clear existing range switchers
  rangeSwitcherPrimitives.length = 0;

  // Create range switchers from config
  props.rangeSwitchers.forEach((switcherConfig, index) => {
    try {
      const defaultRanges = [
        { text: "1D", range: TimeRange.ONE_DAY },
        { text: "1W", range: TimeRange.ONE_WEEK },
        { text: "1M", range: TimeRange.ONE_MONTH },
        { text: "3M", range: TimeRange.THREE_MONTHS },
        { text: "6M", range: TimeRange.SIX_MONTHS },
        { text: "1Y", range: TimeRange.ONE_YEAR },
        { text: "All", range: TimeRange.ALL },
      ];

      const config = {
        corner: switcherConfig.corner ?? "top-right",
        ranges: switcherConfig.ranges ?? defaultRanges,
        paneId: switcherConfig.paneId ?? 0,
        style: switcherConfig.style,
      };

      const rangeSwitcherPrimitive = new RangeSwitcherPrimitive(
        `range-switcher-${props.chartId}-${index}`,
        config,
      );

      const panes = (chart.value as any).panes?.() || [];
      const targetPane = panes[config.paneId] || panes[0];

      if (targetPane && typeof targetPane.attachPrimitive === "function") {
        targetPane.attachPrimitive(rangeSwitcherPrimitive);
        rangeSwitcherPrimitives.push(rangeSwitcherPrimitive);
        logger.info(
          `Created range switcher at ${config.corner}`,
          "LightweightChart",
        );
      } else {
        logger.warn(
          "Could not attach range switcher primitive to pane",
          "LightweightChart",
        );
      }
    } catch (err) {
      logger.error("Failed to create range switcher", "LightweightChart", err);
    }
  });
}

/**
 * Handle resize.
 */
function handleResize(): void {
  if (chart.value && containerRef.value) {
    chart.value.resize(
      containerRef.value.clientWidth,
      props.options?.height || 400,
    );
  }
}

// Watch for option changes
watch(
  () => props.options,
  (newOptions) => {
    if (chart.value && newOptions) {
      chart.value.applyOptions(newOptions as DeepPartial<TimeChartOptions>);
    }
  },
  { deep: true },
);

// Watch for series array identity changes (shallow watch)
// This avoids recreating all series when nested data changes.
// Users should replace the entire series array for updates.
watch(
  () => props.series,
  (newSeries, oldSeries) => {
    // Only reinitialize if the array reference changed
    if (newSeries !== oldSeries) {
      seriesConfigs.value = [...newSeries];
      initializeSeries(false); // Don't auto-fit on prop changes
    }
  },
);

// Watch for in-place data mutations (deep watch for nested data changes)
// Detects when data is pushed/mutated without changing array reference
watch(
  () =>
    props.series.map((s) => ({
      id: s.seriesId || s.name,
      dataLength: s.data?.length || 0,
      lastTime: s.data?.length ? s.data[s.data.length - 1]?.time : null,
    })),
  (newMetadata, oldMetadata) => {
    // Detect in-place mutations by comparing data length and last time
    newMetadata.forEach((newMeta, index) => {
      const oldMeta = oldMetadata?.[index];
      if (!oldMeta) return;

      const seriesId = newMeta.id;
      const lengthChanged = newMeta.dataLength !== oldMeta.dataLength;
      const lastTimeChanged = newMeta.lastTime !== oldMeta.lastTime;

      // If data length or last time changed, update the series
      if ((lengthChanged || lastTimeChanged) && seriesId) {
        const config = props.series[index];
        if (config?.data) {
          const paneId = config.paneId ?? 0;
          // Update internal config
          const configIndex = seriesConfigs.value.findIndex(
            (c) =>
              (c.seriesId || c.name) === seriesId && (c.paneId ?? 0) === paneId,
          );
          if (configIndex >= 0) {
            seriesConfigs.value[configIndex].data = [...config.data];
          }
          // Update the series on the chart
          updateSeriesData(paneId, seriesId, config.data);

          // Warn about in-place mutation (best practice is immutable updates)
          if (import.meta.env.DEV) {
            console.warn(
              `[LightweightChart] In-place mutation detected for series "${seriesId}". ` +
                `For better performance, replace the data array instead: ` +
                `series[i].data = [...newData]`,
            );
          }
        }
      }
    });
  },
  { deep: true },
);

// Watch for legends changes (config-driven like Streamlit)
watch(
  () => props.legends,
  () => {
    initializeLegends();
  },
  { deep: true },
);

// Watch for rangeSwitchers changes (config-driven like Streamlit)
watch(
  () => props.rangeSwitchers,
  () => {
    initializeRangeSwitchers();
  },
  { deep: true },
);

// Watch for annotations changes (chart-level)
watch(
  () => props.annotations,
  (newAnnotations) => {
    if (!newAnnotations?.length) {
      chartLevelAnnotationMarkers = [];
      // Re-apply markers to all series (preserving series markers/annotations)
      seriesMap.value.forEach((series, seriesId) => {
        const config = seriesConfigs.value.find(
          (c) => (c.seriesId || c.name) === seriesId,
        );
        if (!config) return;

        const allMarkers: any[] = [];

        // 1. Add explicit markers from config
        if (config.markers?.length) {
          allMarkers.push(...config.markers);
        }

        // 2. Add series-level annotations (converted to markers)
        if (config.annotations?.length) {
          try {
            const seriesAnnotationVisuals = createAnnotationVisualElements(
              config.annotations as any,
            );
            if (seriesAnnotationVisuals.markers?.length) {
              allMarkers.push(...seriesAnnotationVisuals.markers);
            }
          } catch (err) {
            logger.error(
              `Failed to convert series annotations for ${seriesId}`,
              "LightweightChart",
              err,
            );
          }
        }

        // 3. Chart-level annotations are empty (cleared)

        try {
          createSeriesMarkers(series, allMarkers);
        } catch (err) {
          logger.error(
            "Failed to clear chart annotations",
            "LightweightChart",
            err,
          );
        }
      });
      return;
    }

    try {
      const annotationVisuals = createAnnotationVisualElements(
        newAnnotations as any,
      );
      chartLevelAnnotationMarkers = annotationVisuals.markers || [];

      // Re-apply markers to all existing series
      seriesMap.value.forEach((series, seriesId) => {
        const config = seriesConfigs.value.find(
          (c) => (c.seriesId || c.name) === seriesId,
        );
        if (!config) return;

        const allMarkers: any[] = [];

        // 1. Add explicit markers from config
        if (config.markers?.length) {
          allMarkers.push(...config.markers);
        }

        // 2. Add series-level annotations (converted to markers)
        if (config.annotations?.length) {
          try {
            const seriesAnnotationVisuals = createAnnotationVisualElements(
              config.annotations as any,
            );
            if (seriesAnnotationVisuals.markers?.length) {
              allMarkers.push(...seriesAnnotationVisuals.markers);
            }
          } catch (err) {
            logger.error(
              `Failed to convert series annotations for ${seriesId}`,
              "LightweightChart",
              err,
            );
          }
        }

        // 3. Add chart-level annotation markers
        if (chartLevelAnnotationMarkers.length) {
          allMarkers.push(...chartLevelAnnotationMarkers);
        }

        try {
          createSeriesMarkers(series, allMarkers);
        } catch (err) {
          logger.error(
            `Failed to update annotations for series ${seriesId}`,
            "LightweightChart",
            err,
          );
        }
      });
    } catch (err) {
      logger.error(
        "Failed to update chart annotations",
        "LightweightChart",
        err,
      );
    }
  },
  { deep: true },
);

// Watch for series identity changes (symbol switches, dataset replacements)
watch(
  () => props.series,
  () => {
    // Reset auto-fit flag when series array identity changes (e.g., symbol switch)
    // This allows fitContent to trigger again for the new dataset
    initialFitDone = false;
  },
);

// Lifecycle hooks
onMounted(() => {
  initializeChart();
  initializeSeries(true); // Auto-fit only on initial mount
  initializeLegends();
  initializeRangeSwitchers();

  // Auto-connect to WebSocket if enabled
  if (props.autoConnect && ws) {
    ws.connect();
  }

  // Set up resize observer
  if (containerRef.value) {
    resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.value);
  }
});

onUnmounted(() => {
  // Disconnect WebSocket to prevent resource leaks
  if (ws) {
    ws.disconnect();
  }

  // Disconnect resize observer
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }

  // Clear primitives (legends and range switchers)
  legendPrimitives.length = 0;
  rangeSwitcherPrimitives.length = 0;

  // Remove chart (primitives clean up automatically with chart removal)
  if (chart.value) {
    chart.value.remove();
    chart.value = null;
  }
  seriesMap.value.clear();
});

// Expose public API
defineExpose({
  /** Chart API instance */
  chart,
  /** Map of series */
  seriesMap,
  /** Create a new series */
  createSeries,
  /** Remove a series */
  removeSeries,
  /** Update series data */
  updateSeriesData,
  /** Merge history data */
  mergeHistoryData,
  /** Refresh series from API */
  refreshSeriesData,
  /** API client */
  api,
  /** WebSocket client */
  ws,
  /** Loading state */
  isLoading: computed(
    () => api.isLoading.value || (lazyLoadingState?.isLoading.value ?? false),
  ),
  /** Error state */
  error: computed(() => api.error.value || error.value),
});
</script>

<template>
  <div
    ref="containerRef"
    class="lightweight-chart-container"
    :class="containerClass"
  >
    <!-- Loading Indicator -->
    <div
      v-if="showLoadingIndicator && isLoadingData"
      class="chart-indicator chart-loading"
    >
      <slot name="loading">
        <div class="chart-indicator-content">
          <span class="loading-spinner" />
          <span class="loading-text">Loading data...</span>
        </div>
      </slot>
    </div>

    <!-- Error Indicator -->
    <div
      v-if="showErrorIndicator && errorMessage"
      class="chart-indicator chart-error"
    >
      <slot name="error" :error="errorMessage">
        <div class="chart-indicator-content">
          <span class="error-icon">⚠️</span>
          <span class="error-text">{{ errorMessage }}</span>
        </div>
      </slot>
    </div>

    <!-- Empty State Indicator -->
    <div
      v-if="showEmptyState && isEmptyState && !isLoadingData && !errorMessage"
      class="chart-indicator chart-empty"
    >
      <slot name="empty">
        <div class="chart-indicator-content">
          <span class="empty-icon">📊</span>
          <span class="empty-text">No data available</span>
        </div>
      </slot>
    </div>

    <slot />
  </div>
</template>

<style scoped>
.lightweight-chart-container {
  width: 100%;
  position: relative;
}

/* Indicator positioning and base styles */
.chart-indicator {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
  pointer-events: none;
  animation: fadeIn 0.2s ease-in;
}

.chart-indicator-content {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, sans-serif;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(4px);
}

/* Loading indicator */
.chart-loading .chart-indicator-content {
  background: rgba(59, 130, 246, 0.95);
  color: white;
}

.loading-spinner {
  width: 12px;
  height: 12px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loading-text {
  font-weight: 500;
}

/* Error indicator */
.chart-error .chart-indicator-content {
  background: rgba(239, 68, 68, 0.95);
  color: white;
}

.error-icon {
  font-size: 14px;
}

.error-text {
  font-weight: 500;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Empty state indicator */
.chart-empty .chart-indicator-content {
  background: rgba(156, 163, 175, 0.95);
  color: white;
}

.empty-icon {
  font-size: 14px;
}

.empty-text {
  font-weight: 500;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
