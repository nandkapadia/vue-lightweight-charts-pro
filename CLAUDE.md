# CLAUDE.md - AI Assistant Guide for vue-lightweight-charts-pro

## Project Overview

This is `@lightweight-charts-pro/vue3`, a Vue 3 component library for TradingView Lightweight Charts. It provides reactive components and composables for building financial charting applications with features like REST/WebSocket integration, lazy loading, and custom series types.

### Tech Stack
- **Framework**: Vue 3.5+ with Composition API
- **Language**: TypeScript 5.x (strict mode)
- **Build**: Vite 7.x with vite-plugin-dts
- **Testing**: Vitest 3.x with happy-dom
- **Linting**: ESLint 9.x with flat config
- **Charts**: TradingView Lightweight Charts 5.x

### Key Dependencies
- `lightweight-charts` (peer dependency) - The underlying TradingView charting library
- `@lightweight-charts-pro/core` - Shared utilities and custom series types
- `vue` (peer dependency) - Vue 3.4+

## Repository Structure

```
vue-lightweight-charts-pro/
├── src/
│   ├── components/           # Vue SFC components
│   │   ├── LightweightChart.vue  # Main chart container
│   │   ├── ChartPane.vue         # Multi-pane layouts
│   │   ├── Series.vue            # Generic series component
│   │   ├── *Series.vue           # Type-specific series (Line, Area, etc.)
│   │   ├── Marker.vue            # Series markers
│   │   ├── PriceLine.vue         # Horizontal price lines
│   │   ├── Trade.vue             # Trade visualization
│   │   ├── Annotation.vue        # Chart annotations
│   │   ├── Legend.vue            # Interactive legend
│   │   └── RangeSwitcher.vue     # Time range selector
│   ├── composables/          # Vue composables
│   │   ├── useChartApi.ts        # REST API client
│   │   ├── useChartWebSocket.ts  # WebSocket client
│   │   ├── useLazyLoading.ts     # Infinite scroll pagination
│   │   └── useSeries.ts          # Series lifecycle management
│   ├── types/                # TypeScript definitions
│   │   ├── api.ts                # REST API types
│   │   ├── chart.ts              # Chart configuration types
│   │   ├── websocket.ts          # WebSocket message types
│   │   └── enums.ts              # Enumerations
│   ├── utils/                # Utility functions
│   │   ├── index.ts              # General utilities
│   │   └── time.ts               # Time normalization helpers
│   └── index.ts              # Main entry point (exports all)
├── __tests__/
│   ├── unit/                 # Unit tests
│   ├── integration/          # Integration tests
│   ├── e2e/                  # End-to-end tests
│   ├── production/           # Load and browser compatibility tests
│   ├── rendering/            # Chart rendering tests
│   ├── mocks/                # Shared mock data
│   └── setup.ts              # Test setup with mocks
├── examples/                 # Usage examples
│   ├── quick-start/          # Basic examples
│   ├── chart-types/          # Different chart types
│   ├── components/           # Component patterns
│   ├── composables/          # Composable usage
│   ├── trading-features/     # Trading-specific features
│   ├── real-time/            # WebSocket examples
│   ├── advanced/             # Advanced patterns
│   └── custom-styling/       # Theming examples
├── dist/                     # Build output (gitignored in dev)
├── vite.config.ts            # Build configuration
├── vitest.config.ts          # Test configuration
├── tsconfig.json             # TypeScript configuration
└── eslint.config.js          # ESLint flat config
```

## Development Commands

```bash
# Install dependencies
npm install

# Development build (watch mode)
npm run dev

# Production build
npm run build

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Type check
npm run type-check

# Lint
npm run lint

# Full prepublish check (lint + type-check + test + build)
npm run prepublishOnly
```

## Architecture Patterns

### Component Design

#### Main Chart Container (`LightweightChart.vue`)
- Manages chart lifecycle (create, resize, destroy)
- Provides chart instance to children via `provide()`
- Handles WebSocket connections and API integration
- Implements error boundaries with `onErrorCaptured`
- Coordinates lazy loading across all series

#### Series Components
Two approaches are supported:

1. **Props-driven** (Streamlit-like):
```vue
<LightweightChart
  :series="[{ seriesType: 'candlestick', data: [...] }]"
/>
```

2. **Component-based** (Vue-idiomatic):
```vue
<LightweightChart>
  <CandlestickSeries :data="data" />
</LightweightChart>
```

#### Series ID Namespacing
Series IDs are namespaced by pane to prevent collisions:
```typescript
function getNamespacedSeriesId(paneId: number, seriesId: string): string {
  return `pane${paneId}-${seriesId}`;
}
```

### Composable Patterns

#### `useChartApi`
- Provides REST API client for data fetching
- Methods: `getSeriesData()`, `setSeriesData()`, `getHistory()`
- Returns reactive `isLoading` and `error` refs

#### `useChartWebSocket`
- Manages WebSocket connection lifecycle
- Automatic reconnection with exponential backoff
- Message handlers for different event types
- Ping/pong heartbeat support

#### `useLazyLoading`
- Monitors visible time range
- Requests historical data when scrolling near boundaries
- Caches min/max timestamps and bar spacing for performance
- Debounced range change handling (300ms default)

### Data Flow

