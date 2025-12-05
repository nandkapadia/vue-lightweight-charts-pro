[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / GridOptions

# Interface: GridOptions

Defined in: [src/types/chart.ts:708](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L708)

Options for the chart's grid lines.

Controls the appearance of vertical and horizontal grid lines
that help users read values across the chart.

 GridOptions

## Example

```typescript
const gridOptions: GridOptions = {
  vertLines: { color: '#2B2B43', visible: true },
  horzLines: { color: '#2B2B43', visible: true, style: 0 }
};
```

## Properties

### horzLines?

> `optional` **horzLines**: `object`

Defined in: [src/types/chart.ts:726](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L726)

Options for horizontal grid lines (price levels).
These lines run from left to right of the chart.

#### color?

> `optional` **color**: `string`

Color of horizontal grid lines

#### style?

> `optional` **style**: `number`

Line style: 0=Solid, 1=Dotted, 2=Dashed, 3=LargeDashed

#### visible?

> `optional` **visible**: `boolean`

Whether horizontal lines are visible

***

### vertLines?

> `optional` **vertLines**: `object`

Defined in: [src/types/chart.ts:713](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L713)

Options for vertical grid lines (time intervals).
These lines run from top to bottom of the chart.

#### color?

> `optional` **color**: `string`

Color of vertical grid lines

#### style?

> `optional` **style**: `number`

Line style: 0=Solid, 1=Dotted, 2=Dashed, 3=LargeDashed

#### visible?

> `optional` **visible**: `boolean`

Whether vertical lines are visible
