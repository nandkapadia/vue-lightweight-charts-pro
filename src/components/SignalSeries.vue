<template>
  <Series type="signal" v-bind="seriesProps">
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
  buyColor?: string;
  sellColor?: string;
  neutralColor?: string;
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
    buyColor: props.buyColor,
    sellColor: props.sellColor,
    neutralColor: props.neutralColor,
  },
  priceLines: props.priceLines,
  markers: props.markers,
  annotations: props.annotations,
}));
</script>
