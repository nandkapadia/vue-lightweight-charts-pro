/**
 * @fileoverview Vue component exports for the Lightweight Charts package.
 *
 * This module exports all Vue 3 components for building financial charts.
 * Components are organized into categories:
 *
 * - **Main Chart Components**: Core container and layout components
 * - **UI Primitives**: Interactive overlays (legend, range switcher)
 * - **Series Components**: Chart series for different data types
 * - **Custom Series**: Extended series from @lightweight-charts-pro/core
 * - **Series Features**: Child components for markers, lines, trades
 *
 * @module components
 *
 * @example
 * ```vue
 * <template>
 *   <LightweightChart chart-id="my-chart" :options="chartOptions">
 *     <CandlestickSeries :data="priceData" series-id="price" />
 *     <LineSeries :data="smaData" series-id="sma20" :options="smaOptions" />
 *     <Legend position="top-left" />
 *   </LightweightChart>
 * </template>
 *
 * <script setup lang="ts">
 * import {
 *   LightweightChart,
 *   CandlestickSeries,
 *   LineSeries,
 *   Legend
 * } from '@lightweight-charts-pro/vue3';
 * </script>
 * ```
 */

// =============================================================================
// Main Chart Components
// =============================================================================

/**
 * Main chart container component.
 *
 * Manages the chart lifecycle, WebSocket connections, and coordinates all
 * child series components. This is the root component for any chart.
 *
 * @component LightweightChart
 * @example
 * ```vue
 * <LightweightChart
 *   chart-id="chart-1"
 *   api-url="http://localhost:8000/api/charts"
 *   ws-url="ws://localhost:8000/ws"
 *   :options="{ height: 400 }"
 *   auto-connect
 *   @ready="onChartReady"
 * />
 * ```
 */
export { default as LightweightChart } from "./LightweightChart.vue";

/**
 * Multi-pane layout component for indicator panels.
 *
 * Creates additional chart panes below the main chart for indicators
 * like volume, RSI, MACD, etc. Each pane has its own price scale.
 *
 * @component ChartPane
 * @example
 * ```vue
 * <LightweightChart>
 *   <CandlestickSeries :data="priceData" />
 *   <ChartPane height-ratio="0.3">
 *     <HistogramSeries :data="volumeData" />
 *   </ChartPane>
 * </LightweightChart>
 * ```
 */
export { default as ChartPane } from "./ChartPane.vue";

// =============================================================================
// UI Primitives
// =============================================================================

/**
 * Interactive legend showing current series values.
 *
 * Displays series names and values, updates on crosshair move.
 * Can be positioned in any corner of the chart.
 *
 * @component Legend
 * @example
 * ```vue
 * <LightweightChart>
 *   <Legend position="top-left" :show-values="true" />
 *   <CandlestickSeries :data="data" name="AAPL" />
 * </LightweightChart>
 * ```
 */
export { default as Legend } from "./Legend.vue";

/**
 * Time range quick-select buttons.
 *
 * Provides buttons for common time ranges (1D, 1W, 1M, 3M, 1Y, ALL).
 * Automatically adjusts the visible time range on click.
 *
 * @component RangeSwitcher
 * @example
 * ```vue
 * <LightweightChart>
 *   <RangeSwitcher position="top-right" :ranges="['1D', '1W', '1M', '1Y']" />
 *   <CandlestickSeries :data="data" />
 * </LightweightChart>
 * ```
 */
export { default as RangeSwitcher } from "./RangeSwitcher.vue";

// =============================================================================
// Generic Series Component
// =============================================================================

/**
 * Generic series component with dynamic type.
 *
 * Use this when the series type is determined at runtime or when you
 * prefer a single component for all series types.
 *
 * @component Series
 * @example
 * ```vue
 * <Series type="candlestick" :data="data" series-id="price" />
 * <Series type="line" :data="smaData" series-id="sma" />
 * ```
 */
export { default as Series } from "./Series.vue";

// =============================================================================
// Standard Series Types
// =============================================================================

