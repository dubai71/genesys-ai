import {
    a as e
} from "./rolldown-runtime-C_ttsnZz.js";
import {
    C as a,
    w as s
} from "./query-BYnN4WbX.js";
import {
    o,
    s as r
} from "./ui-BxzeyedK.js";
import {
    n as i,
    t as n
} from "./dist-BpxoO9O6.js";
import {
    i as t
} from "./dist-DkmQ2f8N.js";
import {
    a as d,
    n as l,
    r as c,
    t as m
} from "./dist-HsHFUleU.js";
import {
    t as p
} from "./dist-CWjR5XLY.js";
import {
    $t as u,
    C as f,
    en as v,
    j as b,
    tn as h,
    xn as x
} from "./index-W86zpBsQ.js";
import {
    t as g
} from "./dist-C-5kN4J5.js";
var j = e(s(), 1),
    y = a(),
    w = "Collapsible",
    [A, q] = d(w),
    [N, _] = A(w),
    k = j.forwardRef((e, a) => {
        const {
            __scopeCollapsible: s,
            open: o,
            defaultOpen: r,
            disabled: i,
            onOpenChange: n,
            ...t
        } = e, [d, c] = l({
            prop: o,
            defaultProp: r ?? !1,
            onChange: n,
            caller: w
        });
        return (0, y.jsx)(N, {
            scope: s,
            disabled: i,
            contentId: m(),
            open: d,
            onOpenToggle: j.useCallback(() => c(e => !e), [c]),
            children: (0, y.jsx)(p.div, {
                "data-state": P(d),
                "data-disabled": i ? "" : void 0,
                ...t,
                ref: a
            })
        })
    });
k.displayName = w;
var C = "CollapsibleTrigger",
    E = j.forwardRef((e, a) => {
        const {
            __scopeCollapsible: s,
            ...o
        } = e, r = _(C, s);
        return (0, y.jsx)(p.button, {
            type: "button",
            "aria-controls": r.contentId,
            "aria-expanded": r.open || !1,
            "data-state": P(r.open),
            "data-disabled": r.disabled ? "" : void 0,
            disabled: r.disabled,
            ...o,
            ref: a,
            onClick: i(e.onClick, r.onOpenToggle)
        })
    });
E.displayName = C;
var R = "CollapsibleContent",
    I = j.forwardRef((e, a) => {
        const {
            forceMount: s,
            ...o
        } = e, r = _(R, e.__scopeCollapsible);
        return (0, y.jsx)(n, {
            present: s || r.open,
            children: ({
                present: e
            }) => (0, y.jsx)(O, { ...o,
                ref: a,
                present: e
            })
        })
    });
I.displayName = R;
var O = j.forwardRef((e, a) => {
    const {
        __scopeCollapsible: s,
        present: o,
        children: r,
        ...i
    } = e, n = _(R, s), [d, l] = j.useState(o), m = j.useRef(null), u = t(a, m), f = j.useRef(0), v = f.current, b = j.useRef(0), h = b.current, x = n.open || d, g = j.useRef(x), w = j.useRef(void 0);
    return j.useEffect(() => {
        const e = requestAnimationFrame(() => g.current = !1);
        return () => cancelAnimationFrame(e)
    }, []), c(() => {
        const e = m.current;
        if (e) {
            w.current = w.current || {
                transitionDuration: e.style.transitionDuration,
                animationName: e.style.animationName
            }, e.style.transitionDuration = "0s", e.style.animationName = "none";
            const a = e.getBoundingClientRect();
            f.current = a.height, b.current = a.width, g.current || (e.style.transitionDuration = w.current.transitionDuration, e.style.animationName = w.current.animationName), l(o)
        }
    }, [n.open, o]), (0, y.jsx)(p.div, {
        "data-state": P(n.open),
        "data-disabled": n.disabled ? "" : void 0,
        id: n.contentId,
        hidden: !x,
        ...i,
        ref: u,
        style: {
            "--radix-collapsible-content-height": v ? `${v}px` : void 0,
            "--radix-collapsible-content-width": h ? `${h}px` : void 0,
            ...e.style
        },
        children: x && r
    })
});

