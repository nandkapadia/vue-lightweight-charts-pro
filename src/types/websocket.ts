/**
 * @fileoverview TypeScript type definitions for WebSocket communication.
 *
 * This module defines the message formats and configuration types used for
 * real-time WebSocket communication between the Vue frontend and the backend.
 * The message types match the WebSocket handlers in the backend.
 *
 * WebSocket communication enables:
 * - Real-time data streaming for live price updates
 * - Bi-directional communication for history requests
 * - Connection health monitoring with ping/pong
 * - Automatic reconnection with exponential backoff
 *
 * @module types/websocket
 *
 * @example
 * ```typescript
 * import type {
 *   WebSocketConfig,
 *   DataUpdateMessage,
 *   WebSocketEventHandlers
 * } from '@lightweight-charts-pro/vue3';
 *
 * const config: WebSocketConfig = {
 *   url: 'ws://localhost:8000/ws/chart/my-chart',
 *   chartId: 'my-chart',
 *   reconnect: { enabled: true, maxAttempts: 5 }
 * };
 * ```
 */

// Local Imports
import type { ChunkInfo, DataPoint } from "./api";

/**
 * Possible states of a WebSocket connection.
 *
 * These states track the lifecycle of the WebSocket connection,
 * from initial connection attempt through to disconnection.
 *
 * @typedef {'connecting' | 'connected' | 'disconnected' | 'error'} WebSocketState
 *
 * @example
 * ```typescript
 * const state: WebSocketState = 'connected';
 *
 * switch (state) {
 *   case 'connecting':
 *     showLoadingIndicator();
 *     break;
 *   case 'connected':
 *     enableDataStreaming();
 *     break;
 *   case 'disconnected':
 *     attemptReconnection();
 *     break;
 *   case 'error':
 *     showErrorMessage();
 *     break;
 * }
 * ```
 */
export type WebSocketState =
  | "connecting"
  | "connected"
  | "disconnected"
  | "error";

/**
 * Base interface for all WebSocket messages.
 *
 * All messages must have a `type` field to identify the message kind.
 * The `chartId` field is optional but included in most messages.
 *
 * @interface BaseMessage
 */
export interface BaseMessage {
  /**
   * Identifier for the message type.
   * Used to route messages to appropriate handlers.
   */
  type: string;

  /**
   * Chart identifier this message relates to.
   * Optional for connection-level messages like ping/pong.
   */
  chartId?: string;
}

/**
 * Server acknowledgment of successful WebSocket connection.
 *
 * Sent by the server immediately after a client connects,
 * confirming the connection is established and ready for data.
 *
 * @interface ConnectedMessage
 * @extends BaseMessage
 */
export interface ConnectedMessage extends BaseMessage {
  /** Fixed type identifier for connection acknowledgment */
  type: "connected";

  /** Chart identifier that the connection is associated with */
  chartId: string;
}

/**
 * Ping message for connection health monitoring.
 *
 * Sent periodically by the client to verify the connection is alive.
 * Server responds with a PongMessage.
 *
 * @interface PingMessage
 * @extends BaseMessage
 */
export interface PingMessage extends BaseMessage {
  /** Fixed type identifier for ping request */
  type: "ping";
}

/**
 * Pong response to a ping request.
 *
 * Sent by the server in response to a PingMessage,
 * confirming the connection is still active.
 *
 * @interface PongMessage
 * @extends BaseMessage
 */
export interface PongMessage extends BaseMessage {
  /** Fixed type identifier for pong response */
  type: "pong";
}

/**
 * Client request for initial chart data.
 *
 * Sent after connection to request the current state of a chart,
 * including all series data and configuration options.
 *
 * @interface GetInitialDataMessage
 * @extends BaseMessage
 *
 * @example
 * ```typescript
 * // Request all data for the chart
 * const request: GetInitialDataMessage = {
 *   type: 'get_initial_data',
 *   chartId: 'my-chart'
 * };
 *
 * // Request specific pane/series
 * const filteredRequest: GetInitialDataMessage = {
 *   type: 'get_initial_data',
 *   chartId: 'my-chart',
 *   paneId: 0,
 *   seriesId: 'price'
 * };
 * ```
 */
