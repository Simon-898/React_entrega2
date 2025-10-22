// src/pages/AdminProductoNuevo.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { crearProducto } from "../services/productosApi.js";
import { listarCategorias } from "../services/categoriasApi.js";
import "../styles/adminModal.css";

export default function AdminProductoNuevo() {
  const nav = useNavigate();

  // cerrar modal con overlay, botón o ESC
  const close = () => nav("/admin/productos");
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    talla: "",
    activo: true,
    categoriaId: "",
    imageUrl: "",
    stock: 0
  });

  const [cats, setCats] = useState([]);
  const [catsErr, setCatsErr] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setCatsErr("");
        const data = await listarCategorias();
        setCats(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setCatsErr("No se pudieron cargar las categorías");
      }
    })();
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(""); setSaving(true);

      if (!form.categoriaId) throw new Error("Debes seleccionar una categoría");

      const payload = {
        ...form,
        precio: parseFloat(form.precio || 0),
        stock: parseInt(form.stock ?? 0, 10),
        categoria: { id: Number(form.categoriaId) },
      };

      await crearProducto(payload);
      close();
    } catch (e2) {
      setError(e2.message || "No se pudo crear el producto");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="np-title">
        <div className="modal-head">
          <h2 id="np-title" className="modal-title">Nuevo producto</h2>
          <button className="modal-close" onClick={close} aria-label="Cerrar">×</button>
        </div>

        <div className="modal-body">
          {error && <div className="alert">{error}</div>}

          <form onSubmit={onSubmit}>
            <label>
              Nombre
              <input name="nombre" value={form.nombre} onChange={onChange} required />
            </label>

            <label>
              Descripción
              <textarea name="descripcion" value={form.descripcion} onChange={onChange} rows={3} />
            </label>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <label>
                Precio
                <input name="precio" type="number" step="0.01" value={form.precio} onChange={onChange} required />
              </label>
              <label>
                Talla
                <input name="talla" value={form.talla} onChange={onChange} />
              </label>
            </div>

            <label>
              Categoría
              <select name="categoriaId" value={form.categoriaId} onChange={onChange} required>
                <option value="">-- Selecciona --</option>
                {cats.map((c) => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </select>
            </label>
            {catsErr && <small className="alert">{catsErr}</small>}

            <label>
              Imagen URL
              <input
                name="imageUrl"
                type="url"
                placeholder="/images/Gucci_Logo.png o https://..."
                value={form.imageUrl}
                onChange={onChange}
                pattern="^(\/images\/.+|https?:\/\/.+)$"
                title="Debe iniciar con /images/ o ser http(s)"
              />
            </label>

            {form.imageUrl?.trim() && (
              <div>
                <div style={{ fontSize: 12, color: "#555", marginBottom: 6 }}>Previsualización</div>
                <img
                  className="img-preview"
                  src={form.imageUrl}
                  alt="preview"
                  onError={(e) => (e.currentTarget.src = "/images/placeholder.png")}
                />
              </div>
            )}

            <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:12, alignItems:"center" }}>
              <label>
                Stock
                <input name="stock" type="number" min={0} value={form.stock} onChange={onChange} />
              </label>

              <label style={{ display:"flex", gap:8, alignItems:"center", marginTop: 22 }}>
                <input type="checkbox" name="activo" checked={form.activo} onChange={onChange} />
                Activo
              </label>
            </div>

            <div className="modal-foot">
              <button type="button" className="btn" onClick={close}>Cancelar</button>
              <button type="submit" className="btn primary" disabled={saving}>
                {saving ? "Guardando…" : "Crear"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
