import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="brand">
        <img src="/images/logochavito.jpeg" alt="Logo" />
        <div>
          <div className="fw-bold">Chavito Admin</div>
        </div>
      </div>

      <nav className="d-grid gap-1">
        <NavLink end to="/admin" className="nav-link">🏠 Home</NavLink>
        <div className="mt-2 small text-uppercase opacity-75">Gestión</div>
        <NavLink to="/admin/productos" className="nav-link">📦 Productos</NavLink>
        <NavLink to="/admin/usuarios" className="nav-link">👥 Usuarios</NavLink>
        <hr />
        <a className="nav-link" href="/">🚪 Cerrar sesión</a>
      </nav>
    </aside>
  );
}
