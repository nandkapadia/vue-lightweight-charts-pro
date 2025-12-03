<!--
  AreaChart.vue - Area Chart Example

  Demonstrates:
  - Area chart with gradient fill
  - Line with filled area below
  - Custom color schemes
  - Smooth price visualization
-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { createChart, type IChartApi, type ISeriesApi } from 'lightweight-charts';

const chartContainer = ref<HTMLDivElement | null>(null);
const chart = ref<IChartApi | null>(null);
const areaSeries = ref<ISeriesApi<'Area'> | null>(null);

// Generate smooth price data
function generateAreaData(count: number) {
  const data = [];
  let baseTime = Math.floor(Date.now() / 1000) - count * 86400;
  let price = 100;

  for (let i = 0; i < count; i++) {
    const trend = Math.sin(i / 15) * 10 + 5;
    const noise = (Math.random() - 0.5) * 2;
    price = Math.max(50, price + trend / 10 + noise);

    data.push({
      time: baseTime + i * 86400,
      value: Math.round(price * 100) / 100,
    });
  }

  return data;
}

function initializeChart() {
  if (!chartContainer.value) return;

  chart.value = createChart(chartContainer.value, {
    width: chartContainer.value.clientWidth,
    height: 400,
    layout: {
      background: { type: 'solid', color: '#ffffff' },
      textColor: '#333',
    },
    grid: {
      vertLines: { color: '#f0f0f0' },
      horzLines: { color: '#f0f0f0' },
    },
    crosshair: {
      mode: 1,
    },
    rightPriceScale: {
      borderColor: '#d1d4dc',
    },
    timeScale: {
      borderColor: '#d1d4dc',
      timeVisible: true,
      secondsVisible: false,
    },
  });

  areaSeries.value = chart.value.addAreaSeries({
    topColor: 'rgba(33, 150, 243, 0.56)',
    bottomColor: 'rgba(33, 150, 243, 0.04)',
    lineColor: 'rgba(33, 150, 243, 1)',
    lineWidth: 2,
  });

  const data = generateAreaData(100);
  areaSeries.value.setData(data);
  chart.value.timeScale().fitContent();
}

function handleResize() {
  if (chart.value && chartContainer.value) {
    chart.value.applyOptions({ width: chartContainer.value.clientWidth });
  }
}

onMounted(() => {
  initializeChart();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  chart.value?.remove();
});
</script>

<template>
  <div class="chart-demo">
    <header>
      <h1>Area Chart</h1>
      <p>Price visualization with gradient-filled area</p>
    </header>

    <div ref="chartContainer" class="chart-container" />

    <section class="info">
      <h2>About Area Charts</h2>
      <p>
        Area charts combine line charts with filled areas, making it easy to visualize
        trends and patterns over time. They're particularly useful for showing cumulative
        values and comparing multiple datasets.
      </p>
      <ul>
        <li><strong>Gradient Fill:</strong> Visual emphasis on magnitude</li>
        <li><strong>Smooth Lines:</strong> Clear trend visualization</li>
        <li><strong>Use Cases:</strong> Stock prices, metrics over time, comparisons</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.chart-demo {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

header {
  margin-bottom: 1rem;
}

header h1 {
  margin: 0 0 0.5rem;
}

header p {
  color: #666;
  margin: 0;
}

.chart-container {
  width: 100%;
  height: 400px;
  margin-bottom: 2rem;
}

.info {
  background: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
}

.info h2 {
  margin-top: 0;
}

.info ul {
  margin: 1rem 0 0;
  padding-left: 1.5rem;
}

.info li {
  margin-bottom: 0.5rem;
}
</style>
