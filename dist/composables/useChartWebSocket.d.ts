import { Ref, ComputedRef } from 'vue';
import { WebSocketState, WebSocketConfig, WebSocketEventHandlers, OutgoingMessage } from '../types';
/**
 * WebSocket state returned by the composable.
 */
export interface UseChartWebSocketState {
    /** Current connection state */
    state: Ref<WebSocketState>;
    /** Whether connected */
    isConnected: ComputedRef<boolean>;
    /** Last error message */
    error: Ref<string | null>;
    /** Number of reconnection attempts */
    reconnectAttempts: Ref<number>;
}
/**
 * WebSocket methods returned by the composable.
 */
export interface UseChartWebSocketMethods {
    /** Connect to WebSocket server */
    connect: () => void;
    /** Disconnect from WebSocket server */
    disconnect: () => void;
    /** Send a message to the server */
    send: (message: OutgoingMessage) => boolean;
    /** Request initial chart data */
    requestInitialData: (paneId?: number, seriesId?: string) => void;
    /** Request historical data */
    requestHistory: (paneId: number, seriesId: string, beforeTime: number, count?: number) => void;
}
/**
 * Return type of the useChartWebSocket composable.
 */
export type UseChartWebSocketReturn = UseChartWebSocketState & UseChartWebSocketMethods;
/**
 * Vue 3 composable for WebSocket communication with the chart backend.
 *
 * @param config - WebSocket configuration
 * @param handlers - Event handlers for WebSocket events
 * @returns WebSocket state and methods
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { useChartWebSocket } from '@lightweight-charts-pro/vue3';
 *
 * const { state, isConnected, connect, disconnect, requestHistory } = useChartWebSocket(
 *   {
 *     url: 'ws://localhost:8000/ws',
 *     chartId: 'my-chart',
 *   },
 *   {
 *     onHistoryResponse: (data) => {
 *       console.log('History received:', data);
 *     },
 *     onDataUpdate: (data) => {
 *       console.log('Data updated:', data);
 *     },
 *   }
 * );
 *
 * // Connect on mount
 * connect();
 * </script>
 * ```
 */
export declare function useChartWebSocket(config: WebSocketConfig, handlers?: WebSocketEventHandlers): UseChartWebSocketReturn;
export default useChartWebSocket;
