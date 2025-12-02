<!--
  TradesVisualization.vue - Trade Visualization Example

  Demonstrates:
  - Visualizing individual trades
  - Entry and exit points
  - Trade profit/loss
  - Position duration
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

interface Trade {
  entry: { time: number; price: number };
  exit: { time: number; price: number };
  type: 'long' | 'short';
  profitLoss: number;
}

const chartContainer = ref<HTMLDivElement | null>(null);
const chart = ref<IChartApi | null>(null);
const candlestickSeries = ref<ISeriesApi<'Candlestick'> | null>(null);
const trades = ref<Trade[]>([]);
const selectedTrade = ref<Trade | null>(null);

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

// Generate sample trades
function generateTrades(data: Array<{ time: number; close: number; high: number; low: number }>) {
  const generatedTrades: Trade[] = [];

  for (let i = 10; i < data.length - 10; i += Math.floor(10 + Math.random() * 10)) {
    const entryIdx = i;
    const exitIdx = Math.min(data.length - 1, i + Math.floor(3 + Math.random() * 7));

    const type = Math.random() > 0.5 ? 'long' : 'short';
    const entryPrice = data[entryIdx].close;
    const exitPrice = data[exitIdx].close;

    const profitLoss =
      type === 'long'
        ? ((exitPrice - entryPrice) / entryPrice) * 100
        : ((entryPrice - exitPrice) / entryPrice) * 100;

    generatedTrades.push({
      entry: { time: data[entryIdx].time, price: entryPrice },
      exit: { time: data[exitIdx].time, price: exitPrice },
      type,
      profitLoss: Math.round(profitLoss * 100) / 100,
    });
  }

  return generatedTrades;
}

// Convert trades to markers
function tradesToMarkers(trades: Trade[]): SeriesMarker<Time>[] {
  const markers: SeriesMarker<Time>[] = [];

  trades.forEach((trade, idx) => {
    const isProfit = trade.profitLoss > 0;

    // Entry marker
    markers.push({
      time: trade.entry.time as Time,
      position: trade.type === 'long' ? 'belowBar' : 'aboveBar',
      color: trade.type === 'long' ? '#2196F3' : '#FF9800',
      shape: 'circle',
      text: `Entry #${idx + 1}`,
      id: `entry-${idx}`,
    });

    // Exit marker
    markers.push({
      time: trade.exit.time as Time,
      position: isProfit ? 'aboveBar' : 'belowBar',
      color: isProfit ? '#26a69a' : '#ef5350',
      shape: isProfit ? 'arrowUp' : 'arrowDown',
      text: `${isProfit ? '+' : ''}${trade.profitLoss}%`,
      id: `exit-${idx}`,
    });
  });

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

  // Generate and visualize trades
  trades.value = generateTrades(data);
  const markers = tradesToMarkers(trades.value);
  candlestickSeries.value.setMarkers(markers);

  chart.value.timeScale().fitContent();
}

function calculateStats() {
  const totalTrades = trades.value.length;
  const winningTrades = trades.value.filter((t) => t.profitLoss > 0).length;
  const losingTrades = trades.value.filter((t) => t.profitLoss < 0).length;
  const totalPnL = trades.value.reduce((sum, t) => sum + t.profitLoss, 0);
  const avgPnL = totalPnL / totalTrades;
  const winRate = (winningTrades / totalTrades) * 100;

  return {
    totalTrades,
    winningTrades,
    losingTrades,
    totalPnL: Math.round(totalPnL * 100) / 100,
    avgPnL: Math.round(avgPnL * 100) / 100,
    winRate: Math.round(winRate * 100) / 100,
  };
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
  <div class="trades-demo">
    <header>
      <h1>Trade Visualization</h1>
      <p>Visualize trading entries, exits, and performance</p>
    </header>

    <div ref="chartContainer" class="chart-container" />

    <section class="stats">
      <h2>Trading Statistics</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">Total Trades</div>
          <div class="stat-value">{{ calculateStats().totalTrades }}</div>
        </div>
        <div class="stat-card winning">
          <div class="stat-label">Winning</div>
          <div class="stat-value">{{ calculateStats().winningTrades }}</div>
        </div>
        <div class="stat-card losing">
          <div class="stat-label">Losing</div>
          <div class="stat-value">{{ calculateStats().losingTrades }}</div>
        </div>
        <div class="stat-card" :class="calculateStats().totalPnL > 0 ? 'winning' : 'losing'">
          <div class="stat-label">Total P&L</div>
          <div class="stat-value">{{ calculateStats().totalPnL }}%</div>
        </div>
        <div class="stat-card" :class="calculateStats().avgPnL > 0 ? 'winning' : 'losing'">
          <div class="stat-label">Avg P&L</div>
          <div class="stat-value">{{ calculateStats().avgPnL }}%</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Win Rate</div>
          <div class="stat-value">{{ calculateStats().winRate }}%</div>
        </div>
      </div>
    </section>

    <section class="trades-list">
      <h2>Trade History</h2>
      <div class="trades-table">
        <div class="trade-header">
          <div>Type</div>
          <div>Entry</div>
          <div>Exit</div>
          <div>P&L</div>
        </div>
        <div
          v-for="(trade, idx) in trades"
          :key="idx"
          class="trade-row"
          :class="trade.profitLoss > 0 ? 'profit' : 'loss'"
        >
          <div class="trade-type">
            <span :class="`badge ${trade.type}`">{{ trade.type.toUpperCase() }}</span>
          </div>
          <div>${{ trade.entry.price.toFixed(2) }}</div>
          <div>${{ trade.exit.price.toFixed(2) }}</div>
          <div class="pnl">{{ trade.profitLoss > 0 ? '+' : '' }}{{ trade.profitLoss }}%</div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.trades-demo {
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

.stats {
  margin-bottom: 2rem;
}

.stats h2 {
  margin-bottom: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.stat-card {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  border-left: 4px solid #ccc;
}

.stat-card.winning {
  border-left-color: #26a69a;
  background: #e8f5e9;
}

.stat-card.losing {
  border-left-color: #ef5350;
  background: #ffebee;
}

.stat-label {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.trades-list h2 {
  margin-bottom: 1rem;
}

.trades-table {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
}

.trade-header,
.trade-row {
  display: grid;
  grid-template-columns: 100px 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  align-items: center;
}

.trade-header {
  background: #f5f5f5;
  font-weight: bold;
  border-bottom: 2px solid #e0e0e0;
}

.trade-row {
  border-bottom: 1px solid #f0f0f0;
}

.trade-row.profit {
  background: rgba(38, 166, 154, 0.05);
}

.trade-row.loss {
  background: rgba(239, 83, 80, 0.05);
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
}

.badge.long {
  background: #2196F3;
  color: white;
}

.badge.short {
  background: #FF9800;
  color: white;
}

.pnl {
  font-weight: bold;
}

.trade-row.profit .pnl {
  color: #26a69a;
}

.trade-row.loss .pnl {
  color: #ef5350;
}
</style>
