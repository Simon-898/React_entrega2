import { useEffect, useMemo, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:8081";
const BASE = `${API}/api/usuarios`;



export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");

  // modal de crear/editar
  const [open, setOpen] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "CLIENTE",
  });

  // modal cambiar password
  const [openPwd, setOpenPwd] = useState(false);
  const [userPwd, setUserPwd] = useState(null);
  const [nuevaPassword, setNuevaPassword] = useState("");

  const fetchJSON = async (input, init) => {
    const res = await fetch(input, init);
    if (!res.ok) throw new Error((await res.text()) || `HTTP ${res.status}`);
    return res.status === 204 ? null : res.json();
  };

  const cargar = async () => {
    try {
      setCargando(true);
      setError("");
      const data = await fetchJSON(BASE);
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { cargar(); }, []);

  // ------- CRUD -------
  const abrirNuevo = () => {
    setEditando(null);
    setForm({ nombre: "", email: "", password: "", rol: "CLIENTE" });
    setOpen(true);
  };

  const abrirEditar = (u) => {
    setEditando(u);
    setForm({ nombre: u.nombre || "", email: u.email || "", password: "", rol: u.rol || "CLIENTE" });
    setOpen(true);
  };

  const cerrar = () => {
    setOpen(false);
    setEditando(null);
    setForm({ nombre: "", email: "", password: "", rol: "CLIENTE" });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      if (editando) {
        // PUT /{id} (si password vacío, no se cambia en el service)
        const payload = { ...form };
        if (!payload.password) delete payload.password;
        const actualizado = await fetchJSON(`${BASE}/${editando.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        setUsuarios((prev) => prev.map((x) => (x.id === editando.id ? actualizado : x)));
      } else {
        // POST /
        const creado = await fetchJSON(BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        setUsuarios((prev) => [creado, ...prev]);
      }
      cerrar();
    } catch (e2) {
      setError(e2.message);
    }
  };

  const eliminar = async (u) => {
    if (!confirm(`Eliminar a "${u.nombre}"?`)) return;
    try {
      await fetchJSON(`${BASE}/${u.id}`, { method: "DELETE" });
      setUsuarios((prev) => prev.filter((x) => x.id !== u.id));
    } catch (e) {
      alert(e.message);
    }
  };

  const inhabilitar = async (u) => {
    if (u.estado === "INACTIVO") {
      alert("No existe endpoint para reactivar. Solo puedes eliminar o editar.");
      return;
    }
    if (!confirm(`Inhabilitar a "${u.nombre}"?`)) return;
    try {
      const res = await fetchJSON(`${BASE}/${u.id}/inhabilitar`, { method: "PATCH" });
      setUsuarios((prev) => prev.map((x) => (x.id === u.id ? res : x)));
    } catch (e) {
      alert(e.message);
    }
  };

  // ------- Cambiar password -------
  const abrirCambiarPwd = (u) => {
    setUserPwd(u);
    setNuevaPassword("");
    setOpenPwd(true);
  };
  const cerrarPwd = () => { setOpenPwd(false); setUserPwd(null); setNuevaPassword(""); };

  const onCambiarPwd = async (e) => {
    e.preventDefault();
    try {
      await fetchJSON(`${BASE}/${userPwd.id}/password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nuevaPassword }),
      });
      cerrarPwd();
    } catch (e) {
      alert(e.message);
    }
  };

  // ------- Filtro -------
  const filtrados = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return usuarios;
    return usuarios.filter((u) =>
      String(u.id ?? "").includes(s) ||
      (u.nombre || "").toLowerCase().includes(s) ||
      (u.email || "").toLowerCase().includes(s) ||
      (u.rol || "").toLowerCase().includes(s) ||
      (u.estado || "").toLowerCase().includes(s)
    );
  }, [q, usuarios]);

  return (
    <section style={{ padding: 12 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>Usuarios</h2>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <input
            placeholder="Buscar (id, nombre, email, rol, estado)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #ccc", minWidth: 280 }}
          />
          <button onClick={abrirNuevo}>+ Nuevo</button>
          <button onClick={cargar}>⟳ Recargar</button>
        </div>
      </div>

      {error && <div style={{ marginTop: 10, color: "#b00020" }}>{error}</div>}

      <div style={{ marginTop: 12, overflowX: "auto" }}>
        {cargando ? (
          <p>Cargando…</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <Th>ID</Th>
                <Th>Nombre</Th>
                <Th>Email</Th>
                <Th>Rol</Th>
                <Th>Estado</Th>
                <Th>Creado</Th>
                <Th style={{ textAlign: "right" }}>Acciones</Th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((u) => (
                <tr key={u.id} style={{ borderTop: "1px solid #eee" }}>
                  <Td>{u.id}</Td>
                  <Td>{u.nombre}</Td>
                  <Td>{u.email}</Td>
                  <Td>{u.rol}</Td>
                  <Td>
                    <span style={{
                      padding: "2px 8px", borderRadius: 999, fontSize: 12,
                      background: u.estado === "ACTIVO" ? "#e6ffed" : "#ffecec",
                      color: u.estado === "ACTIVO" ? "#046d2c" : "#9f2b2b",
                      border: `1px solid ${u.estado === "ACTIVO" ? "#9ee6b3" : "#f5b0b0"}`
                    }}>
                      {u.estado}
                    </span>
                  </Td>
                  <Td>{u.fechaCreacion ? new Date(u.fechaCreacion).toLocaleString() : "-"}</Td>
                  <Td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <button onClick={() => abrirEditar(u)}>Editar</button>
                    <button onClick={() => abrirCambiarPwd(u)}>Cambiar pass</button>
                    <button onClick={() => inhabilitar(u)}>Inhabilitar</button>
                    <button onClick={() => eliminar(u)} style={{ color: "#b00020" }}>Eliminar</button>
                  </Td>
                </tr>
              ))}
              {filtrados.length === 0 && (
                <tr><Td colSpan={7} style={{ textAlign: "center", padding: 18, color: "#777" }}>Sin resultados</Td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal crear/editar */}
      {open && (
        <Modal onClose={cerrar} titulo={editando ? "Editar usuario" : "Nuevo usuario"}>
          <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
            <label style={lbl}>
              <span>Nombre</span>
              <input name="nombre" value={form.nombre} onChange={onChange} required />
            </label>
            <label style={lbl}>
              <span>Email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                pattern=".+@duoc\.cl"
                title="Debe ser un correo @duoc.cl"
                required
              />
            </label>
            <label style={lbl}>
              <span>{editando ? "Nueva contraseña (opcional)" : "Contraseña"}</span>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={onChange}
                {...(!editando ? { required: true } : {})}
              />
            </label>
            <label style={lbl}>
              <span>Rol</span>
              <select name="rol" value={form.rol} onChange={onChange}>
                <option value="CLIENTE">CLIENTE</option>
                <option value="VENDEDOR">VENDEDOR</option>
                <option value="SUPER_ADMIN">SUPER_ADMIN</option>
              </select>
            </label>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 6 }}>
              <button type="button" onClick={cerrar}>Cancelar</button>
              <button type="submit">{editando ? "Guardar cambios" : "Crear"}</button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal cambiar password */}
      {openPwd && (
        <Modal onClose={cerrarPwd} titulo={`Cambiar contraseña: ${userPwd?.nombre || ""}`}>
          <form onSubmit={onCambiarPwd} style={{ display: "grid", gap: 10 }}>
            <label style={lbl}>
              <span>Nueva contraseña</span>
              <input
                type="password"
                minLength={6}
                value={nuevaPassword}
                onChange={(e) => setNuevaPassword(e.target.value)}
                required
              />
            </label>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 6 }}>
              <button type="button" onClick={cerrarPwd}>Cancelar</button>
              <button type="submit">Cambiar</button>
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
}

function Th({ children, ...p }) {
  return <th {...p} style={{ textAlign: "left", padding: "10px 8px", fontSize: 13, borderBottom: "1px solid #ddd" }}>{children}</th>;
}
function Td({ children, ...p }) {
  return <td {...p} style={{ padding: "10px 8px", fontSize: 14, verticalAlign: "top" }}>{children}</td>;
}
const lbl = { display: "grid", gap: 6 };

function Modal({ titulo, onClose, children }) {
  return (
    <div role="dialog" aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.35)", display: "grid", placeItems: "center", padding: 16, zIndex: 50 }}>
      <div style={{ width: "100%", maxWidth: 520, background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 10px 30px rgba(0,0,0,.2)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <h3 style={{ margin: 0 }}>{titulo}</h3>
          <button onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
