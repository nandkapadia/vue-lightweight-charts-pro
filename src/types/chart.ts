/**
 * @fileoverview TypeScript type definitions for chart configuration and state.
 *
 * This module defines the core interfaces for configuring charts, series, panes,
 * and the overall chart state. These types are used throughout the library to
 * ensure type-safe configuration and provide excellent IDE support.
 *
 * @module types/chart
 *
 * @example
 * ```typescript
 * import type {
 *   SeriesConfig,
 *   ChartOptions,
 *   LazyLoadingConfig
 * } from '@lightweight-charts-pro/vue3';
 *
 * const seriesConfig: SeriesConfig = {
 *   seriesId: 'price',
 *   seriesType: 'Candlestick',
 *   data: [...],
 *   lazyLoading: { enabled: true, chunkSize: 500 }
 * };
 * ```
 */

// Third Party Imports
import type {
  IChartApi,
  ISeriesApi,
  SeriesType,
  Time,
  SeriesMarker,
} from "lightweight-charts";

// Local Imports
import type { ChunkInfo, DataPoint, SeriesOptions } from "./api";

// Import custom series options from the core package for type safety
import type {
  BandSeriesOptions,
  RibbonSeriesOptions,
  SignalSeriesOptions,
  TrendFillSeriesOptions,
  GradientRibbonSeriesOptions,
} from "@lightweight-charts-pro/core";

/**
 * Configuration for lazy loading (infinite scroll) functionality.
 *
 * Lazy loading allows charts to display large datasets efficiently by only
 * loading visible data and fetching more as the user scrolls. This interface
 * tracks the loading state and available data boundaries.
 *
 * @interface LazyLoadingConfig
 *
 * @example
 * ```typescript
 * const lazyConfig: LazyLoadingConfig = {
 *   enabled: true,
 *   chunkSize: 500,        // Load 500 bars at a time
 *   hasMoreBefore: true,   // Older data is available
 *   hasMoreAfter: false,   // We're at the latest data
 *   chunkInfo: {
 *     startIndex: 0,
 *     endIndex: 499,
 *     startTime: 1609459200,
 *     endTime: 1609545600,
 *     count: 500
 *   }
 * };
 * ```
 */
export interface LazyLoadingConfig {
  /**
   * Whether lazy loading is enabled for this series.
   * When true, data will be loaded on-demand as user scrolls.
   */
  enabled: boolean;

  /**
   * Number of data points to request per chunk.
   * Larger values reduce network requests but increase initial load time.
   * Recommended: 300-1000 for most use cases.
   */
  chunkSize: number;

  /**
   * Whether older (historical) data is available before the current range.
   * Set to false when user has scrolled to the beginning of available history.
   */
  hasMoreBefore: boolean;

  /**
   * Whether newer data is available after the current range.
   * Set to false when displaying real-time data at the latest point.
   */
  hasMoreAfter: boolean;

  /**
   * Metadata about the currently loaded data chunk.
   * Used for tracking pagination state and merging new data.
   */
  chunkInfo?: ChunkInfo;
}

/**
 * Configuration for displaying a trade on the chart.
 *
 * Trades represent entry and exit points for positions, including
 * profit/loss information. They can be visualized in various styles
 * like markers, rectangles, or zones.
 *
 * @interface TradeConfig
 *
 * @example
 * ```typescript
 * const trade: TradeConfig = {
 *   id: 'trade-001',
 *   entryTime: 1609459200,
 *   entryPrice: 100.00,
 *   exitTime: 1609545600,
 *   exitPrice: 105.00,
 *   isProfitable: true,
 *   pnl: 500.00,
 *   pnlPercentage: 5.0
 * };
 * ```
 */
export interface TradeConfig {
  /**
   * Unique identifier for the trade.
   * Used for tracking and updating specific trades.
   */
  id: string;

  /**
   * Timestamp when the position was entered.
   * Can be Unix timestamp (seconds) or ISO 8601 string.
   */
  entryTime: string | number;

  /**
   * Price at which the position was entered.
   * For long trades, this is the buy price.
   */
  entryPrice: number;

  /**
   * Timestamp when the position was exited.
   * Can be Unix timestamp (seconds) or ISO 8601 string.
   */
  exitTime: string | number;

