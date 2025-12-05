[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / SetSeriesDataResponse

# Interface: SetSeriesDataResponse

Defined in: [src/types/api.ts:519](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L519)

Response payload confirming series data was successfully saved.

 SetSeriesDataResponse

## Properties

### count

> **count**: `number`

Defined in: [src/types/api.ts:536](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L536)

Number of data points that were stored.
Useful for verification and debugging.

***

### seriesId

> **seriesId**: `string`

Defined in: [src/types/api.ts:524](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L524)

Unique identifier for the series that was updated.
Can be used to verify the correct series was modified.

***

### seriesType

> **seriesType**: `string`

Defined in: [src/types/api.ts:530](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L530)

Type of the series that was updated.
Confirms the series type matches expectations.
