import {
    C as a
} from "./query-BYnN4WbX.js";
import {
    o as e
} from "./ui-BxzeyedK.js";
var s = a(),
    i = [.23, 1, .32, 1],
    t = () => (0, s.jsx)("section", {
        className: "relative bg-background overflow-hidden",
        children: (0, s.jsxs)("div", {
            className: "mx-auto max-w-[1040px] px-5 md:px-10 pt-24 md:pt-32 lg:pt-40 pb-10 md:pb-14 text-center",
            children: [(0, s.jsx)(e.div, {
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
                    duration: .5,
                    ease: i
                },
                className: "flex justify-center mb-8 md:mb-12",
                children: (0, s.jsx)("img", {
                    src: "/assets/pass.svg",
                    alt: "NurseHub Pass",
                    className: "h-9 md:h-11 w-auto opacity-90",
                    style: {
                        filter: "brightness(0)"
                    },
                    draggable: !1
                })
            }), (0, s.jsxs)(e.p, {
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
                    delay: .08,
                    ease: i
                },
                className: "font-display font-medium leading-[1.12] tracking-[-0.035em] text-[clamp(1.9rem,5.8vw,4rem)] max-w-[24ch] mx-auto",
                style: {
                    color: "hsl(222 18% 18%)"
                },
                children: ["Muito mais que uma plataforma. Um ecossistema completo para profissionais que decidiram construir a próxima geração da enfermagem.", (0, s.jsx)("br", {
                    className: "hidden md:inline"
                }), (0, s.jsxs)("span", {
                    style: {
                        color: "hsl(222 12% 44%)"
                    },
                    children: [" ", "Do aprendizado à entrega,", (0, s.jsx)("br", {
                        className: "hidden md:inline"
                    }), " ", "num só lugar."]
                })]
            }), (0, s.jsxs)(e.div, {
                initial: {
                    opacity: 0
                },
                whileInView: {
                    opacity: 1
                },
                viewport: {
                    once: !0,
                    margin: "-80px"
                },
                transition: {
                    duration: .6,
                    delay: .3,
                    ease: i
                },
                className: "mt-10 md:mt-14 flex items-center justify-center gap-3",
                children: [(0, s.jsx)("span", {
                    className: "h-px w-8 bg-foreground/20"
                }), (0, s.jsx)("span", {
                    className: "font-body text-[11px] md:text-xs text-foreground/55 tracking-[0.08em]",
                    children: "A comunidade da Nova Enfermagem Digital"
                }), (0, s.jsx)("span", {
                    className: "h-px w-8 bg-foreground/20"
                })]
            })]
        })
    });
export {
    t as
    default
};