  /**
   * Price at which the position was exited.
   * For long trades, this is the sell price.
   */
  exitPrice: number;

  /**
   * Whether the trade resulted in a profit.
   * Used to determine visualization colors (green/red).
   */
  isProfitable: boolean;

  /**
   * Absolute profit or loss amount in base currency.
   * Negative values indicate a loss.
   */
  pnl?: number;

  /**
   * Profit or loss as a percentage of entry value.
   * Calculated as ((exitPrice - entryPrice) / entryPrice) * 100.
   */
  pnlPercentage?: number;

  /**
   * Index signature for additional custom trade data.
   * Examples: position size, fees, strategy name, etc.
   */
  [key: string]: unknown;
}

/**
 * Visual styling options for trade visualization.
 *
 * Controls how trades are rendered on the chart, including colors
 * for profitable/loss trades and the overall visualization style.
 *
 * @interface TradeVisualizationOptions
 *
 * @example
 * ```typescript
 * const tradeViz: TradeVisualizationOptions = {
 *   style: 'both',
 *   entryMarkerColorLong: '#26a69a',    // Green for long entries
 *   entryMarkerColorShort: '#ef5350',   // Red for short entries
 *   exitMarkerColorProfit: '#26a69a',   // Green for profitable exits
 *   exitMarkerColorLoss: '#ef5350',     // Red for loss exits
 *   rectangleColorProfit: 'rgba(38, 166, 154, 0.2)',
 *   rectangleColorLoss: 'rgba(239, 83, 80, 0.2)',
 *   showPnlInMarkers: true
 * };
 * ```
 */
export interface TradeVisualizationOptions {
  /**
   * Primary visualization style for trades.
   * - 'markers': Point markers at entry/exit
   * - 'rectangles': Filled boxes spanning the trade duration
   * - 'both': Markers and rectangles together
   * - 'lines': Lines connecting entry and exit
   * - 'arrows': Directional arrows showing trade direction
   * - 'zones': Filled zones highlighting the trade area
   */
  style: "markers" | "rectangles" | "both" | "lines" | "arrows" | "zones";

  // ----- Marker Style Options -----

  /** Color for long position entry markers (default: green) */
  entryMarkerColorLong?: string;

  /** Color for short position entry markers (default: red) */
  entryMarkerColorShort?: string;

  /** Color for profitable exit markers (default: green) */
  exitMarkerColorProfit?: string;

  /** Color for loss exit markers (default: red) */
  exitMarkerColorLoss?: string;

  /** Size of markers in pixels (default: 3) */
  markerSize?: number;

  /** Whether to display P&L value in marker text */
  showPnlInMarkers?: boolean;

  // ----- Rectangle Style Options -----

  /** Opacity of rectangle fill (0-1, default: 0.2) */
  rectangleFillOpacity?: number;

  /** Width of rectangle border in pixels (default: 1) */
  rectangleBorderWidth?: number;

  /** Fill color for profitable trade rectangles */
  rectangleColorProfit?: string;

  /** Fill color for loss trade rectangles */
  rectangleColorLoss?: string;

  /** Whether to show trade info text in rectangle */
  rectangleShowText?: boolean;

  // ----- Additional Options -----

  /** Index signature for additional custom visualization options */
  [key: string]: unknown;
}

/**
 * Configuration for a horizontal price line.
 *
 * Price lines are horizontal lines drawn at specific price levels,
 * useful for marking support/resistance, targets, or stop losses.
 *
 * @interface PriceLineConfig
 *
 * @example
 * ```typescript
 * const resistance: PriceLineConfig = {
 *   price: 150.00,
 *   color: '#ef5350',
 *   lineWidth: 2,
 *   lineStyle: 2,  // Dashed
 *   axisLabelVisible: true,
 *   title: 'Resistance'
 * };
 * ```
 */
export interface PriceLineConfig {
  /**
   * Price level where the line should be drawn.
   * Must be within the visible price range to be displayed.
   */
  price: number;

  /**
   * Color of the price line.
   * Can be any valid CSS color string (hex, rgb, rgba, named).
   */
  color?: string;

  /**
   * Width of the line in pixels.
   * Common values: 1 (thin), 2 (normal), 3 (thick).
   */
  lineWidth?: number;

