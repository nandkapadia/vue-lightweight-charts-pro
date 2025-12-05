[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / SignalSeriesOptions

# Interface: SignalSeriesOptions

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/signalSeriesPlugin.d.ts:27

Configuration options for Signal series

Colors:

## Extends

- `CustomSeriesOptions`

## Properties

### \_usePrimitive?

> `optional` **\_usePrimitive**: `boolean`

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/signalSeriesPlugin.d.ts:35

***

### alertColor?

> `optional` **alertColor**: `string`

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/signalSeriesPlugin.d.ts:30

Color for negative value signals

Series options:

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

Defined in: node\_modules/lightweight-charts/dist/typings.d.ts:3867

Color of the base line in `IndexedTo100` mode.

#### Default Value

`'#B2B5BE'`

#### Inherited from

`CustomSeriesOptions.baseLineColor`

***

### baseLineStyle

> **baseLineStyle**: `LineStyle`

Defined in: node\_modules/lightweight-charts/dist/typings.d.ts:3879

Base line style. Suitable for percentage and indexedTo100 scales.

#### Default Value

[LineStyle.Solid](../enumerations/LineStyle.md#solid)

#### Inherited from

`CustomSeriesOptions.baseLineStyle`

***

### baseLineVisible

> **baseLineVisible**: `boolean`

Defined in: node\_modules/lightweight-charts/dist/typings.d.ts:3861

Visibility of base line. Suitable for percentage and `IndexedTo100` scales.

#### Default Value

`true`

#### Inherited from

`CustomSeriesOptions.baseLineVisible`

***

### baseLineWidth

> **baseLineWidth**: `LineWidth`

Defined in: node\_modules/lightweight-charts/dist/typings.d.ts:3873

Base line width. Suitable for percentage and `IndexedTo10` scales.

#### Default Value

`1`

#### Inherited from

`CustomSeriesOptions.baseLineWidth`

***

### color

> **color**: `string`

Defined in: node\_modules/lightweight-charts/dist/typings.d.ts:1131

Color used for the price line and price scale label.

#### Inherited from

`CustomSeriesOptions.color`

***

### lastValueVisible

> **lastValueVisible**: `boolean`

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/signalSeriesPlugin.d.ts:31

Toggle last value visibility

#### Overrides

`CustomSeriesOptions.lastValueVisible`

***

### neutralColor?

> `optional` **neutralColor**: `string`

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/signalSeriesPlugin.d.ts:28

Color for value 0 signals

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

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/signalSeriesPlugin.d.ts:34

Toggle price line visibility

#### Overrides

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

### signalColor?

> `optional` **signalColor**: `string`

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/signalSeriesPlugin.d.ts:29

Color for positive value signals

***

### title

> **title**: `string`

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/signalSeriesPlugin.d.ts:32

Series title

#### Overrides

`CustomSeriesOptions.title`

***

### visible

> **visible**: `boolean`

Defined in: node\_modules/@lightweight-charts-pro/core/dist/plugins/series/signalSeriesPlugin.d.ts:33

Visibility of the series.
If the series is hidden, everything including price lines, baseline, price labels and markers, will also be hidden.
Please note that hiding a series is not equivalent to deleting it, since hiding does not affect the timeline at all, unlike deleting where the timeline can be changed (some points can be deleted).

#### Default Value

`true`

#### Overrides

`CustomSeriesOptions.visible`
