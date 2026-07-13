import { o as __toESM } from "../_runtime.mjs";
import { t as api } from "./api-DbbIhhGe.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { $ as Activity, N as FileImage, R as CloudUpload, f as Sparkles, t as X } from "../_libs/lucide-react.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Card } from "./card-CGCM0s9z.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.upload-Ck-YgYOu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
}));
Progress.displayName = Root.displayName;
function LoadingSpinner({ label = "Loading..." }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center gap-4 p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			animate: { rotate: 360 },
			transition: {
				duration: 1.2,
				repeat: Infinity,
				ease: "linear"
			},
			className: "grid h-14 w-14 place-items-center rounded-full gradient-primary text-primary-foreground shadow-elegant",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-6 w-6" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm text-muted-foreground animate-pulse",
			children: label
		})]
	});
}
function UploadPage() {
	const [file, setFile] = (0, import_react.useState)(null);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [phase, setPhase] = (0, import_react.useState)("idle");
	const [dragOver, setDragOver] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	const navigate = useNavigate();
	const handleFile = async (f) => {
		if (!/(png|jpe?g|pdf)$/i.test(f.name)) {
			toast.error("Only JPG, PNG, or PDF");
			return;
		}
		setFile(f);
		setPhase("uploading");
		setProgress(15);
		try {
			setProgress(40);
			const uploadRes = await api.upload("/prescription/upload", f);
			setProgress(70);
			setPhase("analyzing");
			const analyzeRes = await api.post("/prescription/analyze", { prescriptionId: uploadRes.prescription._id });
			setProgress(100);
			toast.success("Analysis complete");
			navigate({
				to: "/dashboard/prescription/$id",
				params: { id: analyzeRes.prescription._id }
			});
		} catch (err) {
			toast.error(err.message || "Failed to process prescription");
			setPhase("idle");
			setFile(null);
			setProgress(0);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-3xl mx-auto space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl sm:text-3xl font-bold",
				children: "Upload Prescription"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-sm",
				children: "Drag & drop or select. Supported: JPG, PNG, PDF."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "glass",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onDragOver: (e) => {
						e.preventDefault();
						setDragOver(true);
					},
					onDragLeave: () => setDragOver(false),
					onDrop: (e) => {
						e.preventDefault();
						setDragOver(false);
						const f = e.dataTransfer.files?.[0];
						if (f) handleFile(f);
					},
					onClick: () => phase === "idle" && inputRef.current?.click(),
					className: `m-4 rounded-2xl border-2 border-dashed p-10 transition-all ${dragOver ? "border-primary bg-primary/5" : "border-border"} ${phase === "idle" ? "cursor-pointer hover:border-primary hover:bg-primary/5" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						type: "file",
						accept: "image/png,image/jpeg,application/pdf",
						className: "hidden",
						onChange: (e) => {
							const f = e.target.files?.[0];
							if (f) handleFile(f);
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, {
						mode: "wait",
						children: [
							phase === "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: { opacity: 0 },
								animate: { opacity: 1 },
								exit: { opacity: 0 },
								className: "text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mx-auto grid h-16 w-16 place-items-center rounded-full gradient-primary text-primary-foreground shadow-elegant",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-7 w-7" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-4 font-semibold text-lg",
										children: "Drop your prescription here"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground mt-1",
										children: "or click to browse from your device"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex justify-center gap-2 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "px-2 py-1 rounded bg-muted",
												children: "JPG"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "px-2 py-1 rounded bg-muted",
												children: "PNG"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "px-2 py-1 rounded bg-muted",
												children: "PDF"
											})
										]
									})
								]
							}, "idle"),
							phase === "uploading" && file && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: { opacity: 0 },
								animate: { opacity: 1 },
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid h-12 w-12 place-items-center rounded-xl gradient-primary text-primary-foreground",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileImage, { className: "h-5 w-5" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0 flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-semibold truncate",
													children: file.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-xs text-muted-foreground",
													children: [(file.size / 1024).toFixed(0), " KB"]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "icon",
												onClick: (e) => {
													e.stopPropagation();
													setFile(null);
													setPhase("idle");
												},
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: progress }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground text-center",
										children: [
											"Uploading... ",
											progress,
											"%"
										]
									})
								]
							}, "up"),
							phase === "analyzing" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: { opacity: 0 },
								animate: { opacity: 1 },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSpinner, { label: "Analyzing Prescription..." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center text-xs text-muted-foreground flex items-center justify-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), " Extracting medicines, dosages, and warnings"]
								})]
							}, "an")
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-3 text-sm",
				children: [
					"End-to-end encrypted",
					"OCR + AI powered",
					"Results in ~10s"
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "glass rounded-xl p-3 text-center",
					children: t
				}, t))
			})
		]
	});
}
//#endregion
export { UploadPage as component };
