<template>
  <div style="display: none;">
    <!-- PriceLine is rendered by the chart - no DOM needed -->
  </div>
</template>

<script setup lang="ts">
/**
 * @fileoverview PriceLine component for adding horizontal price lines to a series
 *
 * Must be a child of a Series component. Price lines are horizontal lines at specific
 * price levels, useful for marking support/resistance, stop-loss, take-profit, etc.
 *
 * @example
 * <CandlestickSeries :data="priceData">
 *   <PriceLine :price="100" color="red" line-style="dashed" title="Resistance" />
 *   <PriceLine :price="90" color="green" line-style="solid" title="Support" />
 * </CandlestickSeries>
 */

import { inject, onMounted, onUnmounted, watch, type Ref } from 'vue';
import type { ExtendedSeriesApi } from '@lightweight-charts-pro/core';
import { logger } from '@lightweight-charts-pro/core';
import type { IPriceLine } from 'lightweight-charts';

interface Props {
  price: number;
  color?: string;
  lineWidth?: number;
  lineStyle?: 0 | 1 | 2 | 3; // Solid, Dotted, Dashed, LargeDashed
  lineVisible?: boolean;
  axisLabelVisible?: boolean;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: '#2196F3',
  lineWidth: 1,
  lineStyle: 0,
  lineVisible: true,
  axisLabelVisible: true,
  title: '',
});

const series = inject<Ref<ExtendedSeriesApi | null>>('series');

let priceLine: IPriceLine | null = null;

function createPriceLine() {
  if (!series?.value) {
    logger.warn('Series instance not available. Make sure PriceLine is a child of a Series component.', 'PriceLine');
    return;
  }

  try {
    // Remove existing price line if it exists
    if (priceLine && series.value) {
      series.value.removePriceLine(priceLine);
      priceLine = null;
    }

    // Create price line
    priceLine = series.value.createPriceLine({
      price: props.price,
      color: props.color,
      lineWidth: props.lineWidth,
      lineStyle: props.lineStyle,
      lineVisible: props.lineVisible,
      axisLabelVisible: props.axisLabelVisible,
      title: props.title,
    } as any);
  } catch (error) {
    logger.error('Failed to create price line', 'PriceLine', error);
  }
}

// Watch for price changes
watch(() => props.price, () => {
  createPriceLine();
});

// Watch for style changes
watch(
  () => ({ color: props.color, lineWidth: props.lineWidth, lineStyle: props.lineStyle }),
  () => {
    createPriceLine();
  },
  { deep: true }
);

onMounted(() => {
  createPriceLine();
});

onUnmounted(() => {
  if (priceLine && series?.value) {
    try {
      series.value.removePriceLine(priceLine);
    } catch (error) {
      logger.error('Failed to remove price line', 'PriceLine', error);
    }
  }
  priceLine = null;
});
</script>
