import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Nosotros() {
  return (
    <>
      <Navbar />
    <div className="container-xxl page-about">
     
      <section className="text-center my-4">
        <img
          src="/images/logochavito.jpeg"   
          alt="Logo de Chavito Store"
          className="about-hero-img img-fluid"
        />
        <h1 className="h3 mt-4">Sobre Chavito Store</h1>
        <p className="mt-2 mb-0">
          Somos una tienda de ropa urbana y accesorios enfocada en calidad y estilo atemporal.
        </p>
        <p className="m-0">
          Trabajamos con ropa de alta calidad y las mejores marcas, sin complicaciones.
        </p>
      </section>

     
      <section className="my-4">
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <div className="feature h-100">
              <h2 className="h5">Misión</h2>
              <p className="mb-0">
                Ofrecer prendas y accesorios seleccionados, con una experiencia de compra clara y cercana.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="feature h-100">
              <h2 className="h5">Visión</h2>
              <p className="mb-0">
                Convertirnos en la tienda de referencia para quienes buscan estilo urbano minimalista.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="feature h-100">
              <h2 className="h5">Valores</h2>
              <ul className="mb-0 ps-3">
                <li>Calidad</li>
                <li>Transparencia</li>
                <li>Cercanía</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

  
      <section className="my-4">
        <h2 className="h5 mb-3">Preguntas frecuentes</h2>

        <div className="accordion" id="faqNosotros">
        
          <div className="accordion-item">
            <h2 className="accordion-header" id="faq-q1">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq-a1"
                aria-expanded="false"
                aria-controls="faq-a1"
              >
                ¿Cómo realizan los envíos?
              </button>
            </h2>
            <div
              id="faq-a1"
              className="accordion-collapse collapse"
              aria-labelledby="faq-q1"
              data-bs-parent="#faqNosotros"
            >
              <div className="accordion-body">
                Trabajamos con couriers nacionales. Plazos estimados 2–5 días hábiles.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="faq-q2">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq-a2"
                aria-expanded="false"
                aria-controls="faq-a2"
              >
                ¿Hacen cambios o devoluciones?
              </button>
            </h2>
            <div
              id="faq-a2"
              className="accordion-collapse collapse"
              aria-labelledby="faq-q2"
              data-bs-parent="#faqNosotros"
            >
              <div className="accordion-body">
                Sí, dentro de 10 días con boleta y producto en buen estado.
              </div>
            </div>
          </div>

        
          <div className="accordion-item">
            <h2 className="accordion-header" id="faq-q3">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq-a3"
                aria-expanded="false"
                aria-controls="faq-a3"
              >
                ¿Cómo puedo contactarlos?
              </button>
            </h2>
            <div
              id="faq-a3"
              className="accordion-collapse collapse"
              aria-labelledby="faq-q3"
              data-bs-parent="#faqNosotros"
            >
              <div className="accordion-body">
                Escríbenos desde la página <Link to="/contacto">Contacto</Link> o por redes sociales.
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="my-5 text-center">
        <Link to="/productos" className="btn btn-dark me-2">Ver productos</Link>
        <Link to="/contacto" className="btn btn-outline-dark">Contáctanos</Link>
      </section>
    </div>
    </>
  );
}
