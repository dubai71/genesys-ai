import {
    a as e
} from "./rolldown-runtime-C_ttsnZz.js";
import {
    C as t,
    w as a
} from "./query-BYnN4WbX.js";
import {
    i,
    n,
    o as r,
    r as s,
    t as o
} from "./ui-BxzeyedK.js";
var l = e(a(), 1),
    d = t(),
    c = [.23, 1, .32, 1],
    m = [{
        value: "9.7",
        label: "NPS"
    }, {
        value: "8",
        label: "cursos na plataforma"
    }, {
        value: "98%",
        label: "recomendariam"
    }],
    p = ({
        inView: e
    }) => {
        const t = i(0),
            a = s(t, e => Math.round(e)),
            [r, o] = (0, l.useState)("0");
        return (0, l.useEffect)(() => a.on("change", e => {
            o(e.toLocaleString("pt-BR"))
        }), [a]), (0, l.useEffect)(() => {
            if (e) return n(t, 23e3, {
                duration: 2.4,
                ease: c
            }).stop
        }, [e, t]), (0, d.jsxs)("span", {
            className: "tabular-nums",
            children: [r, (0, d.jsx)("span", {
                children: "+"
            })]
        })
    },
    u = () => {
        const e = (0, l.useRef)(null),
            t = (0, l.useRef)(null),
            a = o(e, {
                once: !0,
                margin: "-120px"
            });
        var i;
        return i = t, (0, l.useEffect)(() => {
            const e = i.current;
            if (!e) return;
            let t = 0,
                a = null,
                n = 0;
            const r = () => {
                    e.muted = !0, e.defaultMuted = !0, e.autoplay = !0, e.loop = !0, e.playsInline = !0, e.setAttribute("muted", ""), e.setAttribute("autoplay", ""), e.setAttribute("loop", ""), e.setAttribute("playsinline", ""), e.setAttribute("webkit-playsinline", "true"), e.setAttribute("x5-playsinline", "true"), e.setAttribute("x5-video-player-type", "h5"), e.setAttribute("x5-video-player-fullscreen", "false"), e.setAttribute("preload", "auto")
                },
                s = () => {
                    r(), e.ended && (e.currentTime = 0);
                    const t = e.play();
                    t && "function" == typeof t.catch && t.catch(() => {})
                },
                o = () => {
                    n >= 12 || (n += 1, a && window.clearTimeout(a), a = window.setTimeout(() => {
                        s(), t = window.requestAnimationFrame(s)
                    }, n < 4 ? 180 : 600))
                },
                l = () => {
                    "visible" === document.visibilityState && (e.paused || e.ended || e.readyState < 3) && (s(), o())
                };
            r(), s(), o();
            const d = ["loadedmetadata", "loadeddata", "canplay", "canplaythrough", "pause", "stalled", "suspend", "waiting", "ended", "emptied"];
            d.forEach(t => {
                e.addEventListener(t, l)
            }), document.addEventListener("visibilitychange", l), window.addEventListener("focus", l), window.addEventListener("pageshow", l), window.addEventListener("scroll", l, {
                passive: !0
            }), window.addEventListener("pointerdown", l, {
                passive: !0
            }), window.addEventListener("touchstart", l, {
                passive: !0
            }), window.addEventListener("click", l, {
                passive: !0
            });
            const c = new IntersectionObserver(e => {
                e.some(e => e.isIntersecting) && l()
            }, {
                threshold: .15
            });
            c.observe(e);
            const m = window.setInterval(() => {
                r(), (e.paused || e.ended) && (e.ended && (e.currentTime = 0), s())
            }, 1200);
            return () => {
                d.forEach(t => {
                    e.removeEventListener(t, l)
                }), document.removeEventListener("visibilitychange", l), window.removeEventListener("focus", l), window.removeEventListener("pageshow", l), window.removeEventListener("scroll", l), window.removeEventListener("pointerdown", l), window.removeEventListener("touchstart", l), window.removeEventListener("click", l), c.disconnect(), window.clearInterval(m), a && window.clearTimeout(a), t && window.cancelAnimationFrame(t)
            }
        }, [i]), (0, d.jsx)("section", {
            id: "vantagens",
            className: "relative bg-background pt-0 pb-20 md:pb-28 lg:pb-32",
            children: (0, d.jsx)("div", {
                className: "w-full px-5 md:px-8",
                children: (0, d.jsx)("div", {
                    className: "max-w-[1340px] mx-auto",
                    children: (0, d.jsxs)("div", {
                        className: "relative rounded-[28px] overflow-hidden",
                        style: {
                            boxShadow: "0 1px 0 rgba(0,0,0,0.03), 0 18px 50px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)"
                        },
                        children: [(0, d.jsx)("video", {
                            ref: t,
                            src: "/video-timeline-blurred.mp4",
                            autoPlay: !0,
                            loop: !0,
                            muted: !0,
                            playsInline: !0,
                            "webkit-playsinline": "true",
                            "x5-playsinline": "true",
                            "x5-video-player-type": "h5",
                            "x5-video-player-fullscreen": "false",
                            preload: "auto",
                            disableRemotePlayback: !0,
                            disablePictureInPicture: !0,
                            controls: !1,
                            controlsList: "nodownload nofullscreen noremoteplayback",
                            tabIndex: -1,
                            "aria-hidden": "true",
                            role: "presentation",
                            className: "absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                        }), (0, d.jsx)("div", {
                            className: "relative z-10 text-center px-6 md:px-12 py-14 md:py-20 lg:py-24",
                            style: {
                                mixBlendMode: "difference",
                                color: "#ffffff"
                            },
                            children: (0, d.jsxs)("div", {
                                className: "max-w-[1040px] mx-auto",
                                children: [(0, d.jsx)(r.div, {
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
                                        ease: c
                                    },
                                    className: "inline-flex items-center rounded-full border border-white/60 px-4 py-1.5 mb-10 md:mb-14",
                                    children: (0, d.jsx)("span", {
                                        className: "font-body text-[12px] md:text-[13px] tracking-[-0.005em]",
                                        children: "Human Academy"
                                    })
                                }), (0, d.jsx)(r.h2, {
                                    ref: e,
                                    initial: {
                                        opacity: 0,
                                        y: 20,
                                        filter: "blur(6px)"
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        y: 0,
                                        filter: "blur(0px)"
                                    },
                                    viewport: {
                                        once: !0,
                                        margin: "-80px"
                                    },
                                    transition: {
                                        duration: .9,
                                        delay: .12,
                                        ease: c
                                    },
                                    className: "font-display font-medium leading-[0.9] tracking-[-0.04em] text-[clamp(3.2rem,9vw,7.5rem)]",
                                    children: (0, d.jsx)(p, {
                                        inView: a
                                    })
                                }), (0, d.jsx)(r.p, {
                                    initial: {
                                        opacity: 0,
                                        y: 12
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
                                        delay: .35,
                                        ease: c
                                    },
                                    className: "mt-8 md:mt-10 font-display font-medium leading-[1.08] tracking-[-0.03em] text-[clamp(1.5rem,3vw,2.6rem)] max-w-[22ch] mx-auto",
                                    children: "alunos já passaram pela Human Academy."
                                }), (0, d.jsx)(r.p, {
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
                                        delay: .5,
                                        ease: c
                                    },
                                    className: "mt-5 md:mt-7 font-body max-w-[52ch] mx-auto text-base md:text-lg leading-[1.55]",
                                    children: "Uma comunidade de criativos, designers, devs e empreendedores que já estão usando IA para criar coisas incríveis."
                                }), (0, d.jsx)("div", {
                                    className: "mt-14 md:mt-20 pt-10 md:pt-12 border-t border-white/50 grid grid-cols-3 gap-4 md:gap-10 max-w-[820px] mx-auto tabular-nums",
                                    children: m.map((e, t) => (0, d.jsxs)(r.div, {
                                        initial: {
                                            opacity: 0,
                                            y: 12
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
                                            delay: .65 + .08 * t,
                                            ease: c
                                        },
                                        className: "flex flex-col items-center text-center " + (t > 0 ? "md:border-l md:border-white/40" : ""),
                                        children: [(0, d.jsx)("p", {
                                            className: "font-display font-medium leading-none tracking-[-0.03em] text-[clamp(1.6rem,2.8vw,2.4rem)]",
                                            children: e.value
                                        }), (0, d.jsx)("p", {
                                            className: "mt-2 md:mt-3 font-body text-[10.5px] md:text-[12px] tracking-[-0.005em]",
                                            children: e.label
                                        })]
                                    }, e.label))
                                })]
                            })
                        })]
                    })
                })
            })
        })
    };
export {
    u as
    default
};