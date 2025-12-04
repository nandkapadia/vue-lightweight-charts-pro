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
} from 'vue';
import {
  createChart,
  createSeriesMarkers,
  type IChartApi,
  type MouseEventParams,
  type LogicalRange,
  type DeepPartial,
  type TimeChartOptions,
} from 'lightweight-charts';
import type { ChartOptions, SeriesConfig, DataPoint, Annotation } from '../types';
import { useChartApi } from '../composables/useChartApi';
import { useChartWebSocket } from '../composables/useChartWebSocket';
import { useLazyLoading } from '../composables/useLazyLoading';

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
} from '@lightweight-charts-pro/core';

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
    default: '/api/charts',
  },
  /** WebSocket URL */
  wsUrl: {
    type: String,
    default: '',
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
    type: Array as PropType<Array<{
      text?: string;
      corner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
      paneId?: number;
      valueFormat?: string;
      style?: Record<string, string | number>;
      isPanePrimitive?: boolean;
    }>>,
    default: () => [],
  },
  /** Range switcher configurations (config-driven like Streamlit) */
  rangeSwitchers: {
    type: Array as PropType<Array<{
      ranges?: RangeConfig[];
      corner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
      paneId?: number;
      style?: Record<string, string | number>;
    }>>,
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
    default: '',
  },
});

// Define emits
const emit = defineEmits<{
  /** Emitted when chart is ready */
  (e: 'ready', chart: IChartApi): void;
  /** Emitted when crosshair moves */
  (e: 'crosshairMove', params: MouseEventParams): void;
  /** Emitted when time range changes */
  (e: 'visibleTimeRangeChange', range: LogicalRange | null): void;
  /** Emitted when series is clicked */
  (e: 'click', params: MouseEventParams): void;
  /** Emitted on WebSocket connection */
  (e: 'connected'): void;
  /** Emitted on WebSocket disconnection */
  (e: 'disconnected'): void;
  /** Emitted on error */
  (e: 'error', error: Error): void;
  /** Emitted when data is loaded */
  (e: 'dataLoaded', seriesId: string, count: number): void;
}>();

// Template refs
const containerRef = ref<HTMLElement | null>(null);

// Chart state
const chart = shallowRef<IChartApi | null>(null);
const seriesMap = shallowRef<Map<string, ExtendedSeriesApi>>(new Map());
const seriesConfigs = ref<SeriesConfig[]>([...props.series]);
const isInitialized = ref(false);
const error = ref<string | null>(null);

// Primitives (legends and range switchers) created from config
const legendPrimitives: LegendPrimitive[] = [];
const rangeSwitcherPrimitives: RangeSwitcherPrimitive[] = [];

// Cleanup references
let resizeObserver: ResizeObserver | null = null;


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
        onConnected: () => emit('connected'),
        onDisconnected: () => emit('disconnected'),
        onError: (err) => emit('error', err),
        onHistoryResponse: (response) => {
          const direction = response.hasMoreBefore ? 'before' : 'after';
          if (response.data?.length) {
            mergeHistoryData(response.seriesId, response.data, direction);
          }
          lazyLoadingState?.handleHistoryResponse(
            response.seriesId,
            direction,
            response.hasMoreBefore,
            response.hasMoreAfter
          );
        },
        onDataUpdate: async (update) => {
          // Refetch series data on update notification
          await refreshSeriesData(update.paneId, update.seriesId);
        },
      }
    )
  : null;

// Lazy loading composable
const lazyLoadingState = props.lazyLoading
  ? useLazyLoading({
      chart,
      seriesConfigs,
      onRequestHistory: (seriesId, paneId, beforeTime, direction, count) => {
        if (ws) {
          ws.requestHistory(paneId, seriesId, beforeTime, count, direction);
        } else {
          // Use REST API for history
          api.getHistory(props.chartId, paneId, seriesId, beforeTime, count, direction)
            .then((response) => {
              mergeHistoryData(seriesId, response.data, direction);
              lazyLoadingState?.handleHistoryResponse(
                seriesId,
                direction,
                response.hasMoreBefore,
                response.hasMoreAfter
              );
            })
            .catch((err) => {
              error.value = err instanceof Error ? err.message : 'Failed to load history';
              emit('error', err instanceof Error ? err : new Error(String(err)));
              lazyLoadingState?.handleHistoryResponse(seriesId, direction, false, false);
            });
        }
      },
    })
  : null;

