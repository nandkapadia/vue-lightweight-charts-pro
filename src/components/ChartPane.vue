<script setup lang="ts">
/**
 * @fileoverview Chart pane component for Vue 3.
 *
 * This component represents a single pane within a chart,
 * allowing for multi-pane layouts with independent series.
 */

import {
  ref,
  inject,
  computed,
  watch,
  onUnmounted,
  type PropType,
  type ShallowRef,
} from "vue";
import {
  createSeriesMarkers,
  type IChartApi,
  type ISeriesApi,
  type SeriesType,
} from "lightweight-charts";
import type { SeriesConfig, DataPoint } from "../types";
import {
  createSeriesWithConfig,
  type ExtendedSeriesApi,
  type ExtendedSeriesConfig,
  createAnnotationVisualElements,
  logger,
} from "@lightweight-charts-pro/core";
import { normalizeDataPoints } from "../utils/time";

// Define props
const props = defineProps({
  /** Pane identifier */
  paneId: {
    type: Number,
    default: 0,
  },
  /** Pane height as percentage or pixels */
  height: {
    type: [Number, String],
    default: undefined,
  },
  /** Pane height as ratio of available space (0-1) */
  heightRatio: {
    type: Number,
    default: undefined,
  },
  /** Whether the pane is collapsed */
  collapsed: {
    type: Boolean,
    default: false,
  },
  /** Series to render in this pane */
  series: {
    type: Array as PropType<SeriesConfig[]>,
    default: () => [],
  },
  /** Title for the pane */
  title: {
    type: String,
    default: "",
  },
});

// Define emits
const emit = defineEmits<{
  /** Emitted when series is added */
  (e: "seriesAdded", seriesId: string, series: ISeriesApi<SeriesType>): void;
  /** Emitted when series is removed */
  (e: "seriesRemoved", seriesId: string): void;
  /** Emitted when pane is collapsed/expanded */
  (e: "toggleCollapse", collapsed: boolean): void;
}>();

// Inject chart from parent
const chart = inject<ShallowRef<IChartApi | null>>("chart");
const globalSeriesMap =
  inject<ShallowRef<Map<string, ExtendedSeriesApi>>>("seriesMap");

// Local state
const localSeriesMap = ref<Map<string, ExtendedSeriesApi>>(new Map());
const isCollapsed = ref(props.collapsed);
const previousSeriesConfigs = ref<SeriesConfig[]>([]); // Track previous configs for smart updates
let seriesIdCounter = 0; // Counter for generating unique series IDs
const chartLevelAnnotationMarkers: any[] = []; // Chart-level annotations for this pane

const computedHeight = computed(() => {
  if (typeof props.height === "number") {
    return `${props.height}px`;
  }
  if (typeof props.height === "string") {
    return props.height;
  }
  if (props.heightRatio !== undefined) {
    return `${props.heightRatio * 100}%`;
  }
  return "100%";
});

/**
 * Create a series on the chart for this pane using the unified factory.
 * This ensures consistent behavior with LightweightChart and supports all series types,
 * markers, price lines, trades, annotations, and custom series.
 */
function createSeries(config: SeriesConfig): ExtendedSeriesApi | null {
  if (!chart?.value) return null;

  const seriesId =
    config.seriesId ||
    config.name ||
    `pane${props.paneId}_series_${seriesIdCounter++}`;

  // Check if series already exists
  if (localSeriesMap.value.has(seriesId)) {
    return localSeriesMap.value.get(seriesId) || null;
  }

  try {
    // Normalize data to ensure consistent time format (prevents ms/s misalignment)
    const normalizedData = config.data ? normalizeDataPoints(config.data) : [];

    // Build extended config with paneId (matching the format expected by unified factory)
    const extendedConfig: ExtendedSeriesConfig = {
      type: config.seriesType,
      data: normalizedData,
      options: config.options || {},
      paneId: props.paneId,
      seriesId,
      markers: config.markers,
      priceLines: config.priceLines as any,
      trades: config.trades as any,
      annotations: config.annotations as any,
    };

    // Use unified factory to create series (handles all types including custom series)
    const series = createSeriesWithConfig(chart.value, extendedConfig);

    if (!series) {
      logger.error(
        `Failed to create series: ${config.seriesType}`,
        "ChartPane",
      );
      return null;
    }

    // Apply chart-level annotations if any
    if (
      chartLevelAnnotationMarkers.length ||
      config.markers?.length ||
      config.annotations?.length
    ) {
      const allMarkers: any[] = [];

      // Add config markers
      if (config.markers?.length) {
        allMarkers.push(...config.markers);
      }

      // Add series-level annotations
      if (config.annotations?.length) {
        try {
          const annotationVisuals = createAnnotationVisualElements(
            config.annotations as any,
          );
          if (annotationVisuals.markers?.length) {
            allMarkers.push(...annotationVisuals.markers);
          }
        } catch (err) {
          logger.error("Failed to create series annotations", "ChartPane", err);
        }
      }

      // Add pane-level annotations
      if (chartLevelAnnotationMarkers.length) {
        allMarkers.push(...chartLevelAnnotationMarkers);
      }

      // Apply all markers
      if (allMarkers.length) {
        try {
          createSeriesMarkers(series, allMarkers);
        } catch (err) {
          logger.error("Failed to apply markers", "ChartPane", err);
        }
      }
    }

    // Store in local and global maps
    localSeriesMap.value.set(seriesId, series);
    if (globalSeriesMap?.value) {
      globalSeriesMap.value.set(seriesId, series);
    }

    emit("seriesAdded", seriesId, series);
    return series;
  } catch (err) {
    logger.error(
      `Failed to create series ${config.seriesType}`,
      "ChartPane",
      err,
    );
    return null;
  }
}

