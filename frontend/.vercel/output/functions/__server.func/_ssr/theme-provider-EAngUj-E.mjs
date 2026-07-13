import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-provider-EAngUj-E.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Ctx = (0, import_react.createContext)(null);
function ThemeProvider({ children }) {
	const [theme, setTheme] = (0, import_react.useState)("light");
	(0, import_react.useEffect)(() => {
		const stored = typeof window !== "undefined" && localStorage.getItem("mediscan-theme");
		const prefers = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
		setTheme(stored ?? (prefers ? "dark" : "light"));
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
		localStorage.setItem("mediscan-theme", theme);
	}, [theme]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value: {
			theme,
			setTheme,
			toggle: () => setTheme(theme === "dark" ? "light" : "dark")
		},
		children
	});
}
function useTheme() {
	const ctx = (0, import_react.useContext)(Ctx);
	if (!ctx) return {
		theme: "light",
		toggle: () => {},
		setTheme: () => {}
	};
	return ctx;
}
//#endregion
export { useTheme as n, ThemeProvider as t };
