import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.prescription._id-CIc5l6-9.js
var $$splitErrorComponentImporter = () => import("./dashboard.prescription._id-CCd5hDvA.mjs");
var $$splitNotFoundComponentImporter = () => import("./dashboard.prescription._id-DF1GV383.mjs");
var $$splitComponentImporter = () => import("./dashboard.prescription._id-Wi290mGO.mjs");
var Route = createFileRoute("/dashboard/prescription/$id")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
//#endregion
export { Route as t };
