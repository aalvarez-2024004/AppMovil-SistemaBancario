import { useEffect, useState } from "react";
import { DepositTable } from "../components/DepositTable.jsx";
import { DepositModal } from "../components/DepositModal.jsx";
import { useDepositStore } from "../store/useDepositStore.js";

// ============================================
// SVG ICONS - Profesionales y detallados
// ============================================
const PlusCircleIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8M8 12h8" />
    </svg>
);

const CheckCircleIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

const XCircleIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M15 9l-6 6M9 9l6 6" />
    </svg>
);

const ClipboardListIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="M9 12h6M9 16h6" />
    </svg>
);

const BanknotesIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <path d="M6 12h.01M18 12h.01" />
    </svg>
);

const SparklesIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
    </svg>
);

const ActivityIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
);

const TrendingUpIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
    </svg>
);

const DatabaseIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
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

const StatCard = ({ label, value, sub, icon, color, index = 0 }) => {
    const colorVariants = {
        indigo: {
            glow: "bg-indigo-500",
            iconBg: "from-indigo-100 via-indigo-50 to-white",
            iconText: "text-indigo-600",
            iconRing: "ring-indigo-100",
            iconShadow: "shadow-indigo-100/80",
            accentLine: "from-indigo-500 to-cyan-500",
            hoverGlow: "group-hover:bg-indigo-100/50"
        },
        emerald: {
            glow: "bg-emerald-500",
            iconBg: "from-emerald-100 via-emerald-50 to-white",
            iconText: "text-emerald-600",
            iconRing: "ring-emerald-100",
            iconShadow: "shadow-emerald-100/80",
            accentLine: "from-emerald-500 to-teal-500",
            hoverGlow: "group-hover:bg-emerald-100/50"
        },
        red: {
            glow: "bg-red-500",
            iconBg: "from-red-100 via-red-50 to-white",
            iconText: "text-red-600",
            iconRing: "ring-red-100",
            iconShadow: "shadow-red-100/80",
            accentLine: "from-red-500 to-orange-500",
            hoverGlow: "group-hover:bg-red-100/50"
        }
    };

    const colorKey = color.includes("indigo") ? "indigo" : color.includes("emerald") ? "emerald" : "red";
    const colors = colorVariants[colorKey];

    return (
        <div
            className="group relative overflow-hidden rounded-[20px] sm:rounded-[24px] border border-slate-200/60 bg-white/95 backdrop-blur-xl shadow-xl shadow-slate-200/40 px-4 sm:px-6 py-4 sm:py-5 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-300/50 hover:scale-[1.02] hover:-translate-y-1 cursor-default"
            style={{ animation: `fadeSlideIn 0.5s ease-out ${index * 0.1}s both` }}
        >
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.accentLine} opacity-80`} />
            <div className={`absolute top-[-40px] right-[-40px] w-32 h-32 rounded-full blur-3xl opacity-20 ${colors.glow} transition-all duration-500 group-hover:opacity-40 group-hover:scale-125`} />
            <div className={`absolute bottom-[-30px] left-[-30px] w-24 h-24 rounded-full blur-2xl opacity-0 ${colors.hoverGlow} transition-all duration-500`} />

            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
                <SparklesIcon className={`w-4 h-4 ${colors.iconText} opacity-50`} />
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

            <div className="relative z-10 flex items-center justify-between gap-3 sm:gap-5">
                <div className="min-w-0 flex-1">
                    <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-slate-400 mb-2 sm:mb-2.5 flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${colors.glow} opacity-60 flex-shrink-0`} />
                        <span className="truncate">{label}</span>
                    </p>

                    <h3 className="text-[1.85rem] sm:text-[2.5rem] leading-none font-black text-slate-800 whitespace-nowrap tabular-nums group-hover:scale-105 transition-transform duration-300 origin-left">
                        <AnimatedNumber value={value} />
                    </h3>

                    {sub && (
                        <p className="text-[11px] sm:text-xs text-slate-400 mt-2 sm:mt-3 truncate font-medium flex items-center gap-1.5">
                            <TrendingUpIcon className="w-3 h-3 text-slate-300 flex-shrink-0" />
                            <span className="truncate">{sub}</span>
                        </p>
                    )}
                </div>

                <div className={`
                    relative w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${colors.iconBg} 
                    flex items-center justify-center ${colors.iconText} 
                    shadow-lg ${colors.iconShadow} ring-1 ${colors.iconRing}
                    flex-shrink-0 transition-all duration-400 
                    group-hover:scale-110 group-hover:rotate-3 overflow-hidden
                `}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                    <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                        {icon}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/50 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute inset-0 rounded-2xl border-2 border-white/30 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                </div>
            </div>

            <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r ${colors.accentLine} group-hover:w-full transition-all duration-700`} />
        </div>
    );
};

export const DepositPage = () => {
    const { deposits, getDeposits } = useDepositStore();

    useEffect(() => {
        getDeposits();
    }, []);

    const completados = deposits.filter(
        (deposit) => deposit.estado === "COMPLETADO"
    ).length;

    const revertidos = deposits.filter(
        (deposit) => deposit.estado === "REVERTIDO"
    ).length;

    return (
        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-0">
            {/* Custom animations */}
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
                @keyframes pulse-soft {
                    0%, 100% { opacity: 0.6; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.05); }
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
                .animate-pulse-soft {
                    animation: pulse-soft 2s ease-in-out infinite;
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
                @media (prefers-reduced-motion: reduce) {
                    .animate-float, .animate-gradient, .animate-shimmer {
                        animation: none !important;
                    }
                }
            `}</style>

            <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#050d1a] via-[#0a1628] to-[#12243f] p-5 sm:p-6 md:p-8 shadow-2xl shadow-slate-900/30 mb-6 sm:mb-8">
                {/* Animated gradient orbs */}
                <div className="absolute top-[-40%] right-[-15%] w-[450px] h-[450px] bg-gradient-to-br from-indigo-600/25 via-indigo-500/15 to-transparent blur-3xl rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-[-50%] left-[-10%] w-[350px] h-[350px] bg-gradient-to-tr from-cyan-500/20 via-cyan-400/10 to-transparent blur-3xl rounded-full animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-indigo-500/8 to-transparent blur-3xl rounded-full" />

                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '36px 36px'
                }} />

                <FloatingParticles />

                <div className="absolute top-0 left-1/4 w-px h-28 bg-gradient-to-b from-indigo-500/40 to-transparent hidden sm:block" />
                <div className="absolute top-0 right-1/3 w-px h-20 bg-gradient-to-b from-cyan-500/30 to-transparent hidden sm:block" />
                <div className="absolute bottom-0 left-1/3 w-px h-16 bg-gradient-to-t from-indigo-500/30 to-transparent hidden sm:block" />
                <div className="absolute bottom-0 right-1/4 w-px h-24 bg-gradient-to-t from-cyan-500/20 to-transparent hidden sm:block" />

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6 items-center">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/[0.08] border border-white/10 backdrop-blur-md mb-5 sm:mb-6 shadow-lg shadow-black/10 hover:bg-white/[0.12] transition-colors cursor-default group">
                            <div className="relative flex-shrink-0">
                                <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-40" />
                                <div className="relative w-2.5 h-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-lg shadow-emerald-400/50" />
                            </div>
                            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-300 font-bold whitespace-nowrap">
                                Gestion financiera
                            </span>
                            <div className="w-px h-4 bg-white/20 hidden xs:block" />
                            <BanknotesIcon className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform hidden xs:block" />
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tight">
                            Gestion de
                            <span className="block bg-gradient-to-r from-indigo-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent animate-gradient mt-1">
                                depositos
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-slate-400 mt-4 sm:mt-5 leading-relaxed text-sm sm:text-[15px] max-w-lg">
                            Administra y supervisa todos los depositos realizados dentro del sistema financiero bancario en tiempo real.
                        </p>

                        <div className="flex items-center gap-3 sm:gap-4 mt-6 flex-wrap">
                            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 transition-colors cursor-default">
                                <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                                <span className="text-emerald-300 text-xs font-semibold">{completados} completados</span>
                            </div>
                            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-red-500/10 border border-red-500/20 hover:bg-red-500/15 transition-colors cursor-default">
                                <XCircleIcon className="w-4 h-4 text-red-400" />
                                <span className="text-red-300 text-xs font-semibold">{revertidos} revertidos</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center sm:items-start lg:items-end gap-4 sm:gap-5">
                        <div className="relative rounded-[22px] sm:rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-5 sm:p-6 w-full max-w-xs sm:min-w-[220px] sm:w-auto overflow-hidden shadow-2xl shadow-black/20 group hover:border-white/20 transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10 rounded-[22px] sm:rounded-[28px]" />

                            <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                            <div className="absolute -top-8 -right-8 w-20 h-20 bg-indigo-500/20 rounded-full blur-xl group-hover:bg-indigo-500/30 transition-colors" />
                            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-cyan-500/15 rounded-full blur-xl" />

                            <div className="relative">
                                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                    <DatabaseIcon className="w-4 h-4 text-slate-400" />
                                    <p className="text-slate-400 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold">Total depositos</p>
                                </div>
                                <h2 className="text-4xl sm:text-5xl font-black text-white tabular-nums tracking-tight">
                                    <AnimatedNumber value={deposits.length} />
                                </h2>
                                <div className="mt-3 sm:mt-4 flex items-center gap-2.5">
                                    <div className="relative flex-shrink-0">
                                        <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-40" />
                                        <div className="relative w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
                                    </div>
                                    <span className="text-emerald-300 text-xs font-semibold">Sistema actualizado</span>
                                </div>
                            </div>

                            <div className="absolute inset-0 overflow-hidden rounded-[22px] sm:rounded-[28px] pointer-events-none">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" style={{ animationDuration: '3s' }} />
                            </div>
                        </div>

                        <div className="relative group w-full max-w-xs sm:w-auto">
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
                            <div className="relative">
                                <DepositModal />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
                <StatCard
                    label="Total depositos"
                    value={deposits.length}
                    sub="Depositos registrados"
                    color="bg-indigo-500"
                    index={0}
                    icon={<PlusCircleIcon className="w-6 h-6 sm:w-7 sm:h-7" />}
                />

                <StatCard
                    label="Completados"
                    value={completados}
                    sub="Depositos exitosos"
                    color="bg-emerald-500"
                    index={1}
                    icon={<CheckCircleIcon className="w-6 h-6 sm:w-7 sm:h-7" />}
                />

                <StatCard
                    label="Revertidos"
                    value={revertidos}
                    sub="Operaciones revertidas"
                    color="bg-red-500"
                    index={2}
                    icon={<XCircleIcon className="w-6 h-6 sm:w-7 sm:h-7" />}
                />
            </div>

            <div
                className="relative rounded-[24px] sm:rounded-[32px] border border-slate-200/60 bg-white/95 backdrop-blur-xl shadow-2xl shadow-slate-300/30 overflow-hidden"
                style={{ animation: 'fadeSlideIn 0.6s ease-out 0.3s both' }}
            >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-500" />

                <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/30 via-transparent to-transparent pointer-events-none" />

                <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-100/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-cyan-100/20 rounded-full blur-3xl" />

                <div className="relative px-4 sm:px-7 py-5 sm:py-6 border-b border-slate-100/80 bg-gradient-to-r from-slate-50/80 via-white to-slate-50/50">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/[0.02] to-transparent" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent" />

                    <div className="relative flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                            <div className="relative group cursor-default flex-shrink-0">
                                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-indigo-100 via-indigo-50 to-white flex items-center justify-center shadow-lg shadow-indigo-100/80 ring-1 ring-indigo-100 transition-all duration-300 group-hover:scale-105 group-hover:shadow-indigo-200">
                                    <ClipboardListIcon className="w-5.5 h-5.5 sm:w-7 sm:h-7 text-indigo-600" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-300/50">
                                    <span className="text-[9px] text-white font-bold">{deposits.length}</span>
                                </div>
                            </div>
                            <div className="min-w-0">
                                <h2 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">Historial de depositos</h2>
                                <p className="text-xs sm:text-sm text-slate-400 mt-0.5 flex items-center gap-2 truncate">
                                    <ActivityIcon className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
                                    <span className="truncate">Registro general de movimientos bancarios</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-100/80 shadow-sm hover:shadow-md hover:shadow-emerald-100/50 transition-all cursor-default">
                                <div className="relative flex-shrink-0">
                                    <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-50" />
                                    <div className="relative w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-400" />
                                </div>
                                <span className="text-xs sm:text-sm font-bold text-emerald-700 tabular-nums whitespace-nowrap">
                                    {deposits.length} registros
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="relative p-3 sm:p-6">
                    <div className="absolute inset-0 opacity-[0.02]" style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
                        backgroundSize: '24px 24px'
                    }} />

                    <div className="relative overflow-x-auto scrollbar-thin -mx-3 px-3 sm:mx-0 sm:px-0">
                        <DepositTable deposits={deposits} />
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </div>
        </div>
    );
};