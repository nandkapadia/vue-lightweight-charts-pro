/**
 * @vitest-environment jsdom
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import LightweightChart from '../../src/components/LightweightChart.vue';
import CandlestickSeries from '../../src/components/CandlestickSeries.vue';
import LineSeries from '../../src/components/LineSeries.vue';
import Marker from '../../src/components/Marker.vue';
import PriceLine from '../../src/components/PriceLine.vue';
import Legend from '../../src/components/Legend.vue';
import RangeSwitcher from '../../src/components/RangeSwitcher.vue';

describe('Dual-Approach Integration (Config + Components)', () => {
  const sampleCandleData = [
    { time: '2024-01-01', open: 100, high: 110, low: 95, close: 105 },
    { time: '2024-01-02', open: 105, high: 115, low: 100, close: 110 },
    { time: '2024-01-03', open: 110, high: 120, low: 105, close: 115 },
  ];

  const sampleLineData = [
    { time: '2024-01-01', value: 100 },
    { time: '2024-01-02', value: 110 },
    { time: '2024-01-03', value: 105 },
  ];

  describe('Config-Driven Approach (Streamlit Parity)', () => {
    it('works with series config only', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'config-chart',
          series: [
            {
              seriesType: 'candlestick',
              data: sampleCandleData,
              seriesId: 'candles',
            },
          ],
        },
      });

      await nextTick();
      const seriesMap = (wrapper.vm as any).seriesMap;
      expect(seriesMap.has('candles')).toBe(true);
    });

    it('works with legends config', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'config-chart',
          series: [
            {
              seriesType: 'line',
              data: sampleLineData,
              seriesId: 'line',
            },
          ],
          legends: [{ corner: 'top-left' }],
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
    });

    it('works with rangeSwitchers config', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'config-chart',
          series: [
            {
              seriesType: 'line',
              data: sampleLineData,
              seriesId: 'line',
            },
          ],
          rangeSwitchers: [{ corner: 'top-right' }],
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
    });

    it('works with markers in series config', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'config-chart',
          series: [
            {
              seriesType: 'line',
              data: sampleLineData,
              seriesId: 'line',
              markers: [
                { time: '2024-01-02', position: 'aboveBar', color: 'green' },
              ],
            },
          ],
        },
      });

      await nextTick();
      const seriesMap = (wrapper.vm as any).seriesMap;
      expect(seriesMap.has('line')).toBe(true);
    });
  });

  describe('Component-Based Approach (Vue-Idiomatic)', () => {
    it('works with component series only', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'component-chart',
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

    it('works with component legends', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'component-chart',
        },
        slots: {
          default: {
            template: `
              <div>
                <LineSeries :data="data" series-id="line" />
                <Legend corner="top-left" />
              </div>
            `,
            components: { LineSeries, Legend },
            setup() {
              return { data: sampleLineData };
            },
          },
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
    });

    it('works with nested markers', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'component-chart',
        },
        slots: {
          default: {
            template: `
              <LineSeries :data="data" series-id="line">
                <Marker :time="'2024-01-02'" position="above" color="green" />
              </LineSeries>
            `,
            components: { LineSeries, Marker },
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

  describe('Mixed Approach (Config + Components)', () => {
    it('mixes config series with component series', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'mixed-chart',
          series: [
            {
              seriesType: 'line',
              data: sampleLineData,
              seriesId: 'sma',
            },
          ],
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

    it('mixes config legends with component legends', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'mixed-chart',
          series: [
            {
              seriesType: 'line',
              data: sampleLineData,
              seriesId: 'line',
            },
          ],
          legends: [{ corner: 'top-left', paneId: 0 }],
        },
        slots: {
          default: {
            template: '<Legend corner="bottom-left" />',
            components: { Legend },
          },
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
    });

    it('mixes config rangeSwitcher with component rangeSwitcher', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'mixed-chart',
          series: [
            {
              seriesType: 'line',
              data: sampleLineData,
              seriesId: 'line',
            },
          ],
          rangeSwitchers: [{ corner: 'top-left' }],
        },
        slots: {
          default: {
            template: '<RangeSwitcher corner="top-right" />',
            components: { RangeSwitcher },
          },
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
    });

    it('adds component markers to config series', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'mixed-chart',
          series: [
            {
              seriesType: 'candlestick',
              data: sampleCandleData,
              seriesId: 'candles',
            },
          ],
        },
        slots: {
          default: {
            template: `
              <CandlestickSeries series-id="candles">
                <Marker :time="'2024-01-02'" position="above" color="green" />
              </CandlestickSeries>
            `,
            components: { CandlestickSeries, Marker },
          },
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
    });

    it('comprehensive mixed usage', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'comprehensive-chart',
          series: [
            {
              seriesType: 'line',
              data: sampleLineData,
              seriesId: 'baseline',
              markers: [
                { time: '2024-01-01', position: 'belowBar', color: 'blue' },
              ],
            },
          ],
          legends: [{ corner: 'top-left', paneId: 0 }],
          rangeSwitchers: [{ corner: 'bottom-right' }],
        },
        slots: {
          default: {
            template: `
              <div>
                <CandlestickSeries :data="candleData" series-id="candles">
                  <Marker :time="'2024-01-02'" position="above" color="green" />
                  <PriceLine :price="120" color="red" />
                </CandlestickSeries>
                <LineSeries :data="lineData" series-id="sma" :color="'#2196F3'" />
                <Legend corner="bottom-left" />
                <RangeSwitcher corner="top-right" />
              </div>
            `,
            components: { CandlestickSeries, LineSeries, Marker, PriceLine, Legend, RangeSwitcher },
            setup() {
              return {
                candleData: sampleCandleData,
                lineData: sampleLineData,
              };
            },
          },
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.findComponent(CandlestickSeries).exists()).toBe(true);
      expect(wrapper.findComponent(LineSeries).exists()).toBe(true);
      expect(wrapper.findComponent(Legend).exists()).toBe(true);
      expect(wrapper.findComponent(RangeSwitcher).exists()).toBe(true);
    });
  });

  describe('Backwards Compatibility', () => {
    it('existing config-only code still works', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'legacy-chart',
          series: [
            {
              seriesType: 'candlestick',
              data: sampleCandleData,
              seriesId: 'price',
              markers: [
                { time: '2024-01-02', position: 'aboveBar', color: 'green', text: 'Buy' },
              ],
              priceLines: [
                { price: 120, color: 'red', title: 'Resistance' },
              ],
            },
          ],
          legends: [{ corner: 'top-left' }],
          rangeSwitchers: [{ corner: 'top-right' }],
        },
      });

      await nextTick();
      const seriesMap = (wrapper.vm as any).seriesMap;
      expect(seriesMap.has('price')).toBe(true);
      expect(wrapper.exists()).toBe(true);
    });
  });
});
