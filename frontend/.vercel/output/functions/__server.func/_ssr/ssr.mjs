import { o as __toESM } from "../_runtime.mjs";
import { a as createRouter$1, c as getHeader, d as readMultipartFormData, f as setResponseHeader, h as toWebHandler, i as createError, l as getQuery, o as defineEventHandler, p as setResponseStatus, r as createApp, u as readBody } from "../_libs/h3+rou3+srvx.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { t as require_main } from "../_libs/dotenv.mjs";
import { t as axios } from "../_libs/axios+[...].mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import os from "node:os";
//#region node_modules/.nitro/vite/services/ssr/index.js
var import_main = /* @__PURE__ */ __toESM(require_main());
var lastCapturedError;
var TTL_MS = 5e3;
function record(error) {
	lastCapturedError = {
		error,
		at: Date.now()
	};
}
if (typeof globalThis.addEventListener === "function") {
	globalThis.addEventListener("error", (event) => record(event.error ?? event));
	globalThis.addEventListener("unhandledrejection", (event) => record(event.reason));
}
function consumeLastCapturedError() {
	if (!lastCapturedError) return void 0;
	if (Date.now() - lastCapturedError.at > TTL_MS) {
		lastCapturedError = void 0;
		return;
	}
	const { error } = lastCapturedError;
	lastCapturedError = void 0;
	return error;
}
function renderErrorPage() {
	return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
import_main.default.config();
var isConfigured = process.env.SUPABASE_URL && process.env.SUPABASE_URL.startsWith("http") && (process.env.SUPABASE_KEY || process.env.SUPERBASE_SECRET_KEY || process.env.SUPABASE_SECRET_KEY);
if (!isConfigured) console.warn("\n⚠️  [MediScan Warning]: SUPABASE_URL is not configured yet! Please edit backend/.env to add your actual Supabase URL.\n");
var supabase = createClient(isConfigured ? process.env.SUPABASE_URL : "https://placeholder-project-id.supabase.co", isConfigured ? process.env.SUPERBASE_SECRET_KEY || process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_KEY : "placeholder-anon-key");
var registerUser = async ({ name, email, password }) => {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: { data: { name } }
	});
	if (error) {
		const err = new Error(error.message);
		err.statusCode = error.status || 400;
		throw err;
	}
	return {
		user: {
			id: data.user.id,
			name: data.user.user_metadata?.name || name,
			email: data.user.email,
			createdAt: data.user.created_at
		},
		token: data.session?.access_token || ""
	};
};
var loginUser = async ({ email, password }) => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	});
	if (error) {
		const err = new Error(error.message);
		err.statusCode = error.status || 401;
		throw err;
	}
	return {
		user: {
			id: data.user.id,
			name: data.user.user_metadata?.name || "User",
			email: data.user.email,
			createdAt: data.user.created_at
		},
		token: data.session?.access_token || ""
	};
};
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var uploadDir = process.env.VERCEL ? path.join(os.tmpdir(), "uploads") : path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
var uploadPrescription = async ({ userId, file }) => {
	if (!file) {
		const error = /* @__PURE__ */ new Error("No file uploaded");
		error.statusCode = 400;
		throw error;
	}
	if (![
		"image/jpeg",
		"image/png",
		"image/jpg",
		"application/pdf"
	].includes(file.mimetype)) {
		const error = /* @__PURE__ */ new Error("Invalid image type");
		error.statusCode = 400;
		throw error;
	}
	const filename = `${Date.now()}-${file.originalname}`;
	const filePath = path.join(uploadDir, filename);
	fs.writeFileSync(filePath, file.buffer);
	const extractedText = await extractOCRText(filePath, file.mimetype);
	const { data, error } = await supabase.from("prescriptions").insert({
		user_id: userId,
		file_name: filename,
		file_path: `/uploads/${filename}`,
		file_type: file.mimetype,
		ocr_text: extractedText
	}).select().single();
	if (error) {
		const err = new Error(error.message);
		err.statusCode = 400;
		throw err;
	}
	return {
		prescription: {
			...data,
			_id: data.id,
			filePath: data.file_path,
			fileType: data.file_type,
			fileName: data.file_name,
			ocrText: data.ocr_text,
			aiAnalysis: data.ai_analysis,
			createdAt: data.created_at
		},
		ocrText: extractedText
	};
};
var analyzePrescription = async ({ prescriptionId, userId }) => {
	const { data: prescription, error } = await supabase.from("prescriptions").select("*").eq("id", prescriptionId).eq("user_id", userId).single();
	if (error || !prescription) {
		const err = /* @__PURE__ */ new Error("Prescription not found");
		err.statusCode = 404;
		throw err;
	}
	if (!prescription.ocr_text) {
		const err = /* @__PURE__ */ new Error("OCR text is missing");
		err.statusCode = 400;
		throw err;
	}
	let analysis;
	if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "your_gemini_api_key_here") analysis = await callGemini(prescription.ocr_text);
	else analysis = await callOpenAI(prescription.ocr_text);
	const { data: updated, error: updateError } = await supabase.from("prescriptions").update({ ai_analysis: analysis }).eq("id", prescriptionId).eq("user_id", userId).select().single();
	if (updateError) {
		const err = new Error(updateError.message);
		err.statusCode = 400;
		throw err;
	}
	return {
		prescription: {
			...updated,
			_id: updated.id,
			filePath: updated.file_path,
			fileType: updated.file_type,
			fileName: updated.file_name,
			ocrText: updated.ocr_text,
			aiAnalysis: updated.ai_analysis,
			createdAt: updated.created_at
		},
		analysis
	};
};
var getPrescriptionHistory = async (userId) => {
	const { data, error } = await supabase.from("prescriptions").select("*").eq("user_id", userId).order("created_at", { ascending: false });
	if (error) throw error;
	return (data || []).map((p) => ({
		...p,
		_id: p.id,
		filePath: p.file_path,
		fileType: p.file_type,
		fileName: p.file_name,
		ocrText: p.ocr_text,
		aiAnalysis: p.ai_analysis,
		createdAt: p.created_at
	}));
};
var getPrescriptionById = async ({ prescriptionId, userId }) => {
	const { data, error } = await supabase.from("prescriptions").select("*").eq("id", prescriptionId).eq("user_id", userId).single();
	if (error || !data) {
		const err = /* @__PURE__ */ new Error("Prescription not found");
		err.statusCode = 404;
		throw err;
	}
	return {
		...data,
		_id: data.id,
		filePath: data.file_path,
		fileType: data.file_type,
		fileName: data.file_name,
		ocrText: data.ocr_text,
		aiAnalysis: data.ai_analysis,
		createdAt: data.created_at
	};
};
var deletePrescription = async ({ prescriptionId, userId }) => {
	const { data: prescription, error } = await supabase.from("prescriptions").select("*").eq("id", prescriptionId).eq("user_id", userId).single();
	if (error || !prescription) {
		const err = /* @__PURE__ */ new Error("Prescription not found");
		err.statusCode = 404;
		throw err;
	}
	const { error: deleteError } = await supabase.from("prescriptions").delete().eq("id", prescriptionId).eq("user_id", userId);
	if (deleteError) throw deleteError;
	const fullPath = path.join(uploadDir, path.basename(prescription.file_path));
	if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
	return {
		...prescription,
		_id: prescription.id,
		filePath: prescription.file_path,
		fileType: prescription.file_type,
		fileName: prescription.file_name,
		ocrText: prescription.ocr_text,
		aiAnalysis: prescription.ai_analysis,
		createdAt: prescription.created_at
	};
};
var extractOCRText = async (filePath, mimetype) => {
	try {
		if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "your_gemini_api_key_here") return await callGeminiOCR(filePath, mimetype);
		return await simulateOCR(filePath, mimetype);
	} catch (error) {
		const err = /* @__PURE__ */ new Error("OCR failed");
		err.statusCode = 422;
		throw err;
	}
};
var callGeminiOCR = async (filePath, mimetype) => {
	try {
		const base64Data = fs.readFileSync(filePath).toString("base64");
		let normalizedMimeType = mimetype;
		if (mimetype === "image/jpg") normalizedMimeType = "image/jpeg";
		return ((await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`, { contents: [{ parts: [{ text: "Extract all text from this prescription image or document. Output only the extracted text. If there is no text or it is not a prescription, output an empty string." }, { inlineData: {
			mimeType: normalizedMimeType,
			data: base64Data
		} }] }] })).data.candidates?.[0]?.content?.parts?.[0]?.text || "").trim();
	} catch (error) {
		console.error("Gemini OCR Error:", error.response?.data || error.message);
		throw error;
	}
};
var simulateOCR = async (filePath, mimetype) => {
	const sampleText = [
		"Dr. Jane Smith",
		"Prescription for Amitriptyline",
		"Take 1 tablet twice daily after food",
		"Duration: 10 days",
		"Avoid alcohol"
	];
	if (mimetype === "application/pdf") return sampleText.join("\n");
	return sampleText.join("\n");
};
var callGemini = async (ocrText) => {
	try {
		const content = (await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`, {
			contents: [{ parts: [{ text: `Analyze this prescription text and return structured JSON: ${ocrText}` }] }],
			systemInstruction: { parts: [{ text: "You are a medical analysis assistant. Return clean JSON matching this schema: {\"medicineName\":\"...\",\"genericName\":\"...\",\"purpose\":\"...\",\"dosage\":\"...\",\"frequency\":\"...\",\"timing\":\"...\",\"beforeAfterFood\":\"...\",\"duration\":\"...\",\"possibleSideEffects\":[],\"warnings\":[],\"drugInteractions\":[],\"alternativeMedicines\":[],\"doctorNotes\":\"...\",\"patientAdvice\":\"...\",\"confidenceScore\":0.0}" }] },
			generationConfig: {
				responseMimeType: "application/json",
				temperature: .2
			}
		})).data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
		return JSON.parse(content);
	} catch (error) {
		console.error("Gemini API Error:", error.response?.data || error.message);
		const err = /* @__PURE__ */ new Error("Gemini analysis failed");
		err.statusCode = 502;
		throw err;
	}
};
var callOpenAI = async (ocrText) => {
	try {
		const content = (await axios.post("https://api.openai.com/v1/chat/completions", {
			model: "gpt-4o-mini",
			messages: [{
				role: "system",
				content: "You are a medical analysis assistant. Return clean JSON only. No markdown. Use the following structure: {\"medicineName\":\"...\",\"genericName\":\"...\",\"purpose\":\"...\",\"dosage\":\"...\",\"frequency\":\"...\",\"timing\":\"...\",\"beforeAfterFood\":\"...\",\"duration\":\"...\",\"possibleSideEffects\":[],\"warnings\":[],\"drugInteractions\":[],\"alternativeMedicines\":[],\"doctorNotes\":\"...\",\"patientAdvice\":\"...\",\"confidenceScore\":0.0}"
			}, {
				role: "user",
				content: `Analyze this prescription text and return structured JSON: ${ocrText}`
			}],
			temperature: .2
		}, { headers: {
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
			"Content-Type": "application/json"
		} })).data.choices?.[0]?.message?.content || "{}";
		return JSON.parse(content);
	} catch (error) {
		const err = /* @__PURE__ */ new Error("OpenAI analysis failed");
		err.statusCode = 502;
		throw err;
	}
};
var getMedicinePrices = async (medicineName) => {
	return {
		medicine: medicineName || "Sample Medicine",
		lowestPrice: "$8.00",
		amazon: "$10.00",
		netmeds: "$9.00",
		pharmEasy: "$8.50",
		apolloPharmacy: "$9.50",
		tata1mg: "$8.20",
		purchaseLink: "https://example.com/medicine"
	};
};
var apiApp = createApp({ onError(error, event) {
	const statusCode = error.statusCode || 500;
	const message = error.message || "Internal server error";
	setResponseStatus(event, statusCode);
	setResponseHeader(event, "Content-Type", "application/json");
	return {
		success: false,
		message,
		errors: [message]
	};
} });
var apiRouter = createRouter$1();
async function getAuthUser(event) {
	const authHeader = getHeader(event, "authorization");
	const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
	if (!token) throw createError({
		statusCode: 401,
		statusMessage: "Authentication token missing"
	});
	const { data: { user }, error } = await supabase.auth.getUser(token);
	if (error || !user) throw createError({
		statusCode: 401,
		statusMessage: error?.message || "Invalid or expired token"
	});
	return {
		_id: user.id,
		id: user.id,
		email: user.email,
		name: user.user_metadata?.name || "User"
	};
}
apiRouter.post("/api/auth/register", defineEventHandler(async (event) => {
	return {
		success: true,
		message: "User registered successfully",
		data: await registerUser(await readBody(event))
	};
}));
apiRouter.post("/api/auth/login", defineEventHandler(async (event) => {
	return {
		success: true,
		message: "Login successful",
		data: await loginUser(await readBody(event))
	};
}));
apiRouter.get("/api/auth/profile", defineEventHandler(async (event) => {
	return {
		success: true,
		message: "Profile fetched successfully",
		data: { user: await getAuthUser(event) }
	};
}));
apiRouter.post("/api/prescription/upload", defineEventHandler(async (event) => {
	const user = await getAuthUser(event);
	const filePart = (await readMultipartFormData(event))?.find((p) => p.name === "prescription");
	if (!filePart) throw createError({
		statusCode: 400,
		statusMessage: "No file uploaded"
	});
	const file = {
		originalname: filePart.filename,
		mimetype: filePart.type,
		buffer: filePart.data
	};
	return {
		success: true,
		message: "Prescription uploaded successfully",
		data: await uploadPrescription({
			userId: user._id,
			file
		})
	};
}));
apiRouter.post("/api/prescription/analyze", defineEventHandler(async (event) => {
	const user = await getAuthUser(event);
	return {
		success: true,
		message: "Prescription analyzed successfully",
		data: await analyzePrescription({
			prescriptionId: (await readBody(event)).prescriptionId,
			userId: user._id
		})
	};
}));
apiRouter.get("/api/prescription/history", defineEventHandler(async (event) => {
	return {
		success: true,
		message: "Prescription history fetched successfully",
		data: await getPrescriptionHistory((await getAuthUser(event))._id)
	};
}));
apiRouter.delete("/api/prescription/:id", defineEventHandler(async (event) => {
	const user = await getAuthUser(event);
	const id = event.context.params?.id;
	return {
		success: true,
		message: "Prescription deleted successfully",
		data: await deletePrescription({
			prescriptionId: id,
			userId: user._id
		})
	};
}));
apiRouter.get("/api/prescription/:id", defineEventHandler(async (event) => {
	const user = await getAuthUser(event);
	const id = event.context.params?.id;
	return {
		success: true,
		message: "Prescription fetched successfully",
		data: await getPrescriptionById({
			prescriptionId: id,
			userId: user._id
		})
	};
}));
apiRouter.get("/api/medicine/prices", defineEventHandler(async (event) => {
	return {
		success: true,
		message: "Medicine price comparison fetched successfully",
		data: await getMedicinePrices(getQuery(event).medicine || "Aspirin")
	};
}));
apiApp.use(apiRouter);
var apiHandler = toWebHandler(apiApp);
var serverEntryPromise;
async function getServerEntry() {
	if (!serverEntryPromise) serverEntryPromise = import("./server-LofORQCp.mjs").then((m) => m.default ?? m);
	return serverEntryPromise;
}
async function normalizeCatastrophicSsrResponse(response) {
	if (response.status < 500) return response;
	if (!(response.headers.get("content-type") ?? "").includes("application/json")) return response;
	const body = await response.clone().text();
	if (!isH3SwallowedErrorBody(body)) return response;
	console.error(consumeLastCapturedError() ?? /* @__PURE__ */ new Error(`h3 swallowed SSR error: ${body}`));
	return new Response(renderErrorPage(), {
		status: 500,
		headers: { "content-type": "text/html; charset=utf-8" }
	});
}
function isH3SwallowedErrorBody(body) {
	try {
		const payload = JSON.parse(body);
		return payload.unhandled === true && payload.message === "HTTPError";
	} catch {
		return false;
	}
}
var server_default = { async fetch(request, env, ctx) {
	if (new URL(request.url).pathname.startsWith("/api")) try {
		return await apiHandler(request, env, ctx);
	} catch (err) {
		console.error("API handler error:", err);
		return new Response(JSON.stringify({
			error: true,
			message: err.message || "Internal Server Error"
		}), {
			status: 500,
			headers: { "content-type": "application/json" }
		});
	}
	try {
		return await normalizeCatastrophicSsrResponse(await (await getServerEntry()).fetch(request, env, ctx));
	} catch (error) {
		console.error(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
} };
//#endregion
export { server_default as default, renderErrorPage as t };