export interface GetInitialDataMessage extends BaseMessage {
  /** Fixed type identifier for initial data request */
  type: "get_initial_data";

  /**
   * Optional pane filter.
   * If specified, only returns data for this pane.
   */
  paneId?: number;

  /**
   * Optional series filter.
   * If specified, only returns data for this series.
   */
  seriesId?: string;
}

/**
 * Server response containing initial chart data.
 *
 * Contains the complete current state of the requested chart,
 * including all panes, series data, and configuration options.
 *
 * @interface InitialDataResponseMessage
 * @extends BaseMessage
 *
 * @example
 * ```typescript
 * const response: InitialDataResponseMessage = {
 *   type: 'initial_data_response',
 *   chartId: 'my-chart',
 *   panes: {
 *     '0': {
 *       'price': {
 *         seriesType: 'candlestick',
 *         data: [{ time: 1609459200, open: 100, high: 105, low: 98, close: 103 }],
 *         options: { upColor: '#26a69a' }
 *       }
 *     }
 *   },
 *   options: { layout: { background: { color: '#1e1e1e' } } }
 * };
 * ```
 */
export interface InitialDataResponseMessage extends BaseMessage {
  /** Fixed type identifier for initial data response */
  type: "initial_data_response";

  /** Chart identifier this data belongs to */
  chartId: string;

  /**
   * Nested structure containing all panes and their series.
   * Structure: panes[paneId][seriesId] = { seriesType, data, options }
   * May be undefined if only requesting a specific series.
   */
  panes?: Record<
    string,
    Record<
      string,
      {
        /** Type of the series (line, candlestick, etc.) */
        seriesType: string;
        /** Array of data points for the series */
        data: DataPoint[];
        /** Visual configuration options for the series */
        options: Record<string, unknown>;
      }
    >
  >;

  /**
   * Chart-level configuration options.
   * Applied to customize the chart appearance.
   */
  options?: Record<string, unknown>;

  /**
   * Error message if the request failed.
   * Present only when an error occurred server-side.
   */
  error?: string;
}

/**
 * Client request for historical data (pagination).
 *
 * Used to fetch additional data beyond the initially loaded range,
 * supporting infinite scroll / lazy loading functionality.
 *
 * @interface RequestHistoryMessage
 * @extends BaseMessage
 *
 * @example
 * ```typescript
 * // Request 500 bars before the current first bar
 * const historyRequest: RequestHistoryMessage = {
 *   type: 'request_history',
 *   chartId: 'my-chart',
 *   paneId: 0,
 *   seriesId: 'price',
 *   beforeTime: 1609459200,  // Current first bar timestamp
 *   count: 500
 * };
 * ```
 */
export interface RequestHistoryMessage extends BaseMessage {
  /** Fixed type identifier for history request */
  type: "request_history";

  /**
   * Index of the pane containing the target series.
   * Required to identify the correct series in multi-pane charts.
   */
  paneId: number;

  /**
   * Identifier for the series to fetch history for.
   * Must match an existing series in the specified pane.
   */
  seriesId: string;

  /**
   * Get data points with timestamps before this value.
   * Used for backward pagination (loading older data).
   */
  beforeTime?: number;

  /**
   * Get data points with timestamps after this value.
   * Used for forward pagination (loading newer data).
   */
  afterTime?: number;

  /**
   * Maximum number of data points to return.
   * Server may return fewer if less data is available.
   */
  count?: number;
}

/**
 * Server response containing requested historical data.
 *
 * Contains the paginated data chunk along with metadata about
 * the chunk's position in the full dataset and pagination flags.
 *
 * @interface HistoryResponseMessage
 * @extends BaseMessage
 *
 * @example
 * ```typescript
 * const historyResponse: HistoryResponseMessage = {
 *   type: 'history_response',
 *   chartId: 'my-chart',
 *   paneId: 0,
 *   seriesId: 'price',
 *   data: [{ time: 1609372800, open: 98, high: 100, low: 95, close: 99 }],
 *   chunkInfo: { startIndex: 0, endIndex: 499, startTime: 1609372800, ... },
 *   hasMoreBefore: true,
 *   hasMoreAfter: false,
 *   totalCount: 10000,
 *   direction: 'before'
 * };
 * ```
 */
