import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getCustomerOrders } from "../services/orderApi.js";
import Navbar from "../components/Navbar.jsx";

export default function InvoicesList() {
  const { user, isAuthenticated } = useAuth();
  const nav = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      nav("/login", { replace: true });
      return;
    }

    const cargar = async () => {
      try {
        setError("");
        setLoading(true);
        const data = await getCustomerOrders(user.id);
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "No se pudieron cargar las boletas");
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [isAuthenticated, user?.id, nav]);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 180px)" }}>
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px" }}>
          <h2 style={{ marginBottom: 24 }}>Mis Boletas</h2>

          {error && (
            <div
              style={{
                background: "#ffe5e5",
                color: "#b00020",
                padding: 12,
                borderRadius: 8,
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              {error}
            </div>
          )}

          {loading ? (
            <p style={{ textAlign: "center", color: "#666" }}>Cargando boletas...</p>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "#666" }}>
              <p style={{ fontSize: 16, marginBottom: 16 }}>No tienes boletas aún</p>
              <a href="/productos" style={{ color: "#000", fontWeight: 600 }}>
                Ver catálogo de productos
              </a>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 20,
              }}
            >
              {orders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => nav(`/invoices/${order.id}`)}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 8,
                    padding: 16,
                    background: "#fff",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                    cursor: "pointer",
                    transition: "box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.08)";
                  }}
                >
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 14, color: "#666", marginBottom: 4 }}>
                      Boleta #{order.id}
                    </div>
                    <div style={{ fontSize: 12, color: "#999" }}>
                      {new Date(order.fechaCreacion).toLocaleDateString("es-CL", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid #eee", paddingTop: 12 }}>
                    <div style={{ marginBottom: 8 }}>
                      <span style={{ color: "#666", fontSize: 13 }}>
                        {order.items.length} producto{order.items.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>
                      {clp.format(order.total)}
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: 12,
                      paddingTop: 12,
                      borderTop: "1px solid #eee",
                      textAlign: "right",
                    }}
                  >
                    <span style={{ color: "#000", fontWeight: 600, fontSize: 13 }}>
                      Ver detalle →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
