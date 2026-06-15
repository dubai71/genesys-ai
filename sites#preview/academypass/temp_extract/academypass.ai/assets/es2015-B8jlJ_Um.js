import {
    a as e
} from "./rolldown-runtime-C_ttsnZz.js";
import {
    C as t,
    w as n
} from "./query-BYnN4WbX.js";
import {
    ft as r
} from "./vendor-DRGPM_Mv.js";
import {
    i as o
} from "./dist-DkmQ2f8N.js";
import {
    r as a
} from "./dist-HsHFUleU.js";
import {
    t as c
} from "./dist-CWjR5XLY.js";
import {
    i as u,
    r as i,
    t as s
} from "./tslib.es6-B44ydMPJ.js";
var l = e(n(), 1);

function d(e) {
    const t = l.useRef(e);
    return l.useEffect(() => {
        t.current = e
    }), l.useMemo(() => (...e) => t.current ? .(...e), [])
}

function f(e, t = globalThis ? .document) {
    const n = d(e);
    l.useEffect(() => {
        const e = e => {
            "Escape" === e.key && n(e)
        };
        return t.addEventListener("keydown", e, {
            capture: !0
        }), () => t.removeEventListener("keydown", e, {
            capture: !0
        })
    }, [n, t])
}
var v = e(r(), 1),
    m = t(),
    p = l.forwardRef((e, t) => {
        const {
            container: n,
            ...r
        } = e, [o, u] = l.useState(!1);
        a(() => u(!0), []);
        const i = n || o && globalThis ? .document ? .body;
        return i ? v.createPortal((0, m.jsx)(c.div, { ...r,
            ref: t
        }), i) : null
    });
p.displayName = "Portal";
var h = "focusScope.autoFocusOnMount",
    g = "focusScope.autoFocusOnUnmount",
    y = {
        bubbles: !1,
        cancelable: !0
    },
    E = l.forwardRef((e, t) => {
        const {
            loop: n = !1,
            trapped: r = !1,
            onMountAutoFocus: a,
            onUnmountAutoFocus: u,
            ...i
        } = e, [s, f] = l.useState(null), v = d(a), p = d(u), E = l.useRef(null), S = o(t, e => f(e)), M = l.useRef({
            paused: !1,
            pause() {
                this.paused = !0
            },
            resume() {
                this.paused = !1
            }
        }).current;
        l.useEffect(() => {
            if (r) {
                let e = function(e) {
                        if (M.paused || !s) return;
                        const t = e.target;
                        s.contains(t) ? E.current = t : C(E.current, {
                            select: !0
                        })
                    },
                    t = function(e) {
                        if (M.paused || !s) return;
                        const t = e.relatedTarget;
                        null !== t && (s.contains(t) || C(E.current, {
                            select: !0
                        }))
                    },
                    n = function(e) {
                        if (document.activeElement === document.body)
                            for (const t of e) t.removedNodes.length > 0 && C(s)
                    };
                document.addEventListener("focusin", e), document.addEventListener("focusout", t);
                const r = new MutationObserver(n);
                return s && r.observe(s, {
                    childList: !0,
                    subtree: !0
                }), () => {
                    document.removeEventListener("focusin", e), document.removeEventListener("focusout", t), r.disconnect()
                }
            }
        }, [r, s, M.paused]), l.useEffect(() => {
            if (s) {
                k.add(M);
                const t = document.activeElement;
                if (!s.contains(t)) {
                    const n = new CustomEvent(h, y);
                    s.addEventListener(h, v), s.dispatchEvent(n), n.defaultPrevented || (! function(e, {
                        select: t = !1
                    } = {}) {
                        const n = document.activeElement;
                        for (const r of e)
                            if (C(r, {
                                    select: t
                                }), document.activeElement !== n) return
                    }((e = w(s), e.filter(e => "A" !== e.tagName)), {
                        select: !0
                    }), document.activeElement === t && C(s))
                }
                return () => {
                    s.removeEventListener(h, v), setTimeout(() => {
                        const e = new CustomEvent(g, y);
                        s.addEventListener(g, p), s.dispatchEvent(e), e.defaultPrevented || C(t ? ? document.body, {
                            select: !0
                        }), s.removeEventListener(g, p), k.remove(M)
                    }, 0)
                }
            }
            var e
        }, [s, v, p, M]);
        const N = l.useCallback(e => {
            if (!n && !r) return;
            if (M.paused) return;
            const t = "Tab" === e.key && !e.altKey && !e.ctrlKey && !e.metaKey,
                o = document.activeElement;
            if (t && o) {
                const t = e.currentTarget,
                    [r, a] = function(e) {
                        const t = w(e);
                        return [b(t, e), b(t.reverse(), e)]
                    }(t);
                r && a ? e.shiftKey || o !== a ? e.shiftKey && o === r && (e.preventDefault(), n && C(a, {
                    select: !0
                })) : (e.preventDefault(), n && C(r, {
                    select: !0
                })) : o === t && e.preventDefault()
            }
        }, [n, r, M.paused]);
        return (0, m.jsx)(c.div, {
            tabIndex: -1,
            ...i,
            ref: S,
            onKeyDown: N
        })
    });

