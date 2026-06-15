import {
    a as e
} from "./rolldown-runtime-C_ttsnZz.js";
import {
    w as n
} from "./query-BYnN4WbX.js";
import {
    i as t
} from "./dist-DkmQ2f8N.js";
import {
    r
} from "./dist-HsHFUleU.js";

function o(e, n, {
    checkForDefaultPrevented: t = !0
} = {}) {
    return function(r) {
        if (e ? .(r), !1 === t || !r.defaultPrevented) return n ? .(r)
    }
}
var i = e(n(), 1);
var u = e => {
    const {
        present: n,
        children: o
    } = e, u = function(e) {
        const [n, t] = i.useState(), o = i.useRef(null), u = i.useRef(e), a = i.useRef("none"), [c, d] = (m = e ? "mounted" : "unmounted", l = {
            mounted: {
                UNMOUNT: "unmounted",
                ANIMATION_OUT: "unmountSuspended"
            },
            unmountSuspended: {
                MOUNT: "mounted",
                ANIMATION_END: "unmounted"
            },
            unmounted: {
                MOUNT: "mounted"
            }
        }, i.useReducer((e, n) => l[e][n] ? ? e, m));
        var m, l;
        return i.useEffect(() => {
            const e = s(o.current);
            a.current = "mounted" === c ? e : "none"
        }, [c]), r(() => {
            const n = o.current,
                t = u.current;
            if (t !== e) {
                const r = a.current,
                    o = s(n);
                d(e ? "MOUNT" : "none" === o || "none" === n ? .display ? "UNMOUNT" : t && r !== o ? "ANIMATION_OUT" : "UNMOUNT"), u.current = e
            }
        }, [e, d]), r(() => {
            if (n) {
                let e;
                const t = n.ownerDocument.defaultView ? ? window,
                    r = r => {
                        const i = s(o.current).includes(r.animationName);
                        if (r.target === n && i && (d("ANIMATION_END"), !u.current)) {
                            const r = n.style.animationFillMode;
                            n.style.animationFillMode = "forwards", e = t.setTimeout(() => {
                                "forwards" === n.style.animationFillMode && (n.style.animationFillMode = r)
                            })
                        }
                    },
                    i = e => {
                        e.target === n && (a.current = s(o.current))
                    };
                return n.addEventListener("animationstart", i), n.addEventListener("animationcancel", r), n.addEventListener("animationend", r), () => {
                    t.clearTimeout(e), n.removeEventListener("animationstart", i), n.removeEventListener("animationcancel", r), n.removeEventListener("animationend", r)
                }
            }
            d("ANIMATION_END")
        }, [n, d]), {
            isPresent: ["mounted", "unmountSuspended"].includes(c),
            ref: i.useCallback(e => {
                o.current = e ? getComputedStyle(e) : null, t(e)
            }, [])
        }
    }(n), a = "function" == typeof o ? o({
        present: u.isPresent
    }) : i.Children.only(o), c = t(u.ref, function(e) {
        let n = Object.getOwnPropertyDescriptor(e.props, "ref") ? .get,
            t = n && "isReactWarning" in n && n.isReactWarning;
        return t ? e.ref : (n = Object.getOwnPropertyDescriptor(e, "ref") ? .get, t = n && "isReactWarning" in n && n.isReactWarning, t ? e.props.ref : e.props.ref || e.ref)
    }(a));
    return "function" == typeof o || u.isPresent ? i.cloneElement(a, {
        ref: c
    }) : null
};

function s(e) {
    return e ? .animationName || "none"
}
u.displayName = "Presence";
export {
    o as n, u as t
};