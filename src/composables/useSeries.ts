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

      // Build config for core's createSeriesWithConfig
      const config: ExtendedSeriesConfig = {
        type: props.type,
        data: props.data || [],
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
   * Update series data
   */
  function updateData(newData: DataPoint[]) {
    if (series.value && newData) {
      try {
        series.value.setData(newData as any);
      } catch (err) {
        logger.error('Failed to update series data', 'useSeries', err);
      }
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