function w(e) {
    const t = [],
        n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
            acceptNode: e => {
                const t = "INPUT" === e.tagName && "hidden" === e.type;
                return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
            }
        });
    for (; n.nextNode();) t.push(n.currentNode);
    return t
}

function b(e, t) {
    for (const n of e)
        if (!S(n, {
                upTo: t
            })) return n
}

function S(e, {
    upTo: t
}) {
    if ("hidden" === getComputedStyle(e).visibility) return !0;
    for (; e;) {
        if (void 0 !== t && e === t) return !1;
        if ("none" === getComputedStyle(e).display) return !0;
        e = e.parentElement
    }
    return !1
}

function C(e, {
    select: t = !1
} = {}) {
    if (e && e.focus) {
        const n = document.activeElement;
        e.focus({
            preventScroll: !0
        }), e !== n && function(e) {
            return e instanceof HTMLInputElement && "select" in e
        }(e) && t && e.select()
    }
}
E.displayName = "FocusScope";
var k = function() {
    let e = [];
    return {
        add(t) {
            const n = e[0];
            t !== n && n ? .pause(), e = M(e, t), e.unshift(t)
        },
        remove(t) {
            e = M(e, t), e[0] ? .resume()
        }
    }
}();

function M(e, t) {
    const n = [...e],
        r = n.indexOf(t);
    return -1 !== r && n.splice(r, 1), n
}
var N = "right-scroll-bar-position",
    R = "width-before-scroll-bar";

function T(e, t) {
    return "function" == typeof e ? e(t) : e && (e.current = t), e
}
var L = "undefined" != typeof window ? l.useLayoutEffect : l.useEffect,
    A = new WeakMap;

function x(e, t) {
    var n, r, o, a = (n = t || null, r = function(t) {
        return e.forEach(function(e) {
            return T(e, t)
        })
    }, (o = (0, l.useState)(function() {
        return {
            value: n,
            callback: r,
            facade: {
                get current() {
                    return o.value
                },
                set current(e) {
                    var t = o.value;
                    t !== e && (o.value = e, o.callback(e, t))
                }
            }
        }
    })[0]).callback = r, o.facade);
    return L(function() {
        var t = A.get(a);
        if (t) {
            var n = new Set(t),
                r = new Set(e),
                o = a.current;
            n.forEach(function(e) {
                r.has(e) || T(e, null)
            }), r.forEach(function(e) {
                n.has(e) || T(e, o)
            })
        }
        A.set(a, e)
    }, [e]), a
}

