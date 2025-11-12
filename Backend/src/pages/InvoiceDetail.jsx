import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getOrder } from "../services/orderApi.js";
import Navbar from "../components/Navbar.jsx";

export default function InvoiceDetail() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const nav = useNavigate();
  const [order, setOrder] = useState(null);
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
    if (!isAuthenticated) {
      nav("/login", { replace: true });
      return;
    }

    const cargar = async () => {
      try {
        setError("");
        setLoading(true);
        const data = await getOrder(id);
        setOrder(data);
      } catch (err) {
        setError(err.message || "No se pudo cargar la boleta");
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [id, isAuthenticated, nav]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: "calc(100vh - 180px)", padding: "24px 16px" }}>
          <p style={{ textAlign: "center", color: "#666" }}>Cargando boleta...</p>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: "calc(100vh - 180px)", padding: "24px 16px" }}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div
              style={{
                background: "#ffe5e5",
                color: "#b00020",
                padding: 16,
                borderRadius: 8,
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              {error}
            </div>
            <button
              onClick={() => nav("/invoices")}
              style={{
                background: "#000",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Volver a mis boletas
            </button>
          </div>
        </main>
      </>
    );
  }

  if (!order) return null;

  const fecha = new Date(order.fechaCreacion);
  const iva = order.total * 0.19; // 19% IVA
  const totalConIva = order.total + iva;

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 180px)" }}>
        <section style={{ maxWidth: 800, margin: "0 auto", padding: "24px 16px" }}>
          {/* Header */}
          <div
            style={{
              background: "#f9f9f9",
              padding: 20,
              borderRadius: 8,
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            <h1 style={{ fontSize: 28, marginBottom: 4 }}>BOLETA DE VENTA</h1>
            <p style={{ color: "#666", fontSize: 14 }}>N° {order.id}</p>
          </div>

          {/* Info Comercial */}
          <div style={{ background: "#fff", padding: 20, marginBottom: 24 }}>
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 14, marginBottom: 8, color: "#666" }}>FECHA</h3>
              <p style={{ fontSize: 16, fontWeight: 600 }}>
                {fecha.toLocaleDateString("es-CL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 14, marginBottom: 8, color: "#666" }}>CLIENTE</h3>
              <p style={{ fontSize: 16 }}>{order.usuarioEmail}</p>
            </div>
          </div>

          {/* Tabla de Items */}
          <div style={{ marginBottom: 24, overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 14,
              }}
            >
              <thead>
                <tr style={{ background: "#f0f0f0", borderBottom: "2px solid #000" }}>
                  <th style={{ padding: 12, textAlign: "left" }}>Producto</th>
                  <th style={{ padding: 12, textAlign: "center" }}>Talla</th>
                  <th style={{ padding: 12, textAlign: "right" }}>Cantidad</th>
                  <th style={{ padding: 12, textAlign: "right" }}>Precio Unit.</th>
                  <th style={{ padding: 12, textAlign: "right" }}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr
                    key={idx}
                    style={{ borderBottom: "1px solid #ddd", background: idx % 2 === 0 ? "#fafafa" : "#fff" }}
                  >
                    <td style={{ padding: 12 }}>{item.productoNombre}</td>
                    <td style={{ padding: 12, textAlign: "center" }}>
                      {item.talla || "—"}
                    </td>
                    <td style={{ padding: 12, textAlign: "right" }}>
                      {item.cantidad}
                    </td>
                    <td style={{ padding: 12, textAlign: "right" }}>
                      {clp.format(item.precioUnitario)}
                    </td>
                    <td style={{ padding: 12, textAlign: "right", fontWeight: 600 }}>
                      {clp.format(item.subtotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totales */}
          <div
            style={{
              background: "#f9f9f9",
              padding: 20,
              borderRadius: 8,
              marginBottom: 24,
              textAlign: "right",
            }}
          >
            <div style={{ marginBottom: 12 }}>
              <span style={{ color: "#666", fontSize: 14 }}>Subtotal: </span>
              <span style={{ fontWeight: 600 }}>
                {clp.format(order.total)}
              </span>
            </div>
            <div style={{ marginBottom: 12 }}>
              <span style={{ color: "#666", fontSize: 14 }}>IVA (19%): </span>
              <span style={{ fontWeight: 600 }}>
                {clp.format(iva)}
              </span>
            </div>
            <div style={{ borderTop: "2px solid #000", paddingTop: 12 }}>
              <span style={{ fontSize: 18, fontWeight: 700 }}>Total: </span>
              <span style={{ fontSize: 20, fontWeight: 700 }}>
                {clp.format(totalConIva)}
              </span>
            </div>
          </div>

          {/* Botones de acción */}
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <button
              onClick={() => window.print()}
              style={{
                background: "#000",
                color: "#fff",
                border: "none",
                padding: "10px 24px",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              Imprimir
            </button>
            <button
              onClick={() => nav("/invoices")}
              style={{
                background: "#f0f0f0",
                color: "#000",
                border: "1px solid #ddd",
                padding: "10px 24px",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              Volver
            </button>
          </div>

          {/* Footer */}
          <div
            style={{
              textAlign: "center",
              padding: "20px 0",
              borderTop: "1px solid #eee",
              color: "#999",
              fontSize: 12,
            }}
          >
            <p>Gracias por tu compra</p>
            <p>Conserva esta boleta como comprobante de tu transacción</p>
          </div>
        </section>
      </main>
    </>
  );
}
