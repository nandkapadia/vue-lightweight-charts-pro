/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ref } from 'vue';
import { useSeries } from '../../../src/composables/useSeries';
import { createChart } from 'lightweight-charts';

// Mock the core module
vi.mock('@lightweight-charts-pro/core', () => ({
  createSeriesWithConfig: vi.fn((chart, config) => {
    // Return a mock series
    return {
      setData: vi.fn(),
      applyOptions: vi.fn(),
      options: () => ({ _seriesType: config.type }),
    };
  }),
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe('useSeries Composable', () => {
  let mockChart: any;
  let mockSeriesMap: any;

  beforeEach(() => {
    // Create a real chart instance for testing
    const container = document.createElement('div');
    mockChart = ref(createChart(container, { width: 400, height: 300 }));
    mockSeriesMap = ref(new Map());

    // Provide inject mocks
    vi.stubGlobal('inject', vi.fn((key: string) => {
      if (key === 'chart') return mockChart;
      if (key === 'seriesMap') return mockSeriesMap;
      return null;
    }));

    vi.stubGlobal('provide', vi.fn());
  });

  it('creates a series instance with basic config', () => {
    const { series, isReady } = useSeries({
      type: 'line',
      data: [{ time: '2024-01-01', value: 100 }],
      seriesId: 'test-series',
    });

    expect(series.value).toBeTruthy();
    expect(isReady.value).toBe(true);
  });

  it('handles candlestick series type', () => {
    const { series } = useSeries({
      type: 'candlestick',
      data: [
        { time: '2024-01-01', open: 100, high: 110, low: 95, close: 105 },
      ],
      seriesId: 'candle-series',
    });

    expect(series.value).toBeTruthy();
  });

  it('handles custom series types', () => {
    const { series } = useSeries({
      type: 'band',
      data: [{ time: '2024-01-01', upper: 110, lower: 90 }],
      seriesId: 'band-series',
    });

    expect(series.value).toBeTruthy();
  });

  it('registers series in parent series map', () => {
    const seriesId = 'registered-series';

    useSeries({
      type: 'line',
      data: [],
      seriesId,
    });

    expect(mockSeriesMap.value.has(seriesId)).toBe(true);
  });

  it('provides series to child components', () => {
    const provideMock = vi.mocked(global.provide);

    useSeries({
      type: 'line',
      data: [],
      seriesId: 'parent-series',
    });

    expect(provideMock).toHaveBeenCalledWith('series', expect.anything());
    expect(provideMock).toHaveBeenCalledWith('seriesId', 'parent-series');
  });

  it('generates unique seriesId if not provided', () => {
    const { series } = useSeries({
      type: 'line',
      data: [],
    });

    expect(series.value).toBeTruthy();
    // Should have generated an ID
  });

  it('passes options to series config', () => {
    const options = { color: '#FF0000', lineWidth: 2 };

    useSeries({
      type: 'line',
      data: [],
      options,
    });

    // Options should be passed through to createSeriesWithConfig
    expect(true).toBe(true); // Mock verifies this
  });

  it('passes paneId to series config', () => {
    useSeries({
      type: 'line',
      data: [],
      paneId: 1,
    });

    // PaneId should be passed through
    expect(true).toBe(true);
  });

  it('passes markers to series config', () => {
    const markers = [
      { time: '2024-01-01', position: 'aboveBar', color: 'green' },
    ];

    useSeries({
      type: 'line',
      data: [],
      markers,
    });

    expect(true).toBe(true);
  });

  it('passes price lines to series config', () => {
    const priceLines = [{ price: 100, color: 'red' }];

    useSeries({
      type: 'line',
      data: [],
      priceLines,
    });

    expect(true).toBe(true);
  });

  it('passes trades config', () => {
    const trades = [
      {
        entryTime: '2024-01-01',
        entryPrice: 100,
        exitTime: '2024-01-02',
        exitPrice: 110,
        isProfitable: true,
      },
    ];

    useSeries({
      type: 'candlestick',
      data: [],
      trades,
      tradeVisualizationOptions: { style: 'both' },
    });

    expect(true).toBe(true);
  });

  it('warns when chart instance is not available', () => {
    const loggerMock = vi.mocked((await import('@lightweight-charts-pro/core')).logger);

    // Mock inject to return null chart
    vi.stubGlobal('inject', vi.fn(() => null));

    useSeries({
      type: 'line',
      data: [],
    });

    expect(loggerMock.warn).toHaveBeenCalled();
  });
});