// Provide chart instance to child components
provide('chart', chart);
provide('seriesMap', seriesMap);

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
    emit('crosshairMove', params);
  });

  chart.value.subscribeClick((params) => {
    emit('click', params);
  });

  chart.value.timeScale().subscribeVisibleLogicalRangeChange((range) => {
    emit('visibleTimeRangeChange', range);
  });

  // Add chart-level annotations if available
  if (props.annotations?.length) {
    try {
      const annotationVisuals = createAnnotationVisualElements(props.annotations as any);

      // Note: Chart-level annotations require a series to attach to
      // They will be applied when the first series is created
      // Store them for later application
      if (annotationVisuals.markers?.length || annotationVisuals.shapes?.length || annotationVisuals.texts?.length) {
        logger.info(
          `Chart-level annotations created: ${annotationVisuals.markers.length} markers, ${annotationVisuals.shapes.length} shapes, ${annotationVisuals.texts.length} texts`,
          'LightweightChart'
        );
      }
    } catch (err) {
      logger.error('Failed to create chart annotations', 'LightweightChart', err);
    }
  }

  isInitialized.value = true;
  emit('ready', chart.value);
}

/**
 * Create a series on the chart using the unified factory (like Streamlit).
 * This delegates to core's createSeriesWithConfig which handles all series types,
 * markers, price lines, trades, annotations, and more.
 */
