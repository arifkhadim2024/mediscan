import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.prices-DRGOWLQZ.js
var $$splitComponentImporter = () => import("./dashboard.prices-D3PV5OFN.mjs");
var pricesSearchSchema = objectType({ medicineId: stringType().optional() });
var Route = createFileRoute("/dashboard/prices")({
	validateSearch: (search) => pricesSearchSchema.parse(search),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
