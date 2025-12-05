<template>
  <Series
    type="bar"
    v-bind="seriesProps"
  >
    <slot />
  </Series>
</template>

<script setup lang="ts">
/**
 * @fileoverview Bar Series (OHLC) component for Vue 3.
 *
 * Provides a type-safe wrapper around the generic Series component for displaying
 * OHLC bar charts. Bar series show open, high, low, close data using vertical
 * bars with horizontal ticks for open (left) and close (right) prices.
 *
 * @module components/BarSeries
 *
 * @example Basic usage
 * ```vue
 * <BarSeries
 *   :data="ohlcData"
 *   series-id="price"
 *   up-color="#26a69a"
 *   down-color="#ef5350"
 * />
 * ```
 *
 * @example With thin bars
 * ```vue
 * <BarSeries
 *   :data="ohlcData"
 *   :thin-bars="true"
 *   :open-visible="true"
 * />
 * ```
 *
 * @example With markers
 * ```vue
 * <BarSeries :data="ohlcData" series-id="price">
 *   <Marker :time="1234567890" position="above" text="Signal" color="blue" />
 * </BarSeries>
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
 * Props for BarSeries component.
 *
 * Extends base series props with OHLC bar-specific styling options
 * including up/down colors and bar thickness.
 */
interface Props {
  /** OHLC data points containing time, open, high, low, close */
  data?: DataPoint[];
  /** Unique identifier for the series (auto-generated if not provided) */
  seriesId?: string;
  /** Pane index for multi-pane charts (default: 0) */
  paneId?: number;
  /** Color for bars where close >= open (bullish) */
  upColor?: string;
  /** Color for bars where close < open (bearish) */
  downColor?: string;
  /** Whether to show the open price tick mark on the left */
  openVisible?: boolean;
  /** Whether to render thin bars (single pixel width) */
  thinBars?: boolean;
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
 * Maps BarSeries-specific props to the generic Series component format.
 */
const seriesProps = computed(() => ({
  data: props.data,
  seriesId: props.seriesId,
  paneId: props.paneId,
  options: {
    upColor: props.upColor,
    downColor: props.downColor,
    openVisible: props.openVisible,
    thinBars: props.thinBars,
  },
  priceLines: props.priceLines,
  markers: props.markers,
  annotations: props.annotations,
}));
</script>
