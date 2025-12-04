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
import Trade from '../../src/components/Trade.vue';
import Annotation from '../../src/components/Annotation.vue';

describe('Nested Feature Components', () => {
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

  describe('Marker Component', () => {
    it('renders marker as child of series', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'test-chart',
        },
        slots: {
          default: {
            template: `
              <CandlestickSeries :data="data" series-id="candles">
                <Marker :time="'2024-01-02'" position="above" color="green" text="Buy" />
              </CandlestickSeries>
            `,
            components: { CandlestickSeries, Marker },
            setup() {
              return { data: sampleCandleData };
            },
          },
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
    });

    it('renders multiple markers', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'test-chart',
        },
        slots: {
          default: {
            template: `
              <CandlestickSeries :data="data" series-id="candles">
                <Marker :time="'2024-01-01'" position="below" color="green" shape="arrowUp" />
                <Marker :time="'2024-01-03'" position="above" color="red" shape="arrowDown" />
              </CandlestickSeries>
            `,
            components: { CandlestickSeries, Marker },
            setup() {
              return { data: sampleCandleData };
            },
          },
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
    });

    it('supports different shapes', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'test-chart',
        },
        slots: {
          default: {
            template: `
              <LineSeries :data="data" series-id="line">
                <Marker :time="'2024-01-01'" shape="circle" />
                <Marker :time="'2024-01-02'" shape="square" />
                <Marker :time="'2024-01-03'" shape="arrowUp" />
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

  describe('PriceLine Component', () => {
    it('renders price line as child of series', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'test-chart',
        },
        slots: {
          default: {
            template: `
              <CandlestickSeries :data="data" series-id="candles">
                <PriceLine :price="100" color="red" title="Resistance" />
              </CandlestickSeries>
            `,
            components: { CandlestickSeries, PriceLine },
            setup() {
              return { data: sampleCandleData };
            },
          },
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
    });

    it('renders multiple price lines', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'test-chart',
        },
        slots: {
          default: {
            template: `
              <CandlestickSeries :data="data" series-id="candles">
                <PriceLine :price="120" color="red" title="R1" />
                <PriceLine :price="90" color="green" title="S1" />
              </CandlestickSeries>
            `,
            components: { CandlestickSeries, PriceLine },
            setup() {
              return { data: sampleCandleData };
            },
          },
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
    });

    it('supports different line styles', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'test-chart',
        },
        slots: {
          default: {
            template: `
              <LineSeries :data="data" series-id="line">
                <PriceLine :price="100" :line-style="0" />
                <PriceLine :price="110" :line-style="2" />
              </LineSeries>
            `,
            components: { LineSeries, PriceLine },
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

  describe('Trade Component', () => {
    it('renders trade visualization', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'test-chart',
        },
        slots: {
          default: {
            template: `
              <CandlestickSeries :data="data" series-id="candles">
                <Trade
                  :entry="{ time: '2024-01-01', price: 100 }"
                  :exit="{ time: '2024-01-03', price: 115 }"
                  :profitable="true"
                />
              </CandlestickSeries>
            `,
            components: { CandlestickSeries, Trade },
            setup() {
              return { data: sampleCandleData };
            },
          },
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
    });

    it('renders profitable trade', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'test-chart',
        },
        slots: {
          default: {
            template: `
              <CandlestickSeries :data="data" series-id="candles">
                <Trade
                  :entry="{ time: '2024-01-01', price: 100 }"
                  :exit="{ time: '2024-01-02', price: 110 }"
                  :profitable="true"
                  :pnl="10"
                  trade-type="long"
                />
              </CandlestickSeries>
            `,
            components: { CandlestickSeries, Trade },
            setup() {
              return { data: sampleCandleData };
            },
          },
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
    });

    it('renders unprofitable trade', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'test-chart',
        },
        slots: {
          default: {
            template: `
              <CandlestickSeries :data="data" series-id="candles">
                <Trade
                  :entry="{ time: '2024-01-01', price: 110 }"
                  :exit="{ time: '2024-01-02', price: 100 }"
                  :profitable="false"
                  :pnl="-10"
                />
              </CandlestickSeries>
            `,
            components: { CandlestickSeries, Trade },
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

  describe('Annotation Component', () => {
    it('renders annotation on series', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'test-chart',
        },
        slots: {
          default: {
            template: `
              <CandlestickSeries :data="data" series-id="candles">
                <Annotation :time="'2024-01-02'" :price="110" text="News Event" type="text" />
              </CandlestickSeries>
            `,
            components: { CandlestickSeries, Annotation },
            setup() {
              return { data: sampleCandleData };
            },
          },
        },
      });

      await nextTick();
      expect(wrapper.exists()).toBe(true);
    });

    it('supports arrow annotations', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'test-chart',
        },
        slots: {
          default: {
            template: `
              <LineSeries :data="data" series-id="line">
                <Annotation :time="'2024-01-02'" :price="110" type="arrow" position="above" />
              </LineSeries>
            `,
            components: { LineSeries, Annotation },
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

  describe('Multiple Nested Components', () => {
    it('renders multiple different components on same series', async () => {
      const wrapper = mount(LightweightChart, {
        props: {
          chartId: 'test-chart',
        },
        slots: {
          default: {
            template: `
              <CandlestickSeries :data="data" series-id="candles">
                <Marker :time="'2024-01-01'" position="below" color="green" shape="arrowUp" />
                <Marker :time="'2024-01-03'" position="above" color="red" shape="arrowDown" />
                <PriceLine :price="120" color="red" title="Resistance" />
                <PriceLine :price="90" color="green" title="Support" />
                <Trade
                  :entry="{ time: '2024-01-01', price: 100 }"
                  :exit="{ time: '2024-01-03', price: 115 }"
                  :profitable="true"
                />
                <Annotation :time="'2024-01-02'" :price="110" text="Important" />
              </CandlestickSeries>
            `,
            components: { CandlestickSeries, Marker, PriceLine, Trade, Annotation },
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
});
