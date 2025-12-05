[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / GetHistoryResponse

# Interface: GetHistoryResponse

Defined in: [src/types/api.ts:476](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L476)

Response payload for historical data pagination requests.

Returned by the history endpoint when fetching additional data
beyond the initial load (for lazy loading / infinite scroll).

 GetHistoryResponse

## Properties

### chunkInfo

> **chunkInfo**: [`ChunkInfo`](ChunkInfo.md)

Defined in: [src/types/api.ts:493](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L493)

Metadata about this chunk's position in the full dataset.
Used for determining merge position and tracking pagination.

***

### data

> **data**: [`DataPoint`](DataPoint.md)[]

Defined in: [src/types/api.ts:487](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L487)

Array of historical data points.
Should be merged with existing data on the client side.

***

### hasMoreAfter

> **hasMoreAfter**: `boolean`

Defined in: [src/types/api.ts:505](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L505)

Whether newer data exists after this chunk.
If false, user has reached the end of available data.

***

### hasMoreBefore

> **hasMoreBefore**: `boolean`

Defined in: [src/types/api.ts:499](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L499)

Whether even older data exists before this chunk.
If false, user has reached the beginning of available history.

***

### seriesId

> **seriesId**: `string`

Defined in: [src/types/api.ts:481](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L481)

Unique identifier for the series.
Matches the ID used in the request.

***

### totalCount

> **totalCount**: `number`

Defined in: [src/types/api.ts:511](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L511)

Total number of data points available in the full dataset.
Useful for progress indicators or scroll position calculations.
