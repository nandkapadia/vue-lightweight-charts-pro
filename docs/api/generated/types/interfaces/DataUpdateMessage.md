[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / DataUpdateMessage

# Interface: DataUpdateMessage

Defined in: [src/types/websocket.ts:415](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L415)

Real-time notification of data updates.

Sent by the server when new data is available for a series,
either due to real-time streaming or manual data updates.

 DataUpdateMessage

## Example

```typescript
// Notification with incremental data (preferred for performance)
const updateWithData: DataUpdateMessage = {
  type: 'data_update',
  chartId: 'my-chart',
  paneId: 0,
  seriesId: 'price',
  count: 1,
  data: [{ time: 1609459260, open: 103, high: 104, low: 102, close: 103.5 }]
};

// Notification without data (triggers REST fetch)
const updateNotification: DataUpdateMessage = {
  type: 'data_update',
  chartId: 'my-chart',
  paneId: 0,
  seriesId: 'price',
  count: 1
};
```

## Extends

- [`BaseMessage`](BaseMessage.md)

## Properties

### chartId

> **chartId**: `string`

Defined in: [src/types/websocket.ts:420](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L420)

Chart identifier this update belongs to

#### Overrides

[`BaseMessage`](BaseMessage.md).[`chartId`](BaseMessage.md#chartid)

***

### count

> **count**: `number`

Defined in: [src/types/websocket.ts:429](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L429)

Number of data points in the update

***

### data?

> `optional` **data**: [`DataPoint`](DataPoint.md)[]

Defined in: [src/types/websocket.ts:443](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L443)

Optional incremental data payload.

When present, the client can apply these data points directly
using the efficient update() method (O(m) instead of O(n)).

When absent, the client falls back to fetching via REST API,
which downloads the full dataset (backward compatibility mode).

For high-frequency data streams, including this field prevents
expensive full dataset downloads on every tick.

***

### paneId

> **paneId**: `number`

Defined in: [src/types/websocket.ts:423](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L423)

Index of the pane that received updates

***

### seriesId

> **seriesId**: `string`

Defined in: [src/types/websocket.ts:426](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L426)

Identifier for the series that was updated

***

### type

> **type**: `"data_update"`

Defined in: [src/types/websocket.ts:417](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L417)

Fixed type identifier for data update notification

#### Overrides

[`BaseMessage`](BaseMessage.md).[`type`](BaseMessage.md#type)