function P(e) {
    return e ? "open" : "closed"
}
var z = k,
    S = E,
    D = I,
    H = "Accordion",
    V = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"],
    [T, L, M] = x(H),
    [$, F] = d(H, [M, q]),
    Q = q(),
    K = j.forwardRef((e, a) => {
        const {
            type: s,
            ...o
        } = e, r = o, i = o;
        return (0, y.jsx)(T.Provider, {
            scope: e.__scopeAccordion,
            children: "multiple" === s ? (0, y.jsx)(J, { ...i,
                ref: a
            }) : (0, y.jsx)(G, { ...r,
                ref: a
            })
        })
    });
K.displayName = H;
var [U, B] = $(H), [X, Y] = $(H, {
    collapsible: !1
}), G = j.forwardRef((e, a) => {
    const {
        value: s,
        defaultValue: o,
        onValueChange: r = () => {},
        collapsible: i = !1,
        ...n
    } = e, [t, d] = l({
        prop: s,
        defaultProp: o ?? "",
        onChange: r,
        caller: H
    });
    return (0, y.jsx)(U, {
        scope: e.__scopeAccordion,
        value: j.useMemo(() => t ? [t] : [], [t]),
        onItemOpen: d,
        onItemClose: j.useCallback(() => i && d(""), [i, d]),
        children: (0, y.jsx)(X, {
            scope: e.__scopeAccordion,
            collapsible: i,
            children: (0, y.jsx)(ee, { ...n,
                ref: a
            })
        })
    })
}), J = j.forwardRef((e, a) => {
    const {
        value: s,
        defaultValue: o,
        onValueChange: r = () => {},
        ...i
    } = e, [n, t] = l({
        prop: s,
        defaultProp: o ?? [],
        onChange: r,
        caller: H
    }), d = j.useCallback(e => t((a = []) => [...a, e]), [t]), c = j.useCallback(e => t((a = []) => a.filter(a => a !== e)), [t]);
    return (0, y.jsx)(U, {
        scope: e.__scopeAccordion,
        value: n,
        onItemOpen: d,
        onItemClose: c,
        children: (0, y.jsx)(X, {
            scope: e.__scopeAccordion,
            collapsible: !0,
            children: (0, y.jsx)(ee, { ...i,
                ref: a
            })
        })
    })
}), [W, Z] = $(H), ee = j.forwardRef((e, a) => {
    const {
        __scopeAccordion: s,
        disabled: o,
        dir: r,
        orientation: n = "vertical",
        ...d
    } = e, l = t(j.useRef(null), a), c = L(s), m = "ltr" === g(r), u = i(e.onKeyDown, e => {
        if (!V.includes(e.key)) return;
        const a = e.target,
            s = c().filter(e => !e.ref.current?.disabled),
            o = s.findIndex(e => e.ref.current === a),
            r = s.length;
        if (-1 === o) return;
        e.preventDefault();
        let i = o;
        const t = r - 1,
            d = () => {
                i = o + 1, i > t && (i = 0)
            },
            l = () => {
                i = o - 1, i < 0 && (i = t)
            };
        switch (e.key) {
            case "Home":
                i = 0;
                break;
            case "End":
                i = t;
                break;
            case "ArrowRight":
                "horizontal" === n && (m ? d() : l());
                break;
            case "ArrowDown":
                "vertical" === n && d();
                break;
            case "ArrowLeft":
                "horizontal" === n && (m ? l() : d());
                break;
            case "ArrowUp":
                "vertical" === n && l()
        }
        s[i % r].ref.current?.focus()
    });
    return (0, y.jsx)(W, {
        scope: s,
        disabled: o,
        direction: r,
        orientation: n,
        children: (0, y.jsx)(T.Slot, {
            scope: s,
            children: (0, y.jsx)(p.div, { ...d,
                "data-orientation": n,
                ref: l,
                onKeyDown: o ? void 0 : u
            })
        })
    })
}), ae = "AccordionItem", [se, oe] = $(ae), re = j.forwardRef((e, a) => {
    const {
        __scopeAccordion: s,
        value: o,
        ...r
    } = e, i = Z(ae, s), n = B(ae, s), t = Q(s), d = m(), l = o && n.value.includes(o) || !1, c = i.disabled || e.disabled;
    return (0, y.jsx)(se, {
        scope: s,
        open: l,
        disabled: c,
        triggerId: d,
        children: (0, y.jsx)(z, {
            "data-orientation": i.orientation,
            "data-state": me(l),
            ...t,
            ...r,
            ref: a,
            disabled: c,
            open: l,
            onOpenChange: e => {
                e ? n.onItemOpen(o) : n.onItemClose(o)
            }
        })
    })
});
re.displayName = ae;
var ie = "AccordionHeader",
    ne = j.forwardRef((e, a) => {
        const {
            __scopeAccordion: s,
            ...o
        } = e, r = Z(H, s), i = oe(ie, s);
        return (0, y.jsx)(p.h3, {
            "data-orientation": r.orientation,
            "data-state": me(i.open),
            "data-disabled": i.disabled ? "" : void 0,
            ...o,
            ref: a
        })
    });
