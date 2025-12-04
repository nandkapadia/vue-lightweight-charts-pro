<template>
  <!-- RangeSwitcher is rendered by the primitive directly -->
</template>

<script setup lang="ts">
/**
 * @fileoverview RangeSwitcher component for Vue 3 (component-based approach)
 *
 * This is the Vue-idiomatic way to add range switchers. Works alongside the
 * config-driven approach for maximum flexibility.
 *
 * @example Config-driven (Streamlit-like):
 * <LightweightChart :rangeSwitchers="[{ corner: 'top-right' }]" />
 *
 * @example Component-based (Vue-like):
 * <LightweightChart>
 *   <RangeSwitcher corner="top-right" />
 * </LightweightChart>
 *
 * @example Mixed approach:
 * <LightweightChart :rangeSwitchers="[{ corner: 'top-left', paneId: 0 }]">
 *   <RangeSwitcher corner="top-right" :paneId="1" />
 * </LightweightChart>
 */

import { onMounted, onUnmounted, inject, type Ref } from 'vue';
import type { IChartApi } from 'lightweight-charts';
import {
  RangeSwitcherPrimitive,
  TimeRange,
  type RangeConfig,
} from '@lightweight-charts-pro/core';

interface Props {
  /** Array of range configurations */
  ranges?: RangeConfig[];
  /** Corner position for the range switcher */
  corner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** Pane ID to attach switcher to */
  paneId?: number;
  /** Custom styling */
  style?: Record<string, string | number>;
}

const props = withDefaults(defineProps<Props>(), {
  ranges: () => [
    { text: '1D', range: TimeRange.ONE_DAY },
    { text: '1W', range: TimeRange.ONE_WEEK },
    { text: '1M', range: TimeRange.ONE_MONTH },
    { text: '3M', range: TimeRange.THREE_MONTHS },
    { text: '6M', range: TimeRange.SIX_MONTHS },
    { text: '1Y', range: TimeRange.ONE_YEAR },
    { text: 'All', range: TimeRange.ALL },
  ],
  corner: 'top-right',
  paneId: 0,
});

// Inject chart instance from parent
const chart = inject<Ref<IChartApi | null>>('chart');

let rangeSwitcherPrimitive: RangeSwitcherPrimitive | null = null;

onMounted(() => {
  if (!chart?.value) {
    console.warn('RangeSwitcher: Chart instance not available. Make sure RangeSwitcher is a child of LightweightChart.');
    return;
  }

  try {
    // Create range switcher configuration
    const config = {
      corner: props.corner,
      ranges: props.ranges,
      paneId: props.paneId,
      style: props.style,
    };

    // Create the primitive
    rangeSwitcherPrimitive = new RangeSwitcherPrimitive(
      `range-switcher-${Date.now()}`,
      config
    );

    // Attach to the appropriate pane
    const panes = (chart.value as any).panes?.() || [];
    const targetPane = panes[props.paneId] || panes[0];

    if (targetPane && typeof targetPane.attachPrimitive === 'function') {
      targetPane.attachPrimitive(rangeSwitcherPrimitive);
    } else {
      console.warn('RangeSwitcher: Could not attach primitive to pane');
    }
  } catch (error) {
    console.error('Failed to create range switcher:', error);
  }
});

onUnmounted(() => {
  if (rangeSwitcherPrimitive) {
    try {
      // The primitive will clean up automatically when detached
      rangeSwitcherPrimitive = null;
    } catch (error) {
      console.error('Failed to cleanup range switcher:', error);
    }
  }
});
</script>

<style scoped>
/* RangeSwitcher is rendered by primitive - no styles needed */
</style>
