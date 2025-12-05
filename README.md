# @lightweight-charts-pro/vue3

[![npm version](https://img.shields.io/npm/v/@lightweight-charts-pro/vue3.svg)](https://www.npmjs.com/package/@lightweight-charts-pro/vue3)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

Vue 3 components for [TradingView Lightweight Charts](https://github.com/tradingview/lightweight-charts) with advanced features including REST/WebSocket integration, lazy loading, custom series types, and multi-pane support.

## Features

✨ **Vue 3 Integration** - Reactive data binding with Vue 3 Composition API
📊 **Custom Series Types** - Band, Ribbon, Signal, Trend Fill, and more
🔄 **Real-time Updates** - WebSocket support for live data streaming
📡 **REST API Integration** - Built-in HTTP client for data fetching
♾️ **Lazy Loading** - Infinite scroll pagination for large datasets
🎨 **Multi-Pane Layouts** - Create complex dashboards with multiple chart panes
📈 **Trade Visualization** - Display trades as markers, rectangles, or zones
🎯 **TypeScript First** - Full type safety with comprehensive type definitions
🔧 **Composables** - Reusable logic via Vue composables
📚 **Well Documented** - Extensive JSDoc and examples

## Installation

```bash
npm install @lightweight-charts-pro/vue3 lightweight-charts
```

Or with yarn:

```bash
yarn add @lightweight-charts-pro/vue3 lightweight-charts
```

## Quick Start

### Basic Chart

```vue
<template>
  <LightweightChart
    chart-id="my-chart"
    :series="series"
    :options="chartOptions"
    @ready="onChartReady"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { LightweightChart } from '@lightweight-charts-pro/vue3';

const chartOptions = ref({
  layout: {
    background: { color: '#1e1e1e' },
    textColor: '#d4d4dc',
  },
  grid: {
    vertLines: { color: '#2a2e39' },
    horzLines: { color: '#2a2e39' },
  },
});

const series = ref([
  {
    seriesType: 'candlestick',
    seriesId: 'price',
    data: [
      { time: '2024-01-01', open: 100, high: 110, low: 95, close: 105 },
      { time: '2024-01-02', open: 105, high: 115, low: 100, close: 110 },
      { time: '2024-01-03', open: 110, high: 120, low: 105, close: 115 },
    ],
  },
]);

function onChartReady(chart) {
  console.log('Chart is ready!', chart);
}
</script>
```

### Component-Based Approach (Vue-Idiomatic)

```vue
<template>
  <LightweightChart chart-id="my-chart">
    <CandlestickSeries
      series-id="price"
      :data="priceData"
      up-color="#26a69a"
      down-color="#ef5350"
    >
      <Marker :time="'2024-01-02'" position="above" color="green" text="Buy" />
      <PriceLine :price="120" color="red" title="Resistance" />
    </CandlestickSeries>

    <LineSeries
      series-id="sma20"
      :data="smaData"
      color="#2196F3"
      line-width="2"
    />

    <Legend corner="top-left" />
    <RangeSwitcher corner="top-right" />
  </LightweightChart>
</template>

<script setup lang="ts">
import {
  LightweightChart,
  CandlestickSeries,
  LineSeries,
  Marker,
  PriceLine,
  Legend,
  RangeSwitcher,
} from '@lightweight-charts-pro/vue3';

const priceData = ref([/* ... */]);
const smaData = ref([/* ... */]);
</script>
```

### Real-time Updates with WebSocket

```vue
<template>
  <LightweightChart
    chart-id="realtime-chart"
    :series="series"
    ws-url="ws://localhost:8000/ws/chart/my-chart"
    auto-connect
    @connected="onConnected"
    @data-update="onDataUpdate"
  />
</template>

<script setup lang="ts">
const series = ref([
  {
    seriesType: 'line',
    seriesId: 'price',
    data: [],
  },
]);

function onConnected() {
  console.log('WebSocket connected!');
}

function onDataUpdate(data) {
  console.log('Received update:', data);
}
</script>
```

### Lazy Loading for Large Datasets

```vue
<template>
  <LightweightChart
    chart-id="lazy-chart"
    :series="series"
    api-url="http://localhost:8000/api/charts"
    :lazy-loading="true"
  />
</template>

<script setup lang="ts">
const series = ref([
  {
    seriesType: 'candlestick',
    seriesId: 'AAPL',
    data: [], // Will be loaded on demand
    lazyLoading: {
      enabled: true,
      chunkSize: 500,
      hasMoreBefore: true,
      hasMoreAfter: false,
    },
  },
]);
</script>
```

### Multi-Pane Charts

```vue
<template>
  <LightweightChart chart-id="multi-pane">
    <ChartPane :pane-id="0" :height-ratio="0.7">
      <CandlestickSeries series-id="price" :data="priceData" />
    </ChartPane>

    <ChartPane :pane-id="1" :height-ratio="0.3">
      <HistogramSeries series-id="volume" :data="volumeData" />
    </ChartPane>
  </LightweightChart>
</template>
```

## API Reference

### Components

#### `<LightweightChart>`

Main chart container component.

**Props:**
- `chartId` (string, required) - Unique identifier for the chart
- `apiUrl` (string) - Base URL for REST API integration
- `wsUrl` (string) - WebSocket URL for real-time updates
- `options` (ChartOptions) - Chart configuration options
- `series` (SeriesConfig[]) - Initial series configurations
- `autoConnect` (boolean) - Auto-connect to WebSocket on mount
- `autoFit` (boolean) - Auto-fit content on data changes
- `lazyLoading` (boolean) - Enable lazy loading
- `showLoadingIndicator` (boolean) - Show loading spinner
- `showErrorIndicator` (boolean) - Show error messages
- `showEmptyState` (boolean) - Show empty state when no data

**Events:**
- `@ready` - Emitted when chart is ready
- `@crosshairMove` - Emitted on crosshair movement
- `@click` - Emitted on chart click
- `@connected` - Emitted when WebSocket connects
- `@disconnected` - Emitted when WebSocket disconnects
- `@error` - Emitted on errors
- `@dataLoaded` - Emitted when data is loaded

#### Series Components

- `<LineSeries>` - Line chart series
- `<AreaSeries>` - Area chart series
- `<CandlestickSeries>` - OHLC candlestick series
- `<BarSeries>` - OHLC bar series
- `<HistogramSeries>` - Histogram series
- `<BaselineSeries>` - Baseline series with fill
- `<BandSeries>` - Upper/lower band (Bollinger, Keltner)
- `<RibbonSeries>` - Multi-line ribbon (EMA fans)
- `<SignalSeries>` - Buy/sell signal markers
- `<TrendFillSeries>` - Trend-based fill zones
- `<GradientRibbonSeries>` - Gradient-filled ribbon

#### Feature Components

- `<Marker>` - Time-based markers (arrows, shapes)
- `<PriceLine>` - Horizontal price level lines
- `<Trade>` - Trade entry/exit visualization
- `<Annotation>` - Text/shape annotations

#### UI Primitives

- `<Legend>` - Interactive legend
- `<RangeSwitcher>` - Quick time range selection (1D, 1W, 1M, etc.)
- `<ChartPane>` - Multi-pane layout component

### Composables

#### `useChartApi(options)`

REST API client for manual data management.

```typescript
import { useChartApi } from '@lightweight-charts-pro/vue3';

const api = useChartApi({ baseUrl: 'http://localhost:8000' });

// Fetch historical data
const data = await api.getHistory({
  chartId: 'my-chart',
  seriesId: 'AAPL',
  beforeTime: 1234567890,
  count: 500,
});

// Update series data
await api.setSeriesData({
  chartId: 'my-chart',
  seriesId: 'AAPL',
  data: newData,
});
```

#### `useChartWebSocket(config, handlers)`

WebSocket client for real-time data.

```typescript
import { useChartWebSocket } from '@lightweight-charts-pro/vue3';

const ws = useChartWebSocket(
  {
    url: 'ws://localhost:8000/ws/chart/my-chart',
    chartId: 'my-chart',
    reconnect: { enabled: true, maxAttempts: 5 },
  },
  {
    onConnected: () => console.log('Connected'),
    onDataUpdate: (data) => console.log('Update:', data),
    onError: (err) => console.error('Error:', err),
  }
);

ws.connect();
```

#### `useLazyLoading(chart, options)`

Infinite scroll pagination for time-series data.

```typescript
import { useLazyLoading } from '@lightweight-charts-pro/vue3';

const { isLoading, syncBounds } = useLazyLoading(chart, {
  onRequestHistory: async (seriesId, paneId, beforeTime, direction, count) => {
    const data = await fetchHistoricalData(seriesId, beforeTime, count);
    return data;
  },
  onHistoryLoaded: (seriesId, count) => {
    console.log(`Loaded ${count} bars for ${seriesId}`);
  },
});
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import type {
  ChartOptions,
  SeriesConfig,
  DataPoint,
  ChartProps,
  SeriesMarker,
  CreatePriceLineOptions,
  TradeConfig,
} from '@lightweight-charts-pro/vue3';
```

## Examples

Check out the [examples](./examples) directory for more comprehensive examples:

- Basic charts
- Real-time updates
- Lazy loading
- Multi-pane layouts
- Custom indicators
- Trade visualization

## Development

```bash
# Install dependencies
npm install

# Run development build
npm run dev

# Run tests
npm test

# Type check
npm run type-check

# Lint
npm run lint

# Build for production
npm run build
```

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) first.

## License

MIT © [Nand Kapadia](https://github.com/nandkapadia)

## Acknowledgments

- [TradingView Lightweight Charts](https://github.com/tradingview/lightweight-charts) - The underlying charting library
- [Vue.js](https://vuejs.org/) - The progressive JavaScript framework

## Related Projects

- [@lightweight-charts-pro/core](https://github.com/nandkapadia/lightweight-charts-pro-frontend) - Core utilities and custom series types
- [lightweight-charts](https://github.com/tradingview/lightweight-charts) - TradingView Lightweight Charts library

## Support

- 📖 [Documentation](https://github.com/nandkapadia/vue-lightweight-charts-pro#readme)
- 🐛 [Issue Tracker](https://github.com/nandkapadia/vue-lightweight-charts-pro/issues)
- 💬 [Discussions](https://github.com/nandkapadia/vue-lightweight-charts-pro/discussions)
