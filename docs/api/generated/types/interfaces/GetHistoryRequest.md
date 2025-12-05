[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / GetHistoryRequest

# Interface: GetHistoryRequest

Defined in: [src/types/api.ts:285](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L285)

Request parameters for fetching historical data with pagination.

Supports both backward (before) and forward (after) pagination
for implementing infinite scroll functionality.

 GetHistoryRequest

## Example

```typescript
// Get 500 bars before a specific timestamp
const request: GetHistoryRequest = {
  paneId: 0,
  seriesId: 'price',
  beforeTime: 1609459200,
  direction: 'before',
  count: 500
};
```

## Properties

### afterTime?

> `optional` **afterTime**: `number`

Defined in: [src/types/api.ts:308](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L308)

Get data points with timestamps after this Unix timestamp.
Used for forward pagination (scrolling toward present/future).

***

### beforeTime?

> `optional` **beforeTime**: `number`

Defined in: [src/types/api.ts:302](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L302)

Get data points with timestamps before this Unix timestamp.
Used for backward pagination (scrolling into history).

***

### count?

> `optional` **count**: `number`

Defined in: [src/types/api.ts:320](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L320)

Maximum number of data points to return.
Default is 500. Higher values may impact performance.

***

### direction?

> `optional` **direction**: `"before"` \| `"after"`

Defined in: [src/types/api.ts:314](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L314)

Direction of pagination.
'before' = fetch older data, 'after' = fetch newer data.

***

### paneId

> **paneId**: `number`

Defined in: [src/types/api.ts:290](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L290)

Index of the pane containing the series.
Required to identify the correct series in multi-pane charts.

***

### seriesId

> **seriesId**: `string`

Defined in: [src/types/api.ts:296](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L296)

Unique identifier for the series within the pane.
Matches the seriesId used when creating the series.
