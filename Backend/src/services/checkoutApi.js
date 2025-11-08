const API = import.meta.env.VITE_API_URL || "http://localhost:8082";

export async function enviarCheckout(items) {
  const resp = await fetch(`${API}/api/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || "Error al finalizar compra");
  }

  return resp.json();
}
