import { useState } from "react"
import { useForm } from "react-hook-form"
import { useAuthStore } from "../store/useAuthStore.js"

const styles = {
  wrapper: {
    fontFamily: "'Lato', 'Helvetica Neue', sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  label: {
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#6b7280",
    display: "block",
    marginBottom: "4px",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "'Lato', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    fontWeight: 400,
    color: "#111827",
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "2px",
    padding: "11px 14px",
    outline: "none",
    transition: "border-color 180ms, box-shadow 180ms",
    appearance: "none",
    WebkitAppearance: "none",
    display: "block",
  },
  errorMsg: {
    fontSize: "11px",
    color: "#dc2626",
    margin: "4px 0 0",
  },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  },
  scrollFields: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxHeight: "55vh",
    overflowY: "auto",
    paddingRight: "4px",
  },
  btn: {
    width: "100%",
    fontFamily: "'Lato', 'Helvetica Neue', sans-serif",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#ffffff",
    background: "#1f2937",
    border: "1px solid #1f2937",
    borderRadius: "2px",
    padding: "14px 20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "background 180ms, box-shadow 180ms",
  },
  btnDisabled: {
    opacity: 0.55,
    cursor: "not-allowed",
  },
  successBox: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "24px 0",
  },
  successIcon: {
    fontSize: "40px",
  },
  successTitle: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#111827",
    margin: 0,
    fontFamily: "'Lato', 'Helvetica Neue', sans-serif",
    letterSpacing: "0.02em",
  },
  successText: {
    fontSize: "13px",
    color: "#6b7280",
    lineHeight: 1.6,
    margin: 0,
  },
  footerText: {
    textAlign: "center",
    fontSize: "13px",
    color: "#6b7280",
    margin: 0,
  },
  authLink: {
    fontFamily: "'Lato', 'Helvetica Neue', sans-serif",
    fontSize: "13px",
    color: "#374151",
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    textDecoration: "underline",
    textUnderlineOffset: "2px",
  },
  alertError: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "14px 16px",
    borderRadius: "4px",
    border: "1px solid #fca5a5",
    background: "#fef2f2",
  },
}

