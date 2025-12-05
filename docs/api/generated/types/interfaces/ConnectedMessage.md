[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / ConnectedMessage

# Interface: ConnectedMessage

Defined in: [src/types/websocket.ts:100](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L100)

Server acknowledgment of successful WebSocket connection.

Sent by the server immediately after a client connects,
confirming the connection is established and ready for data.

 ConnectedMessage

## Extends

- [`BaseMessage`](BaseMessage.md)

## Properties

### chartId

> **chartId**: `string`

Defined in: [src/types/websocket.ts:105](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L105)

Chart identifier that the connection is associated with

#### Overrides

[`BaseMessage`](BaseMessage.md).[`chartId`](BaseMessage.md#chartid)

***

### type

> **type**: `"connected"`

Defined in: [src/types/websocket.ts:102](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L102)

Fixed type identifier for connection acknowledgment

#### Overrides

[`BaseMessage`](BaseMessage.md).[`type`](BaseMessage.md#type)
