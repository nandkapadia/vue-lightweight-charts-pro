<!--
  LiveTrades.vue - Live Trade Visualization Example

  Demonstrates:
  - Real-time trade updates
  - Trade markers on chart
  - Live order book simulation
  - Recent trades list
-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from 'vue';
import {
  createChart,
  type IChartApi,
  type ISeriesApi,
  type SeriesMarker,
  type Time,
} from 'lightweight-charts';

interface Trade {
  id: number;
  time: number;
  price: number;
  volume: number;
  type: 'buy' | 'sell';
}

const chartContainer = ref<HTMLDivElement | null>(null);
const chart = ref<IChartApi | null>(null);
const candlestickSeries = ref<ISeriesApi<'Candlestick'> | null>(null);
const isStreaming = ref(false);
const streamInterval = ref<number | null>(null);

const recentTrades = ref<Trade[]>([]);
let tradeId = 0;

// Generate initial data
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
      secondsVisible: true,
    },
  });

  candlestickSeries.value = chart.value.addCandlestickSeries({
    upColor: '#26a69a',
    downColor: '#ef5350',
    borderVisible: false,
    wickUpColor: '#26a69a',
    wickDownColor: '#ef5350',
  });

  const data = generateData(50);
  candlestickSeries.value.setData(data);
  chart.value.timeScale().fitContent();
}

function startStreaming() {
  isStreaming.value = true;

  streamInterval.value = window.setInterval(() => {
    if (!candlestickSeries.value) return;

    const lastData = candlestickSeries.value.data();
    if (lastData.length === 0) return;

    const lastBar = lastData[lastData.length - 1] as any;
    const currentTime = Math.floor(Date.now() / 1000);

    // Generate a new trade
    const isBuy = Math.random() > 0.5;
    const price = lastBar.close + (Math.random() - 0.5) * 2;
    const volume = Math.floor(Math.random() * 100) + 1;

    const trade: Trade = {
      id: tradeId++,
      time: currentTime,
      price: Math.round(price * 100) / 100,
      volume,
      type: isBuy ? 'buy' : 'sell',
    };

    // Add to recent trades
    recentTrades.value.unshift(trade);
    if (recentTrades.value.length > 20) {
      recentTrades.value.pop();
    }

    // Update last bar or create new one
    const newBar = {
      time: currentTime as Time,
      open: lastBar.close,
      high: Math.max(lastBar.close, trade.price),
      low: Math.min(lastBar.close, trade.price),
      close: trade.price,
    };

    candlestickSeries.value.update(newBar);

    // Add marker for significant trades
    if (volume > 75) {
      const markers = candlestickSeries.value.markers();
      const newMarker: SeriesMarker<Time> = {
        time: currentTime as Time,
        position: isBuy ? 'belowBar' : 'aboveBar',
        color: isBuy ? '#26a69a' : '#ef5350',
        shape: 'circle',
        text: `${volume}`,
      };

      candlestickSeries.value.setMarkers([...markers.slice(-50), newMarker]);
    }
  }, 1000);
}

function stopStreaming() {
  isStreaming.value = false;
  if (streamInterval.value) {
    clearInterval(streamInterval.value);
    streamInterval.value = null;
  }
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
  stopStreaming();
  window.removeEventListener('resize', handleResize);
  chart.value?.remove();
});
</script>

<template>
  <div class="live-trades-demo">
    <header>
      <h1>Live Trades</h1>
      <p>Real-time trade visualization with order markers</p>
    </header>

    <div class="controls">
      <button v-if="!isStreaming" @click="startStreaming" class="start-btn">
        Start Streaming
      </button>
      <button v-else @click="stopStreaming" class="stop-btn">Stop Streaming</button>
      <span v-if="isStreaming" class="status">
        <span class="pulse"></span>
        Live
      </span>
    </div>

    <div class="dashboard">
      <div class="chart-section">
        <div ref="chartContainer" class="chart-container" />
      </div>

      <div class="trades-section">
        <h3>Recent Trades</h3>
        <div class="trades-list">
          <div class="trades-header">
            <div>Time</div>
            <div>Price</div>
            <div>Volume</div>
            <div>Side</div>
          </div>
          <div
            v-for="trade in recentTrades"
            :key="trade.id"
            class="trade-row"
            :class="trade.type"
          >
            <div>{{ new Date(trade.time * 1000).toLocaleTimeString() }}</div>
            <div class="price">${{ trade.price.toFixed(2) }}</div>
            <div>{{ trade.volume }}</div>
            <div>
              <span :class="`badge ${trade.type}`">{{ trade.type.toUpperCase() }}</span>
            </div>
          </div>
          <div v-if="recentTrades.length === 0" class="no-trades">
            No trades yet. Start streaming to see live trades.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.live-trades-demo {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1400px;
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

.controls button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.start-btn {
  background: #26a69a;
  color: white;
}

.start-btn:hover {
  background: #2bbbad;
}

.stop-btn {
  background: #ef5350;
  color: white;
}

.stop-btn:hover {
  background: #f44336;
}

.status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ef5350;
  font-weight: 600;
}

.pulse {
  width: 8px;
  height: 8px;
  background: #ef5350;
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

.dashboard {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
}

.chart-section {
  min-width: 0;
}

.chart-container {
  width: 100%;
  height: 400px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.trades-section {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  min-width: 0;
}

.trades-section h3 {
  margin: 0 0 0.75rem;
}

.trades-list {
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  max-height: 400px;
  overflow-y: auto;
}

.trades-header,
.trade-row {
  display: grid;
  grid-template-columns: 1fr 1fr 0.7fr 0.7fr;
  gap: 0.5rem;
  padding: 0.5rem;
  font-size: 0.875rem;
}

.trades-header {
  background: #e0e0e0;
  font-weight: 600;
  position: sticky;
  top: 0;
}

.trade-row {
  border-bottom: 1px solid #f0f0f0;
}

.trade-row.buy {
  background: rgba(38, 166, 154, 0.05);
}

.trade-row.sell {
  background: rgba(239, 83, 80, 0.05);
}

.price {
  font-family: 'Fira Code', 'Consolas', monospace;
  font-weight: 600;
}

.badge {
  display: inline-block;
  padding: 0.125rem 0.375rem;
  border-radius: 3px;
  font-size: 0.75rem;
  font-weight: bold;
}

.badge.buy {
  background: #26a69a;
  color: white;
}

.badge.sell {
  background: #ef5350;
  color: white;
}

.no-trades {
  padding: 2rem;
  text-align: center;
  color: #666;
}

@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
}
</style>
