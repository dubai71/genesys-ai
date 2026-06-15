import {
    a as e
} from "./rolldown-runtime-C_ttsnZz.js";
import {
    C as n,
    w as t
} from "./query-BYnN4WbX.js";
import {
    t as o
} from "./use-mobile-CjgID_fb.js";
var s = e(t(), 1),
    r = n(),
    a = ({
        src: e,
        className: n = "",
        type: t = "video/mp4",
        delay: a = 2e3,
        poster: l,
        posterAlt: i = "",
        disableOnMobile: d = !1,
        preload: c = "none"
    }) => {
        const u = (0, s.useRef)(null),
            p = o(),
            [m, v] = (0, s.useState)(!1),
            [f, y] = (0, s.useState)(!1),
            w = !d || !p;
        return (0, s.useEffect)(() => {
            if (!w) return void v(!1);
            const e = window.setTimeout(() => v(!0), a);
            return () => window.clearTimeout(e)
        }, [a, w]), (0, s.useEffect)(() => {
            const e = u.current;
            if (!e || !m || !w) return;
            const n = () => y(!0);
            e.addEventListener("playing", n, {
                once: !0
            }), e.load(), e.play().catch(() => {});
            const t = () => {
                e.play().catch(() => {})
            };
            return window.addEventListener("pointerdown", t, {
                once: !0,
                passive: !0
            }), () => {
                window.removeEventListener("pointerdown", t), e.removeEventListener("playing", n)
            }
        }, [m, w]), w ? (0, r.jsxs)("div", {
            className: `relative ${n}`,
            style: {
                overflow: "hidden"
            },
            children: [l && !f && (0, r.jsx)("img", {
                src: l,
                alt: i,
                "aria-hidden": "true",
                loading: "lazy",
                decoding: "async",
                draggable: !1,
                className: "absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-[1]"
            }), (0, r.jsx)("video", {
                ref: u,
                autoPlay: !0,
                loop: !0,
                muted: !0,
                playsInline: !0,
                controls: !1,
                disablePictureInPicture: !0,
                controlsList: "nodownload nofullscreen noremoteplayback",
                preload: c,
                "aria-hidden": "true",
                role: "presentation",
                tabIndex: -1,
                onContextMenu: e => e.preventDefault(),
                className: "pointer-events-none select-none w-full h-full object-cover",
                style: f ? void 0 : {
                    opacity: 0
                },
                children: m && (0, r.jsx)("source", {
                    src: e,
                    type: t
                })
            })]
        }) : l ? (0, r.jsx)("img", {
            src: l,
            alt: i,
            "aria-hidden": "true",
            loading: "lazy",
            decoding: "async",
            draggable: !1,
            className: `pointer-events-none select-none ${n}`
        }) : (0, r.jsx)("div", {
            className: n,
            "aria-hidden": "true"
        })
    };
export {
    a as t
};