/**
 * Line series for simple price or indicator data.
 *
 * Renders data as a continuous line. Best for single-value time series
 * like closing prices, moving averages, or indicators.
 *
 * @component LineSeries
 * @example
 * ```vue
 * <LineSeries
 *   :data="[{ time: 1234567890, value: 100 }, ...]"
 *   series-id="sma20"
 *   :options="{ color: '#2196F3', lineWidth: 2 }"
 * />
 * ```
 */
export { default as LineSeries } from "./LineSeries.vue";

/**
 * Area series with fill below the line.
 *
 * Similar to line series but with a gradient fill below the line.
 * Good for visualizing cumulative values or emphasizing trends.
 *
 * @component AreaSeries
 * @example
 * ```vue
 * <AreaSeries
 *   :data="data"
 *   series-id="price"
 *   :options="{
 *     topColor: 'rgba(33, 150, 243, 0.5)',
 *     bottomColor: 'rgba(33, 150, 243, 0.0)',
 *     lineColor: '#2196F3'
 *   }"
 * />
 * ```
 */
export { default as AreaSeries } from "./AreaSeries.vue";

/**
 * Japanese candlestick series for OHLC price data.
 *
 * The most popular chart type for trading. Shows open, high, low, close
 * for each time period with color-coded bodies and wicks.
 *
 * @component CandlestickSeries
 * @example
 * ```vue
 * <CandlestickSeries
 *   :data="[{ time: 1234567890, open: 100, high: 105, low: 98, close: 103 }, ...]"
 *   series-id="price"
 *   :options="{ upColor: '#26a69a', downColor: '#ef5350' }"
 * />
 * ```
 */
export { default as CandlestickSeries } from "./CandlestickSeries.vue";

/**
 * OHLC bar series (traditional bar chart).
 *
 * Alternative to candlesticks for OHLC data. Shows the same information
 * but with a different visual style (horizontal ticks for open/close).
 *
 * @component BarSeries
 * @example
 * ```vue
 * <BarSeries
 *   :data="ohlcData"
 *   series-id="price"
 *   :options="{ upColor: '#26a69a', downColor: '#ef5350' }"
 * />
 * ```
 */
export { default as BarSeries } from "./BarSeries.vue";

/**
 * Histogram series for bar/column charts.
 *
 * Renders vertical bars from a baseline (usually 0). Commonly used
 * for volume, oscillator values, or any discrete value series.
 *
 * @component HistogramSeries
 * @example
 * ```vue
 * <HistogramSeries
 *   :data="volumeData"
 *   series-id="volume"
 *   :options="{ color: '#26a69a', priceFormat: { type: 'volume' } }"
 * />
 * ```
 */
export { default as HistogramSeries } from "./HistogramSeries.vue";

/**
 * Baseline series with fill above/below a reference level.
 *
 * Shows deviation from a baseline value with different colors
 * for positive and negative values. Good for P&L or spread visualization.
 *
 * @component BaselineSeries
 * @example
 * ```vue
 * <BaselineSeries
 *   :data="pnlData"
 *   series-id="pnl"
 *   :options="{
 *     baseValue: { type: 'price', price: 0 },
 *     topFillColor1: 'rgba(38, 166, 154, 0.4)',
 *     bottomFillColor1: 'rgba(239, 83, 80, 0.4)'
 *   }"
 * />
 * ```
 */
export { default as BaselineSeries } from "./BaselineSeries.vue";

// =============================================================================
// Custom Series Types (from @lightweight-charts-pro/core)
// =============================================================================

/**
 * Band series for upper/lower band indicators.
 *
 * Renders two lines with optional fill between them. Perfect for
 * Bollinger Bands, Keltner Channels, Donchian Channels, etc.
 *
 * @component BandSeries
 * @example
 * ```vue
 * <BandSeries
 *   :data="bollingerData"
 *   series-id="bollinger"
 *   :options="{
 *     upperLineColor: '#2196F3',
 *     lowerLineColor: '#2196F3',
 *     fillColor: 'rgba(33, 150, 243, 0.1)'
 *   }"
 * />
 * ```
 */
