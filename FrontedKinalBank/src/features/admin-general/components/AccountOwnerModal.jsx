export const AccountOwnerModal = ({ account, onClose }) => {
    if (!account) return null;

    const ownerInitial = (account.owner?.name || account.ownerId || "?")
        .charAt(0)
        .toUpperCase();

    // Iconos SVG personalizados
    const XIcon = () => (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M1 1l12 12M13 1L1 13" />
        </svg>
    );

    const UserIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );

    const AtIcon = () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
        </svg>
    );

    const MailIcon = () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    );

    const IdCardIcon = () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
    );

    const PhoneIcon = () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    );

    const BriefcaseIcon = () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
    );

    const BanknoteIcon = () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="12" x="2" y="6" rx="2" />
            <circle cx="12" cy="12" r="2" />
            <path d="M6 12h.01M18 12h.01" />
        </svg>
    );

    const WalletIcon = () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
            <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
        </svg>
    );

    const HashIcon = () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="9" y2="9" />
            <line x1="4" x2="20" y1="15" y2="15" />
            <line x1="10" x2="8" y1="3" y2="21" />
            <line x1="16" x2="14" y1="3" y2="21" />
        </svg>
    );

    const CreditCardIcon = () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
    );

    const CoinsIcon = () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="8" r="6" />
            <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
            <path d="M7 6h1v4" />
            <path d="m16.71 13.88.7.71-2.82 2.82" />
        </svg>
    );

    const ActivityIcon = () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    );

    // Determinar color del estado
    const getStatusStyles = (status) => {
        const s = (status || "").toLowerCase();
        if (s === "activa" || s === "active") {
            return {
                bg: "bg-emerald-50",
                border: "border-emerald-200",
                dot: "bg-emerald-400",
                text: "text-emerald-600"
            };
        }
        if (s === "inactiva" || s === "inactive" || s === "bloqueada" || s === "blocked") {
            return {
                bg: "bg-red-50",
                border: "border-red-200",
                dot: "bg-red-400",
                text: "text-red-600"
            };
        }
        return {
            bg: "bg-orange-50",
            border: "border-orange-200",
            dot: "bg-orange-400",
            text: "text-orange-600"
        };
    };

    const statusStyles = getStatusStyles(account.status);

    return (
        <>
            <style>{`
                @keyframes modalFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes modalSlideIn {
                    from { 
                        opacity: 0; 
                        transform: scale(0.95) translateY(10px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: scale(1) translateY(0); 
                    }
                }
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                @keyframes pulse-soft {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-5px); }
                }
                .modal-backdrop {
                    animation: modalFadeIn 0.2s ease-out forwards;
                }
                .modal-content {
                    animation: modalSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .info-card {
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .info-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1);
                }
                .close-btn {
                    transition: all 0.2s ease;
                }
                .close-btn:hover {
                    transform: rotate(90deg);
                }
                .avatar-glow {
                    box-shadow: 0 0 25px rgba(99, 102, 241, 0.4);
                }
                .dot-pattern {
                    background-image: radial-gradient(circle, rgba(148, 163, 184, 0.15) 1px, transparent 1px);
                    background-size: 12px 12px;
                }
                .shimmer-line {
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                    background-size: 200% 100%;
                    animation: shimmer 2s infinite;
                }
            `}</style>

            <div className="modal-backdrop fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <div className="modal-content w-full max-w-lg rounded-[28px] overflow-hidden border border-white/10 shadow-2xl shadow-slate-900/50 max-h-[90vh] flex flex-col">


                    {/* Acento superior decorativo */}
                    <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400" />

                    {/* Header */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-[#071126] via-[#0f1d3a] to-[#16284f] px-6 pt-6 pb-8">

                        {/* Decoraciones de fondo */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 blur-3xl rounded-full" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/15 blur-2xl rounded-full" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full" />

                        <div className="relative z-10 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {/* Avatar mejorado */}
                                <div className="relative">
                                    <div className="avatar-glow w-14 h-14 rounded-[16px] bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center text-white font-black text-xl shadow-lg">
                                        {ownerInitial}
                                    </div>
                                    {/* Indicador de estado */}
                                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0f1d3a] flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-white font-bold text-lg leading-tight">
                                        {account.owner?.name || "Propietario"}
                                    </h2>
                                    <p className="text-slate-400 text-sm mt-0.5 flex items-center gap-1.5">
                                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                        Cliente bancario verificado
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="close-btn w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/15 border border-white/10 text-slate-400 hover:text-white"
                            >
                                <XIcon />
                            </button>
                        </div>
                    </div>

                    {/* Body */}
                    <div
                        className="relative bg-white/95 backdrop-blur-xl px-6 py-6 overflow-y-auto flex-1 min-h-0"
                        style={{
                            scrollbarWidth: "thin",
                            scrollbarColor: "#cbd5e1 transparent"
                        }}
                    >
                        {/* Patrón de puntos decorativo */}
                        <div className="dot-pattern absolute inset-0 pointer-events-none" />

                        <div className="relative z-10">
                            {/* Sección: Información del propietario */}
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                                    <UserIcon />
                                </div>
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                    Información del propietario
                                </p>
                                <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent ml-2" />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {/* Nombre completo */}
                                <div className="info-card col-span-2 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 px-4 py-3.5 hover:border-indigo-200">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-indigo-500"><UserIcon /></span>
                                        <p className="text-xs text-slate-400 font-medium">Nombre completo</p>
                                    </div>
                                    <p className="font-semibold text-slate-800">{account.owner?.name || "—"}</p>
                                </div>

                                {/* Usuario */}
                                <div className="info-card rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 px-4 py-3.5 hover:border-indigo-200">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-purple-500"><AtIcon /></span>
                                        <p className="text-xs text-slate-400 font-medium">Usuario</p>
                                    </div>
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gradient-to-r from-slate-100 to-slate-50 text-slate-600 text-xs font-semibold border border-slate-200">
                                        @{account.owner?.username || account.ownerId || "—"}
                                    </span>
                                </div>

                                {/* Correo */}
                                <div className="info-card rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 px-4 py-3.5 hover:border-indigo-200">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-cyan-500"><MailIcon /></span>
                                        <p className="text-xs text-slate-400 font-medium">Correo electrónico</p>
                                    </div>
                                    <p className="font-medium text-slate-700 text-sm truncate">{account.owner?.email || "—"}</p>
                                </div>

                                {/* DPI */}
                                <div className="info-card rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 px-4 py-3.5 hover:border-indigo-200">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-amber-500"><IdCardIcon /></span>
                                        <p className="text-xs text-slate-400 font-medium">DPI</p>
                                    </div>
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gradient-to-r from-slate-100 to-slate-50 text-slate-600 text-xs font-semibold font-mono border border-slate-200">
                                        {account.owner?.dpi || "—"}
                                    </span>
                                </div>

                                {/* Teléfono */}
                                <div className="info-card rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 px-4 py-3.5 hover:border-indigo-200">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-green-500"><PhoneIcon /></span>
                                        <p className="text-xs text-slate-400 font-medium">Teléfono</p>
                                    </div>
                                    <p className="font-medium text-slate-700 text-sm">{account.owner?.phone || "—"}</p>
                                </div>

                                {/* Empleo */}
                                <div className="info-card rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 px-4 py-3.5 hover:border-indigo-200">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-blue-500"><BriefcaseIcon /></span>
                                        <p className="text-xs text-slate-400 font-medium">Empleo</p>
                                    </div>
                                    <p className="font-medium text-slate-600 text-sm">{account.owner?.job || "—"}</p>
                                </div>

                                {/* Ingreso mensual */}
                                <div className="info-card rounded-2xl bg-gradient-to-br from-emerald-50/50 to-white border border-emerald-100 px-4 py-3.5 hover:border-emerald-300">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-emerald-500"><BanknoteIcon /></span>
                                        <p className="text-xs text-slate-400 font-medium">Ingreso mensual</p>
                                    </div>
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-100 to-emerald-50 border border-emerald-200">
                                        <span className="text-emerald-600 font-bold text-sm">
                                            Q {Number(account.owner?.monthlyIncome || 0).toLocaleString("es-GT", { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Separador decorativo */}
                            <div className="my-5 flex items-center gap-3">
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                            </div>

                            {/* Sección: Información de la cuenta */}
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white">
                                    <WalletIcon />
                                </div>
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                    Información de la cuenta
                                </p>
                                <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent ml-2" />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {/* Número de cuenta */}
                                <div className="info-card col-span-2 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 px-4 py-3.5 hover:border-cyan-200">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-cyan-500"><HashIcon /></span>
                                        <p className="text-xs text-slate-400 font-medium">Número de cuenta</p>
                                    </div>
                                    <p className="font-bold text-slate-800 font-mono tracking-wide">{account.accountNumber || "—"}</p>
                                </div>

                                {/* Tipo de cuenta */}
                                <div className="info-card rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 px-4 py-3.5 hover:border-cyan-200">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-blue-500"><CreditCardIcon /></span>
                                        <p className="text-xs text-slate-400 font-medium">Tipo de cuenta</p>
                                    </div>
                                    <p className="font-semibold text-slate-700 text-sm">{account.accountType || "—"}</p>
                                </div>

                                {/* Moneda */}
                                <div className="info-card rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 px-4 py-3.5 hover:border-cyan-200">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-amber-500"><CoinsIcon /></span>
                                        <p className="text-xs text-slate-400 font-medium">Moneda</p>
                                    </div>
                                    <p className="font-semibold text-slate-700 text-sm">{account.currency || "—"}</p>
                                </div>

                                {/* Saldo actual */}
                                <div className="info-card rounded-2xl bg-gradient-to-br from-emerald-50/50 to-white border border-emerald-100 px-4 py-3.5 hover:border-emerald-300">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-emerald-500"><BanknoteIcon /></span>
                                        <p className="text-xs text-slate-400 font-medium">Saldo actual</p>
                                    </div>
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-100 to-emerald-50 border border-emerald-200">
                                        <span className="text-emerald-600 font-bold text-sm">
                                            {account.currency === "USD" ? "$" : "Q"}{" "}
                                            {Number(account.balance || 0).toLocaleString("es-GT", { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                </div>

                                {/* Estado */}
                                <div className="info-card rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 px-4 py-3.5 hover:border-slate-200">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-indigo-500"><ActivityIcon /></span>
                                        <p className="text-xs text-slate-400 font-medium">Estado</p>
                                    </div>
                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${statusStyles.bg} border ${statusStyles.border}`}>
                                        <div className={`w-2 h-2 rounded-full ${statusStyles.dot}`} style={{ animation: 'pulse-soft 2s infinite' }} />
                                        <span className={`text-xs font-bold ${statusStyles.text} uppercase tracking-wide`}>
                                            {account.status || "—"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="relative bg-white/95 backdrop-blur-xl px-6 py-4 border-t border-slate-100">
                        <div className="dot-pattern absolute inset-0 pointer-events-none opacity-50" />
                        <div className="relative z-10 flex justify-end">
                            <button
                                onClick={onClose}
                                className="group px-6 py-2.5 rounded-2xl bg-gradient-to-r from-slate-100 to-slate-50 hover:from-slate-200 hover:to-slate-100 text-slate-600 font-semibold text-sm transition-all border border-slate-200 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50"
                            >
                                <span className="flex items-center gap-2">
                                    Cerrar
                                    <svg className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};