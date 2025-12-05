[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / ChunkedSeriesDataResponse

# Interface: ChunkedSeriesDataResponse

Defined in: [src/types/api.ts:396](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L396)

Response payload for series data that is paginated (chunked).

Used when datasets are too large to transfer in a single request.
Includes metadata for implementing pagination controls.

 ChunkedSeriesDataResponse

## Properties

### chunked

> **chunked**: `true`

Defined in: [src/types/api.ts:425](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L425)

Flag indicating this response is paginated.
Always `true` for chunked responses.

***

### chunkInfo

> **chunkInfo**: [`ChunkInfo`](ChunkInfo.md)

Defined in: [src/types/api.ts:431](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L431)

Metadata about this chunk's position in the full dataset.
Used for merging chunks and implementing pagination.

***

### data

> **data**: [`DataPoint`](DataPoint.md)[]

Defined in: [src/types/api.ts:413](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L413)

Subset of data points for the current chunk.
Sorted by time in ascending order.

***

### hasMoreAfter

> **hasMoreAfter**: `boolean`

Defined in: [src/types/api.ts:443](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L443)

Whether newer data exists after the end of this chunk.
If true, user can scroll/request more recent data.

***

### hasMoreBefore

> **hasMoreBefore**: `boolean`

Defined in: [src/types/api.ts:437](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L437)

Whether older data exists before the start of this chunk.
If true, user can scroll/request more historical data.

***

### options

> **options**: [`SeriesOptions`](SeriesOptions.md)

Defined in: [src/types/api.ts:419](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L419)

Visual configuration options for the series.
Same across all chunks for a given series.

***

### seriesId

> **seriesId**: `string`

Defined in: [src/types/api.ts:401](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L401)

Unique identifier for the series.
Matches the ID used in the request.

***

### seriesType

> **seriesType**: `string`

Defined in: [src/types/api.ts:407](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L407)

Type of the series (line, candlestick, area, etc.).
Indicates how to interpret the data points.

***

### totalCount

> **totalCount**: `number`

Defined in: [src/types/api.ts:449](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L449)

Total number of data points available in the full dataset.
May be larger than data.length for chunked responses.
