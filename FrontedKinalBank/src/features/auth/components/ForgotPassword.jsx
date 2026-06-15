import { useForm } from "react-hook-form"
import { useAuthStore } from "../store/useAuthStore.js"
import toast from "react-hot-toast"
import { useState } from "react"

// ─── Estilos compartidos ──────────────────────────────────────────────────────
const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    fontFamily: "'Lato', 'Helvetica Neue', sans-serif",
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
    display: "block",
    transition: "border-color 180ms, box-shadow 180ms",
    appearance: "none",
    WebkitAppearance: "none",
  },
  errorMsg: {
    fontSize: "11px",
    color: "#dc2626",
    margin: "4px 0 0",
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
    transition: "background 180ms, box-shadow 180ms",
  },
  btnDisabled: { opacity: 0.55, cursor: "not-allowed" },
  btnSecondary: {
    width: "100%",
    fontFamily: "'Lato', 'Helvetica Neue', sans-serif",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#374151",
    background: "transparent",
    border: "1px solid #d1d5db",
    borderRadius: "2px",
    padding: "12px 20px",
    cursor: "pointer",
    transition: "border-color 180ms",
  },
  backLink: {
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
    transition: "color 180ms, text-decoration-color 180ms",
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
  alertInfo: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "14px 16px",
    borderRadius: "4px",
    border: "1px solid #bfdbfe",
    background: "#eff6ff",
  },
  stepIndicator: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "4px",
  },
  stepDot: (active, done) => ({
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: done ? "#059669" : active ? "#1f2937" : "#e5e7eb",
    flexShrink: 0,
    transition: "background 300ms",
  }),
  stepLine: (done) => ({
    flex: 1,
    height: "1px",
    background: done ? "#059669" : "#e5e7eb",
    transition: "background 300ms",
  }),
}

