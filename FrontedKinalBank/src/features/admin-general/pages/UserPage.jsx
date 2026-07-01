import { useEffect, useState } from "react";
import { useUsersStore } from "../store/useUserStore.js";
import { ApproveDrawer } from "../components/ApproveDrawer";


const UsersIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
);

const ClockIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const CheckCircleIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

const ShieldCheckIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
    </svg>
);

const XIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const AlertIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
);

const ArrowRightIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
);

const SparklesIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
    </svg>
);

const MailIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

const PhoneIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
);

const BriefcaseIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
);

const CreditCardIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
);

const IdCardIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <line x1="6" y1="15" x2="10" y2="15" />
        <line x1="14" y1="15" x2="18" y2="15" />
    </svg>
);

const ActivityIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
);


const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
            <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
                style={{
                    left: `${10 + i * 12}%`,
                    top: `${15 + (i % 4) * 20}%`,
                    animationDelay: `${i * 0.4}s`,
                    animationDuration: `${3 + i * 0.3}s`
                }}
            />
        ))}
    </div>
);

const AnimatedNumber = ({ value, duration = 1000 }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const steps = 25;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setDisplayValue(value);
                clearInterval(timer);
            } else {
                setDisplayValue(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value, duration]);

    return <span>{displayValue}</span>;
};

const SkeletonRow = () => (
    <tr className="border-b border-slate-100 animate-pulse">
        <td className="px-4 py-4">
            <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-slate-200" />
                <div>
                    <div className="h-4 bg-slate-200 rounded w-28 mb-2" />
                    <div className="h-3 bg-slate-100 rounded w-20" />
                </div>
            </div>
        </td>
        <td className="px-4 py-4"><div className="h-6 bg-slate-100 rounded-xl w-20" /></td>
        <td className="px-4 py-4"><div className="h-4 bg-slate-100 rounded w-32" /></td>
        <td className="px-4 py-4"><div className="h-6 bg-slate-100 rounded-xl w-24" /></td>
        <td className="px-4 py-4"><div className="h-4 bg-slate-100 rounded w-24" /></td>
        <td className="px-4 py-4"><div className="h-4 bg-slate-100 rounded w-20" /></td>
        <td className="px-4 py-4"><div className="h-8 bg-slate-100 rounded-2xl w-24" /></td>
        <td className="px-4 py-4"><div className="h-6 bg-slate-100 rounded-full w-20" /></td>
        <td className="px-4 py-4"><div className="h-10 bg-slate-200 rounded-2xl w-24" /></td>
    </tr>
);

const SkeletonCard = () => (
    <div className="rounded-2xl border border-slate-100 p-4 animate-pulse">
        <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-slate-200 flex-shrink-0" />
            <div className="flex-1">
                <div className="h-4 bg-slate-200 rounded w-1/2 mb-2" />
                <div className="h-3 bg-slate-100 rounded w-1/3" />
            </div>
        </div>
        <div className="h-9 bg-slate-100 rounded-2xl w-full mt-4" />
    </div>
);

