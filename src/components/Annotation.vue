<template>
  <div style="display: none;">
    <!-- Annotation is rendered by the chart - no DOM needed -->
  </div>
</template>

<script setup lang="ts">
/**
 * @fileoverview Annotation component for adding text and shapes to charts
 *
 * Can be used as:
 * 1. Child of Series - Series-level annotation
 * 2. Child of LightweightChart - Chart-level annotation
 *
 * Supports multiple types: text, arrow, shape, circle, rectangle, line
 *
 * @example Series-level annotation:
 * <CandlestickSeries :data="priceData">
 *   <Annotation :time="123" :price="100" text="Buy Signal" type="arrow" position="above" />
 * </CandlestickSeries>
 *
 * @example Chart-level annotation:
 * <LightweightChart>
 *   <Annotation :time="123" text="Market Event" type="text" />
 * </LightweightChart>
 */

import { inject, onMounted, onUnmounted, watch, type Ref } from 'vue';
import type { ExtendedSeriesApi } from '@lightweight-charts-pro/core';
import { createAnnotationVisualElements, logger } from '@lightweight-charts-pro/core';
import { createSeriesMarkers } from 'lightweight-charts';
import { normalizeTime } from '../utils/time';

interface Props {
  time: number | string;
  price?: number;
  text?: string;
  type?: 'text' | 'arrow' | 'shape' | 'circle' | 'rectangle' | 'line';
  position?: 'above' | 'below' | 'inBar' | 'aboveBar' | 'belowBar';
  color?: string;
  textColor?: string;
  backgroundColor?: string;
  fontSize?: number;
  // For shape annotations
  points?: Array<{ time: number | string; price: number }>;
  fillColor?: string;
  borderWidth?: number;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  position: 'aboveBar',
  color: '#2196F3',
  textColor: '#131722',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  fontSize: 12,
});

const series = inject<Ref<ExtendedSeriesApi | null>>('series', null as any);

let annotationMarkers: any[] = [];

/**
 * Create or update annotation.
 */
function createOrUpdateAnnotation() {
  // Can work with or without series (chart-level vs series-level)
  if (!series?.value) {
    logger.warn('No series found. Chart-level annotations not yet fully implemented.', 'Annotation');
    return;
  }

  try {
    // Build annotation config with normalized time
    const annotationConfig = {
      time: normalizeTime(props.time),
      price: props.price,
      text: props.text,
      type: props.type,
      position: props.position,
      color: props.color,
      textColor: props.textColor,
      backgroundColor: props.backgroundColor,
      fontSize: props.fontSize,
      // Normalize time in points array as well
      points: props.points?.map(p => ({ ...p, time: normalizeTime(p.time) })),
      fillColor: props.fillColor,
      borderWidth: props.borderWidth,
    };

    // Create annotation visual elements
    const annotationVisuals = createAnnotationVisualElements([annotationConfig as any]);

    // Remove old markers first
    if (annotationMarkers.length > 0) {
      const existingMarkers = (series.value as any).markers?.() || [];
      const filtered = existingMarkers.filter((m: any) => !annotationMarkers.includes(m));
      createSeriesMarkers(series.value, filtered);
      annotationMarkers = [];
    }

    // Apply new markers
    if (annotationVisuals.markers?.length && series.value) {
      const existingMarkers = (series.value as any).markers?.() || [];
      createSeriesMarkers(series.value, [...existingMarkers, ...annotationVisuals.markers]);
      annotationMarkers = annotationVisuals.markers;
    }

    // Log shapes and texts (full rendering pending)
    if (annotationVisuals.shapes?.length) {
      logger.warn(`Annotation shapes available: ${annotationVisuals.shapes.length}`, 'Annotation');
    }
    if (annotationVisuals.texts?.length) {
      logger.warn(`Annotation texts available: ${annotationVisuals.texts.length}`, 'Annotation');
    }
  } catch (error) {
    logger.error('Failed to create annotation', 'Annotation', error);
  }
}

/**
 * Remove annotation.
 */
function removeAnnotation() {
  if (!series?.value || annotationMarkers.length === 0) return;

  try {
    const existingMarkers = (series.value as any).markers?.() || [];
    const filtered = existingMarkers.filter((m: any) => !annotationMarkers.includes(m));
    createSeriesMarkers(series.value, filtered);
    annotationMarkers = [];
  } catch (error) {
    logger.error('Failed to remove annotation', 'Annotation', error);
  }
}

// Watch for prop changes
watch(
  () => ({
    time: props.time,
    price: props.price,
    text: props.text,
    type: props.type,
    position: props.position,
    color: props.color,
    textColor: props.textColor,
    backgroundColor: props.backgroundColor,
    fontSize: props.fontSize,
  }),
  () => {
    createOrUpdateAnnotation();
  },
  { deep: true }
);

onMounted(() => {
  createOrUpdateAnnotation();
});

onUnmounted(() => {
  removeAnnotation();
});
</script>
