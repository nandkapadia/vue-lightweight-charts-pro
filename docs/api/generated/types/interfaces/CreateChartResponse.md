[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / CreateChartResponse

# Interface: CreateChartResponse

Defined in: [src/types/api.ts:328](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L328)

Response payload when creating a new chart via the API.

 CreateChartResponse

## Properties

### chartId

> **chartId**: `string`

Defined in: [src/types/api.ts:333](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L333)

Unique identifier assigned to the created chart.
Use this ID for subsequent API calls to this chart.

***

### options

> **options**: `Record`\<`string`, `unknown`\>

Defined in: [src/types/api.ts:339](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L339)

Chart configuration options that were applied.
May differ from requested options due to server-side defaults.
