// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/login.css";

export default function Login() {
  const { login, isAdmin } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !pass) return setError("Completa todos los campos.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      return setError("Ingresa un correo válido.");
    if (pass.length < 6)
      return setError("La contraseña debe tener al menos 6 caracteres.");

    try {
      setLoading(true);
      const { rol } = await login(email, pass);
      // Redirigir según rol
      if ((rol || "").toUpperCase() === "SUPER_ADMIN" || isAdmin) {
        nav("/admin", { replace: true });
      } else {
        nav("/", { replace: true });
      }
    } catch (err) {
      setError(err.message || "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <h2 className="title">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="correoLogin" className="label">Correo</label>
          <input
            id="correoLogin"
            type="email"
            placeholder="ejemplo@duoc.cl"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="passLogin" className="label">Contraseña</label>
          <input
            id="passLogin"
            type="password"
            placeholder="********"
            className="input"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
            minLength={6}
          />

          {error && <div className="error">{error}</div>}

          <button type="submit" className="btn btn-dark w-100" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

          <div className="mt-3 text-center">
            <small>¿No tienes cuenta? </small>
            <Link to="/registro">Crear cuenta</Link>
          </div>
        </form>
      </div>
    </section>
  );
}
