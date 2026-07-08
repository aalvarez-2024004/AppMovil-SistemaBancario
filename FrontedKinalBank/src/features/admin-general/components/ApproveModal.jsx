import { useState, useEffect } from "react";

const XIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const UserIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const IdCardIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <line x1="6" y1="14" x2="10" y2="14" />
        <line x1="6" y1="17" x2="14" y2="17" />
    </svg>
);

const PhoneIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

const BriefcaseIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
);

const DollarIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
);

const MapPinIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const ShieldCheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
    </svg>
);

const ClockIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const CheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const AlertTriangleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);

const RoleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const drawerStyles = `
    @keyframes drawerBackdropIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes drawerSlideIn {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
    }

    @media (min-width: 640px) {
        @keyframes drawerSlideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
    }

    @keyframes drawerShake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-3px); }
        40%, 80% { transform: translateX(3px); }
    }

    @keyframes drawerShimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }

    .approve-drawer-backdrop {
        animation: drawerBackdropIn 0.2s ease-out;
    }

    .approve-drawer-panel {
        animation: drawerSlideIn 0.32s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .approve-drawer-shake {
        animation: drawerShake 0.4s ease-in-out;
    }

    .approve-drawer-shimmer {
        position: relative;
        overflow: hidden;
    }

    .approve-drawer-shimmer::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
        animation: drawerShimmer 2.2s infinite;
    }

    @media (prefers-reduced-motion: reduce) {
        .approve-drawer-panel, .approve-drawer-backdrop, .approve-drawer-shake, .approve-drawer-shimmer::after {
            animation: none !important;
        }
    }
`;

