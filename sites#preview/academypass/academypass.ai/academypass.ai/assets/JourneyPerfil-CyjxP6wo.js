import {
    a as e
} from "./rolldown-runtime-C_ttsnZz.js";
import {
    C as t,
    w as s
} from "./query-BYnN4WbX.js";
import {
    i as l,
    n as a,
    o,
    r as i
} from "./ui-BxzeyedK.js";
import {
    t as n
} from "./InlineCTA-C8gn7lR2.js";
var r = e(s(), 1),
    c = t(),
    d = [{
        lv: 1,
        title: "Iniciante",
        color: "210, 40%, 50%",
        points: 500
    }, {
        lv: 3,
        title: "Explorador",
        color: "200, 60%, 50%",
        points: 1500
    }, {
        lv: 5,
        title: "Praticante",
        color: "170, 55%, 45%",
        points: 3500
    }, {
        lv: 7,
        title: "AvanÃ§ado",
        color: "150, 60%, 45%",
        points: 7e3
    }, {
        lv: 10,
        title: "Incomum",
        color: "140, 70%, 50%",
        points: 12e3
    }, {
        lv: 15,
        title: "Raro",
        color: "45, 80%, 55%",
        points: 2e4
    }, {
        lv: 20,
        title: "LendÃ¡rio",
        color: "280, 60%, 60%",
        points: 35e3
    }],
    x = () => {
        const [e, t] = (0, r.useState)(0), s = l(0), x = i(s, [0, 1], ["0%", "100%"]);
        (0, r.useEffect)(() => {
            let e = !1;
            const l = o => {
                    if (e) return;
                    t(o), s.set(0);
                    const i = a(s, 1, {
                        duration: 1e4 / d.length / 1e3,
                        ease: "easeInOut",
                        onComplete: () => {
                            e || l((o + 1) % d.length)
                        }
                    });
                    return () => i.stop()
                },
                o = l(0);
            return () => {
                e = !0, o?.()
            }
        }, [s]);
        const m = d[e],
            p = d[(e + 1) % d.length];
        return (0, c.jsxs)("section", {
            id: "journey-perfil",
            className: "relative py-12 md:py-24 overflow-hidden rounded-3xl mx-4 md:mx-8 scroll-mt-28",
            style: {
                backgroundColor: "hsl(222 25% 8%)"
            },
            children: [(0, c.jsx)(o.div, {
                className: "absolute pointer-events-none",
                style: {
                    top: "-30%",
                    left: "-30%",
                    width: "160%",
                    height: "160%"
                },
                animate: {
                    background: `linear-gradient(135deg, hsl(${m.color}) 0%, hsla(${m.color}, 0.8) 25%, hsla(${p.color}, 0.6) 60%, hsl(${p.color}) 100%)`,
                    rotate: [0, 5, -3, 0],
                    x: [0, 20, -15, 0],
                    y: [0, -15, 10, 0]
                },
                transition: {
                    background: {
                        duration: 1.5,
                        ease: "easeInOut"
                    },
                    rotate: {
                        duration: 12,
                        repeat: 1 / 0,
                        ease: "easeInOut"
                    },
                    x: {
                        duration: 10,
                        repeat: 1 / 0,
                        ease: "easeInOut"
                    },
                    y: {
                        duration: 8,
                        repeat: 1 / 0,
                        ease: "easeInOut"
                    }
                },
                children: (0, c.jsx)("div", {
                    className: "w-full h-full opacity-55",
                    style: {
                        background: "inherit"
                    }
                })
            }), (0, c.jsx)("div", {
                className: "absolute inset-0 bg-black/[0.35] pointer-events-none z-[1]"
            }), (0, c.jsxs)("div", {
                className: "relative z-10 container max-w-[1300px]",
                children: [(0, c.jsxs)(o.div, {
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
                    className: "mb-10 md:mb-14 text-center",
                    children: [(0, c.jsx)("span", {
                        className: "text-[10px] text-primary font-body tracking-[0.25em] uppercase mb-4 block",
                        children: "GamificaÃ§Ã£o"
                    }), (0, c.jsx)("h2", {
                        className: "font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[0.9] mb-5",
                        children: "Journey"
                    }), (0, c.jsx)("p", {
                        className: "text-white/35 font-body max-w-lg text-sm leading-relaxed mx-auto",
                        children: "ConsistÃªncia nÃ£o Ã© motivaÃ§Ã£o â€” Ã© sistema. Pontos, nÃ­veis e badges pra vocÃª enxergar progresso e manter ritmo. Cada curso, lab e entrega alimenta seu perfil."
                    })]
                }), (0, c.jsxs)(o.div, {
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
                    className: "relative",
                    children: [(0, c.jsxs)("div", {
                        className: "flex items-center justify-between mb-4",
                        children: [(0, c.jsxs)("div", {
                            className: "flex items-center gap-3",
                            children: [(0, c.jsx)(o.div, {
                                initial: {
                                    scale: .8,
                                    opacity: 0
                                },
                                animate: {
                                    scale: 1,
                                    opacity: 1
                                },
                                className: "flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08]",
                                style: {
                                    backgroundColor: `hsla(${m.color}, 0.12)`
                                },
                                children: (0, c.jsxs)("span", {
                                    className: "font-display text-sm font-bold",
                                    style: {
                                        color: `hsl(${m.color})`
                                    },
                                    children: ["Lv ", m.lv]
                                })
                            }, m.lv), (0, c.jsx)(o.span, {
                                initial: {
                                    opacity: 0,
                                    x: -10
                                },
                                animate: {
                                    opacity: 1,
                                    x: 0
                                },
                                className: "text-sm font-body text-white/60",
                                children: m.title
                            }, m.title)]
                        }), (0, c.jsxs)("div", {
                            className: "text-right",
                            children: [(0, c.jsx)(o.p, {
                                initial: {
                                    opacity: 0,
                                    y: -5
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                className: "font-display text-2xl md:text-3xl font-bold",
                                style: {
                                    color: `hsl(${m.color})`
                                },
                                children: m.points.toLocaleString("pt-BR")
                            }, m.points), (0, c.jsx)("p", {
                                className: "text-[10px] font-body text-white/30 tracking-[0.15em] uppercase",
                                children: "pontos totais"
                            })]
                        })]
                    }), (0, c.jsxs)("div", {
                        className: "flex items-center justify-between mb-2",
                        children: [(0, c.jsxs)("span", {
                            className: "text-xs font-body text-white/30",
                            children: ["Lv ", m.lv]
                        }), (0, c.jsxs)("span", {
                            className: "text-xs font-body text-white/30",
                            children: ["Lv ", p.lv]
                        })]
                    }), (0, c.jsx)("div", {
                        className: "relative w-full h-3 rounded-full bg-white/[0.06] overflow-hidden",
                        children: (0, c.jsx)(o.div, {
                            className: "absolute inset-y-0 left-0 rounded-full",
                            style: {
                                width: x,
                                background: `linear-gradient(90deg, hsl(${m.color}), hsl(${p.color}))`,
                                boxShadow: `0 0 20px hsla(${m.color}, 0.25), 0 0 60px hsla(${m.color}, 0.12)`
                            }
                        })
                    }), (0, c.jsx)("div", {
                        className: "flex justify-center mt-3",
                        children: (0, c.jsxs)(o.span, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            className: "text-xs font-body text-white/40",
                            children: ["Faltam", " ", (0, c.jsx)("span", {
                                className: "font-semibold text-white/60",
                                children: (p.points - m.points).toLocaleString("pt-BR")
                            }), " ", "pontos"]
                        }, `remaining-${e}`)
                    }), (0, c.jsx)("div", {
                        className: "flex items-center justify-between mt-12 px-2",
                        children: d.map((t, s) => (0, c.jsxs)("div", {
                            className: "flex flex-col items-center gap-2",
                            children: [(0, c.jsx)(o.div, {
                                className: "w-3 h-3 rounded-full border-2 transition-all duration-500",
                                style: {
                                    borderColor: s <= e ? `hsl(${t.color})` : "rgba(255,255,255,0.1)",
                                    backgroundColor: s <= e ? `hsl(${t.color})` : "transparent",
                                    boxShadow: s === e ? `0 0 12px hsla(${t.color}, 0.4)` : "none"
                                }
                            }), (0, c.jsx)("span", {
                                className: "text-[9px] font-body tracking-wide transition-colors duration-500",
                                style: {
                                    color: s <= e ? `hsl(${t.color})` : "rgba(255,255,255,0.2)"
                                },
                                children: t.lv
                            })]
                        }, t.lv))
                    }), (0, c.jsx)("div", {
                        className: "mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-6 md:gap-10",
                        children: [{
                            label: "Certificados"
                        }, {
                            label: "ConteÃºdo secreto"
                        }, {
                            label: "Badges"
                        }, {
                            label: "Early access"
                        }].map(e => (0, c.jsxs)("div", {
                            className: "flex items-center gap-2",
                            children: [(0, c.jsx)("span", {
                                className: "w-1.5 h-1.5 rounded-full bg-primary/50"
                            }), (0, c.jsx)("span", {
                                className: "text-[11px] font-body text-white/40",
                                children: e.label
                            })]
                        }, e.label))
                    }), (0, c.jsx)(n, {
                        label: "Quero evoluir",
                        className: "mt-10"
                    })]
                })]
            })]
        })
    };
export {
    x as
    default
};