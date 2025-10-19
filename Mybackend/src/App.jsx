// src/App.jsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Footer from "./components/Footer.jsx";

// Públicas
import Home from "./pages/Home.jsx";
import Blogs from "./pages/Blogs.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Contacto from "./pages/Contacto.jsx";
import Login from "./pages/Login.jsx";

// Admin
import AdminLayout from "./components/admin/AdminLayout.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import AdminProductos from "./pages/AdminProductos.jsx";
import AdminUsuarios from "./pages/AdminUsuarios.jsx";
import AdminProductoNuevo from "./pages/AdminProductoNuevo.jsx";
import AdminProductoEditar from "./pages/AdminProductoEditar.jsx";

export default function App() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas Admin con layout propio */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="productos" element={<AdminProductos />} />
          <Route path="productos/nuevo" element={<AdminProductoNuevo />} />
          <Route path="productos/:id/editar" element={<AdminProductoEditar />} />
          <Route path="usuarios" element={<AdminUsuarios />} />
          
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        {/* fallback global */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Footer solo fuera del admin */}
      {!isAdmin && <Footer />}
    </>
  );
}
