[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / HistoryResponseMessage

# Interface: HistoryResponseMessage

Defined in: [src/types/websocket.ts:328](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L328)

Server response containing requested historical data.

Contains the paginated data chunk along with metadata about
the chunk's position in the full dataset and pagination flags.

 HistoryResponseMessage

## Example

```typescript
const historyResponse: HistoryResponseMessage = {
  type: 'history_response',
  chartId: 'my-chart',
  paneId: 0,
  seriesId: 'price',
  data: [{ time: 1609372800, open: 98, high: 100, low: 95, close: 99 }],
  chunkInfo: { startIndex: 0, endIndex: 499, startTime: 1609372800, ... },
  hasMoreBefore: true,
  hasMoreAfter: false,
  totalCount: 10000,
  direction: 'before'
};
```

## Extends

- [`BaseMessage`](BaseMessage.md)

## Properties

### chartId

> **chartId**: `string`

Defined in: [src/types/websocket.ts:333](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L333)

Chart identifier this data belongs to

#### Overrides

[`BaseMessage`](BaseMessage.md).[`chartId`](BaseMessage.md#chartid)

***

### chunkInfo

> **chunkInfo**: [`ChunkInfo`](ChunkInfo.md)

Defined in: [src/types/websocket.ts:351](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L351)

Metadata about this chunk's position in the full dataset.
Used for tracking pagination state and merging data.

***

### data

> **data**: [`DataPoint`](DataPoint.md)[]

Defined in: [src/types/websocket.ts:345](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L345)

Array of historical data points.
Sorted by time in ascending order.

***

### direction?

> `optional` **direction**: `"before"` \| `"after"`

Defined in: [src/types/websocket.ts:375](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L375)

Direction of the original request ('before' or 'after').
Used to correctly merge data on the client side.

***

### error?

> `optional` **error**: `string`

Defined in: [src/types/websocket.ts:381](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L381)

Error message if the request failed.
Present only when an error occurred server-side.

***

### hasMoreAfter

> **hasMoreAfter**: `boolean`

Defined in: [src/types/websocket.ts:363](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L363)

Whether newer data exists after this chunk.
If false, user has reached the end of available data.

***

### hasMoreBefore

> **hasMoreBefore**: `boolean`

Defined in: [src/types/websocket.ts:357](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L357)

Whether older data exists before this chunk.
If false, user has reached the beginning of available history.

***

### paneId

> **paneId**: `number`

Defined in: [src/types/websocket.ts:336](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L336)

Index of the pane containing this series

***

### seriesId

> **seriesId**: `string`

Defined in: [src/types/websocket.ts:339](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L339)

Identifier for the series this data belongs to

***

### totalCount

> **totalCount**: `number`

Defined in: [src/types/websocket.ts:369](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L369)

Total number of data points available in the full dataset.
Useful for progress indicators or scroll calculations.

***

### type

> **type**: `"history_response"`

Defined in: [src/types/websocket.ts:330](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L330)

Fixed type identifier for history response

#### Overrides

[`BaseMessage`](BaseMessage.md).[`type`](BaseMessage.md#type)
