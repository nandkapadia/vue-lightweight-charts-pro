<template>
  <Series type="line" v-bind="seriesProps">
    <slot />
  </Series>
</template>

<script setup lang="ts">
import Series from "./Series.vue";
import type { DataPoint } from "../types";
import { computed } from "vue";

interface Props {
  data?: DataPoint[];
  seriesId?: string;
  paneId?: number;
  color?: string;
  lineStyle?: 0 | 1 | 2 | 3; // Solid, Dotted, Dashed, LargeDashed
  lineWidth?: number;
  lineType?: 0 | 1 | 2; // Simple, WithSteps, Curved
  crosshairMarkerVisible?: boolean;
  crosshairMarkerRadius?: number;
  crosshairMarkerBorderColor?: string;
  crosshairMarkerBackgroundColor?: string;
  lastValueVisible?: boolean;
  priceLineVisible?: boolean;
  title?: string;
  priceLines?: any[];
  markers?: any[];
  annotations?: any[];
}

const props = defineProps<Props>();

const seriesProps = computed(() => ({
  data: props.data,
  seriesId: props.seriesId,
  paneId: props.paneId,
  options: {
    color: props.color,
    lineStyle: props.lineStyle,
    lineWidth: props.lineWidth,
    lineType: props.lineType,
    crosshairMarkerVisible: props.crosshairMarkerVisible,
    crosshairMarkerRadius: props.crosshairMarkerRadius,
    crosshairMarkerBorderColor: props.crosshairMarkerBorderColor,
    crosshairMarkerBackgroundColor: props.crosshairMarkerBackgroundColor,
    lastValueVisible: props.lastValueVisible,
    priceLineVisible: props.priceLineVisible,
    title: props.title,
  },
  priceLines: props.priceLines,
  markers: props.markers,
  annotations: props.annotations,
}));
</script>
