[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / TimeScaleOptions

# Interface: TimeScaleOptions

Defined in: [src/types/chart.ts:587](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L587)

Options for the chart's time (horizontal) axis.

Controls time display format, scrolling behavior, and visual styling
of the time axis at the bottom of the chart.

 TimeScaleOptions

## Example

```typescript
const timeOptions: TimeScaleOptions = {
  timeVisible: true,
  secondsVisible: false,
  borderColor: '#363a45',
  shiftVisibleRangeOnNewBar: true
};
```

## Properties

### borderColor?

> `optional` **borderColor**: `string`

Defined in: [src/types/chart.ts:604](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L604)

Color of the time scale border line.
Separates the chart area from the time axis.

***

### fixedLeftEdge?

> `optional` **fixedLeftEdge**: `boolean`

Defined in: [src/types/chart.ts:616](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L616)

Whether to lock the left edge of the visible range.
Prevents scrolling beyond the first data point.

***

### fixedRightEdge?

> `optional` **fixedRightEdge**: `boolean`

Defined in: [src/types/chart.ts:622](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L622)

Whether to lock the right edge of the visible range.
Prevents scrolling beyond the last data point.

***

### secondsVisible?

> `optional` **secondsVisible**: `boolean`

Defined in: [src/types/chart.ts:598](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L598)

Whether to display seconds in time labels.
Only applies when timeVisible is true.

***

### shiftVisibleRangeOnNewBar?

> `optional` **shiftVisibleRangeOnNewBar**: `boolean`

Defined in: [src/types/chart.ts:628](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L628)

Whether to auto-scroll when new bars are added.
Essential for real-time charts to keep latest data visible.

***

### textColor?

> `optional` **textColor**: `string`

Defined in: [src/types/chart.ts:610](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L610)

Color of the time axis label text.
Should contrast with the chart background.

***

### timeVisible?

> `optional` **timeVisible**: `boolean`

Defined in: [src/types/chart.ts:592](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L592)

Whether to display time in axis labels.
When false, only dates are shown.
