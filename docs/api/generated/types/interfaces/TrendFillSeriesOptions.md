[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / TrendFillSeriesOptions

# Interface: TrendFillSeriesOptions

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/trendFillSeriesPlugin.d.ts:43

Configuration options for TrendFill series

Fill Colors:

## Extends

- `CustomSeriesOptions`

## Properties

### \_usePrimitive?

> `optional` **\_usePrimitive**: `boolean`

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/trendFillSeriesPlugin.d.ts:60

***

### autoscaleInfoProvider?

> `optional` **autoscaleInfoProvider**: `AutoscaleInfoProvider`

Defined in: node\_modules/lightweight-charts/dist/typings.d.ts:3926

Override the default AutoscaleInfo provider.
By default, the chart scales data automatically based on visible data range.
However, for some reasons one could require overriding this behavior.

#### Default Value

`undefined`

#### Examples

```js
const firstSeries = chart.addSeries(LineSeries, {
    autoscaleInfoProvider: () => ({
        priceRange: {
            minValue: 0,
            maxValue: 100,
        },
    }),
});
```

```js
const firstSeries = chart.addSeries(LineSeries, {
    autoscaleInfoProvider: () => ({
        priceRange: {
            minValue: 0,
            maxValue: 100,
        },
        margins: {
            above: 10,
            below: 10,
        },
    }),
});
```

```js
const firstSeries = chart.addSeries(LineSeries, {
    autoscaleInfoProvider: original => {
        const res = original();
        if (res !== null) {
            res.priceRange.minValue -= 10;
            res.priceRange.maxValue += 10;
        }
        return res;
    },
});
```

#### Inherited from

`CustomSeriesOptions.autoscaleInfoProvider`

***

### baseLineColor

> **baseLineColor**: `string`

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/trendFillSeriesPlugin.d.ts:55

Color of the base/reference line

#### Overrides

`CustomSeriesOptions.baseLineColor`

***

### baseLineStyle

> **baseLineStyle**: `LineStyle`

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/trendFillSeriesPlugin.d.ts:57

Line style (Solid, Dotted, Dashed, etc.)

#### Overrides

`CustomSeriesOptions.baseLineStyle`

***

### baseLineVisible

> **baseLineVisible**: `boolean`

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/trendFillSeriesPlugin.d.ts:58

Toggle base line visibility

#### Overrides

`CustomSeriesOptions.baseLineVisible`

***

### baseLineWidth

> **baseLineWidth**: `LineWidth`

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/trendFillSeriesPlugin.d.ts:56

Width of the base line in pixels

#### Overrides

`CustomSeriesOptions.baseLineWidth`

***

### color

> **color**: `string`

Defined in: node\_modules/lightweight-charts/dist/typings.d.ts:1131

Color used for the price line and price scale label.

#### Inherited from

`CustomSeriesOptions.color`

***

### downtrendFillColor

> **downtrendFillColor**: `string`

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/trendFillSeriesPlugin.d.ts:45

Fill color for downtrend areas (supports rgba)

***

### downtrendLineColor

> **downtrendLineColor**: `string`

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/trendFillSeriesPlugin.d.ts:51

Color of the downtrend line

***

### downtrendLineStyle

> **downtrendLineStyle**: `LineStyle`

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/trendFillSeriesPlugin.d.ts:53

Line style for downtrend (Solid, Dotted, Dashed, etc.)

***

### downtrendLineVisible

> **downtrendLineVisible**: `boolean`

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/trendFillSeriesPlugin.d.ts:54

Toggle downtrend line visibility

Base Line:

***

### downtrendLineWidth

> **downtrendLineWidth**: `LineWidth`

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/trendFillSeriesPlugin.d.ts:52

Width of the downtrend line in pixels

***

### fillVisible

> **fillVisible**: `boolean`

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/trendFillSeriesPlugin.d.ts:46

Toggle fill visibility

Uptrend Line:

***

### lastValueVisible

> **lastValueVisible**: `boolean`

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/trendFillSeriesPlugin.d.ts:59

Visibility of the label with the latest visible price on the price scale.

#### Default Value

`true`, `false` for yield curve charts

#### Overrides

`CustomSeriesOptions.lastValueVisible`

***

### priceFormat

> **priceFormat**: `PriceFormat`

Defined in: node\_modules/lightweight-charts/dist/typings.d.ts:3855

Price format.

#### Default Value

`{ type: 'price', precision: 2, minMove: 0.01 }`

#### Inherited from

`CustomSeriesOptions.priceFormat`

***

### priceLineColor

> **priceLineColor**: `string`

Defined in: node\_modules/lightweight-charts/dist/typings.d.ts:3843

Color of the price line.
By default, its color is set by the last bar color (or by line color on Line and Area charts).

#### Default Value

`''`

#### Inherited from

`CustomSeriesOptions.priceLineColor`

***

### priceLineSource

> **priceLineSource**: `PriceLineSource`

Defined in: node\_modules/lightweight-charts/dist/typings.d.ts:3830

The source to use for the value of the price line.

#### Default Value

PriceLineSource.LastBar

#### Inherited from

`CustomSeriesOptions.priceLineSource`

***

### priceLineStyle

> **priceLineStyle**: `LineStyle`

Defined in: node\_modules/lightweight-charts/dist/typings.d.ts:3849

Price line style.

#### Default Value

[LineStyle.Dashed](../enumerations/LineStyle.md#dashed)

#### Inherited from

`CustomSeriesOptions.priceLineStyle`

***

### priceLineVisible

> **priceLineVisible**: `boolean`

Defined in: node\_modules/lightweight-charts/dist/typings.d.ts:3824

Show the price line. Price line is a horizontal line indicating the last price of the series.

#### Default Value

`true`, `false` for yield curve charts

#### Inherited from

`CustomSeriesOptions.priceLineVisible`

***

### priceLineWidth

> **priceLineWidth**: `LineWidth`

Defined in: node\_modules/lightweight-charts/dist/typings.d.ts:3836

Width of the price line.

#### Default Value

`1`

#### Inherited from

`CustomSeriesOptions.priceLineWidth`

***

### priceScaleId?

> `optional` **priceScaleId**: `string`

Defined in: node\_modules/lightweight-charts/dist/typings.d.ts:3810

Target price scale to bind new series to.

#### Default Value

`'right'` if right scale is visible and `'left'` otherwise

#### Inherited from

`CustomSeriesOptions.priceScaleId`

***

### title

> **title**: `string`

Defined in: node\_modules/lightweight-charts/dist/typings.d.ts:3804

You can name series when adding it to a chart. This name will be displayed on the label next to the last value label.

#### Default Value

`''`

#### Inherited from

`CustomSeriesOptions.title`

***

### uptrendFillColor

> **uptrendFillColor**: `string`

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/trendFillSeriesPlugin.d.ts:44

Fill color for uptrend areas (supports rgba)

***

### uptrendLineColor

> **uptrendLineColor**: `string`

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/trendFillSeriesPlugin.d.ts:47

Color of the uptrend line

***

### uptrendLineStyle

> **uptrendLineStyle**: `LineStyle`

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/trendFillSeriesPlugin.d.ts:49

Line style for uptrend (Solid, Dotted, Dashed, etc.)

***

### uptrendLineVisible

> **uptrendLineVisible**: `boolean`

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/trendFillSeriesPlugin.d.ts:50

Toggle uptrend line visibility

Downtrend Line:

***

### uptrendLineWidth

> **uptrendLineWidth**: `LineWidth`

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/trendFillSeriesPlugin.d.ts:48

Width of the uptrend line in pixels

***

### visible

> **visible**: `boolean`

Defined in: node\_modules/lightweight-charts/dist/typings.d.ts:3818

Visibility of the series.
If the series is hidden, everything including price lines, baseline, price labels and markers, will also be hidden.
Please note that hiding a series is not equivalent to deleting it, since hiding does not affect the timeline at all, unlike deleting where the timeline can be changed (some points can be deleted).

#### Default Value

`true`

#### Inherited from

`CustomSeriesOptions.visible`
