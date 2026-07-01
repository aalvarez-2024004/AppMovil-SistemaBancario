import { useState } from "react"
import { ForgotPasswordForm } from "../components/ForgotPassword"
import { LoginForm } from "../components/LoginForm"
import { RegisterForm } from "../components/RegisterForm"
import KinalBankLogo from "../../../assets/img/KinalBank.png"

export const AuthPage = () => {
    const [isForgot, setIsForgot] = useState(false)
    const [isRegister, setIsRegister] = useState(false)

    const title = isForgot
        ? "Recuperar contraseña"
        : isRegister
            ? "Crear cuenta"
            : "Bienvenido"

    const subtitle = isForgot
        ? "Ingresa tus datos para continuar"
        : isRegister
            ? "Completa los datos para registrarte"
            : "Ingresa a tu cuenta"

    return (
        <div className="auth-layout">
            <div className="auth-split-card fade-in">

                {/* ── Panel izquierdo: marca ── */}
                <div className="auth-panel-left">
                    <div className="auth-panel-left__circles" aria-hidden="true">
                        <span className="circle circle--lg" />
                        <span className="circle circle--md" />
                        <span className="circle circle--sm" />
                    </div>

                    <div className="auth-brand">
                        <img
                            src={KinalBankLogo}
                            alt="Kinal Bank"
                            className="auth-brand__logo"
                        />
                    </div>

                    <div className="auth-panel-left__tagline">
                        <p className="auth-panel-left__claim">
                            Con tus ahorros,<br />construyes logros.
                        </p>
                        <span className="auth-panel-left__sub">
                            Banca digital segura para Guatemala
                        </span>
                    </div>

                    <div className="auth-panel-left__badges">
                        <div className="auth-stat">
                            <div className="auth-stat__icon">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                                    <path d="M8 4.5v4l2.5 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <div className="auth-stat__info">
                                <span className="auth-stat__value">24 / 7</span>
                                <span className="auth-stat__label">Disponibilidad garantizada</span>
                            </div>
                        </div>

                        <div className="auth-stat">
                            <div className="auth-stat__icon">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M2 11L5 8L8 10L11 6L14 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <circle cx="14" cy="8" r="1" fill="currentColor"/>
                                </svg>
                            </div>
                            <div className="auth-stat__info">
                                <span className="auth-stat__value">+85,000</span>
                                <span className="auth-stat__label">Clientes protegidos</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Panel derecho: formulario ── */}
                <div className="auth-panel-right">
                    <div className="auth-form-header">
                        <h1 className="auth-form-header__title">{title}</h1>
                        <p className="auth-form-header__sub">{subtitle}</p>
                    </div>

                    <div className="auth-form-body">
                        {isForgot ? (
                            <ForgotPasswordForm onSwitch={() => setIsForgot(false)} />
                        ) : isRegister ? (
                            <RegisterForm onSwitch={() => setIsRegister(false)} />
                        ) : (
                            <LoginForm
                                onForgot={() => setIsForgot(true)}
                                onRegister={() => setIsRegister(true)}
                            />
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}
