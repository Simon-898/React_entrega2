// src/pages/AdminProductos.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminProducto.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:8081";

export default function AdminProductos() {
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0,
      }),
    []
  );

  const cargarProductos = async () => {
    try {
      setCargando(true);
      setError("");

      const resp = await fetch(`${API}/api/productos`);
      if (!resp.ok) throw new Error("Error en la respuesta del servidor");

      const data = await resp.json();

      const normalizados = (Array.isArray(data) ? data : []).map((p) => {
        const cat = p.categoria || {};
        return {
          id: p.id,
          codigo:
            p.codigo ??
            (p.id != null ? `PRD-${String(p.id).padStart(4, "0")}` : "—"),
          nombre: p.nombre ?? "",
          descripcion: p.descripcion ?? "",
          precio: Number(p.precio) || 0,
          activo: p.activo === true || p.activo === "true",
          talla: p.talla ?? "",
          stock: p.stock ?? null,
          categoriaId: cat.id ?? p.categoria_id ?? null,
          categoriaNombre: cat.nombre ?? "",
        };
      });

      setProductos(normalizados);
    } catch (e) {
      console.error(e);
      setError("No se pudieron cargar los productos.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const onNew = () => navigate("/admin/productos/nuevo");
  const onEdit = (id) => navigate(`/admin/productos/${id}/editar`);

  const onDelete = async (id) => {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      const resp = await fetch(`${API}/api/productos/${id}`, { method: "DELETE" });
      if (!resp.ok) throw new Error("Error al eliminar");
      await cargarProductos();
    } catch (e) {
      console.error(e);
      alert("Error al eliminar el producto");
    }
  };

  const handleDesactivar = async (id, nombre) => {
    if (!confirm(`¿Estás seguro de desactivar el producto "${nombre}"?`)) return;
    try {
      const resp = await fetch(`${API}/api/productos/${id}/desactivar`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      if (!resp.ok) throw new Error("Error al desactivar");
      await resp.json();
      await cargarProductos();
      alert("Producto desactivado exitosamente");
    } catch (e) {
      console.error(e);
      alert("Error al desactivar el producto");
    }
  };

  return (
    <section className="admin-products">
      <div className="content-head">
        <h1>Productos</h1>
        <button className="btn-new" onClick={onNew}>Nuevo</button>
      </div>

      <div className="card">
        <div className="table-wrap">
          {error && <div className="empty">{error}</div>}
          {cargando ? (
            <div className="empty">Cargando…</div>
          ) : (
            <table className="tbl">
              <thead>
                <tr>
                  <th style={{ width: 120 }}>Código</th>
                  <th>Nombre</th>
                  <th style={{ width: 140 }}>Precio</th>
                  <th style={{ width: 100 }}>Stock</th>
                  <th style={{ width: 160 }}>Cat.</th>
                  <th style={{ width: 120 }}>Estado</th>
                  <th style={{ width: 220, textAlign: "center" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.codigo || "—"}</td>
                    <td>{p.nombre}</td>
                    <td>{formatter.format(p.precio ?? 0)}</td>
                    <td>{p.stock ?? "—"}</td>
                    <td>{p.categoriaNombre || "—"}</td>
                    <td>{p.activo ? "Activo" : "Inactivo"}</td>
                    <td className="actions">
                      <button className="btn-sm" onClick={() => onEdit(p.id)}>Editar</button>
                      <button className="btn-sm danger" onClick={() => onDelete(p.id)}>Eliminar</button>
                      {p.activo && (
                        <button className="btn-sm warn" onClick={() => handleDesactivar(p.id, p.nombre)}>
                          Desactivar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}

                {productos.length === 0 && !error && (
                  <tr>
                    <td colSpan={7} className="empty">Sin productos…</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
