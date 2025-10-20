
import { Routes, Route, useLocation } from "react-router-dom";

// Navbar / Footer públicos
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Páginas públicas
import Home from "./pages/Home.jsx";
import Blogs from "./pages/Blogs.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Contacto from "./pages/Contacto.jsx";
import Registro from "./pages/Registro.jsx";
import Login from "./pages/Login.jsx";

// Admin
import AdminLayout from "./components/admin/AdminLayout.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import AdminProductos from "./pages/AdminProductos.jsx";
import AdminProductoNuevo from "./pages/AdminProductoNuevo.jsx";
import AdminProductoEditar from "./pages/AdminProductoEditar.jsx";
import AdminUsuarios from "./pages/AdminUsuarios.jsx";

export default function App() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}

      <main className={!isAdmin ? "public-main" : undefined}>
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="productos" element={<AdminProductos />} />
            <Route path="productos/nuevo" element={<AdminProductoNuevo />} />
            <Route path="productos/:id/editar" element={<AdminProductoEditar />} />
            <Route path="usuarios" element={<AdminUsuarios />} />
          </Route>
        </Routes>
      </main>

      {!isAdmin && <Footer />}
    </>
  );
}
