import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { v as Search } from "../_libs/lucide-react.mjs";
import { i as medicines } from "./mock-data-BduAF806.mjs";
import { t as MedicineCard } from "./medicine-card-D_y010n6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.medicines-B4l-_tZS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MedicinesPage() {
	const [q, setQ] = (0, import_react.useState)("");
	const filtered = medicines.filter((m) => m.name.toLowerCase().includes(q.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl sm:text-3xl font-bold",
				children: "Medicine Library"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-sm",
				children: "Every medicine you've been prescribed, in one place."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Search medicine...",
					className: "pl-9 glass"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-2",
				children: filtered.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MedicineCard, {
					medicine: m,
					index: i
				}, m.id))
			})
		]
	});
}
//#endregion
export { MedicinesPage as component };
