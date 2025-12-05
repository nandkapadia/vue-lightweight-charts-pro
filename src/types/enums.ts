/**
 * @fileoverview Type-safe enumerations for chart configuration.
 *
 * This module provides strongly-typed enums that replace string literals and `any` types
 * throughout the codebase. Using enums ensures type safety, enables IDE autocomplete,
 * and prevents typos in configuration values.
 *
 * @module types/enums
 * @example
 * ```typescript
 * import { SeriesType, MarkerShape } from '@lightweight-charts-pro/vue3';
 *
 * const config = {
 *   seriesType: SeriesType.Candlestick,
 *   markers: [{ shape: MarkerShape.ArrowUp }]
 * };
 * ```
 */

/**
 * Standard series types supported by the lightweight-charts library.
 *
 * These are the built-in chart types that come with TradingView's Lightweight Charts.
 * Each type renders data differently and is suited for specific use cases.
 *
 * @enum {string}
 */
export enum SeriesType {
  /** Simple line connecting data points - good for trends and simple price data */
  Line = "Line",

  /** Filled area below a line - useful for volume or cumulative data visualization */
  Area = "Area",

  /** Line with fill above/below a baseline value - shows deviation from a reference */
  Baseline = "Baseline",

  /** Vertical bars from zero - commonly used for volume or indicator values */
  Histogram = "Histogram",

  /** OHLC bar chart - traditional bar representation of price data */
  Bar = "Bar",

  /** Japanese candlestick chart - most popular format for price data */
  Candlestick = "Candlestick",
}

/**
 * Custom series types provided by the @lightweight-charts-pro/core package.
 *
 * These extend the standard series types with additional visualization options
 * specifically designed for technical analysis and trading indicators.
 *
 * @enum {string}
 */
export enum CustomSeriesType {
  /** Upper/lower band indicator - used for Bollinger Bands, Keltner Channels, etc. */
  Band = "Band",

  /** Multi-line ribbon visualization - useful for EMA fans or moving average ribbons */
  Ribbon = "Ribbon",

  /** Buy/sell signal markers - displays trading signals as visual indicators */
  Signal = "Signal",

  /** Trend-based fill zones - fills areas based on trend direction */
  TrendFill = "TrendFill",

  /** Gradient-filled ribbon - ribbon with smooth color transitions */
  GradientRibbon = "GradientRibbon",
}

/**
 * Union type combining all supported series types (standard + custom).
 *
 * Use this type when accepting any valid series type in function parameters
 * or configuration objects.
 *
 * @typedef {SeriesType | CustomSeriesType} AllSeriesTypes
 */
export type AllSeriesTypes = SeriesType | CustomSeriesType;

/**
 * Available shapes for series markers.
 *
 * Markers are visual indicators placed at specific time points on a series
 * to highlight important events like trade entries, exits, or signals.
 *
 * @enum {string}
 */
export enum MarkerShape {
  /** Circular marker - neutral, general-purpose indicator */
  Circle = "circle",

  /** Square marker - alternative neutral indicator */
  Square = "square",

  /** Upward pointing arrow - typically indicates buy signals or bullish events */
  ArrowUp = "arrowUp",

  /** Downward pointing arrow - typically indicates sell signals or bearish events */
  ArrowDown = "arrowDown",
}

/**
 * Positioning options for markers relative to price bars.
 *
 * Controls where the marker appears in relation to the data point it marks.
 * Choose based on visual clarity and the type of event being marked.
 *
 * @enum {string}
 */
export enum MarkerPosition {
  /** Position marker above the chart area - for standalone annotations */
  Above = "above",

  /** Position marker below the chart area - for standalone annotations */
  Below = "below",

  /** Position marker above the price bar's high - for sell signals/resistance */
  AboveBar = "aboveBar",

  /** Position marker below the price bar's low - for buy signals/support */
  BelowBar = "belowBar",

  /** Position marker inside the bar at the center - for neutral indicators */
  InBar = "inBar",
}

/**
 * Line style options for price lines and other line-based elements.
 *
 * These numeric values correspond to the lightweight-charts LineStyle enum.
 * Different styles help distinguish between different types of price levels.
 *
 * @enum {number}
 */
export enum LineStyle {
  /** Continuous solid line - for primary/important levels */
  Solid = 0,

  /** Dotted line pattern - for secondary/less important levels */
  Dotted = 1,

  /** Short dashed line pattern - for conditional/temporary levels */
  Dashed = 2,

  /** Long dashed line pattern - for projected/estimated levels */
  LargeDashed = 3,
}

/**
 * Visualization styles for trade entry/exit displays.
 *
 * Trades can be visualized in multiple ways depending on the level of detail
 * needed and the visual style preference.
 *
 * @enum {string}
 */
export enum TradeStyle {
  /** Show trades as point markers only - minimal, clean visualization */
  Markers = "markers",

  /** Show trades as rectangles spanning entry to exit - shows duration */
  Rectangles = "rectangles",

  /** Combine markers and rectangles - maximum information density */
  Both = "both",

  /** Show trades as connecting lines - emphasizes price movement */
  Lines = "lines",

  /** Show trades with directional arrows - emphasizes trade direction */
  Arrows = "arrows",

  /** Show trades as filled zones - highlights profitable/loss periods */
  Zones = "zones",
}

/**
 * Types of annotations that can be added to charts.
 *
 * Annotations provide additional context and visual elements beyond the
 * standard chart data visualization.
 *
 * @enum {string}
 */
export enum AnnotationType {
  /** Text label annotation - for notes, prices, or custom labels */
  Text = "text",

  /** Arrow annotation - for pointing to specific chart areas */
  Arrow = "arrow",

  /** Generic shape annotation - for custom visual elements */
  Shape = "shape",

  /** Line annotation - for trend lines or support/resistance */
  Line = "line",

  /** Rectangle annotation - for highlighting price/time ranges */
  Rectangle = "rectangle",

  /** Circle annotation - for highlighting specific points */
  Circle = "circle",
}

/**
 * Corner positions for UI elements like legends and range switchers.
 *
 * These positions determine where overlay elements are anchored on the chart.
 * Choose positions that don't obscure important chart data.
 *
 * @enum {string}
 */
export enum CornerPosition {
  /** Top-left corner - default position for legends */
  TopLeft = "top-left",

  /** Top-right corner - default position for range switchers */
  TopRight = "top-right",

  /** Bottom-left corner - alternative position */
  BottomLeft = "bottom-left",

  /** Bottom-right corner - alternative position */
  BottomRight = "bottom-right",
}

/**
 * Direction indicators for lazy loading history requests.
 *
 * When scrolling through chart data, these values indicate whether the user
 * is scrolling toward older data (before) or newer data (after).
 *
 * @enum {string}
 */
export enum RequestDirection {
  /** Request older/historical data - user scrolling left (back in time) */
  Before = "before",

  /** Request newer/future data - user scrolling right (forward in time) */
  After = "after",
}
