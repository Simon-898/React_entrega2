import { useState } from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !pass) return setError("Completa todos los campos.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      return setError("Ingresa un correo válido (ej: ejemplo@duoc.cl).");
    if (pass.length < 6)
      return setError("La contraseña debe tener al menos 6 caracteres.");

    console.log("Login OK:", { email });
    // localStorage.setItem("user", JSON.stringify({ email, role: "admin" }));
    // navigate("/"); // si usas useNavigate de react-router-dom
  };

  return (
    <>
    <Navbar />
    
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
            placeholder="Ejemplo123"
            className="input"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />

          {error && <div className="error">{error}</div>}

          <Link to="/Home" className="btn btn-outline-dark">Iniciar Sesion</Link>
        </form>
      </div>
    </section>
    </>
  );
}