  /**
   * Style of the line.
   * Uses LineStyle enum: 0=Solid, 1=Dotted, 2=Dashed, 3=LargeDashed.
   */
  lineStyle?: number;

  /**
   * Whether to show a label on the price axis for this line.
   * When true, displays the price value on the axis.
   */
  axisLabelVisible?: boolean;

  /**
   * Text label for the price line.
   * Displayed alongside the line for identification.
   */
  title?: string;
}

/**
 * Configuration for a chart annotation.
 *
 * Annotations are visual elements (text, arrows, shapes) placed at specific
 * time/price coordinates to highlight important chart features or events.
 *
 * @interface Annotation
 *
 * @example
 * ```typescript
 * const buySignal: Annotation = {
 *   time: 1609459200,
 *   price: 100.00,
 *   text: 'Buy Signal',
 *   type: 'arrow',
 *   position: 'belowBar',
 *   color: '#26a69a',
 *   tooltip: 'RSI oversold + MACD bullish crossover'
 * };
 * ```
 */
export interface Annotation {
  /**
   * Timestamp for the annotation position.
   * Can be Unix timestamp (seconds) or ISO 8601 string.
   */
  time: string | number;

  /**
   * Price level for the annotation position.
   * Determines vertical placement on the chart.
   */
  price: number;

  /**
   * Text content of the annotation.
   * Displayed as the label or tooltip content.
   */
  text: string;

  /**
   * Type of annotation to render.
   * Determines the visual appearance and behavior.
   */
  type?: "text" | "arrow" | "shape" | "line" | "rectangle" | "circle";

  /**
   * Position relative to the price bar.
   * 'aboveBar' = above the high, 'belowBar' = below the low.
   */
  position?: "aboveBar" | "belowBar" | "inBar";

  /**
   * Primary color for the annotation (text or shape fill).
   * Can be any valid CSS color string.
   */
  color?: string;

  /**
   * Background color for text annotations.
   * Improves readability against the chart.
   */
  backgroundColor?: string;

  /**
   * Font size in pixels for text annotations.
   * Default is typically 12px.
   */
  fontSize?: number;

  /**
   * Additional text shown on hover.
   * Useful for providing context without cluttering the chart.
   */
  tooltip?: string;
}

/**
 * Complete configuration for a single chart series.
 *
 * This interface defines all aspects of a series including its type, data,
 * visual options, and additional features like markers and price lines.
 *
 * @interface SeriesConfig
 *
 * @example
 * ```typescript
 * const candlestickSeries: SeriesConfig = {
 *   seriesId: 'AAPL',
 *   name: 'Apple Inc.',
 *   seriesType: 'Candlestick',
 *   paneId: 0,
 *   data: [
 *     { time: 1609459200, open: 100, high: 105, low: 98, close: 103 }
 *   ],
 *   options: {
 *     upColor: '#26a69a',
 *     downColor: '#ef5350'
 *   },
 *   lazyLoading: { enabled: true, chunkSize: 500 },
 *   markers: [
 *     { time: 1609459200, position: 'belowBar', color: 'green', shape: 'arrowUp' }
 *   ],
 *   priceLines: [{ price: 150, title: 'Target' }]
 * };
 * ```
 */
export interface SeriesConfig {
  /**
   * Unique identifier for the series within the chart.
   * Used for referencing, updating, and removing the series.
   */
  seriesId: string;

  /**
   * Human-readable display name for the series.
   * Shown in legends and tooltips. Falls back to seriesId if not provided.
   */
  name?: string;

  /**
   * Type of chart series to render.
   * Includes standard types (Line, Candlestick, etc.) and custom types
   * from @lightweight-charts-pro/core (Band, Ribbon, Signal, etc.).
   */
  seriesType:
    | SeriesType
    | "Band"
    | "Ribbon"
    | "Signal"
    | "TrendFill"
    | "GradientRibbon"
    | string;

  /**
   * Index of the pane where this series should be rendered.
   * Default is 0 (main pane). Use 1, 2, etc. for additional panes.
   */
  paneId?: number;

  /**
   * Array of data points for the series.
   * Must be sorted by time in ascending order.
   */
  data: DataPoint[];

