<!--
  LazyHistory.vue - Lazy Loading History Example

  Demonstrates:
  - Infinite scroll for historical data
  - On-demand history loading
  - useLazyLoading composable
  - Efficient large dataset handling
-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { createChart, type IChartApi, type ISeriesApi } from 'lightweight-charts';
import { useLazyLoading } from '@lightweight-charts-pro/vue3';

const chartContainer = ref<HTMLDivElement | null>(null);
const chart = ref<IChartApi | null>(null);
const candlestickSeries = ref<ISeriesApi<'Candlestick'> | null>(null);

const chartId = 'lazy-history-demo';
const loadedChunks = ref(0);
const totalDataPoints = ref(5000); // Simulate large dataset

// Initialize lazy loading
const { startLazyLoading, stopLazyLoading, isLoading } = useLazyLoading({
  baseUrl: 'http://localhost:8000/api/charts',
  chartId,
  onHistoryLoad: (data) => {
    if (candlestickSeries.value && data.length > 0) {
      loadedChunks.value++;
      console.log(`Loaded chunk ${loadedChunks.value} with ${data.length} points`);
    }
  },
});

// Generate sample data (simulating server-side data)
function generateHistoricalData(startIdx: number, count: number) {
  const data = [];
  let baseTime = Math.floor(Date.now() / 1000) - (startIdx + count) * 86400;
  let price = 100 + Math.sin(startIdx / 50) * 20;

  for (let i = 0; i < count; i++) {
    const trend = Math.sin((startIdx + i) / 20) * 2;
    const noise = (Math.random() - 0.5) * 3;
    price = Math.max(50, price + trend / 5 + noise);

    const spread = price * 0.02;
    const open = price + (Math.random() - 0.5) * spread;
    const close = price + (Math.random() - 0.5) * spread;
    const high = Math.max(open, close) + Math.random() * spread;
    const low = Math.min(open, close) - Math.random() * spread;

    data.push({
      time: baseTime + i * 86400,
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
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

  candlestickSeries.value = chart.value.addCandlestickSeries({
    upColor: '#26a69a',
    downColor: '#ef5350',
    borderVisible: false,
    wickUpColor: '#26a69a',
    wickDownColor: '#ef5350',
  });

  // Load initial data (most recent 200 points)
  const initialData = generateHistoricalData(0, 200);
  candlestickSeries.value.setData(initialData);
  loadedChunks.value = 1;

  chart.value.timeScale().fitContent();

  // Start lazy loading for historical data
  // In a real app, this would fetch from the backend
  startLazyLoading(chart.value, 0, 'price');
}

function handleResize() {
  if (chart.value && chartContainer.value) {
    chart.value.applyOptions({ width: chartContainer.value.clientWidth });
  }
}

function resetChart() {
  if (!candlestickSeries.value || !chart.value) return;

  const initialData = generateHistoricalData(0, 200);
  candlestickSeries.value.setData(initialData);
  loadedChunks.value = 1;
  chart.value.timeScale().fitContent();
}

onMounted(() => {
  initializeChart();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  stopLazyLoading();
  window.removeEventListener('resize', handleResize);
  chart.value?.remove();
});
</script>

<template>
  <div class="lazy-history-demo">
    <header>
      <h1>Lazy Loading History</h1>
      <p>Infinite scroll with on-demand historical data loading</p>
    </header>

    <div class="stats-bar">
      <div class="stat">
        <span class="stat-label">Loaded Chunks:</span>
        <span class="stat-value">{{ loadedChunks }}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Total Available:</span>
        <span class="stat-value">{{ totalDataPoints }} points</span>
      </div>
      <div class="stat">
        <span class="stat-label">Status:</span>
        <span class="stat-value" :class="{ loading: isLoading }">
          {{ isLoading ? 'Loading...' : 'Ready' }}
        </span>
      </div>
      <button @click="resetChart" class="reset-btn">Reset</button>
    </div>

    <div ref="chartContainer" class="chart-container" />

    <section class="info">
      <h2>About Lazy Loading</h2>
      <p>
        Lazy loading enables efficient handling of large datasets by loading historical data
        only when needed. As you scroll left (into history), additional data chunks are
        automatically fetched and prepended to the chart.
      </p>

      <h3>How It Works</h3>
      <ol>
        <li>Initial load displays recent data (e.g., last 200 points)</li>
        <li>User scrolls left to view older data</li>
        <li>When approaching the edge, a new chunk is automatically fetched</li>
        <li>New data is seamlessly prepended to existing series</li>
        <li>Process continues until all historical data is loaded</li>
      </ol>

      <h3>Benefits</h3>
      <ul>
        <li><strong>Performance:</strong> Only loads data that's actually viewed</li>
        <li><strong>Memory Efficient:</strong> Reduces initial memory footprint</li>
        <li><strong>Better UX:</strong> Faster initial load times</li>
        <li><strong>Scalability:</strong> Handle datasets with millions of points</li>
      </ul>

      <div class="code-sample">
        <h3>Using the useLazyLoading Composable</h3>
        <pre><code>import { useLazyLoading } from '@lightweight-charts-pro/vue3';

const { startLazyLoading, stopLazyLoading, isLoading } = useLazyLoading({
  baseUrl: 'http://localhost:8000/api/charts',
  chartId: 'my-chart',
  onHistoryLoad: (data) => {
    console.log(`Loaded ${data.length} historical points`);
  }
});

// Start lazy loading after chart is initialized
onMounted(() => {
  startLazyLoading(chart, paneId, seriesId);
});

// Clean up on unmount
onUnmounted(() => {
  stopLazyLoading();
});</code></pre>
      </div>
    </section>
  </div>
</template>

<style scoped>
.lazy-history-demo {
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

.stats-bar {
  display: flex;
  gap: 2rem;
  align-items: center;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-label {
  font-size: 0.75rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
}

.stat-value.loading {
  color: #2196F3;
}

.reset-btn {
  margin-left: auto;
  padding: 0.5rem 1rem;
  background: #26a69a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.reset-btn:hover {
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

.info h2,
.info h3 {
  margin-top: 0;
}

.info h3 {
  margin: 1.5rem 0 0.5rem;
  font-size: 1rem;
}

.info ol,
.info ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.info li {
  margin-bottom: 0.5rem;
}

.code-sample {
  margin-top: 1.5rem;
  background: #fff;
  padding: 1rem;
  border-radius: 4px;
}

.code-sample pre {
  margin: 0.5rem 0 0;
  background: #1e222d;
  color: #d1d4dc;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}

.code-sample code {
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.875rem;
}
</style>
