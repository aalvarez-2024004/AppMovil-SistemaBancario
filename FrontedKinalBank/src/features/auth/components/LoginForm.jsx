import { useForm } from "react-hook-form"
import { useAuthStore } from "../store/useAuthStore.js"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const styles = {
  wrapper: {
    width: "100%",
    maxWidth: "440px",
    margin: "0 auto",
    padding: "clamp(16px, 4vw, 48px)",
    fontFamily: "'Lato', 'Helvetica Neue', sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
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
  inputWrapper: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "16px",
    height: "16px",
    color: "#9ca3af",
    pointerEvents: "none",
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
    padding: "11px 14px 11px 40px",
    outline: "none",
    transition: "border-color 180ms, box-shadow 180ms",
    appearance: "none",
    WebkitAppearance: "none",
  },
  inputError: {
    borderColor: "#dc2626",
    boxShadow: "0 0 0 3px rgba(220,38,38,.07)",
  },
  fieldError: {
    fontSize: "11px",
    color: "#dc2626",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "4px",
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
  alertPending: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "14px 16px",
    borderRadius: "4px",
    border: "1px solid #fcd34d",
    background: "#fffbeb",
  },
  alertIcon: {
    flexShrink: 0,
    width: "18px",
    height: "18px",
    marginTop: "1px",
  },
  alertTitle: {
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.04em",
    margin: "0 0 3px",
  },
  alertBody: {
    fontSize: "12px",
    lineHeight: 1.55,
    margin: 0,
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
    marginTop: "4px",
    transition: "background 180ms, box-shadow 180ms",
  },
  btnDisabled: {
    opacity: 0.55,
    cursor: "not-allowed",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    background: "#e5e7eb",
  },
  dividerText: {
    fontSize: "11px",
    letterSpacing: "0.08em",
    color: "#9ca3af",
    textTransform: "uppercase",
  },
  links: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    flexWrap: "wrap",
  },
  linkBtn: {
    fontFamily: "'Lato', 'Helvetica Neue', sans-serif",
    fontSize: "12px",
    color: "#6b7280",
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    textDecoration: "underline",
    textDecorationColor: "transparent",
    textUnderlineOffset: "2px",
    transition: "color 180ms",
  },
  linkSeparator: {
    fontSize: "11px",
    color: "#e5e7eb",
    userSelect: "none",
  },
  spinner: {
    display: "inline-block",
    width: "14px",
    height: "14px",
    border: "1.5px solid rgba(255,255,255,.35)",
    borderTopColor: "#ffffff",
    borderRadius: "50%",
    animation: "spin .7s linear infinite",
  },
}

export const LoginForm = ({ onForgot, onRegister }) => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const login = useAuthStore(state => state.login)
  const loading = useAuthStore(state => state.loading)
  const [loginError, setLoginError] = useState(null)
  const [hoverBtn, setHoverBtn] = useState(false)

  const onSubmit = async (data) => {
      setLoginError(null)
      const res = await login(data)

      if (res?.success) {
          const role = res.user?.role


          if (role === "ADMIN") {
              navigate("/dashboard")
          } else {
              navigate("/dashboard/client")
          }
      } else {
          setLoginError(res.error)
      }
  }

  const isPending = loginError?.toLowerCase().includes("pendiente")

  return (
    <div style={styles.wrapper}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap'); @keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form} noValidate>

        <div style={styles.field}>
          <label style={styles.label}>Correo electrónico</label>
          <div style={styles.inputWrapper}>
            <svg style={styles.icon} viewBox="0 0 20 20" fill="none">
              <path d="M2.5 6.5L10 11.5L17.5 6.5M3 5h14a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              style={errors.email ? { ...styles.input, ...styles.inputError } : styles.input}
              type="email"
              placeholder="correo@ejemplo.com"
              {...register("email", { required: "El correo es obligatorio" })}
            />
          </div>
          {errors.email && <p style={styles.fieldError}>{errors.email.message}</p>}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Contraseña</label>
          <div style={styles.inputWrapper}>
            <svg style={styles.icon} viewBox="0 0 20 20" fill="none">
              <rect x="4" y="9" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.25"/>
              <path d="M7 9V6.5a3 3 0 016 0V9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
            </svg>
            <input
              style={errors.password ? { ...styles.input, ...styles.inputError } : styles.input}
              type="password"
              placeholder="••••••••"
              {...register("password", { required: "La contraseña es obligatoria" })}
            />
          </div>
          {errors.password && <p style={styles.fieldError}>{errors.password.message}</p>}
        </div>

        {loginError && (
          <div style={isPending ? styles.alertPending : styles.alertError}>
            <div style={{ ...styles.alertIcon, color: isPending ? "#d97706" : "#dc2626" }}>
              {isPending ? (
                <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                  <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.25"/>
                  <path d="M10 6v4.5l2.5 2.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                  <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.25"/>
                  <path d="M10 7v3.5M10 13.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )}
            </div>
            <div>
              <p style={{ ...styles.alertTitle, color: isPending ? "#92400e" : "#991b1b" }}>
                {isPending ? "Cuenta pendiente de aprobación" : "Credenciales incorrectas"}
              </p>
              <p style={{ ...styles.alertBody, color: isPending ? "#a16207" : "#b91c1c" }}>
                {isPending
                  ? "Su solicitud está siendo revisada. Un administrador debe aprobar su cuenta para continuar."
                  : "Verifique su correo electrónico y contraseña e intente nuevamente."
                }
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
          {loading ? (
            <>
              <span style={styles.spinner} />
              Verificando...
            </>
          ) : "Ingresar"}
        </button>

        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>o</span>
          <div style={styles.dividerLine} />
        </div>

        <div style={styles.links}>
          <button type="button" onClick={onForgot} style={styles.linkBtn}>
            ¿Olvidó su contraseña?
          </button>
          <span style={styles.linkSeparator}>·</span>
          <button type="button" onClick={onRegister} style={styles.linkBtn}>
            Crear cuenta nueva
          </button>
        </div>

      </form>
    </div>
  )
}