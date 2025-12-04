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
import { normalizeDataPoints } from '../utils/time';

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
   * Update series data with incremental updates.
   * Uses series.update() for new bars instead of setData() to avoid full re-sort.
   * Normalizes timestamps to prevent ms/s misalignment.
   */
  function updateData(newData: DataPoint[]) {
    if (!series.value || !newData) return;

    try {
      // Normalize data to ensure consistent time format
      const normalizedData = normalizeDataPoints(newData);

      // Check if this is initial load or empty data
      if (!previousData.value.length || normalizedData.length === 0) {
        // Initial load or empty data: use setData()
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
