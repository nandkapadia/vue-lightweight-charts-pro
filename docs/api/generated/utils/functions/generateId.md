[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [utils](../README.md) / generateId

# Function: generateId()

> **generateId**(`prefix`): `string`

Defined in: [src/utils/index.ts:336](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/utils/index.ts#L336)

Generate a unique identifier string.

Creates IDs using a combination of timestamp and random characters.
Suitable for temporary client-side IDs; not cryptographically secure.

## Parameters

### prefix

`string` = `"id"`

Optional prefix for the ID (default: 'id')

## Returns

`string`

Unique identifier string in format `{prefix}_{timestamp}_{random}`

## Example

```typescript
generateId();          // "id_1704067200000_a1b2c3d4e"
generateId('series');  // "series_1704067200000_f5g6h7i8j"
generateId('marker');  // "marker_1704067200000_k9l0m1n2o"
```