export interface HistoryResponseMessage extends BaseMessage {
  /** Fixed type identifier for history response */
  type: "history_response";

  /** Chart identifier this data belongs to */
  chartId: string;

  /** Index of the pane containing this series */
  paneId: number;

  /** Identifier for the series this data belongs to */
  seriesId: string;

  /**
   * Array of historical data points.
   * Sorted by time in ascending order.
   */
  data: DataPoint[];

  /**
   * Metadata about this chunk's position in the full dataset.
   * Used for tracking pagination state and merging data.
   */
  chunkInfo: ChunkInfo;

  /**
   * Whether older data exists before this chunk.
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
   * Useful for progress indicators or scroll calculations.
   */
  totalCount: number;

  /**
   * Direction of the original request ('before' or 'after').
   * Used to correctly merge data on the client side.
   */
  direction?: "before" | "after";

  /**
   * Error message if the request failed.
   * Present only when an error occurred server-side.
   */
  error?: string;
}

/**
 * Real-time notification of data updates.
 *
 * Sent by the server when new data is available for a series,
 * either due to real-time streaming or manual data updates.
 *
 * @interface DataUpdateMessage
 * @extends BaseMessage
 *
 * @example
 * ```typescript
 * // Notification with incremental data (preferred for performance)
 * const updateWithData: DataUpdateMessage = {
 *   type: 'data_update',
 *   chartId: 'my-chart',
 *   paneId: 0,
 *   seriesId: 'price',
 *   count: 1,
 *   data: [{ time: 1609459260, open: 103, high: 104, low: 102, close: 103.5 }]
 * };
 *
 * // Notification without data (triggers REST fetch)
 * const updateNotification: DataUpdateMessage = {
 *   type: 'data_update',
 *   chartId: 'my-chart',
 *   paneId: 0,
 *   seriesId: 'price',
 *   count: 1
 * };
 * ```
 */
export interface DataUpdateMessage extends BaseMessage {
  /** Fixed type identifier for data update notification */
  type: "data_update";

  /** Chart identifier this update belongs to */
  chartId: string;

  /** Index of the pane that received updates */
  paneId: number;

  /** Identifier for the series that was updated */
  seriesId: string;

  /** Number of data points in the update */
  count: number;

  /**
   * Optional incremental data payload.
   *
   * When present, the client can apply these data points directly
   * using the efficient update() method (O(m) instead of O(n)).
   *
   * When absent, the client falls back to fetching via REST API,
   * which downloads the full dataset (backward compatibility mode).
   *
   * For high-frequency data streams, including this field prevents
   * expensive full dataset downloads on every tick.
   */
  data?: DataPoint[];
}

/**
 * Union type of all messages that can be received from the server.
 *
 * Use type guards or switch statements on the `type` field to handle
 * different message types appropriately.
 *
 * @typedef {ConnectedMessage | PongMessage | InitialDataResponseMessage |
 *   HistoryResponseMessage | DataUpdateMessage} IncomingMessage
 *
 * @example
 * ```typescript
 * function handleMessage(message: IncomingMessage) {
 *   switch (message.type) {
 *     case 'connected':
 *       console.log('Connected to chart:', message.chartId);
 *       break;
 *     case 'pong':
 *       // Connection health confirmed
 *       break;
 *     case 'initial_data_response':
 *       applyInitialData(message.panes, message.options);
 *       break;
 *     case 'history_response':
 *       mergeHistoryData(message.data, message.direction);
 *       break;
 *     case 'data_update':
 *       updateSeries(message.seriesId, message.data);
 *       break;
 *   }
 * }
 * ```
 */
export type IncomingMessage =
  | ConnectedMessage
  | PongMessage
  | InitialDataResponseMessage
  | HistoryResponseMessage
  | DataUpdateMessage;

/**
 * Union type of all messages that can be sent to the server.
 *
 * These are the message types the client can initiate.
 *
 * @typedef {PingMessage | GetInitialDataMessage | RequestHistoryMessage} OutgoingMessage
 */
