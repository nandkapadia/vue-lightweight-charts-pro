/**
 * @fileoverview General utility functions for the Vue 3 Lightweight Charts package.
 *
 * This module provides common utility functions used throughout the library,
 * including time conversion, object manipulation, function throttling/debouncing,
 * and ID generation.
 *
 * @module utils
 *
 * @example
 * ```typescript
 * import {
 *   toTimestamp,
 *   formatTimestamp,
 *   deepMerge,
 *   debounce,
 *   generateId
 * } from '@lightweight-charts-pro/vue3/utils';
 *
 * // Convert time to timestamp
 * const ts = toTimestamp('2024-01-01');
 *
 * // Merge configuration objects
 * const config = deepMerge(defaultOptions, userOptions);
 *
 * // Debounce scroll handler
 * const handleScroll = debounce(updateChart, 300);
 * ```
 */

/**
 * Convert various time formats to a Unix timestamp in seconds.
 *
 * Handles numbers, ISO date strings, and Date objects. Automatically
 * detects and converts millisecond timestamps to seconds.
 *
 * @param time - Time value in any supported format:
 *   - `number`: Unix timestamp (seconds or milliseconds)
 *   - `string`: Parseable date string (ISO 8601 recommended)
 *   - `Date`: JavaScript Date object
 * @returns Unix timestamp in seconds, or 0 if parsing fails
 *
 * @example
 * ```typescript
 * // From number (milliseconds detected and converted)
 * toTimestamp(1704067200000); // → 1704067200
 *
 * // From string
 * toTimestamp('2024-01-01'); // → 1704067200
 *
 * // From Date object
 * toTimestamp(new Date('2024-01-01')); // → 1704067200
 *
 * // Invalid input returns 0
 * toTimestamp('invalid'); // → 0
 * ```
 */
export function toTimestamp(time: number | string | Date): number {
  // ---------------------------------------------------------------------------
  // Handle numeric timestamps
  // ---------------------------------------------------------------------------
  if (typeof time === "number") {
    // Detect milliseconds: timestamps > 10^12 are almost certainly in ms
    // (10^12 seconds = year 33,658, way beyond any realistic data)
    return time > 1e12 ? Math.floor(time / 1000) : time;
  }

  // ---------------------------------------------------------------------------
  // Handle string dates
  // ---------------------------------------------------------------------------
  if (typeof time === "string") {
    // Parse the string using JavaScript's Date.parse()
    const parsed = Date.parse(time);
    // Return 0 for unparseable strings instead of NaN
    return isNaN(parsed) ? 0 : Math.floor(parsed / 1000);
  }

  // ---------------------------------------------------------------------------
  // Handle Date objects
  // ---------------------------------------------------------------------------
  if (time instanceof Date) {
    // getTime() returns milliseconds, convert to seconds
    return Math.floor(time.getTime() / 1000);
  }

  // Fallback for unrecognized types
  return 0;
}

/**
 * Format a Unix timestamp for human-readable display.
 *
 * Uses the browser's locale settings for formatting.
 *
 * @param timestamp - Unix timestamp in seconds
 * @param format - Output format type:
 *   - `'date'`: Date only (e.g., "1/1/2024")
 *   - `'datetime'`: Date and time (e.g., "1/1/2024, 12:00:00 PM")
 *   - `'time'`: Time only (e.g., "12:00:00 PM")
 * @returns Formatted date/time string according to browser locale
 *
 * @example
 * ```typescript
 * const timestamp = 1704067200; // 2024-01-01 00:00:00 UTC
 *
 * formatTimestamp(timestamp, 'date');     // "1/1/2024" (US locale)
 * formatTimestamp(timestamp, 'datetime'); // "1/1/2024, 12:00:00 AM"
 * formatTimestamp(timestamp, 'time');     // "12:00:00 AM"
 * ```
 */
export function formatTimestamp(
  timestamp: number,
  format: "date" | "datetime" | "time" = "date",
): string {
  // Convert seconds to milliseconds for Date constructor
  const date = new Date(timestamp * 1000);

  // Use built-in locale formatting methods
  switch (format) {
    case "date":
      // Returns date in locale format (e.g., "MM/DD/YYYY" for US)
      return date.toLocaleDateString();
    case "datetime":
      // Returns both date and time in locale format
      return date.toLocaleString();
    case "time":
      // Returns time only in locale format (e.g., "HH:MM:SS AM/PM")
      return date.toLocaleTimeString();
    default:
      // Default to date format for unknown values
      return date.toLocaleDateString();
  }
}

