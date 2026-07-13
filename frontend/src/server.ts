import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { createApp, createRouter, defineEventHandler, readBody, getQuery, createError, readMultipartFormData, toWebHandler } from "h3";
import { registerUser, loginUser } from "./backend/services/authService.js";
import { uploadPrescription, analyzePrescription, getPrescriptionHistory, deletePrescription, getMedicinePrices } from "./backend/services/prescriptionService.js";
import { supabase } from "./backend/config/supabase.js";

// Setup a pure H3 app and router to handle the API endpoints natively
const apiApp = createApp({
  onError(error, event) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal server error';
    
    event.node.res.statusCode = statusCode;
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.end(JSON.stringify({
      success: false,
      message,
      errors: [message],
    }));
  }
});
const apiRouter = createRouter();

// Helper to authenticate request using Supabase auth token
async function getAuthUser(event: any) {
  const authHeader = event.node.req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Authentication token missing" });
  }
  
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    throw createError({ statusCode: 401, statusMessage: error?.message || "Invalid or expired token" });
  }
  
  return {
    _id: user.id,
    id: user.id,
    email: user.email,
    name: user.user_metadata?.name || 'User',
  };
}

// Auth API endpoints
apiRouter.post("/api/auth/register", defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = await registerUser(body);
  return { success: true, message: "User registered successfully", data: result };
}));

apiRouter.post("/api/auth/login", defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = await loginUser(body);
  return { success: true, message: "Login successful", data: result };
}));

apiRouter.get("/api/auth/profile", defineEventHandler(async (event) => {
  const user = await getAuthUser(event);
  return { success: true, message: "Profile fetched successfully", data: { user } };
}));

// Prescription API endpoints
apiRouter.post("/api/prescription/upload", defineEventHandler(async (event) => {
  const user = await getAuthUser(event);
  const parts = await readMultipartFormData(event);
  const filePart = parts?.find(p => p.name === "prescription");
  
  if (!filePart) {
    throw createError({ statusCode: 400, statusMessage: "No file uploaded" });
  }
  
  const file = {
    originalname: filePart.filename,
    mimetype: filePart.type,
    buffer: filePart.data
  };
  
  const result = await uploadPrescription({ userId: user._id, file });
  return { success: true, message: "Prescription uploaded successfully", data: result };
}));

apiRouter.post("/api/prescription/analyze", defineEventHandler(async (event) => {
  const user = await getAuthUser(event);
  const body = await readBody(event);
  const result = await analyzePrescription({ prescriptionId: body.prescriptionId, userId: user._id });
  return { success: true, message: "Prescription analyzed successfully", data: result };
}));

apiRouter.get("/api/prescription/history", defineEventHandler(async (event) => {
  const user = await getAuthUser(event);
  const result = await getPrescriptionHistory(user._id);
  return { success: true, message: "Prescription history fetched successfully", data: result };
}));

apiRouter.delete("/api/prescription/:id", defineEventHandler(async (event) => {
  const user = await getAuthUser(event);
  const id = event.context.params?.id;
  const result = await deletePrescription({ prescriptionId: id, userId: user._id });
  return { success: true, message: "Prescription deleted successfully", data: result };
}));

// Medicine API endpoints
apiRouter.get("/api/medicine/prices", defineEventHandler(async (event) => {
  const query = getQuery(event);
  const medicine = query.medicine as string || "Aspirin";
  const result = await getMedicinePrices(medicine);
  return { success: true, message: "Medicine price comparison fetched successfully", data: result };
}));

apiApp.use(apiRouter);
const apiHandler = toWebHandler(apiApp);

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const url = new URL(request.url);
    
    // Intercept any requests to /api and process them using the Express backend
    if (url.pathname.startsWith("/api")) {
      try {
        return await apiHandler(request, env, ctx);
      } catch (err: any) {
        console.error("API handler error:", err);
        return new Response(JSON.stringify({
          error: true,
          message: err.message || "Internal Server Error"
        }), {
          status: 500,
          headers: { "content-type": "application/json" }
        });
      }
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
