import { Ref, ShallowRef } from 'vue';
import { ChartData, CreateChartResponse, GetSeriesDataResponse, GetHistoryResponse, SetSeriesDataRequest, SetSeriesDataResponse, HealthCheckResponse } from '../types';
/**
 * API client state returned by the composable.
 */
export interface UseChartApiState {
    /** Whether a request is in progress */
    isLoading: Ref<boolean>;
    /** Last error message */
    error: Ref<string | null>;
    /** Last response data */
    data: ShallowRef<unknown>;
}
/**
 * API client methods returned by the composable.
 */
export interface UseChartApiMethods {
    /** Check backend health */
    healthCheck: () => Promise<HealthCheckResponse>;
    /** Create a new chart */
    createChart: (chartId: string, options?: Record<string, unknown>) => Promise<CreateChartResponse>;
    /** Get full chart data */
    getChart: (chartId: string) => Promise<ChartData>;
    /** Get series data with smart chunking */
    getSeriesData: (chartId: string, paneId: number, seriesId: string) => Promise<GetSeriesDataResponse>;
    /** Set series data */
    setSeriesData: (chartId: string, seriesId: string, request: SetSeriesDataRequest) => Promise<SetSeriesDataResponse>;
    /** Get historical data chunk */
    getHistory: (chartId: string, paneId: number, seriesId: string, beforeTime: number, count?: number) => Promise<GetHistoryResponse>;
    /** Clear error state */
    clearError: () => void;
}
/**
 * Return type of the useChartApi composable.
 */
export type UseChartApiReturn = UseChartApiState & UseChartApiMethods;
/**
 * Options for the useChartApi composable.
 */
export interface UseChartApiOptions {
    /** Base URL for the API (default: '/api/charts') */
    baseUrl?: string;
    /** Request timeout in milliseconds (default: 30000) */
    timeout?: number;
    /** Custom fetch implementation for testing */
    fetchFn?: typeof fetch;
}
/**
 * Vue 3 composable for interacting with the chart REST API.
 *
 * @param options - Configuration options
 * @returns API state and methods
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { useChartApi } from '@lightweight-charts-pro/vue3';
 *
 * const { isLoading, error, getChart, setSeriesData } = useChartApi({
 *   baseUrl: 'http://localhost:8000/api/charts'
 * });
 *
 * // Load chart data
 * const chartData = await getChart('my-chart');
 *
 * // Update series data
 * await setSeriesData('my-chart', 'price', {
 *   seriesType: 'candlestick',
 *   data: [{ time: 1234567890, open: 100, high: 105, low: 98, close: 102 }]
 * });
 * </script>
 * ```
 */
export declare function useChartApi(options?: UseChartApiOptions): UseChartApiReturn;
export default useChartApi;
