import { useEffect, useState } from "react";
import { useAdminTransactionsStore } from "../store/useAdminTransactionsStore.js";
import { Badge } from "../components/Badge.jsx";


const ArrowDownIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
);

const ArrowUpIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
);

const BankIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
    </svg>
);

const ChartBarIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 16v-3M12 16V8M17 16v-5" />
    </svg>
);

const ClipboardListIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="M9 12h6M9 16h6" />
    </svg>
);

const CursorClickIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 15l-2 5L9 9l11 4-5 2z" />
        <path d="M21 21l-5.197-5.197" />
    </svg>
);

const SortDescIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 4h13M3 8h9M3 12h5M17 4v16M13 16l4 4 4-4" />
    </svg>
);

const SortAscIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 4h13M3 8h9M3 12h5M17 20V4M13 8l4-4 4 4" />
    </svg>
);

const SparklesIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
    </svg>
);

const WalletIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2v-5z" />
        <path d="M16 12h5v4h-5a2 2 0 010-4z" />
    </svg>
);

const ActivityIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
);

const XIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6L6 18M6 6l12 12" />
    </svg>
);

const AlertIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
);

const CheckCircleIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
            <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
                style={{
                    left: `${15 + i * 15}%`,
                    top: `${20 + (i % 3) * 25}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${3 + i * 0.5}s`
                }}
            />
        ))}
    </div>
);

const AnimatedNumber = ({ value, prefix = "", suffix = "" }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const duration = 1000;
        const steps = 30;
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
    }, [value]);

    return <span>{prefix}{displayValue.toLocaleString("es-GT")}{suffix}</span>;
};

const SkeletonCard = () => (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 animate-pulse">
        <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-slate-200" />
            <div className="flex-1">
                <div className="h-4 bg-slate-200 rounded w-32 mb-2" />
                <div className="h-3 bg-slate-100 rounded w-24" />
            </div>
            <div className="h-6 bg-slate-100 rounded-full w-16" />
        </div>
        <div className="flex gap-3">
            <div className="h-10 bg-slate-100 rounded-xl flex-1" />
            <div className="h-10 bg-slate-100 rounded-xl flex-1" />
        </div>
    </div>
);

const SkeletonRow = () => (
    <div className="flex items-center justify-between py-3.5 animate-pulse">
        <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-200" />
            <div>
                <div className="h-4 bg-slate-200 rounded w-36 mb-2" />
                <div className="h-3 bg-slate-100 rounded w-24" />
            </div>
        </div>
        <div className="h-5 bg-slate-200 rounded w-20" />
    </div>
);

