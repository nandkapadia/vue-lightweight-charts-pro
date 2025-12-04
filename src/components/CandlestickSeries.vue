<template>
  <Series type="candlestick" v-bind="seriesProps">
    <slot />
  </Series>
</template>

<script setup lang="ts">
/**
 * @fileoverview Candlestick Series component with proper TypeScript types
 *
 * @example
 * <CandlestickSeries
 *   :data="priceData"
 *   series-id="price"
 *   up-color="#26a69a"
 *   down-color="#ef5350"
 * >
 *   <Marker :time="123" position="above" />
 * </CandlestickSeries>
 */

import Series from './Series.vue';
import type { DataPoint } from '../types';
import { computed } from 'vue';

interface Props {
  data?: DataPoint[];
  seriesId?: string;
  paneId?: number;
  // Candlestick-specific options
  upColor?: string;
  downColor?: string;
  wickUpColor?: string;
  wickDownColor?: string;
  borderVisible?: boolean;
  borderColor?: string;
  borderUpColor?: string;
  borderDownColor?: string;
  wickVisible?: boolean;
  // General options
  priceLines?: any[];
  markers?: any[];
  trades?: any[];
  tradeVisualizationOptions?: any;
  annotations?: any[];
}

const props = defineProps<Props>();

const seriesProps = computed(() => ({
  data: props.data,
  seriesId: props.seriesId,
  paneId: props.paneId,
  options: {
    upColor: props.upColor,
    downColor: props.downColor,
    wickUpColor: props.wickUpColor,
    wickDownColor: props.wickDownColor,
    borderVisible: props.borderVisible,
    borderColor: props.borderColor,
    borderUpColor: props.borderUpColor,
    borderDownColor: props.borderDownColor,
    wickVisible: props.wickVisible,
  },
  priceLines: props.priceLines,
  markers: props.markers,
  trades: props.trades,
  tradeVisualizationOptions: props.tradeVisualizationOptions,
  annotations: props.annotations,
}));
</script>
