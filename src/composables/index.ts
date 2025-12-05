/**
 * @fileoverview Vue 3 composables for chart functionality.
 *
 * This module exports all composable functions that provide reusable chart
 * functionality. Composables follow the Vue 3 Composition API pattern and
 * can be used in setup functions or other composables.
 *
 * @module composables
 *
 * Available composables:
 * - `useChartApi` - REST API client for chart data management
 * - `useChartWebSocket` - WebSocket client for real-time updates
 * - `useLazyLoading` - Infinite scroll / lazy loading functionality
 * - `useSeries` - Series lifecycle management for child components
 *
 * @example
 * ```typescript
 * import {
 *   useChartApi,
 *   useChartWebSocket,
 *   useLazyLoading
 * } from '@lightweight-charts-pro/vue3';
 *
 * // In a Vue component's setup function
 * const api = useChartApi({ baseUrl: 'http://localhost:8000/api/charts' });
 * const ws = useChartWebSocket({ url: 'ws://localhost:8000/ws', chartId: 'my-chart' });
 * ```
 */

// -----------------------------------------------------------------------------
// REST API Composable
// -----------------------------------------------------------------------------

export {
  /** REST API client composable for chart data management */
  useChartApi,
  /** Return type of useChartApi containing state and methods */
  type UseChartApiReturn,
  /** Configuration options for useChartApi */
  type UseChartApiOptions,
} from "./useChartApi";

// -----------------------------------------------------------------------------
// WebSocket Composable
// -----------------------------------------------------------------------------

export {
  /** WebSocket client composable for real-time chart updates */
  useChartWebSocket,
  /** Return type of useChartWebSocket containing state and methods */
  type UseChartWebSocketReturn,
} from "./useChartWebSocket";

// -----------------------------------------------------------------------------
// Lazy Loading Composable
// -----------------------------------------------------------------------------

export {
  /** Lazy loading composable for infinite scroll functionality */
  useLazyLoading,
  /** Return type of useLazyLoading containing state and methods */
  type UseLazyLoadingReturn,
  /** Configuration options for useLazyLoading */
  type UseLazyLoadingOptions,
} from "./useLazyLoading";

// -----------------------------------------------------------------------------
// Series Lifecycle Composable
// -----------------------------------------------------------------------------

export {
  /** Series lifecycle composable for managing series in child components */
  useSeries,
  /** Configuration options for useSeries */
  type UseSeriesOptions,
} from "./useSeries";
