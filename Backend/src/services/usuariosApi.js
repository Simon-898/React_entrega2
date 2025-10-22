const API = import.meta.env.VITE_API_URL || "http://localhost:8081";
const BASE = `${API}/api/usuarios`;

export async function crearUsuario(payload) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text() || `HTTP ${res.status}`);
  return res.json();
}
