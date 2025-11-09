// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:8081";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // { email, rol }
  const [loading, setLoading] = useState(true);

  // Cargar sesión desde localStorage al arrancar
  useEffect(() => {
    const t = localStorage.getItem("auth.token");
    const email = localStorage.getItem("auth.email");
    const rol = localStorage.getItem("auth.rol");
    if (t && email && rol) {
      setToken(t);
      setUser({ email, rol });
    }
    setLoading(false);
  }, []);

  // Login contra /auth/login
  async function login(email, password) {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      let msg = "No se pudo iniciar sesión";
      try {
        const err = await res.json();
        msg = err?.error || msg;
      } catch {}
      throw new Error(msg);
    }

    const data = await res.json(); // { token, rol, email }
    const t = data.token;
    const rol = data.rol;
    const mail = data.email || email;

    // Persistir
    localStorage.setItem("auth.token", t);
    localStorage.setItem("auth.email", mail);
    localStorage.setItem("auth.rol", rol);

    setToken(t);
    setUser({ email: mail, rol });

    return { rol };
  }

  function logout() {
    localStorage.removeItem("auth.token");
    localStorage.removeItem("auth.email");
    localStorage.removeItem("auth.rol");
    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: !!token,
      isAdmin: (user?.rol || "").toUpperCase() === "SUPER_ADMIN",
      login,
      logout,
    }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
