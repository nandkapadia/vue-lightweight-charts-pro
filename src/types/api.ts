/**
 * @fileoverview TypeScript type definitions for REST API contracts.
 *
 * This module defines the data structures used for communication between the Vue
 * frontend and the FastAPI backend. These types match the Pydantic models defined
 * in the backend's datafeed service.
 *
 * The API follows RESTful conventions with JSON request/response bodies.
 * All timestamps are Unix timestamps in seconds unless otherwise noted.
 *
 * @module types/api
 * @see {@link https://github.com/nandkapadia/lightweight-charts-pro-frontend} Backend API
 *
 * @example
 * ```typescript
 * import type { DataPoint, GetHistoryResponse } from '@lightweight-charts-pro/vue3';
 *
 * // Fetch historical data from API
 * const response: GetHistoryResponse = await fetch('/api/charts/my-chart/history');
 * const data: DataPoint[] = response.data;
 * ```
 */

/**
 * Metadata about a paginated data chunk.
 *
 * When datasets are too large to transfer in a single request, the API returns
 * data in chunks. This interface provides information about where the current
 * chunk fits within the complete dataset.
 *
 * @interface ChunkInfo
 *
 * @example
 * ```typescript
 * const chunkInfo: ChunkInfo = {
 *   startIndex: 0,
 *   endIndex: 499,
 *   startTime: 1609459200,  // 2021-01-01 00:00:00 UTC
 *   endTime: 1609545600,    // 2021-01-02 00:00:00 UTC
 *   count: 500
 * };
 * ```
 */
export interface ChunkInfo {
  /**
   * Zero-based index of the first data point in this chunk within the full dataset.
   * Used to calculate position when merging chunks.
   */
  startIndex: number;

  /**
   * Zero-based index of the last data point in this chunk within the full dataset.
   * The range is inclusive: [startIndex, endIndex].
   */
  endIndex: number;

  /**
   * Unix timestamp (in seconds) of the first data point in this chunk.
   * Used for time-based pagination and range queries.
   */
  startTime: number;

  /**
   * Unix timestamp (in seconds) of the last data point in this chunk.
   * Used to determine if more data exists beyond this range.
   */
  endTime: number;

  /**
   * Total number of data points contained in this chunk.
   * Should equal (endIndex - startIndex + 1).
   */
  count: number;
}

/**
 * A single data point in a chart series.
 *
 * This is a flexible interface that supports multiple series types:
 * - Line/Area series: Use `time` and `value`
 * - OHLC series (Bar/Candlestick): Use `time`, `open`, `high`, `low`, `close`
 * - Custom series: May include additional fields via the index signature
 *
 * @interface DataPoint
 *
 * @example
 * ```typescript
 * // Line series data point
 * const linePoint: DataPoint = { time: 1609459200, value: 100.5 };
 *
 * // Candlestick series data point
 * const ohlcPoint: DataPoint = {
 *   time: 1609459200,
 *   open: 100,
 *   high: 105,
 *   low: 98,
 *   close: 103
 * };
 *
 * // With custom fields (e.g., volume)
 * const volumePoint: DataPoint = {
 *   time: 1609459200,
 *   value: 1500000,
 *   color: '#26a69a'  // Custom color for this bar
 * };
 * ```
 */
export interface DataPoint {
  /**
   * Timestamp for this data point.
   * Accepts Unix timestamp in seconds (number) or ISO 8601 date string.
   * All times are normalized to Unix seconds internally.
   */
  time: number | string;

  /**
   * Value for single-value series (Line, Area, Histogram).
   * Optional - not used by OHLC series types.
   */
  value?: number;

  /**
   * Opening price for OHLC series (Bar, Candlestick).
   * Required for candlestick/bar charts, ignored for other types.
   */
  open?: number;

  /**
   * Highest price for OHLC series (Bar, Candlestick).
   * Required for candlestick/bar charts, ignored for other types.
   */
  high?: number;

  /**
   * Lowest price for OHLC series (Bar, Candlestick).
   * Required for candlestick/bar charts, ignored for other types.
   */
  low?: number;

