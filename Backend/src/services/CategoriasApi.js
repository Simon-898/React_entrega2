const API = import.meta.env.VITE_API_PRODUCTOS || "http://localhost:8082";
const BASE = `${API}/api/categorias`;

export async function listarCategorias() {
  const r = await fetch(BASE);
  if (!r.ok) throw new Error(await r.text() || `HTTP ${r.status}`);
  return r.json();
}
