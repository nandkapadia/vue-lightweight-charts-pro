import { ref as w, shallowRef as q, computed as x, onUnmounted as z, watch as k } from "vue";
function O(s) {
  if (typeof s != "object" || s === null)
    return !1;
  const e = s;
  return typeof e.error == "string" || typeof e.detail == "string";
}
function P(s, e) {
  return O(s) && (s.error || s.detail) || e;
}
function N(s) {
  return typeof s == "object" && s !== null && !Array.isArray(s);
}
function F(s = {}) {
  const {
    baseUrl: e = "/api/charts",
    timeout: E = 3e4,
    fetchFn: $ = fetch
  } = s, S = w(!1), b = w(null), f = q(null);
  async function i(l, p) {
    S.value = !0, b.value = null;
    const h = new AbortController(), _ = setTimeout(() => h.abort(), E);
    try {
      const n = l.startsWith("http") ? l : `${e}${l}`, t = await $(n, {
        ...p,
        signal: h.signal,
        headers: {
          "Content-Type": "application/json",
          ...p?.headers
        }
      });
      if (!t.ok) {
        const r = await t.json().catch(() => ({})), u = P(
          r,
          `HTTP ${t.status}: ${t.statusText}`
        );
        throw new Error(u);
      }
      const c = await t.json();
      if (!N(c))
        throw new Error("Invalid API response: expected object");
      return f.value = c, c;
    } catch (n) {
      throw n instanceof Error ? n.name === "AbortError" ? b.value = "Request timeout" : b.value = n.message : b.value = "Unknown error occurred", n;
    } finally {
      clearTimeout(_), S.value = !1;
    }
  }
  async function y() {
    const l = e.replace("/api/charts", "/health");
    return i(l);
  }
  async function v(l, p) {
    return i(`/${l}`, {
      method: "POST",
      body: JSON.stringify(p || {})
    });
  }
  async function a(l) {
    return i(`/${l}`);
  }
  async function L(l, p, h) {
    return i(`/${l}/data/${p}/${h}`);
  }
  async function g(l, p, h) {
    return i(`/${l}/data/${p}`, {
      method: "POST",
      body: JSON.stringify(h)
    });
  }
  async function I(l, p, h, _, n = 500) {
    const t = new URLSearchParams({
      before_time: _.toString(),
      count: n.toString()
    });
    return i(
      `/${l}/history/${p}/${h}?${t}`
    );
  }
  function M() {
    b.value = null;
  }
  return {
    // State
    isLoading: S,
    error: b,
    data: f,
    // Methods
    healthCheck: y,
    createChart: v,
    getChart: a,
    getSeriesData: L,
    setSeriesData: g,
    getHistory: I,
    clearError: M
  };
}
const C = {
  enabled: !0,
  maxAttempts: 5,
  baseDelay: 1e3,
  maxDelay: 3e4
}, W = 3e4, j = ["connected", "pong", "initial_data_response", "history_response", "data_update"];
function B(s) {
  if (typeof s != "object" || s === null)
    return !1;
  const e = s;
  if (typeof e.type != "string" || !j.includes(e.type))
    return !1;
  switch (e.type) {
    case "connected":
      return typeof e.chartId == "string";
    case "pong":
      return !0;
    case "initial_data_response":
      return typeof e.chartId == "string";
    case "history_response":
      return typeof e.chartId == "string" && typeof e.paneId == "number" && typeof e.seriesId == "string" && Array.isArray(e.data) && typeof e.hasMoreBefore == "boolean" && typeof e.hasMoreAfter == "boolean";
    case "data_update":
      return typeof e.chartId == "string" && typeof e.paneId == "number" && typeof e.seriesId == "string" && typeof e.count == "number";
    default:
      return !1;
  }
}
function H(s, e = {}) {
  const {
    url: E,
    chartId: $,
    reconnect: S = C,
    pingInterval: b = W
  } = s, f = w("disconnected"), i = w(null), y = w(0), v = x(() => f.value === "connected");
  let a = null, L = null, g = null, I = !1;
  function M() {
    const { baseDelay: o = 1e3, maxDelay: d = 3e4 } = S;
    return Math.min(
      o * Math.pow(2, y.value),
      d
    ) + Math.random() * 500;
  }
  function l(o) {
    try {
      const d = JSON.parse(o.data);
      if (!B(d)) {
        console.warn("Invalid WebSocket message received:", d);
        return;
      }
      const T = d;
      switch (T.type) {
        case "connected":
          f.value = "connected", y.value = 0, e.onConnected?.(T.chartId);
          break;
        case "pong":
          break;
        case "initial_data_response":
          e.onInitialData?.(T);
          break;
        case "history_response":
          e.onHistoryResponse?.(T);
          break;
        case "data_update":
          e.onDataUpdate?.(T);
          break;
      }
    } catch (d) {
      console.error("Failed to parse WebSocket message:", d);
    }
  }
  function p() {
    f.value = "connecting", n();
  }
  function h() {
    if (f.value = "disconnected", t(), e.onDisconnected?.(), !I && S.enabled && !g) {
      const o = S.maxAttempts ?? C.maxAttempts;
      y.value < o ? c() : i.value = `Max reconnection attempts (${o}) reached`;
    }
  }
  function _(o) {
    f.value = "error";
    const d = "WebSocket connection error";
    i.value = d, e.onError?.(new Error(d));
  }
  function n() {
    t(), L = setInterval(() => {
      a?.readyState === WebSocket.OPEN && m({ type: "ping" });
    }, b);
  }
  function t() {
    L && (clearInterval(L), L = null);
  }
  function c() {
    g && (clearTimeout(g), g = null);
    const o = M();
    y.value++, console.log(
      `Scheduling reconnect attempt ${y.value} in ${o}ms`
    ), g = setTimeout(() => {
      g = null, r();
    }, o);
  }
  function r() {
    a && (a.close(), a = null), I = !1, f.value = "connecting", i.value = null;
    try {
      const o = `${E}/charts/${$}`;
      a = new WebSocket(o), a.onopen = p, a.onmessage = l, a.onclose = h, a.onerror = _;
    } catch (o) {
      a = null, f.value = "error", i.value = o instanceof Error ? o.message : "Failed to connect", e.onError?.(o instanceof Error ? o : new Error(String(o)));
    }
  }
  function u() {
    I = !0, t(), g && (clearTimeout(g), g = null), a && (a.close(), a = null), f.value = "disconnected", y.value = 0;
  }
  function m(o) {
    if (!a || a.readyState !== WebSocket.OPEN)
      return console.warn("WebSocket not connected, cannot send message"), !1;
    try {
      return a.send(JSON.stringify(o)), !0;
    } catch (d) {
      return console.error("Failed to send WebSocket message:", d), !1;
    }
  }
  function D(o, d) {
    m({
      type: "get_initial_data",
      paneId: o,
      seriesId: d
    });
  }
  function A(o, d, T, R = 500) {
    m({
      type: "request_history",
      paneId: o,
      seriesId: d,
      beforeTime: T,
      count: R
    });
  }
  return z(() => {
    u();
  }), {
    // State
    state: f,
    isConnected: v,
    error: i,
    reconnectAttempts: y,
    // Methods
    connect: r,
    disconnect: u,
    send: m,
    requestInitialData: D,
    requestHistory: A
  };
}
function V(s) {
  const {
    chart: e,
    seriesConfigs: E,
    loadThreshold: $ = 50,
    debounceMs: S = 300,
    onRequestHistory: b
  } = s, f = w(!1), i = w(/* @__PURE__ */ new Map()), y = w(/* @__PURE__ */ new Set());
  let v = null, a = null;
  function L() {
    const n = /* @__PURE__ */ new Map();
    E.value.forEach((t, c) => {
      if (t.lazyLoading?.enabled) {
        const r = t.seriesId || t.name || `series_${c}`;
        n.set(r, {
          seriesId: r,
          paneId: t.paneId || 0,
          lazyLoading: { ...t.lazyLoading },
          isLoadingBefore: !1,
          isLoadingAfter: !1,
          lastRequestTime: 0
        });
      }
    }), i.value = n;
  }
  function g(n, t, c) {
    const r = i.value.get(n);
    if (!r) return;
    const u = `${n}_${c}`;
    y.value.has(u) || c === "before" && !r.lazyLoading.hasMoreBefore || c === "after" && !r.lazyLoading.hasMoreAfter || (y.value.add(u), c === "before" ? r.isLoadingBefore = !0 : r.isLoadingAfter = !0, r.lastRequestTime = Date.now(), f.value = !0, b(
      n,
      r.paneId,
      t,
      c,
      r.lazyLoading.chunkSize
    ));
  }
  function I(n, t, c, r) {
    const u = i.value.get(n);
    if (!u) return;
    const m = `${n}_${t}`;
    y.value.delete(m), t === "before" ? (u.isLoadingBefore = !1, u.lazyLoading.hasMoreBefore = c) : (u.isLoadingAfter = !1, u.lazyLoading.hasMoreAfter = r), f.value = Array.from(i.value.values()).some(
      (D) => D.isLoadingBefore || D.isLoadingAfter
    );
  }
  function M(n) {
    !n || !e.value || i.value.forEach((t, c) => {
      if (!t.lazyLoading.enabled) return;
      const r = E.value.find(
        (A) => (A.seriesId || A.name) === c
      );
      if (!r?.data?.length) return;
      const u = r.data[0]?.time, m = r.data[r.data.length - 1]?.time;
      if (!u || !m) return;
      if (t.lazyLoading.hasMoreBefore && !t.isLoadingBefore && n.from < $) {
        const A = typeof u == "number" ? u : Date.parse(String(u)) / 1e3;
        g(c, A, "before");
      }
      const D = r.data.length;
      if (t.lazyLoading.hasMoreAfter && !t.isLoadingAfter && n.to > D - $) {
        const A = typeof m == "number" ? m : Date.parse(String(m)) / 1e3;
        g(c, A, "after");
      }
    });
  }
  function l(n) {
    v && clearTimeout(v), v = setTimeout(() => {
      M(n);
    }, S);
  }
  function p() {
    if (!e.value || (a && (a(), a = null), !Array.from(i.value.values()).some(
      (c) => c.lazyLoading.enabled
    ))) return;
    const t = e.value.timeScale();
    t.subscribeVisibleLogicalRangeChange(l), a = () => {
      t.unsubscribeVisibleLogicalRangeChange(l);
    };
  }
  function h() {
    a && (a(), a = null), v && (clearTimeout(v), v = null);
  }
  function _() {
    h(), i.value.clear(), y.value.clear(), f.value = !1, L(), p();
  }
  return k(
    e,
    (n) => {
      h(), n && p();
    },
    { immediate: !0 }
  ), k(
    E,
    () => {
      L();
    },
    { deep: !0 }
  ), L(), z(() => {
    h();
  }), {
    // State
    isLoading: f,
    loadingStates: i,
    pendingRequests: y,
    // Methods
    requestHistory: g,
    handleHistoryResponse: I,
    reset: _
  };
}
export {
  H as a,
  V as b,
  F as u
};
//# sourceMappingURL=useLazyLoading-BoWu6ULR.js.map
