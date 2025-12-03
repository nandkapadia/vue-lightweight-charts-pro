<!--
  MarkersExample.vue - Chart Markers Example

  Demonstrates:
  - Adding markers to chart
  - Buy/sell signals
  - Custom marker shapes and colors
  - Marker positioning
-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import {
  createChart,
  type IChartApi,
  type ISeriesApi,
  type SeriesMarker,
  type Time,
} from 'lightweight-charts';

const chartContainer = ref<HTMLDivElement | null>(null);
const chart = ref<IChartApi | null>(null);
const candlestickSeries = ref<ISeriesApi<'Candlestick'> | null>(null);

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

// Generate random buy/sell signals
function generateMarkers(data: Array<{ time: number; close: number }>): SeriesMarker<Time>[] {
  const markers: SeriesMarker<Time>[] = [];

  for (let i = 10; i < data.length - 10; i += Math.floor(5 + Math.random() * 10)) {
    const isBuy = Math.random() > 0.5;

    markers.push({
      time: data[i].time as Time,
      position: isBuy ? 'belowBar' : 'aboveBar',
      color: isBuy ? '#26a69a' : '#ef5350',
      shape: isBuy ? 'arrowUp' : 'arrowDown',
      text: isBuy ? 'Buy' : 'Sell',
    });
  }

  return markers;
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

  const data = generateData(100);
  candlestickSeries.value.setData(data);

  // Add markers
  const markers = generateMarkers(data);
  candlestickSeries.value.setMarkers(markers);

  chart.value.timeScale().fitContent();
}

function addCustomMarker() {
  if (!candlestickSeries.value || !chart.value) return;

  const timeScale = chart.value.timeScale();
  const visibleRange = timeScale.getVisibleRange();
  if (!visibleRange) return;

  // Add marker at center of visible range
  const centerTime = Math.floor((visibleRange.from as number + visibleRange.to as number) / 2);

  const existingMarkers = candlestickSeries.value.markers();
  const newMarker: SeriesMarker<Time> = {
    time: centerTime as Time,
    position: 'aboveBar',
    color: '#2196F3',
    shape: 'circle',
    text: 'Custom',
  };

  candlestickSeries.value.setMarkers([...existingMarkers, newMarker]);
}

function clearMarkers() {
  if (!candlestickSeries.value) return;
  candlestickSeries.value.setMarkers([]);
}

function regenerateSignals() {
  if (!candlestickSeries.value) return;

  const data = candlestickSeries.value.data() as Array<{ time: number; close: number }>;
  const markers = generateMarkers(data);
  candlestickSeries.value.setMarkers(markers);
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
  <div class="markers-demo">
    <header>
      <h1>Chart Markers</h1>
      <p>Buy/sell signals and custom annotations</p>
    </header>

    <div class="controls">
      <button @click="regenerateSignals">Regenerate Signals</button>
      <button @click="addCustomMarker">Add Custom Marker</button>
      <button @click="clearMarkers">Clear All Markers</button>
    </div>

    <div ref="chartContainer" class="chart-container" />

    <section class="info">
      <h2>About Chart Markers</h2>
      <p>
        Markers are visual indicators that highlight specific points on the chart. They're
        commonly used for trade signals, important events, or custom annotations.
      </p>

      <h3>Marker Types</h3>
      <ul>
        <li><strong>arrowUp / arrowDown:</strong> Buy/sell signals</li>
        <li><strong>circle:</strong> General events or custom markers</li>
        <li><strong>square:</strong> Alternative shape for events</li>
      </ul>

      <h3>Marker Properties</h3>
      <ul>
        <li><strong>position:</strong> aboveBar or belowBar</li>
        <li><strong>color:</strong> Custom color for the marker</li>
        <li><strong>text:</strong> Optional label text</li>
        <li><strong>time:</strong> Position on the time axis</li>
      </ul>

      <div class="code-sample">
        <h3>Code Example</h3>
        <pre><code>// Add markers to a series
const markers = [
  {
    time: 1234567890,
    position: 'belowBar',
    color: '#26a69a',
    shape: 'arrowUp',
    text: 'Buy Signal'
  },
  {
    time: 1234654321,
    position: 'aboveBar',
    color: '#ef5350',
    shape: 'arrowDown',
    text: 'Sell Signal'
  }
];

series.setMarkers(markers);</code></pre>
      </div>
    </section>
  </div>
</template>

<style scoped>
.markers-demo {
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
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.controls button {
  padding: 0.5rem 1rem;
  background: #26a69a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
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

.info h2,
.info h3 {
  margin-top: 0;
}

.info h3 {
  margin: 1.5rem 0 0.5rem;
  font-size: 1rem;
}

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
