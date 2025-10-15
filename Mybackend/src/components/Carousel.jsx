import React from "react";

function Carousel() {
  return (
    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/images/carrusel1.jpeg" className="d-block w-100" alt="Imagen carrusel 1" />
        </div>
        <div className="carousel-item">
          <img src="/images/carrusel2.jpg" className="d-block w-100" alt="Imagen carrusel 2" />
        </div>
        <div className="carousel-item">
          <img src="/images/carrusel3.jpg" className="d-block w-100" alt="Imagen carrusel 3" />
        </div>
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>

      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
}

export default Carousel;
