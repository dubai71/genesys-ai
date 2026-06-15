import {
    a as e
} from "./rolldown-runtime-C_ttsnZz.js";
import {
    C as t,
    w as a
} from "./query-BYnN4WbX.js";
import {
    o as s
} from "./ui-BxzeyedK.js";
import {
    Wt as r,
    _t as i,
    l as n,
    s as l,
    w as o
} from "./index-W86zpBsQ.js";
import {
    t as d
} from "./AuraStarIcon-ChQKhU1n.js";
import {
    n as c,
    t as m
} from "./input-CVvwpgQW.js";
var p = e(a(), 1),
    u = t(),
    x = [{
        title: "Sora 2.0 — o que mudou de verdade",
        link: "https://humanupdate.substack.com",
        pubDate: ""
    }, {
        title: "3 prompts que salvam horas por semana",
        link: "https://humanupdate.substack.com",
        pubDate: ""
    }, {
        title: "Ferramenta nova: IA que edita vídeo sozinha",
        link: "https://humanupdate.substack.com",
        pubDate: ""
    }, {
        title: "📊 Tendência: agentes autônomos em 2026",
        link: "https://humanupdate.substack.com",
        pubDate: ""
    }],
    h = () => {
        const [e, t] = (0, p.useState)(x), [a, h] = (0, p.useState)(""), [b, g] = (0, p.useState)(""), f = (0, p.useRef)(null);
        (0, p.useEffect)(() => {
            (async () => {
                try {
                    const {
                        data: e,
                        error: a
                    } = await o.functions.invoke("substack-feed");
                    !a && e ? .success && e.items ? .length > 0 && (t(e.items.slice(0, 4)), e.items[0] ? .pubDate && h((e => {
                        if (!e) return "";
                        const t = new Date(e);
                        return `${["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"][t.getMonth()]} ${t.getFullYear()}`
                    })(e.items[0].pubDate)))
                } catch (e) {}
            })()
        }, []);
        return (0, u.jsxs)("section", {
            className: "relative py-14 md:py-32 overflow-hidden",
            style: {
                background: "linear-gradient(160deg, hsl(222 25% 8%) 0%, hsl(270 30% 15%) 40%, hsl(320 25% 18%) 70%, hsl(222 25% 8%) 100%)"
            },
            children: [(0, u.jsx)("div", {
                className: "absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,hsla(280,50%,50%,0.15),transparent_60%)] top-[-200px] right-[-100px] pointer-events-none"
            }), (0, u.jsx)("div", {
                className: "absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,hsla(320,40%,45%,0.1),transparent_60%)] bottom-[-150px] left-[-100px] pointer-events-none"
            }), (0, u.jsx)("div", {
                className: "relative z-10 container max-w-[1300px]",
                children: (0, u.jsxs)("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center",
                    children: [(0, u.jsxs)(s.div, {
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
                        children: [(0, u.jsxs)("div", {
                            className: "flex items-center gap-3 mb-6",
                            children: [(0, u.jsx)("div", {
                                className: "w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center",
                                children: (0, u.jsx)(i, {
                                    className: "w-5 h-5 text-primary"
                                })
                            }), (0, u.jsx)("span", {
                                className: "text-[10px] text-primary font-body tracking-[0.25em] uppercase",
                                children: "Newsletter"
                            })]
                        }), (0, u.jsx)("h2", {
                            className: "font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[0.95] mb-4",
                            children: (0, u.jsx)("span", {
                                className: "bg-gradient-to-r from-purple-400 via-pink-400 to-primary bg-clip-text text-transparent",
                                children: "Human Update"
                            })
                        }), (0, u.jsx)("p", {
                            className: "text-white/40 font-body text-sm leading-relaxed mb-8 max-w-md",
                            children: "A atualização que não te faz perder tempo. Todo update de IA que importa, curado e direto no seu email. Sem spam, sem hype vazio."
                        }), (0, u.jsx)("div", {
                            className: "flex flex-wrap gap-3 mb-10",
                            children: ["Curadoria semanal", "Ferramentas novas", "Prompts exclusivos", "Tendências de IA"].map(e => (0, u.jsxs)("span", {
                                className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-body text-white/50 bg-white/[0.04] border border-white/[0.08] rounded-full tracking-wide",
                                children: [(0, u.jsx)(d, {
                                    className: "w-3 h-3",
                                    colorFilter: "brightness(0) saturate(100%) invert(58%) sepia(18%) saturate(531%) hue-rotate(145deg) brightness(95%) contrast(88%) opacity(0.6)"
                                }), e]
                            }, e))
                        }), (0, u.jsxs)("form", {
                            onSubmit: e => {
                                e.preventDefault(), (() => {
                                    const e = b.trim();
                                    e && (l({
                                        contentName: "Human Update Newsletter",
                                        contentCategory: "newsletter",
                                        source: "newsletter",
                                        status: "submitted"
                                    }), n({
                                        source: "newsletter",
                                        email: e,
                                        tags: ["newsletter:human-update"]
                                    }).then(e => {
                                        e.ok
                                    }));
                                    const t = e ? `https://humanupdate.substack.com/subscribe?email=${encodeURIComponent(e)}` : "https://humanupdate.substack.com/subscribe";
                                    window.open(t, "_blank", "noopener,noreferrer")
                                })()
                            },
                            className: "flex gap-3 max-w-md",
                            children: [(0, u.jsx)(m, {
                                ref: f,
                                type: "email",
                                value: b,
                                onChange: e => g(e.target.value),
                                placeholder: "seu@email.com",
                                className: "bg-white/[0.05] border-white/[0.1] text-white placeholder:text-white/25 font-body rounded-xl h-12"
                            }), (0, u.jsx)(c, {
                                type: "submit",
                                className: "bg-primary text-primary-foreground font-display font-semibold rounded-xl h-12 px-6 shrink-0",
                                children: "Inscrever-se"
                            })]
                        }), (0, u.jsxs)("p", {
                            className: "text-[10px] text-white/20 font-body mt-3",
                            children: ["+48k criativos já recebem · Cancele quando quiser ·", " ", (0, u.jsx)("a", {
                                href: "https://humanupdate.substack.com",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "text-primary/40 hover:text-primary/60 transition-colors underline underline-offset-2",
                                children: "Ver edições anteriores"
                            })]
                        })]
                    }), (0, u.jsx)(s.div, {
                        initial: {
                            opacity: 0,
                            x: 30
                        },
                        whileInView: {
                            opacity: 1,
                            x: 0
                        },
                        viewport: {
                            once: !0
                        },
                        transition: {
                            delay: .15
                        },
                        className: "relative",
                        children: (0, u.jsx)("a", {
                            href: "https://humanupdate.substack.com",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "block group",
                            children: (0, u.jsxs)("div", {
                                className: "relative mx-auto max-w-sm",
                                children: [(0, u.jsx)("div", {
                                    className: "absolute -top-3 left-3 right-3 h-full rounded-2xl",
                                    style: {
                                        background: "linear-gradient(135deg, hsla(280, 40%, 35%, 0.3), hsla(320, 30%, 30%, 0.2))",
                                        border: "1px solid rgba(255,255,255,0.05)"
                                    }
                                }), (0, u.jsx)("div", {
                                    className: "absolute -top-1.5 left-1.5 right-1.5 h-full rounded-2xl",
                                    style: {
                                        background: "linear-gradient(135deg, hsla(280, 40%, 35%, 0.4), hsla(320, 30%, 30%, 0.3))",
                                        border: "1px solid rgba(255,255,255,0.07)"
                                    }
                                }), (0, u.jsxs)("div", {
                                    className: "relative rounded-2xl p-6 md:p-8 transition-all duration-300 group-hover:border-primary/30",
                                    style: {
                                        background: "linear-gradient(145deg, hsla(270, 30%, 20%, 0.8), hsla(310, 25%, 18%, 0.6))",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        backdropFilter: "blur(20px)"
                                    },
                                    children: [(0, u.jsxs)("div", {
                                        className: "flex items-center justify-between mb-5",
                                        children: [(0, u.jsxs)("div", {
                                            className: "flex items-center gap-2",
                                            children: [(0, u.jsx)("div", {
                                                className: "w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center",
                                                children: (0, u.jsx)(d, {
                                                    className: "w-4 h-4",
                                                    colorFilter: "none"
                                                })
                                            }), (0, u.jsxs)("div", {
                                                children: [(0, u.jsx)("p", {
                                                    className: "text-xs font-display font-semibold text-white",
                                                    children: "Human Update"
                                                }), (0, u.jsx)("p", {
                                                    className: "text-[9px] font-body text-white/30",
                                                    children: a ? `Última edição · ${a}` : "Edição mais recente"
                                                })]
                                            })]
                                        }), (0, u.jsx)(r, {
                                            className: "w-3.5 h-3.5 text-white/20 group-hover:text-primary/60 transition-colors"
                                        })]
                                    }), (0, u.jsx)("div", {
                                        className: "space-y-3",
                                        children: e.map((e, t) => (0, u.jsx)("div", {
                                            className: "flex items-start gap-2 py-2 border-b border-white/[0.06] last:border-0",
                                            children: (0, u.jsx)("p", {
                                                className: "text-xs font-body text-white/60 leading-relaxed",
                                                children: e.title
                                            })
                                        }, t))
                                    }), (0, u.jsxs)("div", {
                                        className: "mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between",
                                        children: [(0, u.jsx)("span", {
                                            className: "text-[9px] font-body text-white/25",
                                            children: "Ler no Substack →"
                                        }), (0, u.jsx)("span", {
                                            className: "text-[9px] font-body text-primary/50",
                                            children: "humanupdate.substack.com"
                                        })]
                                    })]
                                })]
                            })
                        })
                    })]
                })
            })]
        })
    };
export {
    h as
    default
};