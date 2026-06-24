import {
    a as e
} from "./rolldown-runtime-C_ttsnZz.js";
import {
    C as t,
    w as a
} from "./query-BYnN4WbX.js";
import {
    X as s
} from "./vendor-DRGPM_Mv.js";
import {
    o as i,
    s as r
} from "./ui-BxzeyedK.js";
import {
    C as n,
    F as l,
    Ht as o,
    N as d,
    X as c,
    Y as p,
    a as m,
    cn as x,
    dn as h,
    dt as b,
    et as u,
    fn as g,
    i as f,
    nn as w,
    on as v,
    st as y,
    t as j,
    z as N,
    zt as k
} from "./index-W86zpBsQ.js";
import {
    t as A
} from "./AuraStarIcon-ChQKhU1n.js";
import {
    t as C
} from "./PreCheckoutModal-DNIyQdgw.js";
var I = e(a(), 1),
    R = t(),
    S = [{
        icon: N, title: "Comunidade", desc: "+20.000 profissionais. Networking, dúvidas e projetos reais.", wide: !0
    }, {
        icon: x, title: "Cursos", desc: "8 cursos com 330+ aulas práticas sobre o que o mercado usa agora."
    }, {
        icon: h, title: "Certificados", desc: "Reconhecimento formal para o seu portfólio."
    }, {
        icon: d, title: "Mapa de Carreira", desc: "Trace sua rota com IA e atinja seus objetivos.", isAura: !0, wide: !0
    }, {
        icon: k, title: "Eventos", desc: "Imersões ao vivo com profissionais que estão redefinindo a área."
    }, {
        icon: p, title: "IA para Enfermagem", desc: "Ferramentas de IA construídas especificamente para a rotina hospitalar."
    }, {
        icon: u, title: "Networking", desc: "Encontre colegas, parceiros e oportunidades únicas."
    }, {
        icon: x, title: "Mercado", desc: "Vagas e projetos para quem sabe usar IA na saúde."
    }, {
        icon: x, title: "Desafios", desc: "Pratique com casos reais e construa seu portfólio."
    }, {
        icon: v, title: "Especialidades", desc: "Cursos focados em UTI, PA, Obstetrícia, e mais."
    }],
    W = ["14 aulas práticas, do briefing   primeira criação", "Pack de +60 prompts (texto, imagem e vídeo)", "2 ferramentas exclusivas do Human Labs", "1 mês de LTX Studio para praticar", "Certificado ao final"],
    P = [{
        label: "Cursos e aulas",
        starter: "1 curso, 14 aulas práticas",
        pass: "8 cursos, 330+ aulas práticas"
    }, {
        label: "Pack de +60 prompts",
        starter: !0,
        pass: !0
    }, {
        label: "Ferramentas Human Labs",
        starter: "2 ferramentas",
        pass: "20+ ferramentas"
    }, {
        label: "1 mês de LTX Studio",
        starter: !0,
        pass: !0
    }, {
        label: "Certificado",
        starter: !0,
        pass: !0
    }, {
        label: "Comunidade",
        starter: !1,
        pass: "+20.000 profissionais"
    }, {
        label: "Aura AI",
        starter: !1,
        pass: !0
    }, {
        label: "Biblioteca completa de prompts",
        starter: !1,
        pass: !0
    }, {
        label: "Replays de eventos ao vivo",
        starter: !1,
        pass: !0
    }, {
        label: "Vagas exclusivas",
        starter: !1,
        pass: !0
    }],
    F = [{
        name: "Plus",
        oldPrice: "R$ 218",
        price: "R$ 152,60",
        installments: "12x",
        period: "2 anos de acesso",
        cashPrice: "€ vista R$1.831,20",
        discount: "20% OFF",
        highlight: !1,
        desc: "Impulsione sua carreira com os melhores cursos e faça parte da maior comunidade criativa.",
        features: ["23 Trilhas", "Todos os Cursos", "Acesso por 2 anos", "Certificado", "Mentorias em grupo", "Comunidade exclusiva", "Conteúdo das Imersões", "App mobile"]
    }, {
        name: "Pro",
        oldPrice: "R$ 285",
        price: "R$ 199,75",
        installments: "12x",
        period: "1 ano de acesso",
        cashPrice: "€ vista R$2.397",
        discount: "20% OFF",
        highlight: !0,
        badge: "Mais popular",
        desc: "Acelere seu aprendizado com a IA da Human e prepare-se para o mercado internacional.",
        features: ["Tudo do Plus", "Aura IA, a inteligência artificial da Human", "Multilíngue â€” Inglês e Espanhol"]
    }, {
        name: "Expert",
        oldPrice: "R$ 598",
        price: "R$ 418,60",
        installments: "12x",
        period: "2 anos de acesso",
        cashPrice: "€ vista R$5.023,20",
        discount: "20% OFF",
        highlight: !1,
        desc: "Para profissionais ultra comprometidos atingirem seu objetivo mais rápido.",
        features: ["Tudo do Pro", "Aura IA com mensagens ILIMITADAS", "Aura Vision, a IA que enxerga suas dúvidas", "E-books exclusivos", "Talent Lab â€” mentorias individuais e vagas exclusivas"]
    }],
    z = () => {
        const {
            plans: e
        } = n();
        (e.length > 0 ? e : F).length;
        const [t, a] = (0, I.useState)(!1), [p, m] = (0, I.useState)(""), [x, h] = (0, I.useState)(!1), [u, v] = (0, I.useState)(!1), [N, k] = (0, I.useState)(!1), [z, $] = (0, I.useState)(!1), E = (0, I.useRef)(null), T = (0, I.useRef)(0), q = j("https://form.humanacademy.ai/academy"), L = j("https://s.humanacademy.ai/cstarteryd");
        (0, I.useEffect)(() => {
            if (!t) return;
            const e = e => {
                "redirect" === e.data?.type && e.data?.url && (a(!1), window.location.href = j(e.data.url))
            };
            return window.addEventListener("message", e), () => window.removeEventListener("message", e)
        }, [t]);
        const V = (0, I.useCallback)(e => {
                e.preventDefault(), k(!0)
            }, []),
            _ = (0, I.useCallback)(e => {
                e.preventDefault(), $(!0)
            }, []);
        (0, I.useEffect)(() => (t ? document.body.setAttribute("data-payment-modal-open", "true") : document.body.removeAttribute("data-payment-modal-open"), () => {
            document.body.removeAttribute("data-payment-modal-open")
        }), [t]);
        const B = (0, I.useCallback)(() => {
                T.current++, h(!0), T.current > 1 && v(!0)
            }, []),
            M = (0, I.useCallback)(() => {
                a(!1), v(!1), T.current = 0
            }, []);
        return (0, R.jsxs)(R.Fragment, {
            children: [(0, R.jsx)(f, {
                open: N,
                onOpenChange: k
            }), (0, R.jsx)(C, {
                open: z,
                onOpenChange: $,
                checkoutUrl: L
            }), (0, R.jsx)(r, {
                children: t && (0, R.jsxs)(i.div, {
                    className: "fixed inset-0 z-50 flex items-center justify-center",
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
                        duration: .25
                    },
                    children: [(0, R.jsx)(r, {
                        children: !u && (0, R.jsx)(i.div, {
                            className: "absolute inset-0 bg-black/80 backdrop-blur-sm",
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
                                duration: .3
                            },
                            onClick: M
                        })
                    }), (0, R.jsxs)(i.div, {
                        className: "relative overflow-hidden",
                        style: {
                            background: "hsl(222 25% 6%)"
                        },
                        initial: {
                            scale: .95,
                            opacity: 0
                        },
                        animate: u ? {
                            width: "100vw",
                            height: "100vh",
                            borderRadius: 0,
                            scale: 1,
                            opacity: 1
                        } : {
                            width: "min(92vw, 896px)",
                            height: "82vh",
                            borderRadius: 24,
                            scale: 1,
                            opacity: 1
                        },
                        transition: {
                            duration: .4,
                            ease: [.16, 1, .3, 1]
                        },
                        children: [(0, R.jsx)(i.div, {
                            className: "absolute top-0 left-0 right-0 h-[2px] z-10",
                            style: {
                                background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)"
                            },
                            animate: {
                                opacity: u ? 0 : 1
                            }
                        }), (0, R.jsx)(r, {
                            children: !u && (0, R.jsx)(i.button, {
                                className: "absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.15] transition-all",
                                onClick: M,
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
                                    duration: .2
                                },
                                children: (0, R.jsx)(l, {
                                    className: "w-4 h-4"
                                })
                            })
                        }), (0, R.jsx)(r, {
                            children: !x && (0, R.jsxs)(i.div, {
                                className: "absolute inset-0 z-10 flex flex-col items-center justify-center gap-4",
                                initial: {
                                    opacity: 1
                                },
                                exit: {
                                    opacity: 0
                                },
                                transition: {
                                    duration: .3
                                },
                                style: {
                                    background: "hsl(222 25% 6%)"
                                },
                                children: [(0, R.jsx)(i.img, {
                                    src: "/assets/logo-academy-pass-B2qG8qtb.png",
                                    alt: "NurseHub Pass",
                                    className: "h-10 object-contain",
                                    initial: {
                                        opacity: 0,
                                        y: 10
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    transition: {
                                        duration: .4
                                    }
                                }), (0, R.jsx)(i.div, {
                                    className: "w-32 h-0.5 rounded-full overflow-hidden bg-white/[0.06]",
                                    initial: {
                                        opacity: 0
                                    },
                                    animate: {
                                        opacity: 1
                                    },
                                    transition: {
                                        delay: .2
                                    },
                                    children: (0, R.jsx)(i.div, {
                                        className: "h-full rounded-full bg-primary",
                                        initial: {
                                            width: "0%"
                                        },
                                        animate: {
                                            width: "100%"
                                        },
                                        transition: {
                                            duration: 2,
                                            ease: "easeInOut"
                                        }
                                    })
                                })]
                            })
                        }), (0, R.jsx)("iframe", {
                            ref: E,
                            src: p || q,
                            className: "w-full h-full border-0",
                            title: "Inscrição NurseHub",
                            allow: "payment",
                            onLoad: B
                        })]
                    })]
                })
            }), (0, R.jsxs)("section", {
                id: "pass",
                className: "relative pt-20 pb-10 md:py-32 lg:py-40 overflow-hidden",
                style: {
                    backgroundColor: "#05080d"
                },
                children: [(0, R.jsxs)("div", {
                    "aria-hidden": "true",
                    className: "absolute inset-0 pointer-events-none overflow-hidden",
                    children: [(0, R.jsx)("div", {
                        className: "pass-bg-blob pass-bg-blob-1"
                    }), (0, R.jsx)("div", {
                        className: "pass-bg-blob pass-bg-blob-2"
                    }), (0, R.jsx)("div", {
                        className: "pass-bg-blob pass-bg-blob-3"
                    }), (0, R.jsx)("div", {
                        className: "pass-bg-blob pass-bg-blob-4"
                    }), (0, R.jsx)("div", {
                        className: "absolute inset-0",
                        style: {
                            background: "radial-gradient(ellipse 90% 70% at 50% 45%, rgba(5,8,13,0) 0%, rgba(5,8,13,0.35) 55%, rgba(5,8,13,0.75) 100%)"
                        }
                    })]
                }), (0, R.jsx)("style", {
                    children: "\n        .pass-bg-blob {\n          position: absolute;\n          border-radius: 9999px;\n          filter: blur(80px);\n          will-change: transform, opacity;\n          opacity: 0.95;\n        }\n        .pass-bg-blob-1 {\n          width: max(75vw, 520px); height: max(75vw, 520px);\n          left: -15%; top: -20%;\n          background: radial-gradient(circle, hsl(210, 32%, 22%) 0%, hsl(215, 36%, 11%) 55%, transparent 75%);\n          animation: pass-drift-1 3.2s ease-in-out infinite;\n        }\n        .pass-bg-blob-2 {\n          width: max(70vw, 480px); height: max(70vw, 480px);\n          right: -18%; top: -15%;\n          background: radial-gradient(circle, hsl(205, 30%, 18%) 0%, hsl(218, 34%, 10%) 55%, transparent 75%);\n          animation: pass-drift-2 2.6s ease-in-out infinite;\n        }\n        .pass-bg-blob-3 {\n          width: max(80vw, 560px); height: max(80vw, 560px);\n          left: -20%; bottom: -25%;\n          background: radial-gradient(circle, hsl(212, 30%, 24%) 0%, hsl(220, 34%, 11%) 55%, transparent 75%);\n          animation: pass-drift-3 3.6s ease-in-out infinite;\n        }\n        .pass-bg-blob-4 {\n          width: max(70vw, 480px); height: max(70vw, 480px);\n          right: -15%; bottom: -22%;\n          background: radial-gradient(circle, hsl(208, 32%, 21%) 0%, hsl(216, 36%, 10%) 55%, transparent 75%);\n          animation: pass-drift-4 2.9s ease-in-out infinite;\n        }\n        @media (min-width: 1024px) {\n          .pass-bg-blob-1, .pass-bg-blob-2, .pass-bg-blob-3, .pass-bg-blob-4 { filter: blur(90px); }\n          .pass-bg-blob-1 { width: 55vw; height: 55vw; left: -10%; top: -15%; }\n          .pass-bg-blob-2 { width: 50vw; height: 50vw; right: -12%; top: -10%; }\n          .pass-bg-blob-3 { width: 60vw; height: 60vw; left: -15%; bottom: -20%; }\n          .pass-bg-blob-4 { width: 50vw; height: 50vw; right: -10%; bottom: -18%; }\n        }\n        @keyframes pass-drift-1 {\n          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.85; }\n          50%      { transform: translate(18vw, 12vw) scale(1.15); opacity: 1; }\n        }\n        @keyframes pass-drift-2 {\n          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }\n          50%      { transform: translate(-20vw, 14vw) scale(1.2); opacity: 0.95; }\n        }\n        @keyframes pass-drift-3 {\n          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.85; }\n          50%      { transform: translate(22vw, -16vw) scale(1.1); opacity: 1; }\n        }\n        @keyframes pass-drift-4 {\n          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }\n          50%      { transform: translate(-18vw, -14vw) scale(1.2); opacity: 0.95; }\n        }\n        @media (prefers-reduced-motion: reduce) {\n          .pass-bg-blob { animation: none !important; }\n        }\n      "
                }), (0, R.jsx)("div", {
                    "aria-hidden": "true",
                    className: "absolute inset-0 pointer-events-none opacity-[0.04]",
                    style: {
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                        backgroundSize: "64px 64px",
                        maskImage: "radial-gradient(ellipse 60% 50% at 50% 30%, black 0%, transparent 80%)",
                        WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 30%, black 0%, transparent 80%)"
                    }
                }), (0, R.jsx)("div", {
                    className: "absolute w-[900px] h-[900px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_65%)] top-[-360px] left-1/2 -translate-x-1/2 pointer-events-none"
                }), (0, R.jsx)("div", {
                    className: "relative z-10 w-full px-4 md:px-8",
                    children: (0, R.jsxs)("div", {
                        className: "max-w-[1400px] mx-auto",
                        children: [(0, R.jsxs)(i.h2, {
                            initial: {
                                opacity: 0,
                                y: 14
                            },
                            whileInView: {
                                opacity: 1,
                                y: 0
                            },
                            viewport: {
                                once: !0,
                                margin: "-80px"
                            },
                            transition: {
                                duration: .7,
                                ease: [.23, 1, .32, 1]
                            },
                            className: "font-display font-medium text-white leading-[1.02] tracking-[-0.035em] text-[clamp(2.6rem,7vw,5.25rem)] text-center mb-12 md:mb-16 lg:mb-20 max-w-[18ch] mx-auto",
                            style: {
                                textWrap: "balance"
                            },
                            children: ["Assine agora", (0, R.jsx)("br", {}), (0, R.jsx)("span", {
                                className: "text-white/40",
                                children: "Comece sua jornada"
                            })]
                        }), (0, R.jsxs)("div", {
                            className: "grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-stretch",
                            children: [(0, R.jsxs)("div", {
                                className: "grid grid-cols-2 gap-3 md:gap-4 auto-rows-fr order-2 lg:order-1",
                                children: [S.map((e, t) => (0, R.jsxs)(i.div, {
                                    initial: {
                                        opacity: 0,
                                        y: 14
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    viewport: {
                                        once: !0,
                                        margin: "-60px"
                                    },
                                    transition: {
                                        duration: .5,
                                        delay: .04 * Math.min(t, 6),
                                        ease: [.23, 1, .32, 1]
                                    },
                                    className: "relative rounded-2xl overflow-hidden p-3.5 md:p-6 flex flex-col md:flex-row items-start gap-2.5 md:gap-5 backdrop-blur-xl " + (e.wide ? "col-span-2" : "col-span-1"),
                                    style: {
                                        background: "rgba(255,255,255,0.03)",
                                        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.06)"
                                    },
                                    children: [(0, R.jsx)("div", {
                                        className: "w-9 h-9 md:w-11 md:h-11 shrink-0 rounded-lg md:rounded-xl flex items-center justify-center bg-white/[0.05] ring-1 ring-white/[0.06]",
                                        children: e.isAura ? (0, R.jsx)(A, {
                                            className: "w-4 h-4 md:w-[18px] md:h-[18px]"
                                        }) : (0, R.jsx)(e.icon, {
                                            className: "w-4 h-4 md:w-[18px] md:h-[18px] text-primary",
                                            strokeWidth: 1.75
                                        })
                                    }), (0, R.jsxs)("div", {
                                        className: "min-w-0 flex-1",
                                        children: [(0, R.jsx)("h3", {
                                            className: "font-display text-[14px] md:text-[22px] font-medium text-white tracking-[-0.02em] leading-[1.15] mb-1 md:mb-1.5",
                                            children: e.title
                                        }), (0, R.jsx)("p", {
                                            className: "font-body text-[11.5px] md:text-[13.5px] text-white/55 leading-[1.4] md:leading-[1.45]",
                                            children: e.desc
                                        })]
                                    })]
                                }, e.title)), (0, R.jsxs)("a", {
                                    href: "https://form.humanacademy.ai/academy",
                                    onClick: V,
                                    className: "group lg:hidden col-span-2 relative inline-flex items-center justify-center gap-2 w-full h-14 rounded-full font-display font-semibold text-[14px] tracking-[-0.005em] text-white whitespace-nowrap active:scale-[0.98] transition-all duration-200 mt-2 overflow-hidden",
                                    style: {
                                        background: "linear-gradient(160deg, hsla(215, 25%, 22%, 0.28), hsla(220, 25%, 10%, 0.36))",
                                        backdropFilter: "blur(40px) saturate(180%)",
                                        WebkitBackdropFilter: "blur(40px) saturate(180%)",
                                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), inset 0 0 0 1px rgba(255,255,255,0.1), inset 0 -1px 0 rgba(255,255,255,0.04), 0 12px 32px rgba(0,0,0,0.4)"
                                    },
                                    children: [(0, R.jsx)("span", {
                                        "aria-hidden": "true",
                                        className: "absolute inset-x-0 top-0 h-1/2 pointer-events-none",
                                        style: {
                                            background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)"
                                        }
                                    }), (0, R.jsxs)("span", {
                                        className: "relative z-[1] flex items-center gap-2",
                                        children: ["Assinar agora", (0, R.jsx)(g, {
                                            className: "w-[18px] h-[18px] transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                                            strokeWidth: 2.2
                                        })]
                                    })]
                                })]
                            }), (0, R.jsxs)(i.div, {
                                initial: {
                                    opacity: 0,
                                    y: 14
                                },
                                whileInView: {
                                    opacity: 1,
                                    y: 0
                                },
                                viewport: {
                                    once: !0,
                                    margin: "-60px"
                                },
                                transition: {
                                    duration: .6,
                                    delay: .1,
                                    ease: [.23, 1, .32, 1]
                                },
                                className: "relative rounded-3xl overflow-hidden flex flex-col order-1 lg:order-2 backdrop-blur-2xl liquid-glass-card liquid-glass-card--accent",
                                style: {
                                    background: "linear-gradient(160deg, hsla(215, 25%, 22%, 0.18), hsla(220, 25%, 10%, 0.24))",
                                    backdropFilter: "blur(24px) saturate(1.3)",
                                    WebkitBackdropFilter: "blur(24px) saturate(1.3)",
                                    animation: "card-glow 4s ease-in-out infinite"
                                },
                                children: [(0, R.jsxs)("div", {
                                    className: "relative aspect-[16/10] lg:aspect-[1.9/1] overflow-hidden bg-[#0E0E10]",
                                    children: [(0, R.jsx)("img", {
                                        src: "/banner.jpg",
                                        alt: "NurseHub Pass",
                                        className: "absolute inset-0 w-full h-full object-cover",
                                        draggable: !1
                                    }), (0, R.jsx)("div", {
                                        "aria-hidden": "true",
                                        className: "absolute inset-x-0 bottom-0 h-20 pointer-events-none",
                                        style: {
                                            background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)"
                                        }
                                    }), (0, R.jsxs)("div", {
                                        className: "absolute top-4 left-4 md:top-5 md:left-5 inline-flex items-center gap-1.5 h-10 md:h-11 px-4 md:px-5 rounded-full border border-white/30 text-white",
                                        style: {
                                            background: "rgba(255,255,255,0.06)",
                                            backdropFilter: "blur(10px)",
                                            WebkitBackdropFilter: "blur(10px)"
                                        },
                                        children: [(0, R.jsx)(d, {
                                            className: "w-3.5 h-3.5",
                                            strokeWidth: 2
                                        }), (0, R.jsx)("span", {
                                            className: "font-display font-medium text-[10.5px] md:text-[11.5px] tracking-[0.18em] uppercase leading-none",
                                            children: "Acesso total"
                                        })]
                                    }), (0, R.jsxs)("div", {
                                        className: "absolute top-4 right-4 md:top-5 md:right-5 inline-flex items-center gap-1.5 h-10 md:h-11 px-4 md:px-5 rounded-full border border-white/25 text-white",
                                        style: {
                                            background: "rgba(255,255,255,0.04)",
                                            backdropFilter: "blur(10px)",
                                            WebkitBackdropFilter: "blur(10px)"
                                        },
                                        children: [(0, R.jsx)("span", {
                                            className: "font-display font-bold text-[14px] md:text-[15px] tracking-[-0.005em] leading-none",
                                            children: "20%"
                                        }), (0, R.jsx)("span", {
                                            className: "font-display font-medium text-[10px] md:text-[11px] tracking-[0.18em] uppercase leading-none text-white/75",
                                            children: "off"
                                        })]
                                    }), (0, R.jsxs)("div", {
                                        className: "absolute bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 font-body text-[11px] md:text-[12px] tracking-[0.18em] uppercase text-white/90",
                                        children: [(0, R.jsx)("span", {
                                            children: "1 ano de acesso"
                                        }), (0, R.jsx)(y, {
                                            className: "w-[13px] h-[13px] -rotate-12",
                                            strokeWidth: 1.75
                                        })]
                                    }), (0, R.jsx)("div", {
                                        "aria-hidden": "true",
                                        className: "absolute bottom-[14px] left-4 md:bottom-[18px] md:left-6 flex gap-[2px] opacity-60",
                                        children: Array.from({
                                            length: 7
                                        }).map((e, t) => (0, R.jsx)("span", {
                                            className: "block w-[2px] h-3 bg-white/50"
                                        }, t))
                                    }), (0, R.jsx)("div", {
                                        "aria-hidden": "true",
                                        className: "absolute bottom-[14px] right-4 md:bottom-[18px] md:right-6 flex gap-[2px] opacity-60",
                                        children: Array.from({
                                            length: 7
                                        }).map((e, t) => (0, R.jsx)("span", {
                                            className: "block w-[2px] h-3 bg-white/50"
                                        }, t))
                                    })]
                                }), (0, R.jsxs)("div", {
                                    className: "relative flex flex-col flex-1 px-6 md:px-8 lg:px-10 pt-8 md:pt-10 pb-8 md:pb-10",
                                    children: [(0, R.jsx)("p", {
                                        className: "text-center font-body text-white/40 line-through text-sm md:text-base",
                                        children: "R$ 3.600"
                                    }), (0, R.jsxs)("p", {
                                        className: "mt-3 md:mt-4 font-display font-bold text-white leading-none tracking-[-0.04em] text-center",
                                        children: [(0, R.jsx)("span", {
                                            className: "align-top text-base md:text-lg font-medium text-white/55 mr-1",
                                            children: "12x"
                                        }), (0, R.jsx)("span", {
                                            style: {
                                                background: "linear-gradient(180deg, #ffffff 0%, #a7b4c6 100%)",
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                                backgroundClip: "text"
                                            },
                                            className: "text-[clamp(2.2rem,5vw,3.5rem)]",
                                            children: "R$ 285,84"
                                        })]
                                    }), (0, R.jsx)("p", {
                                        className: "mt-3 md:mt-4 text-center font-body text-white/75 text-sm",
                                        children: "R$ 2.847   vista"
                                    }), (0, R.jsx)("div", {
                                        className: "mt-6 md:mt-7 flex flex-wrap items-center justify-center gap-1.5",
                                        children: ["Aura AI", "8 cursos", "+20.000 profissionais", "20+ ferramentas"].map(e => (0, R.jsx)("span", {
                                            className: "inline-flex items-center font-body text-[10.5px] md:text-[11px] tracking-[0.04em] text-white/75 bg-white/[0.04] border border-white/10 rounded-full px-2.5 py-1",
                                            children: e
                                        }, e))
                                    }), (0, R.jsx)("div", {
                                        className: "mt-7 md:mt-9"
                                    }), (0, R.jsxs)("a", {
                                        href: "https://form.humanacademy.ai/academy",
                                        onClick: V,
                                        className: "group relative mx-auto inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-7 sm:px-9 rounded-full font-display font-bold text-[14px] sm:text-[15px] tracking-[-0.005em] text-[hsl(0,0%,6%)] whitespace-nowrap bg-white active:scale-[0.97] transition-all duration-200",
                                        style: {
                                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6), 0 8px 24px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08), 0 0 32px rgba(255,255,255,0.18), 0 0 60px rgba(180,200,240,0.18)"
                                        },
                                        children: ["Assinar agora", (0, R.jsx)(g, {
                                            className: "w-[18px] h-[18px] transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                                            strokeWidth: 2.2
                                        })]
                                    }), (0, R.jsxs)("a", {
                                        href: "https://s.humanacademy.ai/wwsapassatendir",
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "group mt-4 mx-auto inline-flex items-center justify-center gap-1 font-body text-[12px] text-white/55 hover:text-white/90 transition-colors",
                                        children: ["Falar com o time", (0, R.jsx)("span", {
                                            "aria-hidden": "true",
                                            className: "text-[13px] transition-transform duration-200 group-hover:translate-x-0.5",
                                            children: "â€º"
                                        })]
                                    }), (0, R.jsxs)("div", {
                                        className: "mt-7 md:mt-8 flex items-center justify-center flex-wrap gap-x-3 md:gap-x-4 gap-y-2 opacity-75",
                                        children: [(0, R.jsxs)("div", {
                                            className: "flex items-center",
                                            "aria-label": "Mastercard",
                                            children: [(0, R.jsx)("span", {
                                                className: "w-4 h-4 rounded-full bg-[#eb001b]"
                                            }), (0, R.jsx)("span", {
                                                className: "w-4 h-4 rounded-full bg-[#f79e1b] -ml-1.5 mix-blend-screen"
                                            })]
                                        }), (0, R.jsx)("span", {
                                            className: "font-display font-black italic text-[13px] tracking-tight text-white/90",
                                            "aria-label": "Visa",
                                            children: "VISA"
                                        }), (0, R.jsx)("span", {
                                            className: "inline-flex items-center justify-center h-5 px-1.5 rounded-full bg-white/90 font-display font-black text-[10px] tracking-tight text-[hsl(220,25%,12%)]",
                                            "aria-label": "Elo",
                                            children: "elo"
                                        }), (0, R.jsx)("span", {
                                            className: "inline-flex items-center justify-center h-5 px-1.5 rounded-[3px] bg-[#2e77bc] font-display font-bold text-[9px] tracking-wide text-white",
                                            "aria-label": "American Express",
                                            children: "AMEX"
                                        }), (0, R.jsx)("span", {
                                            className: "inline-flex items-center justify-center h-5 px-1.5 rounded-full bg-white/10 ring-1 ring-white/20 font-display font-bold text-[8.5px] tracking-[0.12em] text-white/80",
                                            "aria-label": "Diners Club",
                                            children: "DINERS"
                                        }), (0, R.jsxs)("span", {
                                            className: "inline-flex items-center gap-0.5 text-[#e06b15]",
                                            "aria-label": "Hotmart",
                                            children: [(0, R.jsx)(o, {
                                                className: "w-3 h-3",
                                                strokeWidth: 2,
                                                fill: "currentColor"
                                            }), (0, R.jsx)("span", {
                                                className: "font-display font-bold text-[10px] tracking-tight",
                                                children: "hotmart"
                                            })]
                                        })]
                                    }), (0, R.jsx)("ul", {
                                        className: "mt-5 md:mt-6 flex flex-col items-center gap-2.5",
                                        children: ["7 dias de garantia", "Acesso imediato   plataforma"].map(e => (0, R.jsxs)("li", {
                                            className: "flex items-center gap-1.5 font-body text-[10.5px] md:text-[11px] tracking-[0.18em] uppercase text-white/55",
                                            children: [(0, R.jsx)(c, {
                                                className: "w-[14px] h-[14px] text-primary",
                                                strokeWidth: 1.75
                                            }), e]
                                        }, e))
                                    })]
                                })]
                            })]
                        }), (0, R.jsxs)(i.div, {
                            initial: {
                                opacity: 0,
                                y: 14
                            },
                            whileInView: {
                                opacity: 1,
                                y: 0
                            },
                            viewport: {
                                once: !0,
                                margin: "-80px"
                            },
                            transition: {
                                duration: .6,
                                ease: [.23, 1, .32, 1]
                            },
                            className: "mt-20 md:mt-28 max-w-[940px] mx-auto",
                            children: [(0, R.jsxs)("div", {
                                className: "text-center mb-7 md:mb-9",
                                children: [(0, R.jsxs)("h3", {
                                    className: "font-display font-medium text-white leading-[1.05] tracking-[-0.025em] text-[clamp(1.7rem,4vw,2.8rem)] max-w-[20ch] mx-auto",
                                    children: ["Quer dar os primeiros passos?", (0, R.jsx)("br", {}), (0, R.jsx)("span", {
                                        className: "text-white/40",
                                        children: "Tem o Starter."
                                    })]
                                }), (0, R.jsx)("p", {
                                    className: "mt-4 max-w-[52ch] mx-auto font-body text-white/55 text-[14px] md:text-[15px] leading-[1.55]",
                                    children: "Um caminho direto para sair do zero, entender o workflow e criar suas primeiras peças com IA."
                                })]
                            }), (0, R.jsxs)("div", {
                                className: "relative rounded-3xl overflow-hidden backdrop-blur-xl",
                                style: {
                                    background: "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
                                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.08), 0 18px 50px -20px rgba(0,0,0,0.5)"
                                },
                                children: [(0, R.jsxs)("div", {
                                    className: "relative aspect-[21/9] sm:aspect-[24/9] overflow-hidden bg-[#0a1217]",
                                    children: [(0, R.jsx)("video", {
                                        autoPlay: !0,
                                        loop: !0,
                                        muted: !0,
                                        playsInline: !0,
                                        className: "absolute inset-0 w-full h-full object-cover",
                                        children: (0, R.jsx)("source", {
                                            src: "/starter/hero2.mp4",
                                            type: "video/mp4"
                                        })
                                    }), (0, R.jsx)("div", {
                                        "aria-hidden": "true",
                                        className: "absolute inset-0 pointer-events-none",
                                        style: {
                                            background: "linear-gradient(180deg, rgba(8,16,22,0.25) 0%, rgba(8,16,22,0.05) 35%, rgba(8,16,22,0.7) 100%)"
                                        }
                                    }), (0, R.jsx)("div", {
                                        className: "absolute bottom-4 left-4 md:bottom-5 md:left-6 flex items-center gap-2.5",
                                        children: (0, R.jsx)("img", {
                                            src: "/starter/starter-logo.svg",
                                            alt: "Starter",
                                            className: "h-6 md:h-7 w-auto opacity-95",
                                            draggable: !1
                                        })
                                    })]
                                }), (0, R.jsxs)("div", {
                                    className: "grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-7 md:gap-10 p-6 md:p-9",
                                    children: [(0, R.jsxs)("div", {
                                        className: "flex flex-col",
                                        children: [(0, R.jsx)("div", {
                                            className: "font-body text-[10px] tracking-[0.22em] uppercase text-white/45 mb-3",
                                            children: "O que tem dentro"
                                        }), (0, R.jsx)("ul", {
                                            className: "space-y-2.5 flex-1",
                                            children: W.map(e => (0, R.jsxs)("li", {
                                                className: "grid grid-cols-[16px_1fr] gap-2.5 items-start font-body text-[13.5px] md:text-[14px] text-white/75 leading-[1.5]",
                                                children: [(0, R.jsx)(w, {
                                                    className: "w-3.5 h-3.5 mt-0.5 text-white/55",
                                                    strokeWidth: 2
                                                }), (0, R.jsx)("span", {
                                                    children: e
                                                })]
                                            }, e))
                                        })]
                                    }), (0, R.jsxs)("div", {
                                        className: "flex flex-col items-start md:items-center md:text-center md:border-l md:border-white/[0.08] md:pl-10",
                                        children: [(0, R.jsx)("p", {
                                            className: "font-body text-white/40 line-through text-[13px]",
                                            children: "R$ 899,90"
                                        }), (0, R.jsxs)("p", {
                                            className: "mt-2 font-display font-bold text-white leading-none tracking-[-0.03em]",
                                            children: [(0, R.jsx)("span", {
                                                className: "align-top text-[15px] font-medium text-white/55 mr-1",
                                                children: "12x"
                                            }), (0, R.jsx)("span", {
                                                style: {
                                                    background: "linear-gradient(180deg, #ffffff 0%, #a7b4c6 100%)",
                                                    WebkitBackgroundClip: "text",
                                                    WebkitTextFillColor: "transparent",
                                                    backgroundClip: "text"
                                                },
                                                className: "text-[clamp(1.8rem,4vw,2.6rem)]",
                                                children: "R$ 48,42"
                                            })]
                                        }), (0, R.jsx)("p", {
                                            className: "mt-3 font-body text-white/65 text-[12.5px]",
                                            children: "R$ 497   vista"
                                        }), (0, R.jsxs)("div", {
                                            className: "mt-6 flex flex-col gap-2.5 w-full md:w-auto",
                                            children: [(0, R.jsxs)("a", {
                                                href: L,
                                                onClick: _,
                                                className: "group inline-flex items-center justify-center gap-2 h-11 md:h-12 px-6 md:px-7 rounded-full font-display font-semibold text-[13px] md:text-[14px] tracking-[-0.005em] text-[hsl(0,0%,6%)] bg-white hover:bg-white/95 transition-colors active:scale-[0.97]",
                                                style: {
                                                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6), 0 6px 18px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)"
                                                },
                                                children: ["Comprar agora", (0, R.jsx)(g, {
                                                    className: "w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                                                    strokeWidth: 2
                                                })]
                                            }), (0, R.jsx)(s, {
                                                to: "/starter",
                                                className: "group inline-flex items-center justify-center gap-2 h-11 md:h-12 px-6 md:px-7 rounded-full font-display font-medium text-[13px] md:text-[14px] tracking-[-0.005em] text-white/85 hover:text-white border border-white/20 hover:border-white/35 bg-white/[0.03] hover:bg-white/[0.06] transition-colors",
                                                children: "Conhecer o Starter"
                                            })]
                                        })]
                                    })]
                                }), (0, R.jsxs)("div", {
                                    className: "border-t border-white/[0.06] px-6 md:px-9 py-3.5 md:py-4 bg-white/[0.015] flex items-center justify-center gap-2 text-center",
                                    children: [(0, R.jsx)("span", {
                                        className: "font-body text-[11.5px] md:text-[12px] text-white/55 leading-[1.4]",
                                        children: "Quando quiser ir mais fundo, faz upgrade pro"
                                    }), (0, R.jsx)("a", {
                                        href: "#pass",
                                        className: "font-body text-[11.5px] md:text-[12px] text-white/85 hover:text-white underline underline-offset-2 decoration-white/30 hover:decoration-white/70 transition-colors",
                                        children: "NurseHub Pass"
                                    })]
                                })]
                            })]
                        }), (0, R.jsxs)(i.div, {
                            initial: {
                                opacity: 0,
                                y: 14
                            },
                            whileInView: {
                                opacity: 1,
                                y: 0
                            },
                            viewport: {
                                once: !0,
                                margin: "-80px"
                            },
                            transition: {
                                duration: .6,
                                ease: [.23, 1, .32, 1]
                            },
                            className: "mt-20 md:mt-28 max-w-[1000px] mx-auto",
                            children: [(0, R.jsxs)("div", {
                                className: "text-center mb-7 md:mb-10",
                                children: [(0, R.jsx)("span", {
                                    className: "font-body text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-white/45",
                                    children: "Comparativo"
                                }), (0, R.jsx)("h3", {
                                    className: "mt-3 font-display font-medium text-white leading-[1.05] tracking-[-0.025em] text-[clamp(1.6rem,3.6vw,2.4rem)]",
                                    children: "O que tem em cada um."
                                })]
                            }), (0, R.jsxs)("div", {
                                className: "rounded-2xl overflow-hidden backdrop-blur-xl",
                                style: {
                                    background: "rgba(255,255,255,0.025)",
                                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.05)"
                                },
                                children: [(0, R.jsxs)("div", {
                                    className: "grid grid-cols-[1.4fr_1fr_1fr] gap-4 px-5 md:px-7 py-4 md:py-5 border-b border-white/[0.07] items-end",
                                    children: [(0, R.jsx)("span", {
                                        className: "font-body text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-white/40",
                                        children: "Recurso"
                                    }), (0, R.jsxs)("div", {
                                        className: "text-center",
                                        children: [(0, R.jsx)("div", {
                                            className: "font-body text-[9.5px] tracking-[0.22em] uppercase text-white/40",
                                            children: "Starter"
                                        }), (0, R.jsx)("div", {
                                            className: "mt-1 font-display font-medium text-white text-[14px] md:text-[16px]",
                                            children: "R$ 497"
                                        })]
                                    }), (0, R.jsxs)("div", {
                                        className: "text-center",
                                        children: [(0, R.jsx)("div", {
                                            className: "font-body text-[9.5px] tracking-[0.22em] uppercase text-white/55",
                                            children: "NurseHub Pass"
                                        }), (0, R.jsx)("div", {
                                            className: "mt-1 font-display font-medium text-white text-[14px] md:text-[16px]",
                                            children: "R$ 2.847"
                                        })]
                                    })]
                                }), P.map((e, t) => (0, R.jsxs)("div", {
                                    className: "grid grid-cols-[1.4fr_1fr_1fr] gap-4 px-5 md:px-7 py-3.5 md:py-4 items-center " + (0 !== t ? "border-t border-white/[0.05]" : ""),
                                    children: [(0, R.jsx)("span", {
                                        className: "font-body text-[12.5px] md:text-[13.5px] text-white/75 leading-[1.4]",
                                        children: e.label
                                    }), (0, R.jsx)("span", {
                                        className: "text-center text-[12px] md:text-[13px] font-body text-white/65 leading-[1.4]",
                                        children: "boolean" == typeof e.starter ? e.starter ? (0, R.jsx)(w, {
                                            className: "inline w-4 h-4 text-white/85",
                                            strokeWidth: 2.2
                                        }) : (0, R.jsx)(b, {
                                            className: "inline w-3.5 h-3.5 text-white/25",
                                            strokeWidth: 2
                                        }) : e.starter
                                    }), (0, R.jsx)("span", {
                                        className: "text-center text-[12px] md:text-[13px] font-body text-white/85 leading-[1.4]",
                                        children: "boolean" == typeof e.pass ? e.pass ? (0, R.jsx)(w, {
                                            className: "inline w-4 h-4 text-white",
                                            strokeWidth: 2.2
                                        }) : (0, R.jsx)(b, {
                                            className: "inline w-3.5 h-3.5 text-white/25",
                                            strokeWidth: 2
                                        }) : e.pass
                                    })]
                                }, e.label))]
                            })]
                        })]
                    })
                })]
            })]
        })
    };
export {
    z as
    default
};