-- Creación de tabla (opcional, solo si no existe)
CREATE TABLE IF NOT EXISTS producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    activo TINYINT(1),
    descripcion TEXT,
    nombre VARCHAR(100),
    precio DECIMAL(10,2),
    categoria_id INT,
    image_url VARCHAR(255),
    talla VARCHAR(5),
    stock INT
);

-- Inserción de productos
INSERT INTO producto (activo, descripcion, nombre, precio, categoria_id, image_url, talla, stock) VALUES
(1, 'Pasamontañas negro Nike ideal para frío o deporte al aire libre.', 'Capucha Nike', 14990, 7, 'http://localhost:5173/images/capucha_nike.png', 'L', 10),
(1, 'Chaqueta Adidas azul con capucha, acolchada y cómoda para invierno.', 'Chaqueta Adidas', 49990, 8, 'http://localhost:5173/images/chadidas.png', 'M', 8),
(1, 'Chaqueta negra acolchada estilo puffer, diseño moderno y abrigado.', 'Chaqueta Face', 59990, 8, 'http://localhost:5173/images/chface.png', 'XL', 6),
(1, 'Chaqueta Nike negra con detalles blancos, estilo deportivo.', 'Chaqueta Nike', 50000, 8, 'http://localhost:5173/images/chnike.png', 'S', 5),
(1, 'Cinturón Gucci beige con logotipo dorado, accesorio elegante.', 'Cinturón Gucci', 89990, 7, 'http://localhost:5173/images/Cinturon_Gucci.png', 'M', 12),
(1, 'Gorro Gucci tipo jockey con diseño clásico y franjas verde-rojas.', 'Gorro Gucci', 39990, 7, 'http://localhost:5173/images/gorro_gucci.png', 'L', 9),
(1, 'Polera negra con diseño Yu-Gi-Oh!, estilo urbano y juvenil.', 'Polera YuGi', 19990, 10, 'http://localhost:5173/images/polera_yugi.png', 'M', 10),
(1, 'Polera Nocta negra con logotipo blanco minimalista.', 'Polera Nocta', 24990, 10, 'http://localhost:5173/images/poleraNocta.png', 'L', 7),
(1, 'Polera negra con estampado colorido y diseño moderno.', 'Polera Super', 21990, 10, 'http://localhost:5173/images/poleraSUPER.png', 'XL', 6),
(1, 'Polerón negro DSquared2 con logo blanco frontal.', 'Polerón DS', 39990, 11, 'http://localhost:5173/images/Poleron_DS.png', 'M', 8),
(1, 'Polerón blanco Gucci con logo frontal clásico rojo y verde.', 'Polerón Gucci', 49990, 11, 'http://localhost:5173/images/Poleron_gucci.png', 'L', 7),
(1, 'Polerón negro Supreme con logo clásico al frente.', 'Polerón Supreme', 45990, 11, 'http://localhost:5173/images/Poleron_Super.png', 'XL', 5),
(1, 'Short negro de mezclilla con diseño moderno.', 'Short Black', 24990, 9, 'http://localhost:5173/images/Short_black.png', 'M', 10),
(1, 'Short azul clásico de mezclilla, cómodo y versátil.', 'Short Blue', 22990, 9, 'http://localhost:5173/images/Short_blue.png', 'L', 8),
(1, 'Short azul oscuro con detalles en tonos morados.', 'Short Purple Night', 25990, 9, 'http://localhost:5173/images/Short_night.png', 'S', 6);
