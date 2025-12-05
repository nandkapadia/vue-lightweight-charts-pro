<template>
  <Series
    type="signal"
    v-bind="seriesProps"
  >
    <slot />
  </Series>
</template>

<script setup lang="ts">
/**
 * @fileoverview Signal Series component for Vue 3 (Custom Series).
 *
 * Provides a type-safe wrapper around the generic Series component for displaying
 * trading signal charts. Signal series render buy/sell/neutral signals with
 * distinct colors, ideal for algorithmic trading indicators or signal overlays.
 *
 * This is a custom series type provided by @lightweight-charts-pro/core.
 *
 * @module components/SignalSeries
 *
 * @example Trading signals
 * ```vue
 * <SignalSeries
 *   :data="signalData"
 *   series-id="signals"
 *   buy-color="#26a69a"
 *   sell-color="#ef5350"
 *   neutral-color="#9e9e9e"
 * />
 * ```
 *
 * @example With custom colors
 * ```vue
 * <SignalSeries
 *   :data="signalData"
 *   buy-color="rgba(38, 166, 154, 0.8)"
 *   sell-color="rgba(239, 83, 80, 0.8)"
 *   neutral-color="rgba(158, 158, 158, 0.5)"
 * />
 * ```
 *
 * @example Data format
 * ```typescript
 * // Signal data with signal type field
 * const signalData = [
 *   { time: 1234567890, value: 100, signal: 'buy' },   // Buy signal
 *   { time: 1234567900, value: 102, signal: 'hold' },  // Neutral/hold
 *   { time: 1234567910, value: 98, signal: 'sell' },   // Sell signal
 * ];
 * ```
 */

// -----------------------------------------------------------------------------
// Local Component Imports
// -----------------------------------------------------------------------------

import Series from "./Series.vue";

// -----------------------------------------------------------------------------
// Type Imports
// -----------------------------------------------------------------------------

import type { DataPoint } from "../types";
import type { Annotation } from "@lightweight-charts-pro/core";
import type {
  CreatePriceLineOptions,
  SeriesMarker,
  Time,
} from "lightweight-charts";

// -----------------------------------------------------------------------------
// Vue Core Imports
// -----------------------------------------------------------------------------

import { computed } from "vue";

// -----------------------------------------------------------------------------
// Props Interface
// -----------------------------------------------------------------------------

/**
 * Props for SignalSeries component.
 *
 * Extends base series props with signal-specific styling options including
 * distinct colors for buy, sell, and neutral signals.
 */
interface Props {
  /** Signal data points containing time, value, and signal type */
  data?: DataPoint[];
  /** Unique identifier for the series (auto-generated if not provided) */
  seriesId?: string;
  /** Pane index for multi-pane charts (default: 0) */
  paneId?: number;
  /** Color for buy signals */
  buyColor?: string;
  /** Color for sell signals */
  sellColor?: string;
  /** Color for neutral/hold signals */
  neutralColor?: string;
  /** Array of horizontal price lines to display */
  priceLines?: CreatePriceLineOptions[];
  /** Array of markers to display on the series */
  markers?: SeriesMarker<Time>[];
  /** Array of annotations to display on the series */
  annotations?: Annotation[];
}

const props = defineProps<Props>();

// -----------------------------------------------------------------------------
// Computed Properties
// -----------------------------------------------------------------------------

/**
 * Computed props to pass to the underlying Series component.
 *
 * Maps SignalSeries-specific props to the generic Series component format.
 */
const seriesProps = computed(() => ({
  data: props.data,
  seriesId: props.seriesId,
  paneId: props.paneId,
  options: {
    buyColor: props.buyColor,
    sellColor: props.sellColor,
    neutralColor: props.neutralColor,
  },
  priceLines: props.priceLines,
  markers: props.markers,
  annotations: props.annotations,
}));
</script>
