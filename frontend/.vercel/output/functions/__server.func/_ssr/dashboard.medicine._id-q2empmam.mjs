import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.medicine._id-q2empmam.js
var $$splitErrorComponentImporter = () => import("./dashboard.medicine._id-B4KJzBbS.mjs");
var $$splitNotFoundComponentImporter = () => import("./dashboard.medicine._id-DvQDZOi4.mjs");
var $$splitComponentImporter = () => import("./dashboard.medicine._id-D0nyIvyH.mjs");
var Route = createFileRoute("/dashboard/medicine/$id")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
//#endregion
export { Route as t };