// ─── Componente campo ─────────────────────────────────────────────────────────
const Field = ({ label, error, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
    <label style={styles.label}>{label}</label>
    {children}
    {error && <p style={styles.errorMsg}>{error}</p>}
  </div>
)

// ─── Icono de error ───────────────────────────────────────────────────────────
const ErrorIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" width="18" height="18"
    style={{ flexShrink: 0, marginTop: "1px", color: "#ec1a1a" }}>
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.25" />
    <path d="M10 7v3.5M10 13.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

// ─── Indicador de pasos ───────────────────────────────────────────────────────
const StepIndicator = ({ step }) => (
  <div style={styles.stepIndicator}>
    <div style={styles.stepDot(step === 1, step > 1)} />
    <div style={styles.stepLine(step > 1)} />
    <div style={styles.stepDot(step === 2, step > 2)} />
    <div style={styles.stepLine(step > 2)} />
    <div style={styles.stepDot(step === 3, false)} />
  </div>
)

// ─── PASO 1: Ingresar correo ──────────────────────────────────────────────────
const StepEmail = ({ onNext, onBack }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const requestReset = useAuthStore(state => state.requestPasswordReset)
  const loading = useAuthStore(state => state.loading)
  const [formError, setFormError] = useState(null)
  const [hoverBtn, setHoverBtn] = useState(false)
  const [hoverLink, setHoverLink] = useState(false)

  const onSubmit = async ({ email }) => {
    setFormError(null)
    const res = await requestReset(email)
    if (res.success) {
      toast.success("Código enviado a tu correo")
      onNext(email)
    } else {
      setFormError(res.error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <StepIndicator step={1} />

      <div>
        <p style={{ margin: "0 0 4px", fontSize: "12px", color: "#6b7280", lineHeight: 1.55 }}>
          Paso 1 de 3 · Ingresa el correo asociado a tu cuenta. Te enviaremos un código de autorización.
        </p>
      </div>

      <Field label="Correo electrónico" error={errors.email?.message}>
        <input
          className="forgot-input"
          style={errors.email
            ? { ...styles.input, borderColor: "#dc2626", boxShadow: "0 0 0 3px rgba(220,38,38,.07)" }
            : styles.input
          }
          type="email"
          placeholder="tucorreo@ejemplo.com"
          autoComplete="email"
          {...register("email", {
            required: "El correo es obligatorio",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Correo inválido" }
          })}
        />
      </Field>

      {formError && (
        <div style={styles.alertError}>
          <ErrorIcon />
          <div>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#991b1b", margin: "0 0 3px", letterSpacing: "0.04em" }}>
              Error al enviar el código
            </p>
            <p style={{ fontSize: "12px", color: "#b91c1c", lineHeight: 1.55, margin: 0 }}>{formError}</p>
          </div>
        </div>
      )}

      <button
        type="submit"
        style={loading
          ? { ...styles.btn, ...styles.btnDisabled }
          : hoverBtn
            ? { ...styles.btn, background: "#111827", boxShadow: "0 4px 12px rgba(17,24,39,.18)" }
            : styles.btn
        }
        disabled={loading}
        onMouseEnter={() => setHoverBtn(true)}
        onMouseLeave={() => setHoverBtn(false)}
      >
        {loading ? "Enviando..." : "Enviar código"}
      </button>

      <p style={{ textAlign: "center", margin: 0 }}>
        <button
          type="button"
          onClick={onBack}
          style={hoverLink
            ? { ...styles.backLink, color: "#111827", textDecorationColor: "#111827" }
            : styles.backLink
          }
          onMouseEnter={() => setHoverLink(true)}
          onMouseLeave={() => setHoverLink(false)}
        >
          ← Volver al login
        </button>
      </p>
    </form>
  )
}

// ─── PASO 2: Verificar código ─────────────────────────────────────────────────
const StepCode = ({ email, onNext, onBack }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const verifyCode = useAuthStore(state => state.verifyResetCode)
  const requestReset = useAuthStore(state => state.requestPasswordReset)
  const loading = useAuthStore(state => state.loading)
  const [formError, setFormError] = useState(null)
  const [hoverBtn, setHoverBtn] = useState(false)
  const [hoverLink, setHoverLink] = useState(false)
  const [resending, setResending] = useState(false)

  const onSubmit = async ({ code }) => {
    setFormError(null)
    const res = await verifyCode(email, code)
    if (res.success) {
      onNext()
    } else {
      setFormError(res.error)
    }
  }

  const handleResend = async () => {
    setResending(true)
    await requestReset(email)
    setResending(false)
    toast.success("Código reenviado")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <StepIndicator step={2} />

      <div style={styles.alertInfo}>
        <svg viewBox="0 0 20 20" fill="none" width="18" height="18"
          style={{ flexShrink: 0, marginTop: "1px", color: "#3b82f6" }}>
          <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.25" />
          <path d="M10 9v5M10 6.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <p style={{ margin: 0, fontSize: "12px", color: "#1d4ed8", lineHeight: 1.55 }}>
          Paso 2 de 3 · Enviamos un código a <strong>{email}</strong>. Revisa tu bandeja de entrada (y carpeta de spam).
        </p>
      </div>

      <Field label="Código de autorización" error={errors.code?.message}>
        <input
          className="forgot-input"
          style={errors.code
            ? { ...styles.input, borderColor: "#dc2626", boxShadow: "0 0 0 3px rgba(220,38,38,.07)", letterSpacing: "0.2em", textAlign: "center", fontSize: "20px" }
            : { ...styles.input, letterSpacing: "0.2em", textAlign: "center", fontSize: "20px" }
          }
          placeholder="000000"
          maxLength={6}
          autoComplete="one-time-code"
          inputMode="numeric"
          {...register("code", {
            required: "El código es obligatorio",
            pattern: { value: /^\d{6}$/, message: "El código debe tener 6 dígitos" }
          })}
        />
      </Field>

      {formError && (
        <div style={styles.alertError}>
          <ErrorIcon />
          <div>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#991b1b", margin: "0 0 3px", letterSpacing: "0.04em" }}>
              Código incorrecto
            </p>
            <p style={{ fontSize: "12px", color: "#b91c1c", lineHeight: 1.55, margin: 0 }}>{formError}</p>
          </div>
        </div>
      )}

      <button
        type="submit"
        style={loading
          ? { ...styles.btn, ...styles.btnDisabled }
          : hoverBtn
            ? { ...styles.btn, background: "#111827", boxShadow: "0 4px 12px rgba(17,24,39,.18)" }
            : styles.btn
        }
        disabled={loading}
        onMouseEnter={() => setHoverBtn(true)}
        onMouseLeave={() => setHoverBtn(false)}
      >
        {loading ? "Verificando..." : "Verificar código"}
      </button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          type="button"
          onClick={onBack}
          style={styles.backLink}
        >
          ← Cambiar correo
        </button>
        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          style={{ ...styles.backLink, color: resending ? "#9ca3af" : "#6b7280" }}
        >
          {resending ? "Reenviando..." : "Reenviar código"}
        </button>
      </div>
    </form>
  )
}

// ─── PASO 3: Nueva contraseña ─────────────────────────────────────────────────
const StepNewPassword = ({ email, onDone }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const newPassword = watch("newPassword")
  const doReset = useAuthStore(state => state.resetPassword)
  const loading = useAuthStore(state => state.loading)
  const [formError, setFormError] = useState(null)
  const [hoverBtn, setHoverBtn] = useState(false)

  const onSubmit = async ({ newPassword }) => {
    setFormError(null)
    const res = await doReset(email, newPassword)
    if (res.success) {
      toast.success("¡Contraseña actualizada correctamente!")
      onDone()
    } else {
      setFormError(res.error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <StepIndicator step={3} />

      <p style={{ margin: "0 0 4px", fontSize: "12px", color: "#6b7280", lineHeight: 1.55 }}>
        Paso 3 de 3 · Elige una nueva contraseña segura para tu cuenta.
      </p>

      <Field label="Nueva contraseña" error={errors.newPassword?.message}>
        <input
          className="forgot-input"
          style={errors.newPassword
            ? { ...styles.input, borderColor: "#dc2626", boxShadow: "0 0 0 3px rgba(220,38,38,.07)" }
            : styles.input
          }
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          {...register("newPassword", {
            required: "La contraseña es obligatoria",
            minLength: { value: 8, message: "Mínimo 8 caracteres" }
          })}
        />
      </Field>

      <Field label="Confirmar contraseña" error={errors.confirmPassword?.message}>
        <input
          className="forgot-input"
          style={errors.confirmPassword
            ? { ...styles.input, borderColor: "#dc2626", boxShadow: "0 0 0 3px rgba(220,38,38,.07)" }
            : styles.input
          }
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          {...register("confirmPassword", {
            required: "Confirma tu contraseña",
            validate: value => value === newPassword || "Las contraseñas no coinciden"
          })}
        />
      </Field>

      {formError && (
        <div style={styles.alertError}>
          <ErrorIcon />
          <div>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#991b1b", margin: "0 0 3px", letterSpacing: "0.04em" }}>
              No se pudo actualizar la contraseña
            </p>
            <p style={{ fontSize: "12px", color: "#b91c1c", lineHeight: 1.55, margin: 0 }}>{formError}</p>
          </div>
        </div>
      )}

      <button
        type="submit"
        style={loading
          ? { ...styles.btn, ...styles.btnDisabled }
          : hoverBtn
            ? { ...styles.btn, background: "#111827", boxShadow: "0 4px 12px rgba(17,24,39,.18)" }
            : styles.btn
        }
        disabled={loading}
        onMouseEnter={() => setHoverBtn(true)}
        onMouseLeave={() => setHoverBtn(false)}
      >
        {loading ? "Guardando..." : "Cambiar contraseña"}
      </button>
    </form>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────
export const ForgotPasswordForm = ({ onSwitch }) => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');
        .forgot-input:focus { border-color: #374151 !important; box-shadow: 0 0 0 3px rgba(31,41,55,.08) !important; }
      `}</style>

      {step === 1 && (
        <StepEmail
          onNext={(resolvedEmail) => { setEmail(resolvedEmail); setStep(2) }}
          onBack={onSwitch}
        />
      )}

      {step === 2 && (
        <StepCode
          email={email}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <StepNewPassword
          email={email}
          onDone={onSwitch}
        />
      )}
    </>
  )
}