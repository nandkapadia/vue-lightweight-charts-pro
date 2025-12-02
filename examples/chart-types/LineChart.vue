<!--
  LineChart.vue - Line Chart Example

  Demonstrates:
  - Simple line chart
  - Multiple line series
  - Custom line styles
  - Price comparisons
-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { createChart, type IChartApi, type ISeriesApi } from 'lightweight-charts';

const chartContainer = ref<HTMLDivElement | null>(null);
const chart = ref<IChartApi | null>(null);
const lineSeries1 = ref<ISeriesApi<'Line'> | null>(null);
const lineSeries2 = ref<ISeriesApi<'Line'> | null>(null);
const lineSeries3 = ref<ISeriesApi<'Line'> | null>(null);

// Generate line data with different patterns
function generateLineData(count: number, pattern: 'smooth' | 'volatile' | 'trend') {
  const data = [];
  let baseTime = Math.floor(Date.now() / 1000) - count * 86400;
  let value = 100;

  for (let i = 0; i < count; i++) {
    let change = 0;

    switch (pattern) {
      case 'smooth':
        change = Math.sin(i / 10) * 2;
        break;
      case 'volatile':
        change = (Math.random() - 0.5) * 8;
        break;
      case 'trend':
        change = 0.3 + (Math.random() - 0.5);
        break;
    }

    value = Math.max(50, value + change);

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

  // Add three line series with different styles
  lineSeries1.value = chart.value.addLineSeries({
    color: '#2196F3',
    lineWidth: 2,
    title: 'Smooth Trend',
  });

  lineSeries2.value = chart.value.addLineSeries({
    color: '#FF6F00',
    lineWidth: 2,
    lineStyle: 2, // Dashed line
    title: 'Volatile',
  });

  lineSeries3.value = chart.value.addLineSeries({
    color: '#4CAF50',
    lineWidth: 3,
    title: 'Uptrend',
  });

  const data1 = generateLineData(100, 'smooth');
  const data2 = generateLineData(100, 'volatile');
  const data3 = generateLineData(100, 'trend');

  lineSeries1.value.setData(data1);
  lineSeries2.value.setData(data2);
  lineSeries3.value.setData(data3);

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
      <h1>Line Chart</h1>
      <p>Multiple line series with different patterns</p>
    </header>

    <div ref="chartContainer" class="chart-container" />

    <section class="info">
      <h2>About Line Charts</h2>
      <p>
        Line charts are the simplest and most common chart type. They're perfect for showing
        trends over time and comparing multiple datasets on the same chart.
      </p>
      <ul>
        <li><strong>Clean Visualization:</strong> Clear view of trends and patterns</li>
        <li><strong>Multiple Series:</strong> Compare different metrics simultaneously</li>
        <li><strong>Line Styles:</strong> Solid, dashed, or dotted lines</li>
        <li><strong>Use Cases:</strong> Price trends, moving averages, comparisons</li>
      </ul>

      <div class="legend">
        <div class="legend-item">
          <span class="line-indicator" style="border-color: #2196F3; border-style: solid;"></span>
          <span>Smooth Trend - Gradual changes</span>
        </div>
        <div class="legend-item">
          <span class="line-indicator" style="border-color: #FF6F00; border-style: dashed;"></span>
          <span>Volatile - Random fluctuations</span>
        </div>
        <div class="legend-item">
          <span class="line-indicator thick" style="border-color: #4CAF50; border-style: solid;"></span>
          <span>Uptrend - Consistent growth</span>
        </div>
      </div>
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

.legend {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.line-indicator {
  width: 40px;
  height: 0;
  border-top-width: 2px;
}

.line-indicator.thick {
  border-top-width: 3px;
}
</style>
