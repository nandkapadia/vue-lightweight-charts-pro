[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [composables](../README.md) / UseLazyLoadingOptions

# Interface: UseLazyLoadingOptions

Defined in: [src/composables/useLazyLoading.ts:131](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/composables/useLazyLoading.ts#L131)

Options for the useLazyLoading composable.

## Properties

### chart

> **chart**: `Ref`\<`IChartApi` \| `null`\>

Defined in: [src/composables/useLazyLoading.ts:133](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/composables/useLazyLoading.ts#L133)

Chart API instance ref

***

### debounceMs?

> `optional` **debounceMs**: `number`

Defined in: [src/composables/useLazyLoading.ts:139](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/composables/useLazyLoading.ts#L139)

Debounce delay in milliseconds

***

### loadThreshold?

> `optional` **loadThreshold**: `number`

Defined in: [src/composables/useLazyLoading.ts:137](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/composables/useLazyLoading.ts#L137)

Threshold (in bars) to trigger loading more data

***

### onHistoryLoaded()?

> `optional` **onHistoryLoaded**: (`seriesId`, `data`) => `void`

Defined in: [src/composables/useLazyLoading.ts:149](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/composables/useLazyLoading.ts#L149)

Callback when history is loaded

#### Parameters

##### seriesId

`string`

##### data

[`DataPoint`](../../types/interfaces/DataPoint.md)[]

#### Returns

`void`

***

### onRequestHistory()

> **onRequestHistory**: (`seriesId`, `paneId`, `beforeTime`, `direction`, `count`) => `void`

Defined in: [src/composables/useLazyLoading.ts:141](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/composables/useLazyLoading.ts#L141)

Callback to request history from backend

#### Parameters

##### seriesId

`string`

##### paneId

`number`

##### beforeTime

`number`

##### direction

`"before"` | `"after"`

##### count

`number`

#### Returns

`void`

***

### seriesConfigs

> **seriesConfigs**: `Ref`\<[`SeriesConfig`](../../types/interfaces/SeriesConfig.md)[]\>

Defined in: [src/composables/useLazyLoading.ts:135](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/composables/useLazyLoading.ts#L135)

Series configurations ref
