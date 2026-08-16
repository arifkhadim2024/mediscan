import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { I as Droplet, Q as ArrowLeft, S as Package, U as Car, X as Baby, b as Pill, f as Sparkles, j as HeartPulse, m as ShieldAlert, n as Wine, r as Utensils } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-CGCM0s9z.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { n as findMedicine } from "./mock-data-BduAF806.mjs";
import { t as Route } from "./dashboard.medicine._id-q2empmam.mjs";
import { t as PriceCard } from "./price-card-hgSqJ4VT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.medicine._id-D0nyIvyH.js
var import_jsx_runtime = require_jsx_runtime();
function MedicinePage() {
	const { id } = Route.useParams();
	const m = findMedicine(id);
	if (!m) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8",
		children: "Medicine not found."
	});
	const cheapest = m.prices.reduce((a, b) => a.price < b.price ? a : b);
	const warnings = [
		{
			icon: Baby,
			label: "Pregnancy",
			text: m.pregnancy
		},
		{
			icon: Wine,
			label: "Alcohol",
			text: m.alcohol
		},
		{
			icon: Car,
			label: "Driving",
			text: m.driving
		},
		{
			icon: Droplet,
			label: "Kidney",
			text: m.kidney
		},
		{
			icon: HeartPulse,
			label: "Liver",
			text: m.liver
		},
		{
			icon: Utensils,
			label: "Food",
			text: m.foodInteractions
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/dashboard/medicines",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4 mr-1" }), " Back to library"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: 10
				},
				animate: {
					opacity: 1,
					y: 0
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "glass overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "gradient-hero p-6 text-primary-foreground flex flex-wrap items-start gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/20 backdrop-blur",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { className: "h-6 w-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-2xl sm:text-3xl font-bold truncate",
									children: m.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "opacity-90 text-sm mt-1",
									children: m.purpose
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2 mt-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											className: "bg-white/20 border-0 text-white",
											children: m.dosage
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											className: "bg-white/20 border-0 text-white",
											children: m.frequency
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											className: "bg-white/20 border-0 text-white",
											children: m.duration
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											className: "bg-white/20 border-0 text-white",
											children: m.timing
										})
									]
								})
							]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "glass lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Description" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "space-y-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: m.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "font-semibold mb-2 flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary" }), " Uses"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1",
								children: m.uses.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									children: u
								}, u))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-semibold mb-2",
								children: "Benefits"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "list-disc list-inside text-muted-foreground space-y-1",
								children: m.benefits.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: b }, b))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "font-semibold mb-2 flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-4 w-4 text-destructive" }), " Side Effects"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1",
								children: m.sideEffects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									children: s
								}, s))
							})] })
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "glass",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" }), " Storage"]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "text-sm text-muted-foreground",
						children: m.storage
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold mb-4",
				children: "Warnings & Interactions"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: warnings.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "glass hover:shadow-elegant transition-all hover:-translate-y-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 font-semibold mb-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-8 w-8 place-items-center rounded-lg gradient-primary text-primary-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(w.icon, { className: "h-4 w-4" })
								}),
								w.label,
								" Warning"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-2",
							children: w.text
						})]
					})
				}, w.label))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold mb-4",
				children: "Price across pharmacies"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: m.prices.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceCard, {
					pharmacy: p,
					cheapest: p.name === cheapest.name,
					index: i
				}, p.name))
			})] })
		]
	});
}
//#endregion
export { MedicinePage as component };
