[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / ChartData

# Interface: ChartData

Defined in: [src/types/api.ts:564](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L564)

Complete chart data structure including all panes and their series.

Used when fetching or storing a complete chart state, such as when
restoring from a saved configuration or exporting chart data.

 ChartData

## Example

```typescript
const chartData: ChartData = {
  chartId: 'my-chart',
  panes: {
    '0': {  // Main pane
      'price': { seriesType: 'candlestick', data: [...], options: {...} },
      'sma20': { seriesType: 'line', data: [...], options: {...} }
    },
    '1': {  // Volume pane
      'volume': { seriesType: 'histogram', data: [...], options: {...} }
    }
  },
  options: { layout: { background: { color: '#1e1e1e' } } }
};
```

## Properties

### chartId

> **chartId**: `string`

Defined in: [src/types/api.ts:569](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L569)

Unique identifier for the chart.
Used to distinguish between multiple charts in the application.

***

### options

> **options**: `Record`\<`string`, `unknown`\>

Defined in: [src/types/api.ts:594](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L594)

Chart-level configuration options.
Includes layout, time scale, and cross-hair settings.

***

### panes

> **panes**: `Record`\<`string`, `Record`\<`string`, \{ `data`: [`DataPoint`](DataPoint.md)[]; `options`: [`SeriesOptions`](SeriesOptions.md); `seriesType`: `string`; \}\>\>

Defined in: [src/types/api.ts:575](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L575)

Nested object containing all panes and their series.
Structure: panes[paneId][seriesId] = { seriesType, data, options }
