[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / SeriesConfig

# Interface: SeriesConfig

Defined in: [src/types/chart.ts:428](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L428)

Complete configuration for a single chart series.

This interface defines all aspects of a series including its type, data,
visual options, and additional features like markers and price lines.

 SeriesConfig

## Example

```typescript
const candlestickSeries: SeriesConfig = {
  seriesId: 'AAPL',
  name: 'Apple Inc.',
  seriesType: 'Candlestick',
  paneId: 0,
  data: [
    { time: 1609459200, open: 100, high: 105, low: 98, close: 103 }
  ],
  options: {
    upColor: '#26a69a',
    downColor: '#ef5350'
  },
  lazyLoading: { enabled: true, chunkSize: 500 },
  markers: [
    { time: 1609459200, position: 'belowBar', color: 'green', shape: 'arrowUp' }
  ],
  priceLines: [{ price: 150, title: 'Target' }]
};
```

## Properties

### annotations?

> `optional` **annotations**: [`Annotation`](Annotation.md)[]

Defined in: [src/types/chart.ts:513](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L513)

Array of annotations specific to this series.
Series annotations are drawn relative to the series data.

***

### data

> **data**: [`DataPoint`](DataPoint.md)[]

Defined in: [src/types/chart.ts:465](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L465)

Array of data points for the series.
Must be sorted by time in ascending order.

***

### lazyLoading?

> `optional` **lazyLoading**: [`LazyLoadingConfig`](LazyLoadingConfig.md)

Defined in: [src/types/chart.ts:483](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L483)

Lazy loading configuration for infinite scroll.
Only applicable when integrated with a backend API.

***

### markers?

> `optional` **markers**: `SeriesMarker`\<`Time`\>[]

Defined in: [src/types/chart.ts:489](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L489)

Array of markers to display on this series.
Markers are visual indicators at specific time points.

***

### name?

> `optional` **name**: `string`

Defined in: [src/types/chart.ts:439](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L439)

Human-readable display name for the series.
Shown in legends and tooltips. Falls back to seriesId if not provided.

***

### options?

> `optional` **options**: [`SeriesOptions`](SeriesOptions.md) \| [`BandSeriesOptions`](BandSeriesOptions.md) \| [`RibbonSeriesOptions`](RibbonSeriesOptions.md) \| [`SignalSeriesOptions`](SignalSeriesOptions.md) \| [`TrendFillSeriesOptions`](TrendFillSeriesOptions.md) \| [`GradientRibbonSeriesOptions`](GradientRibbonSeriesOptions.md)

Defined in: [src/types/chart.ts:471](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L471)

Visual and behavioral options for the series.
The specific options available depend on the series type.

***

### paneId?

> `optional` **paneId**: `number`

Defined in: [src/types/chart.ts:459](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L459)

Index of the pane where this series should be rendered.
Default is 0 (main pane). Use 1, 2, etc. for additional panes.

***

### priceLines?

> `optional` **priceLines**: [`PriceLineConfig`](PriceLineConfig.md)[]

Defined in: [src/types/chart.ts:495](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L495)

Array of horizontal price lines for this series.
Useful for support/resistance levels, targets, etc.

***

### seriesId

> **seriesId**: `string`

Defined in: [src/types/chart.ts:433](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L433)

Unique identifier for the series within the chart.
Used for referencing, updating, and removing the series.

***

### seriesType

> **seriesType**: `string`

Defined in: [src/types/chart.ts:446](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L446)

Type of chart series to render.
Includes standard types (Line, Candlestick, etc.) and custom types
from @lightweight-charts-pro/core (Band, Ribbon, Signal, etc.).

***

### trades?

> `optional` **trades**: [`TradeConfig`](TradeConfig.md)[]

Defined in: [src/types/chart.ts:501](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L501)

Array of trades to visualize on this series.
Each trade shows entry/exit points and profit/loss.

***

### tradeVisualizationOptions?

> `optional` **tradeVisualizationOptions**: [`TradeVisualizationOptions`](TradeVisualizationOptions.md)

Defined in: [src/types/chart.ts:507](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L507)

Options for how trades should be visualized.
Controls colors, styles, and display preferences.
