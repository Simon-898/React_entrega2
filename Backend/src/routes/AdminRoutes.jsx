// src/routes/AdminRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Layout y páginas admin
import AdminLayout from "../components/admin/AdminLayout.jsx";
import AdminHome from "../pages/AdminHome.jsx";
import AdminProductos from "../pages/AdminProductos.jsx";
import AdminUsuarios from "../pages/AdminUsuarios.jsx";

/**
 * Ruta protegida: solo accesible para usuarios autenticados con rol SUPER_ADMIN
 */
function ProtectedAdminRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    // Si no está logueado → al login
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    // Si está logueado pero no es admin → a inicio
    return <Navigate to="/" replace />;
  }

  return children;
}

/**
 * Definición de rutas internas del panel admin
 */
export default function AdminRoutes() {
  return (
    <Routes>
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
        <Route path="usuarios" element={<AdminUsuarios />} />

        {/* Cualquier otra ruta redirige al panel */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
}
