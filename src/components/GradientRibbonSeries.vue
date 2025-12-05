<template>
  <Series
    type="gradientribbon"
    v-bind="seriesProps"
  >
    <slot />
  </Series>
</template>

<script setup lang="ts">
import Series from "./Series.vue";
import type { DataPoint } from "../types";
import type { Annotation } from "@lightweight-charts-pro/core";
import type {
  CreatePriceLineOptions,
  SeriesMarker,
  Time,
} from "lightweight-charts";
import { computed } from "vue";

interface Props {
  data?: DataPoint[];
  seriesId?: string;
  paneId?: number;
  topColor?: string;
  bottomColor?: string;
  lineWidth?: number;
  priceLines?: CreatePriceLineOptions[];
  markers?: SeriesMarker<Time>[];
  annotations?: Annotation[];
}

const props = defineProps<Props>();

const seriesProps = computed(() => ({
  data: props.data,
  seriesId: props.seriesId,
  paneId: props.paneId,
  options: {
    topColor: props.topColor,
    bottomColor: props.bottomColor,
    lineWidth: props.lineWidth,
  },
  priceLines: props.priceLines,
  markers: props.markers,
  annotations: props.annotations,
}));
</script>
