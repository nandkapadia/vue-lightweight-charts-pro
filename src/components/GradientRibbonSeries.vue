<template>
  <Series
    type="gradientribbon"
    v-bind="seriesProps"
  >
    <slot />
  </Series>
</template>

<script setup lang="ts">
/**
 * @fileoverview Gradient Ribbon Series component for Vue 3 (Custom Series).
 *
 * Provides a type-safe wrapper around the generic Series component for displaying
 * gradient ribbon charts. Gradient ribbon series render a line with a smooth
 * vertical gradient fill, ideal for emphasizing trend strength or momentum.
 *
 * This is a custom series type provided by @lightweight-charts-pro/core.
 *
 * @module components/GradientRibbonSeries
 *
 * @example Basic gradient ribbon
 * ```vue
 * <GradientRibbonSeries
 *   :data="priceData"
 *   series-id="gradient"
 *   top-color="rgba(33, 150, 243, 0.5)"
 *   bottom-color="rgba(33, 150, 243, 0.0)"
 *   :line-width="2"
 * />
 * ```
 *
 * @example Trend strength indicator
 * ```vue
 * <GradientRibbonSeries
 *   :data="trendData"
 *   top-color="rgba(38, 166, 154, 0.6)"
 *   bottom-color="rgba(38, 166, 154, 0.0)"
 * />
 * ```
 *
 * @example Data format
 * ```typescript
 * // Simple value-based data
 * const gradientData = [
 *   { time: 1234567890, value: 100 },
 *   { time: 1234567900, value: 105 },
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
 * Props for GradientRibbonSeries component.
 *
 * Extends base series props with gradient-specific styling options including
 * top and bottom colors for the vertical gradient fill.
 */
interface Props {
  /** Series data points containing time and value */
  data?: DataPoint[];
  /** Unique identifier for the series (auto-generated if not provided) */
  seriesId?: string;
  /** Pane index for multi-pane charts (default: 0) */
  paneId?: number;
  /** Top color of the vertical gradient (near the line) */
  topColor?: string;
  /** Bottom color of the vertical gradient (fades to this) */
  bottomColor?: string;
  /** Width of the line in pixels */
  lineWidth?: number;
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
 * Maps GradientRibbonSeries-specific props to the generic Series component format.
 */
const seriesProps = computed(() => ({
  data: props.data,
  seriesId: props.seriesId,
  paneId: props.paneId,
  options: {
    topColor: props.topColor,
    bottomColor: props.bottomColor,
    lineWidth: props.lineWidth,
  },
  priceLines: props.priceLines,
  markers: props.markers,
  annotations: props.annotations,
}));
</script>
