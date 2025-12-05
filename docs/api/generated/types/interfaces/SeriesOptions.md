[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / SeriesOptions

# Interface: SeriesOptions

Defined in: [src/types/api.ts:177](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L177)

Configuration options for visual appearance and behavior of a chart series.

These options are passed to the lightweight-charts library when creating
or updating a series. Not all options apply to all series types.

 SeriesOptions

## Example

```typescript
const lineOptions: SeriesOptions = {
  color: '#2196F3',
  lineWidth: 2,
  priceLineVisible: true,
  title: 'SMA 20'
};

const candleOptions: SeriesOptions = {
  upColor: '#26a69a',
  downColor: '#ef5350',
  priceScaleId: 'right'
};
```

## Indexable

\[`key`: `string`\]: `unknown`

Index signature allowing additional series-specific options.
Different series types support different additional options.

## Properties

### color?

> `optional` **color**: `string`

Defined in: [src/types/api.ts:182](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L182)

Primary color for the series.
For candlesticks, use `upColor` and `downColor` instead.

***

### lineStyle?

> `optional` **lineStyle**: `number`

Defined in: [src/types/api.ts:194](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L194)

Style of the line (solid, dashed, dotted).
Uses LineStyle enum values: 0=Solid, 1=Dotted, 2=Dashed, 3=LargeDashed.

***

### lineWidth?

> `optional` **lineWidth**: `number`

Defined in: [src/types/api.ts:188](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L188)

Width of the line in pixels (for line-based series).
Common values: 1 (thin), 2 (normal), 3 (thick).

***

### priceLineVisible?

> `optional` **priceLineVisible**: `boolean`

Defined in: [src/types/api.ts:206](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L206)

Whether to show a horizontal line at the current price level.
Useful for highlighting the latest value.

***

### priceScaleId?

> `optional` **priceScaleId**: `string`

Defined in: [src/types/api.ts:200](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L200)

ID of the price scale to use ('left', 'right', or custom ID).
Allows multiple series to share or have separate price scales.

***

### title?

> `optional` **title**: `string`

Defined in: [src/types/api.ts:212](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L212)

Display title for the series, shown in legends and tooltips.
Should be short and descriptive (e.g., 'AAPL', 'SMA 20', 'Volume').
