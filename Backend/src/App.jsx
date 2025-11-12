// src/App.jsx
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";

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
import ProductosPublic from "./pages/ProductosPublic.jsx";
import Carrito from "./pages/carrito.jsx";
import InvoicesList from "./pages/InvoicesList.jsx";
import InvoiceDetail from "./pages/InvoiceDetail.jsx";

// Admin
import AdminLayout from "./components/admin/AdminLayout.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import AdminProductos from "./pages/AdminProductos.jsx";
import AdminProductoNuevo from "./pages/AdminProductoNuevo.jsx";
import AdminProductoEditar from "./pages/AdminProductoEditar.jsx";
import AdminUsuarios from "./pages/AdminUsuarios.jsx";

// Ruta protegida: requiere sesión y rol SUPER_ADMIN
function ProtectedAdminRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
}

// Ruta protegida: requiere sesión de usuario
function ProtectedUserRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}

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
          <Route path="/productos" element={<ProductosPublic />} />
          <Route
            path="/carrito"
            element={
              <ProtectedUserRoute>
                <Carrito />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/invoices"
            element={
              <ProtectedUserRoute>
                <InvoicesList />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/invoices/:id"
            element={
              <ProtectedUserRoute>
                <InvoiceDetail />
              </ProtectedUserRoute>
            }
          />

          {/* Admin (protegido) */}
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route index element={<AdminHome />} />
            <Route path="productos" element={<AdminProductos />} />
            <Route path="productos/nuevo" element={<AdminProductoNuevo />} />
            <Route path="productos/:id/editar" element={<AdminProductoEditar />} />
            <Route path="usuarios" element={<AdminUsuarios />} />

            {/* Cualquier ruta desconocida dentro de /admin → /admin */}
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>

          {/* Cualquier ruta desconocida pública → / */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAdmin && <Footer />}
    </>
  );
}
