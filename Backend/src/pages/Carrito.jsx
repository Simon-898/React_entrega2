// src/pages/Carrito.jsx
import { useMemo } from "react";
import Navbar from "../components/Navbar.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function Carrito() {
  const { items, increase, decrease, removeItem, clear, total } = useCart();

  const clp = useMemo(() =>
    new Intl.NumberFormat("es-CL", { style:"currency", currency:"CLP", maximumFractionDigits:0 })
  , []);

  return (
    <>
      <Navbar />
      <main style={{ minHeight:"calc(100vh - 180px)" }}>
        <section style={{ maxWidth: 1100, margin:"0 auto", padding:"24px 16px" }}>
          <h2 style={{ marginBottom: 16 }}>Carrito</h2>

          {items.length === 0 ? (
            <p>No tienes productos en el carrito.</p>
          ) : (
            <div className="card" style={{ overflowX:"auto" }}>
              <table className="table mb-0 align-middle">
                <thead>
                  <tr>
                    <th style={{ width:80 }}></th>
                    <th>Producto</th>
                    <th style={{ width:120 }}>Talla</th>
                    <th style={{ width:160 }}>Precio</th>
                    <th style={{ width:200 }}>Cantidad</th>
                    <th style={{ width:180 }}>Subtotal</th>
                    <th style={{ width:80 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(it => (
                    <tr key={it.key}>
                      <td>
                        <img
                          src={it.imageUrl || "/images/placeholder.png"}
                          alt={it.nombre}
                          style={{ width:64, height:64, objectFit:"cover", borderRadius:6 }}
                          onError={(e)=> (e.currentTarget.src="/images/placeholder.png")}
                        />
                      </td>
                      <td>
                        <div style={{ fontWeight:600 }}>{it.nombre}</div>
                        {Number.isFinite(it.stock) && (
                          <small style={{ color:"#666" }}>Stock: {it.stock}</small>
                        )}
                      </td>
                      <td>{it.talla || "—"}</td>
                      <td>{clp.format(it.precio)}</td>
                      <td>
                        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                          <button className="btn btn-light btn-sm" onClick={()=>decrease(it.key)}>−</button>
                          <strong>{it.qty}</strong>
                          <button
                            className="btn btn-light btn-sm"
                            onClick={()=>increase(it.key)}
                            disabled={Number.isFinite(it.stock) && it.qty >= it.stock}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td style={{ fontWeight:700 }}>{clp.format(it.precio * it.qty)}</td>
                      <td>
                        <button className="btn btn-outline-danger btn-sm" onClick={()=>removeItem(it.key)}>
                          <i className="bi bi-trash" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {items.length > 0 && (
            <div style={{
              marginTop:16, display:"flex", gap:12, alignItems:"center",
              justifyContent:"flex-end", flexWrap:"wrap"
            }}>
              <div style={{ fontSize:18, fontWeight:700 }}>Total: {clp.format(total)}</div>
              <button className="btn btn-outline-secondary" onClick={clear}>Vaciar</button>
              <button className="btn btn-dark">Finalizar compra</button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
