import { defineComponent as V, ref as _, shallowRef as H, provide as O, watch as B, onMounted as se, onUnmounted as W, computed as T, createElementBlock as w, openBlock as M, normalizeClass as j, renderSlot as J, triggerRef as N, inject as F, normalizeStyle as re, createCommentVNode as q, createElementVNode as ie, toDisplayString as ne } from "vue";
import { createChart as oe, BaselineSeries as P, HistogramSeries as G, BarSeries as K, CandlestickSeries as Q, AreaSeries as X, LineSeries as Y } from "lightweight-charts";
import { u as le, a as ue, b as ce } from "./useLazyLoading-BoWu6ULR.js";
const de = /* @__PURE__ */ V({
  __name: "LightweightChart",
  props: {
    /** Unique chart identifier */
    chartId: {
      type: String,
      required: !0
    },
    /** Backend API URL */
    apiUrl: {
      type: String,
      default: "/api/charts"
    },
    /** WebSocket URL */
    wsUrl: {
      type: String,
      default: ""
    },
    /** Chart configuration options */
    options: {
      type: Object,
      default: () => ({})
    },
    /** Initial series configurations */
    series: {
      type: Array,
      default: () => []
    },
    /** Whether to auto-connect to WebSocket */
    autoConnect: {
      type: Boolean,
      default: !1
    },
    /** Whether to auto-fit content after data changes */
    autoFit: {
      type: Boolean,
      default: !0
    },
    /** Whether to enable lazy loading */
    lazyLoading: {
      type: Boolean,
      default: !0
    },
    /** CSS class for container */
    containerClass: {
      type: String,
      default: ""
    }
  },
  emits: ["ready", "crosshairMove", "visibleTimeRangeChange", "click", "connected", "disconnected", "error", "dataLoaded"],
  setup(v, { expose: L, emit: C }) {
    const a = v, d = C, o = _(null), t = H(null), n = H(/* @__PURE__ */ new Map()), l = _([...a.series]), R = _(!1), I = _(null);
    let m = null;
    const b = le({ baseUrl: a.apiUrl }), k = a.wsUrl ? ue(
      {
        url: a.wsUrl,
        chartId: a.chartId,
        reconnect: { enabled: !0 }
      },
      {
        onConnected: () => d("connected"),
        onDisconnected: () => d("disconnected"),
        onError: (e) => d("error", e),
        onHistoryResponse: (e) => {
          e.data && (z(e.seriesId, e.data, e.hasMoreBefore ? "before" : "after"), S?.handleHistoryResponse(
            e.seriesId,
            e.hasMoreBefore ? "before" : "after",
            e.hasMoreBefore,
            e.hasMoreAfter
          ));
        },
        onDataUpdate: async (e) => {
          await g(e.paneId, e.seriesId);
        }
      }
    ) : null, S = a.lazyLoading ? ce({
      chart: t,
      seriesConfigs: l,
      onRequestHistory: (e, i, s, p, h) => {
        k ? k.requestHistory(i, e, s, h) : b.getHistory(a.chartId, i, e, s, h).then((f) => {
          z(e, f.data, p), S?.handleHistoryResponse(
            e,
            p,
            f.hasMoreBefore,
            f.hasMoreAfter
          );
        }).catch((f) => {
          I.value = f instanceof Error ? f.message : "Failed to load history", d("error", f instanceof Error ? f : new Error(String(f)));
        });
      }
    }) : null;
    O("chart", t), O("seriesMap", n);
    function E() {
      if (!o.value || t.value) return;
      const e = {
        width: o.value.clientWidth,
        height: a.options?.height || 400,
        ...a.options
      };
      t.value = oe(o.value, e), t.value.subscribeCrosshairMove((i) => {
        d("crosshairMove", i);
      }), t.value.subscribeClick((i) => {
        d("click", i);
      }), t.value.timeScale().subscribeVisibleLogicalRangeChange((i) => {
        d("visibleTimeRangeChange", i);
      }), R.value = !0, d("ready", t.value);
    }
    function r(e) {
      if (!t.value) return null;
      const i = e.seriesId || e.name || `series_${n.value.size}`;
      let s;
      switch (e.seriesType.toLowerCase()) {
        case "line":
          s = t.value.addSeries(
            Y,
            e.options
          );
          break;
        case "area":
          s = t.value.addSeries(
            X,
            e.options
          );
          break;
        case "candlestick":
          s = t.value.addSeries(
            Q,
            e.options
          );
          break;
        case "bar":
          s = t.value.addSeries(
            K,
            e.options
          );
          break;
        case "histogram":
          s = t.value.addSeries(
            G,
            e.options
          );
          break;
        case "baseline":
          s = t.value.addSeries(
            P,
            e.options
          );
          break;
        default:
          return console.warn(`Unknown series type: ${e.seriesType}`), null;
      }
      return e.data?.length && s.setData(e.data), n.value.set(i, s), N(n), s;
    }
    function u(e) {
      const i = n.value.get(e);
      i && t.value && (t.value.removeSeries(i), n.value.delete(e), N(n));
    }
    function c(e, i) {
      const s = n.value.get(e);
      if (s) {
        s.setData(i);
        const p = l.value.findIndex(
          (h) => (h.seriesId || h.name) === e
        );
        p >= 0 && (l.value[p].data = i), d("dataLoaded", e, i.length), a.autoFit && t.value?.timeScale().fitContent();
      }
    }
    function z(e, i, s) {
      const p = l.value.findIndex(
        (y) => (y.seriesId || y.name) === e
      );
      if (p < 0) return;
      const h = l.value[p];
      let f;
      s === "before" ? f = [...i, ...h.data] : f = [...h.data, ...i], f.sort((y, D) => {
        const ae = typeof y.time == "number" ? y.time : Date.parse(String(y.time)), te = typeof D.time == "number" ? D.time : Date.parse(String(D.time));
        return ae - te;
      });
      const $ = /* @__PURE__ */ new Set();
      f = f.filter((y) => $.has(y.time) ? !1 : ($.add(y.time), !0)), c(e, f);
    }
    async function g(e, i) {
      try {
        const s = await b.getSeriesData(a.chartId, e, i);
        if (c(i, s.data), s.chunked && S) {
          const p = l.value.findIndex(
            (h) => (h.seriesId || h.name) === i
          );
          p >= 0 && (l.value[p].lazyLoading = {
            enabled: !0,
            chunkSize: s.chunkInfo?.count || 500,
            hasMoreBefore: s.hasMoreBefore,
            hasMoreAfter: s.hasMoreAfter,
            chunkInfo: s.chunkInfo
          });
        }
      } catch (s) {
        I.value = s instanceof Error ? s.message : "Failed to refresh series data", d("error", s instanceof Error ? s : new Error(String(s)));
      }
    }
    function x() {
      t.value && (n.value.forEach((e, i) => u(i)), l.value.forEach((e) => {
        r(e);
      }), a.autoFit && l.value.some((e) => e.data?.length) && t.value.timeScale().fitContent());
    }
    function ee() {
      t.value && o.value && t.value.resize(o.value.clientWidth, a.options?.height || 400);
    }
    let A = "";
    B(
      () => JSON.stringify(a.options),
      (e) => {
        e !== A && (A = e, t.value && a.options && t.value.applyOptions(a.options));
      }
    );
    let U = "";
    return B(
      () => JSON.stringify(a.series),
      (e) => {
        e !== U && (U = e, l.value = [...a.series], x());
      }
    ), se(() => {
      E(), x(), a.autoConnect && k && k.connect(), o.value && (m = new ResizeObserver(ee), m.observe(o.value));
    }), W(() => {
      m && (m.disconnect(), m = null), t.value && (t.value.remove(), t.value = null), n.value.clear();
    }), L({
      /** Chart API instance */
      chart: t,
      /** Map of series */
      seriesMap: n,
      /** Create a new series */
      createSeries: r,
      /** Remove a series */
      removeSeries: u,
      /** Update series data */
      updateSeriesData: c,
      /** Merge history data */
      mergeHistoryData: z,
      /** Refresh series from API */
      refreshSeriesData: g,
      /** API client */
      api: b,
      /** WebSocket client */
      ws: k,
      /** Loading state */
      isLoading: T(() => b.isLoading.value || (S?.isLoading.value ?? !1)),
      /** Error state */
      error: T(() => b.error.value || I.value)
    }), (e, i) => (M(), w("div", {
      ref_key: "containerRef",
      ref: o,
      class: j(["lightweight-chart-container", v.containerClass])
    }, [
      J(e.$slots, "default", {}, void 0, !0)
    ], 2));
  }
}), Z = (v, L) => {
  const C = v.__vccOpts || v;
  for (const [a, d] of L)
    C[a] = d;
  return C;
}, Se = /* @__PURE__ */ Z(de, [["__scopeId", "data-v-9ebdf9b8"]]), fe = {
  key: 0,
  class: "pane-header"
}, ve = { class: "pane-title" }, pe = {
  key: 1,
  class: "pane-content"
}, he = /* @__PURE__ */ V({
  __name: "ChartPane",
  props: {
    /** Pane identifier */
    paneId: {
      type: Number,
      default: 0
    },
    /** Pane height as percentage or pixels */
    height: {
      type: [Number, String],
      default: "100%"
    },
    /** Whether the pane is collapsed */
    collapsed: {
      type: Boolean,
      default: !1
    },
    /** Series to render in this pane */
    series: {
      type: Array,
      default: () => []
    },
    /** Title for the pane */
    title: {
      type: String,
      default: ""
    }
  },
  emits: ["seriesAdded", "seriesRemoved", "toggleCollapse"],
  setup(v, { expose: L, emit: C }) {
    const a = v, d = C, o = F("chart"), t = F("seriesMap"), n = _(/* @__PURE__ */ new Map()), l = _(a.collapsed);
    let R = 0;
    function I(r) {
      if (!o?.value) return null;
      const u = r.seriesId || r.name || `pane${a.paneId}_series_${R++}`;
      if (n.value.has(u))
        return n.value.get(u) || null;
      let c;
      const z = r.seriesType.toLowerCase(), g = {
        ...r.options
      };
      switch (z) {
        case "line":
          c = o.value.addSeries(
            Y,
            g,
            a.paneId
          );
          break;
        case "area":
          c = o.value.addSeries(
            X,
            g,
            a.paneId
          );
          break;
        case "candlestick":
          c = o.value.addSeries(
            Q,
            g,
            a.paneId
          );
          break;
        case "bar":
          c = o.value.addSeries(
            K,
            g,
            a.paneId
          );
          break;
        case "histogram":
          c = o.value.addSeries(
            G,
            g,
            a.paneId
          );
          break;
        case "baseline":
          c = o.value.addSeries(
            P,
            g,
            a.paneId
          );
          break;
        default:
          return console.warn(`Unknown series type: ${r.seriesType}`), null;
      }
      return r.data?.length && c.setData(r.data), n.value.set(u, c), t?.value && t.value.set(u, c), d("seriesAdded", u, c), c;
    }
    function m(r) {
      const u = n.value.get(r);
      u && o?.value && (o.value.removeSeries(u), n.value.delete(r), t?.value && t.value.delete(r), d("seriesRemoved", r));
    }
    function b(r, u) {
      const c = n.value.get(r);
      c && c.setData(u);
    }
    function k(r) {
      return n.value.get(r);
    }
    function S() {
      l.value = !l.value, d("toggleCollapse", l.value);
    }
    function E() {
      o?.value && (n.value.forEach((r, u) => {
        m(u);
      }), a.series.forEach((r) => {
        I({
          ...r,
          paneId: a.paneId
        });
      }));
    }
    return B(
      () => o?.value,
      (r) => {
        r && E();
      },
      { immediate: !0 }
    ), B(
      () => a.series,
      () => {
        E();
      },
      { deep: !0 }
    ), B(
      () => a.collapsed,
      (r) => {
        l.value = r;
      }
    ), W(() => {
      n.value.forEach((r, u) => {
        m(u);
      });
    }), L({
      /** Pane ID */
      paneId: a.paneId,
      /** Local series map */
      seriesMap: n,
      /** Create a series */
      createSeries: I,
      /** Remove a series */
      removeSeries: m,
      /** Update series data */
      updateSeriesData: b,
      /** Get a series */
      getSeries: k,
      /** Toggle collapse */
      toggleCollapse: S,
      /** Collapsed state */
      isCollapsed: l
    }), (r, u) => (M(), w("div", {
      class: j(["chart-pane", { collapsed: l.value }]),
      style: re({ height: typeof v.height == "number" ? `${v.height}px` : v.height })
    }, [
      v.title ? (M(), w("div", fe, [
        ie("span", ve, ne(v.title), 1),
        l.value ? (M(), w("button", {
          key: 1,
          class: "collapse-btn",
          title: "Expand pane",
          onClick: S
        }, " + ")) : (M(), w("button", {
          key: 0,
          class: "collapse-btn",
          title: "Collapse pane",
          onClick: S
        }, " − "))
      ])) : q("", !0),
      l.value ? q("", !0) : (M(), w("div", pe, [
        J(r.$slots, "default", {}, void 0, !0)
      ]))
    ], 6));
  }
}), be = /* @__PURE__ */ Z(he, [["__scopeId", "data-v-b95a1e6d"]]);
export {
  be as C,
  Se as L
};
//# sourceMappingURL=ChartPane-BYpW1UTk.js.map
