<template>
  <Series
    type="histogram"
    v-bind="seriesProps"
  >
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
  base?: number;
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
    base: props.base,
  },
  priceLines: props.priceLines,
  markers: props.markers,
  annotations: props.annotations,
}));
</script>