  /**
   * Closing price for OHLC series (Bar, Candlestick).
   * Required for candlestick/bar charts, ignored for other types.
   */
  close?: number;

  /**
   * Index signature allowing additional custom fields.
   * Useful for per-bar colors, volume data, or other custom attributes.
   */
  [key: string]: unknown;
}

/**
 * Configuration options for visual appearance and behavior of a chart series.
 *
 * These options are passed to the lightweight-charts library when creating
 * or updating a series. Not all options apply to all series types.
 *
 * @interface SeriesOptions
 *
 * @example
 * ```typescript
 * const lineOptions: SeriesOptions = {
 *   color: '#2196F3',
 *   lineWidth: 2,
 *   priceLineVisible: true,
 *   title: 'SMA 20'
 * };
 *
 * const candleOptions: SeriesOptions = {
 *   upColor: '#26a69a',
 *   downColor: '#ef5350',
 *   priceScaleId: 'right'
 * };
 * ```
 */
export interface SeriesOptions {
  /**
   * Primary color for the series.
   * For candlesticks, use `upColor` and `downColor` instead.
   */
  color?: string;

  /**
   * Width of the line in pixels (for line-based series).
   * Common values: 1 (thin), 2 (normal), 3 (thick).
   */
  lineWidth?: number;

  /**
   * Style of the line (solid, dashed, dotted).
   * Uses LineStyle enum values: 0=Solid, 1=Dotted, 2=Dashed, 3=LargeDashed.
   */
  lineStyle?: number;

  /**
   * ID of the price scale to use ('left', 'right', or custom ID).
   * Allows multiple series to share or have separate price scales.
   */
  priceScaleId?: string;

  /**
   * Whether to show a horizontal line at the current price level.
   * Useful for highlighting the latest value.
   */
  priceLineVisible?: boolean;

  /**
   * Display title for the series, shown in legends and tooltips.
   * Should be short and descriptive (e.g., 'AAPL', 'SMA 20', 'Volume').
   */
  title?: string;

  /**
   * Index signature allowing additional series-specific options.
   * Different series types support different additional options.
   */
  [key: string]: unknown;
}

/**
 * Request payload for setting or updating series data via the REST API.
 *
 * @interface SetSeriesDataRequest
 *
 * @example
 * ```typescript
 * const request: SetSeriesDataRequest = {
 *   paneId: 0,
 *   seriesType: 'candlestick',
 *   data: [
 *     { time: 1609459200, open: 100, high: 105, low: 98, close: 103 },
 *     { time: 1609545600, open: 103, high: 108, low: 101, close: 106 }
 *   ],
 *   options: { upColor: '#26a69a', downColor: '#ef5350' }
 * };
 * ```
 */
export interface SetSeriesDataRequest {
  /**
   * Index of the pane to add the series to.
   * Default is 0 (main pane). Use higher numbers for indicator panes.
   */
  paneId?: number;

  /**
   * Type of series to create or update.
   * Must be a valid SeriesType or CustomSeriesType value.
   */
  seriesType: string;

  /**
   * Array of data points for the series.
   * Data should be sorted by time in ascending order.
   */
  data: DataPoint[];

  /**
   * Optional configuration for the series appearance.
   * Will be merged with existing options if updating.
   */
  options?: SeriesOptions;
}

/**
 * Request parameters for fetching historical data with pagination.
 *
 * Supports both backward (before) and forward (after) pagination
 * for implementing infinite scroll functionality.
 *
 * @interface GetHistoryRequest
 *
 * @example
 * ```typescript
 * // Get 500 bars before a specific timestamp
 * const request: GetHistoryRequest = {
 *   paneId: 0,
 *   seriesId: 'price',
 *   beforeTime: 1609459200,
 *   direction: 'before',
 *   count: 500
 * };
 * ```
 */
export interface GetHistoryRequest {
  /**
   * Index of the pane containing the series.
   * Required to identify the correct series in multi-pane charts.
   */
  paneId: number;

  /**
   * Unique identifier for the series within the pane.
   * Matches the seriesId used when creating the series.
   */
  seriesId: string;

  /**
   * Get data points with timestamps before this Unix timestamp.
   * Used for backward pagination (scrolling into history).
   */
  beforeTime?: number;

