[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [composables](../README.md) / useChartApi

# Function: useChartApi()

> **useChartApi**(`options`): [`UseChartApiReturn`](../type-aliases/UseChartApiReturn.md)

Defined in: [src/composables/useChartApi.ts:151](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/composables/useChartApi.ts#L151)

Vue 3 composable for interacting with the chart REST API.

## Parameters

### options

[`UseChartApiOptions`](../interfaces/UseChartApiOptions.md) = `{}`

Configuration options

## Returns

[`UseChartApiReturn`](../type-aliases/UseChartApiReturn.md)

API state and methods

## Example

```vue
<script setup lang="ts">
import { useChartApi } from '@lightweight-charts-pro/vue3';

const { isLoading, error, getChart, setSeriesData } = useChartApi({
  baseUrl: 'http://localhost:8000/api/charts'
});

// Load chart data
const chartData = await getChart('my-chart');

// Update series data
await setSeriesData('my-chart', 'price', {
  seriesType: 'candlestick',
  data: [{ time: 1234567890, open: 100, high: 105, low: 98, close: 102 }]
});
</script>
```
