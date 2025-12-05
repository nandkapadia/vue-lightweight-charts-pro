[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [utils](../README.md) / debounce

# Function: debounce()

> **debounce**\<`T`\>(`fn`, `delay`): (...`args`) => `void`

Defined in: [src/utils/index.ts:240](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/utils/index.ts#L240)

Create a debounced version of a function.

The debounced function delays invoking the original function until
after `delay` milliseconds have elapsed since the last call. Useful
for limiting expensive operations triggered by rapid events like
typing, resizing, or scrolling.

## Type Parameters

### T

`T` *extends* (...`args`) => `unknown`

Function type

## Parameters

### fn

`T`

Function to debounce

### delay

`number`

Delay in milliseconds before invoking

## Returns

Debounced function with same parameters

> (...`args`): `void`

### Parameters

#### args

...`Parameters`\<`T`\>

### Returns

`void`

## Example

```typescript
// Debounce search input handler
const handleSearch = debounce((query: string) => {
  fetchResults(query);
}, 300);

// Called on every keystroke, but fetchResults only runs
// 300ms after user stops typing
inputElement.addEventListener('input', (e) => {
  handleSearch(e.target.value);
});
```
