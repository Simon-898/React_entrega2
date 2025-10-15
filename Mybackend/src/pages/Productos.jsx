import ProductCard from '../components/ProductCard';

const MOCK = [
  { id: 1, titulo: 'Zapatilla Gucci Ace', precio: '$299.990', imagen: '/images/Gucci_Logo.png' },
  { id: 2, titulo: 'Bolso LV Neverfull', precio: '$899.990', imagen: '/images/Louis_Vuitton.png' },
  { id: 3, titulo: 'Perfume Dior Homme', precio: '$129.990', imagen: '/images/Dior_Logo.png' },
  { id: 4, titulo: 'Cinturón D&G', precio: '$199.990', imagen: '/images/Dolce-Gabbana.png' },
];

export default function Productos() {
  return (
    <div className="container my-4">
      <div className="row g-4">
        {MOCK.map(p => (
          <div key={p.id} className="col-12 col-sm-6 col-lg-3">
            <ProductCard {...p} />
          </div>
        ))}
      </div>
    </div>
  );
}