  /**
   * Visual and behavioral options for the series.
   * The specific options available depend on the series type.
   */
  options?:
    | SeriesOptions
    | BandSeriesOptions
    | RibbonSeriesOptions
    | SignalSeriesOptions
    | TrendFillSeriesOptions
    | GradientRibbonSeriesOptions;

  /**
   * Lazy loading configuration for infinite scroll.
   * Only applicable when integrated with a backend API.
   */
  lazyLoading?: LazyLoadingConfig;

  /**
   * Array of markers to display on this series.
   * Markers are visual indicators at specific time points.
   */
  markers?: SeriesMarker<Time>[];

  /**
   * Array of horizontal price lines for this series.
   * Useful for support/resistance levels, targets, etc.
   */
  priceLines?: PriceLineConfig[];

  /**
   * Array of trades to visualize on this series.
   * Each trade shows entry/exit points and profit/loss.
   */
  trades?: TradeConfig[];

  /**
   * Options for how trades should be visualized.
   * Controls colors, styles, and display preferences.
   */
  tradeVisualizationOptions?: TradeVisualizationOptions;

  /**
   * Array of annotations specific to this series.
   * Series annotations are drawn relative to the series data.
   */
  annotations?: Annotation[];
}

/**
 * Configuration for a chart pane (sub-chart area).
 *
 * Panes allow multiple chart areas with different series and scales,
 * commonly used for separating price from volume or indicators.
 *
 * @interface PaneConfig
 *
 * @example
 * ```typescript
 * const volumePane: PaneConfig = {
 *   paneId: 1,
 *   heightRatio: 0.3,  // 30% of available height
 *   series: [{
 *     seriesId: 'volume',
 *     seriesType: 'Histogram',
 *     data: [...]
 *   }]
 * };
 * ```
 */
export interface PaneConfig {
  /**
   * Unique identifier for the pane.
   * Pane 0 is the main pane; 1, 2, etc. are additional panes.
   */
  paneId: number;

  /**
   * Fixed height for the pane in pixels or percentage string.
   * Example: 200 or '30%'. Mutually exclusive with heightRatio.
   */
  height?: number | string;

  /**
   * Height as a ratio of total available space (0-1).
   * Example: 0.3 = 30% of chart height. Mutually exclusive with height.
   */
  heightRatio?: number;

  /**
   * Whether this pane is currently collapsed (hidden).
   * Collapsed panes take up no space but preserve their data.
   */
  collapsed?: boolean;

  /**
   * Array of series to render in this pane.
   * All series in a pane share the same time axis.
   */
  series: SeriesConfig[];
}

/**
 * Options for the chart's time (horizontal) axis.
 *
 * Controls time display format, scrolling behavior, and visual styling
 * of the time axis at the bottom of the chart.
 *
 * @interface TimeScaleOptions
 *
 * @example
 * ```typescript
 * const timeOptions: TimeScaleOptions = {
 *   timeVisible: true,
 *   secondsVisible: false,
 *   borderColor: '#363a45',
 *   shiftVisibleRangeOnNewBar: true
 * };
 * ```
 */
export interface TimeScaleOptions {
  /**
   * Whether to display time in axis labels.
   * When false, only dates are shown.
   */
  timeVisible?: boolean;

  /**
   * Whether to display seconds in time labels.
   * Only applies when timeVisible is true.
   */
  secondsVisible?: boolean;

  /**
   * Color of the time scale border line.
   * Separates the chart area from the time axis.
   */
  borderColor?: string;

  /**
   * Color of the time axis label text.
   * Should contrast with the chart background.
   */
  textColor?: string;

  /**
   * Whether to lock the left edge of the visible range.
   * Prevents scrolling beyond the first data point.
   */
  fixedLeftEdge?: boolean;

  /**
   * Whether to lock the right edge of the visible range.
   * Prevents scrolling beyond the last data point.
   */
  fixedRightEdge?: boolean;

  /**
   * Whether to auto-scroll when new bars are added.
   * Essential for real-time charts to keep latest data visible.
   */
  shiftVisibleRangeOnNewBar?: boolean;
}

