// src/pages/ProductosPublic.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import ProductModal from "../components/ProductModal.jsx";
import { useCart } from "../context/CartContext.jsx";

const API = import.meta.env.VITE_API_URL || "http://localhost:8082";

export default function ProductosPublic() {
  const { addItem } = useCart();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("TODOS");
  const [sel, setSel] = useState(null); // producto seleccionado para el modal

  useEffect(() => {
    const cargar = async () => {
      try {
        setError("");
        setCargando(true);
        const res = await fetch(`${API}/api/productos`);
        if (!res.ok) throw new Error("Error al obtener los productos");
        const data = await res.json();
        const activos = data.filter((p) => p.activo === true || p.activo === "true");
        setProductos(activos);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  // categorías disponibles
  const categorias = [
    "TODOS",
    ...new Set(productos.map((p) => p.categoria?.nombre || "Sin categoría")),
  ];

  // productos filtrados
  const visibles =
    categoriaFiltro === "TODOS"
      ? productos
      : productos.filter((p) => p.categoria?.nombre === categoriaFiltro);

  const handleAdd = (product, qty, talla ) => {
    addItem(product, qty, talla );
    setSel(null);
  };

  return (
    <>
      <Navbar />

      <main style={{ minHeight: "calc(100vh - 180px)" }}>
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px" }}>
          <h2 style={{ textAlign: "center", marginBottom: 20 }}>Nuestros Productos</h2>

          {/* Filtro de categoría */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 10,
              marginBottom: 24,
            }}
          >
            {categorias.map((c) => (
              <button
                key={c}
                onClick={() => setCategoriaFiltro(c)}
                style={{
                  background: categoriaFiltro === c ? "#000" : "#f3f3f3",
                  color: categoriaFiltro === c ? "#fff" : "#000",
                  border: "1px solid #000",
                  padding: "6px 14px",
                  borderRadius: 20,
                  cursor: "pointer",
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {error && (
            <div
              style={{
                background: "#ffe5e5",
                color: "#b00020",
                padding: 10,
                borderRadius: 8,
                textAlign: "center",
                marginBottom: 12,
              }}
            >
              {error}
            </div>
          )}

          {cargando ? (
            <p style={{ textAlign: "center" }}>Cargando productos...</p>
          ) : visibles.length === 0 ? (
            <p style={{ textAlign: "center" }}>No hay productos disponibles.</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: 24,
              }}
            >
              {visibles.map((p) => (
                <div
                  key={p.id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 8,
                    overflow: "hidden",
                    background: "#fff",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                  }}
                  onClick={() => setSel(p)} // 👈 abre modal
                >
                  <img
                    src={p.imageUrl || "/images/placeholder.png"}
                    alt={p.nombre}
                    style={{
                      width: "100%",
                      height: 220,
                      objectFit: "cover",
                      background: "#fafafa",
                    }}
                    onError={(e) => (e.currentTarget.src = "/images/placeholder.png")}
                  />
                  <div
                    style={{
                      padding: 12,
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <h3 style={{ fontSize: 18, marginBottom: 6 }}>{p.nombre}</h3>
                    <p style={{ flex: 1, fontSize: 14, color: "#555" }}>
                      {p.descripcion || "Sin descripción"}
                    </p>
                    <p
                      style={{
                        marginTop: 8,
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "#000",
                      }}
                    >
                      ${new Intl.NumberFormat("es-CL").format(p.precio)}
                    </p>
                    <small style={{ color: "#888" }}>
                      {p.categoria?.nombre || "Sin categoría"}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* 👇 Modal de producto (detalle + añadir al carrito) */}
      <ProductModal
        open={!!sel}
        product={sel}
        onClose={() => setSel(null)}
        onAdd={handleAdd}
      />
    </>
  );
}
