import { o as __toESM } from "../_runtime.mjs";
import { t as api } from "./api-DbbIhhGe.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { D as LoaderCircle, G as Building2, L as Download, Q as ArrowLeft, W as Calendar, d as Stethoscope, h as Share2, i as User } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as CardContent, t as Card } from "./card-CGCM0s9z.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { r as findPrescription } from "./mock-data-BduAF806.mjs";
import { t as MedicineCard } from "./medicine-card-D_y010n6.mjs";
import { t as Route } from "./dashboard.prescription._id-CIc5l6-9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.prescription._id-Wi290mGO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PrescriptionPage() {
	const { id } = Route.useParams();
	const [rx, setRx] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (id.startsWith("rx-")) {
			setRx(findPrescription(id) || null);
			setLoading(false);
			return;
		}
		const fetchPrescription = async () => {
			try {
				const data = await api.get(`/prescription/${id}`);
				const isAnalyzed = data.aiAnalysis && Object.keys(data.aiAnalysis).length > 0;
				const mappedMedicines = [];
				if (isAnalyzed && data.aiAnalysis.medicineName) mappedMedicines.push({
					id: data._id + "-med",
					name: data.aiAnalysis.medicineName,
					dosage: data.aiAnalysis.dosage || "As prescribed",
					frequency: data.aiAnalysis.frequency || "1-0-1",
					duration: data.aiAnalysis.duration || "N/A",
					purpose: data.aiAnalysis.purpose || "Medical Treatment",
					howToTake: data.aiAnalysis.beforeAfterFood || "As advised by doctor",
					timing: data.aiAnalysis.timing || "Anytime",
					sideEffects: data.aiAnalysis.possibleSideEffects || [],
					warnings: data.aiAnalysis.warnings || [],
					interactions: data.aiAnalysis.drugInteractions || [],
					alternatives: data.aiAnalysis.alternativeMedicines || [],
					description: `${data.aiAnalysis.genericName || data.aiAnalysis.medicineName} is used for ${data.aiAnalysis.purpose || "treatment"}.`,
					uses: [data.aiAnalysis.purpose || "Treatment"],
					benefits: ["Effective relief"],
					storage: "Store in a cool dry place.",
					pregnancy: "Consult doctor.",
					alcohol: "Avoid alcohol.",
					driving: "Consult doctor.",
					kidney: "Consult doctor.",
					liver: "Consult doctor.",
					foodInteractions: "No significant interaction.",
					prices: [
						{
							name: "Amazon Pharmacy",
							price: 120,
							availability: "In Stock",
							delivery: "2 days",
							url: "https://www.amazon.in/pharmacy",
							logoColor: "#FF9900"
						},
						{
							name: "Tata 1mg",
							price: 95,
							availability: "In Stock",
							delivery: "1 day",
							url: "https://www.1mg.com",
							logoColor: "#F97316"
						},
						{
							name: "PharmEasy",
							price: 102,
							availability: "In Stock",
							delivery: "2 days",
							url: "https://pharmeasy.in",
							logoColor: "#10B981"
						}
					]
				});
				setRx({
					id: data._id,
					doctor: data.aiAnalysis?.doctorNotes?.match(/Dr\.\s*[A-Za-z0-9_]+/)?.[0] || data.aiAnalysis?.doctorNotes || "Prescription Analysis",
					patient: data.aiAnalysis?.patientAdvice ? "Patient" : "Rahul Sharma",
					hospital: data.aiAnalysis?.doctorNotes?.includes("Hospital") ? data.aiAnalysis.doctorNotes : "MediScan AI Clinic",
					date: data.createdAt ? data.createdAt.split("T")[0] : "Recent",
					medicines: mappedMedicines
				});
			} catch (err) {
				toast.error("Failed to load prescription: " + err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchPrescription();
	}, [id]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-12 text-center text-muted-foreground flex flex-col items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }), "Loading prescription details..."]
	});
	if (!rx) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8 text-center text-muted-foreground",
		children: "Prescription not found."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/dashboard/history",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4 mr-1" }), " Back to history"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => toast.success("Shared"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-4 w-4 mr-1" }), " Share"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => toast.success("Downloaded"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4 mr-1" }), " Download"]
					})]
				})]
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
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "glass overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "gradient-hero p-6 text-primary-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							className: "bg-white/20 text-white border-0 mb-3",
							children: ["Prescription · ", rx.id.substring(rx.id.length - 6)]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stethoscope, { className: "h-4 w-4" }),
									label: "Doctor",
									value: rx.doctor
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" }),
									label: "Patient",
									value: rx.patient
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4" }),
									label: "Hospital",
									value: rx.hospital
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4" }),
									label: "Date",
									value: rx.date
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-4 text-xs text-muted-foreground",
						children: [
							"AI analysis complete · ",
							rx.medicines.length,
							" medicine",
							rx.medicines.length > 1 ? "s" : "",
							" identified. This is an AI-assisted summary, not medical advice."
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold mb-4",
				children: "Medicines"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [rx.medicines.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MedicineCard, {
					medicine: m,
					index: i
				}, m.id)), rx.medicines.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground italic col-span-2",
					children: "No medicines identified in this prescription."
				})]
			})] })
		]
	});
}
function Info({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-8 w-8 place-items-center rounded-lg bg-white/20",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] uppercase opacity-80",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-semibold truncate",
				children: value
			})]
		})]
	});
}
//#endregion
export { PrescriptionPage as component };
