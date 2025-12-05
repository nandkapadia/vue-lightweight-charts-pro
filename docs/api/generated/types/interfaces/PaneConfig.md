[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / PaneConfig

# Interface: PaneConfig

Defined in: [src/types/chart.ts:537](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L537)

Configuration for a chart pane (sub-chart area).

Panes allow multiple chart areas with different series and scales,
commonly used for separating price from volume or indicators.

 PaneConfig

## Example

```typescript
const volumePane: PaneConfig = {
  paneId: 1,
  heightRatio: 0.3,  // 30% of available height
  series: [{
    seriesId: 'volume',
    seriesType: 'Histogram',
    data: [...]
  }]
};
```

## Properties

### collapsed?

> `optional` **collapsed**: `boolean`

Defined in: [src/types/chart.ts:560](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L560)

Whether this pane is currently collapsed (hidden).
Collapsed panes take up no space but preserve their data.

***

### height?

> `optional` **height**: `string` \| `number`

Defined in: [src/types/chart.ts:548](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L548)

Fixed height for the pane in pixels or percentage string.
Example: 200 or '30%'. Mutually exclusive with heightRatio.

***

### heightRatio?

> `optional` **heightRatio**: `number`

Defined in: [src/types/chart.ts:554](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L554)

Height as a ratio of total available space (0-1).
Example: 0.3 = 30% of chart height. Mutually exclusive with height.

***

### paneId

> **paneId**: `number`

Defined in: [src/types/chart.ts:542](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L542)

Unique identifier for the pane.
Pane 0 is the main pane; 1, 2, etc. are additional panes.

***

### series

> **series**: [`SeriesConfig`](SeriesConfig.md)[]

Defined in: [src/types/chart.ts:566](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L566)

Array of series to render in this pane.
All series in a pane share the same time axis.
