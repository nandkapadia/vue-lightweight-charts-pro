[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / LayoutOptions

# Interface: LayoutOptions

Defined in: [src/types/chart.ts:754](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L754)

Options for the chart's overall layout and appearance.

Controls colors, fonts, and other visual aspects that apply
to the entire chart.

 LayoutOptions

## Example

```typescript
const layoutOptions: LayoutOptions = {
  backgroundColor: '#1e1e1e',
  textColor: '#d4d4dc',
  fontSize: 12,
  fontFamily: "'Trebuchet MS', Roboto, sans-serif"
};
```

## Properties

### backgroundColor?

> `optional` **backgroundColor**: `string`

Defined in: [src/types/chart.ts:759](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L759)

Background color of the chart area.
Use dark colors for trading terminals, light for reports.

***

### fontFamily?

> `optional` **fontFamily**: `string`

Defined in: [src/types/chart.ts:777](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L777)

Font family for all chart text.
Should include fallback fonts for compatibility.

***

### fontSize?

> `optional` **fontSize**: `number`

Defined in: [src/types/chart.ts:771](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L771)

Base font size in pixels for chart text.
Axis labels and other text scale from this base.

***

### textColor?

> `optional` **textColor**: `string`

Defined in: [src/types/chart.ts:765](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L765)

Default text color for all chart labels.
Should contrast well with the background color.
