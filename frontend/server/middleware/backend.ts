import { fromNodeMiddleware, defineEventHandler } from "h3";
import app from "../../../backend/src/app.js";

const handler = fromNodeMiddleware(app);

export default defineEventHandler((event) => {
  const url = event.node.req.url || "";
  if (url.startsWith("/api")) {
    return handler(event);
  }
});
