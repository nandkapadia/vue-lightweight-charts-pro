# AGENTS.md - AI Agent Guidelines for vue-lightweight-charts-pro

This document provides specific guidelines for AI agents working on this repository. Follow these conventions to ensure consistent, high-quality contributions.

## Quick Reference

### Essential Commands
```bash
npm test           # Run all tests (required before committing)
npm run type-check # Verify TypeScript (required before committing)
npm run lint       # Check code style
npm run build      # Build the library
```

### Key Files to Understand
| Purpose | Location |
|---------|----------|
| Main chart component | `src/components/LightweightChart.vue` |
| Type definitions | `src/types/*.ts` |
| Test setup/mocks | `__tests__/setup.ts` |
| Build config | `vite.config.ts` |
| ESLint rules | `eslint.config.js` |

## Coding Guidelines

### TypeScript Requirements

1. **Strict typing**: Avoid `any` - use proper types or generics
2. **Prop types**: Use `PropType` for complex props
3. **Return types**: Always specify return types for functions
4. **Null handling**: Use optional chaining and nullish coalescing

```typescript
// Good
function processData(data: DataPoint[]): ProcessedData {
  return data?.length ? transform(data) : { empty: true };
}

// Avoid
function processData(data: any): any {
  return data ? transform(data) : { empty: true };
}
```

### Vue Component Patterns

1. **Use Composition API with `<script setup>`**
```vue
<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
// ...
</script>
```

2. **Define props with types**
```typescript
const props = defineProps({
  chartId: { type: String, required: true },
  data: { type: Array as PropType<DataPoint[]>, default: () => [] },
});
```

3. **Typed emits**
```typescript
const emit = defineEmits<{
  (e: 'ready', chart: IChartApi): void;
  (e: 'error', error: Error): void;
}>();
```

4. **Use shallowRef for non-reactive objects**
```typescript
// Chart API doesn't need deep reactivity
const chart = shallowRef<IChartApi | null>(null);
const seriesMap = shallowRef<Map<string, ExtendedSeriesApi>>(new Map());
```

### Error Handling

1. **Wrap async operations in try/catch**
2. **Emit errors for parent components**
3. **Log with the core logger**
4. **Don't crash - degrade gracefully**

```typescript
try {
  const result = await api.getHistory(...);
  updateSeriesData(result.data);
} catch (err) {
  error.value = err instanceof Error ? err.message : 'Unknown error';
  emit('error', err instanceof Error ? err : new Error(String(err)));
  logger.error('Failed to load history', 'ComponentName', err);
}
```

### Testing Requirements

1. **Write tests for new features**
2. **Update tests when modifying behavior**
3. **Use descriptive test names**
4. **Test edge cases**

```typescript
describe('useChartApi', () => {
  describe('getHistory', () => {
    it('should request history data with correct parameters', async () => {
      // Arrange
      const api = useChartApi({ baseUrl: 'http://test.com' });

      // Act
      await api.getHistory('chart-1', 0, 'price', 1234567890, 500);

      // Assert
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/charts/chart-1/panes/0/series/price/history')
      );
    });

    it('should handle network errors gracefully', async () => {
      // Test error handling
    });
  });
});
```

## Task-Specific Guidelines

### Adding New Features

1. **Start with types**: Define interfaces in `src/types/`
2. **Implement core logic**: Add composables if needed
3. **Create component**: Follow existing patterns
4. **Export properly**: Update index files
5. **Write tests**: Unit + integration
6. **Update docs**: Add to README examples

### Fixing Bugs

1. **Reproduce first**: Write a failing test
2. **Fix minimally**: Don't refactor while fixing
3. **Test fix**: Ensure test passes
4. **Check regressions**: Run full test suite

### Refactoring

1. **Ensure tests pass before starting**
2. **Make small, incremental changes**
3. **Run tests after each change**
4. **Keep behavior unchanged**

## File Modification Guidelines

### When Modifying Components

1. **Read the file first** - Understand existing patterns
2. **Preserve existing props/emits** - Don't break API
3. **Update JSDoc comments** - Keep documentation current
4. **Test with examples** - Verify in example files

### When Modifying Types

1. **Check all usages** - Types are imported across files
2. **Prefer extending over replacing** - Maintain compatibility
3. **Update related types** - Keep type system consistent
4. **Run type-check** - `npm run type-check`

### When Modifying Tests

1. **Don't delete tests** - Fix or update them
2. **Keep mocks in sync** - Update `__tests__/setup.ts`
3. **Match file structure** - Tests mirror src structure

## Commit Guidelines

### Before Committing

```bash
npm run lint        # Fix any linting issues
npm run type-check  # Ensure types are valid
npm test           # All tests must pass
npm run build      # Verify build succeeds
```

### Commit Message Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding or modifying tests
- `chore`: Tooling, config, or dependency changes

Examples:
```
feat(series): add gradient ribbon series support
fix(lazy-loading): prevent duplicate history requests
docs(readme): update API documentation
test(websocket): add reconnection tests
```

## Common Pitfalls to Avoid

### Performance Issues

1. **Don't use deep watchers on data arrays**
```typescript
// Bad - O(n) on every change
watch(() => props.series, handler, { deep: true });

// Good - Watch specific fields
watch(
  () => props.series.map(s => `${s.seriesId}:${s.data?.length}`),
  handler
);
```

2. **Don't normalize data repeatedly**
```typescript
// Bad - Normalizes on every call
const data = normalizeDataPoints(config.data);

// Good - Normalize once, cache result
if (configIndex >= 0) {
  seriesConfigs.value[configIndex].data = normalizedData;
}
```

### Memory Leaks

1. **Clean up subscriptions in onUnmounted**
2. **Disconnect observers and WebSockets**
3. **Clear timers with clearTimeout/clearInterval**

### Type Safety

1. **Don't cast to `any` to silence errors**
2. **Use type guards instead of type assertions**
3. **Handle undefined properly**

```typescript
// Bad
const value = (obj as any).property;

// Good
const value = 'property' in obj ? obj.property : undefined;
```

## Integration with Core Package

The `@lightweight-charts-pro/core` package provides:

- `createSeriesWithConfig()` - Unified series factory
- `createAnnotationVisualElements()` - Annotation system
- `LegendPrimitive`, `RangeSwitcherPrimitive` - UI primitives
- `TimeRange` - Time range enum
- `logger` - Logging utility

When working with core features:
1. Import from `@lightweight-charts-pro/core`
2. Follow the patterns in `LightweightChart.vue`
3. Update mocks in `__tests__/setup.ts` if adding new imports

## Getting Help

### Understanding the Codebase
- Read `CLAUDE.md` for architecture overview
- Explore `examples/` for usage patterns
- Check `__tests__/` for expected behavior

### API Documentation
- Types are self-documenting with JSDoc
- Check `src/index.ts` for export organization
- Refer to TradingView Lightweight Charts docs for chart API

## Quality Checklist

Before submitting changes, verify:

- [ ] TypeScript compiles without errors (`npm run type-check`)
- [ ] ESLint passes (`npm run lint`)
- [ ] All tests pass (`npm test`)
- [ ] Build succeeds (`npm run build`)
- [ ] New features have tests
- [ ] Documentation is updated if needed
- [ ] No console.log statements (except in dev mode)
- [ ] Error handling is comprehensive
- [ ] Memory cleanup is implemented
