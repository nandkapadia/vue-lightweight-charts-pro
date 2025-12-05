[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / SetSeriesDataRequest

# Interface: SetSeriesDataRequest

Defined in: [src/types/api.ts:239](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L239)

Request payload for setting or updating series data via the REST API.

 SetSeriesDataRequest

## Example

```typescript
const request: SetSeriesDataRequest = {
  paneId: 0,
  seriesType: 'candlestick',
  data: [
    { time: 1609459200, open: 100, high: 105, low: 98, close: 103 },
    { time: 1609545600, open: 103, high: 108, low: 101, close: 106 }
  ],
  options: { upColor: '#26a69a', downColor: '#ef5350' }
};
```

## Properties

### data

> **data**: [`DataPoint`](DataPoint.md)[]

Defined in: [src/types/api.ts:256](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L256)

Array of data points for the series.
Data should be sorted by time in ascending order.

***

### options?

> `optional` **options**: [`SeriesOptions`](SeriesOptions.md)

Defined in: [src/types/api.ts:262](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L262)

Optional configuration for the series appearance.
Will be merged with existing options if updating.

***

### paneId?

> `optional` **paneId**: `number`

Defined in: [src/types/api.ts:244](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L244)

Index of the pane to add the series to.
Default is 0 (main pane). Use higher numbers for indicator panes.

***

### seriesType

> **seriesType**: `string`

Defined in: [src/types/api.ts:250](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L250)

Type of series to create or update.
Must be a valid SeriesType or CustomSeriesType value.
