-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-10-2025 a las 17:40:36
-- Versión del servidor: 10.1.25-MariaDB
-- Versión de PHP: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `baseropa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `fecha_creacion` datetime(6) DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `rol` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `email`, `estado`, `fecha_creacion`, `nombre`, `password_hash`, `rol`) VALUES
(2, 'simon@duoc.cl', 'ACTIVO', '2025-10-19 22:36:41.000000', 'Simon Arevalo', '$2a$10$vK7esbIJCwAtkcX91KTss.20uA5YHU8l5dojL1TZ6VWu99pbVe/8G', 'SUPER_ADMIN'),
(3, 'pablo.vasconcelos@duoc.cl', 'ACTIVO', '2025-10-19 22:37:58.000000', 'Pablo Vasconcelos', '$2a$10$BClGha.w.TVewwJ51Uve..LqwIsbk/mvPzBjZdhhDMa5Q1KGF6Wa6', 'VENDEDOR'),
(6, 'valentina.rojas@duoc.cl', 'ACTIVO', '2025-10-19 22:40:08.000000', 'Valentina Rojas', '$2a$10$.rhAaM3U8IpEx7GjlGu3YutOHTbGhDKDkwPG8SU7jCmAcGHrZ0aGe', 'CLIENTE'),
(8, 'francisco.guerra@duoc.cl', 'ACTIVO', '2025-10-19 22:44:12.000000', 'Francisco Guerra', '$2a$10$mqD0AhAtEtUx52Hj/kEzuOEzn2OXv5KQDqiHfPpXinbcd5WE.S.IC', 'VENDEDOR'),
(9, 'javier.soto@duoc.cl', 'ACTIVO', '2025-10-20 16:54:37.000000', 'Javier Soto', '$2a$10$X/ZRIk.MQcxuZ7jGeOnhpe72bzOJ7QnAhUgxPa1sCXZmtDeqc6GKK', 'CLIENTE');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_usuario_email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
