[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / SeriesDataResponse

# Interface: SeriesDataResponse

Defined in: [src/types/api.ts:350](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L350)

Response payload for series data that fits in a single response (non-chunked).

Used when the dataset is small enough to transfer completely in one request.
For larger datasets, see [ChunkedSeriesDataResponse](ChunkedSeriesDataResponse.md).

 SeriesDataResponse

## Properties

### chunked

> **chunked**: `false`

Defined in: [src/types/api.ts:379](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L379)

Flag indicating this response contains the complete dataset.
Always `false` for non-chunked responses.

***

### data

> **data**: [`DataPoint`](DataPoint.md)[]

Defined in: [src/types/api.ts:367](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L367)

Complete array of data points for the series.
Sorted by time in ascending order.

***

### options

> **options**: [`SeriesOptions`](SeriesOptions.md)

Defined in: [src/types/api.ts:373](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L373)

Visual configuration options for the series.
Includes colors, line styles, and other display settings.

***

### seriesId

> **seriesId**: `string`

Defined in: [src/types/api.ts:355](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L355)

Unique identifier for the series.
Matches the ID used in the request.

***

### seriesType

> **seriesType**: `string`

Defined in: [src/types/api.ts:361](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L361)

Type of the series (line, candlestick, area, etc.).
Indicates how to interpret the data points.

***

### totalCount

> **totalCount**: `number`

Defined in: [src/types/api.ts:385](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L385)

Total number of data points in the series.
Should equal data.length for non-chunked responses.
