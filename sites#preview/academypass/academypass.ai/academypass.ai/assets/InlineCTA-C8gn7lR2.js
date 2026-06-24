import {
    C as e
} from "./query-BYnN4WbX.js";
import {
    fn as r
} from "./index-W86zpBsQ.js";
var a = e(),
    t = ({
        label: e = "Tornar-se um membro fundador",
        variant: t = "dark",
        className: o = ""
    }) => {
        const n = "light" === t;
        return (0, a.jsx)("div", {
            className: `flex justify-center ${o}`,
            children: (0, a.jsxs)("button", {
                onClick: () => {
                    const e = document.getElementById("pass");
                    e && e.scrollIntoView({
                        behavior: "smooth"
                    })
                },
                className: "group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-display font-semibold text-[12px] tracking-[0.12em] uppercase transition-all duration-500 overflow-hidden " + (n ? "text-foreground/80 hover:text-foreground border border-black/[0.1] hover:border-black/[0.2]" : "text-white/85 hover:text-white border border-white/[0.12] hover:border-white/[0.25]"),
                style: {
                    background: n ? "linear-gradient(135deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.01) 50%, rgba(0,0,0,0.02) 100%)" : "linear-gradient(135deg, hsl(195 40% 35% / 0.25) 0%, hsl(195 30% 48% / 0.15) 100%)"
                },
                children: [(0, a.jsx)("span", {
                    className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full",
                    style: {
                        background: n ? "linear-gradient(135deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.02) 100%)" : "linear-gradient(135deg, hsl(195 40% 35% / 0.4) 0%, hsl(195 30% 48% / 0.25) 100%)"
                    }
                }), (0, a.jsx)("span", {
                    className: "relative",
                    children: e
                }), (0, a.jsx)(r, {
                    className: "relative w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                })]
            })
        })
    };
export {
    t
};