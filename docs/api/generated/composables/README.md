[**Vue Lightweight Charts Pro API**](../README.md)

***

[Vue Lightweight Charts Pro API](../README.md) / composables

# composables

## Fileoverview

Vue 3 composables for chart functionality.

This module exports all composable functions that provide reusable chart
functionality. Composables follow the Vue 3 Composition API pattern and
can be used in setup functions or other composables.

## Example

```typescript
import {
  useChartApi,
  useChartWebSocket,
  useLazyLoading
} from '@lightweight-charts-pro/vue3';

// In a Vue component's setup function
const api = useChartApi({ baseUrl: 'http://localhost:8000/api/charts' });
const ws = useChartWebSocket({ url: 'ws://localhost:8000/ws', chartId: 'my-chart' });
```

## Interfaces

- [UseChartApiOptions](interfaces/UseChartApiOptions.md)
- [UseLazyLoadingOptions](interfaces/UseLazyLoadingOptions.md)
- [UseSeriesOptions](interfaces/UseSeriesOptions.md)

## Type Aliases

- [UseChartApiReturn](type-aliases/UseChartApiReturn.md)
- [UseChartWebSocketReturn](type-aliases/UseChartWebSocketReturn.md)
- [UseLazyLoadingReturn](type-aliases/UseLazyLoadingReturn.md)

## Functions

- [useChartApi](functions/useChartApi.md)
- [useChartWebSocket](functions/useChartWebSocket.md)
- [useLazyLoading](functions/useLazyLoading.md)
- [useSeries](functions/useSeries.md)
