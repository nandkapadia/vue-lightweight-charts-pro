# Vue Lightweight Charts Pro - Feature Gap Analysis

**Date:** December 4, 2024
**Goal:** Match vue-lightweight-charts-pro features to streamlit-lightweight-charts-pro (excluding lazy loading architecture differences)

---

## Executive Summary

This document identifies features present in `streamlit-lightweight-charts-pro` that are missing or incomplete in `vue-lightweight-charts-pro`. The goal is to achieve feature parity between the two implementations while respecting architectural differences.

**Status:**
- ✅ **Core Charts**: Feature parity achieved
- ⚠️ **UI Components**: Missing several Streamlit features
- ⚠️ **Advanced Features**: Some gaps in trade visualization and annotations
- ✅ **Data Management**: Vue has superior WebSocket/REST API integration

---

## Feature Comparison Matrix

| Feature Category | Streamlit | Vue | Gap Analysis |
|-----------------|-----------|-----|--------------|
| **Basic Chart Types** | | | |
| Line, Area, Bar | ✅ | ✅ | ✅ Match |
| Candlestick, Baseline | ✅ | ✅ | ✅ Match |
| Histogram | ✅ | ✅ | ✅ Match |
| **Custom Series** | | | |
| Band Series | ✅ | ❌ | ⚠️ Missing |
| Ribbon Series | ✅ | ❌ | ⚠️ Missing |
| Signal Series | ✅ | ❌ | ⚠️ Missing |
| Trend Fill Series | ✅ | ❌ | ⚠️ Missing |
| Gradient Ribbon Series | ✅ | ❌ | ⚠️ Missing |
| **UI Components** | | | |
| Button Panel | ✅ | ❌ | ⚠️ Missing |
| Collapse/Expand Buttons | ✅ | ❌ | ⚠️ Missing |
| Series Settings Dialog | ✅ | ❌ | ⚠️ Missing |
| Error Boundary | ✅ | ❌ | ⚠️ Missing |
| **Trade Visualization** | | | |
| Trade Markers | ✅ | ❌ | ⚠️ Missing |
| Trade Rectangles | ✅ | ❌ | ⚠️ Missing |
| Trade Lines | ✅ | ❌ | ⚠️ Missing |
| Trade Arrows | ✅ | ❌ | ⚠️ Missing |
| Trade Zones | ✅ | ❌ | ⚠️ Missing |
| Trade Templates | ✅ | ❌ | ⚠️ Missing |
| **Annotations** | | | |
| Text Annotations | ✅ | ❌ | ⚠️ Missing |
| Arrow Annotations | ✅ | ❌ | ⚠️ Missing |
| Shape Annotations | ✅ | ❌ | ⚠️ Missing |
| Annotation Layers | ✅ | ❌ | ⚠️ Missing |
| **Chart Features** | | | |
| Multi-Pane Charts | ✅ | ✅ | ✅ Match |
| Price Lines | ✅ | ❌ | ⚠️ Missing |
| Series Markers | ✅ | ❌ | ⚠️ Missing |
| Range Switchers | ✅ | ❌ | ⚠️ Missing |
| Legends | ✅ | ❌ | ⚠️ Missing |
| **Data Management** | | | |
| REST API Integration | N/A | ✅ | ✅ Vue Advantage |
| WebSocket Integration | N/A | ✅ | ✅ Vue Advantage |
| Lazy Loading | Python Backend | Client-Side | Different Architecture |
| **Developer Experience** | | | |
| TypeScript Types | ✅ | ✅ | ✅ Match |
| Error Handling | ✅ | ✅ | ✅ Match |
| Auto-resize | ✅ | ✅ | ✅ Match |

---

## Missing Features in Vue (Priority Order)

### Priority 1: Critical Features

#### 1. Custom Series Types
**Status:** ❌ Missing
**Streamlit Files:**
- `frontend/src/series/descriptors/customSeriesDescriptors.ts`
- Custom series implementations in lightweight-charts-core

**Missing Series:**
1. **Band Series** - Shows data as a band between two values
2. **Ribbon Series** - Multi-line ribbon visualization
3. **Signal Series** - Buy/sell signal indicators
4. **Trend Fill Series** - Filled area between trends
5. **Gradient Ribbon Series** - Gradient-filled ribbon

**Impact:** Users cannot create advanced indicator visualizations

**Recommendation:** Add these custom series types to Vue by:
1. Importing from @lightweight-charts-pro/core if available
2. Or implementing Vue-specific versions
3. Add to SeriesConfig type definition

---

#### 2. Trade Visualization System
**Status:** ❌ Missing
**Streamlit Files:**
- `frontend/src/plugins/overlay/rectanglePlugin.ts`
- Core trade visualization in lightweight-charts-core

