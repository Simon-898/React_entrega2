const API = import.meta.env.VITE_API_URL || "http://localhost:8082";

export async function createOrder(usuarioId, items) {
  const res = await fetch(`${API}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuarioId, items }),
  });

  if (!res.ok) {
    let msg = "Error al crear la orden";
    try {
      const err = await res.json();
      msg = err?.message || msg;
    } catch {}
    throw new Error(msg);
  }

  return await res.json();
}

export async function getOrder(orderId) {
  const res = await fetch(`${API}/api/orders/${orderId}`);

  if (!res.ok) {
    let msg = "Orden no encontrada";
    try {
      const err = await res.json();
      msg = err?.message || msg;
    } catch {}
    throw new Error(msg);
  }

  return await res.json();
}

export async function getCustomerOrders(customerId) {
  const res = await fetch(`${API}/api/orders/customer/${customerId}`);

  if (!res.ok) {
    let msg = "Error al obtener órdenes";
    try {
      const err = await res.json();
      msg = err?.message || msg;
    } catch {}
    throw new Error(msg);
  }

  return await res.json();
}
