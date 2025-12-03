<!--
  PriceLinesAnnotations.vue - Price Lines & Annotations Example

  Demonstrates:
  - Horizontal price lines
  - Support and resistance levels
  - Target prices
  - Custom annotations
-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import {
  createChart,
  type IChartApi,
  type ISeriesApi,
  type IPriceLine,
} from 'lightweight-charts';

const chartContainer = ref<HTMLDivElement | null>(null);
const chart = ref<IChartApi | null>(null);
const candlestickSeries = ref<ISeriesApi<'Candlestick'> | null>(null);
const priceLines = ref<IPriceLine[]>([]);

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

  const data = generateData(100);
  candlestickSeries.value.setData(data);

  // Calculate support and resistance levels
  const prices = data.map((d) => d.close);
  const currentPrice = prices[prices.length - 1];
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);

  // Add key price levels
  addPriceLine(currentPrice, '#2196F3', 'Current Price', 2);
  addPriceLine(maxPrice, '#ef5350', 'Resistance', 2);
  addPriceLine(minPrice, '#26a69a', 'Support', 2);
  addPriceLine(currentPrice * 1.1, '#FF9800', 'Target 1', 2);
  addPriceLine(currentPrice * 0.95, '#9C27B0', 'Stop Loss', 2);

  chart.value.timeScale().fitContent();
}

function addPriceLine(
  price: number,
  color: string,
  title: string,
  lineStyle: number = 0
) {
  if (!candlestickSeries.value) return;

  const priceLine = candlestickSeries.value.createPriceLine({
    price,
    color,
    lineWidth: 2,
    lineStyle, // 0 = solid, 1 = dotted, 2 = dashed
    axisLabelVisible: true,
    title,
  });

  priceLines.value.push(priceLine);
}

function clearPriceLines() {
  if (!candlestickSeries.value) return;

  priceLines.value.forEach((line) => {
    candlestickSeries.value?.removePriceLine(line);
  });

  priceLines.value = [];
}

function addCustomPriceLine() {
  if (!candlestickSeries.value || !chart.value) return;

  const priceScale = candlestickSeries.value.priceScale();
  const visibleRange = priceScale.coordinateToPrice(200);
  if (!visibleRange) return;

  addPriceLine(visibleRange, '#00BCD4', 'Custom Level', 1);
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
  <div class="annotations-demo">
    <header>
      <h1>Price Lines & Annotations</h1>
      <p>Support, resistance, and target price levels</p>
    </header>

    <div class="controls">
      <button @click="addCustomPriceLine">Add Custom Level</button>
      <button @click="clearPriceLines">Clear All Lines</button>
    </div>

    <div ref="chartContainer" class="chart-container" />

    <section class="info">
      <h2>About Price Lines</h2>
      <p>
        Price lines are horizontal lines that mark important price levels on your chart.
        They're essential for technical analysis and trade planning.
      </p>

      <h3>Common Use Cases</h3>
      <ul>
        <li><strong>Support & Resistance:</strong> Historical price levels where the price tends to reverse</li>
        <li><strong>Entry/Exit Targets:</strong> Planned price levels for trade execution</li>
        <li><strong>Stop Loss:</strong> Risk management levels</li>
        <li><strong>Current Price:</strong> Real-time price reference</li>
      </ul>

      <div class="legend">
        <h3>Price Levels Legend</h3>
        <div class="legend-grid">
          <div class="legend-item">
            <span class="line-sample" style="border-color: #2196F3; border-style: dashed;"></span>
            <span>Current Price</span>
          </div>
          <div class="legend-item">
            <span class="line-sample" style="border-color: #ef5350; border-style: dashed;"></span>
            <span>Resistance (High)</span>
          </div>
          <div class="legend-item">
            <span class="line-sample" style="border-color: #26a69a; border-style: dashed;"></span>
            <span>Support (Low)</span>
          </div>
          <div class="legend-item">
            <span class="line-sample" style="border-color: #FF9800; border-style: dashed;"></span>
            <span>Target Price</span>
          </div>
          <div class="legend-item">
            <span class="line-sample" style="border-color: #9C27B0; border-style: dashed;"></span>
            <span>Stop Loss</span>
          </div>
        </div>
      </div>

      <div class="code-sample">
        <h3>Code Example</h3>
        <pre><code>// Create a price line
const priceLine = series.createPriceLine({
  price: 100.50,
  color: '#2196F3',
  lineWidth: 2,
  lineStyle: 2, // 0=solid, 1=dotted, 2=dashed
  axisLabelVisible: true,
  title: 'Target Price'
});

// Remove a price line
series.removePriceLine(priceLine);</code></pre>
      </div>
    </section>
  </div>
</template>

<style scoped>
.annotations-demo {
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

.legend-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.line-sample {
  width: 40px;
  height: 0;
  border-top-width: 2px;
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
