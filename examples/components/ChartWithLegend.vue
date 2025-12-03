<!--
  ChartWithLegend.vue - Chart with Custom Legend Example

  Demonstrates:
  - Custom legend component
  - Series visibility toggling
  - Real-time value display
  - Legend positioning
-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from 'vue';
import {
  createChart,
  type IChartApi,
  type ISeriesApi,
  type MouseEventParams,
} from 'lightweight-charts';

interface SeriesInfo {
  name: string;
  color: string;
  visible: boolean;
  currentValue: number | null;
}

const chartContainer = ref<HTMLDivElement | null>(null);
const chart = ref<IChartApi | null>(null);
const series = reactive<{
  price: ISeriesApi<'Line'> | null;
  sma20: ISeriesApi<'Line'> | null;
  sma50: ISeriesApi<'Line'> | null;
}>({
  price: null,
  sma20: null,
  sma50: null,
});

const legend = reactive<Record<string, SeriesInfo>>({
  price: { name: 'Price', color: '#2196F3', visible: true, currentValue: null },
  sma20: { name: 'SMA(20)', color: '#FF9800', visible: true, currentValue: null },
  sma50: { name: 'SMA(50)', color: '#4CAF50', visible: true, currentValue: null },
});

// Generate price data
function generatePriceData(count: number) {
  const data = [];
  let baseTime = Math.floor(Date.now() / 1000) - count * 86400;
  let price = 100;

  for (let i = 0; i < count; i++) {
    const change = (Math.random() - 0.5) * 4;
    price = Math.max(50, price + change);

    data.push({
      time: baseTime + i * 86400,
      value: Math.round(price * 100) / 100,
    });
  }

  return data;
}

// Calculate SMA
function calculateSMA(data: Array<{ time: number; value: number }>, period: number) {
  const sma = [];

  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) continue;

    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += data[i - j].value;
    }

    sma.push({
      time: data[i].time,
      value: Math.round((sum / period) * 100) / 100,
    });
  }

  return sma;
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

  // Add series
  series.price = chart.value.addLineSeries({
    color: legend.price.color,
    lineWidth: 2,
  });

  series.sma20 = chart.value.addLineSeries({
    color: legend.sma20.color,
    lineWidth: 2,
  });

  series.sma50 = chart.value.addLineSeries({
    color: legend.sma50.color,
    lineWidth: 2,
  });

  // Generate and set data
  const priceData = generatePriceData(100);
  const sma20Data = calculateSMA(priceData, 20);
  const sma50Data = calculateSMA(priceData, 50);

  series.price.setData(priceData);
  series.sma20.setData(sma20Data);
  series.sma50.setData(sma50Data);

  // Update current values
  legend.price.currentValue = priceData[priceData.length - 1].value;
  legend.sma20.currentValue = sma20Data[sma20Data.length - 1].value;
  legend.sma50.currentValue = sma50Data[sma50Data.length - 1].value;

  // Add crosshair move handler
  chart.value.subscribeCrosshairMove((param: MouseEventParams) => {
    if (!param.time || !param.seriesData) return;

    const priceData = param.seriesData.get(series.price!);
    const sma20Data = param.seriesData.get(series.sma20!);
    const sma50Data = param.seriesData.get(series.sma50!);

    legend.price.currentValue = priceData ? (priceData as any).value : null;
    legend.sma20.currentValue = sma20Data ? (sma20Data as any).value : null;
    legend.sma50.currentValue = sma50Data ? (sma50Data as any).value : null;
  });

  chart.value.timeScale().fitContent();
}

function toggleSeries(key: keyof typeof series) {
  const seriesInstance = series[key];
  if (!seriesInstance) return;

  legend[key].visible = !legend[key].visible;

  seriesInstance.applyOptions({
    visible: legend[key].visible,
  });
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
  <div class="legend-demo">
    <header>
      <h1>Chart with Interactive Legend</h1>
      <p>Toggle series visibility and view real-time values</p>
    </header>

    <div class="chart-wrapper">
      <div class="custom-legend">
        <div
          v-for="(info, key) in legend"
          :key="key"
          class="legend-item"
          :class="{ disabled: !info.visible }"
          @click="toggleSeries(key as keyof typeof series)"
        >
          <span class="legend-color" :style="{ background: info.color }"></span>
          <span class="legend-name">{{ info.name }}</span>
          <span class="legend-value">
            {{ info.currentValue !== null ? info.currentValue.toFixed(2) : '-' }}
          </span>
        </div>
      </div>

      <div ref="chartContainer" class="chart-container" />
    </div>

    <section class="info">
      <h2>About Interactive Legends</h2>
      <p>
        Custom legends enhance user experience by providing series information and controls.
        Click legend items to toggle series visibility.
      </p>

      <h3>Features</h3>
      <ul>
        <li><strong>Real-time Values:</strong> Display current or crosshair values</li>
        <li><strong>Visibility Toggle:</strong> Show/hide series on click</li>
        <li><strong>Color Coding:</strong> Visual association with series</li>
        <li><strong>Custom Positioning:</strong> Place legend anywhere on the chart</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.legend-demo {
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

.chart-wrapper {
  position: relative;
  margin-bottom: 2rem;
}

.custom-legend {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
  background: rgba(255, 255, 255, 0.95);
  padding: 0.75rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: background 0.2s;
}

.legend-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

.legend-item.disabled {
  opacity: 0.4;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-name {
  font-weight: 600;
  min-width: 60px;
}

.legend-value {
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.875rem;
  color: #666;
  margin-left: auto;
}

.chart-container {
  width: 100%;
  height: 400px;
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
</style>
