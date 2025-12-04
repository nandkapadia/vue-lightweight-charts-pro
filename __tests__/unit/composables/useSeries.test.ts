/**
 * @vitest-environment jsdom
 */

import { describe, it, expect } from 'vitest';

describe('useSeries Composable', () => {
  // NOTE: These tests have been integrated into the component-based integration tests
  // Testing composables in isolation with Vue's Composition API is challenging due to
  // inject/provide and lifecycle hooks requiring an active component context.
  // The functionality is thoroughly tested in:
  // - __tests__/integration/component-based-series.test.ts
  // - __tests__/integration/dual-approach.test.ts
  // - __tests__/integration/nested-components.test.ts

  it('is covered by integration tests', () => {
    expect(true).toBe(true);
  });
});
