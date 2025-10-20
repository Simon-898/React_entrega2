
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { crearUsuario } from "../services/usuariosApi";

import Navbar from "../components/Navbar.jsx";


export default function Registro() {
  const nav = useNavigate();
  const [form, setForm] = useState({ nombre: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setErr(""); setOk(""); setLoading(true);
      if (!/.+@duoc\.cl$/.test(form.email)) throw new Error("El correo debe terminar en @duoc.cl");
      if (form.password.length < 6) throw new Error("La contraseña debe tener al menos 6 caracteres");
      if (form.password !== form.confirm) throw new Error("Las contraseñas no coinciden");

      await crearUsuario({ nombre: form.nombre, email: form.email, password: form.password, rol: "CLIENTE" });
      setOk("Cuenta creada con éxito. Te redirigiremos al login...");
      setTimeout(() => nav("/login"), 1200);
    } catch (e2) {
      setErr(e2.message || "No se pudo crear la cuenta");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Navbar />

      <main style={{ minHeight: "calc(100vh - 160px)" }}>
        <section style={{ maxWidth: 520, margin: "0 auto", padding: 16 }}>
          <h2>Crear cuenta</h2>

          {err && <div style={{ background:"#ffe5e5", color:"#b00020", padding:10, borderRadius:8, marginBottom:10 }}>{err}</div>}
          {ok  && <div style={{ background:"#e6ffed", color:"#046d2c", padding:10, borderRadius:8, marginBottom:10 }}>{ok}</div>}

          <form onSubmit={onSubmit} style={{ display:"grid", gap: 12 }}>
            <label style={{ display:"grid", gap:6 }}>
              <span>Nombre completo</span>
              <input name="nombre" value={form.nombre} onChange={onChange} required />
            </label>

            <label style={{ display:"grid", gap:6 }}>
              <span>Correo</span>
              <input
                name="email" type="email" value={form.email} onChange={onChange}
                required pattern=".+@duoc\.cl" title="Debe ser un correo @duoc.cl"
                placeholder="nombre.apellido@duoc.cl"
              />
              <small style={{ color:"#666" }}>Solo correos @duoc.cl</small>
            </label>

            <label style={{ display:"grid", gap:6 }}>
              <span>Contraseña</span>
              <input name="password" type="password" value={form.password} onChange={onChange} minLength={6} required />
            </label>

            <label style={{ display:"grid", gap:6 }}>
              <span>Confirmar contraseña</span>
              <input name="confirm" type="password" value={form.confirm} onChange={onChange} minLength={6} required />
            </label>

            

            <div style={{ display:"flex", gap: 8, justifyContent:"space-between", alignItems:"center" }}>
              <Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link>
              <button type="submit" disabled={loading}>{loading ? "Creando…" : "Crear cuenta"}</button>
            </div>
          </form>
        </section>
      </main>

    
    </>
  );
}
