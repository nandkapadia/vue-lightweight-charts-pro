<template>
  <Series
    type="histogram"
    v-bind="seriesProps"
  >
    <slot />
  </Series>
</template>

<script setup lang="ts">
/**
 * @fileoverview Histogram Series component for Vue 3.
 *
 * Provides a type-safe wrapper around the generic Series component for displaying
 * histogram charts. Histogram series render vertical bars from a base value,
 * ideal for volume, oscillators, or discrete value distributions.
 *
 * Each bar can have its own color by including a `color` field in the data point.
 *
 * @module components/HistogramSeries
 *
 * @example Basic volume histogram
 * ```vue
 * <HistogramSeries
 *   :data="volumeData"
 *   series-id="volume"
 *   color="rgba(38, 166, 154, 0.5)"
 *   :base="0"
 * />
 * ```
 *
 * @example With per-bar colors (data format)
 * ```typescript
 * // Each data point can have its own color
 * const volumeData = [
 *   { time: 1234567890, value: 100, color: '#26a69a' }, // green
 *   { time: 1234567900, value: 80, color: '#ef5350' },  // red
 * ];
 * ```
 *
 * @example Per-bar colors template
 * ```vue
 * <HistogramSeries :data="volumeData" series-id="volume" />
 * ```
 *
 * @example In separate pane
 * ```vue
 * <LightweightChart>
 *   <CandlestickSeries :data="priceData" :pane-id="0" />
 *   <HistogramSeries :data="volumeData" :pane-id="1" color="#2196F3" />
 * </LightweightChart>
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
 * Props for HistogramSeries component.
 *
 * Extends base series props with histogram-specific options including
 * bar color and base value.
 */
interface Props {
  /** Series data points containing time and value (optionally color per bar) */
  data?: DataPoint[];
  /** Unique identifier for the series (auto-generated if not provided) */
  seriesId?: string;
  /** Pane index for multi-pane charts (default: 0) */
  paneId?: number;
  /** Default bar color (can be overridden per data point) */
  color?: string;
  /** Base value from which bars are drawn (default: 0) */
  base?: number;
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
 * Maps HistogramSeries-specific props to the generic Series component format.
 */
const seriesProps = computed(() => ({
  data: props.data,
  seriesId: props.seriesId,
  paneId: props.paneId,
  options: {
    color: props.color,
    base: props.base,
  },
  priceLines: props.priceLines,
  markers: props.markers,
  annotations: props.annotations,
}));
</script>