function createSeries(config: SeriesConfig): ExtendedSeriesApi | null {
  if (!chart.value) return null;

  const seriesId = config.seriesId || config.name || `series_${seriesMap.value.size}`;

  try {
    // Convert our SeriesConfig to ExtendedSeriesConfig format expected by core
    const extendedConfig: ExtendedSeriesConfig = {
      type: config.seriesType,
      data: config.data || [],
      options: config.options || {},
      paneId: config.paneId ?? 0,
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
      logger.error(`Failed to create series: ${config.seriesType}`, 'LightweightChart');
      return null;
    }

    // Handle annotations if present
    if (config.annotations?.length) {
      try {
        const annotationVisuals = createAnnotationVisualElements(config.annotations as any);

        // Apply annotation markers (merge with existing markers)
        if (annotationVisuals.markers?.length) {
          const existingMarkers = config.markers || [];
          createSeriesMarkers(series, [...existingMarkers, ...annotationVisuals.markers]);
        }

        // Log other annotation elements (shapes/texts)
        if (annotationVisuals.shapes?.length) {
          logger.info(`Annotation shapes available: ${annotationVisuals.shapes.length}`, 'LightweightChart');
        }
        if (annotationVisuals.texts?.length) {
          logger.info(`Text annotations available: ${annotationVisuals.texts.length}`, 'LightweightChart');
        }
      } catch (err) {
        logger.error('Failed to create annotations', 'LightweightChart', err);
      }
    }

    seriesMap.value.set(seriesId, series);
    // Trigger reactivity for shallowRef Map mutation
    triggerRef(seriesMap);
    return series;
  } catch (err) {
    logger.error(`Failed to create series ${config.seriesType}`, 'LightweightChart', err);
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
 * Update series data.
 */
function updateSeriesData(seriesId: string, data: DataPoint[]): void {
  const series = seriesMap.value.get(seriesId);
  if (series) {
    series.setData(data as Parameters<typeof series.setData>[0]);

    // Update config
    const configIndex = seriesConfigs.value.findIndex(
      (c) => (c.seriesId || c.name) === seriesId
    );
    if (configIndex >= 0) {
      seriesConfigs.value[configIndex].data = data;
    }

    emit('dataLoaded', seriesId, data.length);

    if (props.autoFit) {
      chart.value?.timeScale().fitContent();
    }
  }
}

/**
 * Merge history data into existing series data.
 */
function mergeHistoryData(
  seriesId: string,
  newData: DataPoint[],
  direction: 'before' | 'after'
): void {
  const configIndex = seriesConfigs.value.findIndex(
    (c) => (c.seriesId || c.name) === seriesId
  );
  if (configIndex < 0) return;

  type NormalizedPoint = DataPoint & { time: number };

  const normalizeTime = (time: number | string): number => {
    if (typeof time === 'string') {
      return Math.floor(Date.parse(String(time)) / 1000);
    }
    return time;
  };

  const normalizeData = (data: DataPoint[] = []): NormalizedPoint[] =>
    data.map((point) => ({
      ...point,
      time: normalizeTime(point.time),
    }));

  const config = seriesConfigs.value[configIndex];
  const existingData = normalizeData(config.data || []);
  const incomingData = normalizeData(newData || []);

  const merged: NormalizedPoint[] = direction === 'before'
    ? [...incomingData, ...existingData]
    : [...existingData, ...incomingData];

  const deduplicated: NormalizedPoint[] = Array.from(
    new Map(merged.map((point) => [point.time, point])).values()
  );

  deduplicated.sort((a, b) => a.time - b.time);

  updateSeriesData(seriesId, deduplicated);
}

/**
 * Refresh series data from API.
 */
async function refreshSeriesData(paneId: number, seriesId: string): Promise<void> {
  try {
    const response = await api.getSeriesData(props.chartId, paneId, seriesId);
    updateSeriesData(seriesId, response.data);

    // Update lazy loading state if chunked
    if (response.chunked && lazyLoadingState) {
      const configIndex = seriesConfigs.value.findIndex(
        (c) => (c.seriesId || c.name) === seriesId
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
    error.value = err instanceof Error ? err.message : 'Failed to refresh series data';
    emit('error', err instanceof Error ? err : new Error(String(err)));
  }
}

/**
 * Initialize all series from props.
 */
function initializeSeries(): void {
  if (!chart.value) return;

  // Clear existing series
  seriesMap.value.forEach((_, seriesId) => removeSeries(seriesId));

  // Create new series
  seriesConfigs.value.forEach((config) => {
    createSeries(config);
  });

  if (props.autoFit && seriesConfigs.value.some((c) => c.data?.length)) {
    chart.value.timeScale().fitContent();
  }
}

/**
 * Initialize legends from config (like Streamlit)
 */
function initializeLegends(): void {
  if (!chart.value || !props.legends.length) return;

  // Clear existing legends (primitives clean up automatically when chart is removed)
  legendPrimitives.length = 0;

  // Create legends from config
  props.legends.forEach((legendConfig, index) => {
    try {
      const config = {
        corner: legendConfig.corner ?? 'top-left',
        text: legendConfig.text ?? '<div style="color: #fff;">$$title$$: $$close$$</div>',
        valueFormat: legendConfig.valueFormat,
        isPanePrimitive: legendConfig.isPanePrimitive ?? false,
        style: legendConfig.style,
        ...(legendConfig.paneId !== undefined ? { paneId: legendConfig.paneId } : {}),
      };

      const legendPrimitive = new LegendPrimitive(`legend-${props.chartId}-${index}`, config);

      const targetPaneId = legendConfig.paneId ?? 0;
      const panes = (chart.value as any).panes?.() || [];
      const targetPane = panes[targetPaneId] || panes[0];

      if (targetPane && typeof targetPane.attachPrimitive === 'function') {
        targetPane.attachPrimitive(legendPrimitive);
        legendPrimitives.push(legendPrimitive);
        logger.info(`Created legend at ${config.corner}`, 'LightweightChart');
      } else {
        logger.warn('Could not attach legend primitive to pane', 'LightweightChart');
      }
    } catch (err) {
      logger.error('Failed to create legend', 'LightweightChart', err);
    }
  });
}

/**
 * Initialize range switchers from config (like Streamlit)
 */
function initializeRangeSwitchers(): void {
  if (!chart.value || !props.rangeSwitchers.length) return;

  // Clear existing range switchers (primitives clean up automatically when chart is removed)
  rangeSwitcherPrimitives.length = 0;

  // Create range switchers from config
  props.rangeSwitchers.forEach((switcherConfig, index) => {
    try {
      const defaultRanges = [
        { text: '1D', range: TimeRange.ONE_DAY },
        { text: '1W', range: TimeRange.ONE_WEEK },
        { text: '1M', range: TimeRange.ONE_MONTH },
        { text: '3M', range: TimeRange.THREE_MONTHS },
        { text: '6M', range: TimeRange.SIX_MONTHS },
        { text: '1Y', range: TimeRange.ONE_YEAR },
        { text: 'All', range: TimeRange.ALL },
      ];

      const config = {
        corner: switcherConfig.corner ?? 'top-right',
        ranges: switcherConfig.ranges ?? defaultRanges,
        paneId: switcherConfig.paneId ?? 0,
        style: switcherConfig.style,
      };

      const rangeSwitcherPrimitive = new RangeSwitcherPrimitive(
        `range-switcher-${props.chartId}-${index}`,
        config
      );

      const panes = (chart.value as any).panes?.() || [];
      const targetPane = panes[config.paneId] || panes[0];

      if (targetPane && typeof targetPane.attachPrimitive === 'function') {
        targetPane.attachPrimitive(rangeSwitcherPrimitive);
        rangeSwitcherPrimitives.push(rangeSwitcherPrimitive);
        logger.info(`Created range switcher at ${config.corner}`, 'LightweightChart');
      } else {
        logger.warn('Could not attach range switcher primitive to pane', 'LightweightChart');
      }
    } catch (err) {
      logger.error('Failed to create range switcher', 'LightweightChart', err);
    }
  });
}

/**
 * Handle resize.
 */
function handleResize(): void {
  if (chart.value && containerRef.value) {
    chart.value.resize(containerRef.value.clientWidth, props.options?.height || 400);
  }
}

// Watch for option changes using JSON comparison to avoid unnecessary deep watching
// This is more performant than deep: true for large option objects
let lastOptionsJson = '';
watch(
  () => JSON.stringify(props.options),
  (newOptionsJson) => {
    if (newOptionsJson !== lastOptionsJson) {
      lastOptionsJson = newOptionsJson;
      if (chart.value && props.options) {
        chart.value.applyOptions(props.options as DeepPartial<TimeChartOptions>);
      }
    }
  }
);

// Watch for series changes using JSON comparison
// Avoids unnecessary re-renders when series data hasn't actually changed
let lastSeriesJson = '';
watch(
  () => JSON.stringify(props.series),
  (newSeriesJson) => {
    if (newSeriesJson !== lastSeriesJson) {
      lastSeriesJson = newSeriesJson;
      seriesConfigs.value = [...props.series];
      initializeSeries();
    }
  }
);

// Watch for legends changes (config-driven like Streamlit)
let lastLegendsJson = '';
watch(
  () => JSON.stringify(props.legends),
  (newLegendsJson) => {
    if (newLegendsJson !== lastLegendsJson) {
      lastLegendsJson = newLegendsJson;
      initializeLegends();
    }
  }
);

// Watch for rangeSwitchers changes (config-driven like Streamlit)
let lastRangeSwitchersJson = '';
watch(
  () => JSON.stringify(props.rangeSwitchers),
  (newRangeSwitchersJson) => {
    if (newRangeSwitchersJson !== lastRangeSwitchersJson) {
      lastRangeSwitchersJson = newRangeSwitchersJson;
      initializeRangeSwitchers();
    }
  }
);

// Lifecycle hooks
onMounted(() => {
  initializeChart();
  initializeSeries();
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
  isLoading: computed(() => api.isLoading.value || (lazyLoadingState?.isLoading.value ?? false)),
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
    <slot />
  </div>
</template>

<style scoped>
.lightweight-chart-container {
  width: 100%;
  position: relative;
}
</style>
