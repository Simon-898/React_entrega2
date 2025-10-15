import { useParams } from 'react-router-dom';

export default function ProductoDetalle() {
  const { id } = useParams();
  return (
    <div className="container my-4">
      <h2 className="mb-3">Producto #{id}</h2>
      <p>Detalles del producto, descripción, precio, fotos, etc.</p>
      <button className="btn btn-dark">Agregar al carrito</button>
    </div>
  );
}
