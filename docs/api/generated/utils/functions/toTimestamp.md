[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [utils](../README.md) / toTimestamp

# Function: toTimestamp()

> **toTimestamp**(`time`): `number`

Defined in: [src/utils/index.ts:58](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/utils/index.ts#L58)

Convert various time formats to a Unix timestamp in seconds.

Handles numbers, ISO date strings, and Date objects. Automatically
detects and converts millisecond timestamps to seconds.

## Parameters

### time

Time value in any supported format:
  - `number`: Unix timestamp (seconds or milliseconds)
  - `string`: Parseable date string (ISO 8601 recommended)
  - `Date`: JavaScript Date object

`string` | `number` | `Date`

## Returns

`number`

Unix timestamp in seconds, or 0 if parsing fails

## Example

```typescript
// From number (milliseconds detected and converted)
toTimestamp(1704067200000); // → 1704067200

// From string
toTimestamp('2024-01-01'); // → 1704067200

// From Date object
toTimestamp(new Date('2024-01-01')); // → 1704067200

// Invalid input returns 0
toTimestamp('invalid'); // → 0
```
