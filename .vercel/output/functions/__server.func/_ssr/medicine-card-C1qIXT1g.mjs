import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { c as TrendingDown, r as Utensils, s as TriangleAlert, z as Clock } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as CardContent, r as CardHeader, t as Card } from "./card-CGCM0s9z.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/medicine-card-C1qIXT1g.js
var import_jsx_runtime = require_jsx_runtime();
function MedicineCard({ medicine, index = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: 20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: { delay: index * .08 },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "glass overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "flex flex-row items-start justify-between gap-4 space-y-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: medicine.image || "/images/generic_medicine.png",
						alt: medicine.name,
						className: "h-11 w-11 shrink-0 object-cover rounded-xl border border-border/50 bg-muted"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-lg truncate",
							children: medicine.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: medicine.purpose
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "secondary",
					className: "shrink-0",
					children: medicine.dosage
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4",
				children: [
					medicine.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground leading-relaxed italic border-l-2 border-primary/30 pl-2",
						children: medicine.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-3 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-muted/50 p-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-muted-foreground",
									children: "Frequency"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold",
									children: medicine.frequency
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-muted/50 p-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-muted-foreground",
									children: "Duration"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold",
									children: medicine.duration
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-muted/50 p-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-muted-foreground flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, { className: "h-3 w-3" }), "Timing"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold text-[11px]",
									children: medicine.timing
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 text-xs font-semibold text-muted-foreground mb-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), " How to take"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: medicine.howToTake
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:grid-cols-2 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-semibold mb-1 flex items-center gap-1 text-secondary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3 w-3" }), "Side Effects"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1",
							children: medicine.sideEffects.slice(0, 3).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: "text-[10px]",
								children: s
							}, s))
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-semibold mb-1 flex items-center gap-1 text-destructive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3 w-3" }), "Warnings"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground line-clamp-2",
							children: medicine.warnings.join(" · ")
						})] })]
					}),
					medicine.alternatives.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-muted-foreground",
							children: "Alternatives: "
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: medicine.alternatives.join(", ") })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2 pt-2 border-t border-border/50",
						children: [
							medicine.prices && medicine.prices.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: medicine.prices.reduce((a, b) => a.price < b.price ? a : b).url,
								target: "_blank",
								rel: "noreferrer",
								className: "flex-1 min-w-[120px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "w-full gradient-success text-secondary-foreground shadow-elegant hover:scale-[1.02] transition-transform",
									size: "sm",
									children: "Buy Now"
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								disabled: true,
								variant: "outline",
								className: "flex-1 min-w-[120px] text-xs",
								size: "sm",
								children: "Product link unavailable"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/dashboard/prices",
								search: { medicineId: medicine.id },
								className: "flex-1 min-w-[120px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									className: "w-full text-xs",
									variant: "outline",
									size: "sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-3.5 w-3.5 mr-1 text-primary" }), " Compare Prices"]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/dashboard/medicine/$id",
								params: { id: medicine.id },
								className: "shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									className: "text-xs",
									children: "Details"
								})
							})
						]
					})
				]
			})]
		})
	});
}
//#endregion
export { MedicineCard as t };