  /**
   * Get data points with timestamps after this Unix timestamp.
   * Used for forward pagination (scrolling toward present/future).
   */
  afterTime?: number;

  /**
   * Direction of pagination.
   * 'before' = fetch older data, 'after' = fetch newer data.
   */
  direction?: "before" | "after";

  /**
   * Maximum number of data points to return.
   * Default is 500. Higher values may impact performance.
   */
  count?: number;
}

/**
 * Response payload when creating a new chart via the API.
 *
 * @interface CreateChartResponse
 */
export interface CreateChartResponse {
  /**
   * Unique identifier assigned to the created chart.
   * Use this ID for subsequent API calls to this chart.
   */
  chartId: string;

  /**
   * Chart configuration options that were applied.
   * May differ from requested options due to server-side defaults.
   */
  options: Record<string, unknown>;
}

/**
 * Response payload for series data that fits in a single response (non-chunked).
 *
 * Used when the dataset is small enough to transfer completely in one request.
 * For larger datasets, see {@link ChunkedSeriesDataResponse}.
 *
 * @interface SeriesDataResponse
 */
export interface SeriesDataResponse {
  /**
   * Unique identifier for the series.
   * Matches the ID used in the request.
   */
  seriesId: string;

  /**
   * Type of the series (line, candlestick, area, etc.).
   * Indicates how to interpret the data points.
   */
  seriesType: string;

  /**
   * Complete array of data points for the series.
   * Sorted by time in ascending order.
   */
  data: DataPoint[];

  /**
   * Visual configuration options for the series.
   * Includes colors, line styles, and other display settings.
   */
  options: SeriesOptions;

  /**
   * Flag indicating this response contains the complete dataset.
   * Always `false` for non-chunked responses.
   */
  chunked: false;

  /**
   * Total number of data points in the series.
   * Should equal data.length for non-chunked responses.
   */
  totalCount: number;
}

/**
 * Response payload for series data that is paginated (chunked).
 *
 * Used when datasets are too large to transfer in a single request.
 * Includes metadata for implementing pagination controls.
 *
 * @interface ChunkedSeriesDataResponse
 */
export interface ChunkedSeriesDataResponse {
  /**
   * Unique identifier for the series.
   * Matches the ID used in the request.
   */
  seriesId: string;

  /**
   * Type of the series (line, candlestick, area, etc.).
   * Indicates how to interpret the data points.
   */
  seriesType: string;

  /**
   * Subset of data points for the current chunk.
   * Sorted by time in ascending order.
   */
  data: DataPoint[];

  /**
   * Visual configuration options for the series.
   * Same across all chunks for a given series.
   */
  options: SeriesOptions;

  /**
   * Flag indicating this response is paginated.
   * Always `true` for chunked responses.
   */
  chunked: true;

  /**
   * Metadata about this chunk's position in the full dataset.
   * Used for merging chunks and implementing pagination.
   */
  chunkInfo: ChunkInfo;

  /**
   * Whether older data exists before the start of this chunk.
   * If true, user can scroll/request more historical data.
   */
  hasMoreBefore: boolean;

  /**
   * Whether newer data exists after the end of this chunk.
   * If true, user can scroll/request more recent data.
   */
  hasMoreAfter: boolean;

  /**
   * Total number of data points available in the full dataset.
   * May be larger than data.length for chunked responses.
   */
  totalCount: number;
}

/**
 * Union type for series data responses, handling both chunked and non-chunked cases.
 *
 * Use type guards to determine which response type you received:
 * ```typescript
 * if (response.chunked) {
 *   // Handle chunked response with pagination
 * } else {
 *   // Handle complete data response
 * }
 * ```
 *
 * @typedef {SeriesDataResponse | ChunkedSeriesDataResponse} GetSeriesDataResponse
 */
export type GetSeriesDataResponse = SeriesDataResponse | ChunkedSeriesDataResponse;

/**
 * Response payload for historical data pagination requests.
 *
 * Returned by the history endpoint when fetching additional data
 * beyond the initial load (for lazy loading / infinite scroll).
 *
 * @interface GetHistoryResponse
 */
