[**Vue Lightweight Charts Pro API**](../README.md)

***

[Vue Lightweight Charts Pro API](../README.md) / utils

# utils

## Fileoverview

General utility functions for the Vue 3 Lightweight Charts package.

This module provides common utility functions used throughout the library,
including time conversion, object manipulation, function throttling/debouncing,
and ID generation.

## Example

```typescript
import {
  toTimestamp,
  formatTimestamp,
  deepMerge,
  debounce,
  generateId
} from '@lightweight-charts-pro/vue3/utils';

// Convert time to timestamp
const ts = toTimestamp('2024-01-01');

// Merge configuration objects
const config = deepMerge(defaultOptions, userOptions);

// Debounce scroll handler
const handleScroll = debounce(updateChart, 300);
```

## Functions

- [clamp](functions/clamp.md)
- [debounce](functions/debounce.md)
- [deepMerge](functions/deepMerge.md)
- [formatTimestamp](functions/formatTimestamp.md)
- [generateId](functions/generateId.md)
- [throttle](functions/throttle.md)
- [toTimestamp](functions/toTimestamp.md)
