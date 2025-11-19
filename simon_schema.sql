-- =============================================
-- SCRIPT PARA BASE DE DATOS: simon
-- Puerto: 8081
-- Descripción: Base de datos de autenticación
-- =============================================

-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS simon;
USE simon;

-- =============================================
-- TABLA: usuario (autenticación)
-- =============================================
CREATE TABLE IF NOT EXISTS usuario (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
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
-- DATOS DE PRUEBA: usuario
-- =============================================
INSERT INTO usuario (email, estado, fecha_creacion, nombre, password_hash, rol) VALUES
('simon@duoc.cl', 'ACTIVO', '2025-10-19 22:36:41.000000', 'Simon Arevalo', '$2a$10$vK7esbIJCwAtkcX91KTss.20uA5YHU8l5dojL1TZ6VWu99pbVe/8G', 'SUPER_ADMIN'),
('pablo.vasconcelos@duoc.cl', 'ACTIVO', '2025-10-19 22:37:58.000000', 'Pablo Vasconcelos', '$2a$10$BClGha.w.TVewwJ51Uve..LqwIsbk/mvPzBjZdhhDMa5Q1KGF6Wa6', 'VENDEDOR'),
('valentina.rojas@duoc.cl', 'ACTIVO', '2025-10-19 22:40:08.000000', 'Valentina Rojas', '$2a$10$.rhAaM3U8IpEx7GjlGu3YutOHTbGhDKDkwPG8SU7jCmAcGHrZ0aGe', 'CLIENTE'),
('francisco.guerra@duoc.cl', 'ACTIVO', '2025-10-19 22:44:12.000000', 'Francisco Guerra', '$2a$10$mqD0AhAtEtUx52Hj/kEzuOEzn2OXv5KQDqiHfPpXinbcd5WE.S.IC', 'VENDEDOR'),
('javier.soto@duoc.cl', 'ACTIVO', '2025-10-20 16:54:37.000000', 'Javier Soto', '$2a$10$X/ZRIk.MQcxuZ7jGeOnhpe72bzOJ7QnAhUgxPa1sCXZmtDeqc6GKK', 'CLIENTE');
