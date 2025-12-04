/**
 * @fileoverview Time normalization utilities
 *
 * Provides consistent time handling across the application to prevent
 * millisecond/second confusion that can place data 1000x in the future.
 */

import type { Time, BusinessDay } from 'lightweight-charts';

/**
 * Check if a value is a BusinessDay object.
 */
function isBusinessDay(time: unknown): time is BusinessDay {
  return (
    typeof time === 'object' &&
    time !== null &&
    'year' in time &&
    'month' in time &&
    'day' in time
  );
}

/**
 * Normalize any time value to Unix timestamp in seconds.
 *
 * Handles:
 * - BusinessDay objects → converted to UTC timestamp
 * - String dates (ISO format) → parsed to seconds
 * - Millisecond timestamps (> 1e10) → converted to seconds
 * - Second timestamps → returned as-is
 *
 * @param time - Time value in any format (Time union from lightweight-charts)
 * @returns Unix timestamp in seconds
 * @throws Error if time is unparsable or results in NaN
 *
 * @example
 * normalizeTime({ year: 2024, month: 1, day: 1 }) // → 1704067200
 * normalizeTime('2024-01-01') // → 1704067200
 * normalizeTime(1704067200000) // → 1704067200 (ms → s)
 * normalizeTime(1704067200)    // → 1704067200 (s → s)
 */
export function normalizeTime(time: number | string | Time): number {
  // Handle BusinessDay objects
  if (isBusinessDay(time)) {
    const bd = time as BusinessDay;
    // Convert BusinessDay to UTC timestamp (midnight of that day)
    const date = new Date(Date.UTC(bd.year, bd.month - 1, bd.day));
    const timestamp = Math.floor(date.getTime() / 1000);

    if (isNaN(timestamp)) {
      throw new Error(`Invalid BusinessDay: ${JSON.stringify(bd)}`);
    }

    return timestamp;
  }

  if (typeof time === 'string') {
    // Parse string date to seconds
    const parsed = Math.floor(Date.parse(time) / 1000);

    if (isNaN(parsed)) {
      throw new Error(`Unparsable time string: "${time}"`);
    }

    return parsed;
  }

  // Validate numeric timestamp
  if (typeof time !== 'number' || isNaN(time)) {
    throw new Error(`Invalid time value: ${time}`);
  }

  // Detect milliseconds: if timestamp > 10 billion (Sep 2286 in seconds),
  // it's likely milliseconds and needs conversion
  if (time > 1e10) {
    return Math.floor(time / 1000);
  }

  // Already in seconds
  return time;
}

/**
 * Normalize an array of data points with time normalization.
 *
 * @param data - Array of data points
 * @returns Array with normalized timestamps
 */
export function normalizeDataPoints<T extends { time: number | string }>(
  data: T[]
): Array<T & { time: number }> {
  return data.map((point) => ({
    ...point,
    time: normalizeTime(point.time),
  }));
}

/**
 * Check if a time value is in milliseconds.
 *
 * @param time - Time value to check
 * @returns True if time appears to be in milliseconds
 */
export function isMilliseconds(time: number): boolean {
  return time > 1e10;
}

/**
 * Convert seconds to milliseconds.
 *
 * @param seconds - Time in seconds
 * @returns Time in milliseconds
 */
export function toMilliseconds(seconds: number): number {
  return seconds * 1000;
}

/**
 * Convert milliseconds to seconds.
 *
 * @param milliseconds - Time in milliseconds
 * @returns Time in seconds
 */
export function toSeconds(milliseconds: number): number {
  return Math.floor(milliseconds / 1000);
}