function P(e) {
    return e
}
var F = function(e) {
    var t = e.sideCar,
        n = i(e, ["sideCar"]);
    if (!t) throw new Error("Sidecar: please provide `sideCar` property to import the right car");
    var r = t.read();
    if (!r) throw new Error("Sidecar medium not found");
    return l.createElement(r, s({}, n))
};
F.isSideCarExport = !0;
var I = function(e) {
        void 0 === e && (e = {});
        var t = function(e, t) {
            void 0 === t && (t = P);
            var n = [],
                r = !1;
            return {
                read: function() {
                    if (r) throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
                    return n.length ? n[n.length - 1] : e
                },
                useMedium: function(e) {
                    var o = t(e, r);
                    return n.push(o),
                        function() {
                            n = n.filter(function(e) {
                                return e !== o
                            })
                        }
                },
                assignSyncMedium: function(e) {
                    for (r = !0; n.length;) {
                        var t = n;
                        n = [], t.forEach(e)
                    }
                    n = {
                        push: function(t) {
                            return e(t)
                        },
                        filter: function() {
                            return n
                        }
                    }
                },
                assignMedium: function(e) {
                    r = !0;
                    var t = [];
                    if (n.length) {
                        var o = n;
                        n = [], o.forEach(e), t = n
                    }
                    var a = function() {
                            var n = t;
                            t = [], n.forEach(e)
                        },
                        c = function() {
                            return Promise.resolve().then(a)
                        };
                    c(), n = {
                        push: function(e) {
                            t.push(e), c()
                        },
                        filter: function(e) {
                            return t = t.filter(e), n
                        }
                    }
                }
            }
        }(null);
        return t.options = s({
            async: !0,
            ssr: !1
        }, e), t
    }(),
    W = function() {},
    _ = l.forwardRef(function(e, t) {
        var n = l.useRef(null),
            r = l.useState({
                onScrollCapture: W,
                onWheelCapture: W,
                onTouchMoveCapture: W
            }),
            o = r[0],
            a = r[1],
            c = e.forwardProps,
            u = e.children,
            d = e.className,
            f = e.removeScrollBar,
            v = e.enabled,
            m = e.shards,
            p = e.sideCar,
            h = e.noRelative,
            g = e.noIsolation,
            y = e.inert,
            E = e.allowPinchZoom,
            w = e.as,
            b = void 0 === w ? "div" : w,
            S = e.gapMode,
            C = i(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]),
            k = p,
            M = x([n, t]),
            N = s(s({}, C), o);
        return l.createElement(l.Fragment, null, v && l.createElement(k, {
            sideCar: I,
            removeScrollBar: f,
            shards: m,
            noRelative: h,
            noIsolation: g,
            inert: y,
            setCallbacks: a,
            allowPinchZoom: !!E,
            lockRef: n,
            gapMode: S
        }), c ? l.cloneElement(l.Children.only(u), s(s({}, N), {
            ref: M
        })) : l.createElement(b, s({}, N, {
            className: d,
            ref: M
        }), u))
    });
_.defaultProps = {
    enabled: !0,
    removeScrollBar: !0,
    inert: !1
}, _.classNames = {
    fullWidth: R,
    zeroRight: N
};

