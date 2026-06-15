import {
    a as e
} from "./rolldown-runtime-C_ttsnZz.js";
import {
    C as a,
    w as t
} from "./query-BYnN4WbX.js";
import {
    o as s,
    s as o
} from "./ui-BxzeyedK.js";
import {
    F as n,
    Q as r,
    X as i,
    _ as l,
    b as d,
    bt as c,
    d as h,
    f as m,
    fn as p,
    h as u,
    l as x,
    m as b,
    nn as w,
    o as f,
    p as g,
    t as j,
    tn as y,
    u as N,
    v,
    y as k
} from "./index-W86zpBsQ.js";
var C = e(t(), 1),
    _ = a(),
    S = [.22, 1, .36, 1],
    P = [{
        code: "BR",
        name: "Brasil",
        dial: "+55"
    }, {
        code: "PT",
        name: "Portugal",
        dial: "+351"
    }, {
        code: "US",
        name: "Estados Unidos",
        dial: "+1"
    }, {
        code: "AR",
        name: "Argentina",
        dial: "+54"
    }, {
        code: "CL",
        name: "Chile",
        dial: "+56"
    }, {
        code: "CO",
        name: "Colômbia",
        dial: "+57"
    }, {
        code: "MX",
        name: "México",
        dial: "+52"
    }, {
        code: "PE",
        name: "Peru",
        dial: "+51"
    }, {
        code: "UY",
        name: "Uruguai",
        dial: "+598"
    }, {
        code: "PY",
        name: "Paraguai",
        dial: "+595"
    }, {
        code: "VE",
        name: "Venezuela",
        dial: "+58"
    }, {
        code: "EC",
        name: "Equador",
        dial: "+593"
    }, {
        code: "BO",
        name: "Bolívia",
        dial: "+591"
    }, {
        code: "GB",
        name: "Reino Unido",
        dial: "+44"
    }, {
        code: "IE",
        name: "Irlanda",
        dial: "+353"
    }, {
        code: "DE",
        name: "Alemanha",
        dial: "+49"
    }, {
        code: "FR",
        name: "França",
        dial: "+33"
    }, {
        code: "ES",
        name: "Espanha",
        dial: "+34"
    }, {
        code: "IT",
        name: "Itália",
        dial: "+39"
    }, {
        code: "NL",
        name: "Holanda",
        dial: "+31"
    }, {
        code: "BE",
        name: "Bélgica",
        dial: "+32"
    }, {
        code: "CH",
        name: "Suíça",
        dial: "+41"
    }, {
        code: "AT",
        name: "Áustria",
        dial: "+43"
    }, {
        code: "SE",
        name: "Suécia",
        dial: "+46"
    }, {
        code: "NO",
        name: "Noruega",
        dial: "+47"
    }, {
        code: "DK",
        name: "Dinamarca",
        dial: "+45"
    }, {
        code: "FI",
        name: "Finlândia",
        dial: "+358"
    }, {
        code: "PL",
        name: "Polônia",
        dial: "+48"
    }, {
        code: "CA",
        name: "Canadá",
        dial: "+1"
    }, {
        code: "AU",
        name: "Austrália",
        dial: "+61"
    }, {
        code: "NZ",
        name: "Nova Zelândia",
        dial: "+64"
    }, {
        code: "JP",
        name: "Japão",
        dial: "+81"
    }, {
        code: "KR",
        name: "Coreia do Sul",
        dial: "+82"
    }, {
        code: "CN",
        name: "China",
        dial: "+86"
    }, {
        code: "IN",
        name: "Índia",
        dial: "+91"
    }, {
        code: "AE",
        name: "Emirados Árabes",
        dial: "+971"
    }, {
        code: "IL",
        name: "Israel",
        dial: "+972"
    }, {
        code: "ZA",
        name: "África do Sul",
        dial: "+27"
    }],
    E = e => e.toUpperCase().split("").map(e => String.fromCodePoint(127462 + e.charCodeAt(0) - 65)).join(""),
    I = ({
        value: e,
        onChange: a
    }) => {
        const [t, s] = C.useState(!1), [o, n] = C.useState(""), i = C.useMemo(() => {
            const e = o.trim().toLowerCase();
            return e ? P.filter(a => a.name.toLowerCase().includes(e) || a.dial.includes(e) || a.code.toLowerCase().includes(e)) : P
        }, [o]);
        return (0, _.jsxs)(m, {
            open: t,
            onOpenChange: s,
            children: [(0, _.jsx)(g, {
                asChild: !0,
                children: (0, _.jsxs)("button", {
                    type: "button",
                    className: "shrink-0 inline-flex items-center gap-2 h-12 pl-3.5 pr-2.5 rounded-l-full border border-r-0 border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/25 transition-colors",
                    "aria-label": "Selecionar país",
                    children: [(0, _.jsx)("span", {
                        className: "text-[18px] leading-none",
                        "aria-hidden": !0,
                        children: E(e.code)
                    }), (0, _.jsx)("span", {
                        className: "font-body text-[13px] text-white/80 tabular-nums",
                        children: e.dial
                    }), (0, _.jsx)(y, {
                        className: "w-3 h-3 text-white/45",
                        strokeWidth: 2
                    })]
                })
            }), (0, _.jsx)(h, {
                children: (0, _.jsxs)(N, {
                    align: "start",
                    sideOffset: 6,
                    className: "z-[80] w-[280px] rounded-2xl border border-white/[0.1] bg-[#0a1217] shadow-[0_24px_60px_rgba(0,0,0,0.6)] overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                    children: [(0, _.jsx)("div", {
                        className: "p-2 border-b border-white/[0.08]",
                        children: (0, _.jsxs)("div", {
                            className: "relative",
                            children: [(0, _.jsx)(r, {
                                className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/35",
                                strokeWidth: 2
                            }), (0, _.jsx)("input", {
                                autoFocus: !0,
                                value: o,
                                onChange: e => n(e.target.value),
                                placeholder: "Buscar país",
                                className: "w-full h-9 pl-9 pr-3 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 font-body text-[13px] outline-none focus:border-white/25 transition-colors"
                            })]
                        })
                    }), (0, _.jsxs)("div", {
                        className: "max-h-[260px] overflow-y-auto p-1",
                        children: [0 === i.length && (0, _.jsx)("div", {
                            className: "px-3 py-6 text-center font-body text-[12px] text-white/35",
                            children: "Nada encontrado"
                        }), i.map(t => {
                            const o = t.code === e.code;
                            return (0, _.jsxs)("button", {
                                type: "button",
                                onClick: () => {
                                    a(t), s(!1), n("")
                                },
                                className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-white/[0.05] transition-colors " + (o ? "bg-white/[0.04]" : ""),
                                children: [(0, _.jsx)("span", {
                                    className: "text-[18px] leading-none",
                                    "aria-hidden": !0,
                                    children: E(t.code)
                                }), (0, _.jsx)("span", {
                                    className: "flex-1 min-w-0 font-body text-[13.5px] text-white/85 truncate",
                                    children: t.name
                                }), (0, _.jsx)("span", {
                                    className: "font-body text-[12px] text-white/45 tabular-nums",
                                    children: t.dial
                                }), o && (0, _.jsx)(w, {
                                    className: "w-3.5 h-3.5 text-[hsl(186_70%_70%)]",
                                    strokeWidth: 2.4
                                })]
                            }, t.code)
                        })]
                    })]
                })
            })]
        })
    },
    A = e => e.replace(/\D+/g, ""),
    F = ({
        open: e,
        onOpenChange: a,
        checkoutUrl: t
    }) => {
        const [r, h] = C.useState(P[0]), [m, w] = C.useState(""), [g, y] = C.useState(""), [N, E] = C.useState(""), [F, L] = C.useState(!1), [z, B] = C.useState(!1), [U, O] = C.useState(null), R = () => {
            w(""), y(""), E(""), h(P[0]), O(null), L(!1), B(!1)
        }, D = e => {
            e || z || setTimeout(R, 200), a(e)
        };
        return (0, _.jsx)(k, {
            open: e,
            onOpenChange: D,
            children: (0, _.jsxs)(v, {
                children: [(0, _.jsx)(l, {
                    className: "fixed inset-0 z-[70] bg-black/85 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                }), (0, _.jsx)(u, {
                    "aria-describedby": void 0,
                    onClick: e => {
                        e.target !== e.currentTarget || z || D(!1)
                    },
                    className: "fixed inset-0 z-[70] overflow-y-auto flex items-center justify-center p-4 sm:p-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 focus:outline-none",
                    children: (0, _.jsxs)("div", {
                        className: "relative w-full sm:max-w-[460px] mx-auto text-white rounded-3xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.7)] border border-white/[0.1]",
                        style: {
                            background: "radial-gradient(ellipse at top, #14242f 0%, #0a1217 60%, #060a0e 100%)"
                        },
                        children: [(0, _.jsxs)("div", {
                            className: "flex items-center justify-between px-6 py-4 border-b border-white/[0.06]",
                            children: [(0, _.jsx)("span", {
                                className: "font-body text-[10px] tracking-[0.22em] uppercase text-white/45",
                                children: "Pré-checkout · Starter"
                            }), (0, _.jsx)(b, {
                                className: "w-9 h-9 rounded-full border border-white/15 bg-white/[0.04] text-white/80 hover:text-white hover:bg-white/[0.08] flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
                                "aria-label": "Fechar",
                                disabled: z,
                                children: (0, _.jsx)(n, {
                                    className: "w-3.5 h-3.5",
                                    strokeWidth: 2
                                })
                            })]
                        }), (0, _.jsx)(o, {
                            mode: "wait",
                            initial: !1,
                            children: z ? (0, _.jsxs)(s.div, {
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                transition: {
                                    duration: .3,
                                    ease: S
                                },
                                className: "p-10 sm:p-12 flex flex-col items-center text-center",
                                children: [(0, _.jsxs)("div", {
                                    "aria-hidden": !0,
                                    className: "relative w-14 h-14 rounded-full border border-[hsl(186_70%_60%)]/40 bg-[hsl(186_75%_55%)]/15 flex items-center justify-center",
                                    children: [(0, _.jsx)("span", {
                                        className: "absolute inset-0 rounded-full",
                                        style: {
                                            boxShadow: "0 0 0 0 hsla(186, 70%, 60%, 0.5)",
                                            animation: "precheckout-pulse 1.6s ease-out infinite"
                                        }
                                    }), (0, _.jsx)(s.span, {
                                        className: "block w-5 h-5 rounded-full border-2 border-[hsl(186_70%_75%)] border-t-transparent",
                                        animate: {
                                            rotate: 360
                                        },
                                        transition: {
                                            duration: .9,
                                            repeat: 1 / 0,
                                            ease: "linear"
                                        }
                                    })]
                                }), (0, _.jsxs)("h2", {
                                    className: "mt-6 font-display font-light text-white leading-[1.05] tracking-[-0.025em] text-[clamp(1.4rem,3vw,1.85rem)] max-w-[20ch]",
                                    children: ["Redirecionando pro checkout", (0, _.jsx)("span", {
                                        className: "text-[hsl(186_70%_70%)]",
                                        children: "."
                                    })]
                                }), (0, _.jsx)("p", {
                                    className: "mt-3 font-body text-white/55 text-[13.5px] leading-[1.6] max-w-[38ch]",
                                    children: "Em segundos você vai estar na página de pagamento com tudo pronto."
                                }), (0, _.jsx)("style", {
                                    children: "\n                    @keyframes precheckout-pulse {\n                      0% { box-shadow: 0 0 0 0 hsla(186, 70%, 60%, 0.45); }\n                      70% { box-shadow: 0 0 0 14px hsla(186, 70%, 60%, 0); }\n                      100% { box-shadow: 0 0 0 0 hsla(186, 70%, 60%, 0); }\n                    }\n                  "
                                })]
                            }, "redirecting") : (0, _.jsxs)(s.form, {
                                onSubmit: async e => {
                                    if (e.preventDefault(), !m.trim() || !g.trim() || !N.trim() || F || z) return;
                                    L(!0), O(null);
                                    const a = m.trim(),
                                        s = a.split(/\s+/),
                                        o = s[0],
                                        n = s.length > 1 ? s.slice(1).join(" ") : "",
                                        i = g.trim(),
                                        l = N.trim();
                                    (await x({
                                        source: "starter-precheckout",
                                        email: i,
                                        firstName: o,
                                        lastName: n,
                                        phone: `+${A(r.dial)}${A(l)}`,
                                        fields: {
                                            country: r.code,
                                            product: "Starter",
                                            submittedAt: (new Date).toISOString()
                                        },
                                        tags: ["Starter - Interesse"]
                                    })).ok, L(!1), B(!0), await f([{
                                        name: "Lead",
                                        payload: {
                                            contentName: "Starter - Interesse",
                                            contentCategory: "precheckout_interest",
                                            source: "starter-precheckout",
                                            product: "Starter",
                                            status: "submitted"
                                        }
                                    }, {
                                        name: "InitiateCheckout",
                                        payload: {
                                            contentName: "Starter",
                                            contentCategory: "checkout",
                                            source: "starter-precheckout",
                                            product: "Starter",
                                            value: 497,
                                            currency: "BRL"
                                        }
                                    }]);
                                    const d = ((e, a, t, s, o) => {
                                        const n = j(e);
                                        try {
                                            const e = new URL(n),
                                                r = `+${A(a.dial)}${A(o)}`;
                                            return e.searchParams.has("name") || e.searchParams.set("name", t), e.searchParams.has("email") || e.searchParams.set("email", s), e.searchParams.has("phonenumber") || e.searchParams.set("phonenumber", r), e.toString()
                                        } catch {
                                            return n
                                        }
                                    })(t, r, a, i, l);
                                    window.location.href = d
                                },
                                className: "p-6 sm:p-8",
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                exit: {
                                    opacity: 0,
                                    y: -8,
                                    transition: {
                                        duration: .22,
                                        ease: S
                                    }
                                },
                                transition: {
                                    duration: .3,
                                    ease: S
                                },
                                children: [(0, _.jsx)(d, {
                                    asChild: !0,
                                    children: (0, _.jsxs)("h2", {
                                        className: "font-display font-light text-white leading-[1.05] tracking-[-0.025em] text-[clamp(1.5rem,3.4vw,2rem)] max-w-[18ch]",
                                        children: ["Garantir minha vaga", (0, _.jsx)("span", {
                                            className: "text-[hsl(186_70%_70%)]",
                                            children: "."
                                        })]
                                    })
                                }), (0, _.jsx)("p", {
                                    className: "mt-3 font-body text-white/55 text-[14px] leading-[1.55] max-w-[44ch]",
                                    children: "Deixa seus dados aqui, a gente já te leva pro checkout com tudo preenchido."
                                }), (0, _.jsxs)("div", {
                                    className: "mt-7 space-y-3.5",
                                    children: [(0, _.jsxs)("div", {
                                        children: [(0, _.jsx)("label", {
                                            htmlFor: "precheckout-name",
                                            className: "block font-body text-[10px] tracking-[0.22em] uppercase text-white/45 mb-2",
                                            children: "Nome"
                                        }), (0, _.jsx)("input", {
                                            id: "precheckout-name",
                                            type: "text",
                                            required: !0,
                                            autoComplete: "name",
                                            value: m,
                                            onChange: e => w(e.target.value),
                                            placeholder: "Seu nome completo",
                                            className: "w-full h-12 px-4 rounded-full bg-white/[0.04] border border-white/15 text-white placeholder:text-white/30 font-body text-[14px] outline-none focus:border-white/40 transition-colors"
                                        })]
                                    }), (0, _.jsxs)("div", {
                                        children: [(0, _.jsx)("label", {
                                            htmlFor: "precheckout-email",
                                            className: "block font-body text-[10px] tracking-[0.22em] uppercase text-white/45 mb-2",
                                            children: "E-mail"
                                        }), (0, _.jsx)("input", {
                                            id: "precheckout-email",
                                            type: "email",
                                            required: !0,
                                            autoComplete: "email",
                                            value: g,
                                            onChange: e => y(e.target.value),
                                            placeholder: "seu@email.com",
                                            className: "w-full h-12 px-4 rounded-full bg-white/[0.04] border border-white/15 text-white placeholder:text-white/30 font-body text-[14px] outline-none focus:border-white/40 transition-colors"
                                        })]
                                    }), (0, _.jsxs)("div", {
                                        children: [(0, _.jsx)("label", {
                                            htmlFor: "precheckout-phone",
                                            className: "block font-body text-[10px] tracking-[0.22em] uppercase text-white/45 mb-2",
                                            children: "Telefone"
                                        }), (0, _.jsxs)("div", {
                                            className: "flex items-stretch",
                                            children: [(0, _.jsx)(I, {
                                                value: r,
                                                onChange: h
                                            }), (0, _.jsx)("input", {
                                                id: "precheckout-phone",
                                                type: "tel",
                                                required: !0,
                                                autoComplete: "tel-national",
                                                inputMode: "tel",
                                                value: N,
                                                onChange: e => E(e.target.value),
                                                placeholder: "(11) 90000-0000",
                                                className: "flex-1 min-w-0 h-12 px-4 rounded-r-full bg-white/[0.04] border border-white/15 text-white placeholder:text-white/30 font-body text-[14px] outline-none focus:border-white/40 transition-colors"
                                            })]
                                        })]
                                    })]
                                }), U && (0, _.jsx)("p", {
                                    role: "alert",
                                    className: "mt-5 font-body text-[12px] leading-[1.55] text-[hsl(0_70%_75%)] bg-[hsl(0_60%_40%)]/10 border border-[hsl(0_60%_50%)]/30 rounded-2xl px-4 py-3",
                                    children: U
                                }), (0, _.jsxs)("button", {
                                    type: "submit",
                                    disabled: F,
                                    className: "group mt-7 w-full inline-flex items-center justify-between gap-3 h-13 px-6 py-4 rounded-full transition-all bg-[hsl(186_75%_55%)] text-white hover:bg-[hsl(186_75%_48%)] shadow-[0_14px_40px_-10px_hsla(186,75%,50%,0.55)] hover:shadow-[0_18px_48px_-10px_hsla(186,75%,55%,0.7)] disabled:opacity-60 disabled:cursor-not-allowed",
                                    children: [(0, _.jsx)("span", {
                                        className: "font-body font-semibold text-[12px] tracking-[0.22em] uppercase",
                                        children: F ? "Enviando…" : "Ir pro checkout"
                                    }), (0, _.jsx)("span", {
                                        className: "inline-flex items-center justify-center w-7 h-7 rounded-full border border-white/30 bg-white/[0.08] group-hover:border-white/55 transition-all",
                                        children: (0, _.jsx)(p, {
                                            className: "w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                                            strokeWidth: 2
                                        })
                                    })]
                                }), (0, _.jsxs)("div", {
                                    className: "mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-[10.5px] tracking-[0.18em] uppercase text-white/40",
                                    children: [(0, _.jsxs)("span", {
                                        className: "inline-flex items-center gap-1.5",
                                        children: [(0, _.jsx)(c, {
                                            className: "w-3 h-3",
                                            strokeWidth: 1.8
                                        }), "Compra segura"]
                                    }), (0, _.jsxs)("span", {
                                        className: "inline-flex items-center gap-1.5",
                                        children: [(0, _.jsx)(i, {
                                            className: "w-3 h-3",
                                            strokeWidth: 1.8
                                        }), "Garantia 7 dias"]
                                    })]
                                }), (0, _.jsx)("p", {
                                    className: "mt-4 font-body text-[11px] leading-[1.55] text-white/35",
                                    children: "Seus dados ficam só com a Human pra organizar seu acesso."
                                })]
                            }, "form")
                        })]
                    })
                })]
            })
        })
    };
export {
    F as t
};