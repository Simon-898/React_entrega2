import Navbar from "../components/Navbar";
export default function Home() {
  const slides = ['carrusel1.jpeg', 'carrusel2.jpg', 'carrusel3.jpg'];

  return (
    <>
    <Navbar />
      {/* Carrusel */}
      <section className="hero-carousel my-4">
        <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {slides.map((_, i) => (
              <button key={i} type="button" data-bs-target="#heroCarousel" data-bs-slide-to={i} className={i === 0 ? 'active' : ''} />
            ))}
          </div>

          <div className="carousel-inner rounded-4 shadow-lg">
            {slides.map((f, i) => (
              <div key={f} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
                <img src={`/images/${f}`} className="d-block w-100 hero-slide" alt={`Slide ${i + 1}`} />
              </div>
            ))}
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Anterior</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>
      </section>

      {/* Marcas */}
      <section className="brands-grid">
        {[
          ['Gucci_Logo.png','GUCCI'],
          ['Louis_Vuitton.png','LOUIS VUITTON'],
          ['Dior_Logo.png','DIOR'],
          ['Dolce-Gabbana.png','DOLCE GABBANA'],
        ].map(([img,label])=>(
          <div key={img} className="brand">
            <img src={`/images/${img}`} alt={label} className="brand-img" />
            <div className="brand-label">{label}</div>
          </div>
        ))}
      </section>
    </>
  );
}