function j() {
    if (!document) return null;
    var e = document.createElement("style");
    e.type = "text/css";
    var t = function() {
        if ("undefined" != typeof __webpack_nonce__) return __webpack_nonce__
    }();
    return t && e.setAttribute("nonce", t), e
}
var B = function() {
        var e = 0,
            t = null;
        return {
            add: function(n) {
                var r, o;
                0 == e && (t = j()) && (o = n, (r = t).styleSheet ? r.styleSheet.cssText = o : r.appendChild(document.createTextNode(o)), function(e) {
                    (document.head || document.getElementsByTagName("head")[0]).appendChild(e)
                }(t)), e++
            },
            remove: function() {
                !--e && t && (t.parentNode && t.parentNode.removeChild(t), t = null)
            }
        }
    },
    D = function() {
        var e, t = (e = B(), function(t, n) {
            l.useEffect(function() {
                return e.add(t),
                    function() {
                        e.remove()
                    }
            }, [t && n])
        });
        return function(e) {
            var n = e.styles,
                r = e.dynamic;
            return t(n, r), null
        }
    },
    K = {
        left: 0,
        top: 0,
        right: 0,
        gap: 0
    },
    O = function(e) {
        return parseInt(e || "", 10) || 0
    },
    X = function(e) {
        if (void 0 === e && (e = "margin"), "undefined" == typeof window) return K;
        var t = function(e) {
                var t = window.getComputedStyle(document.body),
                    n = t["padding" === e ? "paddingLeft" : "marginLeft"],
                    r = t["padding" === e ? "paddingTop" : "marginTop"],
                    o = t["padding" === e ? "paddingRight" : "marginRight"];
                return [O(n), O(r), O(o)]
            }(e),
            n = document.documentElement.clientWidth,
            r = window.innerWidth;
        return {
            left: t[0],
            top: t[1],
            right: t[2],
            gap: Math.max(0, r - n + t[2] - t[0])
        }
    },
    Y = D(),
    H = "data-scroll-locked",
    U = function(e, t, n, r) {
        var o = e.left,
            a = e.top,
            c = e.right,
            u = e.gap;
        return void 0 === n && (n = "margin"), "\n  .".concat("with-scroll-bars-hidden", " {\n   overflow: hidden ").concat(r, ";\n   padding-right: ").concat(u, "px ").concat(r, ";\n  }\n  body[").concat(H, "] {\n    overflow: hidden ").concat(r, ";\n    overscroll-behavior: contain;\n    ").concat([t && "position: relative ".concat(r, ";"), "margin" === n && "\n    padding-left: ".concat(o, "px;\n    padding-top: ").concat(a, "px;\n    padding-right: ").concat(c, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(u, "px ").concat(r, ";\n    "), "padding" === n && "padding-right: ".concat(u, "px ").concat(r, ";")].filter(Boolean).join(""), "\n  }\n  \n  .").concat(N, " {\n    right: ").concat(u, "px ").concat(r, ";\n  }\n  \n  .").concat(R, " {\n    margin-right: ").concat(u, "px ").concat(r, ";\n  }\n  \n  .").concat(N, " .").concat(N, " {\n    right: 0 ").concat(r, ";\n  }\n  \n  .").concat(R, " .").concat(R, " {\n    margin-right: 0 ").concat(r, ";\n  }\n  \n  body[").concat(H, "] {\n    ").concat("--removed-body-scroll-bar-size", ": ").concat(u, "px;\n  }\n")
    },
    Z = function() {
        var e = parseInt(document.body.getAttribute("data-scroll-locked") || "0", 10);
        return isFinite(e) ? e : 0
    },
    q = function(e) {
        var t = e.noRelative,
            n = e.noImportant,
            r = e.gapMode,
            o = void 0 === r ? "margin" : r;
        l.useEffect(function() {
            return document.body.setAttribute(H, (Z() + 1).toString()),
                function() {
                    var e = Z() - 1;
                    e <= 0 ? document.body.removeAttribute(H) : document.body.setAttribute(H, e.toString())
                }
        }, []);
        var a = l.useMemo(function() {
            return X(o)
        }, [o]);
        return l.createElement(Y, {
            styles: U(a, !t, o, n ? "" : "!important")
        })
    },
    z = !1;
if ("undefined" != typeof window) try {
    var G = Object.defineProperty({}, "passive", {
        get: function() {
            return z = !0, !0
        }
    });
    window.addEventListener("test", G, G), window.removeEventListener("test", G, G)
} catch (ye) {
    z = !1
}
var J = !!z && {
        passive: !1
    },
    Q = function(e, t) {
        if (!(e instanceof Element)) return !1;
        var n = window.getComputedStyle(e);
        return "hidden" !== n[t] && !(n.overflowY === n.overflowX && ! function(e) {
            return "TEXTAREA" === e.tagName
        }(e) && "visible" === n[t])
    },
    V = function(e, t) {
        var n = t.ownerDocument,
            r = t;
        do {
            if ("undefined" != typeof ShadowRoot && r instanceof ShadowRoot && (r = r.host), $(e, r)) {
                var o = ee(e, r);
                if (o[1] > o[2]) return !0
            }
            r = r.parentNode
        } while (r && r !== n.body);
        return !1
    },
    $ = function(e, t) {
        return "v" === e ? function(e) {
            return Q(e, "overflowY")
        }(t) : function(e) {
            return Q(e, "overflowX")
        }(t)
    },
    ee = function(e, t) {
        return "v" === e ? [(n = t).scrollTop, n.scrollHeight, n.clientHeight] : function(e) {
            return [e.scrollLeft, e.scrollWidth, e.clientWidth]
        }(t);
        var n
    },
    te = function(e) {
        return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0]
    },
    ne = function(e) {
        return [e.deltaX, e.deltaY]
    },
    re = function(e) {
        return e && "current" in e ? e.current : e
    },
    oe = function(e) {
        return "\n  .block-interactivity-".concat(e, " {pointer-events: none;}\n  .allow-interactivity-").concat(e, " {pointer-events: all;}\n")
    },
    ae = 0,
    ce = [];