const Field = ({ label, error, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
    <label style={styles.label}>{label}</label>
    {children}
    {error && <p style={styles.errorMsg}>{error}</p>}
  </div>
)

export const RegisterForm = ({ onSwitch }) => {
  const [registerError, setRegisterError] = useState(null)
  const [registered, setRegistered] = useState(false)
  const [hoverBtn, setHoverBtn] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const registerUser = useAuthStore(state => state.register)
  const loading = useAuthStore(state => state.loading)

  const onSubmit = async (data) => {
    setRegisterError(null)
    const res = await registerUser(data)
    if (res.success) {
      setRegistered(true)
    } else {
      setRegisterError(res.error)
    }
  }

  if (registered) {
    return (
      <div style={styles.successBox}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');`}</style>
        <div style={styles.successIcon}>⏳</div>
        <h2 style={styles.successTitle}>Registro enviado</h2>
        <p style={styles.successText}>
          Tu cuenta está <strong>pendiente de aprobación</strong> por un administrador.
        </p>
        <button
          type="button"
          style={hoverBtn ? { ...styles.btn, background: "#111827" } : styles.btn}
          onClick={onSwitch}
          onMouseEnter={() => setHoverBtn(true)}
          onMouseLeave={() => setHoverBtn(false)}
        >
          Volver al login
        </button>
      </div>
    )
  }

  return (
    <div style={styles.wrapper}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');
        .auth-scroll::-webkit-scrollbar { width: 4px; }
        .auth-scroll::-webkit-scrollbar-track { background: transparent; }
        .auth-scroll::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 2px; }
        .auth-input:focus { border-color: #374151 !important; box-shadow: 0 0 0 3px rgba(31,41,55,.08) !important; }
        .auth-input-error { border-color: #dc2626 !important; box-shadow: 0 0 0 3px rgba(220,38,38,.07) !important; }
        @media (max-width: 480px) { .auth-two-col { grid-template-columns: 1fr !important; } }
      `}</style>

      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <div className="auth-scroll" style={styles.scrollFields}>

          <div className="auth-two-col" style={styles.twoCol}>
            <Field label="Nombre completo" error={errors.name?.message}>
              <input
                className={`auth-input${errors.name ? " auth-input-error" : ""}`}
                style={styles.input}
                placeholder="Ana García"
                {...register("name", { required: "Requerido" })}
              />
            </Field>
            <Field label="Username" error={errors.username?.message}>
              <input
                className={`auth-input${errors.username ? " auth-input-error" : ""}`}
                style={styles.input}
                placeholder="anagarcia"
                {...register("username", { required: "Requerido" })}
              />
            </Field>
          </div>

          <Field label="Correo electrónico" error={errors.email?.message}>
            <input
              className={`auth-input${errors.email ? " auth-input-error" : ""}`}
              style={styles.input}
              type="email"
              placeholder="correo@ejemplo.com"
              {...register("email", {
                required: "Requerido",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Correo inválido" }
              })}
            />
          </Field>

          <Field label="Contraseña" error={errors.password?.message}>
            <input
              className={`auth-input${errors.password ? " auth-input-error" : ""}`}
              style={styles.input}
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Requerido",
                minLength: { value: 8, message: "Mínimo 8 caracteres" }
              })}
            />
          </Field>

          <div className="auth-two-col" style={styles.twoCol}>
            <Field label="DPI" error={errors.dpi?.message}>
              <input
                className={`auth-input${errors.dpi ? " auth-input-error" : ""}`}
                style={styles.input}
                placeholder="1234567890101"
                {...register("dpi", {
                  required: "Requerido",
                  pattern: { value: /^\d{13}$/, message: "El DPI debe tener 13 dígitos" }
                })}
              />
            </Field>
            <Field label="Teléfono" error={errors.phone?.message}>
              <input
                className={`auth-input${errors.phone ? " auth-input-error" : ""}`}
                style={styles.input
                }
                placeholder="+502 0000-0000"
                {...register("phone", { required: "Requerido" })}
              />
            </Field>
          </div>

          <Field label="Dirección" error={errors.address?.message}>
            <input
              className={`auth-input${errors.address ? " auth-input-error" : ""}`}
              style={styles.input}
              placeholder="Ciudad de Guatemala, Zona 10"
              {...register("address", { required: "Requerido" })}
            />
          </Field>

          <div className="auth-two-col" style={styles.twoCol}>
            <Field label="Ocupación" error={errors.job?.message}>
              <input
                className={`auth-input${errors.job ? " auth-input-error" : ""}`}
                style={styles.input}
                placeholder="Desarrollador"
                {...register("job", { required: "Requerido" })}
              />
            </Field>
            <Field label="Ingresos mensuales" error={errors.monthlyIncome?.message}>
              <input
                className={`auth-input${errors.monthlyIncome ? " auth-input-error" : ""}`}
                style={styles.input}
                type="number"
                placeholder="5000"
                {...register("monthlyIncome", {
                  required: "Requerido",
                  min: { value: 100, message: "Mínimo Q100" }
                })}
              />
            </Field>
          </div>

        </div>

        {registerError && (
          <div style={styles.alertError}>
            <svg viewBox="0 0 20 20" fill="none" width="18" height="18"
              style={{ flexShrink: 0, marginTop: "1px", color: "#dc2626" }}>
              <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.25"/>
              <path d="M10 7v3.5M10 13.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#991b1b", margin: "0 0 3px", letterSpacing: "0.04em" }}>
                Error en el registro
              </p>
              <p style={{ fontSize: "12px", color: "#b91c1c", lineHeight: 1.55, margin: 0 }}>
                {registerError}
              </p>
            </div>
          </div>
        )}

        <button
          type="submit"
          style={loading ? { ...styles.btn, ...styles.btnDisabled } : hoverBtn ? { ...styles.btn, background: "#111827", boxShadow: "0 4px 12px rgba(17,24,39,.18)" } : styles.btn}
          disabled={loading}
          onMouseEnter={() => setHoverBtn(true)}
          onMouseLeave={() => setHoverBtn(false)}
        >
          {loading ? "Registrando..." : "Crear cuenta"}
        </button>

        <p style={styles.footerText}>
          ¿Ya tienes cuenta?{" "}
          <button type="button" onClick={onSwitch} style={styles.authLink}>
            Iniciar sesión
          </button>
        </p>

      </form>
    </div>
  )
}