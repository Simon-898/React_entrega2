-- Script para sincronizar usuarios de simon a simon2
-- IMPORTANTE: Ejecutar DESPUÉS de que las tablas se creen con Hibernate

-- Sincronización de usuarios (asumiendo que ambas bases están en el mismo servidor)
-- Reemplaza 'simondb' con el nombre real de la BD de simon si es diferente

INSERT INTO usuario (id, email, password, rol, fecha_creacion)
SELECT id, email, password, rol, fecha_creacion FROM simondb.usuario
ON DUPLICATE KEY UPDATE email=email;

-- Verificar que los usuarios se sincronizaron
SELECT 'Usuarios en simon2:' as info;
SELECT id, email, rol FROM usuario;