export const ApproveModal = ({ user, onClose, onConfirm, onDeny, loading }) => {
    const [role, setRole] = useState("CLIENT");
    const [confirming, setConfirming] = useState(false);

    // Cierra con la tecla Escape
    useEffect(() => {
        const handleKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    // Bloquea el scroll del fondo mientras el drawer está abierto (importante en móvil)
    useEffect(() => {
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = original;
        };
    }, []);

    const fields = [
        { label: "Usuario", value: user.Username, icon: UserIcon, color: "#3b82f6" },
        { label: "DPI", value: user.DPI, icon: IdCardIcon, color: "#6366f1" },
        { label: "Telefono", value: user.Phone, icon: PhoneIcon, color: "#10b981" },
        { label: "Trabajo", value: user.Job, icon: BriefcaseIcon, color: "#f59e0b" },
        { label: "Ingreso mensual", value: `Q ${Number(user.MonthlyIncome || 0).toLocaleString("es-GT", { minimumFractionDigits: 2 })}`, icon: DollarIcon, color: "#22c55e" },
        { label: "Direccion", value: user.Address, icon: MapPinIcon, color: "#ef4444" },
    ];

    return (
        <>
            <style>{drawerStyles}</style>

            {/* Backdrop */}
            <div
                className="approve-drawer-backdrop fixed inset-0 bg-black/50 backdrop-blur-sm z-[150]"
                onClick={onClose}
            />

            {/* Panel: hoja inferior en móvil, panel lateral desde sm hacia arriba */}
            <div
                role="dialog"
                aria-modal="true"
                className="approve-drawer-panel fixed inset-x-0 bottom-0 sm:inset-y-0 sm:inset-x-auto sm:right-0 sm:bottom-auto z-[200] w-full sm:w-[440px] md:w-[480px] h-[92dvh] sm:h-[100dvh] rounded-t-3xl sm:rounded-none bg-white shadow-2xl flex flex-col"
            >
                {/* Handle para arrastrar, solo visible en móvil */}
                <div className="sm:hidden flex justify-center pt-2.5 pb-1 flex-shrink-0">
                    <div className="w-10 h-1.5 rounded-full bg-gray-200" />
                </div>

                <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 flex-shrink-0 hidden sm:block" />

                {/* Header */}
                <div className="relative flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100/80 bg-gradient-to-r from-slate-50/50 to-blue-50/30 flex-shrink-0">
                    <div className="flex items-center gap-3 relative z-10 min-w-0">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25 flex-shrink-0">
                            <ShieldCheckIcon />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">Revisar solicitud</h2>
                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                <ClockIcon />
                                <span>Pendiente de revision</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        aria-label="Cerrar"
                        className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-all duration-200 flex-shrink-0"
                    >
                        <XIcon />
                    </button>
                </div>

                {/* Contenido con scroll */}
                <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-5">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white font-bold text-lg sm:text-xl flex items-center justify-center shadow-xl">
                                {user.Name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-400 rounded-lg border-2 border-white flex items-center justify-center shadow-md">
                                <ClockIcon />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <p className="font-semibold text-gray-900 truncate">{user.Name}</p>
                                <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-100 text-amber-700 rounded-full border border-amber-200 flex-shrink-0">
                                    PENDIENTE
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 truncate">{user.Email}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2.5 sm:gap-3">
                        {fields.map(({ label, value, icon: Icon, color }) => (
                            <div
                                key={label}
                                className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-xl p-3 sm:p-3.5 border border-blue-100/50"
                            >
                                <div className="flex items-start gap-3">
                                    <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: `${color}15`, color }}
                                    >
                                        <Icon />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color }}>
                                            {label}
                                        </p>
                                        <p className="text-sm text-gray-800 font-medium truncate">
                                            {value || "—"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {confirming ? (
                        <div className="approve-drawer-shake relative bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-xl p-4 sm:p-5 text-center space-y-4">
                            <div className="w-12 h-12 mx-auto rounded-full bg-red-100 flex items-center justify-center text-red-500">
                                <AlertTriangleIcon />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-red-700">Seguro que deseas denegar esta solicitud?</p>
                                <p className="text-xs text-red-500 mt-1">
                                    El usuario <span className="font-semibold">{user.Name}</span> sera eliminado permanentemente.
                                </p>
                            </div>
                            <div className="flex flex-col-reverse min-[420px]:flex-row justify-center gap-3">
                                <button
                                    onClick={() => setConfirming(false)}
                                    className="px-4 py-2.5 min-[420px]:py-2 rounded-xl border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => onDeny(user.Id)}
                                    disabled={loading}
                                    className="px-4 py-2.5 min-[420px]:py-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white text-xs font-semibold disabled:opacity-60 transition-all shadow-lg shadow-red-500/25"
                                >
                                    {loading ? "Denegando..." : "Si, denegar"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                                    <RoleIcon />
                                </div>
                                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Asignar rol
                                </label>
                            </div>
                            <div className="relative">
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-sm font-medium outline-none transition-all bg-white appearance-none cursor-pointer hover:border-gray-300"
                                >
                                    <option value="CLIENT">CLIENT - Usuario estandar</option>
                                    <option value="ADMIN">ADMIN - Administrador</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer fijo, respeta el área segura del móvil (notch/home indicator) */}
                {!confirming && (
                    <div className="px-4 sm:px-6 pt-4 border-t border-gray-100/80 bg-white flex-shrink-0" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}>
                        <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
                            <button
                                onClick={() => setConfirming(true)}
                                disabled={loading}
                                className="px-5 py-3 sm:py-2.5 rounded-xl border-2 border-red-200 bg-red-50 text-sm font-semibold text-red-600 hover:bg-red-100 hover:border-red-300 disabled:opacity-60 transition-all flex items-center justify-center gap-2"
                            >
                                <XIcon />
                                <span>Denegar</span>
                            </button>

                            <div className="flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="flex-1 sm:flex-none px-5 py-3 sm:py-2.5 rounded-xl border-2 border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => onConfirm(user.Id, role)}
                                    disabled={loading}
                                    className="approve-drawer-shimmer flex-1 sm:flex-none px-6 py-3 sm:py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold disabled:opacity-60 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                                >
                                    {loading ? "Aprobando..." : (
                                        <>
                                            <CheckIcon />
                                            <span>Aprobar</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};