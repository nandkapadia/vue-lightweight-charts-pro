---
layout: home

hero:
  name: Vue Lightweight Charts Pro
  text: Professional Charting for Vue 3
  tagline: Build beautiful, performant financial charts with TradingView's Lightweight Charts
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/nandkapadia/vue-lightweight-charts-pro

features:
  - icon: 📈
    title: Multiple Chart Types
    details: Candlestick, Line, Area, Bar, Histogram, Baseline, and custom series types.
  - icon: ⚡
    title: Real-time Updates
    details: WebSocket integration with automatic reconnection for live data streaming.
  - icon: 🔄
    title: Lazy Loading
    details: Infinite scroll with automatic history fetching for large datasets.
  - icon: 🎨
    title: Fully Customizable
    details: Markers, annotations, price lines, legends, and range switchers.
  - icon: 📦
    title: TypeScript First
    details: Complete type safety with comprehensive TypeScript definitions.
  - icon: 🧩
    title: Vue 3 Composition API
    details: Built with modern Vue 3 patterns - reactive and composable.
---

## Quick Example

```vue
<script setup>
import { ref } from 'vue';
import { LightweightChart, CandlestickSeries } from '@lightweight-charts-pro/vue3';

const data = ref([
  { time: '2024-01-01', open: 100, high: 105, low: 98, close: 103 },
  { time: '2024-01-02', open: 103, high: 108, low: 101, close: 107 },
]);
</script>

<template>
  <LightweightChart chart-id="my-chart" :options="{ height: 400 }">
    <CandlestickSeries :data="data" />
  </LightweightChart>
</template>
```

## Installation

```bash
npm install @lightweight-charts-pro/vue3 lightweight-charts
```
