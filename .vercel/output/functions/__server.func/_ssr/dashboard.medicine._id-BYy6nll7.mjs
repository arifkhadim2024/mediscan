import { o as __toESM } from "../_runtime.mjs";
import { t as api } from "./api-DbbIhhGe.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { D as LoaderCircle, I as Droplet, S as Package, U as Car, Y as Baby, Z as ArrowLeft, f as Sparkles, j as HeartPulse, m as ShieldAlert, n as Wine, r as Utensils } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-CGCM0s9z.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { n as findMedicine } from "./mock-data-RrsbMZyB.mjs";
import { t as Route } from "./dashboard.medicine._id-CkSxnjAs.mjs";
import { t as PriceCard } from "./price-card-hgSqJ4VT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.medicine._id-BYy6nll7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MedicinePage() {
	const { id } = Route.useParams();
	const [m, setM] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const loadMedicine = async () => {
			setLoading(true);
			try {
				if (id.includes("-med-")) {
					const [prescriptionId, idxStr] = id.split("-med-");
					const idx = parseInt(idxStr, 10);
					const data = await api.get(`/prescription/${prescriptionId}`);
					const med = (data.aiAnalysis ? Array.isArray(data.aiAnalysis) ? data.aiAnalysis : [data.aiAnalysis] : [])[idx];
					if (med) setM({
						id,
						name: med.medicineName,
						dosage: med.dosage || "As prescribed",
						frequency: med.frequency || "1-0-1",
						duration: med.duration || "N/A",
						purpose: med.purpose || "Medical Treatment",
						howToTake: med.beforeAfterFood || "As advised by doctor",
						timing: med.timing || "Anytime",
						sideEffects: med.possibleSideEffects || [],
						warnings: med.warnings || [],
						interactions: med.drugInteractions || [],
						alternatives: med.alternativeMedicines || [],
						description: `${med.genericName || med.medicineName} is used for ${med.purpose || "treatment"}.`,
						uses: [med.purpose || "Treatment"],
						benefits: ["Effective relief"],
						storage: "Store in a cool dry place.",
						pregnancy: "Consult doctor.",
						alcohol: "Avoid alcohol.",
						driving: "Consult doctor.",
						kidney: "Consult doctor.",
						liver: "Consult doctor.",
						foodInteractions: "No significant interaction.",
						image: "/images/generic_medicine.png",
						prices: [
							{
								name: "Amazon Pharmacy",
								price: 120,
								availability: "In Stock",
								delivery: "2 days",
								url: `https://www.amazon.in/s?k=${encodeURIComponent(med.medicineName)}`,
								logoColor: "#FF9900"
							},
							{
								name: "Tata 1mg",
								price: 95,
								availability: "In Stock",
								delivery: "1 day",
								url: `https://www.1mg.com/search/all?name=${encodeURIComponent(med.medicineName)}`,
								logoColor: "#F97316"
							},
							{
								name: "PharmEasy",
								price: 102,
								availability: "In Stock",
								delivery: "2 days",
								url: `https://pharmeasy.in/search/all?searchTextField=${encodeURIComponent(med.medicineName)}`,
								logoColor: "#10B981"
							},
							{
								name: "Apollo Pharmacy",
								price: 110,
								availability: "In Stock",
								delivery: "Same day",
								url: `https://www.apollopharmacy.in/search-medicines/${encodeURIComponent(med.medicineName)}`,
								logoColor: "#0EA5E9"
							},
							{
								name: "Netmeds",
								price: 105,
								availability: "In Stock",
								delivery: "3 days",
								url: `https://www.netmeds.com/catalogsearch/result?q=${encodeURIComponent(med.medicineName)}`,
								logoColor: "#EF4444"
							},
							{
								name: "Flipkart Health+",
								price: 100,
								availability: "In Stock",
								delivery: "3 days",
								url: `https://healthplus.flipkart.com/search?q=${encodeURIComponent(med.medicineName)}`,
								logoColor: "#2563EB"
							}
						]
					});
				} else {
					const staticMed = findMedicine(id);
					if (staticMed) setM(staticMed);
				}
			} catch (err) {
				console.error("Failed to load medicine details", err);
			} finally {
				setLoading(false);
			}
		};
		loadMedicine();
	}, [id]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-12 text-center text-muted-foreground flex flex-col items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }), "Loading medicine details..."]
	});
	if (!m) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8 text-center text-muted-foreground",
		children: "Medicine not found."
	});
	const cheapest = m.prices && m.prices.length > 0 ? m.prices.reduce((a, b) => a.price < b.price ? a : b) : null;
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: m.image || "/images/generic_medicine.png",
							alt: m.name,
							className: "h-14 w-14 shrink-0 object-cover rounded-2xl border border-white/20 bg-white/10 backdrop-blur"
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
				children: cheapest ? m.prices.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceCard, {
					pharmacy: p,
					cheapest: p.name === cheapest.name,
					index: i
				}, p.name)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground italic col-span-3",
					children: "Product links unavailable"
				})
			})] })
		]
	});
}
//#endregion
export { MedicinePage as component };
