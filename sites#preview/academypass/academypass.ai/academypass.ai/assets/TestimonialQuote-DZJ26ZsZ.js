import {
    C as e
} from "./query-BYnN4WbX.js";
import {
    o as a
} from "./ui-BxzeyedK.js";
import {
    t as i
} from "./use-mobile-CjgID_fb.js";
import {
    t
} from "./LazyVideo-DeC_6Cb6.js";
var s = e(),
    r = [.23, 1, .32, 1],
    l = [{
        number: "+20",
        label: "ferramentas exclusivas"
    }, {
        number: "+300h",
        label: "de conteúdo"
    }],
    n = () => {
        const e = i(),
            n = e ? "/assets/hero-video-mobile-CX262xj_.mp4" : "/assets/hero-video-light-lf2wYUg5.mp4",
            o = e ? "/assets/hero-poster-mobile-C9sjhIdI.jpg" : "/assets/hero-poster-light-DbwNR--n.jpg",
            d = l;
        return (0, s.jsx)("section", {
            id: "plataforma",
            className: "section-dark relative overflow-hidden py-16 md:py-24 lg:py-28",
            style: {
                backgroundColor: "hsl(var(--dark-bg))"
            },
            children: (0, s.jsx)("div", {
                className: "mx-auto max-w-[1340px] px-5 md:px-8",
                children: (0, s.jsxs)("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 items-stretch",
                    children: [(0, s.jsx)(a.div, {
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
                            ease: r
                        },
                        className: "relative rounded-[20px] overflow-hidden bg-[#0E0E10] aspect-[4/3]",
                        style: {
                            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.06)"
                        },
                        children: (0, s.jsx)(t, {
                            src: n,
                            poster: o,
                            delay: 1200,
                            className: "w-full h-full"
                        })
                    }), (0, s.jsxs)(a.div, {
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
                            delay: .06,
                            ease: r
                        },
                        className: "relative rounded-[20px] flex flex-col p-7 md:p-9 lg:p-12 min-h-[420px] md:min-h-0 h-full",
                        style: {
                            background: "linear-gradient(155deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 60%, rgba(255,255,255,0.03) 100%)",
                            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.06)"
                        },
                        children: [(0, s.jsxs)("div", {
                            children: [(0, s.jsx)(a.span, {
                                initial: {
                                    opacity: 0,
                                    y: 6
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
                                    duration: .5,
                                    delay: .12,
                                    ease: r
                                },
                                className: "block font-body text-[11px] md:text-[11px] text-primary tracking-[0.24em] uppercase mb-5 md:mb-7",
                                children: "Pessoas reais. Criação real."
                            }), (0, s.jsxs)(a.p, {
                                initial: {
                                    opacity: 0,
                                    y: 8
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
                                    delay: .18,
                                    ease: r
                                },
                                className: "font-display font-medium text-white leading-[1.1] tracking-[-0.025em] text-[clamp(2.15rem,3vw,2.4rem)] max-w-[24ch]",
                                style: {
                                    textWrap: "balance"
                                },
                                children: ["O mercado muda.", " ", (0, s.jsxs)("span", {
                                    className: "text-white/50",
                                    children: ["Quem está na frente acompanha qualquer", " ", "mudança."]
                                })]
                            })]
                        }), (0, s.jsx)("div", {
                            className: "flex-1 min-h-8"
                        }), (0, s.jsxs)("div", {
                            children: [(0, s.jsx)(a.div, {
                                initial: {
                                    opacity: 0,
                                    scaleX: .6
                                },
                                whileInView: {
                                    opacity: 1,
                                    scaleX: 1
                                },
                                viewport: {
                                    once: !0,
                                    margin: "-60px"
                                },
                                transition: {
                                    duration: .6,
                                    delay: .3,
                                    ease: r
                                },
                                style: {
                                    transformOrigin: "left"
                                },
                                className: "h-px w-full bg-white/12 mb-6 md:mb-8"
                            }), (0, s.jsx)("div", {
                                className: "grid grid-cols-2 tabular-nums",
                                children: d.map((e, i) => (0, s.jsxs)(a.div, {
                                    initial: {
                                        opacity: 0,
                                        y: 8
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
                                        delay: .36 + .06 * i,
                                        ease: r
                                    },
                                    className: "flex flex-col " + (0 === i ? "pr-4 md:pr-6" : "pl-4 md:pl-6 border-l border-white/10"),
                                    children: [(0, s.jsx)("p", {
                                        className: "font-display font-bold text-white tracking-[-0.03em] leading-none text-[clamp(1.9rem,2.8vw,2.4rem)]",
                                        children: e.number
                                    }), (0, s.jsx)("p", {
                                        className: "mt-2 md:mt-2.5 font-body text-[13px] md:text-[12px] text-white/55 leading-[1.35]",
                                        children: e.label
                                    })]
                                }, e.label))
                            })]
                        })]
                    })]
                })
            })
        })
    };
export {
    n as
    default
};