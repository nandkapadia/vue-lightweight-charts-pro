<!--
  LinkedCharts.vue - Synchronized Charts Example

  Demonstrates:
  - Multiple charts with synchronized time scales
  - Crosshair synchronization
  - Different data on same time axis
  - Coordinated zooming and panning
-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import {
  createChart,
  type IChartApi,
  type ISeriesApi,
  type MouseEventParams,
} from 'lightweight-charts';

const chart1Container = ref<HTMLDivElement | null>(null);
const chart2Container = ref<HTMLDivElement | null>(null);
const chart1 = ref<IChartApi | null>(null);
const chart2 = ref<IChartApi | null>(null);
const series1 = ref<ISeriesApi<'Candlestick'> | null>(null);
const series2 = ref<ISeriesApi<'Histogram'> | null>(null);

const chartOptions = {
  width: 0,
  height: 300,
  layout: {
    background: { type: 'solid' as const, color: '#ffffff' },
    textColor: '#333',
  },
  grid: {
    vertLines: { color: '#f0f0f0' },
    horzLines: { color: '#f0f0f0' },
  },
  crosshair: {
    mode: 1 as const,
  },
  rightPriceScale: {
    borderColor: '#d1d4dc',
  },
  timeScale: {
    borderColor: '#d1d4dc',
    timeVisible: true,
    secondsVisible: false,
  },
};

// Generate sample data
function generateCandlestickData(count: number) {
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

function generateVolumeData(count: number) {
  const data = [];
  let baseTime = Math.floor(Date.now() / 1000) - count * 86400;

  for (let i = 0; i < count; i++) {
    const volume = Math.floor(5000 + Math.random() * 10000);
    const color = Math.random() > 0.5 ? '#26a69a' : '#ef5350';

    data.push({
      time: baseTime + i * 86400,
      value: volume,
      color,
    });
  }

  return data;
}

function syncCrosshair(sourceChart: IChartApi, targetChart: IChartApi) {
  sourceChart.subscribeCrosshairMove((param: MouseEventParams) => {
    if (!param.time) {
      targetChart.clearCrosshairPosition();
      return;
    }

    targetChart.setCrosshairPosition(0, param.time, targetChart.series()[0]);
  });
}

function syncTimeScale(chart1: IChartApi, chart2: IChartApi) {
  const timeScale1 = chart1.timeScale();
  const timeScale2 = chart2.timeScale();

  timeScale1.subscribeVisibleTimeRangeChange((timeRange) => {
    if (timeRange) {
      timeScale2.setVisibleRange(timeRange);
    }
  });

  timeScale2.subscribeVisibleTimeRangeChange((timeRange) => {
    if (timeRange) {
      timeScale1.setVisibleRange(timeRange);
    }
  });
}

function initializeCharts() {
  if (!chart1Container.value || !chart2Container.value) return;

  // Create first chart (Price)
  chart1.value = createChart(chart1Container.value, {
    ...chartOptions,
    width: chart1Container.value.clientWidth,
  });

  series1.value = chart1.value.addCandlestickSeries({
    upColor: '#26a69a',
    downColor: '#ef5350',
    borderVisible: false,
    wickUpColor: '#26a69a',
    wickDownColor: '#ef5350',
  });

  const priceData = generateCandlestickData(100);
  series1.value.setData(priceData);

  // Create second chart (Volume)
  chart2.value = createChart(chart2Container.value, {
    ...chartOptions,
    width: chart2Container.value.clientWidth,
  });

  series2.value = chart2.value.addHistogramSeries({
    color: '#26a69a',
    priceFormat: {
      type: 'volume',
    },
  });

  const volumeData = generateVolumeData(100);
  series2.value.setData(volumeData);

  // Synchronize time scales and crosshairs
  syncTimeScale(chart1.value, chart2.value);
  syncCrosshair(chart1.value, chart2.value);
  syncCrosshair(chart2.value, chart1.value);

  // Fit content
  chart1.value.timeScale().fitContent();
  chart2.value.timeScale().fitContent();
}

function handleResize() {
  if (chart1.value && chart1Container.value) {
    chart1.value.applyOptions({ width: chart1Container.value.clientWidth });
  }
  if (chart2.value && chart2Container.value) {
    chart2.value.applyOptions({ width: chart2Container.value.clientWidth });
  }
}

onMounted(() => {
  initializeCharts();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  chart1.value?.remove();
  chart2.value?.remove();
});
</script>

<template>
  <div class="linked-demo">
    <header>
      <h1>Linked Charts</h1>
      <p>Synchronized time scales and crosshair movement</p>
    </header>

    <div class="charts-container">
      <div class="chart-panel">
        <h3>Price Chart</h3>
        <div ref="chart1Container" class="chart-container" />
      </div>

      <div class="chart-panel">
        <h3>Volume Chart</h3>
        <div ref="chart2Container" class="chart-container" />
      </div>
    </div>

    <section class="info">
      <h2>About Linked Charts</h2>
      <p>
        Linked charts share the same time scale and crosshair position, making it easy to
        analyze multiple datasets simultaneously. Try zooming or panning on one chart to see
        the synchronization.
      </p>

      <h3>Synchronization Features</h3>
      <ul>
        <li><strong>Time Scale:</strong> Zoom and pan are synchronized across all charts</li>
        <li><strong>Crosshair:</strong> Move the crosshair on one chart to update others</li>
        <li><strong>Visible Range:</strong> All charts show the same time period</li>
        <li><strong>Use Cases:</strong> Price + volume, multiple timeframes, correlated assets</li>
      </ul>

      <div class="code-sample">
        <h3>Implementation</h3>
        <pre><code>// Sync time scales
const timeScale1 = chart1.timeScale();
const timeScale2 = chart2.timeScale();

timeScale1.subscribeVisibleTimeRangeChange((range) => {
  if (range) timeScale2.setVisibleRange(range);
});

// Sync crosshairs
chart1.subscribeCrosshairMove((param) => {
  if (!param.time) {
    chart2.clearCrosshairPosition();
  } else {
    chart2.setCrosshairPosition(0, param.time, series);
  }
});</code></pre>
      </div>
    </section>
  </div>
</template>

<style scoped>
.linked-demo {
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

.charts-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.chart-panel h3 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  color: #333;
}

.chart-container {
  width: 100%;
  height: 300px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
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
