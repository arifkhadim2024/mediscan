import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { F as ExternalLink, H as Check, o as Truck } from "../_libs/lucide-react.mjs";
import { n as CardContent, t as Card } from "./card-CGCM0s9z.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/price-card-hgSqJ4VT.js
var import_jsx_runtime = require_jsx_runtime();
function PriceCard({ pharmacy, cheapest, index = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: 15
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: { delay: index * .05 },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: `glass relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-elegant ${cheapest ? "ring-2 ring-[color:var(--success)]" : ""}`,
			children: [cheapest && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-3 right-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					className: "gradient-success text-secondary-foreground border-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3 mr-1" }), " Cheapest"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-5 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-10 w-10 rounded-lg grid place-items-center text-white font-bold text-sm",
							style: { backgroundColor: pharmacy.logoColor },
							children: pharmacy.name.charAt(0)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold truncate",
								children: pharmacy.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-3 w-3" }),
									" ",
									pharmacy.delivery
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-3xl font-bold",
							children: ["₹", pharmacy.price]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: pharmacy.availability === "In Stock" ? "outline" : "secondary",
							className: "text-[10px]",
							children: pharmacy.availability
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: pharmacy.url,
						target: "_blank",
						rel: "noreferrer",
						className: "block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "w-full",
							variant: cheapest ? "default" : "outline",
							children: ["Buy Now ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3 ml-1" })]
						})
					})
				]
			})]
		})
	});
}
//#endregion
export { PriceCard as t };
