export default function Blogs() {

  return (
    <div className="container-xxl page-blog">
      {/* Encabezado */}
      <div className="row mt-4 mb-2">
        <div className="col">
          <h1 className="h4 m-0">Blog</h1>
          <p className="text-muted m-0">Artículos y consejos de moda urbana.</p>
        </div>
      </div>

      {/* Cards */}
      <div className="row g-4 mt-1">
     
        <div className="col-12 col-md-6">
          <article className="card h-100 border-1 border-dark">
            <img
              src="/images/fotoblog.jpeg"
              className="card-img-top blog-img"
              alt="Tendencia Blanco y Negro"
            />
            <div className="card-body d-flex flex-column">
              <h2 className="h5 card-title">Tendencia Blanco y Negro</h2>
              <p className="card-text flex-grow-1">
                En 2025, la tendencia entre los jóvenes apuesta por la simplicidad y el
                contraste del blanco y negro. Estas combinaciones no solo transmiten
                elegancia y modernidad, sino que también reflejan un estilo urbano fácil
                de adaptar al día a día. Las prendas oversize en tonos neutros, los
                accesorios minimalistas y los cortes cómodos son clave, logrando un look
                fresco y versátil que encaja tanto en la universidad como en una salida
                con amigos.
              </p>
            </div>
          </article>
        </div>

       
        <div className="col-12 col-md-6">
          <article className="card h-100 border-1 border-dark">
            <img
              src="/images/blog2.jpeg"
              className="card-img-top blog-img"
              alt="Cómo cuidar tus prendas"
            />
            <div className="card-body d-flex flex-column">
              <h2 className="h5 card-title">Cómo cuidar tus prendas</h2>
              <p className="card-text flex-grow-1">
                El cuidado de la ropa se ha convertido en una prioridad para los jóvenes
                que buscan alargar la vida útil de sus outfits favoritos. En 2025, la
                regla básica es simple: menos químicos, más conciencia. Lava tus prendas
                al revés, utiliza agua fría y evita la secadora para mantener los colores
                vivos. El secado a la sombra y el uso de detergentes suaves ayudan a
                conservar la forma y textura de las telas. Con pequeños hábitos, puedes
                mantener tu estilo fresco y al mismo tiempo reducir el impacto ambiental.
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