/**
 * Remove a series from the chart.
 */
function removeSeries(seriesId: string): void {
  const series = localSeriesMap.value.get(seriesId);
  if (series && chart?.value) {
    chart.value.removeSeries(series);
    localSeriesMap.value.delete(seriesId);
    if (globalSeriesMap?.value) {
      globalSeriesMap.value.delete(seriesId);
    }
    emit("seriesRemoved", seriesId);
  }
}

/**
 * Update data for a series in this pane.
 * Uses incremental updates (series.update) instead of full setData when possible.
 */
function updateSeriesData(
  seriesId: string,
  data: DataPoint[],
  isInitialLoad = false,
): void {
  const series = localSeriesMap.value.get(seriesId);
  if (!series) return;

  // Normalize data to ensure consistent time format
  const normalizedData = normalizeDataPoints(data);

  if (isInitialLoad || normalizedData.length === 0) {
    // Initial load or empty data: use setData()
    series.setData(normalizedData as Parameters<typeof series.setData>[0]);
  } else {
    // Incremental update: use update() for better performance
    // Get existing data from the series config to compare
    const configIndex = props.series.findIndex(
      (s) => (s.seriesId || s.name) === seriesId,
    );
    const existingData = configIndex >= 0 ? props.series[configIndex].data : [];

    if (!existingData?.length) {
      // No existing data tracked, use setData
      series.setData(normalizedData as Parameters<typeof series.setData>[0]);
    } else {
      // DETECTION: Check for backfill (history prepend)
      const existingFirstTime =
        typeof existingData[0].time === "number"
          ? existingData[0].time
          : new Date(existingData[0].time).getTime() / 1000;
      const newFirstTime = normalizedData[0].time;
      const isBackfill = newFirstTime < existingFirstTime;

      if (isBackfill) {
        // Backfill detected: merge and use setData()
        // lightweight-charts ignores update() calls for earlier timestamps
        const mergedMap = new Map<number | string, DataPoint>();

        // Add existing bars
        existingData.forEach((bar) => {
          mergedMap.set(bar.time, bar);
        });

        // Add/overwrite with new bars
        normalizedData.forEach((bar) => {
          mergedMap.set(bar.time, bar);
        });

        // Convert to sorted array
        const mergedData = Array.from(mergedMap.values()).sort((a, b) => {
          const timeA =
            typeof a.time === "number"
              ? a.time
              : new Date(a.time).getTime() / 1000;
          const timeB =
            typeof b.time === "number"
              ? b.time
              : new Date(b.time).getTime() / 1000;
          return timeA - timeB;
        });

        series.setData(mergedData as Parameters<typeof series.setData>[0]);
      } else {
        // Incremental update: use update() for better performance
        // Build set of existing times for O(1) lookup
        const existingTimes = new Set(existingData.map((d) => d.time));

        // Find new bars (not in existing data)
        const newBars = normalizedData.filter(
          (bar) => !existingTimes.has(bar.time),
        );

        // Update last bar if changed (real-time tick)
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
      }
    }
  }
}

/**
 * Get a series by ID.
 */
function getSeries(seriesId: string): ISeriesApi<SeriesType> | undefined {
  return localSeriesMap.value.get(seriesId);
}

/**
 * Toggle pane collapsed state.
 */
function toggleCollapse(): void {
  isCollapsed.value = !isCollapsed.value;
  emit("toggleCollapse", isCollapsed.value);
}

/**
 * Shallow equality check for objects/arrays (reference comparison).
 * For reactive props, reference changes indicate mutations.
 */
function shallowEqual(a: any, b: any): boolean {
  // Null/undefined check
  if (a === b) return true;
  if (!a || !b) return false;

  // For arrays, check reference equality (Vue will create new array on mutation)
  if (Array.isArray(a) && Array.isArray(b)) {
    return a === b;
  }

  // For objects, check reference equality (Vue will create new object on mutation)
  return a === b;
}

/**
 * Helper to check if series config changed (excluding data).
 * Uses shallow equality to avoid O(n) JSON.stringify on large datasets.
 */
