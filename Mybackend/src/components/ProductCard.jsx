export default function ProductCard({ id, imagen, titulo, precio }) {
  return (
    <div className="card h-100">
      <img src={imagen} className="card-img-top" alt={titulo} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-dark">{titulo}</h5>
        <p className="card-text fw-semibold text-dark">{precio}</p>
        <a href={`/productos/${id}`} className="btn btn-dark mt-auto">Ver detalle</a>
      </div>
    </div>
  );
}
