[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [composables](../README.md) / useLazyLoading

# Function: useLazyLoading()

> **useLazyLoading**(`options`): [`UseLazyLoadingReturn`](../type-aliases/UseLazyLoadingReturn.md)

Defined in: [src/composables/useLazyLoading.ts:196](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/composables/useLazyLoading.ts#L196)

Vue 3 composable for lazy loading chart data.

This composable subscribes to the chart's time scale changes and automatically
requests more data when the user scrolls near the boundaries of loaded data.

## Parameters

### options

[`UseLazyLoadingOptions`](../interfaces/UseLazyLoadingOptions.md)

Lazy loading configuration options

## Returns

[`UseLazyLoadingReturn`](../type-aliases/UseLazyLoadingReturn.md)

Lazy loading state and methods

## Example

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useLazyLoading, useChartApi } from '@lightweight-charts-pro/vue3';
import type { IChartApi } from 'lightweight-charts';

const chart = ref<IChartApi | null>(null);
const seriesConfigs = ref([
  {
    seriesId: 'price',
    seriesType: 'candlestick',
    data: [],
    lazyLoading: {
      enabled: true,
      chunkSize: 500,
      hasMoreBefore: true,
      hasMoreAfter: false,
    }
  }
]);

const { getHistory } = useChartApi();

const { isLoading, handleHistoryResponse } = useLazyLoading({
  chart,
  seriesConfigs,
  onRequestHistory: async (seriesId, paneId, beforeTime, direction, count) => {
    const response = await getHistory('my-chart', paneId, seriesId, beforeTime, count);
    handleHistoryResponse(seriesId, direction, response.hasMoreBefore, response.hasMoreAfter);
  }
});
</script>
```
