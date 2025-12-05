[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / PriceScaleOptions

# Interface: PriceScaleOptions

Defined in: [src/types/chart.ts:649](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L649)

Options for a price (vertical) axis scale.

Controls the position, behavior, and styling of price scales.
Charts can have left, right, or both price scales.

 PriceScaleOptions

## Example

```typescript
const rightScale: PriceScaleOptions = {
  position: 'right',
  autoScale: true,
  borderColor: '#363a45',
  scaleMargins: { top: 0.1, bottom: 0.1 }
};
```

## Properties

### autoScale?

> `optional` **autoScale**: `boolean`

Defined in: [src/types/chart.ts:672](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L672)

Whether to automatically adjust scale to fit visible data.
When true, scale zooms to show all visible data points.

***

### borderColor?

> `optional` **borderColor**: `string`

Defined in: [src/types/chart.ts:660](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L660)

Color of the price scale border line.
Separates the chart area from the price axis.

***

### invertScale?

> `optional` **invertScale**: `boolean`

Defined in: [src/types/chart.ts:678](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L678)

Whether to invert the price scale (high at bottom).
Useful for certain types of data or preferences.

***

### position?

> `optional` **position**: `"left"` \| `"right"` \| `"none"`

Defined in: [src/types/chart.ts:654](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L654)

Position of the price scale on the chart.
'none' hides the scale entirely.

***

### scaleMargins?

> `optional` **scaleMargins**: `object`

Defined in: [src/types/chart.ts:684](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L684)

Margins around the data on the price scale.
Values 0-1 represent percentage of visible range.

#### bottom

> **bottom**: `number`

Space below the lowest data point (0-1)

#### top

> **top**: `number`

Space above the highest data point (0-1)

***

### textColor?

> `optional` **textColor**: `string`

Defined in: [src/types/chart.ts:666](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L666)

Color of the price axis label text.
Should contrast with the chart background.
