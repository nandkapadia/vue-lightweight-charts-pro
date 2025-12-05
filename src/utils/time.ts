/**
 * @fileoverview Time normalization utilities for consistent timestamp handling.
 *
 * This module provides utilities to normalize time values across the application,
 * preventing common issues like millisecond/second confusion that can place data
 * 1000x in the future. All functions ensure timestamps are in Unix seconds format.
 *
 * The TradingView Lightweight Charts library expects timestamps in Unix seconds,
 * but data from various sources may come in different formats (milliseconds, strings,
 * BusinessDay objects, etc.). These utilities handle all conversions transparently.
 *
 * @module utils/time
 *
 * @example
 * ```typescript
 * import { normalizeTime, normalizeDataPoints } from '@lightweight-charts-pro/vue3';
 *
 * // Normalize various time formats
 * const t1 = normalizeTime(1704067200);      // seconds → 1704067200
 * const t2 = normalizeTime(1704067200000);   // milliseconds → 1704067200
 * const t3 = normalizeTime('2024-01-01');    // ISO string → 1704067200
 *
 * // Normalize entire dataset
 * const normalized = normalizeDataPoints([
 *   { time: '2024-01-01', value: 100 },
 *   { time: 1704153600000, value: 105 }
 * ]);
 * ```
 */

// Third Party Imports
import type { Time, BusinessDay } from "lightweight-charts";

/**
 * Type guard to check if a value is a BusinessDay object.
 *
 * BusinessDay is a lightweight-charts type representing a calendar date
 * without time information, used for daily charts.
 *
 * @param time - Value to check
 * @returns True if the value is a BusinessDay object with year, month, and day properties
 *
 * @example
 * ```typescript
 * const bd = { year: 2024, month: 1, day: 15 };
 * if (isBusinessDay(bd)) {
 *   console.log('Valid BusinessDay');
 * }
 * ```
 *
 * @internal
 */
function isBusinessDay(time: unknown): time is BusinessDay {
  // Check for object type first, then verify required properties exist
  // BusinessDay has year, month (1-12), and day (1-31) properties
  return (
    typeof time === "object" &&
    time !== null &&
    "year" in time &&
    "month" in time &&
    "day" in time
  );
}

/**
 * Normalize any time value to a Unix timestamp in seconds.
 *
 * This is the primary time conversion function used throughout the library.
 * It handles multiple input formats and ensures consistent output:
 *
 * - **BusinessDay objects** → Converted to UTC midnight timestamp
 * - **ISO date strings** → Parsed using Date.parse()
 * - **Millisecond timestamps** (> 10 billion) → Divided by 1000
 * - **Second timestamps** → Returned unchanged
 *
 * The 10 billion threshold distinguishes milliseconds from seconds:
 * - 10 billion seconds = year 2286 (unlikely to have data this far out)
 * - 10 billion milliseconds = year 1970 + ~4 months (common timestamp range)
 *
 * @param time - Time value in any supported format:
 *   - `number`: Unix timestamp in seconds or milliseconds
 *   - `string`: ISO 8601 date string (e.g., '2024-01-01' or '2024-01-01T12:00:00Z')
 *   - `Time`: Lightweight-charts Time type (UTCTimestamp or BusinessDay)
 * @returns Unix timestamp in seconds (integer)
 * @throws {Error} If the time value cannot be parsed or results in NaN
 *
 * @example
 * ```typescript
 * // BusinessDay object (daily chart format)
 * normalizeTime({ year: 2024, month: 1, day: 1 });
 * // → 1704067200 (2024-01-01 00:00:00 UTC)
 *
 * // ISO date string
 * normalizeTime('2024-01-01');
 * // → 1704067200 (interpreted as local timezone)
 *
 * // ISO datetime with timezone
 * normalizeTime('2024-01-01T00:00:00Z');
 * // → 1704067200 (explicit UTC)
 *
 * // Millisecond timestamp (automatically detected and converted)
 * normalizeTime(1704067200000);
 * // → 1704067200
 *
 * // Second timestamp (passed through unchanged)
 * normalizeTime(1704067200);
 * // → 1704067200
 * ```
 */
export function normalizeTime(time: number | string | Time): number {
  // -------------------------------------------------------------------------
  // Handle BusinessDay objects (used by lightweight-charts for daily data)
  // -------------------------------------------------------------------------
  if (isBusinessDay(time)) {
    // Cast to BusinessDay to access typed properties
    const bd = time as BusinessDay;

    // Create Date at UTC midnight for the given calendar date
    // Note: JavaScript months are 0-indexed, so we subtract 1 from month
    const date = new Date(Date.UTC(bd.year, bd.month - 1, bd.day));

    // Convert from milliseconds to seconds
    const timestamp = Math.floor(date.getTime() / 1000);

    // Validate the result to catch invalid BusinessDay values
    if (isNaN(timestamp)) {
      throw new Error(`Invalid BusinessDay: ${JSON.stringify(bd)}`);
    }

    return timestamp;
  }

  // -------------------------------------------------------------------------
  // Handle string dates (ISO format or other parseable formats)
  // -------------------------------------------------------------------------
  if (typeof time === "string") {
    // Date.parse() interprets strings without timezone as local timezone
    // This is intentional to allow users to provide local dates easily
    // For explicit UTC, use 'Z' suffix: '2024-01-01T00:00:00Z'
    const parsed = Math.floor(Date.parse(time) / 1000);

    // Validate parsing succeeded
    if (isNaN(parsed)) {
      throw new Error(`Unparsable time string: "${time}"`);
    }

    return parsed;
  }

  // -------------------------------------------------------------------------
  // Handle numeric timestamps (validate and convert if needed)
  // -------------------------------------------------------------------------

  // Validate that we have a valid number
  if (typeof time !== "number" || isNaN(time)) {
    throw new Error(`Invalid time value: ${time}`);
  }

  // Detect and convert millisecond timestamps to seconds
  // Threshold: 10 billion (Sep 2286 in seconds, year 1970 + 4 months in ms)
  // Any timestamp > 10B is almost certainly milliseconds
  if (time > 1e10) {
    return Math.floor(time / 1000);
  }

  // Already in seconds format - return as-is
  return time;
}