1. **Initial Load**: Props → `createSeries()` → Normalize timestamps → `setData()`
2. **Real-time Updates**: WebSocket → `updateSeriesData()` → Merge → `update()`
3. **History Load**: Scroll trigger → `requestHistory()` → Merge → `setData()`

### Time Normalization
All time values are normalized to Unix seconds for consistency:
```typescript
function normalizeTime(time: unknown): number {
  // Handles: seconds, milliseconds, ISO strings, Date objects
}
```

## Testing Strategy

### Test Categories

1. **Unit Tests** (`__tests__/unit/`)
   - Composable logic testing
   - Utility function testing
   - Isolated from DOM

2. **Integration Tests** (`__tests__/integration/`)
   - Component mounting with Vue Test Utils
   - Series creation and updates
   - Nested component relationships

3. **E2E Tests** (`__tests__/e2e/`)
   - Full chart rendering
   - User interaction flows
   - Browser environment simulation

4. **Production Tests** (`__tests__/production/`)
   - Load testing (50+ series)
   - Browser compatibility
   - Memory usage patterns

### Mocking Strategy
The test setup (`__tests__/setup.ts`) mocks:
- `lightweight-charts` - Chart API and series
- `@lightweight-charts-pro/core` - Custom series factory
- `ResizeObserver` - Browser API
- `WebSocket` - Network communication

### Writing Tests
```typescript
import { mount } from '@vue/test-utils';
import { LightweightChart } from '../src/components';

describe('LightweightChart', () => {
  it('creates chart on mount', async () => {
    const wrapper = mount(LightweightChart, {
      props: {
        chartId: 'test-chart',
        series: [{ seriesType: 'line', data: [...] }]
      }
    });

    await flushPromises();
    expect(wrapper.emitted('ready')).toBeTruthy();
  });
});
```

## Code Conventions

### TypeScript
- Strict mode enabled
- No explicit `any` (eslint warning, not error)
- Prefer interfaces over type aliases for objects
- Export types from index files

### Vue Components
- Use `<script setup lang="ts">` syntax
- Props with PropType for complex types
- Emits with typed defineEmits
- Use `shallowRef` for non-reactive objects (chart, series)

### Naming Conventions
- Components: PascalCase (`LightweightChart.vue`)
- Composables: camelCase with `use` prefix (`useChartApi.ts`)
- Types: PascalCase (`SeriesConfig`)
- Enums: PascalCase with PascalCase values (`SeriesType.Candlestick`)

### Error Handling
- Use try/catch in async operations
- Emit errors via `@error` event
- Log errors with `logger` from core package
- Graceful degradation - don't crash the whole chart

## Common Patterns

### Adding a New Series Type

1. Create component in `src/components/`:
```vue
<script setup lang="ts">
import { useSeries } from '../composables/useSeries';

const props = defineProps({
  seriesId: String,
  data: Array,
  // ... series-specific options
});

useSeries({
  seriesType: 'newType',
  seriesId: props.seriesId,
  data: props.data,
  // ...
});
</script>
```

2. Export from `src/components/index.ts`
3. Add to main `src/index.ts` exports
4. Add types to `src/types/chart.ts`

### Adding a New Composable

1. Create in `src/composables/`:
```typescript
export interface UseNewFeatureOptions { ... }
export interface UseNewFeatureReturn { ... }

export function useNewFeature(options: UseNewFeatureOptions): UseNewFeatureReturn {
  // Implementation
}
```

2. Export from `src/composables/index.ts`
3. Add to main `src/index.ts` exports

### Handling Props Changes
Use watchers for reactive prop updates:
```typescript
watch(
  () => props.series,
  (newSeries, oldSeries) => {
    if (newSeries !== oldSeries) {
      // Handle array reference change
    }
  }
);
```

## Performance Considerations

### Memory Optimization
- Use `shallowRef` for non-reactive objects
- Avoid deep watchers on data arrays
- Use string fingerprints instead of object comparisons

### Lazy Loading
- Debounced scroll handling (300ms)
- Cached min/max timestamps
- Calculated bar spacing (not hardcoded)
- Pending request tracking to prevent duplicates

### Real-time Updates
- Monotonic append fast path O(m)
- Fallback merge+sort O(n log n)
- Use `update()` over `setData()` when possible

## Build Output

The library is built with multiple entry points:
- `dist/index.js` - ESM main entry
- `dist/index.cjs` - CommonJS main entry
- `dist/components/index.js` - Components-only entry
- `dist/composables/index.js` - Composables-only entry

All entries include TypeScript declarations (`.d.ts`).

## Troubleshooting

### Common Issues

1. **"Cannot read property of null" on chart**
   - Chart not yet initialized
   - Use `@ready` event or check `chart.value`

2. **Series not updating**
   - Ensure data array reference changes (not in-place mutation)
   - Check series ID matches

3. **WebSocket not connecting**
   - Check `wsUrl` prop is provided
   - Set `autoConnect` to true or call `ws.connect()`

4. **Lazy loading not triggering**
   - Set `lazyLoading` prop to true
   - Ensure `hasMoreBefore`/`hasMoreAfter` flags are set

### Debug Mode
Enable debug logging:
```typescript
import { logger } from '@lightweight-charts-pro/core';
// Logger outputs in development mode
```

## Related Documentation

- [TradingView Lightweight Charts](https://tradingview.github.io/lightweight-charts/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vite Library Mode](https://vitejs.dev/guide/build.html#library-mode)
