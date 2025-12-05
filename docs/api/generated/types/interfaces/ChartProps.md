[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / ChartProps

# Interface: ChartProps

Defined in: [src/types/chart.ts:963](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L963)

Props interface for the LightweightChart Vue component.

Defines all configurable properties that can be passed to the
main chart component via Vue props.

 ChartProps

## Example

```vue
<template>
  <LightweightChart
    chart-id="my-chart"
    api-url="http://localhost:8000/api"
    ws-url="ws://localhost:8000/ws/chart/my-chart"
    :options="chartOptions"
    :series="seriesConfigs"
    auto-connect
    @ready="onChartReady"
  />
</template>
```

## Properties

### annotations?

> `optional` **annotations**: [`Annotation`](Annotation.md)[]

Defined in: [src/types/chart.ts:998](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L998)

Chart-level annotations visible across all series.
These annotations are not tied to a specific series.

***

### apiUrl?

> `optional` **apiUrl**: `string`

Defined in: [src/types/chart.ts:974](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L974)

Base URL for the REST API backend.
Used for fetching series data and historical records.

***

### autoConnect?

> `optional` **autoConnect**: `boolean`

Defined in: [src/types/chart.ts:1004](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L1004)

Whether to automatically connect to WebSocket on mount.
When false, call ws.connect() manually to establish connection.

***

### chartId

> **chartId**: `string`

Defined in: [src/types/chart.ts:968](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L968)

Unique identifier for the chart instance.
Used for API calls, WebSocket subscriptions, and debugging.

***

### class?

> `optional` **class**: `string`

Defined in: [src/types/chart.ts:1010](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L1010)

CSS class to apply to the chart container element.
Useful for custom styling and layout.

***

### options?

> `optional` **options**: [`ChartOptions`](ChartOptions.md)

Defined in: [src/types/chart.ts:986](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L986)

Chart-level configuration options.
Controls layout, colors, scales, and other visual settings.

***

### series?

> `optional` **series**: [`SeriesConfig`](SeriesConfig.md)[]

Defined in: [src/types/chart.ts:992](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L992)

Initial series configurations to display.
Can be updated dynamically after chart creation.

***

### style?

> `optional` **style**: `Record`\<`string`, `string`\>

Defined in: [src/types/chart.ts:1016](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L1016)

Inline styles for the chart container element.
Object with CSS property names and values.

***

### wsUrl?

> `optional` **wsUrl**: `string`

Defined in: [src/types/chart.ts:980](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L980)

WebSocket URL for real-time data updates.
Connection is established when autoConnect is true.
