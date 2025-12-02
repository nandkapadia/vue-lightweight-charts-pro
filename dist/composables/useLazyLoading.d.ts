import { Ref } from 'vue';
import { IChartApi } from 'lightweight-charts';
import { SeriesConfig, LazyLoadingConfig, DataPoint } from '../types';
/**
 * State for tracking lazy loading per series.
 */
interface SeriesLazyState {
    seriesId: string;
    paneId: number;
    lazyLoading: LazyLoadingConfig;
    isLoadingBefore: boolean;
    isLoadingAfter: boolean;
    lastRequestTime: number;
}
/**
 * Lazy loading state returned by the composable.
 */
export interface UseLazyLoadingState {
    /** Whether any series is currently loading */
    isLoading: Ref<boolean>;
    /** Map of series ID to loading state */
    loadingStates: Ref<Map<string, SeriesLazyState>>;
    /** Set of pending request keys */
    pendingRequests: Ref<Set<string>>;
}
/**
 * Lazy loading methods returned by the composable.
 */
export interface UseLazyLoadingMethods {
    /** Manually trigger a history request */
    requestHistory: (seriesId: string, beforeTime: number, direction: 'before' | 'after') => void;
    /** Update lazy loading state after receiving history */
    handleHistoryResponse: (seriesId: string, direction: 'before' | 'after', hasMoreBefore: boolean, hasMoreAfter: boolean) => void;
    /** Reset all loading states */
    reset: () => void;
}
/**
 * Return type of the useLazyLoading composable.
 */
export type UseLazyLoadingReturn = UseLazyLoadingState & UseLazyLoadingMethods;
/**
 * Options for the useLazyLoading composable.
 */
export interface UseLazyLoadingOptions {
    /** Chart API instance ref */
    chart: Ref<IChartApi | null>;
    /** Series configurations ref */
    seriesConfigs: Ref<SeriesConfig[]>;
    /** Threshold (in bars) to trigger loading more data */
    loadThreshold?: number;
    /** Debounce delay in milliseconds */
    debounceMs?: number;
    /** Callback to request history from backend */
    onRequestHistory: (seriesId: string, paneId: number, beforeTime: number, direction: 'before' | 'after', count: number) => void;
    /** Callback when history is loaded */
    onHistoryLoaded?: (seriesId: string, data: DataPoint[]) => void;
}
/**
 * Vue 3 composable for lazy loading chart data.
 *
 * This composable subscribes to the chart's time scale changes and automatically
 * requests more data when the user scrolls near the boundaries of loaded data.
 *
 * @param options - Lazy loading configuration options
 * @returns Lazy loading state and methods
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { ref } from 'vue';
 * import { useLazyLoading, useChartApi } from '@lightweight-charts-pro/vue3';
 * import type { IChartApi } from 'lightweight-charts';
 *
 * const chart = ref<IChartApi | null>(null);
 * const seriesConfigs = ref([
 *   {
 *     seriesId: 'price',
 *     seriesType: 'candlestick',
 *     data: [],
 *     lazyLoading: {
 *       enabled: true,
 *       chunkSize: 500,
 *       hasMoreBefore: true,
 *       hasMoreAfter: false,
 *     }
 *   }
 * ]);
 *
 * const { getHistory } = useChartApi();
 *
 * const { isLoading, handleHistoryResponse } = useLazyLoading({
 *   chart,
 *   seriesConfigs,
 *   onRequestHistory: async (seriesId, paneId, beforeTime, direction, count) => {
 *     const response = await getHistory('my-chart', paneId, seriesId, beforeTime, count);
 *     handleHistoryResponse(seriesId, direction, response.hasMoreBefore, response.hasMoreAfter);
 *   }
 * });
 * </script>
 * ```
 */
export declare function useLazyLoading(options: UseLazyLoadingOptions): UseLazyLoadingReturn;
export default useLazyLoading;
