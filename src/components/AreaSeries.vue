<template>
  <Series
    type="area"
    v-bind="seriesProps"
  >
    <slot />
  </Series>
</template>

<script setup lang="ts">
/**
 * @fileoverview Area Series component for Vue 3.
 *
 * Provides a type-safe wrapper around the generic Series component for displaying
 * area charts. Area series render a line with a filled gradient area below,
 * ideal for visualizing volume, cumulative metrics, or emphasizing trends.
 *
 * @module components/AreaSeries
 *
 * @example Basic usage
 * ```vue
 * <AreaSeries
 *   :data="volumeData"
 *   series-id="volume"
 *   top-color="rgba(38, 166, 154, 0.5)"
 *   bottom-color="rgba(38, 166, 154, 0.0)"
 *   line-color="#26a69a"
 * />
 * ```
 *
 * @example With gradient fill
 * ```vue
 * <AreaSeries
 *   :data="priceData"
 *   series-id="price-area"
 *   top-color="rgba(33, 150, 243, 0.4)"
 *   bottom-color="rgba(33, 150, 243, 0.0)"
 *   line-color="#2196F3"
 *   :line-width="2"
 * />
 * ```
 *
 * @example Inverted area (fill above line)
 * ```vue
 * <AreaSeries
 *   :data="data"
 *   :invert-filled-area="true"
 *   top-color="rgba(239, 83, 80, 0.5)"
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
 * Props for AreaSeries component.
 *
 * Extends base series props with area-specific styling options including
 * gradient colors for the fill area and line styling.
 */
interface Props {
  /** Series data points containing time and value */
  data?: DataPoint[];
  /** Unique identifier for the series (auto-generated if not provided) */
  seriesId?: string;
  /** Pane index for multi-pane charts (default: 0) */
  paneId?: number;
  /** Top color of the gradient fill (start of gradient) */
  topColor?: string;
  /** Bottom color of the gradient fill (end of gradient, often transparent) */
  bottomColor?: string;
  /** Color of the line at the top of the area */
  lineColor?: string;
  /**
   * Line style enumeration.
   * - 0: Solid (default)
   * - 1: Dotted
   * - 2: Dashed
   * - 3: Large dashed
   */
  lineStyle?: 0 | 1 | 2 | 3;
  /** Line width in pixels */
  lineWidth?: number;
  /**
   * Line type enumeration.
   * - 0: Simple (straight segments)
   * - 1: With steps
   * - 2: Curved
   */
  lineType?: 0 | 1 | 2;
  /** If true, fill the area above the line instead of below */
  invertFilledArea?: boolean;
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
 * Maps AreaSeries-specific props to the generic Series component format,
 * organizing styling options into the options object.
 */
const seriesProps = computed(() => ({
  data: props.data,
  seriesId: props.seriesId,
  paneId: props.paneId,
  options: {
    topColor: props.topColor,
    bottomColor: props.bottomColor,
    lineColor: props.lineColor,
    lineStyle: props.lineStyle,
    lineWidth: props.lineWidth,
    lineType: props.lineType,
    invertFilledArea: props.invertFilledArea,
  },
  priceLines: props.priceLines,
  markers: props.markers,
  annotations: props.annotations,
}));
</script>
