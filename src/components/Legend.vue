<template>
  <!-- Legend is rendered by the primitive directly -->
</template>

<script setup lang="ts">
/**
 * @fileoverview Legend component for Vue 3
 *
 * Thin wrapper around LegendPrimitive from @lightweight-charts-pro/core.
 * Displays dynamic legend with series values that update on crosshair movement.
 *
 * The primitive attaches to the chart and renders directly to DOM,
 * so this component just manages its lifecycle.
 */

import { onMounted, onUnmounted, inject, type Ref } from 'vue';
import type { IChartApi } from 'lightweight-charts';
import { LegendPrimitive } from '@lightweight-charts-pro/core';

interface Props {
  /** Legend text template with placeholders ($$title$$, $$value$$, etc.) */
  text?: string;
  /** Corner position for the legend */
  corner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** Pane ID to attach legend to (undefined = chart level) */
  paneId?: number;
  /** Value format string */
  valueFormat?: string;
  /** Custom styling */
  style?: Record<string, string | number>;
  /** Whether this is a pane-specific primitive */
  isPanePrimitive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  text: '<div style="color: #fff;">$$title$$: $$close$$</div>',
  corner: 'top-left',
  isPanePrimitive: false,
});

// Inject chart instance from parent
const chart = inject<Ref<IChartApi | null>>('chart');

let legendPrimitive: LegendPrimitive | null = null;

onMounted(() => {
  if (!chart?.value) {
    console.warn('Legend: Chart instance not available');
    return;
  }

  try {
    // Create legend configuration
    const config = {
      corner: props.corner,
      text: props.text,
      valueFormat: props.valueFormat,
      isPanePrimitive: props.isPanePrimitive,
      style: props.style,
      ...(props.paneId !== undefined ? { paneId: props.paneId } : {}),
    };

    // Create the primitive
    legendPrimitive = new LegendPrimitive(`legend-${Date.now()}`, config);

    // Attach to the appropriate pane
    const targetPaneId = props.paneId ?? 0;
    const panes = (chart.value as any).panes?.() || [];
    const targetPane = panes[targetPaneId] || panes[0];

    if (targetPane && typeof targetPane.attachPrimitive === 'function') {
      targetPane.attachPrimitive(legendPrimitive);
    } else {
      console.warn('Legend: Could not attach primitive to pane');
    }
  } catch (error) {
    console.error('Failed to create legend:', error);
  }
});

onUnmounted(() => {
  if (legendPrimitive) {
    try {
      // The primitive will clean up automatically when detached
      legendPrimitive = null;
    } catch (error) {
      console.error('Failed to cleanup legend:', error);
    }
  }
});
</script>

<style scoped>
/* Legend is rendered by primitive - no styles needed */
</style>
