import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { crearUsuario } from "../services/usuariosApi";
import Navbar from "../components/Navbar.jsx";

export default function Registro() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirm: ""
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ error: "", success: "" });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validarFormulario = () => {
    // Limpia espacios
    const nombre = form.nombre.trim();

    if (nombre.length < 2) {
      throw new Error("El nombre debe tener al menos 2 caracteres.");
    }

    if (!/.+@duoc\.cl$/.test(form.email.trim())) {
      throw new Error("El correo debe terminar en @duoc.cl");
    }

    if (form.password.length < 6) {
      throw new Error("La contraseña debe tener al menos 6 caracteres.");
    }

    if (/\s/.test(form.password)) {
      throw new Error("La contraseña no puede tener espacios.");
    }

    if (form.password !== form.confirm) {
      throw new Error("Las contraseñas no coinciden.");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setMsg({ error: "", success: "" });
      setLoading(true);

      validarFormulario();

      await crearUsuario({
        nombre: form.nombre.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        rol: "CLIENTE",
      });

      setMsg({ success: "✅ Cuenta creada con éxito. Redirigiendo..." });
      setTimeout(() => nav("/login"), 1500);
    } catch (err) {
      setMsg({ error: err.message || "No se pudo crear la cuenta." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main style={{ minHeight: "calc(100vh - 160px)" }}>
        <section style={{ maxWidth: 520, margin: "0 auto", padding: 16 }}>
          <h2 style={{ marginBottom: 12 }}>Crear cuenta</h2>

          {msg.error && (
            <div style={{
              background: "#ffe5e5", color: "#b00020",
              padding: 10, borderRadius: 8, marginBottom: 10,
            }}>
              {msg.error}
            </div>
          )}
          {msg.success && (
            <div style={{
              background: "#e6ffed", color: "#046d2c",
              padding: 10, borderRadius: 8, marginBottom: 10,
            }}>
              {msg.success}
            </div>
          )}

          <form onSubmit={onSubmit} style={{ display: "grid", gap: 14 }}>
            <label style={{ display: "grid", gap: 4 }}>
              <span>Nombre completo</span>
              <input
                name="nombre"
                value={form.nombre}
                onChange={onChange}
                placeholder="Ej: Simón Arévalo"
                required
              />
            </label>

            <label style={{ display: "grid", gap: 4 }}>
              <span>Correo institucional</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="nombre.apellido@duoc.cl"
                required
              />
              <small style={{ color: "#666" }}>Solo correos @duoc.cl</small>
            </label>

            <label style={{ display: "grid", gap: 4 }}>
              <span>Contraseña</span>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={onChange}
                placeholder="Mínimo 6 caracteres"
                minLength={6}
                required
              />
            </label>

            <label style={{ display: "grid", gap: 4 }}>
              <span>Confirmar contraseña</span>
              <input
                name="confirm"
                type="password"
                value={form.confirm}
                onChange={onChange}
                placeholder="Repite la contraseña"
                minLength={6}
                required
              />
            </label>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 8
            }}>
              <Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link>
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: "#000", color: "#fff",
                  border: "none", borderRadius: 6,
                  padding: "8px 14px", cursor: "pointer"
                }}
              >
                {loading ? "Creando..." : "Crear cuenta"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
