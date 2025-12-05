[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [composables](../README.md) / UseChartApiOptions

# Interface: UseChartApiOptions

Defined in: [src/composables/useChartApi.ts:116](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/composables/useChartApi.ts#L116)

Options for the useChartApi composable.

## Properties

### baseUrl?

> `optional` **baseUrl**: `string`

Defined in: [src/composables/useChartApi.ts:118](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/composables/useChartApi.ts#L118)

Base URL for the API (default: '/api/charts')

***

### fetchFn()?

> `optional` **fetchFn**: \{(`input`, `init?`): `Promise`\<`Response`\>; (`input`, `init?`): `Promise`\<`Response`\>; \}

Defined in: [src/composables/useChartApi.ts:122](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/composables/useChartApi.ts#L122)

Custom fetch implementation for testing

#### Call Signature

> (`input`, `init?`): `Promise`\<`Response`\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/fetch)

##### Parameters

###### input

`RequestInfo` | `URL`

###### init?

`RequestInit`

##### Returns

`Promise`\<`Response`\>

#### Call Signature

> (`input`, `init?`): `Promise`\<`Response`\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/fetch)

##### Parameters

###### input

`string` | `Request` | `URL`

###### init?

`RequestInit`

##### Returns

`Promise`\<`Response`\>

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [src/composables/useChartApi.ts:120](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/composables/useChartApi.ts#L120)

Request timeout in milliseconds (default: 30000)
