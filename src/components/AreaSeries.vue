<template>
  <Series
    type="area"
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
  lineColor?: string;
  lineStyle?: 0 | 1 | 2 | 3;
  lineWidth?: number;
  lineType?: 0 | 1 | 2;
  invertFilledArea?: boolean;
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
    lineColor: props.lineColor,
    lineStyle: props.lineStyle,
    lineWidth: props.lineWidth,
    lineType: props.lineType,
    invertFilledArea: props.invertFilledArea,
  },
  priceLines: props.priceLines,
  markers: props.markers,
  annotations: props.annotations,
}));
</script>
