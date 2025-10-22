// src/pages/AdminProductoEditar.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obtenerProducto, actualizarProducto } from "../services/productosApi.js";
import { listarCategorias } from "../services/categoriasApi.js";
import "../styles/adminModal.css";

export default function AdminProductoEditar() {
  const { id } = useParams();
  const nav = useNavigate();

  const close = () => nav("/admin/productos");
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // form nulo => “Cargando…”
  const [form, setForm] = useState(null);
  const [cats, setCats] = useState([]);
  const [error, setError] = useState("");
  const [catsErr, setCatsErr] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setError(""); setCatsErr("");

        // carga en paralelo producto + categorías
        const [p, categorias] = await Promise.all([
          obtenerProducto(id),
          listarCategorias()
        ]);

        setCats(Array.isArray(categorias) ? categorias : []);

        // normaliza datos del producto
        setForm({
          nombre: p.nombre || "",
          descripcion: p.descripcion || "",
          precio: p.precio ?? "",
          talla: p.talla || "",
          activo: p.activo ?? true,
          categoriaId: p?.categoria?.id ?? "",     // <- preselecciona categoría
          imageUrl: p.imageUrl || p.image_url || "",
          stock: p.stock ?? 0
        });
      } catch (e) {
        console.error(e);
        setError(e.message || "No se pudo cargar el producto");
        // Si quieres cerrar automáticamente en 1.5s:
        // setTimeout(close, 1500);
      }
    })();
  }, [id]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true); setError("");

      if (!form.categoriaId) throw new Error("Debes seleccionar una categoría");

      const payload = {
        ...form,
        precio: parseFloat(form.precio || 0),
        stock: parseInt(form.stock ?? 0, 10),
        categoria: { id: Number(form.categoriaId) }
      };

      await actualizarProducto(id, payload);
      close();
    } catch (e2) {
      console.error(e2);
      setError(e2.message || "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  };

  // UI
  if (!form) {
    return (
      <div className="modal-backdrop" onClick={(e)=> e.target===e.currentTarget && close()}>
        <div className="modal-card" role="dialog" aria-modal="true">
          <div className="modal-head">
            <h2 className="modal-title">Editar producto #{id}</h2>
            <button className="modal-close" onClick={close} aria-label="Cerrar">×</button>
          </div>
          <div className="modal-body">
            {error ? <div className="alert">{error}</div> : "Cargando…"}
          </div>
          <div className="modal-foot">
            <button className="btn" onClick={close}>Cerrar</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop" onClick={(e)=> e.target===e.currentTarget && close()}>
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="ep-title">
        <div className="modal-head">
          <h2 id="ep-title" className="modal-title">Editar producto #{id}</h2>
          <button className="modal-close" onClick={close} aria-label="Cerrar">×</button>
        </div>

        <div className="modal-body">
          {error && <div className="alert">{error}</div>}

          <form onSubmit={onSubmit}>
            <label>Nombre
              <input name="nombre" value={form.nombre} onChange={onChange} required />
            </label>

            <label>Descripción
              <textarea name="descripcion" value={form.descripcion} onChange={onChange} rows={3} />
            </label>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <label>Precio
                <input name="precio" type="number" step="0.01" value={form.precio} onChange={onChange} required />
              </label>
              <label>Talla
                <input name="talla" value={form.talla} onChange={onChange} />
              </label>
            </div>

            <label>Categoría
              <select name="categoriaId" value={form.categoriaId} onChange={onChange} required>
                <option value="">-- Selecciona --</option>
                {cats.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
            </label>
            {catsErr && <small className="alert">{catsErr}</small>}

            <label>Imagen URL
              <input
                name="imageUrl"
                type="url"
                placeholder="/images/archivo.png o https://..."
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
                  onError={(e)=> (e.currentTarget.src="/images/placeholder.png")}
                />
              </div>
            )}

            <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:12, alignItems:"center" }}>
              <label>Stock
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
                {saving ? "Guardando…" : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
