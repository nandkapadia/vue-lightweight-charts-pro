[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / GetInitialDataMessage

# Interface: GetInitialDataMessage

Defined in: [src/types/websocket.ts:162](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L162)

Client request for initial chart data.

Sent after connection to request the current state of a chart,
including all series data and configuration options.

 GetInitialDataMessage

## Example

```typescript
// Request all data for the chart
const request: GetInitialDataMessage = {
  type: 'get_initial_data',
  chartId: 'my-chart'
};

// Request specific pane/series
const filteredRequest: GetInitialDataMessage = {
  type: 'get_initial_data',
  chartId: 'my-chart',
  paneId: 0,
  seriesId: 'price'
};
```

## Extends

- [`BaseMessage`](BaseMessage.md)

## Properties

### chartId?

> `optional` **chartId**: `string`

Defined in: [src/types/websocket.ts:88](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L88)

Chart identifier this message relates to.
Optional for connection-level messages like ping/pong.

#### Inherited from

[`BaseMessage`](BaseMessage.md).[`chartId`](BaseMessage.md#chartid)

***

### paneId?

> `optional` **paneId**: `number`

Defined in: [src/types/websocket.ts:170](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L170)

Optional pane filter.
If specified, only returns data for this pane.

***

### seriesId?

> `optional` **seriesId**: `string`

Defined in: [src/types/websocket.ts:176](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L176)

Optional series filter.
If specified, only returns data for this series.

***

### type

> **type**: `"get_initial_data"`

Defined in: [src/types/websocket.ts:164](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L164)

Fixed type identifier for initial data request

#### Overrides

[`BaseMessage`](BaseMessage.md).[`type`](BaseMessage.md#type)
