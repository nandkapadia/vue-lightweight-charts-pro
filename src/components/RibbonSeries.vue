<template>
  <Series
    type="ribbon"
    v-bind="seriesProps"
  >
    <slot />
  </Series>
</template>

<script setup lang="ts">
/**
 * @fileoverview Ribbon Series component for Vue 3 (Custom Series).
 *
 * Provides a type-safe wrapper around the generic Series component for displaying
 * ribbon charts. Ribbon series render multiple lines with filled areas between
 * adjacent pairs, ideal for multi-line moving averages or rainbow indicators.
 *
 * This is a custom series type provided by @lightweight-charts-pro/core.
 *
 * @module components/RibbonSeries
 *
 * @example Moving average ribbon
 * ```vue
 * <RibbonSeries
 *   :data="ribbonData"
 *   series-id="ma-ribbon"
 *   :colors="['#26a69a', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b']"
 *   :line-width="1"
 * />
 * ```
 *
 * @example Rainbow indicator
 * ```vue
 * <RibbonSeries
 *   :data="rainbowData"
 *   :colors="[
 *     'rgba(239, 83, 80, 0.5)',   // red
 *     'rgba(255, 152, 0, 0.5)',   // orange
 *     'rgba(255, 235, 59, 0.5)', // yellow
 *     'rgba(76, 175, 80, 0.5)',  // green
 *     'rgba(33, 150, 243, 0.5)', // blue
 *   ]"
 * />
 * ```
 *
 * @example Data format
 * ```typescript
 * // Ribbon data requires multiple value fields (v1, v2, v3, etc.)
 * const ribbonData = [
 *   { time: 1234567890, v1: 100, v2: 102, v3: 104, v4: 106, v5: 108 },
 *   { time: 1234567900, v1: 101, v2: 103, v3: 105, v4: 107, v5: 109 },
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
 * Props for RibbonSeries component.
 *
 * Extends base series props with ribbon-specific styling options including
 * an array of colors for the multiple ribbon bands.
 */
interface Props {
  /** Ribbon data points containing time and multiple value fields (v1, v2, ...) */
  data?: DataPoint[];
  /** Unique identifier for the series (auto-generated if not provided) */
  seriesId?: string;
  /** Pane index for multi-pane charts (default: 0) */
  paneId?: number;
  /** Array of colors for each ribbon band (gradient from first to last) */
  colors?: string[];
  /** Width of ribbon lines in pixels */
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
 * Maps RibbonSeries-specific props to the generic Series component format.
 */
const seriesProps = computed(() => ({
  data: props.data,
  seriesId: props.seriesId,
  paneId: props.paneId,
  options: {
    colors: props.colors,
    lineWidth: props.lineWidth,
  },
  priceLines: props.priceLines,
  markers: props.markers,
  annotations: props.annotations,
}));
</script>