**Missing Features:**
```typescript
// Streamlit SeriesConfig
interface SeriesConfig {
  trades?: TradeConfig[];
  tradeVisualizationOptions?: TradeVisualizationOptions;
}

interface TradeVisualizationOptions {
  style: 'markers' | 'rectangles' | 'both' | 'lines' | 'arrows' | 'zones';
  // Marker options
  entryMarkerColorLong?: string;
  entryMarkerColorShort?: string;
  exitMarkerColorProfit?: string;
  exitMarkerColorLoss?: string;
  markerSize?: number;
  // Rectangle options
  rectangleFillOpacity?: number;
  rectangleColorProfit?: string;
  rectangleColorLoss?: string;
  // Line/Arrow/Zone options...
}

interface TradeConfig {
  entryTime: string | number;
  entryPrice: number;
  exitTime: string | number;
  exitPrice: number;
  isProfitable: boolean;
  id: string;
  pnl?: number;
  pnlPercentage?: number;
}
```

**Impact:** Users cannot visualize trades on charts

**Recommendation:**
1. Add `trades` prop to SeriesConfig
2. Create TradeVisualizationPlugin for Vue
3. Support all visualization styles (markers, rectangles, lines, arrows, zones)

---

#### 3. Annotation System
**Status:** ❌ Missing
**Streamlit Files:**
- Core annotation system from lightweight-charts-core

**Missing Features:**
```typescript
interface Annotation {
  time: string;
  price: number;
  text: string;
  type: 'text' | 'arrow' | 'shape' | 'line' | 'rectangle' | 'circle';
  position: 'aboveBar' | 'belowBar' | 'inBar';
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
  tooltip?: string;
}

interface AnnotationLayer {
  name: string;
  visible: boolean;
  opacity: number;
  annotations: Annotation[];
}
```

**Impact:** Users cannot add text labels, arrows, or shapes to charts

**Recommendation:**
1. Add `annotations` prop to LightweightChart component
2. Support annotation layers with visibility/opacity control
3. Implement all annotation types

---

### Priority 2: Important UI Features

#### 4. Button Panel Component
**Status:** ❌ Missing
**Streamlit Files:**
- `frontend/src/components/ButtonPanelComponent.tsx`
- `frontend/src/components/buttons/` directory
- `frontend/src/primitives/ButtonPanelPrimitive.ts`

**Missing Features:**
```typescript
interface ButtonPanelConfig {
  enabled?: boolean;
  buttonSize?: number;
  corner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  showCollapseButton?: boolean;
  showSeriesSettingsButton?: boolean;
  showDeleteButton?: boolean;
}
```

**Buttons:**
1. **Collapse Button** - Collapse/expand panes
2. **Series Settings Button** - Open series settings dialog
3. **Delete Button** - Remove series

**Impact:** Users cannot interact with chart UI elements

**Recommendation:**
1. Create ButtonPanel.vue component
2. Add CollapseButton, SeriesSettingsButton, DeleteButton components
3. Position buttons in corners using absolute positioning
4. Add to ChartPane component

---

#### 5. Series Settings Dialog
**Status:** ❌ Missing
**Streamlit Files:**
- `frontend/src/components/SeriesSettingsRenderer.tsx`
- `frontend/src/forms/SeriesSettingsDialog.tsx`
- `frontend/src/forms/LineEditorDialog.tsx`
- `frontend/src/forms/ColorPickerDialog.tsx`

**Missing Features:**
- Visual dialog for editing series properties
- Color picker for colors
- Number inputs for line width, opacity, etc.
- Live preview of changes
- Apply/Cancel buttons

**Impact:** Users cannot edit series settings interactively

**Recommendation:**
1. Create SeriesSettingsDialog.vue component
2. Add form inputs for common series properties
3. Implement live preview
4. Add to ButtonPanel system

---

#### 6. Error Boundary
**Status:** ❌ Missing
**Streamlit Files:**
- `frontend/src/components/ErrorBoundary.tsx`

**Missing Features:**
- Catches React errors and displays fallback UI
- Logs errors for debugging
- Provides error recovery options

**Impact:** Chart crashes show ugly error messages

**Recommendation:**
1. Create ErrorBoundary.vue component using Vue's error handling
2. Wrap LightweightChart component
3. Display user-friendly error messages
4. Add error recovery options

---

### Priority 3: Chart Features

#### 7. Price Lines
**Status:** ❌ Missing

**Missing Features:**
```typescript
interface SeriesConfig {
  priceLines?: Array<{
    price: number;
    color?: string;
    lineWidth?: number;
    lineStyle?: number;
    axisLabelVisible?: boolean;
    title?: string;
  }>;
}
```

**Impact:** Users cannot add horizontal price lines

**Recommendation:**
1. Add `priceLines` prop to SeriesConfig
2. Create price lines when series is created
3. Support dynamic updates

---

#### 8. Series Markers
**Status:** ❌ Missing

**Missing Features:**
```typescript
interface SeriesConfig {
  markers?: SeriesMarker<Time>[];
}

interface SeriesMarker {
  time: Time;
  position: 'aboveBar' | 'belowBar' | 'inBar';
  color?: string;
  shape?: 'circle' | 'square' | 'arrowUp' | 'arrowDown';
  text?: string;
  size?: number;
}
```

