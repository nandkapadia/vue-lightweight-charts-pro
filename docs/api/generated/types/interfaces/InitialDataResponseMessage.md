[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / InitialDataResponseMessage

# Interface: InitialDataResponseMessage

Defined in: [src/types/websocket.ts:206](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L206)

Server response containing initial chart data.

Contains the complete current state of the requested chart,
including all panes, series data, and configuration options.

 InitialDataResponseMessage

## Example

```typescript
const response: InitialDataResponseMessage = {
  type: 'initial_data_response',
  chartId: 'my-chart',
  panes: {
    '0': {
      'price': {
        seriesType: 'candlestick',
        data: [{ time: 1609459200, open: 100, high: 105, low: 98, close: 103 }],
        options: { upColor: '#26a69a' }
      }
    }
  },
  options: { layout: { background: { color: '#1e1e1e' } } }
};
```

## Extends

- [`BaseMessage`](BaseMessage.md)

## Properties

### chartId

> **chartId**: `string`

Defined in: [src/types/websocket.ts:211](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L211)

Chart identifier this data belongs to

#### Overrides

[`BaseMessage`](BaseMessage.md).[`chartId`](BaseMessage.md#chartid)

***

### error?

> `optional` **error**: `string`

Defined in: [src/types/websocket.ts:243](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L243)

Error message if the request failed.
Present only when an error occurred server-side.

***

### options?

> `optional` **options**: `Record`\<`string`, `unknown`\>

Defined in: [src/types/websocket.ts:237](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L237)

Chart-level configuration options.
Applied to customize the chart appearance.

***

### panes?

> `optional` **panes**: `Record`\<`string`, `Record`\<`string`, \{ `data`: [`DataPoint`](DataPoint.md)[]; `options`: `Record`\<`string`, `unknown`\>; `seriesType`: `string`; \}\>\>

Defined in: [src/types/websocket.ts:218](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L218)

Nested structure containing all panes and their series.
Structure: panes[paneId][seriesId] = { seriesType, data, options }
May be undefined if only requesting a specific series.

***

### type

> **type**: `"initial_data_response"`

Defined in: [src/types/websocket.ts:208](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/websocket.ts#L208)

Fixed type identifier for initial data response

#### Overrides

[`BaseMessage`](BaseMessage.md).[`type`](BaseMessage.md#type)
