[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / ChunkInfo

# Interface: ChunkInfo

Defined in: [src/types/api.ts:44](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L44)

Metadata about a paginated data chunk.

When datasets are too large to transfer in a single request, the API returns
data in chunks. This interface provides information about where the current
chunk fits within the complete dataset.

 ChunkInfo

## Example

```typescript
const chunkInfo: ChunkInfo = {
  startIndex: 0,
  endIndex: 499,
  startTime: 1609459200,  // 2021-01-01 00:00:00 UTC
  endTime: 1609545600,    // 2021-01-02 00:00:00 UTC
  count: 500
};
```

## Properties

### count

> **count**: `number`

Defined in: [src/types/api.ts:73](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L73)

Total number of data points contained in this chunk.
Should equal (endIndex - startIndex + 1).

***

### endIndex

> **endIndex**: `number`

Defined in: [src/types/api.ts:55](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L55)

Zero-based index of the last data point in this chunk within the full dataset.
The range is inclusive: [startIndex, endIndex].

***

### endTime

> **endTime**: `number`

Defined in: [src/types/api.ts:67](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L67)

Unix timestamp (in seconds) of the last data point in this chunk.
Used to determine if more data exists beyond this range.

***

### startIndex

> **startIndex**: `number`

Defined in: [src/types/api.ts:49](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L49)

Zero-based index of the first data point in this chunk within the full dataset.
Used to calculate position when merging chunks.

***

### startTime

> **startTime**: `number`

Defined in: [src/types/api.ts:61](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L61)

Unix timestamp (in seconds) of the first data point in this chunk.
Used for time-based pagination and range queries.
