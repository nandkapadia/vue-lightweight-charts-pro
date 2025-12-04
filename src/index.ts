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

// Components
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
} from './components';

// Composables
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
} from './composables';

// Re-export useful core utilities
export { TimeRange, type RangeConfig } from '@lightweight-charts-pro/core';

// Types
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
} from './types';
