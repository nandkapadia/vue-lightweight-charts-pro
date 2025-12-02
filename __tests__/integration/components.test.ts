/**
 * Integration tests for component examples
 *
 * Tests multi-pane, legends, and linked charts
 */

import { describe, it, expect, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';

// Component examples
import MultiPane from '../../examples/components/MultiPane.vue';
import ChartWithLegend from '../../examples/components/ChartWithLegend.vue';
import LinkedCharts from '../../examples/components/LinkedCharts.vue';

describe('Components Integration Tests', () => {
  let wrapper: VueWrapper | null = null;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  });

  describe('MultiPane', () => {
    it('should mount successfully', () => {
      wrapper = mount(MultiPane);
      expect(wrapper.exists()).toBe(true);
    });

    it('should render chart container', () => {
      wrapper = mount(MultiPane);
      const container = wrapper.find('.chart-container');
      expect(container.exists()).toBe(true);
    });

    it('should have regenerate button', () => {
      wrapper = mount(MultiPane);
      const button = wrapper.find('button');
      expect(button.exists()).toBe(true);
      expect(button.text()).toBe('Regenerate Data');
    });

    it('should display pane labels', () => {
      wrapper = mount(MultiPane);
      const paneLabels = wrapper.findAll('.pane-label');
      expect(paneLabels.length).toBe(3); // Price, Volume, RSI
    });

    it('should show legend', () => {
      wrapper = mount(MultiPane);
      const legend = wrapper.find('.legend');
      expect(legend.exists()).toBe(true);
      const legendItems = legend.findAll('.legend-item');
      expect(legendItems.length).toBe(3);
    });
  });

  describe('ChartWithLegend', () => {
    it('should mount successfully', () => {
      wrapper = mount(ChartWithLegend);
      expect(wrapper.exists()).toBe(true);
    });

    it('should render custom legend', () => {
      wrapper = mount(ChartWithLegend);
      const legend = wrapper.find('.custom-legend');
      expect(legend.exists()).toBe(true);
    });

    it('should display legend items', () => {
      wrapper = mount(ChartWithLegend);
      const legendItems = wrapper.findAll('.legend-item');
      expect(legendItems.length).toBe(3); // Price, SMA20, SMA50
    });

    it('should have clickable legend items', () => {
      wrapper = mount(ChartWithLegend);
      const legendItems = wrapper.findAll('.legend-item');
      legendItems.forEach((item) => {
        // Items should have cursor pointer style
        expect(item.classes()).not.toContain('no-pointer');
      });
    });

    it('should show current values', () => {
      wrapper = mount(ChartWithLegend);
      const values = wrapper.findAll('.legend-value');
      expect(values.length).toBe(3);
    });
  });

  describe('LinkedCharts', () => {
    it('should mount successfully', () => {
      wrapper = mount(LinkedCharts);
      expect(wrapper.exists()).toBe(true);
    });

    it('should render multiple chart panels', () => {
      wrapper = mount(LinkedCharts);
      const panels = wrapper.findAll('.chart-panel');
      expect(panels.length).toBe(2); // Price and Volume
    });

    it('should display chart titles', () => {
      wrapper = mount(LinkedCharts);
      const titles = wrapper.findAll('.chart-panel h3');
      expect(titles.length).toBe(2);
      expect(titles[0].text()).toBe('Price Chart');
      expect(titles[1].text()).toBe('Volume Chart');
    });

    it('should have both chart containers', () => {
      wrapper = mount(LinkedCharts);
      const containers = wrapper.findAll('.chart-container');
      expect(containers.length).toBe(2);
    });

    it('should include synchronization info', () => {
      wrapper = mount(LinkedCharts);
      const info = wrapper.find('.info');
      expect(info.text()).toContain('synchron');
      expect(info.text()).toContain('Time Scale');
    });
  });
});
