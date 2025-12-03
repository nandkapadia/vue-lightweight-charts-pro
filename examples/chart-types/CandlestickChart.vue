<!--
  CandlestickChart.vue - Candlestick Chart Example

  Demonstrates:
  - Basic candlestick chart
  - OHLC data visualization
  - Custom colors for up/down candles
  - Volume indicators
-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { createChart, type IChartApi, type ISeriesApi } from 'lightweight-charts';

const chartContainer = ref<HTMLDivElement | null>(null);
const chart = ref<IChartApi | null>(null);
const candlestickSeries = ref<ISeriesApi<'Candlestick'> | null>(null);

// Generate realistic OHLC data
function generateCandlestickData(count: number) {
  const data = [];
  let baseTime = Math.floor(Date.now() / 1000) - count * 86400;
  let price = 100;

  for (let i = 0; i < count; i++) {
    const trend = Math.sin(i / 10) * 2;
    const change = (Math.random() - 0.5) * 4 + trend;
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

  const data = generateCandlestickData(100);
  candlestickSeries.value.setData(data);
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
      <h1>Candlestick Chart</h1>
      <p>OHLC price visualization with custom styling</p>
    </header>

    <div ref="chartContainer" class="chart-container" />

    <section class="info">
      <h2>About Candlestick Charts</h2>
      <p>
        Candlestick charts display price movements with open, high, low, and close (OHLC) values.
        Each candle represents a time period, with green candles indicating price increases and
        red candles showing decreases.
      </p>
      <ul>
        <li><strong>Body:</strong> Range between open and close prices</li>
        <li><strong>Wicks:</strong> High and low prices for the period</li>
        <li><strong>Color:</strong> Green for bullish, red for bearish</li>
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
