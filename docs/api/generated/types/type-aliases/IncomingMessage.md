[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / IncomingMessage

# Type Alias: IncomingMessage

> **IncomingMessage** = [`ConnectedMessage`](../interfaces/ConnectedMessage.md) \| [`PongMessage`](../interfaces/PongMessage.md) \| [`InitialDataResponseMessage`](../interfaces/InitialDataResponseMessage.md) \| [`HistoryResponseMessage`](../interfaces/HistoryResponseMessage.md) \| [`DataUpdateMessage`](../interfaces/DataUpdateMessage.md)

Defined in: [src/types/websocket.ts:478](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L478)

Union type of all messages that can be received from the server.

Use type guards or switch statements on the `type` field to handle
different message types appropriately.

## Example

```typescript
function handleMessage(message: IncomingMessage) {
  switch (message.type) {
    case 'connected':
      console.log('Connected to chart:', message.chartId);
      break;
    case 'pong':
      // Connection health confirmed
      break;
    case 'initial_data_response':
      applyInitialData(message.panes, message.options);
      break;
    case 'history_response':
      mergeHistoryData(message.data, message.direction);
      break;
    case 'data_update':
      updateSeries(message.seriesId, message.data);
      break;
  }
}
```
