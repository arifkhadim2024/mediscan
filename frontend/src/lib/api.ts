export interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export interface ApiSuccessResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const safeLocalStorage = {
  getItem(key: string): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
  },
  setItem(key: string, value: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value);
  },
  removeItem(key: string): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  }
};

const getHeaders = (isMultipart = false) => {
  const headers: Record<string, string> = {};
  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
  }
  const token = safeLocalStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let errorMessage = "An error occurred";
    try {
      const errorJson = await res.json();
      errorMessage = errorJson.message || errorJson.errors?.[0] || errorMessage;
    } catch {
      // ignore
    }
    throw new Error(errorMessage);
  }
  const payload = (await res.json()) as ApiSuccessResponse<T>;
  return payload.data;
}

const getUrl = (path: string) => {
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return `http://localhost:5001/api${path}`;
  }
  return `/api${path}`;
};

export const api = {
  async get<T>(path: string): Promise<T> {
    const res = await fetch(getUrl(path), {
      method: "GET",
      headers: getHeaders(),
    });
    return handleResponse<T>(res);
  },

  async post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(getUrl(path), {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    return handleResponse<T>(res);
  },

  async delete<T>(path: string): Promise<T> {
    const res = await fetch(getUrl(path), {
      method: "DELETE",
      headers: getHeaders(),
    });
    return handleResponse<T>(res);
  },

  async upload<T>(path: string, file: File, fieldName = "prescription"): Promise<T> {
    const formData = new FormData();
    formData.append(fieldName, file);
    const res = await fetch(getUrl(path), {
      method: "POST",
      headers: getHeaders(true),
      body: formData,
    });
    return handleResponse<T>(res);
  },

  setToken(token: string) {
    safeLocalStorage.setItem("token", token);
  },

  getToken(): string | null {
    return safeLocalStorage.getItem("token");
  },

  setUser(user: UserProfile) {
    safeLocalStorage.setItem("user", JSON.stringify(user));
  },

  getUser(): UserProfile | null {
    const userStr = safeLocalStorage.getItem("user");
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as UserProfile;
    } catch {
      return null;
    }
  },

  logout() {
    safeLocalStorage.removeItem("token");
    safeLocalStorage.removeItem("user");
  },
};