[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / RequestHistoryMessage

# Interface: RequestHistoryMessage

Defined in: [src/types/websocket.ts:268](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L268)

Client request for historical data (pagination).

Used to fetch additional data beyond the initially loaded range,
supporting infinite scroll / lazy loading functionality.

 RequestHistoryMessage

## Example

```typescript
// Request 500 bars before the current first bar
const historyRequest: RequestHistoryMessage = {
  type: 'request_history',
  chartId: 'my-chart',
  paneId: 0,
  seriesId: 'price',
  beforeTime: 1609459200,  // Current first bar timestamp
  count: 500
};
```

## Extends

- [`BaseMessage`](BaseMessage.md)

## Properties

### afterTime?

> `optional` **afterTime**: `number`

Defined in: [src/types/websocket.ts:294](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L294)

Get data points with timestamps after this value.
Used for forward pagination (loading newer data).

***

### beforeTime?

> `optional` **beforeTime**: `number`

Defined in: [src/types/websocket.ts:288](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L288)

Get data points with timestamps before this value.
Used for backward pagination (loading older data).

***

### chartId?

> `optional` **chartId**: `string`

Defined in: [src/types/websocket.ts:88](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L88)

Chart identifier this message relates to.
Optional for connection-level messages like ping/pong.

#### Inherited from

[`BaseMessage`](BaseMessage.md).[`chartId`](BaseMessage.md#chartid)

***

### count?

> `optional` **count**: `number`

Defined in: [src/types/websocket.ts:300](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L300)

Maximum number of data points to return.
Server may return fewer if less data is available.

***

### paneId

> **paneId**: `number`

Defined in: [src/types/websocket.ts:276](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L276)

Index of the pane containing the target series.
Required to identify the correct series in multi-pane charts.

***

### seriesId

> **seriesId**: `string`

Defined in: [src/types/websocket.ts:282](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L282)

Identifier for the series to fetch history for.
Must match an existing series in the specified pane.

***

### type

> **type**: `"request_history"`

Defined in: [src/types/websocket.ts:270](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L270)

Fixed type identifier for history request

#### Overrides

[`BaseMessage`](BaseMessage.md).[`type`](BaseMessage.md#type)
