[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / TradeVisualizationOptions

# Interface: TradeVisualizationOptions

Defined in: [src/types/chart.ts:208](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L208)

Visual styling options for trade visualization.

Controls how trades are rendered on the chart, including colors
for profitable/loss trades and the overall visualization style.

 TradeVisualizationOptions

## Example

```typescript
const tradeViz: TradeVisualizationOptions = {
  style: 'both',
  entryMarkerColorLong: '#26a69a',    // Green for long entries
  entryMarkerColorShort: '#ef5350',   // Red for short entries
  exitMarkerColorProfit: '#26a69a',   // Green for profitable exits
  exitMarkerColorLoss: '#ef5350',     // Red for loss exits
  rectangleColorProfit: 'rgba(38, 166, 154, 0.2)',
  rectangleColorLoss: 'rgba(239, 83, 80, 0.2)',
  showPnlInMarkers: true
};
```

## Indexable

\[`key`: `string`\]: `unknown`

Index signature for additional custom visualization options

## Properties

### entryMarkerColorLong?

> `optional` **entryMarkerColorLong**: `string`

Defined in: [src/types/chart.ts:223](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L223)

Color for long position entry markers (default: green)

***

### entryMarkerColorShort?

> `optional` **entryMarkerColorShort**: `string`

Defined in: [src/types/chart.ts:226](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L226)

Color for short position entry markers (default: red)

***

### exitMarkerColorLoss?

> `optional` **exitMarkerColorLoss**: `string`

Defined in: [src/types/chart.ts:232](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L232)

Color for loss exit markers (default: red)

***

### exitMarkerColorProfit?

> `optional` **exitMarkerColorProfit**: `string`

Defined in: [src/types/chart.ts:229](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L229)

Color for profitable exit markers (default: green)

***

### markerSize?

> `optional` **markerSize**: `number`

Defined in: [src/types/chart.ts:235](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L235)

Size of markers in pixels (default: 3)

***

### rectangleBorderWidth?

> `optional` **rectangleBorderWidth**: `number`

Defined in: [src/types/chart.ts:246](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L246)

Width of rectangle border in pixels (default: 1)

***

### rectangleColorLoss?

> `optional` **rectangleColorLoss**: `string`

Defined in: [src/types/chart.ts:252](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L252)

Fill color for loss trade rectangles

***

### rectangleColorProfit?

> `optional` **rectangleColorProfit**: `string`

Defined in: [src/types/chart.ts:249](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L249)

Fill color for profitable trade rectangles

***

### rectangleFillOpacity?

> `optional` **rectangleFillOpacity**: `number`

Defined in: [src/types/chart.ts:243](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L243)

Opacity of rectangle fill (0-1, default: 0.2)

***

### rectangleShowText?

> `optional` **rectangleShowText**: `boolean`

Defined in: [src/types/chart.ts:255](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L255)

Whether to show trade info text in rectangle

***

### showPnlInMarkers?

> `optional` **showPnlInMarkers**: `boolean`

Defined in: [src/types/chart.ts:238](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L238)

Whether to display P&L value in marker text

***

### style

> **style**: `"markers"` \| `"rectangles"` \| `"both"` \| `"lines"` \| `"arrows"` \| `"zones"`

Defined in: [src/types/chart.ts:218](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L218)

Primary visualization style for trades.
- 'markers': Point markers at entry/exit
- 'rectangles': Filled boxes spanning the trade duration
- 'both': Markers and rectangles together
- 'lines': Lines connecting entry and exit
- 'arrows': Directional arrows showing trade direction
- 'zones': Filled zones highlighting the trade area
