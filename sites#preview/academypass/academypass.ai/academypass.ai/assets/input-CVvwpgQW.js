import {
    a as e
} from "./rolldown-runtime-C_ttsnZz.js";
import {
    C as r,
    w as t
} from "./query-BYnN4WbX.js";
import {
    t as o
} from "./dist-DkmQ2f8N.js";
import {
    j as i,
    vn as s
} from "./index-W86zpBsQ.js";
var n = e(t(), 1),
    a = r(),
    d = s("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline"
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }),
    f = n.forwardRef(({
        className: e,
        variant: r,
        size: t,
        asChild: s = !1,
        ...n
    }, f) => (0, a.jsx)(s ? o : "button", {
        className: i(d({
            variant: r,
            size: t,
            className: e
        })),
        ref: f,
        ...n
    }));
f.displayName = "Button";
var u = n.forwardRef(({
    className: e,
    type: r,
    ...t
}, o) => (0, a.jsx)("input", {
    type: r,
    className: i("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", e),
    ref: o,
    ...t
}));
u.displayName = "Input";
export {
    f as n, u as t
};