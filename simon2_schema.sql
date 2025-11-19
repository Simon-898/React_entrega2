-- =============================================
-- SCRIPT PARA BASE DE DATOS: simon2
-- Puerto: 8082
-- Descripción: Base de datos de productos, órdenes y usuarios sincronizados
-- =============================================

-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS simon2;
USE simon2;

-- =============================================
-- TABLA: usuario (sincronizada desde simon)
-- =============================================
CREATE TABLE IF NOT EXISTS usuario (
  id BIGINT NOT NULL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO',
  fecha_creacion DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
  nombre VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  rol VARCHAR(20) NOT NULL DEFAULT 'CLIENTE',
  INDEX idx_email (email),
  CONSTRAINT chk_estado CHECK (estado IN ('ACTIVO', 'INACTIVO')),
  CONSTRAINT chk_rol CHECK (rol IN ('CLIENTE', 'VENDEDOR', 'SUPER_ADMIN', 'ADMIN'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLA: categoria
-- =============================================
CREATE TABLE IF NOT EXISTS categoria (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  descripcion TEXT,
  activo TINYINT(1) DEFAULT 1,
  fecha_creacion DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
  INDEX idx_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLA: producto
-- =============================================
CREATE TABLE IF NOT EXISTS producto (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  talla VARCHAR(5),
  image_url VARCHAR(255),
  activo TINYINT(1) DEFAULT 1,
  categoria_id INT NOT NULL,
  fecha_creacion DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
  fecha_actualizacion DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  INDEX idx_categoria (categoria_id),
  INDEX idx_nombre (nombre),
  INDEX idx_activo (activo),
  CONSTRAINT fk_producto_categoria FOREIGN KEY (categoria_id) REFERENCES categoria(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLA: orders (Órdenes/Facturas)
-- =============================================
CREATE TABLE IF NOT EXISTS orders (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  usuario_id BIGINT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  estado VARCHAR(50) DEFAULT 'PENDIENTE',
  fecha_creacion DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
  fecha_actualizacion DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  INDEX idx_usuario (usuario_id),
  INDEX idx_estado (estado),
  INDEX idx_fecha (fecha_creacion),
  CONSTRAINT fk_order_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- TABLA: order_items (Detalles de la orden)
-- =============================================
CREATE TABLE IF NOT EXISTS order_items (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  order_id BIGINT NOT NULL,
  producto_id INT NOT NULL,
  cantidad INT NOT NULL DEFAULT 1,
  talla VARCHAR(5),
  precio_unitario DECIMAL(10,2) NOT NULL,
  fecha_creacion DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
  INDEX idx_order (order_id),
  INDEX idx_producto (producto_id),
  CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  CONSTRAINT fk_order_items_producto FOREIGN KEY (producto_id) REFERENCES producto(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- DATOS DE PRUEBA: usuario (sincronizados desde simon)
-- =============================================
INSERT INTO usuario (id, email, estado, fecha_creacion, nombre, password_hash, rol) VALUES
(2, 'simon@duoc.cl', 'ACTIVO', '2025-10-19 22:36:41.000000', 'Simon Arevalo', '$2a$10$vK7esbIJCwAtkcX91KTss.20uA5YHU8l5dojL1TZ6VWu99pbVe/8G', 'SUPER_ADMIN'),
(3, 'pablo.vasconcelos@duoc.cl', 'ACTIVO', '2025-10-19 22:37:58.000000', 'Pablo Vasconcelos', '$2a$10$BClGha.w.TVewwJ51Uve..LqwIsbk/mvPzBjZdhhDMa5Q1KGF6Wa6', 'VENDEDOR'),
(6, 'valentina.rojas@duoc.cl', 'ACTIVO', '2025-10-19 22:40:08.000000', 'Valentina Rojas', '$2a$10$.rhAaM3U8IpEx7GjlGu3YutOHTbGhDKDkwPG8SU7jCmAcGHrZ0aGe', 'CLIENTE'),
(8, 'francisco.guerra@duoc.cl', 'ACTIVO', '2025-10-19 22:44:12.000000', 'Francisco Guerra', '$2a$10$mqD0AhAtEtUx52Hj/kEzuOEzn2OXv5KQDqiHfPpXinbcd5WE.S.IC', 'VENDEDOR'),
(9, 'javier.soto@duoc.cl', 'ACTIVO', '2025-10-20 16:54:37.000000', 'Javier Soto', '$2a$10$X/ZRIk.MQcxuZ7jGeOnhpe72bzOJ7QnAhUgxPa1sCXZmtDeqc6GKK', 'CLIENTE');

-- =============================================
-- DATOS DE PRUEBA: categorías
-- =============================================
INSERT INTO categoria (id, nombre, descripcion, activo) VALUES
(7, 'Accesorios', 'Gorros, cinturones, pasamontañas y otros accesorios', 1),
(8, 'Chaquetas', 'Chaquetas acolchadas y deportivas para invierno', 1),
(9, 'Shorts', 'Shorts de mezclilla y otros materiales', 1),
(10, 'Poleras', 'Poleras y camisetas de diversos diseños', 1),
(11, 'Polerón', 'Polerón y sudaderas', 1);

-- =============================================
-- DATOS DE PRUEBA: productos
-- =============================================
INSERT INTO producto (nombre, descripcion, precio, stock, talla, image_url, activo, categoria_id) VALUES
('Capucha Nike', 'Pasamontañas negro Nike ideal para frío o deporte al aire libre.', 14990, 10, 'L', 'http://localhost:5173/images/capucha_nike.png', 1, 7),
('Chaqueta Adidas', 'Chaqueta Adidas azul con capucha, acolchada y cómoda para invierno.', 49990, 8, 'M', 'http://localhost:5173/images/chadidas.png', 1, 8),
('Chaqueta Face', 'Chaqueta negra acolchada estilo puffer, diseño moderno y abrigado.', 59990, 6, 'XL', 'http://localhost:5173/images/chface.png', 1, 8),
('Chaqueta Nike', 'Chaqueta Nike negra con detalles blancos, estilo deportivo.', 50000, 5, 'S', 'http://localhost:5173/images/chnike.png', 1, 8),
('Cinturón Gucci', 'Cinturón Gucci beige con logotipo dorado, accesorio elegante.', 89990, 12, 'M', 'http://localhost:5173/images/Cinturon_Gucci.png', 1, 7),
('Gorro Gucci', 'Gorro Gucci tipo jockey con diseño clásico y franjas verde-rojas.', 39990, 9, 'L', 'http://localhost:5173/images/gorro_gucci.png', 1, 7),
('Polera YuGi', 'Polera negra con diseño Yu-Gi-Oh!, estilo urbano y juvenil.', 19990, 10, 'M', 'http://localhost:5173/images/polera_yugi.png', 1, 10),
('Polera Nocta', 'Polera Nocta negra con logotipo blanco minimalista.', 24990, 7, 'L', 'http://localhost:5173/images/poleraNocta.png', 1, 10),
('Polera Super', 'Polera negra con estampado colorido y diseño moderno.', 21990, 6, 'XL', 'http://localhost:5173/images/poleraSUPER.png', 1, 10),
('Polerón DS', 'Polerón negro DSquared2 con logo blanco frontal.', 39990, 8, 'M', 'http://localhost:5173/images/Poleron_DS.png', 1, 11),
('Polerón Gucci', 'Polerón blanco Gucci con logo frontal clásico rojo y verde.', 49990, 7, 'L', 'http://localhost:5173/images/Poleron_gucci.png', 1, 11),
('Polerón Supreme', 'Polerón negro Supreme con logo clásico al frente.', 45990, 5, 'XL', 'http://localhost:5173/images/Poleron_Super.png', 1, 11),
('Short Black', 'Short negro de mezclilla con diseño moderno.', 24990, 10, 'M', 'http://localhost:5173/images/Short_black.png', 1, 9),
('Short Blue', 'Short azul clásico de mezclilla, cómodo y versátil.', 22990, 8, 'L', 'http://localhost:5173/images/Short_blue.png', 1, 9),
('Short Purple Night', 'Short azul oscuro con detalles en tonos morados.', 25990, 6, 'S', 'http://localhost:5173/images/Short_night.png', 1, 9);
