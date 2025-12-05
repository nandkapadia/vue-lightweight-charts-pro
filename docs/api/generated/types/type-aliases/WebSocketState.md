[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / WebSocketState

# Type Alias: WebSocketState

> **WebSocketState** = `"connecting"` \| `"connected"` \| `"disconnected"` \| `"error"`

Defined in: [src/types/websocket.ts:63](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L63)

Possible states of a WebSocket connection.

These states track the lifecycle of the WebSocket connection,
from initial connection attempt through to disconnection.

## Example

```typescript
const state: WebSocketState = 'connected';

switch (state) {
  case 'connecting':
    showLoadingIndicator();
    break;
  case 'connected':
    enableDataStreaming();
    break;
  case 'disconnected':
    attemptReconnection();
    break;
  case 'error':
    showErrorMessage();
    break;
}
```
