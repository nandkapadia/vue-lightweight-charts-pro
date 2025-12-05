[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / GetSeriesDataResponse

# Type Alias: GetSeriesDataResponse

> **GetSeriesDataResponse** = [`SeriesDataResponse`](../interfaces/SeriesDataResponse.md) \| [`ChunkedSeriesDataResponse`](../interfaces/ChunkedSeriesDataResponse.md)

Defined in: [src/types/api.ts:466](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L466)

Union type for series data responses, handling both chunked and non-chunked cases.

Use type guards to determine which response type you received:
```typescript
if (response.chunked) {
  // Handle chunked response with pagination
} else {
  // Handle complete data response
}
```
