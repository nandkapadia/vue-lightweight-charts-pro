<template>
  <div style="display: none;">
    <!-- Trade visualization is rendered by the chart - no DOM needed -->
  </div>
</template>

<script setup lang="ts">
/**
 * @fileoverview Trade component for visualizing trades on a series
 *
 * Must be a child of a Series component. Trades show entry/exit points with markers,
 * rectangles spanning the trade duration, and optional P&L annotations.
 *
 * @example
 * <CandlestickSeries :data="priceData">
 *   <Trade
 *     :entry="{ time: 1234567890, price: 95 }"
 *     :exit="{ time: 1234567900, price: 105 }"
 *     :profitable="true"
 *     :pnl="10"
 *     :pnl-percentage="10.5"
 *   />
 * </CandlestickSeries>
 */

import { inject, onMounted, type Ref } from 'vue';
import type { ExtendedSeriesApi } from '@lightweight-charts-pro/core';
import { createTradeVisualElements, logger } from '@lightweight-charts-pro/core';
import { createSeriesMarkers } from 'lightweight-charts';

interface TradePoint {
  time: number | string;
  price: number;
}

interface Props {
  entry: TradePoint;
  exit: TradePoint;
  profitable?: boolean;
  pnl?: number;
  pnlPercentage?: number;
  tradeType?: 'long' | 'short';
  id?: string;
  quantity?: number;
  notes?: string;
  // Visualization options
  style?: 'markers' | 'rectangles' | 'both' | 'lines' | 'arrows' | 'zones';
  showAnnotations?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  profitable: true,
  tradeType: 'long',
  style: 'both',
  showAnnotations: true,
});

const series = inject<Ref<ExtendedSeriesApi | null>>('series');

onMounted(() => {
  if (!series?.value) {
    logger.warn('Series instance not available. Make sure Trade is a child of a Series component.', 'Trade');
    return;
  }

  try {
    // Build trade config
    const tradeConfig = {
      id: props.id || `trade-${Date.now()}`,
      entryTime: props.entry.time,
      entryPrice: props.entry.price,
      exitTime: props.exit.time,
      exitPrice: props.exit.price,
      isProfitable: props.profitable,
      pnl: props.pnl,
      pnlPercentage: props.pnlPercentage,
      tradeType: props.tradeType,
      quantity: props.quantity,
      notes: props.notes,
    };

    // Build visualization options
    const visualOptions = {
      style: props.style,
      showAnnotations: props.showAnnotations,
    };

    // Get series data for context
    const seriesData = (series.value as any).data?.() || [];

    // Create trade visual elements
    const tradeVisuals = createTradeVisualElements(
      [tradeConfig],
      visualOptions as any,
      seriesData
    );

    // Apply markers
    if (tradeVisuals.markers?.length) {
      const existingMarkers = (series.value as any).markers?.() || [];
      createSeriesMarkers(series.value, [...existingMarkers, ...tradeVisuals.markers]);
    }

    // Note: Rectangles are handled by core's RectangleOverlayPlugin
    // which is set up by the unified series factory
  } catch (error) {
    logger.error('Failed to create trade visualization', 'Trade', error);
  }
});
</script>
