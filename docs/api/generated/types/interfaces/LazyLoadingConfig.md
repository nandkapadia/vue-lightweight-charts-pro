[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / LazyLoadingConfig

# Interface: LazyLoadingConfig

Defined in: [src/types/chart.ts:74](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L74)

Configuration for lazy loading (infinite scroll) functionality.

Lazy loading allows charts to display large datasets efficiently by only
loading visible data and fetching more as the user scrolls. This interface
tracks the loading state and available data boundaries.

 LazyLoadingConfig

## Example

```typescript
const lazyConfig: LazyLoadingConfig = {
  enabled: true,
  chunkSize: 500,        // Load 500 bars at a time
  hasMoreBefore: true,   // Older data is available
  hasMoreAfter: false,   // We're at the latest data
  chunkInfo: {
    startIndex: 0,
    endIndex: 499,
    startTime: 1609459200,
    endTime: 1609545600,
    count: 500
  }
};
```

## Properties

### chunkInfo?

> `optional` **chunkInfo**: [`ChunkInfo`](ChunkInfo.md)

Defined in: [src/types/chart.ts:104](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L104)

Metadata about the currently loaded data chunk.
Used for tracking pagination state and merging new data.

***

### chunkSize

> **chunkSize**: `number`

Defined in: [src/types/chart.ts:86](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L86)

Number of data points to request per chunk.
Larger values reduce network requests but increase initial load time.
Recommended: 300-1000 for most use cases.

***

### enabled

> **enabled**: `boolean`

Defined in: [src/types/chart.ts:79](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L79)

Whether lazy loading is enabled for this series.
When true, data will be loaded on-demand as user scrolls.

***

### hasMoreAfter

> **hasMoreAfter**: `boolean`

Defined in: [src/types/chart.ts:98](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L98)

Whether newer data is available after the current range.
Set to false when displaying real-time data at the latest point.

***

### hasMoreBefore

> **hasMoreBefore**: `boolean`

Defined in: [src/types/chart.ts:92](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/chart.ts#L92)

Whether older (historical) data is available before the current range.
Set to false when user has scrolled to the beginning of available history.