/**
 * Options for a price (vertical) axis scale.
 *
 * Controls the position, behavior, and styling of price scales.
 * Charts can have left, right, or both price scales.
 *
 * @interface PriceScaleOptions
 *
 * @example
 * ```typescript
 * const rightScale: PriceScaleOptions = {
 *   position: 'right',
 *   autoScale: true,
 *   borderColor: '#363a45',
 *   scaleMargins: { top: 0.1, bottom: 0.1 }
 * };
 * ```
 */
export interface PriceScaleOptions {
  /**
   * Position of the price scale on the chart.
   * 'none' hides the scale entirely.
   */
  position?: "left" | "right" | "none";

  /**
   * Color of the price scale border line.
   * Separates the chart area from the price axis.
   */
  borderColor?: string;

  /**
   * Color of the price axis label text.
   * Should contrast with the chart background.
   */
  textColor?: string;

  /**
   * Whether to automatically adjust scale to fit visible data.
   * When true, scale zooms to show all visible data points.
   */
  autoScale?: boolean;

  /**
   * Whether to invert the price scale (high at bottom).
   * Useful for certain types of data or preferences.
   */
  invertScale?: boolean;

  /**
   * Margins around the data on the price scale.
   * Values 0-1 represent percentage of visible range.
   */
  scaleMargins?: {
    /** Space above the highest data point (0-1) */
    top: number;
    /** Space below the lowest data point (0-1) */
    bottom: number;
  };
}

/**
 * Options for the chart's grid lines.
 *
 * Controls the appearance of vertical and horizontal grid lines
 * that help users read values across the chart.
 *
 * @interface GridOptions
 *
 * @example
 * ```typescript
 * const gridOptions: GridOptions = {
 *   vertLines: { color: '#2B2B43', visible: true },
 *   horzLines: { color: '#2B2B43', visible: true, style: 0 }
 * };
 * ```
 */
export interface GridOptions {
  /**
   * Options for vertical grid lines (time intervals).
   * These lines run from top to bottom of the chart.
   */
  vertLines?: {
    /** Color of vertical grid lines */
    color?: string;
    /** Line style: 0=Solid, 1=Dotted, 2=Dashed, 3=LargeDashed */
    style?: number;
    /** Whether vertical lines are visible */
    visible?: boolean;
  };

  /**
   * Options for horizontal grid lines (price levels).
   * These lines run from left to right of the chart.
   */
  horzLines?: {
    /** Color of horizontal grid lines */
    color?: string;
    /** Line style: 0=Solid, 1=Dotted, 2=Dashed, 3=LargeDashed */
    style?: number;
    /** Whether horizontal lines are visible */
    visible?: boolean;
  };
}

/**
 * Options for the chart's overall layout and appearance.
 *
 * Controls colors, fonts, and other visual aspects that apply
 * to the entire chart.
 *
 * @interface LayoutOptions
 *
 * @example
 * ```typescript
 * const layoutOptions: LayoutOptions = {
 *   backgroundColor: '#1e1e1e',
 *   textColor: '#d4d4dc',
 *   fontSize: 12,
 *   fontFamily: "'Trebuchet MS', Roboto, sans-serif"
 * };
 * ```
 */
export interface LayoutOptions {
  /**
   * Background color of the chart area.
   * Use dark colors for trading terminals, light for reports.
   */
  backgroundColor?: string;

  /**
   * Default text color for all chart labels.
   * Should contrast well with the background color.
   */
  textColor?: string;

  /**
   * Base font size in pixels for chart text.
   * Axis labels and other text scale from this base.
   */
  fontSize?: number;

  /**
   * Font family for all chart text.
   * Should include fallback fonts for compatibility.
   */
  fontFamily?: string;
}

/**
 * Options for the chart's crosshair (cursor tracking lines).
 *
 * Controls how the crosshair appears and behaves when users
 * hover over the chart.
 *
 * @interface CrosshairOptions
 *
 * @example
 * ```typescript
 * const crosshairOptions: CrosshairOptions = {
 *   mode: 1,  // Magnet mode
 *   vertLine: { color: '#758696', labelVisible: true },
 *   horzLine: { color: '#758696', labelVisible: true }
 * };
 * ```
 */
export interface CrosshairOptions {
  /**
   * Crosshair behavior mode.
   * 0 = Normal (free movement), 1 = Magnet (snaps to data points).
   */
  mode?: number;

