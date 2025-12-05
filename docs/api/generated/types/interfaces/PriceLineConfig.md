[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / PriceLineConfig

# Interface: PriceLineConfig

Defined in: [src/types/chart.ts:283](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L283)

Configuration for a horizontal price line.

Price lines are horizontal lines drawn at specific price levels,
useful for marking support/resistance, targets, or stop losses.

 PriceLineConfig

## Example

```typescript
const resistance: PriceLineConfig = {
  price: 150.00,
  color: '#ef5350',
  lineWidth: 2,
  lineStyle: 2,  // Dashed
  axisLabelVisible: true,
  title: 'Resistance'
};
```

## Properties

### axisLabelVisible?

> `optional` **axisLabelVisible**: `boolean`

Defined in: [src/types/chart.ts:312](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L312)

Whether to show a label on the price axis for this line.
When true, displays the price value on the axis.

***

### color?

> `optional` **color**: `string`

Defined in: [src/types/chart.ts:294](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L294)

Color of the price line.
Can be any valid CSS color string (hex, rgb, rgba, named).

***

### lineStyle?

> `optional` **lineStyle**: `number`

Defined in: [src/types/chart.ts:306](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L306)

Style of the line.
Uses LineStyle enum: 0=Solid, 1=Dotted, 2=Dashed, 3=LargeDashed.

***

### lineWidth?

> `optional` **lineWidth**: `number`

Defined in: [src/types/chart.ts:300](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L300)

Width of the line in pixels.
Common values: 1 (thin), 2 (normal), 3 (thick).

***

### price

> **price**: `number`

Defined in: [src/types/chart.ts:288](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L288)

Price level where the line should be drawn.
Must be within the visible price range to be displayed.

***

### title?

> `optional` **title**: `string`

Defined in: [src/types/chart.ts:318](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L318)

Text label for the price line.
Displayed alongside the line for identification.
