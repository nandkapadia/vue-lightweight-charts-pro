/**
 * @fileoverview Utility functions for the Vue 3 Lightweight Charts package.
 */
/**
 * Convert various time formats to Unix timestamp in seconds.
 *
 * @param time - Time value (number, string, or Date)
 * @returns Unix timestamp in seconds
 */
export declare function toTimestamp(time: number | string | Date): number;
/**
 * Format timestamp for display.
 *
 * @param timestamp - Unix timestamp in seconds
 * @param format - Format type ('date', 'datetime', 'time')
 * @returns Formatted string
 */
export declare function formatTimestamp(timestamp: number, format?: 'date' | 'datetime' | 'time'): string;
/**
 * Deep merge two objects.
 *
 * @param target - Target object
 * @param source - Source object
 * @returns Merged object
 */
export declare function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T;
/**
 * Debounce a function.
 *
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export declare function debounce<T extends (...args: unknown[]) => unknown>(fn: T, delay: number): (...args: Parameters<T>) => void;
/**
 * Throttle a function.
 *
 * @param fn - Function to throttle
 * @param limit - Minimum time between calls in milliseconds
 * @returns Throttled function
 */
export declare function throttle<T extends (...args: unknown[]) => unknown>(fn: T, limit: number): (...args: Parameters<T>) => void;
/**
 * Generate a unique ID.
 */
export declare function generateId(prefix?: string): string;
/**
 * Clamp a value between min and max.
 */
export declare function clamp(value: number, min: number, max: number): number;
