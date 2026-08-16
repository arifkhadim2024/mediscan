import { t as api } from "./api-DbbIhhGe.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as ThemeProvider } from "./theme-provider-EAngUj-E.mjs";
import { A as redirect, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$13 } from "./dashboard.medicine._id-q2empmam.mjs";
import { t as Route$14 } from "./dashboard.prescription._id-CIc5l6-9.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-KIotbgU6.js
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BtdAHMgE.css";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$12 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "MediScan AI — Understand Your Prescription with AI" },
			{
				name: "description",
				content: "Upload your doctor's prescription and let AI explain every medicine, dosage, side effects, and compare prices across trusted pharmacies."
			},
			{
				name: "author",
				content: "MediScan AI"
			},
			{
				property: "og:title",
				content: "MediScan AI — Understand Your Prescription with AI"
			},
			{
				property: "og:description",
				content: "AI-powered prescription analysis and medicine price comparison across trusted online pharmacies."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "MediScan AI — Understand Your Prescription with AI"
			},
			{
				name: "description",
				content: "Upload your doctor's prescription and let AI explain every medicine, dosage, side effects, and compare prices across trusted pharmacies."
			},
			{
				property: "og:description",
				content: "Upload your doctor's prescription and let AI explain every medicine, dosage, side effects, and compare prices across trusted pharmacies."
			},
			{
				name: "twitter:description",
				content: "Upload your doctor's prescription and let AI explain every medicine, dosage, side effects, and compare prices across trusted pharmacies."
			},
			{
				property: "og:image",
				content: "https://storage.googleapis.com/gpt-engineer-file-uploads/n7agr71jQ1UHpG3jLcC7Vao1JlR2/social-images/social-1783251202628-mediscan.webp"
			},
			{
				name: "twitter:image",
				content: "https://storage.googleapis.com/gpt-engineer-file-uploads/n7agr71jQ1UHpG3jLcC7Vao1JlR2/social-images/social-1783251202628-mediscan.webp"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			href: "/favicon.ico",
			type: "image/x-icon"
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$12.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThemeProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			richColors: true,
			position: "top-right"
		})] })
	});
}
var $$splitComponentImporter$11 = () => import("./register-DLSGkkxn.mjs");
var Route$11 = createFileRoute("/register")({
	head: () => ({ meta: [{ title: "Create account · MediScan AI" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./login-ACKNuLQ1.mjs");
var Route$10 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Login · MediScan AI" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./forgot-password-DLPwcYp5.mjs");
var Route$9 = createFileRoute("/forgot-password")({
	head: () => ({ meta: [{ title: "Forgot password · MediScan AI" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./dashboard-C1ksNTN-.mjs");
var Route$8 = createFileRoute("/dashboard")({
	beforeLoad: () => {
		if (typeof window !== "undefined" && !api.getToken()) throw redirect({ to: "/login" });
	},
	head: () => ({ meta: [{ title: "Dashboard · MediScan AI" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./routes-Ca91VBaQ.mjs");
var Route$7 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./dashboard.index-CuzbLCAy.mjs");
var Route$6 = createFileRoute("/dashboard/")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./dashboard.upload-Ck-YgYOu.mjs");
var Route$5 = createFileRoute("/dashboard/upload")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./dashboard.settings-BnE39o-G.mjs");
var Route$4 = createFileRoute("/dashboard/settings")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./dashboard.prices-_hS8nAul.mjs");
var Route$3 = createFileRoute("/dashboard/prices")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./dashboard.medicines-B4l-_tZS.mjs");
var Route$2 = createFileRoute("/dashboard/medicines")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./dashboard.history-Bvwr5icO.mjs");
var Route$1 = createFileRoute("/dashboard/history")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./dashboard.assistant-BJ8NIO3N.mjs");
var Route = createFileRoute("/dashboard/assistant")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var RegisterRoute = Route$11.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$12
});
var LoginRoute = Route$10.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$12
});
var ForgotPasswordRoute = Route$9.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$12
});
var DashboardRoute = Route$8.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$12
});
var IndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$12
});
var DashboardIndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => DashboardRoute
});
var DashboardUploadRoute = Route$5.update({
	id: "/upload",
	path: "/upload",
	getParentRoute: () => DashboardRoute
});
var DashboardSettingsRoute = Route$4.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => DashboardRoute
});
var DashboardPricesRoute = Route$3.update({
	id: "/prices",
	path: "/prices",
	getParentRoute: () => DashboardRoute
});
var DashboardMedicinesRoute = Route$2.update({
	id: "/medicines",
	path: "/medicines",
	getParentRoute: () => DashboardRoute
});
var DashboardHistoryRoute = Route$1.update({
	id: "/history",
	path: "/history",
	getParentRoute: () => DashboardRoute
});
var DashboardAssistantRoute = Route.update({
	id: "/assistant",
	path: "/assistant",
	getParentRoute: () => DashboardRoute
});
var DashboardPrescriptionIdRoute = Route$14.update({
	id: "/prescription/$id",
	path: "/prescription/$id",
	getParentRoute: () => DashboardRoute
});
var DashboardRouteChildren = {
	DashboardAssistantRoute,
	DashboardHistoryRoute,
	DashboardMedicinesRoute,
	DashboardPricesRoute,
	DashboardSettingsRoute,
	DashboardUploadRoute,
	DashboardIndexRoute,
	DashboardMedicineIdRoute: Route$13.update({
		id: "/medicine/$id",
		path: "/medicine/$id",
		getParentRoute: () => DashboardRoute
	}),
	DashboardPrescriptionIdRoute
};
var rootRouteChildren = {
	IndexRoute,
	DashboardRoute: DashboardRoute._addFileChildren(DashboardRouteChildren),
	ForgotPasswordRoute,
	LoginRoute,
	RegisterRoute
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
