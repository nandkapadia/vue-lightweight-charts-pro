<!--
  ThemesExample.vue - Chart Themes Example

  Demonstrates:
  - Light and dark themes
  - Custom color schemes
  - Dynamic theme switching
  - Complete chart styling
-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import {
  createChart,
  type IChartApi,
  type ISeriesApi,
  type DeepPartial,
  type ChartOptions,
} from 'lightweight-charts';

type Theme = 'light' | 'dark' | 'blue' | 'purple';

const chartContainer = ref<HTMLDivElement | null>(null);
const chart = ref<IChartApi | null>(null);
const candlestickSeries = ref<ISeriesApi<'Candlestick'> | null>(null);
const currentTheme = ref<Theme>('light');

// Theme configurations
const themes: Record<Theme, DeepPartial<ChartOptions>> = {
  light: {
    layout: {
      background: { type: 'solid', color: '#ffffff' },
      textColor: '#333',
    },
    grid: {
      vertLines: { color: '#f0f0f0' },
      horzLines: { color: '#f0f0f0' },
    },
    rightPriceScale: {
      borderColor: '#d1d4dc',
    },
    timeScale: {
      borderColor: '#d1d4dc',
    },
  },
  dark: {
    layout: {
      background: { type: 'solid', color: '#1e222d' },
      textColor: '#d1d4dc',
    },
    grid: {
      vertLines: { color: '#2b2f3a' },
      horzLines: { color: '#2b2f3a' },
    },
    rightPriceScale: {
      borderColor: '#2b2f3a',
    },
    timeScale: {
      borderColor: '#2b2f3a',
    },
  },
  blue: {
    layout: {
      background: { type: 'solid', color: '#0d1821' },
      textColor: '#64b5f6' },
    },
    grid: {
      vertLines: { color: '#1a2332' },
      horzLines: { color: '#1a2332' },
    },
    rightPriceScale: {
      borderColor: '#1976d2',
    },
    timeScale: {
      borderColor: '#1976d2',
    },
  },
  purple: {
    layout: {
      background: { type: 'solid', color: '#1a0d2e' },
      textColor: '#ce93d8' },
    },
    grid: {
      vertLines: { color: '#2d1b4e' },
      horzLines: { color: '#2d1b4e' },
    },
    rightPriceScale: {
      borderColor: '#7b1fa2',
    },
    timeScale: {
      borderColor: '#7b1fa2',
    },
  },
};

// Color schemes for candlesticks
const candlestickColors: Record<Theme, { up: string; down: string }> = {
  light: { up: '#26a69a', down: '#ef5350' },
  dark: { up: '#26a69a', down: '#ef5350' },
  blue: { up: '#42a5f5', down: '#ef5350' },
  purple: { up: '#ab47bc', down: '#ec407a' },
};

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

  const chartData = generateData(100);

  chart.value = createChart(chartContainer.value, {
    width: chartContainer.value.clientWidth,
    height: 400,
    ...themes[currentTheme.value],
    crosshair: {
      mode: 1,
    },
    timeScale: {
      ...themes[currentTheme.value].timeScale,
      timeVisible: true,
      secondsVisible: false,
    },
  });

  const colors = candlestickColors[currentTheme.value];
  candlestickSeries.value = chart.value.addCandlestickSeries({
    upColor: colors.up,
    downColor: colors.down,
    borderVisible: false,
    wickUpColor: colors.up,
    wickDownColor: colors.down,
  });

  candlestickSeries.value.setData(chartData);
  chart.value.timeScale().fitContent();
}

function applyTheme(theme: Theme) {
  currentTheme.value = theme;

  if (!chart.value || !candlestickSeries.value) return;

  // Apply chart theme
  chart.value.applyOptions(themes[theme]);

  // Update candlestick colors
  const colors = candlestickColors[theme];
  candlestickSeries.value.applyOptions({
    upColor: colors.up,
    downColor: colors.down,
    wickUpColor: colors.up,
    wickDownColor: colors.down,
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
  <div class="themes-demo">
    <header>
      <h1>Chart Themes</h1>
      <p>Pre-configured color schemes and styling options</p>
    </header>

    <div class="theme-selector">
      <button
        v-for="theme in ['light', 'dark', 'blue', 'purple']"
        :key="theme"
        :class="['theme-btn', theme, { active: currentTheme === theme }]"
        @click="applyTheme(theme as Theme)"
      >
        {{ theme.charAt(0).toUpperCase() + theme.slice(1) }}
      </button>
    </div>

    <div ref="chartContainer" class="chart-container" />

    <section class="info">
      <h2>About Themes</h2>
      <p>
        Themes provide pre-configured color schemes for your charts. You can easily switch
        between light and dark modes or create custom themes to match your application's design.
      </p>

      <h3>Theme Components</h3>
      <ul>
        <li><strong>Background:</strong> Chart background color</li>
        <li><strong>Text Color:</strong> Labels and axis text</li>
        <li><strong>Grid Lines:</strong> Horizontal and vertical grid</li>
        <li><strong>Border Colors:</strong> Price scale and time scale borders</li>
        <li><strong>Series Colors:</strong> Candlestick, line, and other series colors</li>
      </ul>

      <div class="code-sample">
        <h3>Creating Custom Themes</h3>
        <pre><code>const darkTheme = {
  layout: {
    background: { type: 'solid', color: '#1e222d' },
    textColor: '#d1d4dc'
  },
  grid: {
    vertLines: { color: '#2b2f3a' },
    horzLines: { color: '#2b2f3a' }
  },
  rightPriceScale: {
    borderColor: '#2b2f3a'
  },
  timeScale: {
    borderColor: '#2b2f3a'
  }
};

chart.applyOptions(darkTheme);</code></pre>
      </div>
    </section>
  </div>
</template>

<style scoped>
.themes-demo {
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

.theme-selector {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.theme-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.theme-btn.light {
  background: #ffffff;
  color: #333;
  border-color: #e0e0e0;
}

.theme-btn.dark {
  background: #1e222d;
  color: #d1d4dc;
}

.theme-btn.blue {
  background: #0d1821;
  color: #64b5f6;
}

.theme-btn.purple {
  background: #1a0d2e;
  color: #ce93d8;
}

.theme-btn.active {
  border-color: #26a69a;
  box-shadow: 0 0 0 2px rgba(38, 166, 154, 0.2);
}

.theme-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.chart-container {
  width: 100%;
  height: 400px;
  margin-bottom: 2rem;
  border-radius: 8px;
  overflow: hidden;
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
