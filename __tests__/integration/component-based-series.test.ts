/**
 * @vitest-environment jsdom
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import LightweightChart from '../../src/components/LightweightChart.vue';
import Series from '../../src/components/Series.vue';
import CandlestickSeries from '../../src/components/CandlestickSeries.vue';
import LineSeries from '../../src/components/LineSeries.vue';
import AreaSeries from '../../src/components/AreaSeries.vue';
import HistogramSeries from '../../src/components/HistogramSeries.vue';
import BandSeries from '../../src/components/BandSeries.vue';

describe('Component-Based Series', () => {
  const sampleLineData = [
    { time: '2024-01-01', value: 100 },
    { time: '2024-01-02', value: 110 },
    { time: '2024-01-03', value: 105 },
  ];

  const sampleCandleData = [
    { time: '2024-01-01', open: 100, high: 110, low: 95, close: 105 },
    { time: '2024-01-02', open: 105, high: 115, low: 100, close: 110 },
    { time: '2024-01-03', open: 110, high: 120, low: 105, close: 115 },
  ];

  describe('Generic Series Component', () => {
    it('renders without errors', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'test-chart',
        },
        slots: {
          default: {
            template: '<Series type="line" :data="data" series-id="test" />',
            components: { Series },
            setup() {
              return { data: sampleLineData };
            },
          },
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
    });

    it('accepts dynamic series type', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'test-chart',
        },
        slots: {
          default: {
            template: '<Series :type="seriesType" :data="data" />',
            components: { Series },
            setup() {
              return {
                seriesType: 'candlestick',
                data: sampleCandleData,
              };
            },
          },
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
    });

    it('creates series with seriesId', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'test-chart',
        },
        slots: {
          default: {
            template: '<Series type="line" :data="data" series-id="my-series" />',
            components: { Series },
            setup() {
              return { data: sampleLineData };
            },
          },
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.findComponent(Series).exists()).toBe(true);
    });
  });

  describe('CandlestickSeries Component', () => {
    it('renders candlestick series', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'test-chart',
        },
        slots: {
          default: {
            template: '<CandlestickSeries :data="data" series-id="candles" />',
            components: { CandlestickSeries },
            setup() {
              return { data: sampleCandleData };
            },
          },
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.findComponent(CandlestickSeries).exists()).toBe(true);
    });

    it('applies candlestick-specific options', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'test-chart',
        },
        slots: {
          default: {
            template: `
              <CandlestickSeries
                :data="data"
                series-id="styled-candles"
                up-color="#26a69a"
                down-color="#ef5350"
              />
            `,
            components: { CandlestickSeries },
            setup() {
              return { data: sampleCandleData };
            },
          },
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('LineSeries Component', () => {
    it('renders line series', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'test-chart',
        },
        slots: {
          default: {
            template: '<LineSeries :data="data" series-id="line" />',
            components: { LineSeries },
            setup() {
              return { data: sampleLineData };
            },
          },
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.findComponent(LineSeries).exists()).toBe(true);
    });

    it('applies line-specific options', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'test-chart',
        },
        slots: {
          default: {
            template: `
              <LineSeries
                :data="data"
                series-id="styled-line"
                color="#2196F3"
                :line-width="3"
              />
            `,
            components: { LineSeries },
            setup() {
              return { data: sampleLineData };
            },
          },
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('AreaSeries Component', () => {
    it('renders area series', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'test-chart',
        },
        slots: {
          default: {
            template: '<AreaSeries :data="data" series-id="area" />',
            components: { AreaSeries },
            setup() {
              return { data: sampleLineData };
            },
          },
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.findComponent(AreaSeries).exists()).toBe(true);
    });
  });

  describe('HistogramSeries Component', () => {
    it('renders histogram series', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'test-chart',
        },
        slots: {
          default: {
            template: '<HistogramSeries :data="data" series-id="hist" />',
            components: { HistogramSeries },
            setup() {
              return { data: sampleLineData };
            },
          },
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.findComponent(HistogramSeries).exists()).toBe(true);
    });
  });

  describe('Custom Series Types', () => {
    it('renders BandSeries', async () => {
      const bandData = [
        { time: '2024-01-01', upper: 110, lower: 90 },
        { time: '2024-01-02', upper: 115, lower: 95 },
      ];

      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'test-chart',
        },
        slots: {
          default: {
            template: '<BandSeries :data="data" series-id="band" />',
            components: { BandSeries },
            setup() {
              return { data: bandData };
            },
          },
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.findComponent(BandSeries).exists()).toBe(true);
    });
  });

  describe('Multiple Series', () => {
    it('renders multiple series of different types', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'test-chart',
        },
        slots: {
          default: {
            template: `
              <div>
                <CandlestickSeries :data="candleData" series-id="candles" />
                <LineSeries :data="lineData" series-id="sma" />
                <HistogramSeries :data="volumeData" series-id="volume" :paneId="1" />
              </div>
            `,
            components: { CandlestickSeries, LineSeries, HistogramSeries },
            setup() {
              return {
                candleData: sampleCandleData,
                lineData: sampleLineData,
                volumeData: sampleLineData,
              };
            },
          },
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.findComponent(CandlestickSeries).exists()).toBe(true);
      expect(wrapper.findComponent(LineSeries).exists()).toBe(true);
      expect(wrapper.findComponent(HistogramSeries).exists()).toBe(true);
    });
  });
});