ne.displayName = ie;
var te = "AccordionTrigger",
    de = j.forwardRef((e, a) => {
        const {
            __scopeAccordion: s,
            ...o
        } = e, r = Z(H, s), i = oe(te, s), n = Y(te, s), t = Q(s);
        return (0, y.jsx)(T.ItemSlot, {
            scope: s,
            children: (0, y.jsx)(S, {
                "aria-disabled": i.open && !n.collapsible || void 0,
                "data-orientation": r.orientation,
                id: i.triggerId,
                ...t,
                ...o,
                ref: a
            })
        })
    });
de.displayName = te;
var le = "AccordionContent",
    ce = j.forwardRef((e, a) => {
        const {
            __scopeAccordion: s,
            ...o
        } = e, r = Z(H, s), i = oe(le, s), n = Q(s);
        return (0, y.jsx)(D, {
            role: "region",
            "aria-labelledby": i.triggerId,
            "data-orientation": r.orientation,
            ...n,
            ...o,
            ref: a,
            style: {
                "--radix-accordion-content-height": "var(--radix-collapsible-content-height)",
                "--radix-accordion-content-width": "var(--radix-collapsible-content-width)",
                ...e.style
            }
        })
    });

function me(e) {
    return e ? "open" : "closed"
}
ce.displayName = le;
var pe = re,
    ue = ne,
    fe = de,
    ve = ce,
    be = K,
    he = j.forwardRef(({
        className: e,
        ...a
    }, s) => (0, y.jsx)(pe, {
        ref: s,
        className: b("border-b", e),
        ...a
    }));
