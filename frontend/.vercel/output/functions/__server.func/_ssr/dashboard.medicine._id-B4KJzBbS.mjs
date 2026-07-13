import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.medicine._id-B4KJzBbS.js
var import_jsx_runtime = require_jsx_runtime();
var SplitErrorComponent = ({ reset }) => {
	const r = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Something went wrong." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: () => {
				r.invalidate();
				reset();
			},
			children: "Retry"
		})]
	});
};
//#endregion
export { SplitErrorComponent as errorComponent };
