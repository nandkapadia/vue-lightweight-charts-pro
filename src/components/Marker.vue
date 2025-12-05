<template>
  <div style="display: none">
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

import { inject, onMounted, onUnmounted, watch, type Ref } from "vue";
import { createSeriesMarkers, type SeriesMarker } from "lightweight-charts";
import type { ExtendedSeriesApi } from "@lightweight-charts-pro/core";
import { logger } from "@lightweight-charts-pro/core";
import { normalizeTime } from "../utils/time";

interface Props {
  time: number | string;
  position?: "above" | "below" | "inBar" | "aboveBar" | "belowBar";
  color?: string;
  shape?: "circle" | "square" | "arrowUp" | "arrowDown";
  text?: string;
  size?: number;
}

const props = withDefaults(defineProps<Props>(), {
  position: "aboveBar",
  shape: "circle",
  size: 1,
});

const series = inject<Ref<ExtendedSeriesApi | null>>("series");

let marker: SeriesMarker<any> | null = null;
let markerIndex = -1;

/**
 * Create or update the marker on the series.
 */
function createOrUpdateMarker() {
  if (!series?.value) {
    logger.warn(
      "Series instance not available. Make sure Marker is a child of a Series component.",
      "Marker",
    );
    return;
  }

  try {
    // Normalize position
    let normalizedPosition = props.position;
    if (props.position === "above") normalizedPosition = "aboveBar";
    if (props.position === "below") normalizedPosition = "belowBar";

    // Get existing markers
    const existingMarkers = (series.value as any).markers?.() || [];

    // Remove old marker if it exists
    const markersToSet = [...existingMarkers];
    if (markerIndex >= 0 && markerIndex < markersToSet.length) {
      markersToSet.splice(markerIndex, 1);
    }

    // Create new marker object with normalized time
    marker = {
      time: normalizeTime(props.time) as any,
      position: normalizedPosition as any,
      ...(props.color ? { color: props.color } : {}),
      shape: props.shape as any,
      ...(props.text ? { text: props.text } : {}),
      size: props.size,
    } as SeriesMarker<any>;

    // Add new marker and track its index
    markersToSet.push(marker);
    markerIndex = markersToSet.length - 1;

    // Update series markers
    createSeriesMarkers(series.value, markersToSet);
  } catch (error) {
    logger.error("Failed to create marker", "Marker", error);
  }
}

/**
 * Remove this marker from the series.
 */
function removeMarker() {
  if (!series?.value || markerIndex < 0) return;

  try {
    const existingMarkers = (series.value as any).markers?.() || [];
    const markersToSet = [...existingMarkers];
    if (markerIndex < markersToSet.length) {
      markersToSet.splice(markerIndex, 1);
      createSeriesMarkers(series.value, markersToSet);
    }
  } catch (error) {
    logger.error("Failed to remove marker", "Marker", error);
  }

  marker = null;
  markerIndex = -1;
}

// Watch for prop changes and recreate marker
watch(
  () => ({
    time: props.time,
    position: props.position,
    color: props.color,
    shape: props.shape,
    text: props.text,
    size: props.size,
  }),
  () => {
    createOrUpdateMarker();
  },
  { deep: true },
);

onMounted(() => {
  createOrUpdateMarker();
});

onUnmounted(() => {
  removeMarker();
});
</script>
