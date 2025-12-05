[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [utils](../README.md) / deepMerge

# Function: deepMerge()

> **deepMerge**\<`T`\>(`target`, `source`): `T`

Defined in: [src/utils/index.ts:166](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/utils/index.ts#L166)

Recursively merge two objects, combining nested properties.

Creates a new object with properties from both source objects.
Nested objects are merged recursively; arrays and primitives
from the source override the target.

## Type Parameters

### T

`T` *extends* `Record`\<`string`, `unknown`\>

Object type (must be a Record)

## Parameters

### target

`T`

Base object to merge into

### source

`Partial`\<`T`\>

Object with properties to merge

## Returns

`T`

New merged object (original objects unchanged)

## Example

```typescript
const defaults = {
  layout: { backgroundColor: '#fff', textColor: '#000' },
  timeScale: { visible: true }
};

const userConfig = {
  layout: { backgroundColor: '#1e1e1e' }
};

const merged = deepMerge(defaults, userConfig);
// Result:
// {
//   layout: { backgroundColor: '#1e1e1e', textColor: '#000' },
//   timeScale: { visible: true }
// }
```
