[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [utils](../README.md) / formatTimestamp

# Function: formatTimestamp()

> **formatTimestamp**(`timestamp`, `format`): `string`

Defined in: [src/utils/index.ts:111](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/utils/index.ts#L111)

Format a Unix timestamp for human-readable display.

Uses the browser's locale settings for formatting.

## Parameters

### timestamp

`number`

Unix timestamp in seconds

### format

Output format type:
  - `'date'`: Date only (e.g., "1/1/2024")
  - `'datetime'`: Date and time (e.g., "1/1/2024, 12:00:00 PM")
  - `'time'`: Time only (e.g., "12:00:00 PM")

`"date"` | `"datetime"` | `"time"`

## Returns

`string`

Formatted date/time string according to browser locale

## Example

```typescript
const timestamp = 1704067200; // 2024-01-01 00:00:00 UTC

formatTimestamp(timestamp, 'date');     // "1/1/2024" (US locale)
formatTimestamp(timestamp, 'datetime'); // "1/1/2024, 12:00:00 AM"
formatTimestamp(timestamp, 'time');     // "12:00:00 AM"
```