const TxRow = ({ tx, index }) => {
    const isCredit = tx.type === "DEPOSITO" || tx.type === "CREDITO";
    const symbol = tx.currencyFrom === "USD" ? "$" : "Q";
    const amount = tx.amountSent ?? 0;

    return (
        <div
            className="group relative flex items-center justify-between py-4 border-b border-slate-100/80 last:border-0 hover:bg-gradient-to-r hover:from-slate-50/90 hover:via-slate-50/50 hover:to-transparent transition-all duration-500 rounded-2xl px-3 sm:px-4 -mx-3 sm:-mx-4 cursor-default gap-3"
            style={{
                animation: `fadeSlideIn 0.4s ease-out ${index * 0.08}s both`
            }}
        >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-10 bg-gradient-to-b from-indigo-500 via-cyan-500 to-indigo-500 rounded-full transition-all duration-400 opacity-0 group-hover:opacity-100 shadow-lg shadow-indigo-500/50" />

            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative flex items-center gap-3 sm:gap-4 min-w-0">
                <div className={`
                    relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-sm flex-shrink-0 
                    transition-all duration-400 group-hover:scale-110 group-hover:rotate-3 overflow-hidden
                    ${isCredit
                        ? "bg-gradient-to-br from-emerald-100 via-emerald-50 to-teal-50 text-emerald-600 shadow-lg shadow-emerald-100/80 group-hover:shadow-emerald-200"
                        : "bg-gradient-to-br from-red-100 via-red-50 to-orange-50 text-red-500 shadow-lg shadow-red-100/80 group-hover:shadow-red-200"
                    }
                `}>
                    <div className={`absolute inset-0 rounded-2xl ${isCredit ? "bg-emerald-400/10" : "bg-red-400/10"}`} />

                    <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                        {isCredit ? <ArrowDownIcon className="w-4 h-4 sm:w-5 sm:h-5" /> : <ArrowUpIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

                    <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${isCredit ? "bg-emerald-400" : "bg-red-400"} opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110`} />
                </div>

                <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-800 group-hover:text-slate-900 transition-colors tracking-tight truncate">{tx.description}</p>
                    <div className="flex items-center gap-2 sm:gap-2.5 mt-1.5 flex-wrap">
                        <span className={`
                            relative inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider overflow-hidden
                            ${isCredit
                                ? "bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700 ring-1 ring-emerald-200/50"
                                : "bg-gradient-to-r from-red-100 to-red-50 text-red-600 ring-1 ring-red-200/50"
                            }
                        `}>
                            <span className="relative z-10">{tx.type}</span>
                        </span>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1 h-1 rounded-full bg-slate-300" />
                            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
                                {new Date(tx.createdAt).toLocaleDateString("es-GT", {
                                    day: "2-digit", month: "short", year: "numeric"
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative text-right flex-shrink-0">
                <p className={`
                    text-sm sm:text-base font-black tabular-nums transition-all duration-300 group-hover:scale-105 whitespace-nowrap
                    ${isCredit ? "text-emerald-600" : "text-red-500"}
                `}>
                    <span className="text-xs sm:text-sm font-medium opacity-70">{isCredit ? "+" : "-"}</span>
                    {symbol} {Number(amount).toLocaleString("es-GT", { minimumFractionDigits: 2 })}
                </p>
                <div className={`mt-1 h-0.5 w-0 group-hover:w-full rounded-full transition-all duration-500 ${isCredit ? "bg-gradient-to-r from-emerald-400 to-emerald-200" : "bg-gradient-to-r from-red-400 to-red-200"}`} />
            </div>
        </div>
    );
};

const AccountActivityCard = ({ item, onSelect, selected, index }) => {
    const acc = item.account;
    const isSelected = selected?._id === item._id;

    return (
        <div
            onClick={() => onSelect(item)}
            className={`
                group relative rounded-[20px] border p-4 sm:p-5 cursor-pointer transition-all duration-400 overflow-hidden
                ${isSelected
                    ? "border-indigo-300/80 bg-gradient-to-br from-indigo-50/90 via-white to-cyan-50/50 shadow-xl shadow-indigo-200/60 scale-[1.01] sm:scale-[1.02] ring-2 ring-indigo-400/20"
                    : "border-slate-200/80 bg-white hover:border-indigo-200 hover:bg-gradient-to-br hover:from-indigo-50/50 hover:to-white hover:shadow-lg hover:shadow-slate-200/60"
                }
            `}
            style={{
                animation: `fadeSlideIn 0.5s ease-out ${index * 0.1}s both`
            }}
        >
            <div className={`
                absolute left-0 top-1/2 -translate-y-1/2 w-1.5 rounded-r-full transition-all duration-400
                ${isSelected
                    ? "h-16 bg-gradient-to-b from-indigo-500 via-cyan-500 to-indigo-500 shadow-lg shadow-indigo-400/50"
                    : "h-0 bg-indigo-400 group-hover:h-10 group-hover:shadow-md group-hover:shadow-indigo-300/30"
                }
            `} />

            <div className={`
              absolute top-0 left-4 right-4 h-px transition-all duration-400
              ${isSelected
                    ? "bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent"
                    : "bg-gradient-to-r from-transparent via-slate-200/50 to-transparent group-hover:via-indigo-300/50"
                }
            `} />

            <div className={`
                absolute -top-16 -right-16 w-32 h-32 rounded-full transition-all duration-500 blur-2xl
                ${isSelected ? "bg-indigo-200/60" : "bg-slate-100/50 group-hover:bg-indigo-100/50"}
            `} />
            <div className={`
                absolute -bottom-12 -left-12 w-24 h-24 rounded-full transition-all duration-500 blur-2xl
                ${isSelected ? "bg-cyan-200/40" : "bg-transparent group-hover:bg-cyan-100/30"}
            `} />

            <div className={`
              absolute top-3 right-3 transition-all duration-300
              ${isSelected ? "opacity-100 scale-100" : "opacity-0 scale-50 group-hover:opacity-60 group-hover:scale-75"}
            `}>
                <SparklesIcon className="w-4 h-4 text-indigo-400" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4 gap-2">
                    <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                        <div className={`
                            relative rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-cyan-500 
                            flex items-center justify-center text-white shadow-xl flex-shrink-0
                            transition-all duration-400 group-hover:scale-105 group-hover:rotate-2 overflow-hidden
                            ${isSelected ? "shadow-indigo-400/60 ring-2 ring-white/30" : "shadow-indigo-300/50 group-hover:shadow-indigo-400/60"}
                        `} style={{ width: '48px', height: '48px' }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

                            <BankIcon className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />

                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className={`
                              absolute inset-0 rounded-2xl border-2 border-white/20 
                              ${isSelected ? "animate-pulse" : ""}
                            `} />
                        </div>
                        <div className="min-w-0">
                            <p className="font-black text-slate-800 font-mono text-sm tracking-tight group-hover:text-indigo-900 transition-colors truncate">{acc.accountNumber}</p>
                            <p className="text-xs text-slate-400 mt-0.5 font-medium">{acc.accountType}</p>
                        </div>
                    </div>
                    <Badge value={acc.status} />
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex-1 relative rounded-2xl bg-gradient-to-br from-emerald-50 via-emerald-50/80 to-teal-50/50 border border-emerald-100/80 px-3 sm:px-4 py-2.5 sm:py-3 overflow-hidden group/balance hover:shadow-md hover:shadow-emerald-100 transition-all duration-300 min-w-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/5 to-emerald-400/0 opacity-0 group-hover/balance:opacity-100 transition-opacity" />
                        <p className="text-[10px] text-emerald-600/70 uppercase tracking-wider font-semibold mb-0.5">Saldo</p>
                        <span className="text-emerald-700 font-black text-sm sm:text-base tabular-nums relative z-10 truncate block">
                            {acc.currency === "USD" ? "$" : "Q"}{" "}
                            {Number(acc.balance).toLocaleString("es-GT", { minimumFractionDigits: 2 })}
                        </span>
                    </div>

                    <div className="relative rounded-2xl bg-gradient-to-br from-indigo-50 via-indigo-50/80 to-violet-50/50 border border-indigo-100/80 px-3 sm:px-4 py-2.5 sm:py-3 overflow-hidden group/mov hover:shadow-md hover:shadow-indigo-100 transition-all duration-300 flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/0 via-indigo-400/5 to-indigo-400/0 opacity-0 group-hover/mov:opacity-100 transition-opacity" />
                        <p className="text-[10px] text-indigo-600/70 uppercase tracking-wider font-semibold mb-0.5">Mov.</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-indigo-700 font-black text-sm sm:text-base tabular-nums relative z-10">{item.totalMovimientos}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className={`
                    w-1 h-1 rounded-full transition-all duration-300
                    ${isSelected
                                ? "bg-indigo-400"
                                : "bg-slate-200 group-hover:bg-indigo-300"
                            }
                  `}
                        style={{ transitionDelay: `${i * 50}ms` }}
                    />
                ))}
            </div>
        </div>
    );
};

export const AdminTransactionsPage = () => {
    const {
        accountsByActivity,
        accountTransactions,
        order,
        loading,
        loadingTransactions,
        error,
        fetchAccountsByActivity,
        fetchAccountTransactions,
        clearError,
    } = useAdminTransactionsStore();

    const [selected, setSelected] = useState(null);

    useEffect(() => {
        fetchAccountsByActivity("desc");
    }, []);

    const handleSelect = (item) => {
        setSelected(item);
        fetchAccountTransactions(item.account._id);
    };

    const toggleOrder = () => {
        const next = order === "desc" ? "asc" : "desc";
        fetchAccountsByActivity(next);
        setSelected(null);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <style>{`
                @keyframes fadeSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(12px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                        opacity: 0.4;
                    }
                    50% {
                        transform: translateY(-20px) rotate(180deg);
                        opacity: 0.8;
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
                    animation: shimmer 2s infinite;
                }
                .scrollbar-thin::-webkit-scrollbar {
                    width: 6px;
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
            `}</style>

            {error && (
                <div className="mb-6 rounded-2xl border border-red-200/80 bg-gradient-to-r from-red-50 via-red-50/80 to-orange-50/50 px-4 sm:px-5 py-4 flex items-center justify-between shadow-lg shadow-red-100/50 animate-fadeSlideIn overflow-hidden relative gap-3">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-300/50 to-transparent" />
                    <div className="flex items-center gap-3 sm:gap-4 relative z-10 min-w-0">
                        <div className="relative flex-shrink-0">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center shadow-sm">
                                <AlertIcon className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="absolute inset-0 rounded-xl bg-red-400/20 animate-ping" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-red-700 text-sm font-bold">Error</p>
                            <p className="text-red-600 text-sm truncate">{error}</p>
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

            <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#050d1a] via-[#0a1628] to-[#0f2847] p-5 sm:p-8 md:p-10 lg:p-12 shadow-2xl shadow-slate-900/30 mb-6 sm:mb-8">
                <div className="absolute top-[-50%] right-[-20%] w-[500px] h-[500px] bg-gradient-to-br from-indigo-600/30 via-indigo-500/20 to-transparent blur-3xl rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-[-60%] left-[-15%] w-[400px] h-[400px] bg-gradient-to-tr from-cyan-500/20 via-cyan-400/10 to-transparent blur-3xl rounded-full animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-indigo-500/10 to-transparent blur-3xl rounded-full" />

                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '32px 32px'
                }} />

                <FloatingParticles />

                <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-indigo-500/40 to-transparent hidden sm:block" />
                <div className="absolute top-0 right-1/3 w-px h-24 bg-gradient-to-b from-cyan-500/30 to-transparent hidden sm:block" />
                <div className="absolute bottom-0 left-1/3 w-px h-20 bg-gradient-to-t from-indigo-500/30 to-transparent hidden sm:block" />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 sm:gap-10">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/[0.08] border border-white/10 backdrop-blur-md mb-5 sm:mb-6 shadow-lg shadow-black/10 hover:bg-white/[0.12] transition-colors cursor-default">
                            <div className="relative flex-shrink-0">
                                <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-40" />
                                <div className="relative w-2.5 h-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400 shadow-lg shadow-cyan-400/50" />
                            </div>
                            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-300 font-bold whitespace-nowrap">
                                Administracion bancaria
                            </span>
                            <div className="w-px h-4 bg-white/20 hidden xs:block" />
                            <ActivityIcon className="w-3.5 h-3.5 text-cyan-400 hidden xs:block" />
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tight">
                            Actividad de
                            <span className="block bg-gradient-to-r from-indigo-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent animate-gradient mt-1">
                                cuentas
                            </span>
                        </h1>

                        <p className="text-slate-400 mt-4 sm:mt-5 leading-relaxed text-sm sm:text-[15px] max-w-lg">
                            Visualiza las cuentas con mas movimientos y revisa el detalle de sus ultimas transacciones en tiempo real.
                        </p>

                        <div className="flex items-center gap-3 sm:gap-4 mt-6 flex-wrap">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-300 text-xs font-semibold">Sistema activo</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                                <span className="text-slate-400 text-xs">Ultima actualizacion: ahora</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center lg:items-end gap-3">
                        <div className="relative rounded-[24px] sm:rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-4 sm:p-5 w-full max-w-[280px] lg:w-auto lg:min-w-[200px] overflow-hidden shadow-2xl shadow-black/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10 rounded-[24px] sm:rounded-[28px]" />

                            <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                            <div className="absolute -top-6 -right-6 w-16 h-16 bg-indigo-500/20 rounded-full blur-xl" />

                            <div className="relative">
                                <div className="flex items-center gap-2 mb-3">
                                    <WalletIcon className="w-4 h-4 text-slate-400" />
                                    <p className="text-slate-400 text-xs uppercase tracking-[0.2em] font-bold">Cuentas</p>
                                </div>
                                <h2 className="text-3xl sm:text-4xl font-black text-white tabular-nums tracking-tight">
                                    <AnimatedNumber value={accountsByActivity.length} />
                                </h2>
                                <div className="mt-4 flex items-center gap-2.5">
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-40" />
                                        <div className="relative w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
                                    </div>
                                    <span className="text-cyan-300 text-xs font-semibold">Con movimientos activos</span>
                                </div>
                            </div>

                            <div className="absolute inset-0 overflow-hidden rounded-[24px] sm:rounded-[28px] pointer-events-none">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" style={{ animationDuration: '3s' }} />
                            </div>
                        </div>

                        <button
                            onClick={toggleOrder}
                            className="
                                group
                                relative
                                w-[240px]
                                sm:w-auto
                                px-7
                                py-4
                                rounded-2xl
                                bg-gradient-to-r
                                from-indigo-600
                                via-indigo-500
                                to-cyan-500
                                text-white
                                font-bold
                                shadow-xl
                                shadow-indigo-600/30
                                hover:shadow-indigo-500/50
                                hover:scale-105
                                transition-all
                                duration-300
                                overflow-hidden
                            "
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

                            <div className="absolute inset-0 rounded-2xl border border-white/20" />

                            <span className="relative flex items-center justify-center gap-2.5 text-sm">
                                {order === "desc" ? (
                                    <>
                                        <SortDescIcon className="w-5 h-5 group-hover:animate-bounce" style={{ animationDuration: '0.5s' }} />
                                        <span>Mayor a menor</span>
                                    </>
                                ) : (
                                    <>
                                        <SortAscIcon className="w-5 h-5 group-hover:animate-bounce" style={{ animationDuration: '0.5s' }} />
                                        <span>Menor a mayor</span>
                                    </>
                                )}
                            </span>
                        </button>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-7">

                <div className="relative rounded-[24px] sm:rounded-[32px] border border-slate-200/60 bg-white/95 backdrop-blur-xl shadow-2xl shadow-slate-300/30 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-500" />

                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/30 via-transparent to-transparent pointer-events-none" />

                    <div className="relative px-4 sm:px-7 py-5 sm:py-6 border-b border-slate-100/80 bg-gradient-to-r from-slate-50/80 via-white to-slate-50/50">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/[0.02] to-transparent" />
                        <div className="relative flex items-center gap-3 sm:gap-4">
                            <div className="relative flex-shrink-0">
                                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-indigo-100 via-indigo-50 to-white flex items-center justify-center shadow-lg shadow-indigo-100/80 ring-1 ring-indigo-100">
                                    <ChartBarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center">
                                    <span className="text-[8px] text-white font-bold">{accountsByActivity.length}</span>
                                </div>
                            </div>
                            <div className="min-w-0">
                                <h2 className="text-base sm:text-lg font-black text-slate-800 tracking-tight">Cuentas por actividad</h2>
                                <p className="text-xs sm:text-sm text-slate-400 mt-0.5 truncate">Ordenadas por numero de movimientos</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 sm:p-5 space-y-3 sm:space-y-3.5 max-h-[620px] overflow-y-auto scrollbar-thin">
                        {loading ? (
                            <div className="space-y-3.5">
                                {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
                            </div>
                        ) : accountsByActivity.length === 0 ? (
                            <div className="flex flex-col items-center py-16 sm:py-20">
                                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center mb-5 shadow-lg shadow-slate-200/50">
                                    <ChartBarIcon className="w-10 h-10 text-slate-300" />
                                </div>
                                <p className="text-slate-500 font-bold text-lg">Sin datos de actividad</p>
                                <p className="text-slate-400 text-sm mt-1 text-center px-4">No hay cuentas con movimientos registrados</p>
                            </div>
                        ) : (
                            accountsByActivity.map((item, index) => (
                                <AccountActivityCard
                                    key={item._id}
                                    item={item}
                                    onSelect={handleSelect}
                                    selected={selected}
                                    index={index}
                                />
                            ))
                        )}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                </div>

                <div className="relative rounded-[24px] sm:rounded-[32px] border border-slate-200/60 bg-white/95 backdrop-blur-xl shadow-2xl shadow-slate-300/30 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-indigo-500 to-cyan-500" />

                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-50/30 via-transparent to-transparent pointer-events-none" />

                    <div className="relative px-4 sm:px-7 py-5 sm:py-6 border-b border-slate-100/80 bg-gradient-to-r from-slate-50/80 via-white to-slate-50/50">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.02] to-transparent" />
                        <div className="relative flex items-center gap-3 sm:gap-4">
                            <div className="relative flex-shrink-0">
                                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-cyan-100 via-cyan-50 to-white flex items-center justify-center shadow-lg shadow-cyan-100/80 ring-1 ring-cyan-100">
                                    <ClipboardListIcon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600" />
                                </div>
                                {selected && (
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 flex items-center justify-center animate-bounce" style={{ animationDuration: '1s', animationIterationCount: '3' }}>
                                        <span className="text-[8px] text-white font-bold">{accountTransactions.length}</span>
                                    </div>
                                )}
                            </div>
                            <div className="min-w-0">
                                <h2 className="text-base sm:text-lg font-black text-slate-800 tracking-tight">Ultimos movimientos</h2>
                                <p className="text-xs sm:text-sm text-slate-400 mt-0.5 truncate">
                                    {selected
                                        ? <span className="flex items-center gap-1.5">
                                            Cuenta <span className="font-mono text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded text-xs">{selected.account.accountNumber}</span>
                                        </span>
                                        : "Selecciona una cuenta para ver movimientos"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 sm:px-7 py-4 sm:py-5">
                        {!selected ? (
                            <div className="flex flex-col items-center py-16 sm:py-20">
                                <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-100 via-indigo-50 to-white flex items-center justify-center mb-5 shadow-lg shadow-indigo-200/50">
                                    <CursorClickIcon className="w-10 h-10 text-indigo-400" />
                                    <div className="absolute inset-0 rounded-3xl border-2 border-indigo-300/50 animate-ping" style={{ animationDuration: '2s' }} />
                                </div>
                                <p className="text-slate-600 font-bold text-lg text-center">Selecciona una cuenta</p>
                                <p className="text-slate-400 text-sm mt-1 text-center max-w-xs px-4">
                                    Haz clic en una cuenta de la lista para ver sus ultimos 5 movimientos
                                </p>
                            </div>
                        ) : loadingTransactions ? (
                            <div className="space-y-3">
                                <div className="rounded-2xl bg-slate-50 p-4 animate-pulse">
                                    <div className="flex justify-between">
                                        <div className="h-12 bg-slate-200 rounded-xl w-32" />
                                        <div className="h-12 bg-slate-200 rounded-xl w-24" />
                                    </div>
                                </div>
                                {[...Array(4)].map((_, i) => <SkeletonRow key={i} />)}
                            </div>
                        ) : accountTransactions.length === 0 ? (
                            <div className="flex flex-col items-center py-16 sm:py-20">
                                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center mb-5 shadow-lg shadow-slate-200/50">
                                    <ClipboardListIcon className="w-10 h-10 text-slate-300" />
                                </div>
                                <p className="text-slate-500 font-bold text-lg">Sin movimientos</p>
                                <p className="text-slate-400 text-sm mt-1 text-center px-4">Esta cuenta no tiene transacciones registradas</p>
                            </div>
                        ) : (
                            <>
                                <div className="relative rounded-2xl bg-gradient-to-br from-slate-50 via-slate-50/80 to-white border border-slate-100/80 px-4 sm:px-5 py-4 mb-5 sm:mb-6 overflow-hidden shadow-sm">
                                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/80 to-transparent" />
                                    <div className="absolute -top-8 -right-8 w-20 h-20 bg-emerald-100/50 rounded-full blur-xl" />
                                    <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-indigo-100/50 rounded-full blur-xl" />

                                    <div className="relative flex items-center justify-between gap-3">
                                        <div className="group/stat cursor-default min-w-0">
                                            <p className="text-[10px] text-slate-400 mb-1.5 uppercase tracking-wider font-bold flex items-center gap-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                                                Saldo disponible
                                            </p>
                                            <p className="font-black text-emerald-600 text-lg sm:text-xl tabular-nums group-hover/stat:scale-105 transition-transform truncate">
                                                {selected.account.currency === "USD" ? "$" : "Q"}{" "}
                                                {Number(selected.account.balance).toLocaleString("es-GT", { minimumFractionDigits: 2 })}
                                            </p>
                                        </div>

                                        <div className="w-px h-12 bg-gradient-to-b from-transparent via-slate-200 to-transparent flex-shrink-0" />

                                        <div className="text-right group/stat cursor-default flex-shrink-0">
                                            <p className="text-[10px] text-slate-400 mb-1.5 uppercase tracking-wider font-bold flex items-center justify-end gap-1.5">
                                                Total movimientos
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                            </p>
                                            <p className="font-black text-indigo-600 text-lg sm:text-xl tabular-nums group-hover/stat:scale-105 transition-transform">
                                                {selected.totalMovimientos}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    {accountTransactions.map((tx, index) => (
                                        <TxRow key={tx._id} tx={tx} index={index} />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                </div>
            </div>
        </div>
    );
};