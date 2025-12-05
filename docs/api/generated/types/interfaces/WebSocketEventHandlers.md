[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / WebSocketEventHandlers

# Interface: WebSocketEventHandlers

Defined in: [src/types/websocket.ts:517](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L517)

Event handler callbacks for WebSocket connection events.

These callbacks allow consumers to react to WebSocket lifecycle events
and incoming data messages.

 WebSocketEventHandlers

## Example

```typescript
const handlers: WebSocketEventHandlers = {
  onConnected: (chartId) => console.log('Connected:', chartId),
  onDisconnected: () => console.log('Disconnected'),
  onError: (error) => console.error('WebSocket error:', error),
  onInitialData: (data) => initializeChart(data),
  onHistoryResponse: (data) => mergeHistory(data),
  onDataUpdate: (data) => updateSeries(data)
};
```

## Properties

### onConnected()?

> `optional` **onConnected**: (`chartId`) => `void`

Defined in: [src/types/websocket.ts:522](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L522)

Called when the WebSocket connection is successfully established.

#### Parameters

##### chartId

`string`

The chart identifier from the connection acknowledgment

#### Returns

`void`

***

### onDataUpdate()?

> `optional` **onDataUpdate**: (`data`) => `void`

Defined in: [src/types/websocket.ts:552](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L552)

Called when a data update notification is received.

#### Parameters

##### data

[`DataUpdateMessage`](DataUpdateMessage.md)

Update notification with optional incremental data payload

#### Returns

`void`

***

### onDisconnected()?

> `optional` **onDisconnected**: () => `void`

Defined in: [src/types/websocket.ts:528](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L528)

Called when the WebSocket connection is closed.
May be due to normal closure, network issues, or server shutdown.

#### Returns

`void`

***

### onError()?

> `optional` **onError**: (`error`) => `void`

Defined in: [src/types/websocket.ts:534](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L534)

Called when a WebSocket error occurs.

#### Parameters

##### error

`Error`

Error object with details about what went wrong

#### Returns

`void`

***

### onHistoryResponse()?

> `optional` **onHistoryResponse**: (`data`) => `void`

Defined in: [src/types/websocket.ts:546](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L546)

Called when historical data is received in response to a pagination request.

#### Parameters

##### data

[`HistoryResponseMessage`](HistoryResponseMessage.md)

History response with data chunk and pagination metadata

#### Returns

`void`

***

### onInitialData()?

> `optional` **onInitialData**: (`data`) => `void`

Defined in: [src/types/websocket.ts:540](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L540)

Called when initial chart data is received from the server.

#### Parameters

##### data

[`InitialDataResponseMessage`](InitialDataResponseMessage.md)

Complete initial data response including all panes/series

#### Returns

`void`
