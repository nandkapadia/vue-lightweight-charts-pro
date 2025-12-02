/**
 * Integration tests for trading features examples
 *
 * Tests markers, trades, and annotations
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';

// Trading features examples
import MarkersExample from '../../examples/trading-features/MarkersExample.vue';
import TradesVisualization from '../../examples/trading-features/TradesVisualization.vue';
import PriceLinesAnnotations from '../../examples/trading-features/PriceLinesAnnotations.vue';

describe('Trading Features Integration Tests', () => {
  let wrapper: VueWrapper | null = null;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  });

  describe('MarkersExample', () => {
    it('should mount successfully', () => {
      wrapper = mount(MarkersExample);
      expect(wrapper.exists()).toBe(true);
    });

    it('should render control buttons', () => {
      wrapper = mount(MarkersExample);
      const buttons = wrapper.findAll('button');
      expect(buttons.length).toBeGreaterThanOrEqual(3);
    });

    it('should have regenerate signals button', () => {
      wrapper = mount(MarkersExample);
      const regenerateBtn = wrapper.findAll('button').find((btn) =>
        btn.text().includes('Regenerate')
      );
      expect(regenerateBtn).toBeDefined();
    });

    it('should have clear markers button', () => {
      wrapper = mount(MarkersExample);
      const clearBtn = wrapper.findAll('button').find((btn) =>
        btn.text().includes('Clear')
      );
      expect(clearBtn).toBeDefined();
    });

    it('should display marker types information', () => {
      wrapper = mount(MarkersExample);
      const info = wrapper.find('.info');
      expect(info.text()).toContain('arrowUp');
      expect(info.text()).toContain('arrowDown');
    });
  });

  describe('TradesVisualization', () => {
    it('should mount successfully', () => {
      wrapper = mount(TradesVisualization);
      expect(wrapper.exists()).toBe(true);
    });

    it('should display trading statistics', () => {
      wrapper = mount(TradesVisualization);
      const stats = wrapper.find('.stats');
      expect(stats.exists()).toBe(true);
    });

    it('should show total trades stat', () => {
      wrapper = mount(TradesVisualization);
      const statCards = wrapper.findAll('.stat-card');
      expect(statCards.length).toBeGreaterThan(0);
    });

    it('should render trade history table', () => {
      wrapper = mount(TradesVisualization);
      const tradesTable = wrapper.find('.trades-table');
      expect(tradesTable.exists()).toBe(true);
    });

    it('should display trade rows', () => {
      wrapper = mount(TradesVisualization);
      const header = wrapper.find('.trade-header');
      expect(header.exists()).toBe(true);
      expect(header.text()).toContain('Type');
      expect(header.text()).toContain('Entry');
      expect(header.text()).toContain('Exit');
    });
  });

  describe('PriceLinesAnnotations', () => {
    it('should mount successfully', () => {
      wrapper = mount(PriceLinesAnnotations);
      expect(wrapper.exists()).toBe(true);
    });

    it('should render control buttons', () => {
      wrapper = mount(PriceLinesAnnotations);
      const buttons = wrapper.findAll('button');
      expect(buttons.length).toBeGreaterThanOrEqual(2);
    });

    it('should have add custom level button', () => {
      wrapper = mount(PriceLinesAnnotations);
      const addBtn = wrapper.findAll('button').find((btn) =>
        btn.text().includes('Add Custom')
      );
      expect(addBtn).toBeDefined();
    });

    it('should display legend with price levels', () => {
      wrapper = mount(PriceLinesAnnotations);
      const legend = wrapper.find('.legend-grid');
      expect(legend.exists()).toBe(true);
      const legendItems = legend.findAll('.legend-item');
      expect(legendItems.length).toBeGreaterThan(0);
    });

    it('should include code example', () => {
      wrapper = mount(PriceLinesAnnotations);
      const codeSample = wrapper.find('.code-sample');
      expect(codeSample.exists()).toBe(true);
      expect(codeSample.text()).toContain('createPriceLine');
    });
  });
});