function ue(e) {
    for (var t = null; null !== e;) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
    return t
}
var ie, se = (ie = function(e) {
        var t = l.useRef([]),
            n = l.useRef([0, 0]),
            r = l.useRef(),
            o = l.useState(ae++)[0],
            a = l.useState(D)[0],
            c = l.useRef(e);
        l.useEffect(function() {
            c.current = e
        }, [e]), l.useEffect(function() {
            if (e.inert) {
                document.body.classList.add("block-interactivity-".concat(o));
                var t = u([e.lockRef.current], (e.shards || []).map(re), !0).filter(Boolean);
                return t.forEach(function(e) {
                        return e.classList.add("allow-interactivity-".concat(o))
                    }),
                    function() {
                        document.body.classList.remove("block-interactivity-".concat(o)), t.forEach(function(e) {
                            return e.classList.remove("allow-interactivity-".concat(o))
                        })
                    }
            }
        }, [e.inert, e.lockRef.current, e.shards]);
        var i = l.useCallback(function(e, t) {
                if ("touches" in e && 2 === e.touches.length || "wheel" === e.type && e.ctrlKey) return !c.current.allowPinchZoom;
                var o, a = te(e),
                    u = n.current,
                    i = "deltaX" in e ? e.deltaX : u[0] - a[0],
                    s = "deltaY" in e ? e.deltaY : u[1] - a[1],
                    l = e.target,
                    d = Math.abs(i) > Math.abs(s) ? "h" : "v";
                if ("touches" in e && "h" === d && "range" === l.type) return !1;
                var f = V(d, l);
                if (!f) return !0;
                if (f ? o = d : (o = "v" === d ? "h" : "v", f = V(d, l)), !f) return !1;
                if (!r.current && "changedTouches" in e && (i || s) && (r.current = o), !o) return !0;
                var v = r.current || o;
                return function(e, t, n, r, o) {
                    var a = function(e, t) {
                            return "h" === e && "rtl" === t ? -1 : 1
                        }(e, window.getComputedStyle(t).direction),
                        c = a * r,
                        u = n.target,
                        i = t.contains(u),
                        s = !1,
                        l = c > 0,
                        d = 0,
                        f = 0;
                    do {
                        if (!u) break;
                        var v = ee(e, u),
                            m = v[0],
                            p = v[1] - v[2] - a * m;
                        (m || p) && $(e, u) && (d += p, f += m);
                        var h = u.parentNode;
                        u = h && h.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? h.host : h
                    } while (!i && u !== document.body || i && (t.contains(u) || t === u));
                    return (l && (o && Math.abs(d) < 1 || !o && c > d) || !l && (o && Math.abs(f) < 1 || !o && -c > f)) && (s = !0), s
                }(v, t, e, "h" === v ? i : s, !0)
            }, []),
            s = l.useCallback(function(e) {
                var n = e;
                if (ce.length && ce[ce.length - 1] === a) {
                    var r = "deltaY" in n ? ne(n) : te(n),
                        o = t.current.filter(function(e) {
                            return e.name === n.type && (e.target === n.target || n.target === e.shadowParent) && (t = e.delta, o = r, t[0] === o[0] && t[1] === o[1]);
                            var t, o
                        })[0];
                    if (o && o.should) n.cancelable && n.preventDefault();
                    else if (!o) {
                        var u = (c.current.shards || []).map(re).filter(Boolean).filter(function(e) {
                            return e.contains(n.target)
                        });
                        (u.length > 0 ? i(n, u[0]) : !c.current.noIsolation) && n.cancelable && n.preventDefault()
                    }
                }
            }, []),
            d = l.useCallback(function(e, n, r, o) {
                var a = {
                    name: e,
                    delta: n,
                    target: r,
                    should: o,
                    shadowParent: ue(r)
                };
                t.current.push(a), setTimeout(function() {
                    t.current = t.current.filter(function(e) {
                        return e !== a
                    })
                }, 1)
            }, []),
            f = l.useCallback(function(e) {
                n.current = te(e), r.current = void 0
            }, []),
            v = l.useCallback(function(t) {
                d(t.type, ne(t), t.target, i(t, e.lockRef.current))
            }, []),
            m = l.useCallback(function(t) {
                d(t.type, te(t), t.target, i(t, e.lockRef.current))
            }, []);
        l.useEffect(function() {
            return ce.push(a), e.setCallbacks({
                    onScrollCapture: v,
                    onWheelCapture: v,
                    onTouchMoveCapture: m
                }), document.addEventListener("wheel", s, J), document.addEventListener("touchmove", s, J), document.addEventListener("touchstart", f, J),
                function() {
                    ce = ce.filter(function(e) {
                        return e !== a
                    }), document.removeEventListener("wheel", s, J), document.removeEventListener("touchmove", s, J), document.removeEventListener("touchstart", f, J)
                }
        }, []);
        var p = e.removeScrollBar,
            h = e.inert;
        return l.createElement(l.Fragment, null, h ? l.createElement(a, {
            styles: oe(o)
        }) : null, p ? l.createElement(q, {
            noRelative: e.noRelative,
            gapMode: e.gapMode
        }) : null)
    }, I.useMedium(ie), F),
    le = l.forwardRef(function(e, t) {
        return l.createElement(_, s({}, e, {
            ref: t,
            sideCar: se
        }))
    });
