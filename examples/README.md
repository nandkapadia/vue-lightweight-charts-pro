# Vue3 Lightweight Charts Examples

This directory contains examples for using the Vue3 components and composables
that integrate with the FastAPI backend for TradingView Lightweight Charts.

## Directory Structure

```
examples/
├── quick-start/           # Minimal examples to get started
│   ├── BasicChart.vue     # Simple chart component usage
│   └── App.vue            # Complete app setup
│
├── chart-types/           # Different chart visualizations
│   ├── CandlestickChart.vue # OHLC candlestick charts
│   ├── AreaChart.vue      # Area charts with gradients
│   ├── BarChart.vue       # OHLC bar charts
│   ├── BaselineChart.vue  # Baseline comparison charts
│   ├── HistogramChart.vue # Volume histograms
│   └── LineChart.vue      # Line charts with multiple series
│
├── trading-features/      # Trading-specific visualizations
│   ├── MarkersExample.vue # Buy/sell markers and signals
│   ├── TradesVisualization.vue # Trade entry/exit points with P&L
│   └── PriceLinesAnnotations.vue # Support/resistance levels
│
├── custom-styling/        # Themes and styling
│   └── ThemesExample.vue  # Light/dark themes and custom colors
│
├── composables/           # Using the Vue composables
│   ├── UseChartApi.vue    # REST API integration
│   ├── UseWebSocket.vue   # Real-time updates via WebSocket
│   └── UseLazyLoading.vue # Infinite history loading
│
├── components/            # Component patterns
│   ├── MultiPane.vue      # Multi-pane chart layout
│   ├── ChartWithLegend.vue # Interactive custom legend
│   └── LinkedCharts.vue   # Synchronized time scales
│
├── real-time/             # Real-time data patterns
│   ├── StreamingData.vue  # WebSocket streaming updates
│   └── LiveTrades.vue     # Real-time trade visualization
│
└── advanced/              # Advanced patterns
    ├── LazyHistory.vue    # Infinite scroll with lazy loading
    ├── SmartChunking.vue  # Large dataset auto-chunking
    └── Dashboard.vue      # Multi-chart dashboard
```

## Prerequisites

1. **Backend server running:**
   ```bash
   cd packages/backend
   uvicorn lightweight_charts_backend.app:create_app --factory --reload
   ```

2. **Vue3 package installed:**
   ```bash
   cd packages/vue3
   npm install
   ```

## Quick Start

### 1. Install the package

```bash
npm install @lightweight-charts-pro/vue3
```

### 2. Basic Usage

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { LightweightChart, useChartApi } from '@lightweight-charts-pro/vue3';

const { getChart, isLoading } = useChartApi({
  baseUrl: 'http://localhost:8000/api/charts'
});

const chartData = ref(null);

onMounted(async () => {
  chartData.value = await getChart('my-chart');
});
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <LightweightChart v-else :data="chartData" />
</template>
```

## Examples by Category

### 📊 Chart Types
Learn about different chart visualizations:

- **[CandlestickChart.vue](chart-types/CandlestickChart.vue)** - Traditional OHLC candlestick charts
- **[AreaChart.vue](chart-types/AreaChart.vue)** - Area charts with gradient fills
- **[BarChart.vue](chart-types/BarChart.vue)** - OHLC bar charts
- **[BaselineChart.vue](chart-types/BaselineChart.vue)** - Baseline charts for profit/loss visualization
- **[HistogramChart.vue](chart-types/HistogramChart.vue)** - Volume histograms with custom colors
- **[LineChart.vue](chart-types/LineChart.vue)** - Multi-series line charts

### 📈 Trading Features
Trading-specific visualizations and tools:

- **[MarkersExample.vue](trading-features/MarkersExample.vue)** - Chart markers for buy/sell signals
- **[TradesVisualization.vue](trading-features/TradesVisualization.vue)** - Visualize trades with entry/exit points
- **[PriceLinesAnnotations.vue](trading-features/PriceLinesAnnotations.vue)** - Support/resistance levels and price targets

### 🎨 Custom Styling
Themes and appearance customization:

- **[ThemesExample.vue](custom-styling/ThemesExample.vue)** - Light/dark themes and custom color schemes

### 🔌 Composables
Vue composables for API integration:

- **[UseChartApi.vue](composables/UseChartApi.vue)** - REST API integration for chart data
- **[UseWebSocket.vue](composables/UseWebSocket.vue)** - Real-time updates via WebSocket
- **[UseLazyLoading.vue](composables/UseLazyLoading.vue)** - Infinite scroll history loading

### 🧩 Components
Advanced component patterns:

- **[MultiPane.vue](components/MultiPane.vue)** - Multi-pane charts (price + volume + indicators)
- **[ChartWithLegend.vue](components/ChartWithLegend.vue)** - Interactive custom legend with series toggling
- **[LinkedCharts.vue](components/LinkedCharts.vue)** - Synchronized charts with linked time scales

### ⚡ Real-time
Live data streaming patterns:

- **[StreamingData.vue](real-time/StreamingData.vue)** - WebSocket streaming data updates
- **[LiveTrades.vue](real-time/LiveTrades.vue)** - Real-time trade visualization

### 🚀 Advanced
Advanced features and optimizations:

- **[LazyHistory.vue](advanced/LazyHistory.vue)** - Infinite scroll with lazy loading
- **[SmartChunking.vue](advanced/SmartChunking.vue)** - Automatic chunking for large datasets
- **[Dashboard.vue](advanced/Dashboard.vue)** - Multi-chart dashboard

## Running Examples

Each example can be run in a Vue3 project:

```bash
# Create a new Vue3 project
npm create vue@latest my-chart-app
cd my-chart-app

# Install dependencies
npm install @lightweight-charts-pro/vue3 lightweight-charts

# Copy an example file to src/App.vue and run
npm run dev
```

## API Reference

### Composables

| Composable | Description |
|------------|-------------|
| `useChartApi` | REST API client for chart data |
| `useChartWebSocket` | WebSocket client for real-time updates |
| `useLazyLoading` | Automatic history loading on scroll |

### Components

| Component | Description |
|-----------|-------------|
| `LightweightChart` | Main chart component |
| `ChartPane` | Individual pane within a chart |

## Backend API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/charts/{chart_id}` | GET | Get chart data |
| `/api/charts/{chart_id}` | POST | Create chart |
| `/api/charts/{chart_id}/data/{series_id}` | POST | Set series data |
| `/api/charts/{chart_id}/data/{pane_id}/{series_id}` | GET | Get series data |
| `/api/charts/{chart_id}/history/{pane_id}/{series_id}` | GET | Get history chunk |
| `/ws/charts/{chart_id}` | WebSocket | Real-time updates |
