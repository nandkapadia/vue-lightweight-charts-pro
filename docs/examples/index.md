# Examples

## Basic Chart

```vue
<script setup>
import { ref } from 'vue';
import { LightweightChart, CandlestickSeries } from '@lightweight-charts-pro/vue3';

const data = ref([
  { time: '2024-01-01', open: 100, high: 105, low: 98, close: 103 },
  // ... more data
]);
</script>

<template>
  <LightweightChart chart-id="chart">
    <CandlestickSeries :data="data" />
  </LightweightChart>
</template>
```

More examples coming soon!
