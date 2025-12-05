[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / Annotation

# Interface: Annotation

Defined in: [src/types/chart.ts:342](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L342)

Configuration for a chart annotation.

Annotations are visual elements (text, arrows, shapes) placed at specific
time/price coordinates to highlight important chart features or events.

 Annotation

## Example

```typescript
const buySignal: Annotation = {
  time: 1609459200,
  price: 100.00,
  text: 'Buy Signal',
  type: 'arrow',
  position: 'belowBar',
  color: '#26a69a',
  tooltip: 'RSI oversold + MACD bullish crossover'
};
```

## Properties

### backgroundColor?

> `optional` **backgroundColor**: `string`

Defined in: [src/types/chart.ts:383](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L383)

Background color for text annotations.
Improves readability against the chart.

***

### color?

> `optional` **color**: `string`

Defined in: [src/types/chart.ts:377](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L377)

Primary color for the annotation (text or shape fill).
Can be any valid CSS color string.

***

### fontSize?

> `optional` **fontSize**: `number`

Defined in: [src/types/chart.ts:389](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L389)

Font size in pixels for text annotations.
Default is typically 12px.

***

### position?

> `optional` **position**: `"aboveBar"` \| `"belowBar"` \| `"inBar"`

Defined in: [src/types/chart.ts:371](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L371)

Position relative to the price bar.
'aboveBar' = above the high, 'belowBar' = below the low.

***

### price

> **price**: `number`

Defined in: [src/types/chart.ts:353](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L353)

Price level for the annotation position.
Determines vertical placement on the chart.

***

### text

> **text**: `string`

Defined in: [src/types/chart.ts:359](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L359)

Text content of the annotation.
Displayed as the label or tooltip content.

***

### time

> **time**: `string` \| `number`

Defined in: [src/types/chart.ts:347](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L347)

Timestamp for the annotation position.
Can be Unix timestamp (seconds) or ISO 8601 string.

***

### tooltip?

> `optional` **tooltip**: `string`

Defined in: [src/types/chart.ts:395](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L395)

Additional text shown on hover.
Useful for providing context without cluttering the chart.

***

### type?

> `optional` **type**: `"text"` \| `"arrow"` \| `"shape"` \| `"line"` \| `"rectangle"` \| `"circle"`

Defined in: [src/types/chart.ts:365](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L365)

Type of annotation to render.
Determines the visual appearance and behavior.
