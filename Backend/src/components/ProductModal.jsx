import { useMemo, useState } from "react";

const FALLBACK_TALLAS = ["XS","S","M","L","XL"];

export default function ProductModal({ open, product, onClose, onAdd }) {
  const tallas = useMemo(() => {
    if (!product) return FALLBACK_TALLAS;
    // Si desde BD viene una sola talla en string (ej. "M"), la ponemos primero.
    // Si viene una lista separada por comas, la parseamos.
    if (typeof product.talla === "string" && product.talla.trim()) {
      const s = product.talla.trim();
      if (s.includes(",")) {
        return s.split(",").map(t => t.trim()).filter(Boolean);
      }
      // una sola talla conocida -> prioridad + fallback
      const set = new Set([s, ...FALLBACK_TALLAS]);
      return Array.from(set);
    }
    return FALLBACK_TALLAS;
  }, [product]);

  const [talla, setTalla] = useState("");
  const [qty, setQty] = useState(1);

  if (!open || !product) return null;

  const stock = Number.isFinite(product.stock) ? Math.max(0, product.stock) : null;
  const canIncrease = stock == null ? true : qty < stock;

  const add = () => {
    onAdd(product, qty, talla);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position:"fixed", inset:0, background:"rgba(0,0,0,.5)",
        display:"flex", alignItems:"center", justifyContent:"center", zIndex:1050
      }}
    >
      <div
        onClick={(e)=>e.stopPropagation()}
        style={{
          width:"min(760px, 94vw)", background:"#fff", borderRadius:12,
          overflow:"hidden", boxShadow:"0 10px 30px rgba(0,0,0,.25)"
        }}
      >
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0 }}>
          <div style={{ background:"#f7f7f7" }}>
            <img
              src={product.imageUrl || "/images/placeholder.png"}
              alt={product.nombre}
              style={{ width:"100%", height: "100%", maxHeight: 440, objectFit:"cover" }}
              onError={(e)=> (e.currentTarget.src="/images/placeholder.png")}
            />
          </div>
          <div style={{ padding:16, display:"flex", flexDirection:"column" }}>
            <h3 style={{ marginBottom:6 }}>{product.nombre}</h3>
            <div style={{ color:"#666", fontSize:14, marginBottom:10 }}>
              {product.categoria?.nombre || "Sin categoría"}
            </div>
            <p style={{ whiteSpace:"pre-wrap", lineHeight:1.4, color:"#333", marginBottom:12 }}>
              {product.descripcion || "Sin descripción"}
            </p>

            <div style={{ fontWeight:700, fontSize:18, marginBottom:12 }}>
              ${new Intl.NumberFormat("es-CL").format(product.precio || 0)}
              {stock != null && <span style={{ fontWeight:400, color:"#666", marginLeft:8, fontSize:13 }}>Stock: {stock}</span>}
            </div>

            {/* Talla */}
            <div style={{ marginBottom:12 }}>
              <div style={{ fontSize:14, marginBottom:6 }}>Talla</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {tallas.map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={()=> setTalla(t)}
                    style={{
                      padding:"6px 10px",
                      borderRadius:8,
                      border: talla === t ? "2px solid #111" : "1px solid #bbb",
                      background: talla === t ? "#111" : "#fff",
                      color: talla === t ? "#fff" : "#111",
                      cursor:"pointer",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Cantidad */}
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:14, marginBottom:6 }}>Cantidad</div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <button className="btn btn-light" type="button" onClick={()=> setQty(q => Math.max(1, q-1))}>−</button>
                <input
                  type="number"
                  min={1}
                  max={stock ?? undefined}
                  value={qty}
                  onChange={(e)=> {
                    const v = parseInt(e.target.value || "1", 10);
                    if (!Number.isFinite(v)) return;
                    if (stock == null) setQty(Math.max(1, v));
                    else setQty(Math.max(1, Math.min(stock, v)));
                  }}
                  style={{ width:72, textAlign:"center" }}
                />
                <button className="btn btn-light" type="button" onClick={()=> canIncrease && setQty(q=> q+1)} disabled={!canIncrease}>+</button>
              </div>
            </div>

            <div style={{ marginTop:"auto", display:"flex", gap:8, justifyContent:"flex-end" }}>
              <button onClick={onClose} className="btn btn-light">Cerrar</button>
              <button
                onClick={add}
                className="btn btn-dark"
                disabled={tallas.length>0 && !talla} // fuerza elegir talla si hay opciones
                title={!talla && tallas.length>0 ? "Selecciona una talla" : "Añadir al carrito"}
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
