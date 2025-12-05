[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / DataPoint

# Interface: DataPoint

Defined in: [src/types/api.ts:108](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L108)

A single data point in a chart series.

This is a flexible interface that supports multiple series types:
- Line/Area series: Use `time` and `value`
- OHLC series (Bar/Candlestick): Use `time`, `open`, `high`, `low`, `close`
- Custom series: May include additional fields via the index signature

 DataPoint

## Example

```typescript
// Line series data point
const linePoint: DataPoint = { time: 1609459200, value: 100.5 };

// Candlestick series data point
const ohlcPoint: DataPoint = {
  time: 1609459200,
  open: 100,
  high: 105,
  low: 98,
  close: 103
};

// With custom fields (e.g., volume)
const volumePoint: DataPoint = {
  time: 1609459200,
  value: 1500000,
  color: '#26a69a'  // Custom color for this bar
};
```

## Indexable

\[`key`: `string`\]: `unknown`

Index signature allowing additional custom fields.
Useful for per-bar colors, volume data, or other custom attributes.

## Properties

### close?

> `optional` **close**: `number`

Defined in: [src/types/api.ts:144](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L144)

Closing price for OHLC series (Bar, Candlestick).
Required for candlestick/bar charts, ignored for other types.

***

### high?

> `optional` **high**: `number`

Defined in: [src/types/api.ts:132](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L132)

Highest price for OHLC series (Bar, Candlestick).
Required for candlestick/bar charts, ignored for other types.

***

### low?

> `optional` **low**: `number`

Defined in: [src/types/api.ts:138](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L138)

Lowest price for OHLC series (Bar, Candlestick).
Required for candlestick/bar charts, ignored for other types.

***

### open?

> `optional` **open**: `number`

Defined in: [src/types/api.ts:126](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L126)

Opening price for OHLC series (Bar, Candlestick).
Required for candlestick/bar charts, ignored for other types.

***

### time

> **time**: `string` \| `number`

Defined in: [src/types/api.ts:114](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L114)

Timestamp for this data point.
Accepts Unix timestamp in seconds (number) or ISO 8601 date string.
All times are normalized to Unix seconds internally.

***

### value?

> `optional` **value**: `number`

Defined in: [src/types/api.ts:120](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L120)

Value for single-value series (Line, Area, Histogram).
Optional - not used by OHLC series types.
