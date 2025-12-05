[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / CrosshairOptions

# Interface: CrosshairOptions

Defined in: [src/types/chart.ts:797](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L797)

Options for the chart's crosshair (cursor tracking lines).

Controls how the crosshair appears and behaves when users
hover over the chart.

 CrosshairOptions

## Example

```typescript
const crosshairOptions: CrosshairOptions = {
  mode: 1,  // Magnet mode
  vertLine: { color: '#758696', labelVisible: true },
  horzLine: { color: '#758696', labelVisible: true }
};
```

## Properties

### horzLine?

> `optional` **horzLine**: `object`

Defined in: [src/types/chart.ts:825](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L825)

Options for the horizontal crosshair line (follows cursor Y).
Shows the price position of the cursor.

#### color?

> `optional` **color**: `string`

Color of the horizontal line

#### labelVisible?

> `optional` **labelVisible**: `boolean`

Whether to show a label on the price axis

#### style?

> `optional` **style**: `number`

Line style: 0=Solid, 1=Dotted, 2=Dashed, 3=LargeDashed

#### visible?

> `optional` **visible**: `boolean`

Whether the horizontal line is visible

#### width?

> `optional` **width**: `number`

Width of the line in pixels

***

### mode?

> `optional` **mode**: `number`

Defined in: [src/types/chart.ts:802](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L802)

Crosshair behavior mode.
0 = Normal (free movement), 1 = Magnet (snaps to data points).

***

### vertLine?

> `optional` **vertLine**: `object`

Defined in: [src/types/chart.ts:808](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L808)

Options for the vertical crosshair line (follows cursor X).
Shows the time position of the cursor.

#### color?

> `optional` **color**: `string`

Color of the vertical line

#### labelVisible?

> `optional` **labelVisible**: `boolean`

Whether to show a label on the time axis

#### style?

> `optional` **style**: `number`

Line style: 0=Solid, 1=Dotted, 2=Dashed, 3=LargeDashed

#### visible?

> `optional` **visible**: `boolean`

Whether the vertical line is visible

#### width?

> `optional` **width**: `number`

Width of the line in pixels
