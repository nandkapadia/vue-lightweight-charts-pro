<!--
  HistogramChart.vue - Histogram Chart Example

  Demonstrates:
  - Histogram series for volume data
  - Color-coded bars
  - Volume profile visualization
  - Custom bar colors
-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { createChart, type IChartApi, type ISeriesApi } from 'lightweight-charts';

const chartContainer = ref<HTMLDivElement | null>(null);
const chart = ref<IChartApi | null>(null);
const histogramSeries = ref<ISeriesApi<'Histogram'> | null>(null);

// Generate volume histogram data
function generateHistogramData(count: number) {
  const data = [];
  let baseTime = Math.floor(Date.now() / 1000) - count * 86400;

  for (let i = 0; i < count; i++) {
    const trend = Math.sin(i / 20) * 5000 + 5000;
    const volume = Math.floor(Math.max(1000, trend + (Math.random() - 0.5) * 3000));

    // Vary colors based on volume magnitude
    let color = '#26a69a';
    if (volume > 8000) {
      color = '#2e7d32'; // Dark green for high volume
    } else if (volume > 5000) {
      color = '#26a69a'; // Medium green
    } else {
      color = '#80cbc4'; // Light green for low volume
    }

    data.push({
      time: baseTime + i * 86400,
      value: volume,
      color,
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

  histogramSeries.value = chart.value.addHistogramSeries({
    color: '#26a69a',
    priceFormat: {
      type: 'volume',
    },
    priceScaleId: '',
  });

  const data = generateHistogramData(100);
  histogramSeries.value.setData(data);
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
      <h1>Histogram Chart</h1>
      <p>Volume and distribution visualization</p>
    </header>

    <div ref="chartContainer" class="chart-container" />

    <section class="info">
      <h2>About Histogram Charts</h2>
      <p>
        Histogram charts are ideal for displaying volume data, distribution patterns, and
        other bar-based metrics. Each bar can have a custom color to represent different
        conditions or magnitudes.
      </p>
      <ul>
        <li><strong>Bar Height:</strong> Represents the value or volume</li>
        <li><strong>Custom Colors:</strong> Different colors indicate different conditions</li>
        <li><strong>Use Cases:</strong> Trading volume, frequency distributions, comparisons</li>
        <li><strong>Volume Format:</strong> Automatically formats large numbers (K, M, B)</li>
      </ul>

      <div class="legend">
        <div class="legend-item">
          <span class="color-box" style="background: #2e7d32;"></span>
          <span>High Volume (&gt;8000)</span>
        </div>
        <div class="legend-item">
          <span class="color-box" style="background: #26a69a;"></span>
          <span>Medium Volume (5000-8000)</span>
        </div>
        <div class="legend-item">
          <span class="color-box" style="background: #80cbc4;"></span>
          <span>Low Volume (&lt;5000)</span>
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
  gap: 0.5rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.color-box {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}
</style>
