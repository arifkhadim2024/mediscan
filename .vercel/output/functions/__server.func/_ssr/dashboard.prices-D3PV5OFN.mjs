import { o as __toESM } from "../_runtime.mjs";
import { t as api } from "./api-DbbIhhGe.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { D as LoaderCircle, F as ExternalLink, H as Check } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-CGCM0s9z.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DUy71i1r.mjs";
import { i as medicines } from "./mock-data-RrsbMZyB.mjs";
import { t as PriceCard } from "./price-card-hgSqJ4VT.mjs";
import { t as Route } from "./dashboard.prices-DRGOWLQZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.prices-D3PV5OFN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PricesPage() {
	const { medicineId } = Route.useSearch();
	const [selectedId, setSelectedId] = (0, import_react.useState)("");
	const [allMedicines, setAllMedicines] = (0, import_react.useState)(medicines);
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (medicineId) setSelectedId(medicineId);
		else if (medicines.length > 0) setSelectedId(medicines[0].id);
	}, [medicineId]);
	(0, import_react.useEffect)(() => {
		const loadDynamic = async () => {
			if (selectedId && selectedId.includes("-med-")) {
				if (allMedicines.find((m) => m.id === selectedId)) return;
				setLoading(true);
				try {
					const [prescriptionId, idxStr] = selectedId.split("-med-");
					const idx = parseInt(idxStr, 10);
					const data = await api.get(`/prescription/${prescriptionId}`);
					const med = (data.aiAnalysis ? Array.isArray(data.aiAnalysis) ? data.aiAnalysis : [data.aiAnalysis] : [])[idx];
					if (med) {
						const dynamicMed = {
							id: selectedId,
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
						};
						setAllMedicines((prev) => [...prev, dynamicMed]);
					}
				} catch (err) {
					console.error("Failed to load dynamic medicine for price comparison", err);
				} finally {
					setLoading(false);
				}
			}
		};
		loadDynamic();
	}, [selectedId, allMedicines]);
	const med = allMedicines.find((m) => m.id === selectedId);
	if (loading || !med) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-12 text-center text-muted-foreground flex flex-col items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }), "Loading price comparison..."]
	});
	const cheapest = med.prices && med.prices.length > 0 ? med.prices.reduce((a, b) => a.price < b.price ? a : b) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl sm:text-3xl font-bold",
					children: "Price Comparison"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-sm",
					children: "Compare prices across trusted online pharmacies."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: selectedId,
					onValueChange: setSelectedId,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "w-64 glass",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: allMedicines.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: m.id,
						children: m.name
					}, m.id)) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: cheapest ? med.prices.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceCard, {
					pharmacy: p,
					cheapest: p.name === cheapest.name,
					index: i
				}, p.name)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground italic col-span-3",
					children: "Product links unavailable"
				})
			}),
			cheapest && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "glass overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-muted/50",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "text-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3 font-semibold",
										children: "Medicine"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3 font-semibold",
										children: "Website"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3 font-semibold",
										children: "Price"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3 font-semibold",
										children: "Availability"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3 font-semibold",
										children: "Delivery"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3 font-semibold text-right",
										children: "Buy"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: med.prices.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border/50 hover:bg-muted/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3",
									children: med.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3 font-medium",
									children: p.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold",
										children: ["₹", p.price]
									}), p.name === cheapest.name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										className: "ml-2 gradient-success text-secondary-foreground border-0 text-[10px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3 mr-1" }), " Cheapest"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										children: p.availability
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3 text-muted-foreground",
									children: p.delivery
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: p.url,
										target: "_blank",
										rel: "noreferrer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: p.name === cheapest.name ? "default" : "outline",
											children: ["Buy ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3 ml-1" })]
										})
									})
								})
							]
						}, p.name)) })]
					})
				})
			})
		]
	});
}
//#endregion
export { PricesPage as component };
