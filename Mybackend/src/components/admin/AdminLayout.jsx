
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar.jsx";
import "../../styles/admin-shell.css";

export default function AdminLayout() {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <AdminSidebar />
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
