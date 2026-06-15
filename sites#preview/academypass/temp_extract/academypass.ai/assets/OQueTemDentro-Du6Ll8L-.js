import {
    a as e
} from "./rolldown-runtime-C_ttsnZz.js";
import {
    C as a,
    w as t
} from "./query-BYnN4WbX.js";
import {
    a as r,
    o,
    s
} from "./ui-BxzeyedK.js";
import {
    $t as i,
    C as l,
    en as n
} from "./index-W86zpBsQ.js";
import {
    t as d
} from "./LazyVideo-DeC_6Cb6.js";
var c = e(t(), 1),
    m = "/assets/platform-demo-Ch7KhiC6.jpg",
    u = a(),
    p = [{
        id: "1",
        icon: "",
        label: "CURSOS",
        title: "Cursos e Aulas",
        desc: "Curadoria e prática. O que funciona no mundo real. Cada curso tem um recorte claro — sem enrolação, sem módulo de preenchimento.",
        cta: "Conhecer cursos",
        ctaLink: "/cursos",
        tags: ["Recorte claro", "Prática aplicada", "Atualizado"]
    }, {
        id: "2",
        icon: "",
        label: "AURA IA",
        title: "Aura",
        desc: "A IA da Human que monta sua trilha de aprendizado no ritmo certo.",
        cta: "Ver a Aura",
        ctaLink: "/aura",
        tags: ["Contextual", "Plano de estudo", "Revisão"]
    }, {
        id: "3",
        icon: "",
        label: "LABS",
        title: "Labs de Criação",
        desc: "Templates, geradores, checklists e workflows. Ferramentas pra criar mais rápido sem perder qualidade.",
        cta: "Explorar labs",
        ctaLink: "/labs",
        tags: ["Templates", "Geradores", "Workflows"]
    }, {
        id: "4",
        icon: "",
        label: "BIBLIOTECA",
        title: "Biblioteca",
        desc: "Referências e prompts com contexto e aplicação. Cards organizados por estilo, formato e objetivo.",
        cta: "Ver biblioteca",
        ctaLink: "/biblioteca",
        tags: ["Referências", "Prompts", "Por estilo"]
    }, {
        id: "5",
        icon: "",
        label: "COMUNIDADE",
        title: "Comunidade",
        desc: "Pergunta boa, resposta boa. Suporte e troca de processo entre criativos que estão construindo com IA no dia a dia.",
        cta: "Conhecer a comunidade",
        ctaLink: "/comunidade",
        tags: ["+13.000 criativos", "Troca real", "Suporte"]
    }, {
        id: "6",
        icon: "",
        label: "WORKFLOWS",
        title: "Workflows",
        desc: "Uma nova forma de aprender. Passo a passo guiado, prático e direto ao ponto. Cada workflow é uma entrega real.",
        cta: "Ver Workflows",
        ctaLink: "/workflows",
        tags: ["Passo a passo", "Prático", "New"]
    }],
    h = {
        CURSOS: "/cursos",
        "AURA IA": "/aura",
        LABS: "/labs",
        BIBLIOTECA: "/biblioteca",
        COMUNIDADE: "/comunidade",
        WORKFLOWS: "/workflows"
    },
    x = () => {
        const {
            oQueTemDentro: e
        } = l(), a = (e.length > 0 ? e : p).map(e => ({ ...e,
            ctaLink: e.ctaLink || h[e.label] || ""
        })), t = (0, c.useRef)(null), [x, f] = (0, c.useState)(0), b = (0, c.useRef)(null), [g, v] = (0, c.useState)(0), {
            scrollYProgress: j
        } = r({
            target: t,
            offset: ["start start", "end end"]
        }), w = e => {
            const t = b.current;
            if (!t) return;
            const r = Math.max(0, Math.min(a.length - 1, g + e));
            t.children[r] ? .scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest"
            })
        };
        (0, c.useEffect)(() => {
            const e = b.current;
            if (!e) return;
            const t = () => {
                const t = e.clientWidth,
                    r = Math.round(e.scrollLeft / t);
                v(Math.max(0, Math.min(a.length - 1, r)))
            };
            return e.addEventListener("scroll", t, {
                passive: !0
            }), () => e.removeEventListener("scroll", t)
        }, [a.length]), (0, c.useEffect)(() => j.on("change", e => {
            const t = Math.max(0, Math.min(.9999, e));
            f(Math.min(a.length - 1, Math.floor(t * a.length)))
        }), [j, a.length]);
        const N = a[x];
        return (0, u.jsxs)(u.Fragment, {
            children: [(0, u.jsx)("section", {
                ref: t,
                id: "o-que-tem-dentro",
                className: "relative bg-background hidden md:block",
                style: {
                    height: 85 * a.length + "vh"
                },
                children: (0, u.jsxs)("div", {
                    className: "sticky top-0 h-screen overflow-hidden flex flex-col",
                    children: [(0, u.jsx)("div", {
                        "aria-hidden": "true",
                        className: "absolute w-[800px] h-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,hsla(215,50%,80%,0.2),transparent_60%)] top-[-250px] left-[-100px] pointer-events-none"
                    }), (0, u.jsx)("div", {
                        "aria-hidden": "true",
                        className: "absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,hsla(210,50%,85%,0.15),transparent_60%)] bottom-[-150px] right-[-80px] pointer-events-none"
                    }), (0, u.jsxs)("div", {
                        className: "relative z-10 container max-w-[1400px] flex-1 grid grid-cols-12 gap-8 lg:gap-14 pt-14 lg:pt-16 pb-12",
                        children: [(0, u.jsx)("div", {
                            className: "col-span-5 flex flex-col justify-center",
                            children: (0, u.jsx)("div", {
                                className: "flex flex-col",
                                children: a.map((e, r) => {
                                    const i = r === x;
                                    return (0, u.jsxs)("button", {
                                        onClick: () => (e => {
                                            const r = t.current;
                                            if (!r) return;
                                            const o = r.getBoundingClientRect(),
                                                s = window.scrollY + o.top + (r.offsetHeight - window.innerHeight) * ((e + .5) / a.length);
                                            window.scrollTo({
                                                top: s,
                                                behavior: "smooth"
                                            })
                                        })(r),
                                        className: "text-left group border-t border-foreground/10 last:border-b py-3 lg:py-4 focus:outline-none",
                                        "aria-current": i ? "true" : void 0,
                                        children: [(0, u.jsx)(o.h3, {
                                            animate: {
                                                color: i ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.3)"
                                            },
                                            transition: {
                                                duration: .4,
                                                ease: [.23, 1, .32, 1]
                                            },
                                            className: "font-display font-medium tracking-[-0.02em] text-2xl lg:text-[2.4rem] leading-[1.1]",
                                            children: e.title
                                        }), (0, u.jsx)(s, {
                                            initial: !1,
                                            children: i && (0, u.jsx)(o.div, {
                                                initial: {
                                                    opacity: 0,
                                                    height: 0
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    height: "auto"
                                                },
                                                exit: {
                                                    opacity: 0,
                                                    height: 0
                                                },
                                                transition: {
                                                    duration: .5,
                                                    ease: [.23, 1, .32, 1]
                                                },
                                                className: "overflow-hidden",
                                                children: (0, u.jsx)("p", {
                                                    className: "mt-4 font-body text-sm lg:text-[15px] leading-[1.6] text-foreground/65 max-w-[46ch]",
                                                    children: e.desc
                                                })
                                            }, "expanded")
                                        })]
                                    }, e.id)
                                })
                            })
                        }), (0, u.jsx)("div", {
                            className: "col-span-7 flex items-center",
                            children: (0, u.jsxs)("div", {
                                className: "relative w-full rounded-2xl overflow-hidden aspect-[16/11] border border-border shadow-[0_18px_60px_rgba(0,0,0,0.12)] bg-muted",
                                children: [(0, u.jsx)(s, {
                                    children: (0, u.jsx)(o.div, {
                                        initial: {
                                            opacity: 0
                                        },
                                        animate: {
                                            opacity: 1
                                        },
                                        exit: {
                                            opacity: 0
                                        },
                                        transition: {
                                            duration: .55,
                                            ease: [.23, 1, .32, 1]
                                        },
                                        className: "absolute inset-0",
                                        children: (0, u.jsx)(d, {
                                            src: N.video || "/assets/platform-demo-DkROaAvR.mp4",
                                            poster: m,
                                            delay: 120,
                                            className: "w-full h-full"
                                        })
                                    }, N.id)
                                }), (0, u.jsxs)("div", {
                                    className: "absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur text-white font-body text-[11px] tracking-[0.08em]",
                                    children: [String(x + 1).padStart(2, "0"), " / ", String(a.length).padStart(2, "0")]
                                })]
                            })
                        })]
                    })]
                })
            }), (0, u.jsxs)("section", {
                id: "o-que-tem-dentro-mobile",
                className: "relative bg-background py-14 overflow-hidden md:hidden",
                children: [(0, u.jsx)("div", {
                    className: "absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,hsla(215,50%,80%,0.2),transparent_60%)] top-[-200px] left-[-100px] pointer-events-none"
                }), (0, u.jsxs)("div", {
                    className: "relative z-10",
                    children: [(0, u.jsx)("div", {
                        ref: b,
                        className: "flex overflow-x-auto snap-x snap-mandatory px-5 gap-4 pb-2 [&::-webkit-scrollbar]:hidden",
                        style: {
                            scrollbarWidth: "none"
                        },
                        children: a.map((e, a) => (0, u.jsxs)("div", {
                            className: "snap-center shrink-0 w-full",
                            "aria-hidden": g !== a,
                            children: [(0, u.jsx)("div", {
                                className: "relative rounded-2xl overflow-hidden aspect-[16/11] border border-border bg-muted mb-4",
                                children: (0, u.jsx)(d, {
                                    src: e.video || "/assets/platform-demo-DkROaAvR.mp4",
                                    poster: m,
                                    delay: a === g ? 200 : 1500,
                                    className: "w-full h-full"
                                })
                            }), (0, u.jsx)("span", {
                                className: "font-body text-[10px] tracking-[0.2em] uppercase text-primary block mb-2",
                                children: e.label
                            }), (0, u.jsx)("h3", {
                                className: "font-display text-2xl font-bold text-foreground tracking-tight leading-[1.05] mb-2",
                                children: e.title
                            }), (0, u.jsx)("p", {
                                className: "font-body text-sm leading-[1.55] text-muted-foreground",
                                children: e.desc
                            })]
                        }, e.id))
                    }), (0, u.jsxs)("div", {
                        className: "container mt-7 flex items-center justify-between",
                        children: [(0, u.jsx)("div", {
                            className: "flex items-center gap-1.5",
                            children: a.map((e, a) => (0, u.jsx)("span", {
                                className: "h-1 rounded-full transition-all duration-300 ease-out " + (a === g ? "w-6 bg-foreground" : "w-1.5 bg-foreground/20")
                            }, a))
                        }), (0, u.jsxs)("div", {
                            className: "flex items-center gap-2",
                            children: [(0, u.jsx)("button", {
                                type: "button",
                                onClick: () => w(-1),
                                disabled: 0 === g,
                                className: "w-10 h-10 rounded-full border border-foreground/15 flex items-center justify-center text-foreground/80 disabled:opacity-30 active:scale-95 transition-transform duration-150",
                                "aria-label": "Anterior",
                                children: (0, u.jsx)(n, {
                                    className: "w-4 h-4"
                                })
                            }), (0, u.jsx)("button", {
                                type: "button",
                                onClick: () => w(1),
                                disabled: g === a.length - 1,
                                className: "w-10 h-10 rounded-full border border-foreground/15 flex items-center justify-center text-foreground/80 disabled:opacity-30 active:scale-95 transition-transform duration-150",
                                "aria-label": "Próximo",
                                children: (0, u.jsx)(i, {
                                    className: "w-4 h-4"
                                })
                            })]
                        })]
                    })]
                })]
            })]
        })
    };
export {
    x as
    default
};