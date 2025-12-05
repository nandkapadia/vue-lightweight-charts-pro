[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [utils](../README.md) / throttle

# Function: throttle()

> **throttle**\<`T`\>(`fn`, `limit`): (...`args`) => `void`

Defined in: [src/utils/index.ts:285](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/utils/index.ts#L285)

Create a throttled version of a function.

The throttled function invokes the original function at most once
per `limit` milliseconds. Unlike debounce, throttle ensures the
function is called periodically during sustained activity.

## Type Parameters

### T

`T` *extends* (...`args`) => `unknown`

Function type

## Parameters

### fn

`T`

Function to throttle

### limit

`number`

Minimum time between invocations in milliseconds

## Returns

Throttled function with same parameters

> (...`args`): `void`

### Parameters

#### args

...`Parameters`\<`T`\>

### Returns

`void`

## Example

```typescript
// Throttle scroll handler to run at most every 100ms
const handleScroll = throttle(() => {
  updateProgressIndicator();
}, 100);

// Called many times per second during scroll, but
// updateProgressIndicator runs at most 10 times/second
window.addEventListener('scroll', handleScroll);
```