function seriesConfigChanged(
  oldConfig: SeriesConfig,
  newConfig: SeriesConfig,
): boolean {
  return (
    oldConfig.seriesType !== newConfig.seriesType ||
    !shallowEqual(oldConfig.options, newConfig.options) ||
    !shallowEqual(oldConfig.markers, newConfig.markers) ||
    !shallowEqual(oldConfig.priceLines, newConfig.priceLines) ||
    !shallowEqual(oldConfig.trades, newConfig.trades) ||
    !shallowEqual(oldConfig.annotations, newConfig.annotations)
  );
}

/**
 * Initialize all series from props.
 * Uses smart updates: only recreates if config changed, uses incremental updates for data changes.
 */
function initializeSeries(): void {
  if (!chart?.value) return;

  const isInitialLoad = previousSeriesConfigs.value.length === 0;

  if (isInitialLoad) {
    // Initial load: create all series
    props.series.forEach((config) => {
      createSeries({
        ...config,
        paneId: props.paneId,
      });
    });
    // Store reference to current series array (shallow copy sufficient for change detection)
    previousSeriesConfigs.value = [...props.series];
    return;
  }

  // Build maps for comparison
  const currentSeriesIds = new Set(
    props.series.map(
      (s, i) => s.seriesId || s.name || `pane${props.paneId}_series_${i}`,
    ),
  );
  const previousSeriesIds = new Set(
    previousSeriesConfigs.value.map(
      (s, i) => s.seriesId || s.name || `pane${props.paneId}_series_${i}`,
    ),
  );

  // Remove series that no longer exist
  previousSeriesIds.forEach((seriesId) => {
    if (!currentSeriesIds.has(seriesId)) {
      removeSeries(seriesId);
    }
  });

  // Add or update series
  props.series.forEach((config, index) => {
    const seriesId =
      config.seriesId || config.name || `pane${props.paneId}_series_${index}`;
    const previousConfig = previousSeriesConfigs.value.find(
      (s, i) =>
        (s.seriesId || s.name || `pane${props.paneId}_series_${i}`) ===
        seriesId,
    );

    if (!previousConfig) {
      // New series: create it
      createSeries({
        ...config,
        paneId: props.paneId,
      });
    } else if (seriesConfigChanged(previousConfig, config)) {
      // Config changed: recreate series
      removeSeries(seriesId);
      createSeries({
        ...config,
        paneId: props.paneId,
      });
    } else if (!shallowEqual(previousConfig.data, config.data)) {
      // Data array reference changed: use incremental update
      updateSeriesData(seriesId, config.data || [], false);
    }
  });

  // Update tracked configs (shallow copy for change detection)
  previousSeriesConfigs.value = [...props.series];
}

// Watch for chart initialization
watch(
  () => chart?.value,
  (newChart) => {
    if (newChart) {
      initializeSeries();
    }
  },
  { immediate: true },
);

// Watch for series prop changes
watch(
  () => props.series,
  () => {
    initializeSeries();
  },
  { deep: true },
);

// Watch for collapsed prop changes
watch(
  () => props.collapsed,
  (newCollapsed) => {
    isCollapsed.value = newCollapsed;
  },
);

// Cleanup on unmount
onUnmounted(() => {
  localSeriesMap.value.forEach((_, seriesId) => {
    removeSeries(seriesId);
  });
  previousSeriesConfigs.value = [];
});

// Expose public API
defineExpose({
  /** Pane ID */
  paneId: props.paneId,
  /** Local series map */
  seriesMap: localSeriesMap,
  /** Create a series */
  createSeries,
  /** Remove a series */
  removeSeries,
  /** Update series data */
  updateSeriesData,
  /** Get a series */
  getSeries,
  /** Toggle collapse */
  toggleCollapse,
  /** Collapsed state */
  isCollapsed,
});
</script>

<template>
  <div
    class="chart-pane"
    :class="{ collapsed: isCollapsed }"
    :style="{ height: computedHeight }"
  >
    <div v-if="title" class="pane-header">
      <span class="pane-title">{{ title }}</span>
      <button
        v-if="!isCollapsed"
        class="collapse-btn"
        title="Collapse pane"
        @click="toggleCollapse"
      >
        −
      </button>
      <button
        v-else
        class="collapse-btn"
        title="Expand pane"
        @click="toggleCollapse"
      >
        +
      </button>
    </div>
    <div v-if="!isCollapsed" class="pane-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.chart-pane {
  position: relative;
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
}

.chart-pane.collapsed {
  height: 30px !important;
  min-height: 30px;
  overflow: hidden;
}

.pane-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  background: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
  font-size: 12px;
}

.pane-title {
  font-weight: 500;
  color: #333;
}

.collapse-btn {
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background: white;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.collapse-btn:hover {
  background: #e0e0e0;
}

.pane-content {
  width: 100%;
  height: calc(100% - 30px);
}

.chart-pane:not(:has(.pane-header)) .pane-content {
  height: 100%;
}
</style>