  /**
   * Options for the vertical crosshair line (follows cursor X).
   * Shows the time position of the cursor.
   */
  vertLine?: {
    /** Color of the vertical line */
    color?: string;
    /** Width of the line in pixels */
    width?: number;
    /** Line style: 0=Solid, 1=Dotted, 2=Dashed, 3=LargeDashed */
    style?: number;
    /** Whether the vertical line is visible */
    visible?: boolean;
    /** Whether to show a label on the time axis */
    labelVisible?: boolean;
  };

  /**
   * Options for the horizontal crosshair line (follows cursor Y).
   * Shows the price position of the cursor.
   */
  horzLine?: {
    /** Color of the horizontal line */
    color?: string;
    /** Width of the line in pixels */
    width?: number;
    /** Line style: 0=Solid, 1=Dotted, 2=Dashed, 3=LargeDashed */
    style?: number;
    /** Whether the horizontal line is visible */
    visible?: boolean;
    /** Whether to show a label on the price axis */
    labelVisible?: boolean;
  };
}

/**
 * Complete configuration options for a chart instance.
 *
 * This interface provides all chart-level settings including dimensions,
 * scales, grid, layout, crosshair, and other visual options.
 *
 * @interface ChartOptions
 *
 * @example
 * ```typescript
 * const chartOptions: ChartOptions = {
 *   height: 400,
 *   layout: {
 *     backgroundColor: '#1e1e1e',
 *     textColor: '#d4d4dc'
 *   },
 *   grid: {
 *     vertLines: { color: '#2B2B43' },
 *     horzLines: { color: '#2B2B43' }
 *   },
 *   timeScale: { timeVisible: true },
 *   crosshair: { mode: 1 }
 * };
 * ```
 */
export interface ChartOptions {
  /**
   * Width of the chart in pixels.
   * If not specified, chart auto-resizes to container width.
   */
  width?: number;

  /**
   * Height of the chart in pixels.
   * Required unless using a container with defined height.
   */
  height?: number;

  /**
   * Configuration for the time (horizontal) axis.
   * Controls time display and scrolling behavior.
   */
  timeScale?: TimeScaleOptions;

  /**
   * Configuration for the right price axis.
   * The primary price scale for most charts.
   */
  rightPriceScale?: PriceScaleOptions;

  /**
   * Configuration for the left price axis.
   * Secondary scale for additional series or comparison.
   */
  leftPriceScale?: PriceScaleOptions;

  /**
   * Configuration for chart grid lines.
   * Helps users read values across the chart area.
   */
  grid?: GridOptions;

  /**
   * General layout options (colors, fonts).
   * Affects the overall visual appearance.
   */
  layout?: LayoutOptions;

  /**
   * Configuration for the crosshair cursor.
   * Controls hover behavior and appearance.
   */
  crosshair?: CrosshairOptions;

  /**
   * Watermark configuration for branding or identification.
   * Displayed as overlay text on the chart.
   */
  watermark?: {
    /** Watermark text content */
    text?: string;
    /** Watermark text color */
    color?: string;
    /** Whether watermark is visible */
    visible?: boolean;
  };

  /**
   * Localization settings for formatting.
   * Controls date/time display format and locale.
   */
  localization?: {
    /** Locale identifier (e.g., 'en-US', 'de-DE') */
    locale?: string;
    /** Date format pattern */
    dateFormat?: string;
    /** Custom time formatter function */
    timeFormatter?: (time: number) => string;
  };
}

/**
 * Props interface for the LightweightChart Vue component.
 *
 * Defines all configurable properties that can be passed to the
 * main chart component via Vue props.
 *
 * @interface ChartProps
 *
 * @example
 * ```vue
 * <template>
 *   <LightweightChart
 *     chart-id="my-chart"
 *     api-url="http://localhost:8000/api"
 *     ws-url="ws://localhost:8000/ws/chart/my-chart"
 *     :options="chartOptions"
 *     :series="seriesConfigs"
 *     auto-connect
 *     @ready="onChartReady"
 *   />
 * </template>
 * ```
 */
export interface ChartProps {
  /**
   * Unique identifier for the chart instance.
   * Used for API calls, WebSocket subscriptions, and debugging.
   */
  chartId: string;