**Impact:** Users cannot add markers to specific data points

**Recommendation:**
1. Add `markers` prop to SeriesConfig
2. Use lightweight-charts' built-in marker API
3. Support dynamic marker updates

---

#### 9. Range Switchers
**Status:** ❌ Missing

**Missing Features:**
```typescript
interface RangeSwitcherConfig {
  enabled: boolean;
  position?: 'top' | 'bottom';
  ranges?: Array<{
    label: string;
    value: string; // '1D', '1W', '1M', '3M', '6M', '1Y', 'ALL'
  }>;
}
```

**Impact:** Users cannot quickly switch time ranges

**Recommendation:**
1. Create RangeSwitcher.vue component
2. Add buttons for common time ranges
3. Integrate with chart time scale
4. Position above or below chart

---

#### 10. Legends
**Status:** ❌ Missing

**Missing Features:**
```typescript
interface LegendConfig {
  visible: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  showSeriesNames?: boolean;
  showValues?: boolean;
  showTime?: boolean;
}
```

**Impact:** Users cannot see series names and current values

**Recommendation:**
1. Create Legend.vue component
2. Display series name, color, and current value
3. Update on crosshair move
4. Position in corners

---

## Implementation Priority

### Phase 1: Core Features (Critical)
**Time Estimate:** 2-3 weeks

1. **Custom Series Types** (5-7 days)
   - Band, Ribbon, Signal, TrendFill, GradientRibbon
   - Add to type definitions
   - Create or import implementations
   - Add examples

2. **Trade Visualization** (5-7 days)
   - TradeConfig interface
   - Rectangle plugin for trade zones
   - Marker support for entry/exit
   - All visualization styles

3. **Annotation System** (3-4 days)
   - Annotation interface
   - Layer system
   - Text, arrow, shape annotations
   - Position control

### Phase 2: UI Components (Important)
**Time Estimate:** 2-3 weeks

4. **Button Panel** (3-4 days)
   - ButtonPanel component
   - Collapse, Settings, Delete buttons
   - Corner positioning
   - Integration with ChartPane

5. **Series Settings Dialog** (4-5 days)
   - Dialog component
   - Form inputs
   - Color picker
   - Live preview

6. **Error Boundary** (1-2 days)
   - Error catching
   - Fallback UI
   - Error recovery

### Phase 3: Chart Enhancements (Nice-to-have)
**Time Estimate:** 1-2 weeks

7. **Price Lines** (1-2 days)
8. **Series Markers** (1-2 days)
9. **Range Switchers** (2-3 days)
10. **Legends** (2-3 days)

---

## Architecture Differences (Intentional)

### These are NOT gaps - different by design:

1. **Lazy Loading**
   - **Streamlit:** Python backend manages full dataset, sends chunks
   - **Vue:** Client requests chunks from any backend via REST/WebSocket
   - **Verdict:** ✅ Different architectures, both valid

2. **Backend Integration**
   - **Streamlit:** Integrated with Streamlit's component system
   - **Vue:** Standalone with flexible backend options
   - **Verdict:** ✅ Different architectures, both valid

3. **State Management**
   - **Streamlit:** Streamlit session state
   - **Vue:** Vue reactivity system
   - **Verdict:** ✅ Framework-specific, both valid

---

## Recommended Action Plan

### Immediate Next Steps

1. **Start with Custom Series** (Highest Impact)
   - Research if @lightweight-charts-pro/core provides these
   - If yes, import and integrate
   - If no, implement from scratch
   - Priority order: Signal → Band → Ribbon → TrendFill → GradientRibbon

2. **Add Trade Visualization** (High User Demand)
   - Start with simple marker-based trades
   - Add rectangle visualization
   - Add other styles (lines, arrows, zones)

3. **Implement Annotations** (Essential for Technical Analysis)
   - Start with text annotations
   - Add arrows and shapes
   - Add layer system

4. **Build UI Components** (Quality of Life)
   - Button panel for pane controls
   - Series settings dialog
   - Error boundary

---

## Testing Requirements

For each new feature, add:
1. Unit tests for components/composables
2. Integration tests for chart interaction
3. Visual regression tests
4. Example usage in `/examples` directory
5. Documentation in README

---

## Backward Compatibility

When adding new features:
- All new props should be optional
- Default behavior should match current behavior
- No breaking changes to existing APIs
- Add migration guide for any API changes

---

## Summary

**Total Missing Features:** 10 major feature categories
**Priority 1 (Critical):** 3 features - Custom Series, Trades, Annotations
**Priority 2 (Important):** 3 features - Buttons, Settings, ErrorBoundary
**Priority 3 (Nice-to-have):** 4 features - PriceLines, Markers, Range, Legends

**Estimated Total Implementation Time:** 5-8 weeks

**Next Action:** Start with Custom Series Types - highest impact, foundational for other features