le.classNames = _.classNames;
var de = new WeakMap,
    fe = new WeakMap,
    ve = {},
    me = 0,
    pe = function(e) {
        return e && (e.host || pe(e.parentNode))
    },
    he = function(e, t, n, r) {
        var o = function(e, t) {
            return t.map(function(t) {
                if (e.contains(t)) return t;
                var n = pe(t);
                return n && e.contains(n) ? n : null
            }).filter(function(e) {
                return Boolean(e)
            })
        }(t, Array.isArray(e) ? e : [e]);
        ve[n] || (ve[n] = new WeakMap);
        var a = ve[n],
            c = [],
            u = new Set,
            i = new Set(o),
            s = function(e) {
                e && !u.has(e) && (u.add(e), s(e.parentNode))
            };
        o.forEach(s);
        var l = function(e) {
            e && !i.has(e) && Array.prototype.forEach.call(e.children, function(e) {
                if (u.has(e)) l(e);
                else try {
                    var t = e.getAttribute(r),
                        o = null !== t && "false" !== t,
                        i = (de.get(e) || 0) + 1,
                        s = (a.get(e) || 0) + 1;
                    de.set(e, i), a.set(e, s), c.push(e), 1 === i && o && fe.set(e, !0), 1 === s && e.setAttribute(n, "true"), o || e.setAttribute(r, "true")
                } catch (d) {}
            })
        };
        return l(t), u.clear(), me++,
            function() {
                c.forEach(function(e) {
                    var t = de.get(e) - 1,
                        o = a.get(e) - 1;
                    de.set(e, t), a.set(e, o), t || (fe.has(e) || e.removeAttribute(r), fe.delete(e)), o || e.removeAttribute(n)
                }), --me || (de = new WeakMap, de = new WeakMap, fe = new WeakMap, ve = {})
            }
    },
    ge = function(e, t, n) {
        void 0 === n && (n = "data-aria-hidden");
        var r = Array.from(Array.isArray(e) ? e : [e]),
            o = t || function(e) {
                return "undefined" == typeof document ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body
            }(e);
        return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live]"))), he(r, o, n, "aria-hidden")) : function() {
            return null
        }
    };
export {
    f as a, p as i, le as n, d as o, E as r, ge as t
};