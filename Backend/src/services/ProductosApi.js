const API = import.meta.env.VITE_API_PRODUCTOS || "http://localhost:8082";
const BASE = `${API}/api/productos`;

export async function crearProducto(payload) {
  const r = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error(await r.text() || `HTTP ${r.status}`);
  return r.json();
}

export async function listarProductos() {
  const r = await fetch(BASE);
  if (!r.ok) throw new Error(await r.text() || `HTTP ${r.status}`);
  return r.json();
}

export async function obtenerProducto(id) {
  const r = await fetch(`${BASE}/${id}`);
  if (!r.ok) throw new Error(await r.text() || `HTTP ${r.status}`);
  return r.json();
}

export async function actualizarProducto(id, payload) {
  const r = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error(await r.text() || `HTTP ${r.status}`);
  return r.json();
}

export async function eliminarProducto(id) {
  const r = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!r.ok) throw new Error(await r.text() || `HTTP ${r.status}`);
  return true;
}

export async function setStock(id, value) {
  const r = await fetch(`${BASE}/${id}/stock?value=${value}`, { method: "PATCH" });
  if (!r.ok) throw new Error(await r.text() || `HTTP ${r.status}`);
  return r.json();
}

export async function ajustarStock(id, delta) {
  const r = await fetch(`${BASE}/${id}/stock/ajustar?delta=${delta}`, { method: "PATCH" });
  if (!r.ok) throw new Error(await r.text() || `HTTP ${r.status}`);
  return r.json();
}
