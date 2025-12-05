[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / PongMessage

# Interface: PongMessage

Defined in: [src/types/websocket.ts:131](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L131)

Pong response to a ping request.

Sent by the server in response to a PingMessage,
confirming the connection is still active.

 PongMessage

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

> **type**: `"pong"`

Defined in: [src/types/websocket.ts:133](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L133)

Fixed type identifier for pong response

#### Overrides

[`BaseMessage`](BaseMessage.md).[`type`](BaseMessage.md#type)
