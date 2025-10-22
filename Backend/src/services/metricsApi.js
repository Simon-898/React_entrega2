
const API_USUARIOS = import.meta.env.VITE_API_USUARIOS || "http://localhost:8081";
const API_PRODUCTOS = import.meta.env.VITE_API_PRODUCTOS || "http://localhost:8082";

export async function contarUsuarios() {
  const res = await fetch(`${API_USUARIOS}/api/usuarios`);
  if (!res.ok) throw new Error(await res.text() || `HTTP ${res.status} (usuarios)`);
  const data = await res.json();
  return Array.isArray(data) ? data.length : (data?.total ?? 0);
}

export async function contarProductos() {
  const res = await fetch(`${API_PRODUCTOS}/api/productos`);
  if (!res.ok) throw new Error(await res.text() || `HTTP ${res.status} (productos)`);
  const data = await res.json();
  return Array.isArray(data) ? data.length : (data?.total ?? 0);
}

export async function obtenerKPIs() {
  const [u, p] = await Promise.all([contarUsuarios(), contarProductos()]);
  return { usuarios: u, productos: p };
}
