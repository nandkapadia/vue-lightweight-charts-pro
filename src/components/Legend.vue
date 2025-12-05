<template>
  <div style="display: none">
    <!-- Legend is rendered by the primitive directly - no DOM needed -->
  </div>
</template>

<script setup lang="ts">
/**
 * @fileoverview Legend component for Vue 3 (component-based approach)
 *
 * This is the Vue-idiomatic way to add legends. Works alongside the config-driven
 * approach for maximum flexibility.
 *
 * @example Config-driven (Streamlit-like):
 * <LightweightChart :legends="[{ corner: 'top-left' }]" />
 *
 * @example Component-based (Vue-like):
 * <LightweightChart>
 *   <Legend corner="top-left" />
 * </LightweightChart>
 *
 * @example Mixed approach:
 * <LightweightChart :legends="[{ corner: 'top-left', paneId: 0 }]">
 *   <Legend corner="bottom-left" :paneId="1" />
 * </LightweightChart>
 */

import { onMounted, onUnmounted, inject, type Ref } from "vue";
import type { IChartApi } from "lightweight-charts";
import { LegendPrimitive, logger } from "@lightweight-charts-pro/core";

interface Props {
  /** Legend text template with placeholders ($$title$$, $$value$$, etc.) */
  text?: string;
  /** Corner position for the legend */
  corner?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
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
  corner: "top-left",
  isPanePrimitive: false,
});

// Inject chart instance from parent
const chart = inject<Ref<IChartApi | null>>("chart");

let legendPrimitive: LegendPrimitive | null = null;

onMounted(() => {
  if (!chart?.value) {
    logger.warn(
      "Chart instance not available. Make sure Legend is a child of LightweightChart.",
      "Legend",
    );
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

    if (targetPane && typeof targetPane.attachPrimitive === "function") {
      targetPane.attachPrimitive(legendPrimitive);
    } else {
      logger.warn("Could not attach primitive to pane", "Legend");
    }
  } catch (error) {
    logger.error("Failed to create legend", "Legend", error);
  }
});

onUnmounted(() => {
  if (legendPrimitive) {
    try {
      // The primitive will clean up automatically when detached
      legendPrimitive = null;
    } catch (error) {
      logger.error("Failed to cleanup legend", "Legend", error);
    }
  }
});
</script>

<style scoped>
/* Legend is rendered by primitive - no styles needed */
</style>
