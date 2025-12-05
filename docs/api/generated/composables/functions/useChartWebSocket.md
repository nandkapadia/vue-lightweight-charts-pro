[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [composables](../README.md) / useChartWebSocket

# Function: useChartWebSocket()

> **useChartWebSocket**(`config`, `handlers`): [`UseChartWebSocketReturn`](../type-aliases/UseChartWebSocketReturn.md)

Defined in: [src/composables/useChartWebSocket.ts:172](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/composables/useChartWebSocket.ts#L172)

Vue 3 composable for WebSocket communication with the chart backend.

## Parameters

### config

[`WebSocketConfig`](../../types/interfaces/WebSocketConfig.md)

WebSocket configuration

### handlers

[`WebSocketEventHandlers`](../../types/interfaces/WebSocketEventHandlers.md) = `{}`

Event handlers for WebSocket events

## Returns

[`UseChartWebSocketReturn`](../type-aliases/UseChartWebSocketReturn.md)

WebSocket state and methods

## Example

```vue
<script setup lang="ts">
import { useChartWebSocket } from '@lightweight-charts-pro/vue3';

const { state, isConnected, connect, disconnect, requestHistory } = useChartWebSocket(
  {
    url: 'ws://localhost:8000/ws',
    chartId: 'my-chart',
  },
  {
    onHistoryResponse: (data) => {
      console.log('History received:', data);
    },
    onDataUpdate: (data) => {
      console.log('Data updated:', data);
    },
  }
);

// Connect on mount
connect();
</script>
```
