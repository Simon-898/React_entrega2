import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart(); // 👈 cantidad total en carrito
  const { isAuthenticated, logout } = useAuth();

  const close = () => setOpen(false);

  return (
    <nav className="navbar navbar-expand-sm navbar-dark fixed-top">
      <div className="container-xxl">

        <Link className="navbar-brand d-flex align-items-center gap-2" to="/" onClick={close}>
          <img
            src="/images/logochavito.jpeg"
            alt="Logo"
            style={{ height: 60, width: 60, borderRadius: "50%", objectFit: "cover" }}
          />
        </Link>

        {/* Botón hamburguesa controlado por estado */}
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="mainNav"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen(o => !o)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Collapse controlado por estado */}
        <div className={`collapse navbar-collapse ${open ? "show" : ""}`} id="mainNav">
          <ul className="navbar-nav align-items-center gap-3 me-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link nav-underline" end onClick={close}>Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/productos" className="nav-link nav-underline" onClick={close}>Productos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/blogs" className="nav-link nav-underline" onClick={close}>Blogs</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/nosotros" className="nav-link nav-underline" onClick={close}>Nosotros</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contacto" className="nav-link nav-underline" onClick={close}>Contacto</NavLink>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <NavLink to="/invoices" className="nav-link nav-underline" onClick={close}>Boleta</NavLink>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            <Link
              to="/carrito"
              className="btn btn-outline-light btn-pill position-relative"
              onClick={close}
              aria-label={`Bolsa, ${count} artículo${count === 1 ? "" : "s"}`}
            >
              <i className="bi bi-bag me-1" />
              Bolsa
              {count > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: 12 }}
                >
                  {count}
                </span>
              )}
            </Link>

            <div className="dropdown">
              <button
                className="btn btn-outline-light btn-pill dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-person-circle me-1" />
                Cuenta
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                {isAuthenticated ? (
                  <>
                    <li><Link className="dropdown-item" to="/invoices" onClick={close}>Mis Boletas</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={() => { logout(); close(); }}>Cerrar sesión</button></li>
                  </>
                ) : (
                  <>
                    <li><Link className="dropdown-item" to="/login" onClick={close}>Iniciar sesión</Link></li>
                    <li><Link className="dropdown-item" to="/registro" onClick={close}>Crear cuenta</Link></li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
}
