//#region node_modules/.nitro/vite/services/ssr/assets/api-DbbIhhGe.js
var safeLocalStorage = {
	getItem(key) {
		if (typeof window === "undefined") return null;
		return localStorage.getItem(key);
	},
	setItem(key, value) {
		if (typeof window === "undefined") return;
		localStorage.setItem(key, value);
	},
	removeItem(key) {
		if (typeof window === "undefined") return;
		localStorage.removeItem(key);
	}
};
var getHeaders = (isMultipart = false) => {
	const headers = {};
	if (!isMultipart) headers["Content-Type"] = "application/json";
	const token = safeLocalStorage.getItem("token");
	if (token) headers["Authorization"] = `Bearer ${token}`;
	return headers;
};
async function handleResponse(res) {
	if (!res.ok) {
		let errorMessage = "An error occurred";
		try {
			const errorJson = await res.json();
			errorMessage = errorJson.message || errorJson.errors?.[0] || errorMessage;
		} catch {}
		throw new Error(errorMessage);
	}
	return (await res.json()).data;
}
var getUrl = (path) => {
	return `/api${path}`;
};
var api = {
	async get(path) {
		return handleResponse(await fetch(getUrl(path), {
			method: "GET",
			headers: getHeaders()
		}));
	},
	async post(path, body) {
		return handleResponse(await fetch(getUrl(path), {
			method: "POST",
			headers: getHeaders(),
			body: JSON.stringify(body)
		}));
	},
	async delete(path) {
		return handleResponse(await fetch(getUrl(path), {
			method: "DELETE",
			headers: getHeaders()
		}));
	},
	async upload(path, file, fieldName = "prescription") {
		const formData = new FormData();
		formData.append(fieldName, file);
		return handleResponse(await fetch(getUrl(path), {
			method: "POST",
			headers: getHeaders(true),
			body: formData
		}));
	},
	setToken(token) {
		safeLocalStorage.setItem("token", token);
	},
	getToken() {
		return safeLocalStorage.getItem("token");
	},
	setUser(user) {
		safeLocalStorage.setItem("user", JSON.stringify(user));
	},
	getUser() {
		const userStr = safeLocalStorage.getItem("user");
		if (!userStr) return null;
		try {
			return JSON.parse(userStr);
		} catch {
			return null;
		}
	},
	logout() {
		safeLocalStorage.removeItem("token");
		safeLocalStorage.removeItem("user");
	}
};
//#endregion
export { api as t };
