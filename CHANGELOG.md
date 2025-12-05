# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-12-05

### Added
- Initial release of @lightweight-charts-pro/vue3
- Vue 3 components for TradingView Lightweight Charts
- `LightweightChart` main component with REST/WebSocket support
- `ChartPane` component for multi-pane layouts
- Series components: `LineSeries`, `AreaSeries`, `CandlestickSeries`, `BarSeries`, `HistogramSeries`, `BaselineSeries`
- Custom series: `BandSeries`, `RibbonSeries`, `SignalSeries`, `TrendFillSeries`, `GradientRibbonSeries`
- UI primitives: `Legend`, `RangeSwitcher`
- Series features: `Marker`, `PriceLine`, `Trade`, `Annotation`
- Composables: `useChartApi`, `useChartWebSocket`, `useLazyLoading`, `useSeries`
- TypeScript support with full type definitions
- Lazy loading with infinite scroll pagination
- WebSocket integration for real-time updates
- REST API integration for data fetching
- Trade visualization with multiple styles (markers, rectangles, lines)
- Comprehensive JSDoc documentation
- Error boundaries for graceful failure handling

### Fixed
- WebSocket direction race condition in history requests
- Memory allocation optimization in deep watchers
- TypeScript types for all component props (replaced `any[]`)
- Series ID namespace collisions in multi-pane scenarios
- Empty state detection edge cases
- ResizeObserver optimization

### Security
- Input validation for WebSocket messages
- Proper error handling and logging
- Graceful degradation on component failures

[0.1.0]: https://github.com/nandkapadia/vue-lightweight-charts-pro/releases/tag/v0.1.0
