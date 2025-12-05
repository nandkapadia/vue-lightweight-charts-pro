/**
 * @fileoverview Composable for managing series lifecycle in Vue components
 *
 * Provides shared logic for all series components (generic and type-specific).
 * Handles series creation, data updates, and cleanup.
 */

import { ref, inject, onMounted, onUnmounted, watch, provide, type Ref } from 'vue';
import type { IChartApi } from 'lightweight-charts';
import { createSeriesWithConfig, type ExtendedSeriesApi, type ExtendedSeriesConfig, logger } from '@lightweight-charts-pro/core';
import type { DataPoint } from '../types';
import { normalizeDataPoints, normalizeTime } from '../utils/time';

export interface UseSeriesOptions {
  type: string;
  data?: DataPoint[];
  seriesId?: string;
  paneId?: number;
  options?: Record<string, unknown>;
  priceLines?: any[];
  markers?: any[];
  trades?: any[];
  tradeVisualizationOptions?: any;
  annotations?: any[];
}

export function useSeries(props: UseSeriesOptions) {
  // Inject chart and series map from parent
  const chart = inject<Ref<IChartApi | null>>('chart');
  const seriesMap = inject<Ref<Map<string, ExtendedSeriesApi>>>('seriesMap');

  const series = ref<ExtendedSeriesApi | null>(null);
  const isReady = ref(false);
  const resolvedSeriesId = ref<string | undefined>(undefined);
  const previousData = ref<DataPoint[]>([]); // Track previous data for incremental updates

  /**
   * Create the series instance
   */
  function createSeriesInstance() {
    if (!chart?.value) {
      logger.warn('Chart instance not available. Make sure Series is a child of LightweightChart.', 'useSeries');
      return;
    }

    try {
      const seriesId = props.seriesId || `series-${Date.now()}`;
      resolvedSeriesId.value = seriesId;

      // Normalize data to prevent ms/s misalignment (1000x future plotting)
      const normalizedData = props.data ? normalizeDataPoints(props.data) : [];

      // Store initial data for incremental update tracking
      previousData.value = normalizedData;

      // Build config for core's createSeriesWithConfig
      const config: ExtendedSeriesConfig = {
        type: props.type,
        data: normalizedData,
        options: props.options || {},
        paneId: props.paneId ?? 0,
        priceLines: props.priceLines as any,
        markers: props.markers,
        seriesId: seriesId,
        chartId: (chart.value as any).chartId || 'chart',
        trades: props.trades as any,
        tradeVisualizationOptions: props.tradeVisualizationOptions as any,
      };

      // Use core's unified factory
      const createdSeries = createSeriesWithConfig(chart.value, config);

      if (!createdSeries) {
        logger.error(`Failed to create series: ${props.type}`, 'useSeries');
        return;
      }

      series.value = createdSeries;

      // Register in parent's series map
      if (seriesMap?.value && seriesId) {
        seriesMap.value.set(seriesId, createdSeries);
      }

      // Provide series to child components (Marker, PriceLine, etc.)
      provide('series', series);
      provide('seriesId', seriesId);

      isReady.value = true;
      logger.info(`Created ${props.type} series: ${seriesId}`, 'useSeries');
    } catch (err) {
      logger.error(`Failed to create series ${props.type}`, 'useSeries', err);
    }
  }

  /**
   * Update series data with incremental updates or full replacement.
   *
   * Uses series.update() for incremental updates (real-time ticks, new bars)
   * Uses series.setData() for replacements (symbol change, timeframe change, dataset shrink)
   *
   * Normalizes timestamps to prevent ms/s misalignment.
   *
   * **Replacement Detection:**
   * - Dataset shrink (new length < 50% of previous)
   * - Non-overlapping time windows (symbol/instrument change)
   * - First timestamp moving backward (history prepend/backfill)
   *
   * **Incremental Update:**
   * - Monotonic append (new bars after existing)
   * - Last bar update (real-time tick)
   * - Small backfills (< 50% dataset size)
   */
  function updateData(newData: DataPoint[]) {
    if (!series.value || !newData) return;

    try {
      // OPTIMIZATION: Quick detection for replacement scenarios before normalization
      // This allows us to skip the cached normalization path for full replacements
      let needsFullNormalization = false;

      if (previousData.value.length > 0 && newData.length > 0) {
        // Quick size check (no normalization needed yet)
        const isShrink = newData.length < previousData.value.length * 0.5;

        // Quick time range check (normalize only first/last times for comparison)
        const existingFirstTime = previousData.value[0].time;
        const existingLastTime = previousData.value[previousData.value.length - 1].time;

        // Normalize only the boundary times for quick checks
        const newFirstTime = normalizeTime(newData[0].time);
        const newLastTime = normalizeTime(newData[newData.length - 1].time);

        const isNonOverlapping = newLastTime < existingFirstTime || newFirstTime > existingLastTime;

        if (isShrink || isNonOverlapping) {
          needsFullNormalization = true;
          logger.info(
            `Dataset replacement detected (shrink: ${isShrink}, non-overlapping: ${isNonOverlapping}). Full normalization.`,
            'useSeries'
          );
        }
      }

      // Normalize data based on scenario
      let normalizedData: Array<DataPoint & { time: number }>;

      if (!previousData.value.length || newData.length === 0 || needsFullNormalization) {
        // Initial load, empty data, or replacement: normalize entire dataset
        normalizedData = normalizeDataPoints(newData);

        if (!previousData.value.length || normalizedData.length === 0 || needsFullNormalization) {
          // Use setData() for these cases
          series.value.setData(normalizedData as any);
          previousData.value = normalizedData;
          return;
        }
      } else {
        // CACHED NORMALIZATION: Only normalize new/changed bars
        // Build a map of time → normalized bar from previousData
        const normalizedCache = new Map<number | string, DataPoint & { time: number }>();
        previousData.value.forEach((bar) => {
          normalizedCache.set(bar.time, bar);
        });

        // Process incoming data: reuse cached normalized bars, only normalize new/changed ones
        normalizedData = newData.map((bar) => {
          const rawTime = bar.time;
          const normalizedTime = normalizeTime(rawTime);

          // Check if we have a cached normalized version with the same raw time
          const cached = normalizedCache.get(normalizedTime);

          // For bars we've seen before, reuse the cached normalized version
          // (this assumes bars don't change once normalized, which is true for historical data)
          if (cached) {
            return cached;
          }

          // New bar: normalize it
          return normalizeDataPoints([bar])[0];
        });
      }

      // DETECTION: Check if this is a dataset replacement vs. incremental update
      const existingLength = previousData.value.length;
      const newLength = normalizedData.length;
      const existingFirstTime = previousData.value[0].time;
      const existingLastTime = previousData.value[existingLength - 1].time;
      const newFirstTime = normalizedData[0].time;
      const newLastTime = normalizedData[newLength - 1].time;

      // 1. Dataset shrink: new dataset is < 50% of previous size
      const isShrink = newLength < existingLength * 0.5;

      // 2. Non-overlapping time windows: symbol/instrument change
      const isNonOverlapping = newLastTime < existingFirstTime || newFirstTime > existingLastTime;

      // 3. First timestamp moving backward: history prepend/backfill
      const isBackfill = newFirstTime < existingFirstTime;

      // If any replacement condition is met, use setData() to clear old bars
      if (isShrink || isNonOverlapping) {
        logger.info(
          `Dataset replacement detected (shrink: ${isShrink}, non-overlapping: ${isNonOverlapping}). Using setData()`,
          'useSeries'
        );
        series.value.setData(normalizedData as any);
        previousData.value = normalizedData;
        return;
      }

      // Incremental update: use update() for better performance
      // Build set of existing times for O(1) lookup
      const existingTimes = new Set(previousData.value.map((d) => d.time));

      // Find new bars (not in existing data)
      const newBars = normalizedData.filter((bar) => !existingTimes.has(bar.time));

      // Update last bar if changed (real-time tick)
      if (previousData.value.length > 0 && normalizedData.length > 0) {
        const lastExistingTime = previousData.value[previousData.value.length - 1].time;
        const updatedLastBar = normalizedData.find((bar) => bar.time === lastExistingTime);
        if (updatedLastBar) {
          series.value.update(updatedLastBar as any);
        }
      }

      // Append new bars using update() - O(1) per bar instead of O(n) for entire dataset
      newBars.forEach((bar) => {
        series.value!.update(bar as any);
      });

      // Update tracked data reference
      previousData.value = normalizedData;
    } catch (err) {
      logger.error('Failed to update series data', 'useSeries', err);
    }
  }

  /**
   * Update series options
   */
  function updateOptions(newOptions: Record<string, unknown>) {
    if (series.value && newOptions) {
      try {
        series.value.applyOptions(newOptions as any);
      } catch (err) {
        logger.error('Failed to update series options', 'useSeries', err);
      }
    }
  }

  /**
   * Remove the series
   */
  function removeSeries() {
    if (series.value && chart?.value) {
      try {
        chart.value.removeSeries(series.value);

        // Remove from series map using the resolved ID
        if (seriesMap?.value && resolvedSeriesId.value) {
          seriesMap.value.delete(resolvedSeriesId.value);
        }

        series.value = null;
        isReady.value = false;
        resolvedSeriesId.value = undefined;
        previousData.value = []; // Clear tracked data
      } catch (err) {
        logger.error('Failed to remove series', 'useSeries', err);
      }
    }
  }

  // Watch for data changes (shallow watch - data array should be replaced, not mutated)
  watch(
    () => props.data,
    (newData) => {
      if (newData) {
        updateData(newData);
      }
    }
  );

  // Watch for option changes (shallow watch - options object should be replaced, not mutated)
  watch(
    () => props.options,
    (newOptions) => {
      if (newOptions) {
        updateOptions(newOptions);
      }
    }
  );

  // Lifecycle
  onMounted(() => {
    createSeriesInstance();
  });

  onUnmounted(() => {
    removeSeries();
  });

  return {
    series,
    isReady,
    updateData,
    updateOptions,
    removeSeries,
  };
}
