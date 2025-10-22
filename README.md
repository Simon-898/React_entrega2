# Frontend "Chavito Store"

Aplicación web desarrollada con **React + Vite** que ofrece la vitrina pública y el panel
de administración para la tienda ficticia *Chavito Store*. El proyecto consume los
microservicios `simon` (usuarios) y `simon2` (productos/categorías) para mantener la
información sincronizada.

## Características principales

- **Sitio público** con páginas de inicio, blogs, sección "Nosotros" y formulario de contacto.
- **Autenticación simulada** mediante formularios de registro e ingreso (la lógica real se
  delega al backend `simon`).
- **Catálogo administrable**: creación, edición, desactivación, eliminación y ajuste de stock
  para productos.
- **Gestión de usuarios** desde el panel administrativo.
- **KPIs en tiempo real** que consumen los conteos del backend (`usuarios` y `productos`).
- **Diseño responsivo** apoyado en Bootstrap 5 y Bootstrap Icons.

## Stack y dependencias relevantes

- [React 19](https://react.dev/), [React Router 7](https://reactrouter.com/), [Vite 7](https://vite.dev/).
- [Bootstrap 5](https://getbootstrap.com/) y [Bootstrap Icons](https://icons.getbootstrap.com/).
- ESLint con configuración recomendada para React.

## Estructura del proyecto

```
src/
  components/          Componentes reutilizables (Navbar, Footer, tarjetas, sidebar admin)
  components/admin/    Shell del panel (sidebar, layout)
  pages/               Páginas públicas y de administración
  routes/              Definiciones de rutas (si se requieren extensiones futuras)
  services/            Clientes fetch hacia los microservicios REST
  styles/              Hojas de estilo modulares para cada vista
```

## Configuración y variables de entorno

Crea un archivo `.env` en la raíz del proyecto (junto al `package.json`) con las URLs de los
microservicios:

```bash
VITE_API_URL=http://localhost:8081          # Servicio de usuarios (simon)
VITE_API_PRODUCTOS=http://localhost:8082    # Servicio de productos/categorías (simon2)
VITE_API_USUARIOS=http://localhost:8081     # Alias usado en métricas
```

## Scripts disponibles

| Comando              | Descripción |
|----------------------|-------------|
| `npm install`        | Instala dependencias. |
| `npm run dev`        | Levanta el servidor de desarrollo de Vite (por defecto en `5173`). |
| `npm run build`      | Genera la compilación optimizada en `dist/`. |
| `npm run preview`    | Sirve el *build* generado para pruebas locales. |
| `npm run lint`       | Ejecuta ESLint sobre los archivos fuente. |

## Integración con los microservicios

- **Usuarios (`simon`)**: se consumen los endpoints `/api/usuarios`.
- **Productos (`simon2`)**: CRUD completo a `/api/productos` y manejo de stock.
- **Categorías (`simon2`)**: consulta a `/api/categorias` para selectores del formulario.

> Asegúrate de tener ambos microservicios ejecutándose antes de usar el panel administrativo.

## Requisitos previos

- Node.js 20+ (LTS recomendado) y npm.
- Microservicios Java (`simon` y `simon2`) conectados a MySQL.

## Puesta en marcha rápida

```bash
cd Backend
npm install
npm run dev
```

Abre <http://localhost:5173> para acceder al sitio y al panel `/admin`.

## Próximos pasos

- Integrar autenticación real (tokens).
- Añadir pruebas unitarias.
- Mejorar el feedback visual (toasts).

---

# Microservicio de Usuarios (`simon`)

Servicio REST con **Spring Boot 3** para la administración de usuarios de *Chavito Store*.

## Características clave

- Persistencia en **MySQL** con Spring Data JPA.
- Hash de contraseñas con `BCryptPasswordEncoder`.
- Validaciones con `jakarta.validation`.
- Manejo centralizado de errores con `RestExceptionHandler`.
- Documentación con Springdoc/OpenAPI (Swagger UI).
- CORS habilitado para `http://localhost:5173`.

## Configuración

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/baseropa?useSSL=false&serverTimezone=America/Santiago
spring.datasource.username=root
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8081
```

## Ejecución

```bash
cd simon
./mvnw spring-boot:run
```

Disponible en <http://localhost:8081>.

## Endpoints principales

| Método y ruta | Descripción |
|----------------|-------------|
| `POST /api/usuarios` | Crear usuario |
| `GET /api/usuarios` | Listar usuarios |
| `GET /api/usuarios/{id}` | Obtener usuario |
| `PUT /api/usuarios/{id}` | Actualizar usuario |
| `DELETE /api/usuarios/{id}` | Eliminar usuario |
| `PATCH /api/usuarios/{id}/inhabilitar` | Inhabilitar usuario |
| `PATCH /api/usuarios/{id}/password` | Cambiar contraseña |

---

# Microservicio de Productos (`simon2`)

Servicio REST con **Spring Boot 3** que gestiona el catálogo de productos y categorías.

## Características clave

- Persistencia en **MySQL**.
- Entidades `Producto` y `Categoria` relacionadas.
- Endpoints para CRUD y stock.
- CORS configurado para `http://localhost:5173`.

## Configuración

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/baseropa?useSSL=false&serverTimezone=America/Santiago
spring.datasource.username=root
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8082
```

## Ejecución

```bash
cd simon2
./mvnw spring-boot:run
```

Disponible en <http://localhost:8082>.
