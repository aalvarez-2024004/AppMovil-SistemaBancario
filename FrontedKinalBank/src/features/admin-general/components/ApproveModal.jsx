import { useState } from "react";

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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

const SparklesIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
);

const modalStyles = `
    @keyframes modalFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes modalSlideIn {
        from { 
            opacity: 0; 
            transform: scale(0.95) translateY(-10px); 
        }
        to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
        }
    }
    
    @keyframes pulse-soft {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.05); }
    }
    
    @keyframes glow-pulse {
        0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
        50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.5); }
    }
    
    @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-3px); }
        40%, 80% { transform: translateX(3px); }
    }
    
    @keyframes sparkle {
        0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
        50% { opacity: 0.6; transform: scale(0.9) rotate(180deg); }
    }

    .approve-modal-backdrop {
        animation: modalFadeIn 0.2s ease-out;
    }
    
    .approve-modal-content {
        animation: modalSlideIn 0.3s ease-out;
    }
    
    .approve-modal-close:hover {
        transform: rotate(90deg);
    }
    
    .approve-field-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px -5px rgba(59, 130, 246, 0.15);
    }
    
    .approve-field-card:hover .approve-icon-wrapper {
        transform: scale(1.1);
    }
    
    .approve-avatar-glow {
        animation: glow-pulse 2s ease-in-out infinite;
    }
    
    .approve-gradient-accent {
        background: linear-gradient(90deg, #3b82f6, #6366f1, #8b5cf6, #3b82f6);
        background-size: 300% 100%;
        animation: gradient-shift 4s ease infinite;
    }
    
    .approve-shimmer {
        position: relative;
        overflow: hidden;
    }
    
    .approve-shimmer::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        animation: shimmer 2s infinite;
    }
    
    .approve-pulse-dot {
        animation: pulse-soft 2s ease-in-out infinite;
    }
    
    .approve-float {
        animation: float 3s ease-in-out infinite;
    }
    
    .approve-sparkle {
        animation: sparkle 2s ease-in-out infinite;
    }
    
    .approve-deny-shake {
        animation: shake 0.5s ease-in-out;
    }
    
    .approve-btn-primary:hover {
        transform: translateY(-1px);
        box-shadow: 0 10px 25px -5px rgba(30, 64, 175, 0.4);
    }
    
    .approve-btn-danger:hover {
        transform: translateY(-1px);
        box-shadow: 0 10px 25px -5px rgba(220, 38, 38, 0.3);
    }
`;

export const ApproveModal = ({ user, onClose, onConfirm, onDeny, loading }) => {
    const [role, setRole] = useState("CLIENT");
    const [confirming, setConfirming] = useState(false);

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
            <style>{modalStyles}</style>
            <div
                className="approve-modal-backdrop fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={onClose}
            >
                <div
                    className="approve-modal-content bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="approve-gradient-accent h-1.5 w-full" />

                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute top-20 left-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute bottom-20 right-10 w-20 h-20 bg-purple-500/5 rounded-full blur-2xl pointer-events-none approve-float" />

                    <div className="relative flex items-center justify-between px-6 py-5 border-b border-gray-100/80 bg-gradient-to-r from-slate-50/50 to-blue-50/30">
                        <div
                            className="absolute inset-0 opacity-[0.03] pointer-events-none"
                            style={{
                                backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
                                backgroundSize: '16px 16px'
                            }}
                        />

                        <div className="flex items-center gap-3 relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                                <ShieldCheckIcon />
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    <polyline points="9 12 11 14 15 10" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Revisar solicitud</h2>
                                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                    <ClockIcon />
                                    <span>Pendiente de revision</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="approve-modal-close relative w-9 h-9 rounded-xl bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-all duration-300 group"
                        >
                            <XIcon />
                            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-red-200 transition-colors" />
                        </button>
                    </div>

                    <div className="px-6 py-5 space-y-5 relative">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="approve-avatar-glow w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white font-bold text-xl flex items-center justify-center shadow-xl">
                                    {user.Name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-400 rounded-lg border-2 border-white flex items-center justify-center shadow-md">
                                    <ClockIcon />
                                </div>
                                <div className="approve-sparkle absolute -top-1 -right-1 text-amber-400">
                                    <SparklesIcon />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold text-gray-900">{user.Name}</p>
                                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-100 text-amber-700 rounded-full border border-amber-200">
                                        PENDIENTE
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500">{user.Email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                            <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                            </div>
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                        </div>

                        <div className="relative">
                            <div className="grid grid-cols-2 gap-3">
                                {fields.map(({ label, value, icon: Icon, color }) => (
                                    <div
                                        key={label}
                                        className="approve-field-card group bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-xl p-3.5 border border-blue-100/50 transition-all duration-300 cursor-default"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div
                                                className="approve-icon-wrapper w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300"
                                                style={{
                                                    backgroundColor: `${color}15`,
                                                    color: color
                                                }}
                                            >
                                                <Icon />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: color }}>
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
                        </div>

                        {/* Confirmacion de denegacion */}
                        {confirming ? (
                            <div className="approve-deny-shake relative bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-xl p-5 text-center space-y-4 overflow-hidden">
                                {/* Decoracion de fondo */}
                                <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full blur-2xl" />
                                <div className="absolute bottom-0 left-0 w-16 h-16 bg-rose-500/10 rounded-full blur-xl" />

                                <div className="relative z-10">
                                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                                        <AlertTriangleIcon />
                                    </div>
                                    <p className="text-sm font-semibold text-red-700">Seguro que deseas denegar esta solicitud?</p>
                                    <p className="text-xs text-red-500 mt-1">
                                        El usuario <span className="font-semibold">{user.Name}</span> sera eliminado permanentemente.
                                    </p>
                                </div>

                                <div className="flex justify-center gap-3 pt-1 relative z-10">
                                    <button
                                        onClick={() => setConfirming(false)}
                                        className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 shadow-sm"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={() => onDeny(user.Id)}
                                        disabled={loading}
                                        className="approve-btn-danger px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white text-xs font-semibold disabled:opacity-60 transition-all duration-200 shadow-lg shadow-red-500/25"
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Denegando...
                                            </span>
                                        ) : "Si, denegar"}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
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

                    {/* Footer */}
                    {!confirming && (
                        <div className="relative px-6 pb-6 pt-4 border-t border-gray-100/80 bg-gradient-to-b from-transparent to-slate-50/50">
                            {/* Patron de puntos */}
                            <div
                                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                                style={{
                                    backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
                                    backgroundSize: '12px 12px'
                                }}
                            />

                            <div className="flex justify-between gap-3 relative z-10">
                                <button
                                    onClick={() => setConfirming(true)}
                                    disabled={loading}
                                    className="approve-btn-danger group px-5 py-2.5 rounded-xl border-2 border-red-200 bg-red-50 text-sm font-semibold text-red-600 hover:bg-red-100 hover:border-red-300 disabled:opacity-60 transition-all duration-200 flex items-center gap-2"
                                >
                                    <XIcon />
                                    <span>Denegar</span>
                                </button>

                                <div className="flex gap-3">
                                    <button
                                        onClick={onClose}
                                        className="px-5 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={() => onConfirm(user.Id, role)}
                                        disabled={loading}
                                        className="approve-btn-primary approve-shimmer px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold disabled:opacity-60 transition-all duration-200 shadow-lg shadow-blue-500/30 flex items-center gap-2"
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Aprobando...
                                            </span>
                                        ) : (
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
            </div>
        </>
    );
};