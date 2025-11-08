import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();
const STORAGE_KEY = "cart:v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  // se usa para forzar actualización en productos cuando se limpia el carrito
  const [version, setVersion] = useState(0);

  const total = useMemo(
    () => items.reduce((acc, it) => acc + it.precio * it.qty, 0),
    [items]
  );

  const count = useMemo(() => items.reduce((acc, it) => acc + it.qty, 0), [items]);

  // guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function clear() {
    setItems([]);
    localStorage.removeItem(STORAGE_KEY);
    setVersion(v => v + 1);
  }

  function removeItem(key) {
    setItems(prev => prev.filter(it => it.key !== key));
  }

  function increase(key) {
    setItems(prev =>
      prev.map(it =>
        it.key === key
          ? {
              ...it,
              qty: Number.isFinite(it.stock)
                ? Math.min(it.qty + 1, it.stock)
                : it.qty + 1,
            }
          : it
      )
    );
  }

  function decrease(key) {
    setItems(prev =>
      prev
        .map(it =>
          it.key === key
            ? { ...it, qty: Math.max(1, it.qty - 1) }
            : it
        )
        .filter(Boolean)
    );
  }

  function addItem(newItem) {
    // si el producto ya está, suma cantidad
    setItems(prev => {
      const ix = prev.findIndex(it => it.key === newItem.key);
      if (ix >= 0) {
        const curr = prev[ix];
        const max = Number.isFinite(curr.stock) ? curr.stock : Infinity;
        const merged = {
          ...curr,
          qty: Math.min(curr.qty + newItem.qty, max),
        };
        return [...prev.slice(0, ix), merged, ...prev.slice(ix + 1)];
      }
      return [...prev, newItem];
    });
  }

  const value = {
    items,
    addItem,
    removeItem,
    increase,
    decrease,
    clear,
    total,
    count,
    version,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
