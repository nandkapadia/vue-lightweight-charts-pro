<template>
  <div style="display: none;">
    <!-- Marker is rendered by the chart - no DOM needed -->
  </div>
</template>

<script setup lang="ts">
/**
 * @fileoverview Marker component for adding markers to a series
 *
 * Must be a child of a Series component. Markers appear as shapes (arrows, circles, squares)
 * at specific time points on the chart.
 *
 * @example
 * <CandlestickSeries :data="priceData">
 *   <Marker :time="1234567890" position="above" color="green" shape="arrowUp" text="Buy" />
 *   <Marker :time="1234567900" position="below" color="red" shape="arrowDown" text="Sell" />
 * </CandlestickSeries>
 */

import { inject, onMounted, onUnmounted, type Ref } from 'vue';
import { createSeriesMarkers, type SeriesMarker } from 'lightweight-charts';
import type { ExtendedSeriesApi } from '@lightweight-charts-pro/core';
import { logger } from '@lightweight-charts-pro/core';

interface Props {
  time: number | string;
  position?: 'above' | 'below' | 'inBar' | 'aboveBar' | 'belowBar';
  color?: string;
  shape?: 'circle' | 'square' | 'arrowUp' | 'arrowDown';
  text?: string;
  size?: number;
}

const props = withDefaults(defineProps<Props>(), {
  position: 'aboveBar',
  shape: 'circle',
  size: 1,
});

const series = inject<Ref<ExtendedSeriesApi | null>>('series');

let marker: SeriesMarker<any> | null = null;

onMounted(() => {
  if (!series?.value) {
    logger.warn('Series instance not available. Make sure Marker is a child of a Series component.', 'Marker');
    return;
  }

  try {
    // Normalize position
    let normalizedPosition = props.position;
    if (props.position === 'above') normalizedPosition = 'aboveBar';
    if (props.position === 'below') normalizedPosition = 'belowBar';

    // Create marker object
    marker = {
      time: props.time as any,
      position: normalizedPosition as any,
      ...(props.color ? { color: props.color } : {}),
      shape: props.shape as any,
      ...(props.text ? { text: props.text } : {}),
      size: props.size,
    } as SeriesMarker<any>;

    // Get existing markers
    const existingMarkers = (series.value as any).markers?.() || [];

    // Add new marker
    createSeriesMarkers(series.value, [...existingMarkers, marker]);
  } catch (error) {
    logger.error('Failed to create marker', 'Marker', error);
  }
});

onUnmounted(() => {
  // Note: Markers are cleaned up when series is removed
  // Individual marker removal would require re-setting all markers minus this one
  marker = null;
});
</script>
