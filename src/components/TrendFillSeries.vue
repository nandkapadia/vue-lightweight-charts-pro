<template>
  <Series
    type="trendfill"
    v-bind="seriesProps"
  >
    <slot />
  </Series>
</template>

<script setup lang="ts">
/**
 * @fileoverview Trend Fill Series component for Vue 3 (Custom Series).
 *
 * Provides a type-safe wrapper around the generic Series component for displaying
 * trend-filled charts. Trend fill series render a line with dynamically colored
 * fills based on trend direction - one color for uptrends, another for downtrends.
 *
 * This is a custom series type provided by @lightweight-charts-pro/core.
 *
 * @module components/TrendFillSeries
 *
 * @example Basic trend fill
 * ```vue
 * <TrendFillSeries
 *   :data="priceData"
 *   series-id="trend"
 *   up-trend-color="rgba(38, 166, 154, 0.3)"
 *   down-trend-color="rgba(239, 83, 80, 0.3)"
 *   line-color="#2196F3"
 *   :line-width="2"
 * />
 * ```
 *
 * @example Momentum indicator
 * ```vue
 * <TrendFillSeries
 *   :data="momentumData"
 *   up-trend-color="rgba(76, 175, 80, 0.4)"
 *   down-trend-color="rgba(244, 67, 54, 0.4)"
 *   line-color="#9e9e9e"
 * />
 * ```
 *
 * @example Data format
 * ```typescript
 * // Simple value-based data (trend detected automatically)
 * const trendData = [
 *   { time: 1234567890, value: 100 },
 *   { time: 1234567900, value: 105 }, // uptrend fill
 *   { time: 1234567910, value: 103 }, // downtrend fill
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
 * Props for TrendFillSeries component.
 *
 * Extends base series props with trend-specific styling options including
 * separate fill colors for uptrend and downtrend segments.
 */
interface Props {
  /** Series data points containing time and value */
  data?: DataPoint[];
  /** Unique identifier for the series (auto-generated if not provided) */
  seriesId?: string;
  /** Pane index for multi-pane charts (default: 0) */
  paneId?: number;
  /** Fill color for uptrend segments (value increasing) */
  upTrendColor?: string;
  /** Fill color for downtrend segments (value decreasing) */
  downTrendColor?: string;
  /** Color of the main line */
  lineColor?: string;
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
 * Maps TrendFillSeries-specific props to the generic Series component format.
 */
const seriesProps = computed(() => ({
  data: props.data,
  seriesId: props.seriesId,
  paneId: props.paneId,
  options: {
    upTrendColor: props.upTrendColor,
    downTrendColor: props.downTrendColor,
    lineColor: props.lineColor,
    lineWidth: props.lineWidth,
  },
  priceLines: props.priceLines,
  markers: props.markers,
  annotations: props.annotations,
}));
</script>
