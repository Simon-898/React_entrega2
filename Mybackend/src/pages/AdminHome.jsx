
export default function AdminHome() {
  return (
    <section>
      <h2 className="h5 m-0">Panel</h2>
      <div className="card p-3 mt-2">
        <p className="m-0">Bienvenido/a al panel de administración.</p>
      </div>

      {/* bloque con el logo centrado */}
      <div className="admin-home-center">
        <img
          src="/images/logochavito.jpeg"
          alt="Chavito Store"
          className="admin-home-logo"
        />
      </div>
    </section>
  );
}
