import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark fixed-top">
      <div className="container-xxl">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img
            src="/images/logochavito.jpeg"
            alt="Logo"
            style={{ height: 60, width: 60, borderRadius: "50%", objectFit: "cover" }}
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
     
          <ul className="navbar-nav align-items-center gap-3 me-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link nav-underline" end>Inicio</NavLink>
            </li>
          
            

            <li className="nav-item">
              <NavLink to="/productos" className="nav-link nav-underline">Productos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/blogs" className="nav-link nav-underline">Blogs</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/nosotros" className="nav-link nav-underline">Nosotros</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contacto" className="nav-link nav-underline">Contacto</NavLink>
            </li>
          </ul>

          {/* DERECHA: controles */}
          <div className="d-flex align-items-center gap-3">
            <Link to="/carrito" className="btn btn-outline-light btn-pill position-relative">
              <i className="bi bi-bag me-1" />
              Bolsa
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">0</span>
            </Link>

            <div className="dropdown">
              <button
                className="btn btn-outline-light btn-pill dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle me-1" />
                Cuenta
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" to="/login">Iniciar sesión</Link></li>
                <li><Link className="dropdown-item" to="/registro">Crear cuenta</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
