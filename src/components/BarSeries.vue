<template>
  <Series
    type="bar"
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
  upColor?: string;
  downColor?: string;
  openVisible?: boolean;
  thinBars?: boolean;
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
    upColor: props.upColor,
    downColor: props.downColor,
    openVisible: props.openVisible,
    thinBars: props.thinBars,
  },
  priceLines: props.priceLines,
  markers: props.markers,
  annotations: props.annotations,
}));
</script>
