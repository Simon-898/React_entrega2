// src/pages/AdminProductos.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminProducto.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:8082";

export default function AdminProductos() {
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const clp = useMemo(
    () =>
      new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0,
      }),
    []
  );

  async function cargarProductos() {
    try {
      setCargando(true);
      setError("");

      const resp = await fetch(`${API}/api/productos?ts=${Date.now()}`);
      if (!resp.ok) throw new Error((await resp.text()) || "Error al listar productos");
      const data = await resp.json();

      const normalizados = (Array.isArray(data) ? data : []).map((p) => {
        const cat = p.categoria || {};
        const stockNum =
          p.stock == null
            ? 0
            : Number.isFinite(p.stock)
            ? Number(p.stock)
            : parseInt(String(p.stock), 10) || 0;

        return {
          id: p.id,
          codigo: p.codigo ?? (p.id != null ? `PRD-${String(p.id).padStart(4, "0")}` : "—"),
          nombre: p.nombre ?? "",
          descripcion: p.descripcion ?? "",
          precio: Number(p.precio) || 0,
          activo: p.activo === true || p.activo === "true",
          talla: p.talla ?? "",
          stock: stockNum,
          imageUrl: p.imageUrl ?? p.image_url ?? "",
          categoriaId: cat.id ?? p.categoria_id ?? null,
          categoriaNombre: cat.nombre ?? "",
        };
      });

      setProductos(normalizados);
    } catch (e) {
      console.error(e);
      setError(e.message || "No se pudieron cargar los productos.");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarProductos();
  }, []);

  const onNew = () => navigate("/admin/productos/nuevo");
  const onEdit = (id) => navigate(`/admin/productos/${id}/editar`);

  async function onDelete(id) {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      const resp = await fetch(`${API}/api/productos/${id}`, { method: "DELETE" });
      if (!resp.ok) throw new Error((await resp.text()) || "Error al eliminar");
      await cargarProductos();
    } catch (e) {
      console.error(e);
      alert(e.message || "Error al eliminar el producto");
    }
  }

  async function handleDesactivar(id, nombre) {
    if (!confirm(`¿Desactivar el producto "${nombre}"?`)) return;
    try {
      const resp = await fetch(`${API}/api/productos/${id}/desactivar`, { method: "PATCH" });
      if (!resp.ok) throw new Error((await resp.text()) || "Error al desactivar");
      await cargarProductos();
      alert("Producto desactivado");
    } catch (e) {
      console.error(e);
      alert(e.message || "Error al desactivar el producto");
    }
  }

  async function handleStockDelta(id, delta) {
    try {
      const resp = await fetch(`${API}/api/productos/${id}/stock/ajustar?delta=${delta}`, {
        method: "PATCH",
      });
      if (!resp.ok) throw new Error((await resp.text()) || "Error al ajustar stock");
      await cargarProductos();
    } catch (e) {
      console.error(e);
      alert(e.message || "No se pudo ajustar el stock");
    }
  }

  return (
    <section className="admin-products">
      <div className="content-head">
        <h1>Productos</h1>
        <button className="btn-new" onClick={onNew}>
          Nuevo
        </button>
      </div>

      <div className="card">
        <div className="table-wrap">
          {error && <div className="empty">{error}</div>}

          {!error && (
            <div style={{ padding: "8px 12px", display: "flex", gap: 14, alignItems: "center" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13,
                  color: "#b00020",
                }}
                title="Productos con stock por debajo de 5"
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: "#ffd6db",
                    display: "inline-block",
                    border: "1px solid #b00020",
                  }}
                />
                Stock crítico &lt; 5
              </span>
            </div>
          )}

          {cargando ? (
            <div className="empty">Cargando…</div>
          ) : (
            <table className="tbl">
              <thead>
                <tr>
                  <th style={{ width: 80 }}>Img</th>
                  <th style={{ width: 120 }}>Código</th>
                  <th>Nombre</th>
                  <th style={{ width: 360 }}>Descripción</th>
                  <th style={{ width: 140 }}>Precio</th>
                  <th style={{ width: 140 }}>Stock</th>
                  <th style={{ width: 160 }}>Cat.</th>
                  <th style={{ width: 120 }}>Estado</th>
                  <th style={{ width: 240, textAlign: "center" }}>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {productos.map((p) => {
                  const critico = p.stock < 5;

                  return (
                    <tr
                      key={p.id}
                      style={{
                        background: critico ? "rgba(255, 214, 219, 0.35)" : "transparent",
                      }}
                      title={critico ? `Stock crítico: ${p.stock}` : undefined}
                    >
                      <td style={{ position: "relative" }}>
                        {p.imageUrl ? (
                          <>
                            <img
                              src={p.imageUrl}
                              alt={p.nombre}
                              style={{
                                width: 56,
                                height: 56,
                                objectFit: "cover",
                                borderRadius: 6,
                                border: "1px solid #eee",
                              }}
                              onError={(e) => (e.currentTarget.style.display = "none")}
                            />
                            {critico && (
                              <span
                                style={{
                                  position: "absolute",
                                  top: -6,
                                  right: -6,
                                  background: "#b00020",
                                  color: "#fff",
                                  fontSize: 10,
                                  padding: "2px 6px",
                                  borderRadius: 12,
                                  boxShadow: "0 1px 4px rgba(0,0,0,.15)",
                                }}
                              >
                                ⚠️ Bajo
                              </span>
                            )}
                          </>
                        ) : (
                          <span style={{ fontSize: 12, color: "#999" }}>—</span>
                        )}
                      </td>

                      <td>{p.codigo || "—"}</td>
                      <td>{p.nombre}</td>

                      <td className="ellipsis" title={p.descripcion || ""}>
                        {p.descripcion || "—"}
                      </td>

                      <td>{clp.format(p.precio ?? 0)}</td>

                      <td style={{ color: critico ? "#b00020" : "#000", fontWeight: 600 }}>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <button
                            className="btn-sm"
                            onClick={() => handleStockDelta(p.id, -1)}
                            disabled={(p.stock ?? 0) <= 0}
                            title="Disminuir stock"
                          >
                            −
                          </button>
                          <span>
                            {p.stock} {critico && "⚠️"}
                          </span>
                          <button
                            className="btn-sm"
                            onClick={() => handleStockDelta(p.id, +1)}
                            title="Aumentar stock"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td>{p.categoriaNombre || "—"}</td>
                      <td>{p.activo ? "Activo" : "Inactivo"}</td>

                      <td className="actions">
                        <button className="btn-sm" onClick={() => onEdit(p.id)}>
                          Editar
                        </button>
                        <button className="btn-sm danger" onClick={() => onDelete(p.id)}>
                          Eliminar
                        </button>
                        {p.activo && (
                          <button
                            className="btn-sm warn"
                            onClick={() => handleDesactivar(p.id, p.nombre)}
                          >
                            Desactivar
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}

                {productos.length === 0 && !error && (
                  <tr>
                    <td colSpan={9} className="empty">
                      Sin productos…
                    </td>
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
