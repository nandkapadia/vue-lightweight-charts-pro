<template>
  <Series
    type="baseline"
    v-bind="seriesProps"
  >
    <slot />
  </Series>
</template>

<script setup lang="ts">
/**
 * @fileoverview Baseline Series component for Vue 3.
 *
 * Provides a type-safe wrapper around the generic Series component for displaying
 * baseline charts. Baseline series show data relative to a base value with
 * different colors and fills for values above and below the baseline.
 *
 * Ideal for visualizing profit/loss, performance vs benchmark, or any metric
 * where deviation from a reference value matters.
 *
 * @module components/BaselineSeries
 *
 * @example Basic usage
 * ```vue
 * <BaselineSeries
 *   :data="pnlData"
 *   series-id="pnl"
 *   :base-value="0"
 *   top-line-color="#26a69a"
 *   bottom-line-color="#ef5350"
 * />
 * ```
 *
 * @example Performance vs benchmark
 * ```vue
 * <BaselineSeries
 *   :data="performanceData"
 *   :base-value="100"
 *   top-line-color="rgba(38, 166, 154, 1)"
 *   top-fill-color1="rgba(38, 166, 154, 0.4)"
 *   top-fill-color2="rgba(38, 166, 154, 0.0)"
 *   bottom-line-color="rgba(239, 83, 80, 1)"
 *   bottom-fill-color1="rgba(239, 83, 80, 0.4)"
 *   bottom-fill-color2="rgba(239, 83, 80, 0.0)"
 * />
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
 * Props for BaselineSeries component.
 *
 * Extends base series props with baseline-specific styling options including
 * separate colors for values above/below the baseline and gradient fills.
 */
interface Props {
  /** Series data points containing time and value */
  data?: DataPoint[];
  /** Unique identifier for the series (auto-generated if not provided) */
  seriesId?: string;
  /** Pane index for multi-pane charts (default: 0) */
  paneId?: number;
  /** The baseline value that separates top/bottom styling */
  baseValue?: number;
  /** Line color for values above the baseline */
  topLineColor?: string;
  /** Top gradient color for area above baseline (near line) */
  topFillColor1?: string;
  /** Bottom gradient color for area above baseline (near baseline) */
  topFillColor2?: string;
  /** Line color for values below the baseline */
  bottomLineColor?: string;
  /** Top gradient color for area below baseline (near baseline) */
  bottomFillColor1?: string;
  /** Bottom gradient color for area below baseline (far from baseline) */
  bottomFillColor2?: string;
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
 * Maps BaselineSeries-specific props to the generic Series component format.
 */
const seriesProps = computed(() => ({
  data: props.data,
  seriesId: props.seriesId,
  paneId: props.paneId,
  options: {
    baseValue: props.baseValue,
    topLineColor: props.topLineColor,
    topFillColor1: props.topFillColor1,
    topFillColor2: props.topFillColor2,
    bottomLineColor: props.bottomLineColor,
    bottomFillColor1: props.bottomFillColor1,
    bottomFillColor2: props.bottomFillColor2,
  },
  priceLines: props.priceLines,
  markers: props.markers,
  annotations: props.annotations,
}));
</script>
