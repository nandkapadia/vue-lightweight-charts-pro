<template>
  <Series
    type="band"
    v-bind="seriesProps"
  >
    <slot />
  </Series>
</template>

<script setup lang="ts">
/**
 * @fileoverview Band Series component for Vue 3 (Custom Series).
 *
 * Provides a type-safe wrapper around the generic Series component for displaying
 * band charts. Band series render two lines (upper and lower) with a filled area
 * between them, ideal for Bollinger Bands, Keltner Channels, or price envelopes.
 *
 * This is a custom series type provided by @lightweight-charts-pro/core.
 *
 * @module components/BandSeries
 *
 * @example Bollinger Bands
 * ```vue
 * <BandSeries
 *   :data="bollingerData"
 *   series-id="bollinger"
 *   upper-line-color="#2196F3"
 *   lower-line-color="#2196F3"
 *   fill-color="rgba(33, 150, 243, 0.1)"
 *   :line-width="1"
 * />
 * ```
 *
 * @example Price envelope
 * ```vue
 * <BandSeries
 *   :data="envelopeData"
 *   upper-line-color="#26a69a"
 *   lower-line-color="#ef5350"
 *   fill-color="rgba(128, 128, 128, 0.1)"
 * />
 * ```
 *
 * @example Data format
 * ```typescript
 * // Band data requires upper and lower values
 * const bandData = [
 *   { time: 1234567890, upper: 105, lower: 95 },
 *   { time: 1234567900, upper: 106, lower: 94 },
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
 * Props for BandSeries component.
 *
 * Extends base series props with band-specific styling options including
 * separate colors for upper/lower lines and fill area.
 */
interface Props {
  /** Band data points containing time, upper, and lower values */
  data?: DataPoint[];
  /** Unique identifier for the series (auto-generated if not provided) */
  seriesId?: string;
  /** Pane index for multi-pane charts (default: 0) */
  paneId?: number;
  /** Color of the upper band line */
  upperLineColor?: string;
  /** Color of the lower band line */
  lowerLineColor?: string;
  /** Fill color for the area between upper and lower lines */
  fillColor?: string;
  /** Width of both band lines in pixels */
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
 * Maps BandSeries-specific props to the generic Series component format.
 */
const seriesProps = computed(() => ({
  data: props.data,
  seriesId: props.seriesId,
  paneId: props.paneId,
  options: {
    upperLineColor: props.upperLineColor,
    lowerLineColor: props.lowerLineColor,
    fillColor: props.fillColor,
    lineWidth: props.lineWidth,
  },
  priceLines: props.priceLines,
  markers: props.markers,
  annotations: props.annotations,
}));
</script>