/**
 * Recursively merge two objects, combining nested properties.
 *
 * Creates a new object with properties from both source objects.
 * Nested objects are merged recursively; arrays and primitives
 * from the source override the target.
 *
 * @template T - Object type (must be a Record)
 * @param target - Base object to merge into
 * @param source - Object with properties to merge
 * @returns New merged object (original objects unchanged)
 *
 * @example
 * ```typescript
 * const defaults = {
 *   layout: { backgroundColor: '#fff', textColor: '#000' },
 *   timeScale: { visible: true }
 * };
 *
 * const userConfig = {
 *   layout: { backgroundColor: '#1e1e1e' }
 * };
 *
 * const merged = deepMerge(defaults, userConfig);
 * // Result:
 * // {
 * //   layout: { backgroundColor: '#1e1e1e', textColor: '#000' },
 * //   timeScale: { visible: true }
 * // }
 * ```
 */
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>,
): T {
  // Start with a shallow copy of the target object
  const result = { ...target };

  // Iterate over all properties in the source object
  for (const key in source) {
    // Only process own properties (not inherited from prototype)
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const targetValue = target[key];
      const sourceValue = source[key];

      // If both values are plain objects, merge them recursively
      if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
        result[key] = deepMerge(
          targetValue as Record<string, unknown>,
          sourceValue as Record<string, unknown>,
        ) as T[typeof key];
      } else if (sourceValue !== undefined) {
        // Otherwise, use source value if defined (overrides target)
        result[key] = sourceValue as T[typeof key];
      }
      // If sourceValue is undefined, keep targetValue (implicit from spread)
    }
  }

  return result;
}

/**
 * Type guard to check if a value is a plain JavaScript object.
 *
 * Returns true for objects created with `{}` or `new Object()`.
 * Returns false for arrays, null, Date, RegExp, and other built-ins.
 *
 * @param value - Value to check
 * @returns True if value is a plain object
 *
 * @internal
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  // Check for object type, exclude null, and exclude arrays
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Create a debounced version of a function.
 *
 * The debounced function delays invoking the original function until
 * after `delay` milliseconds have elapsed since the last call. Useful
 * for limiting expensive operations triggered by rapid events like
 * typing, resizing, or scrolling.
 *
 * @template T - Function type
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds before invoking
 * @returns Debounced function with same parameters
 *
 * @example
 * ```typescript
 * // Debounce search input handler
 * const handleSearch = debounce((query: string) => {
 *   fetchResults(query);
 * }, 300);
 *
 * // Called on every keystroke, but fetchResults only runs
 * // 300ms after user stops typing
 * inputElement.addEventListener('input', (e) => {
 *   handleSearch(e.target.value);
 * });
 * ```
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  // Track the pending timeout ID for cancellation
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    // Cancel any existing pending invocation
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Schedule new invocation after the delay
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
}

/**
 * Create a throttled version of a function.
 *
 * The throttled function invokes the original function at most once
 * per `limit` milliseconds. Unlike debounce, throttle ensures the
 * function is called periodically during sustained activity.
 *
 * @template T - Function type
 * @param fn - Function to throttle
 * @param limit - Minimum time between invocations in milliseconds
 * @returns Throttled function with same parameters
 *
 * @example
 * ```typescript
 * // Throttle scroll handler to run at most every 100ms
 * const handleScroll = throttle(() => {
 *   updateProgressIndicator();
 * }, 100);
 *
 * // Called many times per second during scroll, but
 * // updateProgressIndicator runs at most 10 times/second
 * window.addEventListener('scroll', handleScroll);
 * ```
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number,
): (...args: Parameters<T>) => void {
  // Track the timestamp of the last invocation
  let lastCall = 0;
  // Track pending timeout for trailing edge invocation
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    // Calculate time remaining until next allowed invocation
    const remaining = limit - (now - lastCall);

    if (remaining <= 0) {
      // Enough time has passed - invoke immediately
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastCall = now;
      fn(...args);
    } else if (!timeoutId) {
      // Schedule trailing edge invocation
      // This ensures the last call in a burst is eventually processed
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        timeoutId = null;
        fn(...args);
      }, remaining);
    }
    // If timeout already pending, ignore this call (will be handled by timeout)
  };
}

/**
 * Generate a unique identifier string.
 *
 * Creates IDs using a combination of timestamp and random characters.
 * Suitable for temporary client-side IDs; not cryptographically secure.
 *
 * @param prefix - Optional prefix for the ID (default: 'id')
 * @returns Unique identifier string in format `{prefix}_{timestamp}_{random}`
 *
 * @example
 * ```typescript
 * generateId();          // "id_1704067200000_a1b2c3d4e"
 * generateId('series');  // "series_1704067200000_f5g6h7i8j"
 * generateId('marker');  // "marker_1704067200000_k9l0m1n2o"
 * ```
 */
export function generateId(prefix: string = "id"): string {
  // Combine:
  // - Prefix for identification
  // - Timestamp for rough uniqueness
  // - Random string for collision avoidance
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Clamp a numeric value to a specified range.
 *
 * Ensures the value falls within [min, max] bounds, returning the boundary
 * value if the input exceeds the range.
 *
 * @param value - Value to clamp
 * @param min - Minimum allowed value (inclusive)
 * @param max - Maximum allowed value (inclusive)
 * @returns Clamped value within [min, max]
 *
 * @example
 * ```typescript
 * clamp(5, 0, 10);   // → 5 (within range)
 * clamp(-5, 0, 10);  // → 0 (below min)
 * clamp(15, 0, 10);  // → 10 (above max)
 *
 * // Useful for constraining chart zoom levels
 * const zoomLevel = clamp(userZoom, 0.5, 3.0);
 * ```
 */
export function clamp(value: number, min: number, max: number): number {
  // Math.max ensures value >= min, Math.min ensures result <= max
  return Math.min(Math.max(value, min), max);
}
