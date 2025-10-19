// src/lib/http.js
const BASE = import.meta.env.VITE_API_BASE || "http://localhost:8081";

async function request(path, { method = "GET", body, headers } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json", ...(headers || {}) },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",                // <- cookies JSESSIONID
  });

  // intenta parsear JSON siempre que haya content
  const contentType = res.headers.get("content-type") || "";
  const hasJson = contentType.includes("application/json");
  const data = hasJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    const msg =
      (data && (data.message || data.error || data.detail)) ||
      `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

export const http = {
  get: (p) => request(p),
  post: (p, b) => request(p, { method: "POST", body: b }),
  put: (p, b) => request(p, { method: "PUT", body: b }),
  del: (p) => request(p, { method: "DELETE" }),
};