he.displayName = "AccordionItem";
var xe = j.forwardRef(({
    className: e,
    children: a,
    ...s
}, o) => (0, y.jsx)(ue, {
    className: "flex",
    children: (0, y.jsxs)(fe, {
        ref: o,
        className: b("flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180", e),
        ...s,
        children: [a, (0, y.jsx)(h, {
            className: "h-4 w-4 shrink-0 transition-transform duration-200"
        })]
    })
}));
xe.displayName = fe.displayName;
var ge = j.forwardRef(({
    className: e,
    children: a,
    ...s
}, o) => (0, y.jsx)(ve, {
    ref: o,
    className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...s,
    children: (0, y.jsx)("div", {
        className: b("pb-4 pt-0", e),
        children: a
    })
}));
ge.displayName = ve.displayName;
var je = [{
        q: "Como faço para acessar o NurseHub Pass?",
        a: "Assim que você finaliza a compra, enviamos um e-mail com todas as instruções de acesso pela plataforma. É o mesmo e-mail usado na compra. Vale conferir o spam e lixo eletr´nico ;)",
        visible: !0
    }, {
        q: "O acesso é imediato após a compra?",
        a: "Sim! Após a confirmação do pagamento, você recebe as instruções por e-mail e já pode começar a acessar. Se o pagamento for via boleto, o acesso é liberado em até 48h.",
        visible: !0
    }, {
        q: "Quanto tempo tenho de acesso?",
        a: "Você tem 1 ano de acesso para usar quando e onde quiser!",
        visible: !0
    }, {
        q: "Quantos cursos tem na NurseHub?",
        a: "O NurseHub Pass te dá acesso aos mais de 8 cursos completos da NurseHub, com mais de 330 aulas, mais de 70h de conteúdo gravado, além das lives e workshops que ficam gravadas e disponíveis na plataforma para você assistir no seu tempo.",
        visible: !0
    }, {
        q: "Quais são os b´nus do NurseHub Pass?",
        a: "Além de todos os cursos e aulas ao vivo semanais, você também tem acesso  s lives, workshops gravados e atualizações constantes. O NurseHub Pass inclui ainda 1 mês de acesso ao LTX e mais de 20 ferramentas que vão te ajudar a criar com IA.",
        visible: !0
    }, {
        q: "As aulas são ao vivo ou gravadas?",
        a: "As aulas são gravadas para você assistir no seu ritmo e toda semana nós temos aulas ao vivo dentro da plataforma. As lives e workshops também ficam gravados para você poder acessar depois!",
        visible: !0
    }, {
        q: "O NurseHub Pass tem garantia?",
        a: "Sim, você tem 7 dias de garantia, você pode cancelar dentro desses dias de forma simples e tranquila!",
        visible: !0
    }, {
        q: "Qual o link do canal de atendimento da Human?",
        a: "Você pode falar com a gente por aqui: https://bit.ly/atendimentohumanacademy",
        visible: !0
    }, {
        q: "Os certificados são individuais por curso? Posso postar eles no meu LinkedIn?",
        a: "Sim e sim :) todos os cursos possuem certificado individuais e aconselhamos que você poste eles no seu Linkedin! Adicionar seus certificados só vai ajudar a fortalecer seu perfil profissional.",
        visible: !0
    }, {
        q: "Os cursos servem para iniciantes?",
        a: "Sim, os nossos cursos vão do iniciante ao avançado. Muitos começam do básico e ensinam de forma prática, permitindo que quem não tem experiência consiga acompanhar.",
        visible: !0
    }, {
        q: "O NurseHub Pass é atualizado com novas ferramentas de IA?",
        a: "Com certeza! Sempre que surge algo relevante, a gente testa no estúdio, valida o workflow e depois grava novas aulas para atualizar o NurseHub Pass.",
        visible: !0
    }, {
        q: "Como funciona a comunidade da Human?",
        a: "A comunidade funciona dentro da nossa plataforma! Temos trocas diárias entre os alunos e nosso time.",
        visible: !0
    }, {
        q: "As ferramentas estão inclusas no valor?",
        a: "Todas as ferramentas de criação de prompts estão inclusas no NurseHub Pass, são elas que lhe farão economizar créditos quando for criar nas ferramentas de geração de imagem e vídeos. As assinaturas das ferramentas de geração de imagem e vídeos não estão inclusas, o que te dá liberdade de escolha.",
        visible: !0
    }, {
        q: "O conteúdo é focado em teoria ou prática? As aulas são muito longas?",
        a: "A nossa metodologia é prática, sem enrolação! É a forma como gostamos de ensinar. Com demonstrações reais de ferramentas e workflows aplicáveis no dia a dia. As aulas são objetivas, pensadas para facilitar o aprendizado, sem ficar cansativo.",
        visible: !0
    }, {
        q: "A NurseHub oferece desafios ou atividades práticas?",
        a: "Sim! Frequentemente promovemos desafios práticos para incentivar a prática e o desenvolvimento dos alunos.",
        visible: !1
    }, {
        q: "Posso refazer um curso depois de concluir?",
        a: "Yep! Enquanto seu acesso estiver ativo, você pode revisar o conteúdo sempre que quiser.",
        visible: !1
    }, {
        q: "Em quanto tempo consigo começar a aplicar o que aprendo?",
        a: "Desde as primeiras aulas já é possível aplicar conceitos e ferramentas no seu dia a dia, principalmente em produtividade e criação.",
        visible: !1
    }, {
        q: "Existe algum requisito mínimo de computador?",
        a: "Para aplicar os nossos workflows você só precisa de uma boa conexão   internet, não necessita de um computador potente.",
        visible: !1
    }, {
        q: "Vale a pena para quem já trabalha com marketing/design/audiovisual?",
        a: "Com certeza! Profissionais dessas áreas conseguem acelerar processos, ganhar produtividade e ampliar possibilidades criativas com IA.",
        visible: !1
    }, {
        q: "O que diferencia a NurseHub de outros cursos de IA?",
        a: "Nosso foco é aplicação prática, workflow validado no nosso estúdio, comunidade ativa e atualização constante. Não ensinamos só ferramenta, ensinamos como usar de forma estratégica e profissional no dia a dia.",
        visible: !1
    }, {
        q: "Tenho pouco tempo. Os cursos valem a pena para mim?",
        a: "Sim! As aulas são objetivas e práticas. Mesmo dedicando poucas horas por semana, você já consegue aplicar o que aprende no seu dia a dia.",
        visible: !1
    }, {
        q: "O acesso anual é suficiente?",
        a: "Sim! Em 1 ano você consegue assistir todo o conteúdo, revisar, aplicar e ainda aproveitar as atualizações incluídas no período.",
        visible: !1
    }, {
        q: "Os cursos estão   venda separadamente?",
        a: "Os nossos cursos fazem parte de uma trilha integrada. Por isso, a gente oferece o NurseHub Pass como uma experiência completa.",
        visible: !1
    }],
    ye = () => {
        const {
            faq: e
        } = f(), a = e.length > 0 ? e : je, [s, i] = (0, j.useState)(0), n = Math.ceil(a.length / 7), t = a.slice(7 * s, 7 * (s + 1));
        return (0, y.jsxs)("section", {
            id: "faq",
            className: "relative py-12 md:py-28 overflow-hidden scroll-mt-28",
            style: {
                background: "#f4f2ed"
            },
            children: [(0, y.jsx)("div", {
                className: "absolute w-[450px] h-[450px] rounded-full bg-[radial-gradient(ellipse_at_center,hsla(35,25%,70%,0.35),transparent_60%)] top-[-100px] right-[-50px] pointer-events-none"
            }), (0, y.jsx)("div", {
                className: "absolute w-[350px] h-[350px] rounded-full bg-[radial-gradient(ellipse_at_center,hsla(210,20%,75%,0.25),transparent_60%)] bottom-[10%] left-[-80px] pointer-events-none"
            }), (0, y.jsxs)("div", {
                className: "relative z-10 container max-w-2xl",
                children: [(0, y.jsxs)(o.div, {
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
                    className: "flex flex-col items-center mb-10",
                    children: [(0, y.jsx)("img", {
                        src: "/assets/pass.svg",
                        alt: "NurseHub Pass",
                        className: "h-6 md:h-7 w-auto opacity-90 mb-5 md:mb-6",
                        style: {
                            filter: "brightness(0)"
                        },
                        draggable: !1
                    }), (0, y.jsx)("h2", {
                        className: "font-display text-3xl md:text-5xl font-bold text-[#0E0E10] text-center",
                        children: "Perguntas frequentes"
                    })]
                }), (0, y.jsx)("div", {
                    className: "bg-white/70 backdrop-blur-xl border border-black/[0.06] rounded-2xl p-6 md:p-8 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_8px_32px_rgba(15,20,28,0.06)]",
                    children: (0, y.jsx)(r, {
                        mode: "wait",
                        children: (0, y.jsx)(o.div, {
                            initial: {
                                opacity: 0,
                                x: 30
                            },
                            animate: {
                                opacity: 1,
                                x: 0
                            },
                            exit: {
                                opacity: 0,
                                x: -30
                            },
                            transition: {
                                duration: .25
                            },
                            children: (0, y.jsx)(be, {
                                type: "single",
                                collapsible: !0,
                                className: "w-full",
                                children: t.map((e, a) => (0, y.jsxs)(he, {
                                    value: `faq-${s}-${a}`,
                                    className: "border-black/[0.08]",
                                    children: [(0, y.jsx)(xe, {
                                        className: "font-display text-left text-[#0E0E10]/85 hover:text-[#0E0E10] hover:no-underline",
                                        children: e.q
                                    }), (0, y.jsx)(ge, {
                                        className: "text-[#0E0E10]/55 font-body",
                                        children: e.a
                                    })]
                                }, 7 * s + a))
                            })
                        }, s)
                    })
                }), (0, y.jsxs)("div", {
                    className: "flex items-center justify-center gap-4 mt-8",
                    children: [(0, y.jsx)("button", {
                        onClick: () => i(e => e - 1),
                        disabled: 0 === s,
                        className: "w-10 h-10 rounded-full border border-black/[0.1] hover:border-black/[0.25] bg-white hover:bg-white text-[#0E0E10]/55 hover:text-[#0E0E10] transition-all duration-300 flex items-center justify-center disabled:opacity-25 disabled:pointer-events-none shadow-[0_1px_2px_rgba(15,20,28,0.04)]",
                        children: (0, y.jsx)(v, {
                            className: "w-4 h-4"
                        })
                    }), (0, y.jsx)("div", {
                        className: "flex items-center gap-2",
                        children: Array.from({
                            length: n
                        }).map((e, a) => (0, y.jsx)("button", {
                            onClick: () => i(a),
                            className: "h-2 rounded-full transition-all duration-300 " + (a === s ? "bg-[#0E0E10] w-6" : "bg-black/15 hover:bg-black/30 w-2")
                        }, a))
                    }), (0, y.jsx)("button", {
                        onClick: () => i(e => e + 1),
                        disabled: s === n - 1,
                        className: "w-10 h-10 rounded-full border border-black/[0.1] hover:border-black/[0.25] bg-white hover:bg-white text-[#0E0E10]/55 hover:text-[#0E0E10] transition-all duration-300 flex items-center justify-center disabled:opacity-25 disabled:pointer-events-none shadow-[0_1px_2px_rgba(15,20,28,0.04)]",
                        children: (0, y.jsx)(u, {
                            className: "w-4 h-4"
                        })
                    })]
                }), (0, y.jsx)("div", {
                    className: "flex justify-center mt-6",
                    children: (0, y.jsxs)("a", {
                        href: "https://bit.ly/atendimentohumanacademy",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "group inline-flex items-center gap-1.5 font-body text-[12px] tracking-[0.02em] text-[#0E0E10]/55 hover:text-[#0E0E10] transition-colors",
                        children: ["Falar com um humano", (0, y.jsx)("span", {
                            "aria-hidden": "true",
                            className: "text-[13px] leading-none transition-transform duration-200 group-hover:translate-x-0.5",
                            children: "â€º"
                        })]
                    })
                }), (0, y.jsx)("div", {
                    className: "sr-only",
                    children: a.map((e, a) => (0, y.jsxs)("div", {
                        children: [(0, y.jsx)("h3", {
                            children: e.q
                        }), (0, y.jsx)("p", {
                            children: e.a
                        })]
                    }, a))
                })]
            })]
        })
    };
export {
    ye as
    default
};