/**
 * Normalize timestamps in an array of data points with validation.
 *
 * This function processes an entire dataset, normalizing the `time` field
 * of each data point and validating that no fields contain NaN or undefined.
 * It's designed to catch data quality issues early before they cause
 * rendering problems in the chart.
 *
 * @template T - Data point type with at least a `time` property
 * @param data - Array of data points to normalize
 * @returns New array with normalized timestamps (original array unchanged)
 * @throws {Error} If any data point has undefined/null time or NaN values
 *
 * @example
 * ```typescript
 * // Normalize candlestick data from various sources
 * const rawData = [
 *   { time: '2024-01-01', open: 100, high: 105, low: 98, close: 103 },
 *   { time: 1704153600000, open: 103, high: 108, low: 101, close: 106 },
 * ];
 *
 * const normalized = normalizeDataPoints(rawData);
 * // Returns:
 * // [
 * //   { time: 1704067200, open: 100, high: 105, low: 98, close: 103 },
 * //   { time: 1704153600, open: 103, high: 108, low: 101, close: 106 },
 * // ]
 *
 * // Validation catches bad data
 * normalizeDataPoints([{ time: '2024-01-01', value: NaN }]);
 * // Throws: "Data point at index 0 has NaN in field "value""
 * ```
 */
export function normalizeDataPoints<T extends { time: number | string }>(
  data: T[],
): Array<T & { time: number }> {
  // Map over each data point, transforming and validating
  return data.map((point, index) => {
    // -----------------------------------------------------------------------
    // Validate required time field exists
    // -----------------------------------------------------------------------
    if (point.time === undefined || point.time === null) {
      throw new Error(`Data point at index ${index} has undefined/null time`);
    }

    // -----------------------------------------------------------------------
    // Check for NaN in any numeric field
    // This catches common issues like division by zero or invalid calculations
    // -----------------------------------------------------------------------
    Object.entries(point).forEach(([key, value]) => {
      if (typeof value === "number" && isNaN(value)) {
        throw new Error(
          `Data point at index ${index} has NaN in field "${key}"`,
        );
      }
    });

    // -----------------------------------------------------------------------
    // Return new object with normalized time
    // Using spread operator preserves all original fields
    // -----------------------------------------------------------------------
    return {
      ...point,
      time: normalizeTime(point.time),
    };
  });
}

/**
 * Check if a numeric timestamp appears to be in milliseconds.
 *
 * Uses the 10 billion threshold: any timestamp greater than 10^10 is
 * almost certainly in milliseconds (would be year 2286+ in seconds).
 *
 * @param time - Numeric timestamp to check
 * @returns True if the timestamp is likely in milliseconds
 *
 * @example
 * ```typescript
 * isMilliseconds(1704067200000); // → true (milliseconds)
 * isMilliseconds(1704067200);    // → false (seconds)
 * ```
 */
export function isMilliseconds(time: number): boolean {
  // Timestamps > 10 billion are almost certainly milliseconds
  return time > 1e10;
}

/**
 * Convert a timestamp from seconds to milliseconds.
 *
 * Useful when interfacing with JavaScript Date APIs or other systems
 * that expect millisecond timestamps.
 *
 * @param seconds - Unix timestamp in seconds
 * @returns Unix timestamp in milliseconds
 *
 * @example
 * ```typescript
 * const ms = toMilliseconds(1704067200);
 * // → 1704067200000
 *
 * // Use with Date constructor
 * const date = new Date(toMilliseconds(timestamp));
 * ```
 */
export function toMilliseconds(seconds: number): number {
  return seconds * 1000;
}

/**
 * Convert a timestamp from milliseconds to seconds.
 *
 * Useful when receiving data from JavaScript Date.getTime() or other
 * systems that use millisecond timestamps.
 *
 * @param milliseconds - Unix timestamp in milliseconds
 * @returns Unix timestamp in seconds (floored to integer)
 *
 * @example
 * ```typescript
 * const seconds = toSeconds(1704067200000);
 * // → 1704067200
 *
 * // Convert from Date object
 * const timestamp = toSeconds(Date.now());
 * ```
 */
export function toSeconds(milliseconds: number): number {
  // Use Math.floor to ensure integer result
  return Math.floor(milliseconds / 1000);
}