export const UsersPage = () => {

    const {
        pendingUsers = [],
        loading,
        error,
        getPendingUsers,
        approveUser,
        denyUser,
        clearError,
    } = useUsersStore();

    const [selected, setSelected] = useState(null);

    useEffect(() => {
        getPendingUsers();
    }, []);

    const handleApprove = async (userId, role) => {
        const result = await approveUser(userId, role);
        if (result?.success) setSelected(null);
    };

    const handleDeny = async (userId) => {
        const result = await denyUser(userId);
        if (result?.success) setSelected(null);
    };

    return (
        <>
            <style>{`
                @keyframes fadeSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(16px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                        opacity: 0.3;
                    }
                    50% {
                        transform: translateY(-25px) rotate(180deg);
                        opacity: 0.7;
                    }
                }
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes pulse-ring {
                    0% { transform: scale(1); opacity: 0.8; }
                    100% { transform: scale(1.5); opacity: 0; }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                .animate-gradient {
                    animation: gradient 4s ease infinite;
                    background-size: 200% 200%;
                }
                .animate-shimmer {
                    animation: shimmer 3s infinite;
                }
                .scrollbar-thin::-webkit-scrollbar {
                    height: 6px;
                }
                .scrollbar-thin::-webkit-scrollbar-track {
                    background: transparent;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 3px;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb:hover {
                    background: #cbd5e1;
                }
                @media (prefers-reduced-motion: reduce) {
                    .animate-float, .animate-gradient, .animate-shimmer {
                        animation: none !important;
                    }
                }
            `}</style>

            <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-0">

                {error && (
                    <div
                        className="mb-6 rounded-2xl border border-red-200/80 bg-gradient-to-r from-red-50 via-red-50/80 to-orange-50/50 px-4 sm:px-5 py-4 flex items-center justify-between gap-3 shadow-lg shadow-red-100/50 overflow-hidden relative"
                        style={{ animation: 'fadeSlideIn 0.4s ease-out' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-300/50 to-transparent" />

                        <div className="flex items-center gap-3 sm:gap-4 relative z-10 min-w-0">
                            <div className="relative flex-shrink-0">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center shadow-sm">
                                    <AlertIcon className="w-5 h-5 text-red-500" />
                                </div>
                                <div className="absolute inset-0 rounded-xl bg-red-400/20 animate-ping" style={{ animationDuration: '2s' }} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-red-700 text-sm font-bold">Error</p>
                                <p className="text-red-600 text-sm break-words">{error}</p>
                            </div>
                        </div>

                        <button
                            onClick={clearError}
                            className="relative z-10 w-9 h-9 rounded-xl bg-red-100/80 hover:bg-red-200 text-red-400 hover:text-red-600 transition-all duration-300 flex items-center justify-center hover:scale-110 hover:rotate-90 flex-shrink-0"
                        >
                            <XIcon className="w-4 h-4" />
                        </button>
                    </div>
                )}


                <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#050d1a] via-[#0a1628] to-[#12243f] p-5 sm:p-8 md:p-10 lg:p-12 shadow-2xl shadow-slate-900/30 mb-6 sm:mb-8">
                    <div className="absolute top-[-40%] right-[-15%] w-[450px] h-[450px] bg-gradient-to-br from-orange-600/20 via-orange-500/10 to-transparent blur-3xl rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
                    <div className="absolute bottom-[-50%] left-[-10%] w-[350px] h-[350px] bg-gradient-to-tr from-indigo-500/20 via-indigo-400/10 to-transparent blur-3xl rounded-full animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-cyan-500/8 to-transparent blur-3xl rounded-full" />

                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '36px 36px'
                    }} />

                    <FloatingParticles />

                    <div className="absolute top-0 left-1/4 w-px h-28 bg-gradient-to-b from-orange-500/40 to-transparent hidden sm:block" />
                    <div className="absolute top-0 right-1/3 w-px h-20 bg-gradient-to-b from-indigo-500/30 to-transparent hidden sm:block" />
                    <div className="absolute bottom-0 left-1/3 w-px h-16 bg-gradient-to-t from-cyan-500/30 to-transparent hidden sm:block" />
                    <div className="absolute bottom-0 right-1/4 w-px h-24 bg-gradient-to-t from-orange-500/20 to-transparent hidden sm:block" />

                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 sm:gap-10">
                        <div className="max-w-xl">
                            <div className="inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/[0.08] border border-white/10 backdrop-blur-md mb-5 sm:mb-6 shadow-lg shadow-black/10 hover:bg-white/[0.12] transition-colors cursor-default group">
                                <div className="relative flex-shrink-0">
                                    <div className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-40" />
                                    <div className="relative w-2.5 h-2.5 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 shadow-lg shadow-orange-400/50" />
                                </div>
                                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-300 font-bold whitespace-nowrap">
                                    Administracion bancaria
                                </span>
                                <div className="w-px h-4 bg-white/20 hidden xs:block" />
                                <UsersIcon className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform hidden xs:block" />
                            </div>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
                                Solicitudes
                                <span className="block bg-gradient-to-r from-orange-300 via-amber-300 to-orange-300 bg-clip-text text-transparent animate-gradient mt-1">
                                    pendientes
                                </span>
                            </h1>

                            <p className="text-slate-400 mt-4 sm:mt-5 leading-relaxed text-sm sm:text-[15px] max-w-lg">
                                Gestiona y aprueba nuevas solicitudes de usuarios dentro del sistema bancario administrativo en tiempo real.
                            </p>

                            <div className="flex items-center gap-3 sm:gap-4 mt-6 flex-wrap">
                                <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/15 transition-colors cursor-default">
                                    <ClockIcon className="w-4 h-4 text-orange-400" />
                                    <span className="text-orange-300 text-xs font-semibold">{pendingUsers.length} en espera</span>
                                </div>
                                <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 transition-colors cursor-default">
                                    <ShieldCheckIcon className="w-4 h-4 text-emerald-400" />
                                    <span className="text-emerald-300 text-xs font-semibold">Sistema activo</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <div className="relative rounded-[22px] sm:rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-4 sm:p-6 min-w-0 sm:min-w-[180px] overflow-hidden shadow-2xl shadow-black/20 group hover:border-white/20 transition-colors">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-amber-500/10 rounded-[22px] sm:rounded-[28px]" />

                                <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                                <div className="absolute -top-8 -right-8 w-20 h-20 bg-orange-500/20 rounded-full blur-xl group-hover:bg-orange-500/30 transition-colors" />

                                <div className="relative">
                                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                        <ClockIcon className="w-4 h-4 text-slate-400" />
                                        <p className="text-slate-400 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold">Pendientes</p>
                                    </div>
                                    <h2 className="text-3xl sm:text-5xl font-black text-white tabular-nums tracking-tight">
                                        <AnimatedNumber value={pendingUsers.length} />
                                    </h2>
                                    <div className="mt-3 sm:mt-4 flex items-center gap-2.5">
                                        <div className="relative flex-shrink-0">
                                            <div className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-40" />
                                            <div className="relative w-2.5 h-2.5 rounded-full bg-orange-400 shadow-lg shadow-orange-400/50" />
                                        </div>
                                        <span className="text-orange-300 text-[11px] sm:text-xs font-semibold">Esperando revision</span>
                                    </div>
                                </div>

                                <div className="absolute inset-0 overflow-hidden rounded-[22px] sm:rounded-[28px] pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" style={{ animationDuration: '3s' }} />
                                </div>
                            </div>

                            <div className="relative rounded-[22px] sm:rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-4 sm:p-6 min-w-0 sm:min-w-[180px] overflow-hidden shadow-2xl shadow-black/20 group hover:border-white/20 transition-colors">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 rounded-[22px] sm:rounded-[28px]" />

                                <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                                <div className="absolute -top-8 -right-8 w-20 h-20 bg-emerald-500/20 rounded-full blur-xl group-hover:bg-emerald-500/30 transition-colors" />

                                <div className="relative">
                                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                        <ActivityIcon className="w-4 h-4 text-slate-400" />
                                        <p className="text-slate-400 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold">Estado</p>
                                    </div>
                                    <h2 className="text-xl sm:text-3xl font-black text-emerald-400 tracking-tight flex items-center gap-2">
                                        <CheckCircleIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                                        Activo
                                    </h2>
                                    <p className="text-slate-400 text-[11px] sm:text-xs mt-3 sm:mt-4 font-medium">
                                        Panel funcionando correctamente
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
                </div>

                <div
                    className="relative rounded-[24px] sm:rounded-[32px] border border-slate-200/60 bg-white/95 backdrop-blur-xl shadow-2xl shadow-slate-300/30 overflow-hidden"
                    style={{ animation: 'fadeSlideIn 0.6s ease-out 0.2s both' }}
                >
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500" />

                    <div className="absolute inset-0 bg-gradient-to-b from-orange-50/30 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-100/30 rounded-full blur-3xl" />
                    <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-amber-100/20 rounded-full blur-3xl" />

                    <div className="relative px-4 sm:px-7 py-5 sm:py-6 border-b border-slate-100/80 bg-gradient-to-r from-slate-50/80 via-white to-slate-50/50">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/[0.02] to-transparent" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent" />

                        <div className="relative flex items-center justify-between gap-3 flex-wrap">
                            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                                <div className="relative group cursor-default flex-shrink-0">
                                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-orange-100 via-orange-50 to-white flex items-center justify-center shadow-lg shadow-orange-100/80 ring-1 ring-orange-100 transition-all duration-300 group-hover:scale-105 group-hover:shadow-orange-200">
                                        <UsersIcon className="w-5.5 h-5.5 sm:w-7 sm:h-7 text-orange-600" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-300/50">
                                        <span className="text-[9px] text-white font-bold">{pendingUsers.length}</span>
                                    </div>
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">Lista de solicitudes</h2>
                                    <p className="text-xs sm:text-sm text-slate-400 mt-0.5 flex items-center gap-2 truncate">
                                        <ClockIcon className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
                                        <span className="truncate">Usuarios esperando aprobacion administrativa</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50/50 border border-orange-100/80 shadow-sm hover:shadow-md hover:shadow-orange-100/50 transition-all cursor-default">
                                    <div className="relative flex-shrink-0">
                                        <div className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-50" />
                                        <div className="relative w-2.5 h-2.5 rounded-full bg-orange-500 shadow-sm shadow-orange-400" />
                                    </div>
                                    <span className="text-xs sm:text-sm font-bold text-orange-700 tabular-nums whitespace-nowrap">
                                        {pendingUsers.length} pendiente{pendingUsers.length !== 1 ? "s" : ""}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 opacity-[0.02]" style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
                            backgroundSize: '24px 24px'
                        }} />

                        {loading && pendingUsers.length === 0 ? (
                            <>
                                {/* Skeleton - móvil */}
                                <div className="md:hidden p-4 space-y-3">
                                    {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
                                </div>
                                {/* Skeleton - desktop */}
                                <div className="hidden md:block overflow-x-auto scrollbar-thin">
                                    <table className="w-full min-w-[920px]">
                                        <thead>
                                            <tr className="border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-slate-50/50">
                                                {["Cliente", "Usuario", "Correo", "DPI", "Telefono", "Trabajo", "Ingreso", "Estado", "Acciones"].map((item) => (
                                                    <th
                                                        key={item}
                                                        className="px-4 py-4 text-left text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400"
                                                    >
                                                        {item}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[...Array(3)].map((_, i) => <SkeletonRow key={i} />)}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ) : pendingUsers.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 sm:py-24 px-6">
                                <div className="relative mb-6 sm:mb-8">
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[28px] sm:rounded-[32px] bg-gradient-to-br from-emerald-100 via-emerald-50 to-cyan-50 flex items-center justify-center shadow-xl shadow-emerald-200/50">
                                        <CheckCircleIcon className="w-12 h-12 sm:w-14 sm:h-14 text-emerald-500" />
                                    </div>

                                    <div className="absolute -bottom-2 -right-2 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 border-4 border-white flex items-center justify-center text-white shadow-lg shadow-emerald-300/50">
                                        <SparklesIcon className="w-5 h-5" />
                                    </div>

                                    <div className="absolute inset-0 rounded-[28px] sm:rounded-[32px] bg-emerald-400/20 blur-xl -z-10" />
                                </div>

                                <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-2 sm:mb-3 tracking-tight text-center">
                                    Todo esta al dia
                                </h3>

                                <p className="text-slate-400 text-center max-w-md leading-relaxed text-sm sm:text-base">
                                    Actualmente no existen solicitudes pendientes dentro del sistema. Las nuevas solicitudes apareceran aqui automaticamente.
                                </p>

                                <div className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span className="text-emerald-600 text-sm font-semibold">Sistema sincronizado</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Vista móvil: tarjetas apiladas */}
                                <div className="md:hidden p-4 space-y-3">
                                    {pendingUsers.map((user, rowIndex) => (
                                        <div
                                            key={user.Id}
                                            className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
                                            style={{ animation: `fadeSlideIn 0.4s ease-out ${rowIndex * 0.06}s both` }}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="relative flex-shrink-0">
                                                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-500 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-indigo-500/30">
                                                        {user.Name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 border-2 border-white" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <p className="font-bold text-slate-800 truncate">{user.Name}</p>
                                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200/80 flex-shrink-0">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                                            <span className="text-[9px] font-bold text-orange-700 uppercase tracking-wider">Pendiente</span>
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-slate-400 truncate mt-0.5">@{user.Username}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-3 text-xs">
                                                <span className="text-slate-500 flex items-center gap-1.5 min-w-0">
                                                    <MailIcon className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                                    <span className="truncate">{user.Email}</span>
                                                </span>
                                                <span className="text-slate-500 flex items-center gap-1.5 min-w-0">
                                                    <PhoneIcon className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                                    <span className="truncate">{user.Phone}</span>
                                                </span>
                                                <span className="text-slate-500 flex items-center gap-1.5 min-w-0">
                                                    <IdCardIcon className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                                    <span className="truncate">{user.DPI}</span>
                                                </span>
                                                <span className="text-slate-500 flex items-center gap-1.5 min-w-0">
                                                    <BriefcaseIcon className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                                    <span className="truncate">{user.Job}</span>
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between gap-3 mt-3">
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-100/80">
                                                    <CreditCardIcon className="w-3.5 h-3.5 text-emerald-500" />
                                                    <span className="text-emerald-700 font-bold text-xs tabular-nums">
                                                        Q {Number(user.MonthlyIncome || 0).toLocaleString("es-GT", { minimumFractionDigits: 2 })}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => setSelected(user)}
                                                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/30 active:scale-95 transition-all flex items-center gap-1.5"
                                                >
                                                    Revisar
                                                    <ArrowRightIcon className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Vista desktop: tabla */}
                                <div className="hidden md:block overflow-x-auto scrollbar-thin">
                                    <table className="w-full min-w-[920px]">
                                        <thead>
                                            <tr className="border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-slate-50/50">
                                                {["Cliente", "Usuario", "Correo", "DPI", "Telefono", "Trabajo", "Ingreso", "Estado", "Acciones"].map((item, index) => (
                                                    <th
                                                        key={item}
                                                        className="px-4 py-4 text-left text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400"
                                                        style={{ animation: `fadeSlideIn 0.3s ease-out ${index * 0.05}s both` }}
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            {item}
                                                        </span>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {pendingUsers.map((user, rowIndex) => (
                                                <tr
                                                    key={user.Id}
                                                    className="group border-b border-slate-100/80 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:via-indigo-50/30 hover:to-transparent transition-all duration-300 relative"
                                                    style={{ animation: `fadeSlideIn 0.4s ease-out ${rowIndex * 0.08}s both` }}
                                                >
                                                    <td className="relative">
                                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-12 bg-gradient-to-b from-indigo-500 to-cyan-500 rounded-r-full transition-all duration-300" />
                                                    </td>

                                                    <td className="px-4 py-5">
                                                        <div className="flex items-center gap-4">
                                                            <div className="relative">
                                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-500 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 group-hover:scale-105 transition-all duration-300">
                                                                    {user.Name?.charAt(0).toUpperCase()}
                                                                </div>
                                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 border-2 border-white shadow-sm" />
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-slate-800 group-hover:text-indigo-900 transition-colors">
                                                                    {user.Name}
                                                                </p>
                                                                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                                                                    <UsersIcon className="w-3 h-3" />
                                                                    Cliente bancario
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-5">
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 text-slate-600 text-xs font-bold ring-1 ring-slate-200/50">
                                                            @{user.Username}
                                                        </span>
                                                    </td>

                                                    <td className="px-4 py-5">
                                                        <span className="text-slate-600 font-medium text-sm flex items-center gap-2">
                                                            <MailIcon className="w-4 h-4 text-slate-400" />
                                                            {user.Email}
                                                        </span>
                                                    </td>

                                                    <td className="px-4 py-5">
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 text-slate-600 text-xs font-bold font-mono ring-1 ring-slate-200/50">
                                                            <IdCardIcon className="w-3.5 h-3.5 text-slate-400" />
                                                            {user.DPI}
                                                        </span>
                                                    </td>

                                                    <td className="px-4 py-5">
                                                        <span className="text-slate-500 text-sm flex items-center gap-2">
                                                            <PhoneIcon className="w-4 h-4 text-slate-400" />
                                                            {user.Phone}
                                                        </span>
                                                    </td>

                                                    <td className="px-4 py-5">
                                                        <span className="font-medium text-slate-600 text-sm flex items-center gap-2">
                                                            <BriefcaseIcon className="w-4 h-4 text-slate-400" />
                                                            {user.Job}
                                                        </span>
                                                    </td>

                                                    <td className="px-4 py-5">
                                                        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-100/80 shadow-sm group-hover:shadow-md group-hover:shadow-emerald-100/50 transition-all">
                                                            <CreditCardIcon className="w-4 h-4 text-emerald-500" />
                                                            <span className="text-emerald-700 font-bold text-sm tabular-nums">
                                                                Q {Number(user.MonthlyIncome || 0).toLocaleString("es-GT", {
                                                                    minimumFractionDigits: 2
                                                                })}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-5">
                                                        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/80 shadow-sm">
                                                            <div className="relative">
                                                                <div className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-50" />
                                                                <div className="relative w-2 h-2 rounded-full bg-orange-500" />
                                                            </div>
                                                            <span className="text-[10px] font-bold text-orange-700 uppercase tracking-wider">
                                                                Pendiente
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-5">
                                                        <button
                                                            onClick={() => setSelected(user)}
                                                            className="group/btn relative overflow-hidden px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 active:scale-100 transition-all duration-300"
                                                        >
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                                                            <span className="relative z-10 flex items-center gap-2">
                                                                Revisar
                                                                <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                            </span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                </div>
            </div>

            {selected && (
                <ApproveDrawer
                    user={selected}
                    onClose={() => setSelected(null)}
                    onConfirm={handleApprove}
                    onDeny={handleDeny}
                    loading={loading}
                />
            )}
        </>
    );
};