[**Vue Lightweight Charts Pro API**](../README.md)

***

[Vue Lightweight Charts Pro API](../README.md) / types

# types

## Fileoverview

Central type exports for the Vue 3 Lightweight Charts package.

This barrel file consolidates all type definitions from the types module,
providing a single import point for consumers. Types are organized into
logical groups for easier discovery.

## Example

```typescript
// Import specific types
import type { SeriesConfig, ChartOptions, DataPoint } from '@lightweight-charts-pro/vue3';

// Import enums (not type-only)
import { SeriesType, MarkerShape, LineStyle } from '@lightweight-charts-pro/vue3';
```

## Enumerations

- [AnnotationType](enumerations/AnnotationType.md)
- [CornerPosition](enumerations/CornerPosition.md)
- [CustomSeriesType](enumerations/CustomSeriesType.md)
- [LineStyle](enumerations/LineStyle.md)
- [MarkerPosition](enumerations/MarkerPosition.md)
- [MarkerShape](enumerations/MarkerShape.md)
- [RequestDirection](enumerations/RequestDirection.md)
- [SeriesType](enumerations/SeriesType.md)
- [TradeStyle](enumerations/TradeStyle.md)

## Interfaces

- [Annotation](interfaces/Annotation.md)
- [ApiError](interfaces/ApiError.md)
- [BandSeriesOptions](interfaces/BandSeriesOptions.md)
- [BaseMessage](interfaces/BaseMessage.md)
- [ChartData](interfaces/ChartData.md)
- [ChartEmits](interfaces/ChartEmits.md)
- [ChartOptions](interfaces/ChartOptions.md)
- [ChartProps](interfaces/ChartProps.md)
- [ChunkedSeriesDataResponse](interfaces/ChunkedSeriesDataResponse.md)
- [ChunkInfo](interfaces/ChunkInfo.md)
- [ConnectedMessage](interfaces/ConnectedMessage.md)
- [CreateChartResponse](interfaces/CreateChartResponse.md)
- [CrosshairOptions](interfaces/CrosshairOptions.md)
- [DataPoint](interfaces/DataPoint.md)
- [DataUpdateMessage](interfaces/DataUpdateMessage.md)
- [GetHistoryRequest](interfaces/GetHistoryRequest.md)
- [GetHistoryResponse](interfaces/GetHistoryResponse.md)
- [GetInitialDataMessage](interfaces/GetInitialDataMessage.md)
- [GradientRibbonSeriesOptions](interfaces/GradientRibbonSeriesOptions.md)
- [GridOptions](interfaces/GridOptions.md)
- [HealthCheckResponse](interfaces/HealthCheckResponse.md)
- [HistoryResponseMessage](interfaces/HistoryResponseMessage.md)
- [InitialDataResponseMessage](interfaces/InitialDataResponseMessage.md)
- [LayoutOptions](interfaces/LayoutOptions.md)
- [LazyLoadingConfig](interfaces/LazyLoadingConfig.md)
- [PaneConfig](interfaces/PaneConfig.md)
- [PingMessage](interfaces/PingMessage.md)
- [PongMessage](interfaces/PongMessage.md)
- [PriceLineConfig](interfaces/PriceLineConfig.md)
- [PriceScaleOptions](interfaces/PriceScaleOptions.md)
- [RequestHistoryMessage](interfaces/RequestHistoryMessage.md)
- [RibbonSeriesOptions](interfaces/RibbonSeriesOptions.md)
- [SeriesConfig](interfaces/SeriesConfig.md)
- [SeriesDataResponse](interfaces/SeriesDataResponse.md)
- [SeriesOptions](interfaces/SeriesOptions.md)
- [SetSeriesDataRequest](interfaces/SetSeriesDataRequest.md)
- [SetSeriesDataResponse](interfaces/SetSeriesDataResponse.md)
- [SignalSeriesOptions](interfaces/SignalSeriesOptions.md)
- [TimeScaleOptions](interfaces/TimeScaleOptions.md)
- [TradeConfig](interfaces/TradeConfig.md)
- [TradeVisualizationOptions](interfaces/TradeVisualizationOptions.md)
- [TrendFillSeriesOptions](interfaces/TrendFillSeriesOptions.md)
- [WebSocketConfig](interfaces/WebSocketConfig.md)
- [WebSocketEventHandlers](interfaces/WebSocketEventHandlers.md)

## Type Aliases

- [AllSeriesTypes](type-aliases/AllSeriesTypes.md)
- [GetSeriesDataResponse](type-aliases/GetSeriesDataResponse.md)
- [IncomingMessage](type-aliases/IncomingMessage.md)
- [OutgoingMessage](type-aliases/OutgoingMessage.md)
- [WebSocketState](type-aliases/WebSocketState.md)
