import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Contacto() {
  const formRef = useRef(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    if (form.checkValidity()) {
      setSent(true);            // simula envío OK
      form.reset();
      form.classList.remove("was-validated");
    } else {
      setSent(false);
      form.classList.add("was-validated");
    }
  };

  return (
    <div className="container-xxl page-contact">
 
      <div className="row mt-4 mb-3">
        <div className="col">
          <h1 className="h4 m-0">Contáctanos</h1>
          <p className="text-muted m-0">Escríbenos y te respondemos pronto.</p>
        </div>
      </div>

      <div className="row g-4">
   
        <div className="col-12 col-lg-7">
          <div className="card border-dark">
            <div className="card-body">
              <form ref={formRef} noValidate onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    className="form-control"
                    placeholder="Tu nombre"
                    required
                    maxLength={50}
                  />
                  <div className="invalid-feedback">Ingresa tu nombre.</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="correo" className="form-label">Correo</label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    className="form-control"
                    placeholder="ejemplo@correo.com"
                    required
                    maxLength={100}
                  />
                  <div className="invalid-feedback">Ingresa un correo válido.</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="asunto" className="form-label">Asunto</label>
                  <select id="asunto" name="asunto" className="form-select" required>
                    <option value="">Selecciona un asunto</option>
                    <option value="pedido">Consulta sobre pedido</option>
                    <option value="cambios">Cambios / Devoluciones</option>
                    <option value="stock">Stock / Disponibilidad</option>
                    <option value="otros">Otros</option>
                  </select>
                  <div className="invalid-feedback">Selecciona un asunto.</div>
                </div>

                <div className="mb-4">
                  <label htmlFor="mensaje" className="form-label">Mensaje</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    className="form-control"
                    rows={5}
                    placeholder="Escribe tu mensaje..."
                    required
                    maxLength={600}
                  />
                  <div className="invalid-feedback">Cuéntanos tu consulta.</div>
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-dark">Enviar</button>
                  <button type="reset" className="btn btn-outline-dark">Limpiar</button>
                </div>

                {sent && (
                  <div className="alert alert-success mt-3 py-2 mb-0">
                    ¡Mensaje enviado! Te responderemos a la brevedad.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

  
        <div className="col-12 col-lg-5">
          <div className="info-box mb-3">
            <h2 className="h6">Datos de contacto</h2>
            <p className="mb-1"><strong>Correo:</strong> contacto@chavito.store</p>
            <p className="mb-1"><strong>Teléfono:</strong> +56 9 4886 6034</p>
            <p className="mb-1"><strong>Horario:</strong> Lunes a Viernes, 10:00–18:00</p>
            <p className="mb-0"><strong>Dirección:</strong> Calle Ejemplo 123, Santiago</p>
          </div>
        </div>
      </div>

       
      <div className="my-5"> 
        <Link to="/productos" className="btn btn-outline-dark">Volver a productos</Link>
      </div>
    </div>
  );
}
