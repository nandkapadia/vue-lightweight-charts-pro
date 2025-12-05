<template>
  <Series
    type="line"
    v-bind="seriesProps"
  >
    <slot />
  </Series>
</template>

<script setup lang="ts">
/**
 * @fileoverview Line Series component for Vue 3.
 *
 * Provides a type-safe wrapper around the generic Series component for displaying
 * line charts. Line series are ideal for visualizing continuous data like prices,
 * moving averages, or any time-series metric.
 *
 * @module components/LineSeries
 *
 * @example Basic usage
 * ```vue
 * <LineSeries
 *   :data="priceData"
 *   series-id="price"
 *   color="#2196F3"
 *   :line-width="2"
 * />
 * ```
 *
 * @example With nested components
 * ```vue
 * <LineSeries :data="priceData" series-id="ma20" color="#FF9800">
 *   <Marker :time="1234567890" position="above" text="Signal" />
 *   <PriceLine :price="100" color="red" title="Resistance" />
 * </LineSeries>
 * ```
 *
 * @example Multiple line styles
 * ```vue
 * <!-- Solid line (default) -->
 * <LineSeries :data="data1" :line-style="0" />
 *
 * <!-- Dotted line -->
 * <LineSeries :data="data2" :line-style="1" />
 *
 * <!-- Dashed line -->
 * <LineSeries :data="data3" :line-style="2" />
 *
 * <!-- Curved line -->
 * <LineSeries :data="data4" :line-type="2" />
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
 * Props for LineSeries component.
 *
 * Extends base series props with line-specific styling options including
 * color, line style, crosshair marker appearance, and price line visibility.
 */
interface Props {
  /** Series data points containing time and value */
  data?: DataPoint[];
  /** Unique identifier for the series (auto-generated if not provided) */
  seriesId?: string;
  /** Pane index for multi-pane charts (default: 0) */
  paneId?: number;
  /** Line color (CSS color string) */
  color?: string;
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
   * - 1: With steps (horizontal then vertical)
   * - 2: Curved (smooth Bezier curves)
   */
  lineType?: 0 | 1 | 2;
  /** Whether to show crosshair marker on hover */
  crosshairMarkerVisible?: boolean;
  /** Crosshair marker radius in pixels */
  crosshairMarkerRadius?: number;
  /** Crosshair marker border color */
  crosshairMarkerBorderColor?: string;
  /** Crosshair marker fill color */
  crosshairMarkerBackgroundColor?: string;
  /** Whether to show the last value label on price scale */
  lastValueVisible?: boolean;
  /** Whether to show horizontal price line at current value */
  priceLineVisible?: boolean;
  /** Series title shown in legend */
  title?: string;
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
 * Maps LineSeries-specific props to the generic Series component format,
 * organizing styling options into the options object expected by
 * TradingView Lightweight Charts.
 */
const seriesProps = computed(() => ({
  data: props.data,
  seriesId: props.seriesId,
  paneId: props.paneId,
  options: {
    color: props.color,
    lineStyle: props.lineStyle,
    lineWidth: props.lineWidth,
    lineType: props.lineType,
    crosshairMarkerVisible: props.crosshairMarkerVisible,
    crosshairMarkerRadius: props.crosshairMarkerRadius,
    crosshairMarkerBorderColor: props.crosshairMarkerBorderColor,
    crosshairMarkerBackgroundColor: props.crosshairMarkerBackgroundColor,
    lastValueVisible: props.lastValueVisible,
    priceLineVisible: props.priceLineVisible,
    title: props.title,
  },
  priceLines: props.priceLines,
  markers: props.markers,
  annotations: props.annotations,
}));
</script>
