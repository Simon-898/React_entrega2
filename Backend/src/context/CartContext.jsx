
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartCtx = createContext(null);
export const useCart = () => useContext(CartCtx);

const STORAGE_KEY = "cart_v2"; // clave en localStorage

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // id compuesto por producto + talla 
  const keyOf = (p, talla) => `${p.id}__${talla || ""}`;

  const addItem = (product, qty = 1, talla = "") => {
    const key = keyOf(product, talla);
    setItems(prev => {
      const i = prev.findIndex(x => x.key === key);
      const max = Number.isFinite(product.stock) ? Math.max(0, product.stock) : Infinity;
      if (i >= 0) {
        const copy = [...prev];
        const nextQty = Math.min(copy[i].qty + qty, max);
        copy[i] = { ...copy[i], qty: nextQty };
        return copy;
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          nombre: product.nombre,
          precio: Number(product.precio || 0),
          imageUrl: product.imageUrl || "",
          talla: talla || "", // variante
          stock: product.stock ?? null,
          qty: Math.min(qty, max),
        }
      ];
    });
  };

  const removeItem = (key) => setItems(prev => prev.filter(x => x.key !== key));
  const clear = () => setItems([]);

  const increase = (key, step = 1) => setItems(prev => prev.map(x => {
    if (x.key !== key) return x;
    const max = Number.isFinite(x.stock) ? Math.max(0, x.stock) : Infinity;
    return { ...x, qty: Math.min(x.qty + step, max) };
  }));

  const decrease = (key, step = 1) => setItems(prev => prev.map(x =>
    x.key === key ? { ...x, qty: Math.max(1, x.qty - step) } : x
  ));

  const count = useMemo(() => items.reduce((a,b)=>a + b.qty, 0), [items]);
  const total = useMemo(() => items.reduce((a,b)=>a + b.precio*b.qty, 0), [items]);

  return (
    <CartCtx.Provider value={{ items, addItem, removeItem, clear, increase, decrease, count, total }}>
      {children}
    </CartCtx.Provider>
  );
}