export { default as BandSeries } from "./BandSeries.vue";

/**
 * Ribbon series for multi-line indicators.
 *
 * Renders multiple lines (e.g., EMA fan) with gradient fills between
 * adjacent lines. Great for showing trend strength via ribbon expansion.
 *
 * @component RibbonSeries
 * @example
 * ```vue
 * <RibbonSeries
 *   :data="emaFanData"
 *   series-id="ema-ribbon"
 *   :options="{ lineColors: ['#ff0000', '#ff6600', '#ffcc00', '#00ff00'] }"
 * />
 * ```
 */
export { default as RibbonSeries } from "./RibbonSeries.vue";

/**
 * Signal series for buy/sell trading signals.
 *
 * Displays arrow markers at specific time points indicating
 * buy (up arrow) or sell (down arrow) signals.
 *
 * @component SignalSeries
 * @example
 * ```vue
 * <SignalSeries
 *   :data="signalData"
 *   series-id="signals"
 *   :options="{ buyColor: '#26a69a', sellColor: '#ef5350' }"
 * />
 * ```
 */
export { default as SignalSeries } from "./SignalSeries.vue";

/**
 * Trend fill series for highlighting trend areas.
 *
 * Fills areas between price and a reference line based on trend
 * direction. Useful for visualizing trend changes.
 *
 * @component TrendFillSeries
 */
export { default as TrendFillSeries } from "./TrendFillSeries.vue";

/**
 * Gradient ribbon series with smooth color transitions.
 *
 * Similar to ribbon series but with gradient fills for a
 * smoother visual appearance.
 *
 * @component GradientRibbonSeries
 */
export { default as GradientRibbonSeries } from "./GradientRibbonSeries.vue";

// =============================================================================
// Series Feature Components (Nested within Series)
// =============================================================================

/**
 * Marker component for placing visual indicators at specific times.
 *
 * Add markers to highlight events like trade entries, news, dividends,
 * or any other time-specific annotation.
 *
 * @component Marker
 * @example
 * ```vue
 * <CandlestickSeries :data="data" series-id="price">
 *   <Marker
 *     :time="1234567890"
 *     position="belowBar"
 *     shape="arrowUp"
 *     color="#26a69a"
 *     text="Buy"
 *   />
 * </CandlestickSeries>
 * ```
 */
export { default as Marker } from "./Marker.vue";

/**
 * Horizontal price line at a specific level.
 *
 * Draw horizontal lines for support/resistance levels, targets,
 * stop losses, or any significant price level.
 *
 * @component PriceLine
 * @example
 * ```vue
 * <CandlestickSeries :data="data" series-id="price">
 *   <PriceLine :price="150" color="#ef5350" title="Stop Loss" />
 *   <PriceLine :price="180" color="#26a69a" title="Target" />
 * </CandlestickSeries>
 * ```
 */
export { default as PriceLine } from "./PriceLine.vue";

/**
 * Trade visualization showing entry and exit points.
 *
 * Display trade history with visual indicators for entry/exit
 * prices and timestamps, optionally showing P&L.
 *
 * @component Trade
 * @example
 * ```vue
 * <CandlestickSeries :data="data" series-id="price">
 *   <Trade
 *     id="trade-1"
 *     :entry-time="1234567890"
 *     :entry-price="100"
 *     :exit-time="1234654290"
 *     :exit-price="110"
 *     :is-profitable="true"
 *   />
 * </CandlestickSeries>
 * ```
 */
export { default as Trade } from "./Trade.vue";

/**
 * Chart annotation for text, shapes, or arrows.
 *
 * Add visual annotations at specific chart coordinates to
 * highlight patterns, add notes, or draw attention to areas.
 *
 * @component Annotation
 * @example
 * ```vue
 * <CandlestickSeries :data="data" series-id="price">
 *   <Annotation
 *     :time="1234567890"
 *     :price="105"
 *     text="Breakout"
 *     type="text"
 *   />
 * </CandlestickSeries>
 * ```
 */
export { default as Annotation } from "./Annotation.vue";
