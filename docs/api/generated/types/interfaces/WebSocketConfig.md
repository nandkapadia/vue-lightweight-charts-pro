[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / WebSocketConfig

# Interface: WebSocketConfig

Defined in: [src/types/websocket.ts:578](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L578)

Configuration options for WebSocket connection management.

Controls the WebSocket URL, chart association, reconnection behavior,
and health monitoring settings.

 WebSocketConfig

## Example

```typescript
const config: WebSocketConfig = {
  url: 'ws://localhost:8000/ws/chart/my-chart',
  chartId: 'my-chart',
  reconnect: {
    enabled: true,
    maxAttempts: 5,
    baseDelay: 1000,   // Start with 1 second delay
    maxDelay: 30000    // Cap at 30 seconds
  },
  pingInterval: 30000  // Ping every 30 seconds
};
```

## Properties

### chartId

> **chartId**: `string`

Defined in: [src/types/websocket.ts:589](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L589)

Chart identifier to associate with this connection.
Used in messages and for routing data to correct chart.

***

### pingInterval?

> `optional` **pingInterval**: `number`

Defined in: [src/types/websocket.ts:630](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L630)

Interval for sending ping messages in milliseconds.
Used to detect dead connections and keep the connection alive.
Set to 0 to disable ping/pong health checks.
Default: 30000 (30 seconds)

***

### reconnect?

> `optional` **reconnect**: `object`

Defined in: [src/types/websocket.ts:595](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L595)

Reconnection behavior configuration.
Controls automatic reconnection attempts after connection loss.

#### baseDelay?

> `optional` **baseDelay**: `number`

Initial delay between reconnection attempts in milliseconds.
Subsequent attempts use exponential backoff from this base.
Default: 1000 (1 second)

#### enabled

> **enabled**: `boolean`

Whether to automatically attempt reconnection after disconnection.
When false, reconnection must be triggered manually.

#### maxAttempts?

> `optional` **maxAttempts**: `number`

Maximum number of consecutive reconnection attempts.
After this many failures, reconnection is abandoned.
Default: 5

#### maxDelay?

> `optional` **maxDelay**: `number`

Maximum delay between reconnection attempts in milliseconds.
Caps the exponential backoff to prevent very long waits.
Default: 30000 (30 seconds)

***

### url

> **url**: `string`

Defined in: [src/types/websocket.ts:583](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L583)

Full WebSocket server URL including protocol and path.
Example: 'ws://localhost:8000/ws/chart/my-chart' or 'wss://...'
