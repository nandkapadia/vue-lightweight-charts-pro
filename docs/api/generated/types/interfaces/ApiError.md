[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / ApiError

# Interface: ApiError

Defined in: [src/types/api.ts:616](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L616)

Error response structure from the REST API.

Returned when API requests fail due to validation errors,
resource not found, or server errors.

 ApiError

## Example

```typescript
// Handle API errors
try {
  const response = await api.getSeriesData('chart-id', 0, 'price');
} catch (error) {
  const apiError = error as ApiError;
  console.error(`Error ${apiError.statusCode}: ${apiError.error}`);
}
```

## Properties

### detail?

> `optional` **detail**: `string`

Defined in: [src/types/api.ts:627](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L627)

Detailed error information (FastAPI validation error format).
May contain additional context about what went wrong.

***

### error

> **error**: `string`

Defined in: [src/types/api.ts:621](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L621)

Human-readable error message.
Suitable for display to users or logging.

***

### statusCode?

> `optional` **statusCode**: `number`

Defined in: [src/types/api.ts:633](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L633)

HTTP status code associated with the error.
Common values: 400 (bad request), 404 (not found), 500 (server error).
