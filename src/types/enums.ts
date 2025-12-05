/**
 * @fileoverview Type-safe enums for chart configuration
 *
 * These enums replace string literals and `any` types throughout the codebase
 * to provide better type safety and autocomplete.
 */

/**
 * Standard series types from lightweight-charts
 */
export enum SeriesType {
  Line = "Line",
  Area = "Area",
  Baseline = "Baseline",
  Histogram = "Histogram",
  Bar = "Bar",
  Candlestick = "Candlestick",
}

/**
 * Custom series types from @lightweight-charts-pro/core
 */
export enum CustomSeriesType {
  Band = "Band",
  Ribbon = "Ribbon",
  Signal = "Signal",
  TrendFill = "TrendFill",
  GradientRibbon = "GradientRibbon",
}

/**
 * All supported series types (standard + custom)
 */
export type AllSeriesTypes = SeriesType | CustomSeriesType;

/**
 * Marker shapes for series markers
 */
export enum MarkerShape {
  Circle = "circle",
  Square = "square",
  ArrowUp = "arrowUp",
  ArrowDown = "arrowDown",
}

/**
 * Marker positions relative to bars
 */
export enum MarkerPosition {
  Above = "above",
  Below = "below",
  AboveBar = "aboveBar",
  BelowBar = "belowBar",
  InBar = "inBar",
}

/**
 * Price line styles
 */
export enum LineStyle {
  Solid = 0,
  Dotted = 1,
  Dashed = 2,
  LargeDashed = 3,
}

/**
 * Trade visualization styles
 */
export enum TradeStyle {
  Markers = "markers",
  Rectangles = "rectangles",
  Both = "both",
  Lines = "lines",
  Arrows = "arrows",
  Zones = "zones",
}

/**
 * Annotation types
 */
export enum AnnotationType {
  Text = "text",
  Arrow = "arrow",
  Shape = "shape",
  Line = "line",
  Rectangle = "rectangle",
  Circle = "circle",
}

/**
 * Corner positions for legends and range switchers
 */
export enum CornerPosition {
  TopLeft = "top-left",
  TopRight = "top-right",
  BottomLeft = "bottom-left",
  BottomRight = "bottom-right",
}

/**
 * Request directions for lazy loading
 */
export enum RequestDirection {
  Before = "before",
  After = "after",
}
