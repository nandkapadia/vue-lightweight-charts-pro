[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [utils](../README.md) / clamp

# Function: clamp()

> **clamp**(`value`, `min`, `max`): `number`

Defined in: [src/utils/index.ts:365](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/utils/index.ts#L365)

Clamp a numeric value to a specified range.

Ensures the value falls within [min, max] bounds, returning the boundary
value if the input exceeds the range.

## Parameters

### value

`number`

Value to clamp

### min

`number`

Minimum allowed value (inclusive)

### max

`number`

Maximum allowed value (inclusive)

## Returns

`number`

Clamped value within [min, max]

## Example

```typescript
clamp(5, 0, 10);   // → 5 (within range)
clamp(-5, 0, 10);  // → 0 (below min)
clamp(15, 0, 10);  // → 10 (above max)

// Useful for constraining chart zoom levels
const zoomLevel = clamp(userZoom, 0.5, 3.0);
```
