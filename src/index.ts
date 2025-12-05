/**
 * @fileoverview Main entry point for the Vue3 Lightweight Charts package.
 *
 * This package provides Vue 3 components and composables for integrating
 * TradingView Lightweight Charts with a FastAPI backend.
 *
 * @example
 * ```vue
 * <template>
 *   <LightweightChart
 *     chart-id="my-chart"
 *     api-url="http://localhost:8000/api/charts"
 *     ws-url="ws://localhost:8000/ws"
 *     :series="seriesData"
 *     :options="chartOptions"
 *     auto-connect
 *     @ready="handleReady"
 *     @dataLoaded="handleDataLoaded"
 *   />
 * </template>
 *
 * <script setup lang="ts">
 * import { ref } from 'vue';
 * import { LightweightChart, type SeriesConfig, type ChartOptions } from '@lightweight-charts-pro/vue3';
 *
 * const chartOptions = ref<ChartOptions>({
 *   height: 400,
 *   layout: {
 *     backgroundColor: '#1e1e1e',
 *     textColor: '#d4d4d4',
 *   },
 * });
 *
 * const seriesData = ref<SeriesConfig[]>([
 *   {
 *     seriesId: 'price',
 *     seriesType: 'candlestick',
 *     data: [],
 *     lazyLoading: {
 *       enabled: true,
 *       chunkSize: 500,
 *       hasMoreBefore: true,
 *       hasMoreAfter: false,
 *     },
 *   },
 * ]);
 *
 * function handleReady(chart: IChartApi) {
 *   console.log('Chart is ready:', chart);
 * }
 *
 * function handleDataLoaded(seriesId: string, count: number) {
 *   console.log(`Loaded ${count} points for ${seriesId}`);
 * }
 * </script>
 * ```
 */

/**
 * ## Vue Components
 *
 * ### Core Chart Components
 * @component LightweightChart - Main chart container with REST/WebSocket support
 * @component ChartPane - Multi-pane layout component for advanced dashboards
 *
 * ### UI Primitives
 * @component Legend - Interactive legend showing series values
 * @component RangeSwitcher - Quick time range selection (1D, 1W, 1M, etc.)
 *
 * ### Series Components (Type-Specific)
 * Use these for Vue-idiomatic series declaration:
 * @component Series - Generic series component (type prop: 'line', 'area', etc.)
 * @component LineSeries - Line chart series
 * @component AreaSeries - Area chart series
 * @component CandlestickSeries - OHLC candlestick series
 * @component BarSeries - OHLC bar series
 * @component HistogramSeries - Histogram series
 * @component BaselineSeries - Baseline series with fill
 *
 * ### Custom Series (from @lightweight-charts-pro/core)
 * @component BandSeries - Upper/lower band indicator (Bollinger, etc.)
 * @component RibbonSeries - Multi-line ribbon (EMA fans, etc.)
 * @component SignalSeries - Buy/sell signal markers
 * @component TrendFillSeries - Trend-based fill zones
 * @component GradientRibbonSeries - Gradient-filled ribbon
 *
 * ### Series Features (Nested Components)
 * @component Marker - Time-based markers (arrows, shapes)
 * @component PriceLine - Horizontal price level lines
 * @component Trade - Trade entry/exit visualization
 * @component Annotation - Text/shape annotations on chart
 */
export {
  // Main chart components
  LightweightChart,
  ChartPane,
  // UI primitives
  Legend,
  RangeSwitcher,
  // Series components
  Series,
  LineSeries,
  AreaSeries,
  CandlestickSeries,
  BarSeries,
  HistogramSeries,
  BaselineSeries,
  BandSeries,
  RibbonSeries,
  SignalSeries,
  TrendFillSeries,
  GradientRibbonSeries,
  // Series feature components
  Marker,
  PriceLine,
  Trade,
  Annotation,
} from "./components";

/**
 * ## Vue Composables
 *
 * ### For Advanced/Custom Integration
 * These composables are used internally by components but can be used directly
 * for advanced use cases:
 *
 * @composable useChartApi - REST API client for manual data loading
 * - Provides: `getSeriesData()`, `setSeriesData()`, `getHistory()`
 * - Use when: Building custom data loading logic outside components
 *
 * @composable useChartWebSocket - WebSocket client for real-time data
 * - Provides: `connect()`, `disconnect()`, event handlers
 * - Use when: Custom WebSocket integration or multiple connections
 *
 * @composable useLazyLoading - Infinite scroll pagination for time-series
 * - Provides: `isLoading`, `syncBounds()`, history request coordination
 * - Use when: Building custom scrollable chart implementations
 *
 * @composable useSeries - Series lifecycle management
 * - Provides: Series creation, data updates, cleanup
 * - Use when: Building custom series components
 */
export {
  useChartApi,
  useChartWebSocket,
  useLazyLoading,
  useSeries,
  type UseChartApiReturn,
  type UseChartApiOptions,
  type UseChartWebSocketReturn,
  type UseLazyLoadingReturn,
  type UseLazyLoadingOptions,
  type UseSeriesOptions,
} from "./composables";

/**
 * ## Core Utilities
 *
 * @class TimeRange - Time range helper for range switcher (from core package)
 * @type RangeConfig - Configuration for time range buttons
 */
export { TimeRange, type RangeConfig } from "@lightweight-charts-pro/core";

/**
 * ## TypeScript Types
 *
 * ### Chart Configuration
 * @type SeriesConfig - Series configuration (data, type, options, lazy loading)
 * @type ChartOptions - Chart-level options (layout, scales, grid)
 * @type PaneConfig - Multi-pane layout configuration
 * @type LazyLoadingConfig - Infinite scroll pagination settings
 *
 * ### Data Types
 * @type DataPoint - Time-series data point (OHLCV, line, histogram, etc.)
 * @type ChunkInfo - Pagination metadata (start, end, count)
 *
 * ### REST API Types
 * @type ChartData - Full chart state (series configs + options)
 * @type SeriesDataResponse - Response from getSeriesData endpoint
 * @type HistoryResponseMessage - Response from history request
 * @type ApiError - Error response format
 *
 * ### WebSocket Types
 * @type WebSocketConfig - WebSocket connection configuration
 * @type WebSocketEventHandlers - Event handler callbacks
 * @type IncomingMessage - Union of all WS messages from server
 * @type OutgoingMessage - Union of all WS messages to server
 * @type DataUpdateMessage - Real-time data update notification
 * @type InitialDataResponseMessage - Initial data on connection
 *
 * ### Component Props/Emits
 * @type ChartProps - LightweightChart component props
 * @type ChartEmits - LightweightChart component emits
 * @type ChartState - Internal chart state
 */
export type {
  // API types
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
  // WebSocket types
  WebSocketState,
  WebSocketConfig,
  WebSocketEventHandlers,
  IncomingMessage,
  OutgoingMessage,
  HistoryResponseMessage,
  InitialDataResponseMessage,
  DataUpdateMessage,
  // Chart types
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
} from "./types";
