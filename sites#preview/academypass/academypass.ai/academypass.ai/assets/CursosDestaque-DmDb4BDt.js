import {
    a as e
} from "./rolldown-runtime-C_ttsnZz.js";
import {
    C as s,
    w as t
} from "./query-BYnN4WbX.js";
import {
    X as a
} from "./vendor-DRGPM_Mv.js";
import {
    o as l,
    s as o
} from "./ui-BxzeyedK.js";
import {
    C as i,
    F as r,
    Jt as n,
    Qt as d,
    _ as c,
    b as x,
    cn as m,
    fn as p,
    g as h,
    h as u,
    j as f,
    m as g,
    ot as b,
    tn as j,
    v as N,
    y as w
} from "./index-W86zpBsQ.js";
import {
    t as y
} from "./use-mobile-CjgID_fb.js";
var v = e(t(), 1),
    k = s(),
    C = w,
    z = N,
    _ = v.forwardRef(({
        className: e,
        ...s
    }, t) => (0, k.jsx)(c, {
        ref: t,
        className: f("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", e),
        ...s
    }));
_.displayName = c.displayName;
var S = v.forwardRef(({
    className: e,
    children: s,
    ...t
}, a) => (0, k.jsxs)(z, {
    children: [(0, k.jsx)(_, {}), (0, k.jsxs)(u, {
        ref: a,
        className: f("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", e),
        ...t,
        children: [s, (0, k.jsxs)(g, {
            className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
            children: [(0, k.jsx)(r, {
                className: "h-4 w-4"
            }), (0, k.jsx)("span", {
                className: "sr-only",
                children: "Close"
            })]
        })]
    })]
}));
S.displayName = u.displayName;
v.forwardRef(({
    className: e,
    ...s
}, t) => (0, k.jsx)(x, {
    ref: t,
    className: f("text-lg font-semibold leading-none tracking-tight", e),
    ...s
})).displayName = x.displayName, v.forwardRef(({
    className: e,
    ...s
}, t) => (0, k.jsx)(h, {
    ref: t,
    className: f("text-sm text-muted-foreground", e),
    ...s
})).displayName = h.displayName;
var V = ({
        course: e,
        open: s,
        onOpenChange: t
    }) => {
        const [i, c] = (0, v.useState)(null);
        return e ? (0, k.jsx)(C, {
            open: s,
            onOpenChange: t,
            children: (0, k.jsx)(S, {
                className: "max-w-3xl w-[95vw] max-h-[90vh] overflow-y-auto p-0 border-0 bg-transparent shadow-none [&>button]:hidden",
                children: (0, k.jsxs)("div", {
                    className: "relative rounded-3xl overflow-hidden",
                    style: {
                        background: "linear-gradient(180deg, hsl(222 25% 10%) 0%, hsl(222 25% 7%) 100%)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 25px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)"
                    },
                    children: [(0, k.jsx)("button", {
                        onClick: () => t(!1),
                        className: "absolute top-4 right-4 z-50 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors",
                        children: (0, k.jsx)(r, {
                            className: "w-4 h-4"
                        })
                    }), (0, k.jsxs)("div", {
                        className: "relative h-[240px] md:h-[320px] overflow-hidden",
                        children: [e.heroVideo ? (0, k.jsx)("video", {
                            src: e.heroVideo,
                            autoPlay: !0,
                            loop: !0,
                            muted: !0,
                            playsInline: !0,
                            controls: !1,
                            disablePictureInPicture: !0,
                            controlsList: "nodownload nofullscreen noremoteplayback",
                            className: "absolute inset-0 w-full h-full object-cover"
                        }) : (0, k.jsx)("img", {
                            src: e.image,
                            alt: e.title,
                            className: "absolute inset-0 w-full h-full object-cover"
                        }), (0, k.jsx)("div", {
                            className: "absolute inset-0 bg-gradient-to-t from-[hsl(222,25%,10%)] via-[hsl(222,25%,10%,0.4)] to-transparent"
                        }), (0, k.jsxs)("div", {
                            className: "absolute bottom-5 left-5 md:left-8 z-10",
                            children: [(0, k.jsx)("span", {
                                className: "inline-block text-[9px] font-body font-semibold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/70 mb-3",
                                children: e.tag
                            }), (0, k.jsx)("h2", {
                                className: "font-display text-2xl md:text-4xl font-bold text-white tracking-tight leading-tight",
                                children: e.title
                            })]
                        })]
                    }), (0, k.jsxs)("div", {
                        className: "p-5 md:p-8 space-y-8",
                        children: [(0, k.jsxs)("div", {
                            className: "flex flex-wrap gap-4 md:gap-6",
                            children: [e.duration && (0, k.jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [(0, k.jsx)("div", {
                                    className: "w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center",
                                    children: (0, k.jsx)(n, {
                                        className: "w-4 h-4 text-primary"
                                    })
                                }), (0, k.jsxs)("div", {
                                    children: [(0, k.jsx)("p", {
                                        className: "text-xs text-white/40 font-body",
                                        children: "Duração"
                                    }), (0, k.jsx)("p", {
                                        className: "text-sm text-white font-display font-semibold",
                                        children: e.duration
                                    })]
                                })]
                            }), e.lessonsCount && (0, k.jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [(0, k.jsx)("div", {
                                    className: "w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center",
                                    children: (0, k.jsx)(b, {
                                        className: "w-4 h-4 text-primary"
                                    })
                                }), (0, k.jsxs)("div", {
                                    children: [(0, k.jsx)("p", {
                                        className: "text-xs text-white/40 font-body",
                                        children: "Aulas"
                                    }), (0, k.jsxs)("p", {
                                        className: "text-sm text-white font-display font-semibold",
                                        children: [e.lessonsCount, "+ aulas"]
                                    })]
                                })]
                            }), e.modules && (0, k.jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [(0, k.jsx)("div", {
                                    className: "w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center",
                                    children: (0, k.jsx)(m, {
                                        className: "w-4 h-4 text-primary"
                                    })
                                }), (0, k.jsxs)("div", {
                                    children: [(0, k.jsx)("p", {
                                        className: "text-xs text-white/40 font-body",
                                        children: "Módulos"
                                    }), (0, k.jsxs)("p", {
                                        className: "text-sm text-white font-display font-semibold",
                                        children: [e.modules.length, " módulos"]
                                    })]
                                })]
                            })]
                        }), (0, k.jsx)("p", {
                            className: "text-white/50 font-body text-sm leading-relaxed",
                            children: e.longDesc || e.desc
                        }), e.modules && e.modules.length > 0 && (0, k.jsxs)("div", {
                            children: [(0, k.jsxs)("div", {
                                className: "flex items-center gap-2 mb-4",
                                children: [(0, k.jsx)(m, {
                                    className: "w-4 h-4 text-primary"
                                }), (0, k.jsx)("h3", {
                                    className: "font-display text-sm font-semibold text-white/70 uppercase tracking-wider",
                                    children: "Conteúdo do curso"
                                })]
                            }), (0, k.jsx)("div", {
                                className: "space-y-2",
                                children: e.modules.map((e, s) => {
                                    const t = i === s;
                                    return (0, k.jsxs)("div", {
                                        className: "rounded-2xl overflow-hidden transition-colors",
                                        style: {
                                            background: t ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                                            border: "1px solid " + (t ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)")
                                        },
                                        children: [(0, k.jsxs)("button", {
                                            className: "w-full flex items-center justify-between p-4 text-left",
                                            onClick: () => c(t ? null : s),
                                            children: [(0, k.jsxs)("div", {
                                                className: "flex items-center gap-3",
                                                children: [(0, k.jsx)("span", {
                                                    className: "text-[10px] text-primary font-body font-semibold tracking-wider",
                                                    children: String(s + 1).padStart(2, "0")
                                                }), (0, k.jsxs)("div", {
                                                    children: [(0, k.jsx)("p", {
                                                        className: "text-sm text-white font-display font-semibold",
                                                        children: e.title
                                                    }), (0, k.jsx)("p", {
                                                        className: "text-[11px] text-white/35 font-body",
                                                        children: e.subtitle
                                                    })]
                                                })]
                                            }), t ? (0, k.jsx)(d, {
                                                className: "w-4 h-4 text-white/30 shrink-0"
                                            }) : (0, k.jsx)(j, {
                                                className: "w-4 h-4 text-white/30 shrink-0"
                                            })]
                                        }), (0, k.jsx)(o, {
                                            children: t && (0, k.jsx)(l.div, {
                                                initial: {
                                                    height: 0,
                                                    opacity: 0
                                                },
                                                animate: {
                                                    height: "auto",
                                                    opacity: 1
                                                },
                                                exit: {
                                                    height: 0,
                                                    opacity: 0
                                                },
                                                transition: {
                                                    duration: .3,
                                                    ease: [.16, 1, .3, 1]
                                                },
                                                className: "overflow-hidden",
                                                children: (0, k.jsx)("div", {
                                                    className: "px-4 pb-4 pl-12",
                                                    children: (0, k.jsx)("ul", {
                                                        className: "space-y-1.5",
                                                        children: e.lessons.map((e, s) => (0, k.jsxs)("li", {
                                                            className: "flex items-center gap-2 text-xs text-white/40 font-body",
                                                            children: [(0, k.jsx)("div", {
                                                                className: "w-1 h-1 rounded-full bg-primary/50 shrink-0"
                                                            }), e]
                                                        }, s))
                                                    })
                                                })
                                            })
                                        })]
                                    }, s)
                                })
                            })]
                        }), (0, k.jsx)("div", {
                            className: "flex flex-col sm:flex-row gap-3 pt-2",
                            children: (0, k.jsxs)(a, {
                                to: `/cursos/${e.slug}`,
                                onClick: () => t(!1),
                                className: "flex-1 flex items-center justify-center gap-2 h-14 rounded-2xl font-display font-semibold text-sm uppercase tracking-[0.1em] text-white/90 transition-all duration-300 hover:shadow-[0_0_20px_hsl(195,50%,55%,0.3)]",
                                style: {
                                    background: "linear-gradient(105deg, hsl(195 40% 35% / 0.6) 0%, hsl(192 50% 45% / 0.5) 40%, hsl(195 35% 55% / 0.4) 100%)",
                                    border: "1px solid rgba(255,255,255,0.15)"
                                },
                                children: ["Ver mais sobre o curso", (0, k.jsx)(p, {
                                    className: "w-4 h-4"
                                })]
                            })
                        })]
                    })]
                })
            })
        }) : null
    },
    I = () => {
        const {
            cursos: e
        } = i(), [s, t] = (0, v.useState)(null), [o, r] = (0, v.useState)(!1), [n, d] = (0, v.useState)(!1), c = y(), x = Math.max(0, e.length - 3), m = !c || n ? e : e.slice(0, 3), p = (0, v.useMemo)(() => (e => {
            if (0 === e) return [];
            const s = [];
            let t = 0,
                a = 0;
            for (; t < e;) {
                const l = e - t;
                if (l >= 3) s.push(a % 2 == 0 ? [2, 1, 1] : [1, 1, 2]), t += 3, a += 1;
                else if (2 === l) s.push([2, 2]), t += 2;
                else {
                    const e = s[s.length - 1];
                    e && 3 === e.length ? (s[s.length - 1] = [1, 1, 1, 1], t += 1) : (s.push([4]), t += 1)
                }
            }
            return s.flat()
        })(m.length), [m.length]), h = (0, v.useMemo)(() => (e => e.map(e => 1 === e ? 1 : 2))(p), [p]);
        return (0, k.jsxs)("section", {
            id: "cursos-destaque",
            className: "relative pt-10 md:pt-16 pb-28 md:pb-40 overflow-hidden bg-background",
            children: [(0, k.jsx)("div", {
                className: "absolute w-[700px] h-[700px] rounded-full bg-[radial-gradient(ellipse_at_center,hsla(195,50%,80%,0.15),transparent_55%)] top-[-200px] left-[-100px]"
            }), (0, k.jsx)("div", {
                className: "absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,hsla(192,45%,85%,0.1),transparent_55%)] bottom-[-100px] right-[-50px]"
            }), (0, k.jsx)("div", {
                className: "relative z-10 w-full px-4 md:px-8",
                children: (0, k.jsxs)("div", {
                    className: "max-w-[1400px] mx-auto",
                    children: [(0, k.jsxs)(l.div, {
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        whileInView: {
                            opacity: 1,
                            y: 0
                        },
                        viewport: {
                            once: !0
                        },
                        className: "mb-16 md:mb-20",
                        children: [(0, k.jsx)("span", {
                            className: "text-[10px] text-primary font-body tracking-[0.25em] uppercase mb-4 block",
                            children: "Cursos"
                        }), (0, k.jsxs)("h2", {
                            className: "font-display text-4xl md:text-6xl lg:text-7xl font-medium text-foreground tracking-tight leading-[0.9] mb-5",
                            children: ["Acesso a todos os", " ", (0, k.jsx)("span", {
                                className: "bg-gradient-to-r from-primary via-[hsl(195,25%,55%)] to-primary bg-clip-text text-transparent",
                                children: "cursos"
                            })]
                        }), (0, k.jsx)("p", {
                            className: "text-muted-foreground font-body max-w-md text-sm",
                            children: "Os cursos mais bem avaliados da enfermagem digital. NPS acima de 90 em todas as turmas."
                        })]
                    }), (0, k.jsx)("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6",
                        children: m.map((e, s) => {
                            const a = h[s],
                                o = p[s],
                                i = [];
                            2 === a && i.push("sm:col-span-2"), 1 === o && 2 === a ? i.push("lg:col-span-1") : 2 === o ? i.push("lg:col-span-2") : 4 === o && i.push("lg:col-span-4");
                            const n = i.join(" ");
                            return (0, k.jsxs)(l.button, {
                                onClick: () => (t(e), void r(!0)),
                                initial: {
                                    opacity: 0,
                                    y: 30
                                },
                                whileInView: {
                                    opacity: 1,
                                    y: 0
                                },
                                viewport: {
                                    once: !0
                                },
                                transition: {
                                    delay: .07 * s,
                                    ease: [.16, 1, .3, 1]
                                },
                                className: `group relative block rounded-2xl overflow-hidden h-[280px] md:h-[340px] text-left cursor-pointer ${n}`,
                                style: {
                                    boxShadow: "0 8px 40px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
                                    border: "1px solid rgba(0,0,0,0.08)"
                                },
                                children: [(0, k.jsx)("img", {
                                    src: e.image,
                                    alt: e.title,
                                    className: "absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out",
                                    loading: "lazy"
                                }), (0, k.jsx)("div", {
                                    className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                                }), (0, k.jsx)("div", {
                                    className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-primary/20 via-transparent to-transparent"
                                }), (0, k.jsx)("div", {
                                    className: "absolute top-3 left-3 z-10",
                                    children: (0, k.jsx)("span", {
                                        className: "inline-block text-[9px] font-body font-semibold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/70",
                                        children: e.tag
                                    })
                                }), (0, k.jsxs)("div", {
                                    className: "absolute bottom-0 left-0 right-0 p-4 md:p-5 z-10",
                                    children: [(0, k.jsx)("h4", {
                                        className: "font-display text-lg md:text-xl font-bold text-white tracking-tight leading-tight group-hover:text-primary transition-colors duration-300",
                                        children: e.title
                                    }), (0, k.jsx)("p", {
                                        className: "text-sm text-white/40 font-body mt-1 line-clamp-2 leading-relaxed",
                                        children: e.desc
                                    }), e.duration && (0, k.jsxs)("div", {
                                        className: "flex items-center gap-3 mt-2",
                                        children: [(0, k.jsx)("span", {
                                            className: "text-xs text-white/30 font-body",
                                            children: e.duration
                                        }), e.lessonsCount && (0, k.jsxs)("span", {
                                            className: "text-xs text-white/30 font-body",
                                            children: [e.lessonsCount, "+ aulas"]
                                        })]
                                    })]
                                })]
                            }, e.id)
                        })
                    }), c && !n && x > 0 && (0, k.jsx)(l.div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        className: "flex justify-center mt-10",
                        children: (0, k.jsxs)("button", {
                            onClick: () => d(!0),
                            className: "flex items-center gap-2 px-6 py-3 rounded-full text-sm font-body font-medium text-muted-foreground hover:text-foreground border border-border hover:border-foreground/20 bg-background/50 backdrop-blur-sm transition-all duration-300",
                            children: ["Ver mais ", x, " cursos", (0, k.jsx)(j, {
                                className: "w-4 h-4"
                            })]
                        })
                    }), (0, k.jsxs)(l.div, {
                        initial: {
                            opacity: 0
                        },
                        whileInView: {
                            opacity: 1
                        },
                        viewport: {
                            once: !0
                        },
                        className: "mt-14 md:mt-20 pt-8 border-t border-border flex items-center justify-between",
                        children: [(0, k.jsxs)("span", {
                            className: "text-muted-foreground font-body text-[10px] tracking-[0.15em] uppercase",
                            children: [e.length, " cursos disponíveis"]
                        }), (0, k.jsxs)(a, {
                            to: "/cursos",
                            className: "font-body text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 group",
                            children: ["Ver todos", (0, k.jsx)("span", {
                                className: "transition-transform group-hover:translate-x-1",
                                children: "→"
                            })]
                        })]
                    })]
                })
            }), (0, k.jsx)(V, {
                course: s,
                open: o,
                onOpenChange: r
            })]
        })
    };
export {
    I as
    default
};