export interface GetHistoryResponse {
  /**
   * Unique identifier for the series.
   * Matches the ID used in the request.
   */
  seriesId: string;

  /**
   * Array of historical data points.
   * Should be merged with existing data on the client side.
   */
  data: DataPoint[];

  /**
   * Metadata about this chunk's position in the full dataset.
   * Used for determining merge position and tracking pagination.
   */
  chunkInfo: ChunkInfo;

  /**
   * Whether even older data exists before this chunk.
   * If false, user has reached the beginning of available history.
   */
  hasMoreBefore: boolean;

  /**
   * Whether newer data exists after this chunk.
   * If false, user has reached the end of available data.
   */
  hasMoreAfter: boolean;

  /**
   * Total number of data points available in the full dataset.
   * Useful for progress indicators or scroll position calculations.
   */
  totalCount: number;
}

/**
 * Response payload confirming series data was successfully saved.
 *
 * @interface SetSeriesDataResponse
 */
export interface SetSeriesDataResponse {
  /**
   * Unique identifier for the series that was updated.
   * Can be used to verify the correct series was modified.
   */
  seriesId: string;

  /**
   * Type of the series that was updated.
   * Confirms the series type matches expectations.
   */
  seriesType: string;

  /**
   * Number of data points that were stored.
   * Useful for verification and debugging.
   */
  count: number;
}

/**
 * Complete chart data structure including all panes and their series.
 *
 * Used when fetching or storing a complete chart state, such as when
 * restoring from a saved configuration or exporting chart data.
 *
 * @interface ChartData
 *
 * @example
 * ```typescript
 * const chartData: ChartData = {
 *   chartId: 'my-chart',
 *   panes: {
 *     '0': {  // Main pane
 *       'price': { seriesType: 'candlestick', data: [...], options: {...} },
 *       'sma20': { seriesType: 'line', data: [...], options: {...} }
 *     },
 *     '1': {  // Volume pane
 *       'volume': { seriesType: 'histogram', data: [...], options: {...} }
 *     }
 *   },
 *   options: { layout: { background: { color: '#1e1e1e' } } }
 * };
 * ```
 */
export interface ChartData {
  /**
   * Unique identifier for the chart.
   * Used to distinguish between multiple charts in the application.
   */
  chartId: string;

  /**
   * Nested object containing all panes and their series.
   * Structure: panes[paneId][seriesId] = { seriesType, data, options }
   */
  panes: Record<
    string,
    Record<
      string,
      {
        /** Type of the series (line, candlestick, etc.) */
        seriesType: string;
        /** Data points for the series */
        data: DataPoint[];
        /** Visual configuration options */
        options: SeriesOptions;
      }
    >
  >;

  /**
   * Chart-level configuration options.
   * Includes layout, time scale, and cross-hair settings.
   */
  options: Record<string, unknown>;
}

/**
 * Error response structure from the REST API.
 *
 * Returned when API requests fail due to validation errors,
 * resource not found, or server errors.
 *
 * @interface ApiError
 *
 * @example
 * ```typescript
 * // Handle API errors
 * try {
 *   const response = await api.getSeriesData('chart-id', 0, 'price');
 * } catch (error) {
 *   const apiError = error as ApiError;
 *   console.error(`Error ${apiError.statusCode}: ${apiError.error}`);
 * }
 * ```
 */
export interface ApiError {
  /**
   * Human-readable error message.
   * Suitable for display to users or logging.
   */
  error: string;

  /**
   * Detailed error information (FastAPI validation error format).
   * May contain additional context about what went wrong.
   */
  detail?: string;

  /**
   * HTTP status code associated with the error.
   * Common values: 400 (bad request), 404 (not found), 500 (server error).
   */
  statusCode?: number;
}

/**
 * Response from the API health check endpoint.
 *
 * Used to verify the API server is running and responsive
 * before making data requests.
 *
 * @interface HealthCheckResponse
 */
export interface HealthCheckResponse {
  /**
   * Current health status of the server.
   * 'healthy' means the server is operational.
   */
  status: "healthy" | "unhealthy";

  /**
   * Version string of the API.
   * Useful for debugging compatibility issues.
   */
  version: string;
}
