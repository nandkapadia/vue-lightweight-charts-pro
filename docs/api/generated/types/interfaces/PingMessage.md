[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / PingMessage

# Interface: PingMessage

Defined in: [src/types/websocket.ts:117](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L117)

Ping message for connection health monitoring.

Sent periodically by the client to verify the connection is alive.
Server responds with a PongMessage.

 PingMessage

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

### type

> **type**: `"ping"`

Defined in: [src/types/websocket.ts:119](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L119)

Fixed type identifier for ping request

#### Overrides

[`BaseMessage`](BaseMessage.md).[`type`](BaseMessage.md#type)
