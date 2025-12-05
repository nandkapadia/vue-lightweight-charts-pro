[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / ChartEmits

# Interface: ChartEmits()

Defined in: [src/types/chart.ts:1044](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L1044)

Event emitter interface for the LightweightChart component.

Defines all events that the chart component can emit,
with proper TypeScript typing for event handlers.

 ChartEmits

## Example

```vue
<template>
  <LightweightChart
    @ready="handleReady"
    @crosshairMove="handleCrosshair"
    @error="handleError"
  />
</template>

<script setup>
function handleReady(chart: IChartApi) {
  console.log('Chart initialized');
}
</script>
```

## Call Signature

> **ChartEmits**(`e`, `chart`): `void`

Defined in: [src/types/chart.ts:1049](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L1049)

Emitted when the chart is fully initialized and ready for interaction.

### Parameters

#### e

`"ready"`

#### chart

`IChartApi`

The chart API instance for direct manipulation

### Returns

`void`

## Call Signature

> **ChartEmits**(`e`, `params`): `void`

Defined in: [src/types/chart.ts:1056](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L1056)

Emitted when the crosshair position changes.
Useful for displaying hover data in tooltips or legends.

### Parameters

#### e

`"crosshairMove"`

#### params

`unknown`

Mouse event parameters including position and series values

### Returns

`void`

## Call Signature

> **ChartEmits**(`e`, `range`): `void`

Defined in: [src/types/chart.ts:1063](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L1063)

Emitted when the visible time range changes (scroll/zoom).
Can be used to trigger lazy loading or update related components.

### Parameters

#### e

`"visibleTimeRangeChange"`

#### range

`unknown`

The new visible time range

### Returns

`void`

## Call Signature

> **ChartEmits**(`e`, `params`): `void`

Defined in: [src/types/chart.ts:1070](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L1070)

Emitted when a series is clicked.
Useful for implementing click-based interactions.

### Parameters

#### e

`"seriesClick"`

#### params

`unknown`

Click event parameters including clicked series/price

### Returns

`void`

## Call Signature

> **ChartEmits**(`e`): `void`

Defined in: [src/types/chart.ts:1076](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L1076)

Emitted when WebSocket connection is established.
Indicates real-time data streaming is now active.

### Parameters

#### e

`"connected"`

### Returns

`void`

## Call Signature

> **ChartEmits**(`e`): `void`

Defined in: [src/types/chart.ts:1082](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L1082)

Emitted when WebSocket connection is lost.
May trigger reconnection attempts depending on configuration.

### Parameters

#### e

`"disconnected"`

### Returns

`void`

## Call Signature

> **ChartEmits**(`e`, `error`): `void`

Defined in: [src/types/chart.ts:1088](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L1088)

Emitted when an error occurs (API, WebSocket, or rendering).

### Parameters

#### e

`"error"`

#### error

`Error`

The error object with details

### Returns

`void`

## Call Signature

> **ChartEmits**(`e`, `seriesId`, `count`): `void`

Defined in: [src/types/chart.ts:1096](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L1096)

Emitted when data is loaded for a series.
Useful for tracking loading progress or triggering UI updates.

### Parameters

#### e

`"dataLoaded"`

#### seriesId

`string`

ID of the series that received data

#### count

`number`

Number of data points loaded

### Returns

`void`
