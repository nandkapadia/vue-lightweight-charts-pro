/**
 * @fileoverview Type exports for the Vue3 Lightweight Charts package.
 */

// Enums
export {
  SeriesType,
  CustomSeriesType,
  MarkerShape,
  MarkerPosition,
  LineStyle,
  TradeStyle,
  AnnotationType,
  CornerPosition,
  RequestDirection,
} from "./enums";
export type { AllSeriesTypes } from "./enums";

// API types
export type {
  ChunkInfo,
  DataPoint,
  SeriesOptions,
  SetSeriesDataRequest,
  GetHistoryRequest,
  CreateChartResponse,
  SeriesDataResponse,
  ChunkedSeriesDataResponse,
  GetSeriesDataResponse,
  GetHistoryResponse,
  SetSeriesDataResponse,
  ChartData,
  ApiError,
  HealthCheckResponse,
} from "./api";

// WebSocket types
export type {
  WebSocketState,
  BaseMessage,
  ConnectedMessage,
  PingMessage,
  PongMessage,
  GetInitialDataMessage,
  InitialDataResponseMessage,
  RequestHistoryMessage,
  HistoryResponseMessage,
  DataUpdateMessage,
  IncomingMessage,
  OutgoingMessage,
  WebSocketEventHandlers,
  WebSocketConfig,
} from "./websocket";

// Chart types
export type {
  LazyLoadingConfig,
  SeriesConfig,
  PaneConfig,
  TimeScaleOptions,
  PriceScaleOptions,
  GridOptions,
  LayoutOptions,
  CrosshairOptions,
  ChartOptions,
  ChartProps,
  ChartEmits,
  ChartState,
  TradeConfig,
  TradeVisualizationOptions,
  PriceLineConfig,
  Annotation,
} from "./chart";

// Re-export core types for convenience
export type {
  BandSeriesOptions,
  RibbonSeriesOptions,
  SignalSeriesOptions,
  TrendFillSeriesOptions,
  GradientRibbonSeriesOptions,
} from "@lightweight-charts-pro/core";
