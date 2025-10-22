// src/pages/AdminHome.jsx
import { useEffect, useState } from "react";
import { obtenerKPIs } from "../services/metricsApi";

export default function AdminHome() {
  const [kpi, setKpi] = useState({ usuarios: 0, productos: 0 });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const cargar = async () => {
    try {
      setErr(""); setLoading(true);
      const data = await obtenerKPIs();
      setKpi(data);
    } catch (e) {
      console.error(e);
      setErr(e.message || "No se pudieron cargar los KPIs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargar(); }, []);

  return (
    <section className="admin-dashboard">
      <div className="content-head">
        <h1>Panel</h1>
        <div className="notice">Bienvenido/a al panel de administración.</div>
      </div>

      {err && <div className="alert">{err}</div>}

      <div className="dash">
        <div className="dash-grid">
          <article className="dash-card">
            <div className="kpi">{loading ? "…" : kpi.usuarios}</div>
            <div className="kpi-label">Usuarios</div>
            <div className="muted">Cuentas registradas</div>
          </article>

          <article className="dash-card">
            <div className="kpi">{loading ? "…" : kpi.productos}</div>
            <div className="kpi-label">Productos</div>
            <div className="muted">SKU activos/registrados</div>
          </article>
        </div>

        <button className="btn-refresh" onClick={cargar} disabled={loading}>
          {loading ? "Actualizando…" : "Actualizar"}
        </button>

        
        <div className="dash-logo">
          <img src="/images/logochavito.jpeg" alt="Chavito Store" />
        </div>
      </div>
    </section>
  );
}

