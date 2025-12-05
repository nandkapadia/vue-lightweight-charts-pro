/**
 * @fileoverview Load testing with real NIFTY50 market data
 *
 * Tests performance under realistic production conditions:
 * - Large datasets (100K+ bars)
 * - Multiple series rendering
 * - Real-time updates simulation
 * - Memory usage monitoring
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref, nextTick } from 'vue';
import LightweightChart from '../../src/components/LightweightChart.vue';
import type { SeriesConfig } from '../../src/types';

// Helper to generate realistic OHLCV data based on NIFTY50 patterns
function generateRealisticData(count: number, startTime: number = Date.now() / 1000 - count * 60): any[] {
  const data = [];
  let price = 18000 + Math.random() * 2000; // NIFTY range

  for (let i = 0; i < count; i++) {
    const time = startTime + i * 60; // 1-minute bars
    const volatility = 0.002; // 0.2% typical volatility

    const change = (Math.random() - 0.5) * price * volatility;
    const open = price;
    price += change;
    const close = price;
    const high = Math.max(open, close) * (1 + Math.random() * volatility);
    const low = Math.min(open, close) * (1 - Math.random() * volatility);
    const volume = Math.floor(1000000 + Math.random() * 5000000);

    data.push({
      time,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume,
    });
  }

  return data;
}

// Memory usage tracker
class MemoryTracker {
  private samples: number[] = [];

  snapshot(): number {
    if (typeof performance !== 'undefined' && (performance as any).memory) {
      return (performance as any).memory.usedJSHeapSize;
    }
    return 0;
  }

  track(): void {
    this.samples.push(this.snapshot());
  }

  getStats() {
    if (this.samples.length === 0) return null;

    const first = this.samples[0];
    const last = this.samples[this.samples.length - 1];
    const max = Math.max(...this.samples);
    const avg = this.samples.reduce((a, b) => a + b, 0) / this.samples.length;

    return {
      initial: first,
      final: last,
      max,
      average: avg,
      growth: last - first,
      growthPercent: ((last - first) / first) * 100,
      samples: this.samples.length,
    };
  }

  clear(): void {
    this.samples = [];
  }
}

describe('Production Load Testing', () => {
  let memoryTracker: MemoryTracker;

  beforeEach(() => {
    memoryTracker = new MemoryTracker();
  });

  afterEach(() => {
    memoryTracker.clear();
  });

  it('handles 100K bars efficiently (NIFTY50 ~70 days of 1min data)', async () => {
    const startTime = performance.now();
    memoryTracker.track();

    const largeDataset = generateRealisticData(100000);

    const seriesConfig = ref<SeriesConfig[]>([
      {
        type: 'Candlestick',
        name: 'NIFTY50',
        data: largeDataset,
      },
    ]);

    const wrapper = mount(LightweightChart, {
      props: {
        chartId: 'load-test-100k',
        series: seriesConfig.value,
        autoFit: true,
      },
    });

    await nextTick();
    memoryTracker.track();

    const loadTime = performance.now() - startTime;

    // Performance assertions
    expect(loadTime).toBeLessThan(3000); // Should load 100K bars in < 3s
    expect(wrapper.exists()).toBe(true);

    // Memory assertions
    const memStats = memoryTracker.getStats();
    if (memStats) {
      console.log('100K bars - Memory stats:', memStats);
      // Memory growth should be reasonable (< 100MB for 100K bars)
      expect(memStats.growth).toBeLessThan(100 * 1024 * 1024);
    }

    console.log(`✓ Loaded 100K bars in ${loadTime.toFixed(0)}ms`);

    wrapper.unmount();
  });

  it('handles 500K bars (NIFTY50 ~1 year of 1min data)', async () => {
    const startTime = performance.now();
    memoryTracker.track();

    const massiveDataset = generateRealisticData(500000);

    const seriesConfig = ref<SeriesConfig[]>([
      {
        type: 'Candlestick',
        name: 'NIFTY50',
        data: massiveDataset,
      },
    ]);

    const wrapper = mount(LightweightChart, {
      props: {
        chartId: 'load-test-500k',
        series: seriesConfig.value,
        autoFit: true,
      },
    });

    await nextTick();
    memoryTracker.track();

    const loadTime = performance.now() - startTime;

    // Performance assertions (more lenient for 500K)
    expect(loadTime).toBeLessThan(10000); // Should load 500K bars in < 10s
    expect(wrapper.exists()).toBe(true);

    // Memory assertions
    const memStats = memoryTracker.getStats();
    if (memStats) {
      console.log('500K bars - Memory stats:', memStats);
      // Memory growth should be reasonable (< 500MB for 500K bars)
      expect(memStats.growth).toBeLessThan(500 * 1024 * 1024);
    }

    console.log(`✓ Loaded 500K bars in ${loadTime.toFixed(0)}ms`);

    wrapper.unmount();
  });

  it('handles multiple series efficiently (50 NIFTY50 stocks)', async () => {
    const startTime = performance.now();
    memoryTracker.track();

    // Simulate 50 stocks with 10K bars each (realistic for multi-stock dashboard)
    const seriesConfig = ref<SeriesConfig[]>(
      Array.from({ length: 50 }, (_, i) => ({
        type: 'Line' as const,
        name: `STOCK_${i}`,
        data: generateRealisticData(10000).map(d => ({
          time: d.time,
          value: d.close,
        })),
      }))
    );

    const wrapper = mount(LightweightChart, {
      props: {
        chartId: 'load-test-multi',
        series: seriesConfig.value,
        autoFit: true,
      },
    });

    await nextTick();
    memoryTracker.track();

    const loadTime = performance.now() - startTime;

    // Performance assertions
    expect(loadTime).toBeLessThan(5000); // Should load 50 series in < 5s
    expect(wrapper.exists()).toBe(true);

    // Memory assertions
    const memStats = memoryTracker.getStats();
    if (memStats) {
      console.log('50 series - Memory stats:', memStats);
      expect(memStats.growth).toBeLessThan(200 * 1024 * 1024);
    }

    console.log(`✓ Loaded 50 series (500K total bars) in ${loadTime.toFixed(0)}ms`);

    wrapper.unmount();
  });

  it('handles real-time updates efficiently (1000 ticks)', async () => {
    const initialData = generateRealisticData(10000);
    const seriesConfig = ref<SeriesConfig[]>([
      {
        type: 'Candlestick',
        name: 'NIFTY50',
        data: initialData,
      },
    ]);

    const wrapper = mount(LightweightChart, {
      props: {
        chartId: 'load-test-realtime',
        series: seriesConfig.value,
      },
    });

    await nextTick();
    memoryTracker.track();

    const startTime = performance.now();

    // Simulate 1000 real-time tick updates
    for (let i = 0; i < 1000; i++) {
      const lastBar = seriesConfig.value[0].data![seriesConfig.value[0].data!.length - 1];
      const newBar = {
        time: (lastBar.time as number) + 60,
        open: lastBar.close,
        high: lastBar.close * 1.001,
        low: lastBar.close * 0.999,
        close: lastBar.close * (1 + (Math.random() - 0.5) * 0.002),
        volume: 1000000 + Math.random() * 1000000,
      };

      // Use monotonic append (should hit fast path)
      seriesConfig.value = [{
        ...seriesConfig.value[0],
        data: [...seriesConfig.value[0].data!, newBar],
      }];

      if (i % 100 === 0) {
        await nextTick();
        memoryTracker.track();
      }
    }

    await nextTick();
    const updateTime = performance.now() - startTime;

    // Performance assertions
    expect(updateTime).toBeLessThan(2000); // 1000 updates in < 2s (2ms per update)
    const avgUpdateTime = updateTime / 1000;
    expect(avgUpdateTime).toBeLessThan(5); // < 5ms per update

    // Memory leak check
    const memStats = memoryTracker.getStats();
    if (memStats) {
      console.log('1000 updates - Memory stats:', memStats);
      // Memory shouldn't grow significantly with monotonic appends
      expect(memStats.growthPercent).toBeLessThan(10); // < 10% growth
    }

    console.log(`✓ 1000 real-time updates in ${updateTime.toFixed(0)}ms (avg: ${avgUpdateTime.toFixed(2)}ms/update)`);

    wrapper.unmount();
  });

  it('detects memory leaks on repeated mount/unmount', async () => {
    const data = generateRealisticData(10000);
    const iterations = 10;

    memoryTracker.track();

    for (let i = 0; i < iterations; i++) {
      const seriesConfig = ref<SeriesConfig[]>([
        {
          type: 'Candlestick',
          name: 'NIFTY50',
          data: [...data], // Fresh copy each time
        },
      ]);

      const wrapper = mount(LightweightChart, {
        props: {
          chartId: `leak-test-${i}`,
          series: seriesConfig.value,
        },
      });

      await nextTick();

      wrapper.unmount();

      // Give GC a chance to run
      await new Promise(resolve => setTimeout(resolve, 100));

      memoryTracker.track();
    }

    const memStats = memoryTracker.getStats();
    if (memStats) {
      console.log(`Memory leak test (${iterations} cycles):`, memStats);

      // Memory shouldn't grow more than 20% after mount/unmount cycles
      // (some growth expected due to test framework overhead)
      expect(memStats.growthPercent).toBeLessThan(20);

      console.log(`✓ No significant memory leak detected after ${iterations} mount/unmount cycles`);
    }
  });

  it('handles lazy loading with large dataset efficiently', async () => {
    // Simulate lazy loading scenario: small initial chunk, large available dataset
    const fullDataset = generateRealisticData(100000);
    const initialChunk = fullDataset.slice(50000, 51000); // Middle 1000 bars

    const seriesConfig = ref<SeriesConfig[]>([
      {
        type: 'Candlestick',
        name: 'NIFTY50',
        data: initialChunk,
        lazyLoading: {
          enabled: true,
          chunkSize: 1000,
          hasMoreBefore: true,
          hasMoreAfter: true,
        },
      },
    ]);

    const wrapper = mount(LightweightChart, {
      props: {
        chartId: 'lazy-load-test',
        series: seriesConfig.value,
      },
    });

    await nextTick();
    memoryTracker.track();

    const startTime = performance.now();

    // Simulate 10 backfill requests (prepending historical data)
    for (let i = 0; i < 10; i++) {
      const currentFirst = seriesConfig.value[0].data![0].time as number;
      const backfillStart = fullDataset.findIndex(d => d.time === currentFirst) - 1000;
      const backfillData = fullDataset.slice(Math.max(0, backfillStart), backfillStart + 1000);

      seriesConfig.value = [{
        ...seriesConfig.value[0],
        data: [...backfillData, ...seriesConfig.value[0].data!],
      }];

      await nextTick();
      memoryTracker.track();
    }

    const backfillTime = performance.now() - startTime;

    // Performance assertions
    expect(backfillTime).toBeLessThan(1000); // 10 backfills in < 1s

    const memStats = memoryTracker.getStats();
    if (memStats) {
      console.log('Lazy loading - Memory stats:', memStats);
      expect(memStats.growth).toBeLessThan(50 * 1024 * 1024); // < 50MB growth
    }

    console.log(`✓ 10 lazy-load backfills in ${backfillTime.toFixed(0)}ms`);

    wrapper.unmount();
  });
});
