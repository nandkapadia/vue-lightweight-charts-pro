<template>
  <Series
    type="baseline"
    v-bind="seriesProps"
  >
    <slot />
  </Series>
</template>

<script setup lang="ts">
import Series from './Series.vue';
import type { DataPoint } from '../types';
import { computed } from 'vue';

interface Props {
  data?: DataPoint[];
  seriesId?: string;
  paneId?: number;
  baseValue?: number;
  topLineColor?: string;
  topFillColor1?: string;
  topFillColor2?: string;
  bottomLineColor?: string;
  bottomFillColor1?: string;
  bottomFillColor2?: string;
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
    baseValue: props.baseValue,
    topLineColor: props.topLineColor,
    topFillColor1: props.topFillColor1,
    topFillColor2: props.topFillColor2,
    bottomLineColor: props.bottomLineColor,
    bottomFillColor1: props.bottomFillColor1,
    bottomFillColor2: props.bottomFillColor2,
  },
  priceLines: props.priceLines,
  markers: props.markers,
  annotations: props.annotations,
}));
</script>
