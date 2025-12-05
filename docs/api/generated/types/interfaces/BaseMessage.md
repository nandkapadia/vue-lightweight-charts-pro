[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / BaseMessage

# Interface: BaseMessage

Defined in: [src/types/websocket.ts:77](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L77)

Base interface for all WebSocket messages.

All messages must have a `type` field to identify the message kind.
The `chartId` field is optional but included in most messages.

 BaseMessage

## Extended by

- [`ConnectedMessage`](ConnectedMessage.md)
- [`PingMessage`](PingMessage.md)
- [`PongMessage`](PongMessage.md)
- [`GetInitialDataMessage`](GetInitialDataMessage.md)
- [`InitialDataResponseMessage`](InitialDataResponseMessage.md)
- [`RequestHistoryMessage`](RequestHistoryMessage.md)
- [`HistoryResponseMessage`](HistoryResponseMessage.md)
- [`DataUpdateMessage`](DataUpdateMessage.md)

## Properties

### chartId?

> `optional` **chartId**: `string`

Defined in: [src/types/websocket.ts:88](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L88)

Chart identifier this message relates to.
Optional for connection-level messages like ping/pong.

***

### type

> **type**: `string`

Defined in: [src/types/websocket.ts:82](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L82)

Identifier for the message type.
Used to route messages to appropriate handlers.
