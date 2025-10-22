import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { crearUsuario } from "../services/usuariosApi";
import Navbar from "../components/Navbar.jsx";

/** ===========================
 *  Helpers de validación
 *  =========================== */
const EMAIL_RE = /^[a-z0-9._%+-]+@duoc\.cl$/i;
const NAME_RE = /^[A-ZÁÉÍÓÚÜÑa-záéíóúüñ\s'-]{2,60}$/; // letras + espacios
const COMMON_PASSWORDS = new Set([
  "123456","123456789","qwerty","password","111111","12345678","abc123",
  "password1","admin","123123","000000","iloveyou","qwerty123","1q2w3e4r",
]);

function normalizeSpaces(s) {
  return s.replace(/\s+/g, " ").trim();
}

function hasSequence(pw, len = 5) {
  if (pw.length < len) return false;
  const s = pw.toLowerCase();
  for (let i = 0; i <= s.length - len; i++) {
    let inc = true, dec = true;
    for (let k = 1; k < len; k++) {
      if (s.charCodeAt(i + k) !== s.charCodeAt(i) + k) inc = false;
      if (s.charCodeAt(i + k) !== s.charCodeAt(i) - k) dec = false;
      if (!inc && !dec) break;
    }
    if (inc || dec) return true;
  }
  return false;
}

function passwordChecks(pw, email = "") {
  const checks = {
    length: pw.length >= 8 && pw.length <= 72,
    lower: /[a-z]/.test(pw),
    upper: /[A-Z]/.test(pw),
    digit: /\d/.test(pw),
    symbol: /[^A-Za-z0-9]/.test(pw),
    noSpaces: !/\s/.test(pw),
    notCommon: !COMMON_PASSWORDS.has(pw.toLowerCase()),
    notSeq: !hasSequence(pw),
    notEmail: !!email && !pw.toLowerCase().includes(email.split("@")[0]?.toLowerCase()),
    notDuocWord: !/duoc/i.test(pw),
    noSameCharX4: !/(.)\1\1\1/.test(pw),
  };
  const metCount = Object.values(checks).filter(Boolean).length;

  // Score de 0 a 4 (simple)
  let score = 0;
  if (checks.length) score++;
  if (checks.lower && checks.upper) score++;
  if (checks.digit || checks.symbol) score++;
  if (checks.noSpaces && checks.notCommon && checks.notSeq && checks.noSameCharX4) score++;

  return { checks, score, metCount };
}

function strengthLabel(score) {
  return ["Muy débil", "Débil", "Media", "Fuerte", "Muy fuerte"][score] ?? "—";
}

export default function Registro() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const emailOK = EMAIL_RE.test(form.email);
  const nameOK  = NAME_RE.test(normalizeSpaces(form.nombre));
  const { checks, score } = useMemo(
    () => passwordChecks(form.password, form.email),
    [form.password, form.email]
  );
  const passOK = checks.length && checks.lower && checks.upper && (checks.digit || checks.symbol)
    && checks.noSpaces && checks.notCommon && checks.notSeq && checks.noSameCharX4;
  const confirmOK = form.password.length > 0 && form.password === form.confirm;

  const isValid = nameOK && emailOK && passOK && confirmOK;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };
  const onBlur = (e) => setTouched(t => ({ ...t, [e.target.name]: true }));

  // CapsLock warning para password
  const capsRef = useRef(false);
  useEffect(() => {
    const handler = (e) => { capsRef.current = e.getModifierState?.("CapsLock"); };
    window.addEventListener("keydown", handler);
    window.addEventListener("keyup", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("keyup", handler);
    };
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setErr(""); setOk(""); setLoading(true);

      // Normaliza nombre
      const nombre = normalizeSpaces(form.nombre);

      // Validaciones finales
      if (!NAME_RE.test(nombre)) throw new Error("Ingresa tu nombre real (solo letras y espacios).");
      if (!EMAIL_RE.test(form.email)) throw new Error("El correo debe ser @duoc.cl");
      if (!passOK) throw new Error("La contraseña no cumple los requisitos mínimos.");
      if (!confirmOK) throw new Error("Las contraseñas no coinciden.");

      await crearUsuario({
        nombre,
        email: form.email.toLowerCase(),
        password: form.password,
        rol: "CLIENTE",
      });

      setOk("✅ Cuenta creada con éxito. Te redirigimos al login…");
      setTimeout(() => nav("/login"), 1200);
    } catch (e2) {
      // intenta parsear mensajes del backend si vienen como texto/JSON
      const msg = (typeof e2 === "string" && e2) ||
                  e2?.message ||
                  "No se pudo crear la cuenta";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  };

  const hint = (ok, msg) => (
    <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color: ok ? "#0b7a3e" : "#b00020" }}>
      <span style={{
        display:"inline-flex", width:18, height:18, borderRadius:"50%",
        alignItems:"center", justifyContent:"center",
        background: ok ? "#e6ffed" : "#ffe5e5", border: `1px solid ${ok ? "#46b37c" : "#ff9aa2"}`
      }}>
        {ok ? "✓" : "!"}
      </span>
      {msg}
    </div>
  );

  return (
    <>
      <Navbar />

      <main style={{ minHeight: "calc(100vh - 160px)" }}>
        <section style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px" }}>
          <h2 style={{ marginBottom: 12 }}>Crear cuenta</h2>

          {err && (
            <div style={{
              background:"#ffe5e5", color:"#b00020", padding:"10px 12px",
              borderRadius:8, marginBottom:12, border:"1px solid #ffb3b8"
            }}>
              {err}
            </div>
          )}
          {ok && (
            <div style={{
              background:"#e6ffed", color:"#046d2c", padding:"10px 12px",
              borderRadius:8, marginBottom:12, border:"1px solid #8fd6b5"
            }}>
              {ok}
            </div>
          )}

          <form onSubmit={onSubmit} style={{ display:"grid", gap: 14 }}>
            {/* Nombre */}
            <label style={{ display:"grid", gap:6 }}>
              <span>Nombre completo</span>
              <input
                name="nombre"
                value={form.nombre}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="Nombre Apellido"
                autoComplete="name"
                required
              />
              {touched.nombre && !nameOK && (
                <small style={{ color:"#b00020" }}>
                  Usa solo letras y espacios (min 2 caracteres).
                </small>
              )}
            </label>

            {/* Email */}
            <label style={{ display:"grid", gap:6 }}>
              <span>Correo institucional</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="nombre.apellido@duoc.cl"
                autoComplete="email"
                required
              />
              {touched.email && !emailOK && (
                <small style={{ color:"#b00020" }}>El correo debe terminar en @duoc.cl</small>
              )}
              <small style={{ color:"#666" }}>Solo correos @duoc.cl</small>
            </label>

            {/* Password */}
            <label style={{ display:"grid", gap:6 }}>
              <span>Contraseña</span>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={onChange}
                onBlur={onBlur}
                minLength={8}
                autoComplete="new-password"
                required
              />
              {form.password && (
                <>
                  {/* Barra de fuerza */}
                  <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                    {[0,1,2,3].map(i => (
                      <div key={i} style={{
                        flex:1, height:8, borderRadius:4,
                        background: i <= score-1 ? ["#ff7b7b","#ffae4c","#6bc16b","#2ea043"][Math.max(score-1,0)] : "#eee",
                        transition:"background .2s"
                      }} />
                    ))}
                    <span style={{ fontSize:12, color:"#555", minWidth:80, textAlign:"right" }}>
                      {strengthLabel(score)}
                    </span>
                  </div>

                  {/* Reglas */}
                  <div style={{ display:"grid", gap:6, marginTop:6 }}>
                    {hint(checks.length, "8– caracteres")}
                    {hint(checks.lower && checks.upper, "Mayúsculas y minúsculas")}
                    {hint(checks.digit || checks.symbol, "Número o símbolo")}
                    {hint(checks.noSpaces, "Sin espacios")}
                    {hint(checks.noSameCharX4, "Sin 4 caracteres iguales seguidos")}
                    {hint(checks.notSeq, "Sin secuencias como abcde o 12345")}
                    {hint(checks.notCommon, "No común/obvia")}
                  </div>

                  {capsRef.current && (
                    <div style={{ color:"#b26a00", fontSize:12 }}>
                      ¡Atención! <strong>Caps Lock</strong> activado.
                    </div>
                  )}
                </>
              )}
            </label>

            {/* Confirm */}
            <label style={{ display:"grid", gap:6 }}>
              <span>Confirmar contraseña</span>
              <input
                name="confirm"
                type="password"
                value={form.confirm}
                onChange={onChange}
                onBlur={onBlur}
                minLength={8}
                autoComplete="new-password"
                required
              />
              {touched.confirm && !confirmOK && (
                <small style={{ color:"#b00020" }}>Las contraseñas no coinciden</small>
              )}
            </label>

            {/* Footer actions */}
            <div style={{ display:"flex", gap: 8, justifyContent:"space-between", alignItems:"center", marginTop: 4 }}>
              <Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link>

              <button
                type="submit"
                disabled={loading || !isValid}
                style={{
                  background: (loading || !isValid) ? "#d7d7d7" : "#111",
                  color:"#fff", border:"none", padding:"10px 16px",
                  borderRadius:8, cursor: (loading || !isValid) ? "not-allowed":"pointer"
                }}
                title={!isValid ? "Completa y corrige el formulario" : "Crear cuenta"}
              >
                {loading ? "Creando…" : "Crear cuenta"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
