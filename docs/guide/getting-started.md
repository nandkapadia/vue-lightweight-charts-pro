# Getting Started

## Installation

```bash
npm install @lightweight-charts-pro/vue3 lightweight-charts
```

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { LightweightChart, LineSeries } from '@lightweight-charts-pro/vue3';

const data = ref([
  { time: '2024-01-01', value: 100 },
  { time: '2024-01-02', value: 105 },
  { time: '2024-01-03', value: 103 },
]);
</script>

<template>
  <LightweightChart chart-id="simple-chart" :options="{ height: 300 }">
    <LineSeries :data="data" series-id="price" color="#2196F3" />
  </LightweightChart>
</template>
```

## Next Steps

- [Installation Guide](./installation)
- [API Reference](/api/)
- [Examples](/examples/)
