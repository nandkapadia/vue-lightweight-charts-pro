import { PropType } from 'vue';
import { ISeriesApi, SeriesType } from 'lightweight-charts';
import { SeriesConfig, DataPoint } from '../types';
/**
 * Create a series on the chart for this pane.
 */
declare function createSeries(config: SeriesConfig): ISeriesApi<SeriesType> | null;
/**
 * Remove a series from the chart.
 */
declare function removeSeries(seriesId: string): void;
/**
 * Update data for a series in this pane.
 */
declare function updateSeriesData(seriesId: string, data: DataPoint[]): void;
/**
 * Get a series by ID.
 */
declare function getSeries(seriesId: string): ISeriesApi<SeriesType> | undefined;
/**
 * Toggle pane collapsed state.
 */
declare function toggleCollapse(): void;
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    /** Pane identifier */
    paneId: {
        type: NumberConstructor;
        default: number;
    };
    /** Pane height as percentage or pixels */
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    /** Whether the pane is collapsed */
    collapsed: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Series to render in this pane */
    series: {
        type: PropType<SeriesConfig[]>;
        default: () => never[];
    };
    /** Title for the pane */
    title: {
        type: StringConstructor;
        default: string;
    };
}>, {
    /** Pane ID */
    paneId: number;
    /** Local series map */
    seriesMap: import('vue').Ref<Map<string, {
        priceFormatter: () => import('lightweight-charts').IPriceFormatter;
        priceToCoordinate: (price: number) => import('lightweight-charts').Coordinate | null;
        coordinateToPrice: (coordinate: number) => import('lightweight-charts').BarPrice | null;
        barsInLogicalRange: (range: import('lightweight-charts').IRange<number>) => import('lightweight-charts').BarsInfo<import('lightweight-charts').Time> | null;
        applyOptions: (options: import('lightweight-charts').DeepPartial<import('lightweight-charts').BarStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').CandlestickStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').AreaStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').BaselineStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').LineStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').HistogramStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').CustomStyleOptions & import('lightweight-charts').SeriesOptionsCommon>) => void;
        options: () => Readonly<import('lightweight-charts').BarSeriesOptions | import('lightweight-charts').CandlestickSeriesOptions | import('lightweight-charts').AreaSeriesOptions | import('lightweight-charts').BaselineSeriesOptions | import('lightweight-charts').LineSeriesOptions | import('lightweight-charts').HistogramSeriesOptions | import('lightweight-charts').CustomSeriesOptions>;
        priceScale: () => import('lightweight-charts').IPriceScaleApi;
        setData: (data: (import('lightweight-charts').BarData<import('lightweight-charts').Time> | import('lightweight-charts').WhitespaceData<import('lightweight-charts').Time> | import('lightweight-charts').CandlestickData<import('lightweight-charts').Time> | import('lightweight-charts').AreaData<import('lightweight-charts').Time> | import('lightweight-charts').BaselineData<import('lightweight-charts').Time> | import('lightweight-charts').LineData<import('lightweight-charts').Time> | import('lightweight-charts').HistogramData<import('lightweight-charts').Time> | import('lightweight-charts').CustomData<import('lightweight-charts').Time> | import('lightweight-charts').CustomSeriesWhitespaceData<import('lightweight-charts').Time>)[]) => void;
        update: (bar: import('lightweight-charts').BarData<import('lightweight-charts').Time> | import('lightweight-charts').WhitespaceData<import('lightweight-charts').Time> | import('lightweight-charts').CandlestickData<import('lightweight-charts').Time> | import('lightweight-charts').AreaData<import('lightweight-charts').Time> | import('lightweight-charts').BaselineData<import('lightweight-charts').Time> | import('lightweight-charts').LineData<import('lightweight-charts').Time> | import('lightweight-charts').HistogramData<import('lightweight-charts').Time> | import('lightweight-charts').CustomData<import('lightweight-charts').Time> | import('lightweight-charts').CustomSeriesWhitespaceData<import('lightweight-charts').Time>, historicalUpdate?: boolean) => void;
        pop: (count: number) => (import('lightweight-charts').BarData<import('lightweight-charts').Time> | import('lightweight-charts').WhitespaceData<import('lightweight-charts').Time> | import('lightweight-charts').CandlestickData<import('lightweight-charts').Time> | import('lightweight-charts').AreaData<import('lightweight-charts').Time> | import('lightweight-charts').BaselineData<import('lightweight-charts').Time> | import('lightweight-charts').LineData<import('lightweight-charts').Time> | import('lightweight-charts').HistogramData<import('lightweight-charts').Time> | import('lightweight-charts').CustomData<import('lightweight-charts').Time> | import('lightweight-charts').CustomSeriesWhitespaceData<import('lightweight-charts').Time>)[];
        dataByIndex: (logicalIndex: number, mismatchDirection?: import('lightweight-charts').MismatchDirection) => import('lightweight-charts').BarData<import('lightweight-charts').Time> | import('lightweight-charts').WhitespaceData<import('lightweight-charts').Time> | import('lightweight-charts').CandlestickData<import('lightweight-charts').Time> | import('lightweight-charts').AreaData<import('lightweight-charts').Time> | import('lightweight-charts').BaselineData<import('lightweight-charts').Time> | import('lightweight-charts').LineData<import('lightweight-charts').Time> | import('lightweight-charts').HistogramData<import('lightweight-charts').Time> | import('lightweight-charts').CustomData<import('lightweight-charts').Time> | import('lightweight-charts').CustomSeriesWhitespaceData<import('lightweight-charts').Time> | null;
        data: () => readonly (import('lightweight-charts').BarData<import('lightweight-charts').Time> | import('lightweight-charts').WhitespaceData<import('lightweight-charts').Time> | import('lightweight-charts').CandlestickData<import('lightweight-charts').Time> | import('lightweight-charts').AreaData<import('lightweight-charts').Time> | import('lightweight-charts').BaselineData<import('lightweight-charts').Time> | import('lightweight-charts').LineData<import('lightweight-charts').Time> | import('lightweight-charts').HistogramData<import('lightweight-charts').Time> | import('lightweight-charts').CustomData<import('lightweight-charts').Time> | import('lightweight-charts').CustomSeriesWhitespaceData<import('lightweight-charts').Time>)[];
        subscribeDataChanged: (handler: import('lightweight-charts').DataChangedHandler) => void;
        unsubscribeDataChanged: (handler: import('lightweight-charts').DataChangedHandler) => void;
        createPriceLine: (options: import('lightweight-charts').CreatePriceLineOptions) => import('lightweight-charts').IPriceLine;
        removePriceLine: (line: import('lightweight-charts').IPriceLine) => void;
        priceLines: () => import('lightweight-charts').IPriceLine[];
        seriesType: () => keyof import('lightweight-charts').SeriesOptionsMap;
        lastValueData: (globalLast: boolean) => import('lightweight-charts').LastValueDataResult;
        attachPrimitive: (primitive: import('lightweight-charts').ISeriesPrimitive<import('lightweight-charts').Time>) => void;
        detachPrimitive: (primitive: import('lightweight-charts').ISeriesPrimitive<import('lightweight-charts').Time>) => void;
        moveToPane: (paneIndex: number) => void;
        seriesOrder: () => number;
        setSeriesOrder: (order: number) => void;
        getPane: () => import('lightweight-charts').IPaneApi<import('lightweight-charts').Time>;
    }> & Omit<Map<string, ISeriesApi<keyof import('lightweight-charts').SeriesOptionsMap, import('lightweight-charts').Time, import('lightweight-charts').BarData<import('lightweight-charts').Time> | import('lightweight-charts').WhitespaceData<import('lightweight-charts').Time> | import('lightweight-charts').CandlestickData<import('lightweight-charts').Time> | import('lightweight-charts').AreaData<import('lightweight-charts').Time> | import('lightweight-charts').BaselineData<import('lightweight-charts').Time> | import('lightweight-charts').LineData<import('lightweight-charts').Time> | import('lightweight-charts').HistogramData<import('lightweight-charts').Time> | import('lightweight-charts').CustomData<import('lightweight-charts').Time> | import('lightweight-charts').CustomSeriesWhitespaceData<import('lightweight-charts').Time>, import('lightweight-charts').BarSeriesOptions | import('lightweight-charts').CandlestickSeriesOptions | import('lightweight-charts').AreaSeriesOptions | import('lightweight-charts').BaselineSeriesOptions | import('lightweight-charts').LineSeriesOptions | import('lightweight-charts').HistogramSeriesOptions | import('lightweight-charts').CustomSeriesOptions, import('lightweight-charts').DeepPartial<import('lightweight-charts').BarStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').CandlestickStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').AreaStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').BaselineStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').LineStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').HistogramStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').CustomStyleOptions & import('lightweight-charts').SeriesOptionsCommon>>>, keyof Map<any, any>>, Map<string, ISeriesApi<keyof import('lightweight-charts').SeriesOptionsMap, import('lightweight-charts').Time, import('lightweight-charts').BarData<import('lightweight-charts').Time> | import('lightweight-charts').WhitespaceData<import('lightweight-charts').Time> | import('lightweight-charts').CandlestickData<import('lightweight-charts').Time> | import('lightweight-charts').AreaData<import('lightweight-charts').Time> | import('lightweight-charts').BaselineData<import('lightweight-charts').Time> | import('lightweight-charts').LineData<import('lightweight-charts').Time> | import('lightweight-charts').HistogramData<import('lightweight-charts').Time> | import('lightweight-charts').CustomData<import('lightweight-charts').Time> | import('lightweight-charts').CustomSeriesWhitespaceData<import('lightweight-charts').Time>, import('lightweight-charts').BarSeriesOptions | import('lightweight-charts').CandlestickSeriesOptions | import('lightweight-charts').AreaSeriesOptions | import('lightweight-charts').BaselineSeriesOptions | import('lightweight-charts').LineSeriesOptions | import('lightweight-charts').HistogramSeriesOptions | import('lightweight-charts').CustomSeriesOptions, import('lightweight-charts').DeepPartial<import('lightweight-charts').BarStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').CandlestickStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').AreaStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').BaselineStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').LineStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').HistogramStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').CustomStyleOptions & import('lightweight-charts').SeriesOptionsCommon>>> | (Map<string, {
        priceFormatter: () => import('lightweight-charts').IPriceFormatter;
        priceToCoordinate: (price: number) => import('lightweight-charts').Coordinate | null;
        coordinateToPrice: (coordinate: number) => import('lightweight-charts').BarPrice | null;
        barsInLogicalRange: (range: import('lightweight-charts').IRange<number>) => import('lightweight-charts').BarsInfo<import('lightweight-charts').Time> | null;
        applyOptions: (options: import('lightweight-charts').DeepPartial<import('lightweight-charts').BarStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').CandlestickStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').AreaStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').BaselineStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').LineStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').HistogramStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').CustomStyleOptions & import('lightweight-charts').SeriesOptionsCommon>) => void;
        options: () => Readonly<import('lightweight-charts').BarSeriesOptions | import('lightweight-charts').CandlestickSeriesOptions | import('lightweight-charts').AreaSeriesOptions | import('lightweight-charts').BaselineSeriesOptions | import('lightweight-charts').LineSeriesOptions | import('lightweight-charts').HistogramSeriesOptions | import('lightweight-charts').CustomSeriesOptions>;
        priceScale: () => import('lightweight-charts').IPriceScaleApi;
        setData: (data: (import('lightweight-charts').BarData<import('lightweight-charts').Time> | import('lightweight-charts').WhitespaceData<import('lightweight-charts').Time> | import('lightweight-charts').CandlestickData<import('lightweight-charts').Time> | import('lightweight-charts').AreaData<import('lightweight-charts').Time> | import('lightweight-charts').BaselineData<import('lightweight-charts').Time> | import('lightweight-charts').LineData<import('lightweight-charts').Time> | import('lightweight-charts').HistogramData<import('lightweight-charts').Time> | import('lightweight-charts').CustomData<import('lightweight-charts').Time> | import('lightweight-charts').CustomSeriesWhitespaceData<import('lightweight-charts').Time>)[]) => void;
        update: (bar: import('lightweight-charts').BarData<import('lightweight-charts').Time> | import('lightweight-charts').WhitespaceData<import('lightweight-charts').Time> | import('lightweight-charts').CandlestickData<import('lightweight-charts').Time> | import('lightweight-charts').AreaData<import('lightweight-charts').Time> | import('lightweight-charts').BaselineData<import('lightweight-charts').Time> | import('lightweight-charts').LineData<import('lightweight-charts').Time> | import('lightweight-charts').HistogramData<import('lightweight-charts').Time> | import('lightweight-charts').CustomData<import('lightweight-charts').Time> | import('lightweight-charts').CustomSeriesWhitespaceData<import('lightweight-charts').Time>, historicalUpdate?: boolean) => void;
        pop: (count: number) => (import('lightweight-charts').BarData<import('lightweight-charts').Time> | import('lightweight-charts').WhitespaceData<import('lightweight-charts').Time> | import('lightweight-charts').CandlestickData<import('lightweight-charts').Time> | import('lightweight-charts').AreaData<import('lightweight-charts').Time> | import('lightweight-charts').BaselineData<import('lightweight-charts').Time> | import('lightweight-charts').LineData<import('lightweight-charts').Time> | import('lightweight-charts').HistogramData<import('lightweight-charts').Time> | import('lightweight-charts').CustomData<import('lightweight-charts').Time> | import('lightweight-charts').CustomSeriesWhitespaceData<import('lightweight-charts').Time>)[];
        dataByIndex: (logicalIndex: number, mismatchDirection?: import('lightweight-charts').MismatchDirection) => import('lightweight-charts').BarData<import('lightweight-charts').Time> | import('lightweight-charts').WhitespaceData<import('lightweight-charts').Time> | import('lightweight-charts').CandlestickData<import('lightweight-charts').Time> | import('lightweight-charts').AreaData<import('lightweight-charts').Time> | import('lightweight-charts').BaselineData<import('lightweight-charts').Time> | import('lightweight-charts').LineData<import('lightweight-charts').Time> | import('lightweight-charts').HistogramData<import('lightweight-charts').Time> | import('lightweight-charts').CustomData<import('lightweight-charts').Time> | import('lightweight-charts').CustomSeriesWhitespaceData<import('lightweight-charts').Time> | null;
        data: () => readonly (import('lightweight-charts').BarData<import('lightweight-charts').Time> | import('lightweight-charts').WhitespaceData<import('lightweight-charts').Time> | import('lightweight-charts').CandlestickData<import('lightweight-charts').Time> | import('lightweight-charts').AreaData<import('lightweight-charts').Time> | import('lightweight-charts').BaselineData<import('lightweight-charts').Time> | import('lightweight-charts').LineData<import('lightweight-charts').Time> | import('lightweight-charts').HistogramData<import('lightweight-charts').Time> | import('lightweight-charts').CustomData<import('lightweight-charts').Time> | import('lightweight-charts').CustomSeriesWhitespaceData<import('lightweight-charts').Time>)[];
        subscribeDataChanged: (handler: import('lightweight-charts').DataChangedHandler) => void;
        unsubscribeDataChanged: (handler: import('lightweight-charts').DataChangedHandler) => void;
        createPriceLine: (options: import('lightweight-charts').CreatePriceLineOptions) => import('lightweight-charts').IPriceLine;
        removePriceLine: (line: import('lightweight-charts').IPriceLine) => void;
        priceLines: () => import('lightweight-charts').IPriceLine[];
        seriesType: () => keyof import('lightweight-charts').SeriesOptionsMap;
        lastValueData: (globalLast: boolean) => import('lightweight-charts').LastValueDataResult;
        attachPrimitive: (primitive: import('lightweight-charts').ISeriesPrimitive<import('lightweight-charts').Time>) => void;
        detachPrimitive: (primitive: import('lightweight-charts').ISeriesPrimitive<import('lightweight-charts').Time>) => void;
        moveToPane: (paneIndex: number) => void;
        seriesOrder: () => number;
        setSeriesOrder: (order: number) => void;
        getPane: () => import('lightweight-charts').IPaneApi<import('lightweight-charts').Time>;
    }> & Omit<Map<string, ISeriesApi<keyof import('lightweight-charts').SeriesOptionsMap, import('lightweight-charts').Time, import('lightweight-charts').BarData<import('lightweight-charts').Time> | import('lightweight-charts').WhitespaceData<import('lightweight-charts').Time> | import('lightweight-charts').CandlestickData<import('lightweight-charts').Time> | import('lightweight-charts').AreaData<import('lightweight-charts').Time> | import('lightweight-charts').BaselineData<import('lightweight-charts').Time> | import('lightweight-charts').LineData<import('lightweight-charts').Time> | import('lightweight-charts').HistogramData<import('lightweight-charts').Time> | import('lightweight-charts').CustomData<import('lightweight-charts').Time> | import('lightweight-charts').CustomSeriesWhitespaceData<import('lightweight-charts').Time>, import('lightweight-charts').BarSeriesOptions | import('lightweight-charts').CandlestickSeriesOptions | import('lightweight-charts').AreaSeriesOptions | import('lightweight-charts').BaselineSeriesOptions | import('lightweight-charts').LineSeriesOptions | import('lightweight-charts').HistogramSeriesOptions | import('lightweight-charts').CustomSeriesOptions, import('lightweight-charts').DeepPartial<import('lightweight-charts').BarStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').CandlestickStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').AreaStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').BaselineStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').LineStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').HistogramStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').CustomStyleOptions & import('lightweight-charts').SeriesOptionsCommon>>>, keyof Map<any, any>>)>;
    /** Create a series */
    createSeries: typeof createSeries;
    /** Remove a series */
    removeSeries: typeof removeSeries;
    /** Update series data */
    updateSeriesData: typeof updateSeriesData;
    /** Get a series */
    getSeries: typeof getSeries;
    /** Toggle collapse */
    toggleCollapse: typeof toggleCollapse;
    /** Collapsed state */
    isCollapsed: import('vue').Ref<boolean, boolean>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    seriesAdded: (seriesId: string, series: ISeriesApi<keyof import('lightweight-charts').SeriesOptionsMap, import('lightweight-charts').Time, import('lightweight-charts').BarData<import('lightweight-charts').Time> | import('lightweight-charts').WhitespaceData<import('lightweight-charts').Time> | import('lightweight-charts').CandlestickData<import('lightweight-charts').Time> | import('lightweight-charts').AreaData<import('lightweight-charts').Time> | import('lightweight-charts').BaselineData<import('lightweight-charts').Time> | import('lightweight-charts').LineData<import('lightweight-charts').Time> | import('lightweight-charts').HistogramData<import('lightweight-charts').Time> | import('lightweight-charts').CustomData<import('lightweight-charts').Time> | import('lightweight-charts').CustomSeriesWhitespaceData<import('lightweight-charts').Time>, import('lightweight-charts').BarSeriesOptions | import('lightweight-charts').CandlestickSeriesOptions | import('lightweight-charts').AreaSeriesOptions | import('lightweight-charts').BaselineSeriesOptions | import('lightweight-charts').LineSeriesOptions | import('lightweight-charts').HistogramSeriesOptions | import('lightweight-charts').CustomSeriesOptions, import('lightweight-charts').DeepPartial<import('lightweight-charts').BarStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').CandlestickStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').AreaStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').BaselineStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').LineStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').HistogramStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').CustomStyleOptions & import('lightweight-charts').SeriesOptionsCommon>>) => any;
    seriesRemoved: (seriesId: string) => any;
    toggleCollapse: (collapsed: boolean) => any;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    /** Pane identifier */
    paneId: {
        type: NumberConstructor;
        default: number;
    };
    /** Pane height as percentage or pixels */
    height: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    /** Whether the pane is collapsed */
    collapsed: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** Series to render in this pane */
    series: {
        type: PropType<SeriesConfig[]>;
        default: () => never[];
    };
    /** Title for the pane */
    title: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{
    onSeriesAdded?: ((seriesId: string, series: ISeriesApi<keyof import('lightweight-charts').SeriesOptionsMap, import('lightweight-charts').Time, import('lightweight-charts').BarData<import('lightweight-charts').Time> | import('lightweight-charts').WhitespaceData<import('lightweight-charts').Time> | import('lightweight-charts').CandlestickData<import('lightweight-charts').Time> | import('lightweight-charts').AreaData<import('lightweight-charts').Time> | import('lightweight-charts').BaselineData<import('lightweight-charts').Time> | import('lightweight-charts').LineData<import('lightweight-charts').Time> | import('lightweight-charts').HistogramData<import('lightweight-charts').Time> | import('lightweight-charts').CustomData<import('lightweight-charts').Time> | import('lightweight-charts').CustomSeriesWhitespaceData<import('lightweight-charts').Time>, import('lightweight-charts').BarSeriesOptions | import('lightweight-charts').CandlestickSeriesOptions | import('lightweight-charts').AreaSeriesOptions | import('lightweight-charts').BaselineSeriesOptions | import('lightweight-charts').LineSeriesOptions | import('lightweight-charts').HistogramSeriesOptions | import('lightweight-charts').CustomSeriesOptions, import('lightweight-charts').DeepPartial<import('lightweight-charts').BarStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').CandlestickStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').AreaStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').BaselineStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').LineStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').HistogramStyleOptions & import('lightweight-charts').SeriesOptionsCommon> | import('lightweight-charts').DeepPartial<import('lightweight-charts').CustomStyleOptions & import('lightweight-charts').SeriesOptionsCommon>>) => any) | undefined;
    onSeriesRemoved?: ((seriesId: string) => any) | undefined;
    onToggleCollapse?: ((collapsed: boolean) => any) | undefined;
}>, {
    title: string;
    paneId: number;
    series: SeriesConfig[];
    height: string | number;
    collapsed: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
