import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:8081";

export default function AdminProductoEditar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productoId = Number(id);

  const [producto, setProducto] = useState({
    id: productoId,
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: { id: "", nombre: "" }
  });

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        // Producto
        const rp = await fetch(`${API}/api/productos/${productoId}`);
        if (!rp.ok) throw new Error("Error al cargar el producto");
        const dp = await rp.json();
        setProducto({
          ...dp,
          descripcion: dp.descripcion || "",
          categoria: dp.categoria || { id: "", nombre: "" }
        });

        // Categorías
        const rc = await fetch(`${API}/api/categorias`);
        if (!rc.ok) throw new Error("Error al cargar categorías");
        const dc = await rc.json();
        setCategorias(Array.isArray(dc) ? dc : []);

        setError(null);
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [productoId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "categoriaId") {
      const sel = categorias.find((c) => c.id === Number(value));
      setProducto((prev) => ({
        ...prev,
        categoria: sel || { id: value, nombre: "" }
      }));
    } else {
      setProducto((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError(null);
    setOk(false);

    try {
      const body = {
        id: producto.id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: Number(producto.precio) || 0,
        ...(producto.categoria?.id && {
          categoria: { id: Number(producto.categoria.id) }
        })
      };

      const resp = await fetch(`${API}/api/productos/${productoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!resp.ok) {
        const t = await resp.text();
        console.error("Respuesta servidor:", t);
        throw new Error("Error al actualizar el producto");
      }

      setOk(true);
      setTimeout(() => navigate("/admin/productos"), 900);
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleVolver = () => navigate("/admin/productos");

  if (loading) {
    return <div className="empty">Cargando producto…</div>;
  }

  return (
    <section>
      <div className="content-head">
        <h1>Editar producto</h1>
      </div>

      <div className="card" style={{ padding: 16 }}>
        {error && <div className="alert alert-danger py-2 mb-2">{error}</div>}
        {ok && (
          <div className="alert alert-success py-2 mb-2">
            Producto actualizado exitosamente
          </div>
        )}

        <div className="row g-3">
          <div className="col-md-8">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              value={producto.nombre}
              disabled
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Precio</label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="number"
                name="precio"
                className="form-control"
                value={producto.precio}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>

          <div className="col-12">
            <label className="form-label">Descripción</label>
            <textarea
              name="descripcion"
              className="form-control"
              rows={3}
              value={producto.descripcion}
              onChange={handleChange}
              placeholder="Descripción del producto"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Categoría</label>
            <select
              name="categoriaId"
              className="form-select"
              value={producto.categoria?.id || ""}
              onChange={handleChange}
            >
              <option value="">Sin categoría</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="d-flex gap-2 mt-3 border-top pt-3">
          <button className="btn btn-outline-dark" onClick={handleVolver}>
            Cancelar
          </button>
          <button
            className="btn btn-dark flex-grow-1"
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? "Guardando…" : "Guardar cambios"}
          </button>
        </div>
      </div>
    </section>
  );
}
