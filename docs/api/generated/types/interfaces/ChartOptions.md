[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / ChartOptions

# Interface: ChartOptions

Defined in: [src/types/chart.ts:864](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L864)

Complete configuration options for a chart instance.

This interface provides all chart-level settings including dimensions,
scales, grid, layout, crosshair, and other visual options.

 ChartOptions

## Example

```typescript
const chartOptions: ChartOptions = {
  height: 400,
  layout: {
    backgroundColor: '#1e1e1e',
    textColor: '#d4d4dc'
  },
  grid: {
    vertLines: { color: '#2B2B43' },
    horzLines: { color: '#2B2B43' }
  },
  timeScale: { timeVisible: true },
  crosshair: { mode: 1 }
};
```

## Properties

### crosshair?

> `optional` **crosshair**: [`CrosshairOptions`](CrosshairOptions.md)

Defined in: [src/types/chart.ts:911](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L911)

Configuration for the crosshair cursor.
Controls hover behavior and appearance.

***

### grid?

> `optional` **grid**: [`GridOptions`](GridOptions.md)

Defined in: [src/types/chart.ts:899](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L899)

Configuration for chart grid lines.
Helps users read values across the chart area.

***

### height?

> `optional` **height**: `number`

Defined in: [src/types/chart.ts:875](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L875)

Height of the chart in pixels.
Required unless using a container with defined height.

***

### layout?

> `optional` **layout**: [`LayoutOptions`](LayoutOptions.md)

Defined in: [src/types/chart.ts:905](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L905)

General layout options (colors, fonts).
Affects the overall visual appearance.

***

### leftPriceScale?

> `optional` **leftPriceScale**: [`PriceScaleOptions`](PriceScaleOptions.md)

Defined in: [src/types/chart.ts:893](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L893)

Configuration for the left price axis.
Secondary scale for additional series or comparison.

***

### localization?

> `optional` **localization**: `object`

Defined in: [src/types/chart.ts:930](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L930)

Localization settings for formatting.
Controls date/time display format and locale.

#### dateFormat?

> `optional` **dateFormat**: `string`

Date format pattern

#### locale?

> `optional` **locale**: `string`

Locale identifier (e.g., 'en-US', 'de-DE')

#### timeFormatter()?

> `optional` **timeFormatter**: (`time`) => `string`

Custom time formatter function

##### Parameters

###### time

`number`

##### Returns

`string`

***

### rightPriceScale?

> `optional` **rightPriceScale**: [`PriceScaleOptions`](PriceScaleOptions.md)

Defined in: [src/types/chart.ts:887](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L887)

Configuration for the right price axis.
The primary price scale for most charts.

***

### timeScale?

> `optional` **timeScale**: [`TimeScaleOptions`](TimeScaleOptions.md)

Defined in: [src/types/chart.ts:881](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L881)

Configuration for the time (horizontal) axis.
Controls time display and scrolling behavior.

***

### watermark?

> `optional` **watermark**: `object`

Defined in: [src/types/chart.ts:917](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L917)

Watermark configuration for branding or identification.
Displayed as overlay text on the chart.

#### color?

> `optional` **color**: `string`

Watermark text color

#### text?

> `optional` **text**: `string`

Watermark text content

#### visible?

> `optional` **visible**: `boolean`

Whether watermark is visible

***

### width?

> `optional` **width**: `number`

Defined in: [src/types/chart.ts:869](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L869)

Width of the chart in pixels.
If not specified, chart auto-resizes to container width.
