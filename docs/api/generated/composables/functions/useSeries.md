[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [composables](../README.md) / useSeries

# Function: useSeries()

> **useSeries**(`props`): `object`

Defined in: [src/composables/useSeries.ts:48](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/composables/useSeries.ts#L48)

## Parameters

### props

[`UseSeriesOptions`](../interfaces/UseSeriesOptions.md)

## Returns

### isReady

> **isReady**: `Ref`\<`boolean`, `boolean`\>

### removeSeries()

> **removeSeries**: () => `void`

Remove the series

#### Returns

`void`

### series

> **series**: `Ref`\<\{ `displayName?`: `string`; `legendConfig?`: `Record`\<`string`, `unknown`\>; `paneId?`: `number`; `seriesId?`: `string`; `title?`: `string`; `applyOptions`: `void`; `attachPrimitive`: `void`; `barsInLogicalRange`: `BarsInfo`\<`Time`\> \| `null`; `coordinateToPrice`: `BarPrice` \| `null`; `createPriceLine`: `IPriceLine`; `data`: readonly (`BarData`\<`Time`\> \| `WhitespaceData`\<`Time`\> \| `CandlestickData`\<`Time`\> \| `AreaData`\<`Time`\> \| `BaselineData`\<`Time`\> \| `LineData`\<`Time`\> \| `HistogramData`\<`Time`\> \| `CustomData`\<`Time`\> \| `CustomSeriesWhitespaceData`\<`Time`\>)[]; `dataByIndex`: `BarData`\<`Time`\> \| `WhitespaceData`\<`Time`\> \| `CandlestickData`\<`Time`\> \| `AreaData`\<`Time`\> \| `BaselineData`\<`Time`\> \| `LineData`\<`Time`\> \| `HistogramData`\<`Time`\> \| `CustomData`\<`Time`\> \| `CustomSeriesWhitespaceData`\<`Time`\> \| `null`; `detachPrimitive`: `void`; `getPane`: `IPaneApi`\<`Time`\>; `lastValueData`: `LastValueDataResult`; `moveToPane`: `void`; `options`: `Readonly`\<`CustomSeriesOptions` \| `BarSeriesOptions` \| `CandlestickSeriesOptions` \| `AreaSeriesOptions` \| `BaselineSeriesOptions` \| `LineSeriesOptions` \| `HistogramSeriesOptions`\>; `pop`: (`BarData`\<`Time`\> \| `WhitespaceData`\<`Time`\> \| `CandlestickData`\<`Time`\> \| `AreaData`\<`Time`\> \| `BaselineData`\<`Time`\> \| `LineData`\<`Time`\> \| `HistogramData`\<`Time`\> \| `CustomData`\<`Time`\> \| `CustomSeriesWhitespaceData`\<`Time`\>)[]; `priceFormatter`: `IPriceFormatter`; `priceLines`: `IPriceLine`[]; `priceScale`: `IPriceScaleApi`; `priceToCoordinate`: `Coordinate` \| `null`; `removePriceLine`: `void`; `seriesOrder`: `number`; `seriesType`: keyof `SeriesOptionsMap`; `setData`: `void`; `setSeriesOrder`: `void`; `subscribeDataChanged`: `void`; `unsubscribeDataChanged`: `void`; `update`: `void`; \} \| `null`, `ExtendedSeriesApi` \| \{ `displayName?`: `string`; `legendConfig?`: `Record`\<`string`, `unknown`\>; `paneId?`: `number`; `seriesId?`: `string`; `title?`: `string`; `applyOptions`: `void`; `attachPrimitive`: `void`; `barsInLogicalRange`: `BarsInfo`\<`Time`\> \| `null`; `coordinateToPrice`: `BarPrice` \| `null`; `createPriceLine`: `IPriceLine`; `data`: readonly (`BarData`\<`Time`\> \| `WhitespaceData`\<`Time`\> \| `CandlestickData`\<`Time`\> \| `AreaData`\<`Time`\> \| `BaselineData`\<`Time`\> \| `LineData`\<`Time`\> \| `HistogramData`\<`Time`\> \| `CustomData`\<`Time`\> \| `CustomSeriesWhitespaceData`\<`Time`\>)[]; `dataByIndex`: `BarData`\<`Time`\> \| `WhitespaceData`\<`Time`\> \| `CandlestickData`\<`Time`\> \| `AreaData`\<`Time`\> \| `BaselineData`\<`Time`\> \| `LineData`\<`Time`\> \| `HistogramData`\<`Time`\> \| `CustomData`\<`Time`\> \| `CustomSeriesWhitespaceData`\<`Time`\> \| `null`; `detachPrimitive`: `void`; `getPane`: `IPaneApi`\<`Time`\>; `lastValueData`: `LastValueDataResult`; `moveToPane`: `void`; `options`: `Readonly`\<`CustomSeriesOptions` \| `BarSeriesOptions` \| `CandlestickSeriesOptions` \| `AreaSeriesOptions` \| `BaselineSeriesOptions` \| `LineSeriesOptions` \| `HistogramSeriesOptions`\>; `pop`: (`BarData`\<`Time`\> \| `WhitespaceData`\<`Time`\> \| `CandlestickData`\<`Time`\> \| `AreaData`\<`Time`\> \| `BaselineData`\<`Time`\> \| `LineData`\<`Time`\> \| `HistogramData`\<`Time`\> \| `CustomData`\<`Time`\> \| `CustomSeriesWhitespaceData`\<`Time`\>)[]; `priceFormatter`: `IPriceFormatter`; `priceLines`: `IPriceLine`[]; `priceScale`: `IPriceScaleApi`; `priceToCoordinate`: `Coordinate` \| `null`; `removePriceLine`: `void`; `seriesOrder`: `number`; `seriesType`: keyof `SeriesOptionsMap`; `setData`: `void`; `setSeriesOrder`: `void`; `subscribeDataChanged`: `void`; `unsubscribeDataChanged`: `void`; `update`: `void`; \} \| `null`\>

### updateData()

> **updateData**: (`newData`) => `void`

Update series data with incremental updates or full replacement.

Uses series.update() for incremental updates (real-time ticks, new bars)
Uses series.setData() for replacements (symbol change, timeframe change, dataset shrink)

Normalizes timestamps to prevent ms/s misalignment.

**Replacement Detection:**
- Dataset shrink (new length < 50% of previous)
- Non-overlapping time windows (symbol/instrument change)
- First timestamp moving backward (history prepend/backfill)

**Incremental Update:**
- Monotonic append (new bars after existing)
- Last bar update (real-time tick)
- Small backfills (< 50% dataset size)

#### Parameters

##### newData

[`DataPoint`](../../types/interfaces/DataPoint.md)[]

#### Returns

`void`

### updateOptions()

> **updateOptions**: (`newOptions`) => `void`

Update series options

#### Parameters

##### newOptions

`Record`\<`string`, `unknown`\>

#### Returns

`void`
