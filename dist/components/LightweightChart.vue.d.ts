import { PropType } from 'vue';
import { IChartApi, ISeriesApi, SeriesType, MouseEventParams, LogicalRange, DeepPartial } from 'lightweight-charts';
import { ChartOptions, SeriesConfig, DataPoint } from '../types';
/**
 * Create a series on the chart.
 */
declare function createSeries(config: SeriesConfig): ISeriesApi<SeriesType> | null;
/**
 * Remove a series from the chart.
 */
declare function removeSeries(seriesId: string): void;
/**
 * Update series data.
 */
declare function updateSeriesData(seriesId: string, data: DataPoint[]): void;
/**
 * Merge history data into existing series data.
 */
declare function mergeHistoryData(seriesId: string, newData: DataPoint[], direction: 'before' | 'after'): void;
/**
 * Refresh series data from API.
 */
declare function refreshSeriesData(paneId: number, seriesId: string): Promise<void>;
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {
        containerRef: HTMLDivElement;
    };
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    /** Unique chart identifier */
    chartId: {
        type: StringConstructor;
        required: true;
    };
    /** Backend API URL */
    apiUrl: {
        type: StringConstructor;
        default: string;
    };
    /** WebSocket URL */
    wsUrl: {
        type: StringConstructor;
        default: string;
    };
    /** Chart configuration options */
    options: {
        type: PropType<ChartOptions>;
        default: () => {};
    };
    /** Initial series configurations */
    series: {
        type: PropType<SeriesConfig[]>;
        default: () => never[];
    };
    /** Whether to auto-connect to WebSocket */
    autoConnect: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Whether to auto-fit content after data changes */
    autoFit: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Whether to enable lazy loading */
    lazyLoading: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** CSS class for container */
    containerClass: {
        type: StringConstructor;
        default: string;
    };
}>, {
    /** Chart API instance */
    chart: import('vue').ShallowRef<IChartApi | null, IChartApi | null>;
    /** Map of series */
    seriesMap: import('vue').ShallowRef<Map<string, ISeriesApi<keyof import('lightweight-charts').SeriesOptionsMap, import('lightweight-charts').Time, import('lightweight-charts').BarData<import('lightweight-charts').Time> | import('lightweight-charts').WhitespaceData<import('lightweight-charts').Time> | import('lightweight-charts').CandlestickData<import('lightweight-charts').Time> | import('lightweight-charts').AreaData<import('lightweight-charts').Time> | import('lightweight-charts').BaselineData<import('lightweight-charts').Time> | import('lightweight-charts').LineData<import('lightweight-charts').Time> | import('lightweight-charts').HistogramData<import('lightweight-charts').Time> | import('lightweight-charts').CustomData<import('lightweight-charts').Time> | import('lightweight-charts').CustomSeriesWhitespaceData<import('lightweight-charts').Time>, import('lightweight-charts').BarSeriesOptions | import('lightweight-charts').CandlestickSeriesOptions | import('lightweight-charts').AreaSeriesOptions | import('lightweight-charts').BaselineSeriesOptions | import('lightweight-charts').LineSeriesOptions | import('lightweight-charts').HistogramSeriesOptions | import('lightweight-charts').CustomSeriesOptions, DeepPartial<import('lightweight-charts').BarStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | DeepPartial<import('lightweight-charts').CandlestickStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | DeepPartial<import('lightweight-charts').AreaStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | DeepPartial<import('lightweight-charts').BaselineStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | DeepPartial<import('lightweight-charts').LineStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | DeepPartial<import('lightweight-charts').HistogramStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | DeepPartial<import('lightweight-charts').CustomStyleOptions & import('lightweight-charts').SeriesOptionsCommon>>>, Map<string, ISeriesApi<keyof import('lightweight-charts').SeriesOptionsMap, import('lightweight-charts').Time, import('lightweight-charts').BarData<import('lightweight-charts').Time> | import('lightweight-charts').WhitespaceData<import('lightweight-charts').Time> | import('lightweight-charts').CandlestickData<import('lightweight-charts').Time> | import('lightweight-charts').AreaData<import('lightweight-charts').Time> | import('lightweight-charts').BaselineData<import('lightweight-charts').Time> | import('lightweight-charts').LineData<import('lightweight-charts').Time> | import('lightweight-charts').HistogramData<import('lightweight-charts').Time> | import('lightweight-charts').CustomData<import('lightweight-charts').Time> | import('lightweight-charts').CustomSeriesWhitespaceData<import('lightweight-charts').Time>, import('lightweight-charts').BarSeriesOptions | import('lightweight-charts').CandlestickSeriesOptions | import('lightweight-charts').AreaSeriesOptions | import('lightweight-charts').BaselineSeriesOptions | import('lightweight-charts').LineSeriesOptions | import('lightweight-charts').HistogramSeriesOptions | import('lightweight-charts').CustomSeriesOptions, DeepPartial<import('lightweight-charts').BarStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | DeepPartial<import('lightweight-charts').CandlestickStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | DeepPartial<import('lightweight-charts').AreaStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | DeepPartial<import('lightweight-charts').BaselineStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | DeepPartial<import('lightweight-charts').LineStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | DeepPartial<import('lightweight-charts').HistogramStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | DeepPartial<import('lightweight-charts').CustomStyleOptions & import('lightweight-charts').SeriesOptionsCommon>>>>;
    /** Create a new series */
    createSeries: typeof createSeries;
    /** Remove a series */
    removeSeries: typeof removeSeries;
    /** Update series data */
    updateSeriesData: typeof updateSeriesData;
    /** Merge history data */
    mergeHistoryData: typeof mergeHistoryData;
    /** Refresh series from API */
    refreshSeriesData: typeof refreshSeriesData;
    /** API client */
    api: import('..').UseChartApiReturn;
    /** WebSocket client */
    ws: import('..').UseChartWebSocketReturn | null;
    /** Loading state */
    isLoading: import('vue').ComputedRef<boolean>;
    /** Error state */
    error: import('vue').ComputedRef<string | null>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    connected: () => any;
    disconnected: () => any;
    error: (error: Error) => any;
    ready: (chart: IChartApi) => any;
    crosshairMove: (params: MouseEventParams<import('lightweight-charts').Time>) => any;
    visibleTimeRangeChange: (range: LogicalRange | null) => any;
    dataLoaded: (seriesId: string, count: number) => any;
    click: (params: MouseEventParams<import('lightweight-charts').Time>) => any;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    /** Unique chart identifier */
    chartId: {
        type: StringConstructor;
        required: true;
    };
    /** Backend API URL */
    apiUrl: {
        type: StringConstructor;
        default: string;
    };
    /** WebSocket URL */
    wsUrl: {
        type: StringConstructor;
        default: string;
    };
    /** Chart configuration options */
    options: {
        type: PropType<ChartOptions>;
        default: () => {};
    };
    /** Initial series configurations */
    series: {
        type: PropType<SeriesConfig[]>;
        default: () => never[];
    };
    /** Whether to auto-connect to WebSocket */
    autoConnect: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Whether to auto-fit content after data changes */
    autoFit: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Whether to enable lazy loading */
    lazyLoading: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** CSS class for container */
    containerClass: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{
    onConnected?: (() => any) | undefined;
    onDisconnected?: (() => any) | undefined;
    onError?: ((error: Error) => any) | undefined;
    onReady?: ((chart: IChartApi) => any) | undefined;
    onCrosshairMove?: ((params: MouseEventParams<import('lightweight-charts').Time>) => any) | undefined;
    onVisibleTimeRangeChange?: ((range: LogicalRange | null) => any) | undefined;
    onDataLoaded?: ((seriesId: string, count: number) => any) | undefined;
    onClick?: ((params: MouseEventParams<import('lightweight-charts').Time>) => any) | undefined;
}>, {
    lazyLoading: boolean;
    apiUrl: string;
    wsUrl: string;
    options: ChartOptions;
    series: SeriesConfig[];
    autoConnect: boolean;
    autoFit: boolean;
    containerClass: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {
    containerRef: HTMLDivElement;
}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