export type OutgoingMessage =
  | PingMessage
  | GetInitialDataMessage
  | RequestHistoryMessage;

/**
 * Event handler callbacks for WebSocket connection events.
 *
 * These callbacks allow consumers to react to WebSocket lifecycle events
 * and incoming data messages.
 *
 * @interface WebSocketEventHandlers
 *
 * @example
 * ```typescript
 * const handlers: WebSocketEventHandlers = {
 *   onConnected: (chartId) => console.log('Connected:', chartId),
 *   onDisconnected: () => console.log('Disconnected'),
 *   onError: (error) => console.error('WebSocket error:', error),
 *   onInitialData: (data) => initializeChart(data),
 *   onHistoryResponse: (data) => mergeHistory(data),
 *   onDataUpdate: (data) => updateSeries(data)
 * };
 * ```
 */
export interface WebSocketEventHandlers {
  /**
   * Called when the WebSocket connection is successfully established.
   * @param chartId - The chart identifier from the connection acknowledgment
   */
  onConnected?: (chartId: string) => void;

  /**
   * Called when the WebSocket connection is closed.
   * May be due to normal closure, network issues, or server shutdown.
   */
  onDisconnected?: () => void;

  /**
   * Called when a WebSocket error occurs.
   * @param error - Error object with details about what went wrong
   */
  onError?: (error: Error) => void;

  /**
   * Called when initial chart data is received from the server.
   * @param data - Complete initial data response including all panes/series
   */
  onInitialData?: (data: InitialDataResponseMessage) => void;

  /**
   * Called when historical data is received in response to a pagination request.
   * @param data - History response with data chunk and pagination metadata
   */
  onHistoryResponse?: (data: HistoryResponseMessage) => void;

  /**
   * Called when a data update notification is received.
   * @param data - Update notification with optional incremental data payload
   */
  onDataUpdate?: (data: DataUpdateMessage) => void;
}

/**
 * Configuration options for WebSocket connection management.
 *
 * Controls the WebSocket URL, chart association, reconnection behavior,
 * and health monitoring settings.
 *
 * @interface WebSocketConfig
 *
 * @example
 * ```typescript
 * const config: WebSocketConfig = {
 *   url: 'ws://localhost:8000/ws/chart/my-chart',
 *   chartId: 'my-chart',
 *   reconnect: {
 *     enabled: true,
 *     maxAttempts: 5,
 *     baseDelay: 1000,   // Start with 1 second delay
 *     maxDelay: 30000    // Cap at 30 seconds
 *   },
 *   pingInterval: 30000  // Ping every 30 seconds
 * };
 * ```
 */
export interface WebSocketConfig {
  /**
   * Full WebSocket server URL including protocol and path.
   * Example: 'ws://localhost:8000/ws/chart/my-chart' or 'wss://...'
   */
  url: string;

  /**
   * Chart identifier to associate with this connection.
   * Used in messages and for routing data to correct chart.
   */
  chartId: string;

  /**
   * Reconnection behavior configuration.
   * Controls automatic reconnection attempts after connection loss.
   */
  reconnect?: {
    /**
     * Whether to automatically attempt reconnection after disconnection.
     * When false, reconnection must be triggered manually.
     */
    enabled: boolean;

    /**
     * Maximum number of consecutive reconnection attempts.
     * After this many failures, reconnection is abandoned.
     * Default: 5
     */
    maxAttempts?: number;

    /**
     * Initial delay between reconnection attempts in milliseconds.
     * Subsequent attempts use exponential backoff from this base.
     * Default: 1000 (1 second)
     */
    baseDelay?: number;

    /**
     * Maximum delay between reconnection attempts in milliseconds.
     * Caps the exponential backoff to prevent very long waits.
     * Default: 30000 (30 seconds)
     */
    maxDelay?: number;
  };

  /**
   * Interval for sending ping messages in milliseconds.
   * Used to detect dead connections and keep the connection alive.
   * Set to 0 to disable ping/pong health checks.
   * Default: 30000 (30 seconds)
   */
  pingInterval?: number;
}
