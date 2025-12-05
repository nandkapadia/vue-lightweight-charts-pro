<template>
  <div style="display: none">
    <!-- Child components (Marker, PriceLine, Trade, Annotation) will be rendered here -->
    <slot v-if="isReady" />
  </div>
</template>

<script setup lang="ts">
/**
 * @fileoverview Generic Series component (accepts any series type)
 *
 * This is the flexible approach for dynamic series types or when you don't need
 * type-specific autocomplete. For better DX with TypeScript, use type-specific
 * components like <CandlestickSeries />, <LineSeries />, etc.
 *
 * @example Generic usage:
 * <Series type="candlestick" :data="priceData" series-id="price" />
 *
 * @example With nested components:
 * <Series type="candlestick" :data="priceData" series-id="price">
 *   <Marker :time="123" position="above" text="Buy" />
 *   <PriceLine :price="100" color="red" />
 * </Series>
 *
 * @example Dynamic type:
 * <Series :type="selectedType" :data="data" />
 */

import { useSeries } from "../composables/useSeries";
import type { DataPoint } from "../types";

interface Props {
  /** Series type (e.g., 'line', 'candlestick', 'band', etc.) */
  type: string;
  /** Series data points */
  data?: DataPoint[];
  /** Unique series identifier */
  seriesId?: string;
  /** Pane ID for multi-pane charts */
  paneId?: number;
  /** Series options (flexible for all series types) */
  options?: Record<string, unknown>;
  /** Price lines configuration */
  priceLines?: any[];
  /** Markers configuration */
  markers?: any[];
  /** Trades configuration */
  trades?: any[];
  /** Trade visualization options */
  tradeVisualizationOptions?: any;
  /** Annotations configuration */
  annotations?: any[];
}

const props = defineProps<Props>();

const { series, isReady } = useSeries({
  type: props.type,
  data: props.data,
  seriesId: props.seriesId,
  paneId: props.paneId,
  options: props.options,
  priceLines: props.priceLines,
  markers: props.markers,
  trades: props.trades,
  tradeVisualizationOptions: props.tradeVisualizationOptions,
  annotations: props.annotations,
});

// Expose series for parent access
defineExpose({
  series,
  isReady,
});
</script>

<style scoped>
/* Series is managed by chart - no styles needed */
</style>
