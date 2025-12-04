/**
 * Integration tests for chart type examples
 *
 * Tests all chart types to ensure they render correctly
 */

import { describe, it, expect, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';

// Chart type examples
import CandlestickChart from '../../examples/chart-types/CandlestickChart.vue';
import AreaChart from '../../examples/chart-types/AreaChart.vue';
import BarChart from '../../examples/chart-types/BarChart.vue';
import BaselineChart from '../../examples/chart-types/BaselineChart.vue';
import HistogramChart from '../../examples/chart-types/HistogramChart.vue';
import LineChart from '../../examples/chart-types/LineChart.vue';

describe('Chart Types Integration Tests', () => {
  let wrapper: VueWrapper | null = null;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  });

  describe('CandlestickChart', () => {
    it('should mount successfully', () => {
      wrapper = mount(CandlestickChart);
      expect(wrapper.exists()).toBe(true);
    });

    it('should render chart container', () => {
      wrapper = mount(CandlestickChart);
      const container = wrapper.find('.chart-container');
      expect(container.exists()).toBe(true);
    });

    it('should display header with title', () => {
      wrapper = mount(CandlestickChart);
      const header = wrapper.find('h1');
      expect(header.text()).toBe('Candlestick Chart');
    });

    it('should render info section', () => {
      wrapper = mount(CandlestickChart);
      const info = wrapper.find('.info');
      expect(info.exists()).toBe(true);
      expect(info.text()).toContain('OHLC');
    });
  });

  describe('AreaChart', () => {
    it('should mount successfully', () => {
      wrapper = mount(AreaChart);
      expect(wrapper.exists()).toBe(true);
    });

    it('should render chart container', () => {
      wrapper = mount(AreaChart);
      const container = wrapper.find('.chart-container');
      expect(container.exists()).toBe(true);
    });

    it('should display header with title', () => {
      wrapper = mount(AreaChart);
      const header = wrapper.find('h1');
      expect(header.text()).toBe('Area Chart');
    });
  });

  describe('BarChart', () => {
    it('should mount successfully', () => {
      wrapper = mount(BarChart);
      expect(wrapper.exists()).toBe(true);
    });

    it('should render chart container', () => {
      wrapper = mount(BarChart);
      const container = wrapper.find('.chart-container');
      expect(container.exists()).toBe(true);
    });

    it('should display header with title', () => {
      wrapper = mount(BarChart);
      const header = wrapper.find('h1');
      expect(header.text()).toBe('Bar Chart (OHLC)');
    });
  });

  describe('BaselineChart', () => {
    it('should mount successfully', () => {
      wrapper = mount(BaselineChart);
      expect(wrapper.exists()).toBe(true);
    });

    it('should render chart container', () => {
      wrapper = mount(BaselineChart);
      const container = wrapper.find('.chart-container');
      expect(container.exists()).toBe(true);
    });

    it('should display baseline controls', () => {
      wrapper = mount(BaselineChart);
      const controls = wrapper.find('.controls');
      expect(controls.exists()).toBe(true);
      const input = controls.find('input[type="number"]');
      expect(input.exists()).toBe(true);
    });

    it('should have update button', () => {
      wrapper = mount(BaselineChart);
      const button = wrapper.find('button');
      expect(button.exists()).toBe(true);
      expect(button.text()).toBe('Update');
    });
  });

  describe('HistogramChart', () => {
    it('should mount successfully', () => {
      wrapper = mount(HistogramChart);
      expect(wrapper.exists()).toBe(true);
    });

    it('should render chart container', () => {
      wrapper = mount(HistogramChart);
      const container = wrapper.find('.chart-container');
      expect(container.exists()).toBe(true);
    });

    it('should display legend with color codes', () => {
      wrapper = mount(HistogramChart);
      const legend = wrapper.find('.legend');
      expect(legend.exists()).toBe(true);
      const legendItems = legend.findAll('.legend-item');
      expect(legendItems.length).toBeGreaterThan(0);
    });
  });

  describe('LineChart', () => {
    it('should mount successfully', () => {
      wrapper = mount(LineChart);
      expect(wrapper.exists()).toBe(true);
    });

    it('should render chart container', () => {
      wrapper = mount(LineChart);
      const container = wrapper.find('.chart-container');
      expect(container.exists()).toBe(true);
    });

    it('should display legend with multiple series', () => {
      wrapper = mount(LineChart);
      const legend = wrapper.find('.legend');
      expect(legend.exists()).toBe(true);
      const legendItems = legend.findAll('.legend-item');
      expect(legendItems.length).toBe(3); // 3 line series
    });
  });
});
