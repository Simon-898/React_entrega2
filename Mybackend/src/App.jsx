export default function App() {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-sm navbar-dark mt-3">
          <div className="container-fluid">
            <a className="navbar-brand d-flex align-items-center gap-2" href="/">
              <img
                src="/images/logochavito.jpeg"
                alt="Logo Chavito"
                style={{ height: "55px", width: "auto", borderRadius: "50%" }}
              />
              <span className="fw-semibold"></span>
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#menucollapse"
              aria-controls="menucollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="menucollapse">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item"><a className="nav-link active" href="/">Inicio</a></li>
                <li className="nav-item"><a className="nav-link" href="/productos">Productos</a></li>
                <li className="nav-item"><a className="nav-link" href="/blogs">Blogs</a></li>
                <li className="nav-item"><a className="nav-link" href="/nosotros">Nosotros</a></li>
                <li className="nav-item"><a className="nav-link" href="/contacto">Contacto</a></li>
              </ul>

              <div className="d-flex align-items-center ms-2 gap-2">
                <a href="/carrito" className="btn btn-outline-light position-relative">
                  <i className="bi bi-bag-fill"></i> Bolsa
                  <span
                    id="cartCount"
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  >
                    0
                  </span>
                </a>

                <div className="dropdown">
                  <button
                    className="btn btn-outline-light dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-circle"></i> Cuenta
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                    <li>
                      <a href="/login" className="dropdown-item">
                        <i className="bi bi-person me-2"></i>Login
                      </a>
                    </li>
                    <li>
                      <a href="/registro" className="dropdown-item">
                        <i className="bi bi-person-add me-2"></i>Registro
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="container">
        {/* Carrusel */}
        <div id="heroCarousel" className="carousel slide mt-3" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/images/carrusel1.jpeg" alt="Imagen carrusel 1" className="d-block w-100" />
            </div>
            <div className="carousel-item">
              <img src="/images/carrusel2.jpg" alt="Imagen carrusel 2" className="d-block w-100" />
            </div>
            <div className="carousel-item">
              <img src="/images/carrusel3.jpg" alt="Imagen carrusel 3" className="d-block w-100" />
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev" aria-label="Anterior">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next" aria-label="Siguiente">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>

        {/* Marcas */}
        <section className="my-4">
          <div className="row g-4">
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card text-center bg-dark text-white p-4 h-100 rounded-4 border-0">
                <img src="/images/Gucci_Logo.png" alt="Logo Gucci" className="img-fluid mx-auto" style={{ height: 120, objectFit: "contain" }} />
                <h5 className="mt-3">GUCCI</h5>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card text-center bg-dark text-white p-4 h-100 rounded-4 border-0">
                <img src="/images/Louis_Vuitton.png" alt="Logo Louis Vuitton" className="img-fluid mx-auto" style={{ height: 120, objectFit: "contain" }} />
                <h5 className="mt-3">LOUIS VUITTON</h5>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card text-center bg-dark text-white p-4 h-100 rounded-4 border-0">
                <img src="/images/Dior_Logo.png" alt="Logo Dior" className="img-fluid mx-auto" style={{ height: 120, objectFit: "contain" }} />
                <h5 className="mt-3">DIOR</h5>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card text-center bg-dark text-white p-4 h-100 rounded-4 border-0">
                <img src="/images/Dolce-Gabbana.png" alt="Logo Dolce Gabbana" className="img-fluid mx-auto" style={{ height: 120, objectFit: "contain" }} />
                <h5 className="mt-3">DOLCE GABBANA</h5>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="footer mt-5"></footer>
    </>
  );
}
