import {
    a as e
} from "./rolldown-runtime-C_ttsnZz.js";
import {
    C as t,
    w as s
} from "./query-BYnN4WbX.js";
import {
    o as r,
    s as n
} from "./ui-BxzeyedK.js";
import {
    $t as i,
    C as a,
    F as l,
    en as o
} from "./index-W86zpBsQ.js";
var c = e(s(), 1),
    d = t(),
    m = () => {
        const {
            professores: e
        } = a(), [t, s] = (0, c.useState)(null), m = (0, c.useRef)(null), x = (0, c.useRef)(null), h = (0, c.useRef)(!0), [u, p] = (0, c.useState)(0), f = e => e && e.length > 0 ? e : "/assets/professor-1-D3kggQmp.jpg", b = e => {
            const t = m.current;
            if (!t) return;
            const s = t.children[0];
            if (!s) return;
            const r = s.offsetWidth + 16;
            t.scrollBy({
                left: r * e,
                behavior: "smooth"
            })
        };
        return (0, c.useEffect)(() => {
            const t = m.current;
            if (!t) return;
            const s = () => {
                const s = t.children[0];
                if (!s) return;
                const r = s.offsetWidth + 16,
                    n = Math.round(t.scrollLeft / r);
                p(Math.max(0, Math.min(e.length - 1, n)))
            };
            return t.addEventListener("scroll", s, {
                passive: !0
            }), () => t.removeEventListener("scroll", s)
        }, [e.length]), (0, c.useEffect)(() => {
            const e = m.current;
            if (!e) return;
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
            let t = 0,
                s = !1,
                r = !1;
            const n = () => {
                    t = performance.now() + 3500
                },
                i = () => {
                    s = !0
                },
                a = () => {
                    s = !1
                };
            e.addEventListener("pointerenter", i), e.addEventListener("pointerleave", a), e.addEventListener("pointerdown", n), e.addEventListener("touchstart", n, {
                passive: !0
            }), e.addEventListener("wheel", n, {
                passive: !0
            });
            const l = window.setInterval(() => {
                if (document.hidden || s || !h.current || performance.now() < t) return;
                const n = e.children[0];
                if (!n) return;
                const i = n.offsetWidth + 16,
                    a = e.scrollWidth - e.clientWidth,
                    l = e.scrollLeft >= a - 8,
                    o = e.scrollLeft <= 8;
                l && (r = !0), o && (r = !1), e.scrollBy({
                    left: r ? -i : i,
                    behavior: "smooth"
                })
            }, 3400);
            return () => {
                window.clearInterval(l), e.removeEventListener("pointerenter", i), e.removeEventListener("pointerleave", a), e.removeEventListener("pointerdown", n), e.removeEventListener("touchstart", n), e.removeEventListener("wheel", n)
            }
        }, [e.length]), (0, c.useEffect)(() => {
            const e = x.current;
            if (!e || "undefined" == typeof IntersectionObserver) return;
            const t = new IntersectionObserver(([e]) => {
                h.current = e.isIntersecting
            }, {
                threshold: 0
            });
            return t.observe(e), () => t.disconnect()
        }, []), (0, d.jsxs)("section", {
            ref: x,
            className: "relative pt-14 md:pt-28 pb-24 md:pb-36 overflow-hidden",
            style: {
                background: "linear-gradient(to bottom, #0E0E10 0%, #0E0E10 70%, #05080d 100%)"
            },
            children: [(0, d.jsx)("div", {
                className: "w-full px-4 md:px-8",
                children: (0, d.jsxs)("div", {
                    className: "max-w-[1400px] mx-auto",
                    children: [(0, d.jsxs)("div", {
                        className: "mb-10 md:mb-14 flex items-end justify-between gap-6 flex-wrap",
                        children: [(0, d.jsxs)("div", {
                            children: [(0, d.jsx)("span", {
                                className: "font-body text-[10px] md:text-[11px] text-primary tracking-[0.26em] uppercase block mb-4",
                                children: "Professores"
                            }), (0, d.jsxs)("h2", {
                                className: "font-display text-3xl md:text-5xl font-medium text-white tracking-[-0.03em] leading-[1.02] max-w-[18ch]",
                                children: ["Quem ensina", " ", (0, d.jsx)("span", {
                                    className: "text-white/40",
                                    children: "na Human."
                                })]
                            })]
                        }), (0, d.jsxs)("div", {
                            className: "hidden md:flex items-center gap-2",
                            children: [(0, d.jsx)("button", {
                                type: "button",
                                onClick: () => b(-1),
                                className: "w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 active:scale-95 transition-all duration-200",
                                "aria-label": "Anterior",
                                children: (0, d.jsx)(o, {
                                    className: "w-4 h-4"
                                })
                            }), (0, d.jsx)("button", {
                                type: "button",
                                onClick: () => b(1),
                                className: "w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 active:scale-95 transition-all duration-200",
                                "aria-label": "Próximo",
                                children: (0, d.jsx)(i, {
                                    className: "w-4 h-4"
                                })
                            })]
                        })]
                    }), (0, d.jsx)("div", {
                        ref: m,
                        className: "flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory gap-4 -mx-1 [&::-webkit-scrollbar]:hidden",
                        style: {
                            scrollbarWidth: "none"
                        },
                        children: e.map((e, t) => (0, d.jsxs)(r.button, {
                            initial: {
                                opacity: 0,
                                y: 24
                            },
                            whileInView: {
                                opacity: 1,
                                y: 0
                            },
                            viewport: {
                                once: !0,
                                margin: "-50px"
                            },
                            transition: {
                                duration: .5,
                                delay: .05 * Math.min(t, 4),
                                ease: [.23, 1, .32, 1]
                            },
                            onClick: () => s(e),
                            className: "group snap-start shrink-0 w-[48%] sm:w-[30%] md:w-[22%] lg:w-[17%] relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-black",
                            children: [(0, d.jsx)("img", {
                                src: f(e.image),
                                alt: e.name,
                                className: "absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 " + ("Nando Blum" === e.name ? "object-top" : ""),
                                loading: "lazy"
                            }), (0, d.jsx)("div", {
                                className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"
                            }), (0, d.jsxs)("div", {
                                className: "absolute bottom-0 left-0 right-0 p-4 text-left",
                                children: [(0, d.jsx)("h3", {
                                    className: "text-white font-semibold text-sm md:text-base leading-tight",
                                    children: e.name
                                }), (0, d.jsx)("p", {
                                    className: "text-white/50 text-xs mt-0.5 line-clamp-1",
                                    children: e.role
                                })]
                            }), (0, d.jsx)("div", {
                                className: "absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/20 transition-colors duration-300"
                            })]
                        }, e.id))
                    }), (0, d.jsx)("div", {
                        className: "md:hidden flex items-center justify-center gap-1.5 mt-6",
                        children: e.map((e, t) => (0, d.jsx)("span", {
                            className: "h-1 rounded-full transition-all duration-300 ease-out " + (t === u ? "w-6 bg-white" : "w-1.5 bg-white/20")
                        }, t))
                    })]
                })
            }), (0, d.jsx)(n, {
                children: t && (0, d.jsx)(r.div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    className: "fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4",
                    onClick: () => s(null),
                    children: (0, d.jsxs)(r.div, {
                        initial: {
                            opacity: 0,
                            scale: .92,
                            y: 30
                        },
                        animate: {
                            opacity: 1,
                            scale: 1,
                            y: 0
                        },
                        exit: {
                            opacity: 0,
                            scale: .92,
                            y: 30
                        },
                        transition: {
                            type: "spring",
                            damping: 28,
                            stiffness: 320
                        },
                        onClick: e => e.stopPropagation(),
                        className: "relative w-full max-w-2xl rounded-3xl overflow-hidden",
                        style: {
                            background: "linear-gradient(160deg, hsl(222 25% 12%) 0%, hsl(222 25% 7%) 100%)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            boxShadow: "0 30px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)"
                        },
                        children: [(0, d.jsx)("button", {
                            onClick: () => s(null),
                            className: "absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/70 transition-all duration-200",
                            children: (0, d.jsx)(l, {
                                className: "w-5 h-5"
                            })
                        }), (0, d.jsxs)("div", {
                            className: "flex flex-col sm:flex-row",
                            children: [(0, d.jsxs)("div", {
                                className: "relative w-full sm:w-[280px] aspect-[3/4] sm:aspect-auto shrink-0 min-h-[240px] sm:min-h-[380px]",
                                children: [(0, d.jsx)("img", {
                                    src: f(t.image),
                                    alt: t.name,
                                    className: "absolute inset-0 w-full h-full object-cover " + ("Nando Blum" === t.name ? "object-top" : "")
                                }), (0, d.jsx)("div", {
                                    className: "absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[hsl(222,25%,8%)] via-[hsl(222,25%,8%,0.3)] to-transparent"
                                })]
                            }), (0, d.jsxs)("div", {
                                className: "p-7 sm:p-10 flex flex-col justify-center -mt-16 sm:mt-0 relative z-10 flex-1",
                                children: [(0, d.jsxs)("div", {
                                    className: "inline-flex items-center gap-2 mb-4",
                                    children: [(0, d.jsx)("span", {
                                        className: "w-8 h-[2px] rounded-full bg-primary/60"
                                    }), (0, d.jsx)("span", {
                                        className: "text-primary/80 text-[10px] font-semibold tracking-[0.2em] uppercase",
                                        children: "Professor"
                                    })]
                                }), (0, d.jsx)("h3", {
                                    className: "text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight",
                                    children: t.name
                                }), (0, d.jsx)("p", {
                                    className: "text-primary text-sm font-medium mb-6",
                                    children: t.role
                                }), (0, d.jsx)("div", {
                                    className: "w-full h-px bg-white/[0.06] mb-6"
                                }), (0, d.jsx)("p", {
                                    className: "text-white/55 text-[15px] leading-[1.8] mb-8",
                                    children: t.desc
                                }), (0, d.jsx)("div", {
                                    className: "flex flex-wrap gap-2",
                                    children: t.role.split("&").map((e, t) => (0, d.jsx)("span", {
                                        className: "px-3 py-1.5 rounded-full text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] text-white/40",
                                        children: e.trim()
                                    }, t))
                                })]
                            })]
                        })]
                    })
                })
            })]
        })
    };
export {
    m as
    default
};