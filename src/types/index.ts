/**
 * @fileoverview Central type exports for the Vue 3 Lightweight Charts package.
 *
 * This barrel file consolidates all type definitions from the types module,
 * providing a single import point for consumers. Types are organized into
 * logical groups for easier discovery.
 *
 * @module types
 *
 * @example
 * ```typescript
 * // Import specific types
 * import type { SeriesConfig, ChartOptions, DataPoint } from '@lightweight-charts-pro/vue3';
 *
 * // Import enums (not type-only)
 * import { SeriesType, MarkerShape, LineStyle } from '@lightweight-charts-pro/vue3';
 * ```
 */

// -----------------------------------------------------------------------------
// Enumerations
// -----------------------------------------------------------------------------
// Export enums as values (can be used at runtime for type checking and iteration)

export {
  /** Standard series types (Line, Area, Candlestick, etc.) */
  SeriesType,
  /** Custom series types from core package (Band, Ribbon, Signal, etc.) */
  CustomSeriesType,
  /** Marker shapes for chart annotations */
  MarkerShape,
  /** Marker positioning relative to price bars */
  MarkerPosition,
  /** Line style options (Solid, Dashed, Dotted, etc.) */
  LineStyle,
  /** Trade visualization styles */
  TradeStyle,
  /** Annotation type options */
  AnnotationType,
  /** Corner positions for UI elements */
  CornerPosition,
  /** Pagination direction for lazy loading */
  RequestDirection,
} from "./enums";

/** Union type of all series types (standard + custom) */
export type { AllSeriesTypes } from "./enums";

// -----------------------------------------------------------------------------
// API Types
// -----------------------------------------------------------------------------
// Types for REST API communication with the backend

export type {
  /** Pagination metadata for chunked data responses */
  ChunkInfo,
  /** Single data point in a chart series */
  DataPoint,
  /** Visual configuration options for a series */
  SeriesOptions,
  /** Request payload for setting series data */
  SetSeriesDataRequest,
  /** Request parameters for fetching history */
  GetHistoryRequest,
  /** Response from chart creation endpoint */
  CreateChartResponse,
  /** Response for complete (non-chunked) series data */
  SeriesDataResponse,
  /** Response for paginated (chunked) series data */
  ChunkedSeriesDataResponse,
  /** Union type for series data responses */
  GetSeriesDataResponse,
  /** Response from history pagination endpoint */
  GetHistoryResponse,
  /** Response confirming series data was saved */
  SetSeriesDataResponse,
  /** Complete chart data structure */
  ChartData,
  /** Error response from API */
  ApiError,
  /** Health check endpoint response */
  HealthCheckResponse,
} from "./api";

// -----------------------------------------------------------------------------
// WebSocket Types
// -----------------------------------------------------------------------------
// Types for real-time WebSocket communication

export type {
  /** WebSocket connection state ('connecting', 'connected', etc.) */
  WebSocketState,
  /** Base interface for all WebSocket messages */
  BaseMessage,
  /** Server acknowledgment of connection */
  ConnectedMessage,
  /** Client ping for connection health check */
  PingMessage,
  /** Server pong response to ping */
  PongMessage,
  /** Client request for initial chart data */
  GetInitialDataMessage,
  /** Server response with initial chart data */
  InitialDataResponseMessage,
  /** Client request for historical data */
  RequestHistoryMessage,
  /** Server response with historical data */
  HistoryResponseMessage,
  /** Server notification of data updates */
  DataUpdateMessage,
  /** Union type of all incoming messages */
  IncomingMessage,
  /** Union type of all outgoing messages */
  OutgoingMessage,
  /** Event handler callbacks for WebSocket events */
  WebSocketEventHandlers,
  /** Configuration for WebSocket connection */
  WebSocketConfig,
} from "./websocket";

// -----------------------------------------------------------------------------
// Chart Types
// -----------------------------------------------------------------------------
// Types for chart configuration and component props

export type {
  /** Lazy loading (infinite scroll) configuration */
  LazyLoadingConfig,
  /** Complete series configuration */
  SeriesConfig,
  /** Chart pane configuration */
  PaneConfig,
  /** Time scale (horizontal axis) options */
  TimeScaleOptions,
  /** Price scale (vertical axis) options */
  PriceScaleOptions,
  /** Grid line options */
  GridOptions,
  /** Layout (background, fonts) options */
  LayoutOptions,
  /** Crosshair cursor options */
  CrosshairOptions,
  /** Complete chart configuration options */
  ChartOptions,
  /** Props for LightweightChart component */
  ChartProps,
  /** Events emitted by LightweightChart component */
  ChartEmits,
  /** Internal chart state (for composables) */
  ChartState,
  /** Trade entry/exit configuration */
  TradeConfig,
  /** Trade visualization styling options */
  TradeVisualizationOptions,
  /** Horizontal price line configuration */
  PriceLineConfig,
  /** Chart annotation configuration */
  Annotation,
} from "./chart";

// -----------------------------------------------------------------------------
// Core Package Re-exports
// -----------------------------------------------------------------------------
// Convenience re-exports of types from @lightweight-charts-pro/core

export type {
  /** Options for Band series (Bollinger Bands, etc.) */
  BandSeriesOptions,
  /** Options for Ribbon series (MA fans, etc.) */
  RibbonSeriesOptions,
  /** Options for Signal series (buy/sell indicators) */
  SignalSeriesOptions,
  /** Options for TrendFill series */
  TrendFillSeriesOptions,
  /** Options for GradientRibbon series */
  GradientRibbonSeriesOptions,
} from "@lightweight-charts-pro/core";
