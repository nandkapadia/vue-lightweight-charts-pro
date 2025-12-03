<!--
  BaselineChart.vue - Baseline Chart Example

  Demonstrates:
  - Baseline series with reference level
  - Different colors above/below baseline
  - Profit/loss visualization
  - Custom baseline value
-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { createChart, type IChartApi, type ISeriesApi } from 'lightweight-charts';

const chartContainer = ref<HTMLDivElement | null>(null);
const chart = ref<IChartApi | null>(null);
const baselineSeries = ref<ISeriesApi<'Baseline'> | null>(null);
const baselineValue = ref(100);

// Generate data that oscillates around baseline
function generateBaselineData(count: number, baseline: number) {
  const data = [];
  let baseTime = Math.floor(Date.now() / 1000) - count * 86400;

  for (let i = 0; i < count; i++) {
    const wave = Math.sin(i / 10) * 20;
    const noise = (Math.random() - 0.5) * 10;
    const value = baseline + wave + noise;

    data.push({
      time: baseTime + i * 86400,
      value: Math.round(value * 100) / 100,
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

  baselineSeries.value = chart.value.addBaselineSeries({
    baseValue: { type: 'price', price: baselineValue.value },
    topLineColor: '#26a69a',
    topFillColor1: 'rgba(38, 166, 154, 0.28)',
    topFillColor2: 'rgba(38, 166, 154, 0.05)',
    bottomLineColor: '#ef5350',
    bottomFillColor1: 'rgba(239, 83, 80, 0.05)',
    bottomFillColor2: 'rgba(239, 83, 80, 0.28)',
  });

  const data = generateBaselineData(100, baselineValue.value);
  baselineSeries.value.setData(data);
  chart.value.timeScale().fitContent();
}

function updateBaseline() {
  if (!baselineSeries.value) return;

  baselineSeries.value.applyOptions({
    baseValue: { type: 'price', price: baselineValue.value },
  });

  const data = generateBaselineData(100, baselineValue.value);
  baselineSeries.value.setData(data);
  chart.value?.timeScale().fitContent();
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
      <h1>Baseline Chart</h1>
      <p>Visualize values relative to a baseline reference</p>
    </header>

    <div class="controls">
      <label>
        Baseline Value:
        <input v-model.number="baselineValue" type="number" step="10" @change="updateBaseline" />
      </label>
      <button @click="updateBaseline">Update</button>
    </div>

    <div ref="chartContainer" class="chart-container" />

    <section class="info">
      <h2>About Baseline Charts</h2>
      <p>
        Baseline charts help visualize performance relative to a reference value. Values above
        the baseline are shown in one color (typically green for positive), while values below
        are shown in another (typically red for negative).
      </p>
      <ul>
        <li><strong>Baseline:</strong> Reference value for comparison</li>
        <li><strong>Above Baseline:</strong> Green gradient indicates positive performance</li>
        <li><strong>Below Baseline:</strong> Red gradient indicates negative performance</li>
        <li><strong>Use Cases:</strong> Profit/loss, performance tracking, target comparisons</li>
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

.controls {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
}

.controls label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.controls input {
  width: 100px;
  padding: 0.25rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.controls button {
  padding: 0.5rem 1rem;
  background: #26a69a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.controls button:hover {
  background: #2bbbad;
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