  /**
   * Base URL for the REST API backend.
   * Used for fetching series data and historical records.
   */
  apiUrl?: string;

  /**
   * WebSocket URL for real-time data updates.
   * Connection is established when autoConnect is true.
   */
  wsUrl?: string;

  /**
   * Chart-level configuration options.
   * Controls layout, colors, scales, and other visual settings.
   */
  options?: ChartOptions;

  /**
   * Initial series configurations to display.
   * Can be updated dynamically after chart creation.
   */
  series?: SeriesConfig[];

  /**
   * Chart-level annotations visible across all series.
   * These annotations are not tied to a specific series.
   */
  annotations?: Annotation[];

  /**
   * Whether to automatically connect to WebSocket on mount.
   * When false, call ws.connect() manually to establish connection.
   */
  autoConnect?: boolean;

  /**
   * CSS class to apply to the chart container element.
   * Useful for custom styling and layout.
   */
  class?: string;

  /**
   * Inline styles for the chart container element.
   * Object with CSS property names and values.
   */
  style?: Record<string, string>;
}

/**
 * Event emitter interface for the LightweightChart component.
 *
 * Defines all events that the chart component can emit,
 * with proper TypeScript typing for event handlers.
 *
 * @interface ChartEmits
 *
 * @example
 * ```vue
 * <template>
 *   <LightweightChart
 *     @ready="handleReady"
 *     @crosshairMove="handleCrosshair"
 *     @error="handleError"
 *   />
 * </template>
 *
 * <script setup>
 * function handleReady(chart: IChartApi) {
 *   console.log('Chart initialized');
 * }
 * </script>
 * ```
 */
export interface ChartEmits {
  /**
   * Emitted when the chart is fully initialized and ready for interaction.
   * @param chart - The chart API instance for direct manipulation
   */
  (e: "ready", chart: IChartApi): void;

  /**
   * Emitted when the crosshair position changes.
   * Useful for displaying hover data in tooltips or legends.
   * @param params - Mouse event parameters including position and series values
   */
  (e: "crosshairMove", params: unknown): void;

  /**
   * Emitted when the visible time range changes (scroll/zoom).
   * Can be used to trigger lazy loading or update related components.
   * @param range - The new visible time range
   */
  (e: "visibleTimeRangeChange", range: unknown): void;

  /**
   * Emitted when a series is clicked.
   * Useful for implementing click-based interactions.
   * @param params - Click event parameters including clicked series/price
   */
  (e: "seriesClick", params: unknown): void;

  /**
   * Emitted when WebSocket connection is established.
   * Indicates real-time data streaming is now active.
   */
  (e: "connected"): void;

  /**
   * Emitted when WebSocket connection is lost.
   * May trigger reconnection attempts depending on configuration.
   */
  (e: "disconnected"): void;

  /**
   * Emitted when an error occurs (API, WebSocket, or rendering).
   * @param error - The error object with details
   */
  (e: "error", error: Error): void;

  /**
   * Emitted when data is loaded for a series.
   * Useful for tracking loading progress or triggering UI updates.
   * @param seriesId - ID of the series that received data
   * @param count - Number of data points loaded
   */
  (e: "dataLoaded", seriesId: string, count: number): void;
}

/**
 * Internal state managed by chart composables and components.
 *
 * This interface represents the reactive state object used internally
 * to track chart initialization, series references, and loading status.
 *
 * @interface ChartState
 * @internal
 */
export interface ChartState {
  /**
   * Reference to the lightweight-charts API instance.
   * Null before initialization and after disposal.
   */
  chart: IChartApi | null;

  /**
   * Map of series IDs to their API instances.
   * Used for updating and removing individual series.
   */
  seriesMap: Map<string, ISeriesApi<SeriesType>>;

  /**
   * Current series configurations.
   * Updated when series are added, modified, or removed.
   */
  seriesConfigs: SeriesConfig[];

  /**
   * Whether the chart has been successfully initialized.
   * True after createChart() completes without error.
   */
  isInitialized: boolean;

  /**
   * Whether data is currently being loaded.
   * Used for showing loading indicators.
   */
  isLoading: boolean;

  /**
   * Most recent error message, or null if no error.
   * Reset when a successful operation completes.
   */
  error: string | null;
}
