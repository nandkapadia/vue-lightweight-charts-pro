<!--
  SmartChunking.vue - Smart Data Chunking Example

  Demonstrates:
  - Automatic chunking for large datasets
  - Initial viewport optimization
  - Memory-efficient data handling
  - Backend smart chunking behavior
-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { createChart, type IChartApi, type ISeriesApi } from 'lightweight-charts';
import { useChartApi } from '@lightweight-charts-pro/vue3';

const chartContainer = ref<HTMLDivElement | null>(null);
const chart = ref<IChartApi | null>(null);
const candlestickSeries = ref<ISeriesApi<'Candlestick'> | null>(null);

const datasetSize = ref(1000);
const chunkingEnabled = ref(true);
const stats = ref({
  totalPoints: 0,
  loadedPoints: 0,
  chunked: false,
  loadTime: 0,
});

const { createChart: createChartApi, setSeriesData, getSeriesData, isLoading } = useChartApi({
  baseUrl: 'http://localhost:8000/api/charts',
});

// Generate sample data
function generateData(count: number) {
  const data = [];
  let baseTime = Math.floor(Date.now() / 1000) - count * 86400;
  let price = 100;

  for (let i = 0; i < count; i++) {
    const change = (Math.random() - 0.5) * 4;
    price = Math.max(50, price + change);

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

  loadData();
}

async function loadData() {
  if (!candlestickSeries.value || !chart.value) return;

  const startTime = performance.now();
  const data = generateData(datasetSize.value);

  stats.value.totalPoints = data.length;

  // Simulate smart chunking behavior
  if (chunkingEnabled.value && data.length >= 500) {
    // Backend would chunk data - show only visible portion
    const visiblePortion = data.slice(Math.max(0, data.length - 200));
    candlestickSeries.value.setData(visiblePortion);
    stats.value.loadedPoints = visiblePortion.length;
    stats.value.chunked = true;
  } else {
    // Load all data
    candlestickSeries.value.setData(data);
    stats.value.loadedPoints = data.length;
    stats.value.chunked = false;
  }

  const endTime = performance.now();
  stats.value.loadTime = Math.round(endTime - startTime);

  chart.value.timeScale().fitContent();
}

function handleResize() {
  if (chart.value && chartContainer.value) {
    chart.value.applyOptions({ width: chartContainer.value.clientWidth });
  }
}

function updateDataset() {
  loadData();
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
  <div class="chunking-demo">
    <header>
      <h1>Smart Data Chunking</h1>
      <p>Automatic optimization for large datasets</p>
    </header>

    <div class="controls-panel">
      <div class="control-group">
        <label>
          Dataset Size:
          <input
            v-model.number="datasetSize"
            type="number"
            min="100"
            max="10000"
            step="100"
            @change="updateDataset"
          />
        </label>
        <label class="checkbox-label">
          <input v-model="chunkingEnabled" type="checkbox" @change="updateDataset" />
          Enable Smart Chunking
        </label>
        <button @click="updateDataset" :disabled="isLoading">
          {{ isLoading ? 'Loading...' : 'Reload Data' }}
        </button>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">Total Points</div>
          <div class="stat-value">{{ stats.totalPoints.toLocaleString() }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Loaded Points</div>
          <div class="stat-value">{{ stats.loadedPoints.toLocaleString() }}</div>
        </div>
        <div class="stat-card" :class="{ chunked: stats.chunked }">
          <div class="stat-label">Chunked</div>
          <div class="stat-value">{{ stats.chunked ? 'Yes' : 'No' }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Load Time</div>
          <div class="stat-value">{{ stats.loadTime }}ms</div>
        </div>
      </div>
    </div>

    <div ref="chartContainer" class="chart-container" />

    <section class="info">
      <h2>About Smart Chunking</h2>
      <p>
        Smart chunking automatically optimizes data loading based on dataset size. For large
        datasets (&gt;= 500 points), only the visible portion is initially loaded, significantly
        improving performance.
      </p>

      <h3>Chunking Behavior</h3>
      <table class="behavior-table">
        <thead>
          <tr>
            <th>Dataset Size</th>
            <th>Initial Load</th>
            <th>Chunked</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>&lt; 500 points</td>
            <td>All data</td>
            <td>No</td>
          </tr>
          <tr>
            <td>&gt;= 500 points</td>
            <td>Visible portion (~200 points)</td>
            <td>Yes</td>
          </tr>
        </tbody>
      </table>

      <h3>Benefits</h3>
      <ul>
        <li><strong>Faster Initial Load:</strong> Only loads what's visible</li>
        <li><strong>Reduced Memory:</strong> Lower memory footprint for large datasets</li>
        <li><strong>Automatic:</strong> Backend handles chunking logic</li>
        <li><strong>On-Demand:</strong> Additional data loaded as needed</li>
      </ul>

      <h3>How to Use</h3>
      <ol>
        <li>Send full dataset to backend via setSeriesData()</li>
        <li>Backend automatically chunks if size &gt;= 500</li>
        <li>getSeriesData() returns chunked response with metadata</li>
        <li>Use lazy loading to fetch additional chunks</li>
      </ol>

      <div class="code-sample">
        <h3>Example Usage</h3>
        <pre><code>// Set large dataset (backend will chunk automatically)
await setSeriesData(chartId, 'price', {
  pane_id: 0,
  series_type: 'candlestick',
  data: largeDataset // e.g., 5000 points
});

// Get data (returns chunked if dataset >= 500)
const response = await getSeriesData(chartId, 0, 'price');

console.log(response.chunked); // true
console.log(response.totalCount); // 5000
console.log(response.data.length); // ~200 (visible portion)
console.log(response.hasMoreBefore); // true

// Load more data as needed
if (response.hasMoreBefore) {
  const history = await getHistory(
    chartId, 0, 'price',
    response.data[0].time,
    100
  );
}</code></pre>
      </div>
    </section>
  </div>
</template>

<style scoped>
.chunking-demo {
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

.controls-panel {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.control-group {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.control-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.control-group input[type='number'] {
  width: 100px;
  padding: 0.25rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.checkbox-label {
  cursor: pointer;
}

.control-group button {
  padding: 0.5rem 1rem;
  background: #26a69a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.control-group button:hover:not(:disabled) {
  background: #2bbbad;
}

.control-group button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.stat-card {
  background: #fff;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
  border-left: 4px solid #ccc;
}

.stat-card.chunked {
  border-left-color: #2196F3;
}

.stat-label {
  font-size: 0.75rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
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

.behavior-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
}

.behavior-table th,
.behavior-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.behavior-table th {
  background: #e0e0e0;
  font-weight: 600;
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
