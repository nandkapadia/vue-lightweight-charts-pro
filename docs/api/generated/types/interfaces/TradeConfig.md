[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / TradeConfig

# Interface: TradeConfig

Defined in: [src/types/chart.ts:130](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L130)

Configuration for displaying a trade on the chart.

Trades represent entry and exit points for positions, including
profit/loss information. They can be visualized in various styles
like markers, rectangles, or zones.

 TradeConfig

## Example

```typescript
const trade: TradeConfig = {
  id: 'trade-001',
  entryTime: 1609459200,
  entryPrice: 100.00,
  exitTime: 1609545600,
  exitPrice: 105.00,
  isProfitable: true,
  pnl: 500.00,
  pnlPercentage: 5.0
};
```

## Indexable

\[`key`: `string`\]: `unknown`

Index signature for additional custom trade data.
Examples: position size, fees, strategy name, etc.

## Properties

### entryPrice

> **entryPrice**: `number`

Defined in: [src/types/chart.ts:147](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L147)

Price at which the position was entered.
For long trades, this is the buy price.

***

### entryTime

> **entryTime**: `string` \| `number`

Defined in: [src/types/chart.ts:141](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L141)

Timestamp when the position was entered.
Can be Unix timestamp (seconds) or ISO 8601 string.

***

### exitPrice

> **exitPrice**: `number`

Defined in: [src/types/chart.ts:159](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L159)

Price at which the position was exited.
For long trades, this is the sell price.

***

### exitTime

> **exitTime**: `string` \| `number`

Defined in: [src/types/chart.ts:153](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L153)

Timestamp when the position was exited.
Can be Unix timestamp (seconds) or ISO 8601 string.

***

### id

> **id**: `string`

Defined in: [src/types/chart.ts:135](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L135)

Unique identifier for the trade.
Used for tracking and updating specific trades.

***

### isProfitable

> **isProfitable**: `boolean`

Defined in: [src/types/chart.ts:165](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L165)

Whether the trade resulted in a profit.
Used to determine visualization colors (green/red).

***

### pnl?

> `optional` **pnl**: `number`

Defined in: [src/types/chart.ts:171](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L171)

Absolute profit or loss amount in base currency.
Negative values indicate a loss.

***

### pnlPercentage?

> `optional` **pnlPercentage**: `number`

Defined in: [src/types/chart.ts:177](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L177)

Profit or loss as a percentage of entry value.
Calculated as ((exitPrice - entryPrice) / entryPrice) * 100.
