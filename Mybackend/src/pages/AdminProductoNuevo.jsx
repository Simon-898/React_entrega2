import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:8081";

export default function AdminProductoNuevo() {
  const navigate = useNavigate();

  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: ""
  });

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingCategorias, setLoadingCategorias] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${API}/api/categorias`);
        if (!r.ok) throw new Error("Error al cargar categorías");
        const data = await r.json();
        setCategorias(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setError("No se pudieron cargar las categorías");
      } finally {
        setLoadingCategorias(false);
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const body = {
      nombre: producto.nombre.trim(),
      descripcion: producto.descripcion.trim(),
      precio: parseFloat(producto.precio),
      categoria: { id: parseInt(producto.categoria, 10) }
    };

    try {
      const resp = await fetch(`${API}/api/productos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.message || "Error al crear el producto");
      }
      navigate("/admin/productos");
    } catch (err) {
      setError(err.message || "No se pudo crear el producto");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    const tieneDatos = Object.values(producto).some((v) => v !== "");
    if (!tieneDatos || confirm("¿Cancelar? Se perderán los datos.")) {
      navigate("/admin/productos");
    }
  };

  return (
    <section>
      <div className="content-head">
        <h1>Nuevo producto</h1>
      </div>

      {error && (
        <div className="card" style={{ padding: 12, marginBottom: 12 }}>
          <div style={{ color: "#b12d2d" }}>{error}</div>
        </div>
      )}

      <div className="card" style={{ padding: 16 }}>
        {loadingCategorias ? (
          <div className="empty">Cargando categorías…</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-8">
                <label className="form-label">Nombre *</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  value={producto.nombre}
                  onChange={handleChange}
                  maxLength={100}
                  required
                  placeholder="Ej: Polera deportiva"
                  disabled={loading}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Precio *</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    name="precio"
                    className="form-control"
                    step="1"
                    min="1"
                    value={producto.precio}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="col-12">
                <label className="form-label">Descripción *</label>
                <textarea
                  name="descripcion"
                  className="form-control"
                  rows="4"
                  value={producto.descripcion}
                  onChange={handleChange}
                  maxLength={500}
                  required
                  disabled={loading}
                />
                <small className="text-muted">
                  {producto.descripcion.length}/500 caracteres
                </small>
              </div>

              <div className="col-md-6">
                <label className="form-label">Categoría *</label>
                <select
                  name="categoria"
                  className="form-select"
                  value={producto.categoria}
                  onChange={handleChange}
                  required
                  disabled={loading || categorias.length === 0}
                >
                  <option value="">Seleccione una categoría</option>
                  {categorias.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
                {categorias.length === 0 && (
                  <small className="text-danger">
                    No hay categorías disponibles
                  </small>
                )}
              </div>
            </div>

            <div className="d-flex gap-2 mt-3">
              <button type="submit" className="btn btn-dark" disabled={loading}>
                {loading ? "Guardando…" : "Crear producto"}
              </button>
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
