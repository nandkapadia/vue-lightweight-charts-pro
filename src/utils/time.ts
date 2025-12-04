/**
 * @fileoverview Time normalization utilities
 *
 * Provides consistent time handling across the application to prevent
 * millisecond/second confusion that can place data 1000x in the future.
 */

/**
 * Normalize any time value to Unix timestamp in seconds.
 *
 * Handles:
 * - String dates (ISO format) → parsed to seconds
 * - Millisecond timestamps (> 1e10) → converted to seconds
 * - Second timestamps → returned as-is
 *
 * @param time - Time value in any format
 * @returns Unix timestamp in seconds
 *
 * @example
 * normalizeTime('2024-01-01') // → 1704067200
 * normalizeTime(1704067200000) // → 1704067200 (ms → s)
 * normalizeTime(1704067200)    // → 1704067200 (s → s)
 */
export function normalizeTime(time: number | string): number {
  if (typeof time === 'string') {
    // Parse string date to seconds
    return Math.floor(Date.parse(time) / 1000);
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
