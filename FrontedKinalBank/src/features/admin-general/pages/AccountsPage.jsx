import { useEffect, useState } from "react";
import { useAccountsStore } from "../store/useAccountStore.js";
import { AccountModal } from "../components/AccountModal.jsx";
import { ConfirmModal } from "../components/ConfirmModal.jsx";
import { Badge } from "../components/Badge.jsx";
import { AccountOwnerModal } from "../components/AccountOwnerModal.jsx";

const HeroBg = () => (
    <svg className="pointer-events-none absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="hg" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            </pattern>
            <pattern id="hd" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="12" cy="12" r="0.7" fill="rgba(255,255,255,0.07)" />
            </pattern>
            <radialGradient id="hv1" cx="80%" cy="0%" r="70%">
                <stop offset="0%" stopColor="rgba(99,102,241,0.18)" />
                <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="hv2" cx="5%" cy="100%" r="55%">
                <stop offset="0%" stopColor="rgba(6,182,212,0.12)" />
                <stop offset="100%" stopColor="transparent" />
            </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#hg)" />
        <rect width="100%" height="100%" fill="url(#hd)" />
        <rect width="100%" height="100%" fill="url(#hv1)" />
        <rect width="100%" height="100%" fill="url(#hv2)" />
        <circle cx="92%" cy="-20" r="160" fill="none" stroke="rgba(99,102,241,0.09)" strokeWidth="1" />
        <circle cx="92%" cy="-20" r="220" fill="none" stroke="rgba(99,102,241,0.06)" strokeWidth="1" />
        <circle cx="92%" cy="-20" r="290" fill="none" stroke="rgba(99,102,241,0.04)" strokeWidth="1" />
        <circle cx="92%" cy="-20" r="360" fill="none" stroke="rgba(6,182,212,0.03)" strokeWidth="1" />
        <line x1="0" y1="100%" x2="35%" y2="0" stroke="rgba(99,102,241,0.07)" strokeWidth="0.6" />
        <line x1="15%" y1="100%" x2="60%" y2="0" stroke="rgba(6,182,212,0.04)" strokeWidth="0.6" />
        <line x1="50%" y1="100%" x2="90%" y2="0" stroke="rgba(139,92,246,0.03)" strokeWidth="0.6" />
        <line x1="10%" y1="0" x2="90%" y2="0" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    </svg>
);

const PageBg = () => (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[200px] -right-[100px] w-[700px] h-[700px] rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, #e0e7ff 0%, transparent 70%)" }} />
        <div className="absolute -bottom-[100px] -left-[80px] w-[500px] h-[500px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #cffafe 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] opacity-10"
            style={{ background: "radial-gradient(ellipse, #eef2ff 0%, transparent 70%)" }} />
    </div>
);

const Shimmer = () => (
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_3.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
);
const PulseDot = ({ color = "bg-emerald-400" }) => (
    <span className="relative inline-flex flex-shrink-0" style={{ width: 8, height: 8 }}>
        <span className={`animate-ping absolute inset-0 rounded-full ${color} opacity-55`} />
        <span className={`relative rounded-full w-2 h-2 ${color}`} />
    </span>
);

const StatCard = ({ label, value, sub, icon, c1, c2, delay = 0 }) => (
    <div
        className="group relative overflow-hidden rounded-[22px] sm:rounded-[28px] bg-white border border-slate-200/60 transition-all duration-500 hover:-translate-y-1.5 cursor-default"
        style={{
            boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 4px 20px -4px rgba(15,23,42,0.08)",
            animation: `fadeUp 0.6s ${delay}ms ease both`,
        }}
    >
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${c1}, ${c2})` }} />

        <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: `radial-gradient(circle, ${c1}30, transparent)` }} />

        <Shimmer />

        <div className="relative z-10 p-5 sm:p-6">
            <div className="flex items-start justify-between mb-4 sm:mb-5">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-lg sm:text-xl"
                    style={{
                        background: `linear-gradient(135deg, ${c1}18, ${c2}28)`,
                        border: `1px solid ${c1}28`,
                        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 8px ${c1}18`,
                    }}>
                    {icon}
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100">
                    <PulseDot color="bg-emerald-400" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-600">LIVE</span>
                </div>
            </div>

            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1.5">{label}</p>

            <p className="text-[1.6rem] sm:text-[1.9rem] font-black text-slate-900 leading-none tabular-nums tracking-tight">{value}</p>

            <div className="my-3 sm:my-4 h-px" style={{ background: `linear-gradient(90deg, transparent, ${c1}30, ${c2}20, transparent)` }} />

            {sub && (
                <div className="flex items-center gap-2">
                    <div className="w-1 h-3.5 rounded-full" style={{ background: `linear-gradient(180deg, ${c1}, ${c2})` }} />
                    <p className="text-[11px] text-slate-400 font-semibold truncate">{sub}</p>
                </div>
            )}
        </div>

        <div className="absolute bottom-0 left-6 right-6 h-px" style={{ background: `linear-gradient(90deg, transparent, ${c2}20, transparent)` }} />
    </div>
);

const GRADIENTS = [
    ["#6366f1", "#8b5cf6"], ["#0ea5e9", "#06b6d4"],
    ["#10b981", "#059669"], ["#f59e0b", "#f97316"],
    ["#ec4899", "#e879f9"], ["#3b82f6", "#6366f1"],
];
const Avatar = ({ name, idx = 0 }) => {
    const [a, b] = GRADIENTS[idx % GRADIENTS.length];
    return (
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0 ring-2 ring-white"
            style={{ background: `linear-gradient(135deg, ${a}, ${b})`, boxShadow: `0 2px 8px ${a}40` }}>
            {(name || "?").charAt(0).toUpperCase()}
        </div>
    );
};
const BalanceChip = ({ amount, currency }) => (
    <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-emerald-100/80"
        style={{
            background: "linear-gradient(135deg, rgba(240,253,244,1), rgba(236,253,245,0.7))",
            boxShadow: "0 1px 3px rgba(16,185,129,0.10), inset 0 1px 0 rgba(255,255,255,0.8)",
        }}>
        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">
            {currency === "USD" ? "USD" : "GTQ"}
        </span>
        <div className="w-px h-3 bg-emerald-200 mx-1" />
        <span className="text-emerald-800 font-black text-sm tabular-nums">
            {currency === "USD" ? "$" : "Q"}{amount.toLocaleString("es-GT", { minimumFractionDigits: 2 })}
        </span>
    </div>
);

const Btn = ({ onClick, children, v = "ghost" }) => {
    const styles = {
        ghost: { bg: "#f8fafc", border: "rgba(203,213,225,0.8)", color: "#475569", hover: "#f1f5f9" },
        primary: { bg: "#eef2ff", border: "rgba(199,210,254,0.8)", color: "#4338ca", hover: "#e0e7ff" },
        danger: { bg: "#fff1f2", border: "rgba(254,205,211,0.8)", color: "#e11d48", hover: "#ffe4e6" },
    };
    const s = styles[v];
    return (
        <button onClick={onClick}
            className="relative overflow-hidden px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 active:scale-95 border whitespace-nowrap"
            style={{ background: s.bg, borderColor: s.border, color: s.color, boxShadow: "0 1px 2px rgba(15,23,42,0.04)" }}
            onMouseEnter={e => e.currentTarget.style.background = s.hover}
            onMouseLeave={e => e.currentTarget.style.background = s.bg}
        >
            {children}
        </button>
    );
};

export const AccountsPage = () => {
    const {
        accounts = [], pagination, loading, error,
        fetchAccounts, addAccount, editAccount, removeAccount, clearError,
    } = useAccountsStore();

    const [modal, setModal] = useState({ type: null, account: null });
    const [ownerModal, setOwnerModal] = useState(null);
    const [search, setSearch] = useState("");
    const [hovered, setHovered] = useState(null);

    useEffect(() => { fetchAccounts(); }, []);

    const handleCreate = async (form) => {
        const r = await addAccount(form);
        if (r.success) setModal({ type: null, account: null });
        return r;
    };
    const handleEdit = async (form) => {
        const r = await editAccount(modal.account._id, form);
        if (r.success) setModal({ type: null, account: null });
        return r;
    };
    const handleDelete = async () => {
        const r = await removeAccount(modal.account._id);
        if (r.success) setModal({ type: null, account: null });
    };
    const changePage = (p) => {
        if (p < 1 || p > pagination.totalPages) return;
        fetchAccounts(p);
    };

    const totalGTQ = accounts.filter(a => a.currency === "GTQ" && a.status === "ACTIVA").reduce((s, a) => s + a.balance, 0);
    const totalUSD = accounts.filter(a => a.currency === "USD" && a.status === "ACTIVA").reduce((s, a) => s + a.balance, 0);
    const activas = accounts.filter(a => a.status === "ACTIVA").length;
    const filtered = accounts.filter(a => a.accountNumber?.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <style>{`
                @keyframes shimmer  { to { transform: translateX(300%) } }
                @keyframes fadeUp   { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
                @keyframes rowSlide { from { opacity:0; transform:translateX(-10px) } to { opacity:1; transform:translateX(0) } }
                @keyframes scaleIn  { from { opacity:0; transform:scale(0.98) } to { opacity:1; transform:scale(1) } }
                @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
                .float-a { animation: floatY 3.8s ease-in-out infinite }
                .float-b { animation: floatY 4.5s 1s ease-in-out infinite }
                .float-c { animation: floatY 3.2s 2s ease-in-out infinite }
            `}</style>

            <PageBg />

            <div className="max-w-5xl mx-auto space-y-5 sm:space-y-6" style={{ animation: "scaleIn 0.5s ease both" }}>

                {error && (
                    <div className="flex items-center justify-between rounded-2xl border border-red-200 bg-red-50/90 px-4 sm:px-5 py-4" style={{ boxShadow: "0 2px 8px rgba(239,68,68,0.08)" }}>
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center text-red-500 font-black text-sm flex-shrink-0">!</div>
                            <p className="text-sm font-bold text-red-700 truncate">{error}</p>
                        </div>
                        <button onClick={clearError} className="w-8 h-8 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-100 hover:text-red-600 transition-all text-sm font-black flex-shrink-0">✕</button>
                    </div>
                )}

                <div
                    className="relative overflow-hidden rounded-[28px] sm:rounded-[40px] p-5 sm:p-8 md:p-10"
                    style={{
                        background: "linear-gradient(140deg, #030712 0%, #060f27 30%, #0a1840 60%, #0f2050 100%)",
                        boxShadow: "0 32px 80px -16px rgba(3,7,18,0.6), 0 2px 4px rgba(3,7,18,0.3), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(255,255,255,0.02)",
                    }}
                >
                    <HeroBg />

                    <div className="absolute top-7 right-36 w-3 h-3 rounded-full bg-indigo-400/70 float-a hidden sm:block" />
                    <div className="absolute top-16 right-24 w-2 h-2 rounded-full bg-cyan-400/50 float-b hidden sm:block" />
                    <div className="absolute bottom-12 right-52 w-2.5 h-2.5 rounded-full bg-violet-400/60 float-c hidden sm:block" />
                    <div className="absolute bottom-8 left-1/3 w-1.5 h-1.5 rounded-full bg-blue-300/50 float-a hidden sm:block" style={{ animationDelay: "0.7s" }} />
                    <div className="absolute top-1/2 right-1/4 w-1 h-1 rounded-full bg-cyan-300/40 float-b hidden sm:block" style={{ animationDelay: "1.5s" }} />

                    <div className="absolute inset-[1px] rounded-[27px] sm:rounded-[39px] pointer-events-none" style={{ border: "1px solid rgba(255,255,255,0.04)" }} />

                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 sm:gap-10">

                        <div className="flex-1 min-w-0">

                            <div className="inline-flex items-center gap-0 rounded-full border border-white/10 overflow-hidden mb-5 sm:mb-7 backdrop-blur-md"
                                style={{ background: "rgba(255,255,255,0.06)" }}>
                                <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 border-r border-white/10">
                                    <PulseDot color="bg-emerald-400" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.25em] sm:tracking-[0.35em] text-emerald-300 whitespace-nowrap">En línea</span>
                                </div>
                                <div className="px-3 sm:px-4 py-1.5">
                                    <span className="text-[9px] font-black uppercase tracking-[0.18em] sm:tracking-[0.25em] text-slate-400 whitespace-nowrap">Gestión financiera</span>
                                </div>
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-black text-white leading-[1.0] tracking-[-0.025em] mb-1">
                                Cuentas
                            </h1>
                            <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-black leading-[1.0] tracking-[-0.025em]"
                                style={{
                                    background: "linear-gradient(90deg, #a5b4fc 0%, #c4b5fd 25%, #67e8f9 65%, #38bdf8 100%)",
                                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                    filter: "drop-shadow(0 0 30px rgba(165,180,252,0.4))",
                                }}>
                                bancarias
                            </h1>

                            <div className="flex items-center gap-2 mt-3 mb-4 sm:mb-5">
                                <div className="h-[2px] w-10 rounded-full bg-indigo-400" />
                                <div className="h-[2px] w-5 rounded-full bg-indigo-400/50" />
                                <div className="h-[2px] w-2 rounded-full bg-cyan-400/40" />
                                <div className="h-[2px] w-1 rounded-full bg-slate-600" />
                            </div>

                            <p className="text-slate-400 text-sm leading-relaxed max-w-[400px]">
                                Administra las cuentas del sistema financiero,
                                controla balances y supervisa movimientos bancarios en tiempo real.
                            </p>

                            <div className="flex flex-wrap items-stretch gap-3 mt-6 sm:mt-7">
                                {[
                                    { label: "Registradas", val: pagination?.totalRecords || 0, color: "#818cf8", dot: "bg-indigo-400" },
                                    { label: "Activas", val: activas, color: "#34d399", dot: "bg-emerald-400" },
                                ].map(({ label, val, color, dot }) => (
                                    <div key={label}
                                        className="flex items-center gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl border border-white/8 backdrop-blur-sm"
                                        style={{ background: "rgba(255,255,255,0.055)" }}>
                                        <span className="text-[1.4rem] sm:text-[1.6rem] font-black tabular-nums leading-none" style={{ color }}>
                                            {val}
                                        </span>
                                        <div className="w-px h-6 bg-white/10" />
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 leading-none mb-1">{label}</p>
                                            <div className="flex items-center gap-1">
                                                <PulseDot color={dot} />
                                                <span className="text-[9px] text-slate-500 font-semibold whitespace-nowrap">en tiempo real</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col items-stretch sm:items-start lg:items-end gap-4">

                            <div
                                className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 sm:min-w-[215px]"
                                style={{
                                    background: "linear-gradient(135deg, rgba(99,102,241,0.22) 0%, rgba(6,182,212,0.14) 100%)",
                                    border: "1px solid rgba(255,255,255,0.11)",
                                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 8px 32px rgba(0,0,0,0.35)",
                                }}
                            >
                                <Shimmer />
                                <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-[9px] font-black uppercase tracking-[0.32em] text-slate-400">Total cuentas</p>
                                        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base border border-white/10" style={{ background: "rgba(255,255,255,0.08)" }}>🏛</div>
                                    </div>
                                    <p className="text-[2.6rem] sm:text-[3.2rem] font-black text-white leading-none tabular-nums"
                                        style={{ textShadow: "0 0 40px rgba(165,180,252,0.45)" }}>
                                        {pagination?.totalRecords || 0}
                                    </p>
                                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
                                        <PulseDot color="bg-emerald-400" />
                                        <span className="text-[10px] text-emerald-300 font-bold">Sistema actualizado</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setModal({ type: "create" })}
                                disabled={loading}
                                className="group relative overflow-hidden px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl text-white font-black text-sm tracking-wide disabled:opacity-60 transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] w-full sm:w-auto"
                                style={{
                                    background: "linear-gradient(135deg, #4f46e5 0%, #4338ca 45%, #0891b2 100%)",
                                    boxShadow: "0 8px 28px -4px rgba(79,70,229,0.55), 0 2px 6px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.22)",
                                }}
                            >
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.12), transparent)" }} />
                                <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-white/20 border border-white/25 flex items-center justify-center font-black text-base leading-none">+</span>
                                    Nueva cuenta
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <StatCard label="Total en GTQ"
                        value={`Q ${totalGTQ.toLocaleString("es-GT", { minimumFractionDigits: 2 })}`}
                        sub="Balances activos en quetzales" icon="💰"
                        c1="#10b981" c2="#06b6d4" delay={80} />
                    <StatCard label="Total en USD"
                        value={`$ ${totalUSD.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
                        sub="Balances activos en dólares" icon="💵"
                        c1="#6366f1" c2="#8b5cf6" delay={180} />
                    <StatCard label="Cuentas activas"
                        value={activas}
                        sub={`${accounts.length} registradas en total`} icon="🏦"
                        c1="#0ea5e9" c2="#06b6d4" delay={280} />
                </div>

                <div
                    className="rounded-[24px] sm:rounded-[32px] overflow-hidden"
                    style={{
                        background: "rgba(255,255,255,0.96)",
                        backdropFilter: "blur(28px)",
                        border: "1px solid rgba(203,213,225,0.55)",
                        boxShadow: "0 4px 24px -4px rgba(15,23,42,0.08), 0 1px 2px rgba(15,23,42,0.04), inset 0 1px 0 rgba(255,255,255,1)",
                        animation: "fadeUp 0.6s 350ms ease both",
                    }}
                >
                    <div className="px-4 sm:px-7 py-4 sm:py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-5">
                        <div className="flex items-center gap-3">
                            <div className="relative w-1.5 h-8 rounded-full overflow-hidden flex-shrink-0">
                                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #6366f1 0%, #0891b2 100%)" }} />
                            </div>
                            <div>
                                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight">Lista de cuentas</h2>
                                <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Gestión general de cuentas bancarias</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 flex-wrap">
                            <div className="relative flex-1 min-w-[180px] sm:flex-initial">
                                <input
                                    type="text"
                                    placeholder="Buscar número de cuenta..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="w-full sm:w-64 rounded-2xl border border-slate-200 px-4 py-2.5 pl-10 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100/70 transition-all placeholder:text-slate-400 font-semibold"
                                    style={{
                                        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                                        boxShadow: "inset 0 1px 2px rgba(15,23,42,0.05)",
                                    }}
                                />
                                {search && (
                                    <button onClick={() => setSearch("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-500 text-xs font-black transition-colors">
                                        ✕
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-indigo-100/80"
                                style={{ background: "linear-gradient(135deg, #eef2ff, #f0f9ff)" }}>
                                <PulseDot color="bg-indigo-400" />
                                <span className="text-xs font-black text-indigo-700 tabular-nums">{filtered.length}</span>
                                <span className="text-[10px] text-indigo-400 font-bold">cuentas</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-px mx-4 sm:mx-7" style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.25) 20%, rgba(6,182,212,0.25) 80%, transparent)" }} />

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[980px]">
                            <thead>
                                <tr style={{ background: "linear-gradient(90deg, rgba(248,250,252,0.95), rgba(241,245,249,0.7))" }}>
                                    {["Cuenta", "Tipo", "Moneda", "Saldo", "Estado", "Propietario", "Acciones"].map((h, i) => (
                                        <th key={h}
                                            className={`px-5 py-3.5 text-left text-[10px] font-black uppercase tracking-[0.28em] text-slate-400 ${i === 0 ? "pl-4 sm:pl-7" : ""} ${i === 6 ? "pr-4 sm:pr-7" : ""}`}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {loading && !accounts.length ? (
                                    <tr><td colSpan={7} className="py-28">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="relative w-14 h-14">
                                                <div className="absolute inset-0 rounded-full border-[3px] border-indigo-100" />
                                                <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-indigo-500 animate-spin" />
                                                <div className="absolute inset-2 rounded-full border-[2px] border-transparent border-t-cyan-400 animate-spin" style={{ animationDuration: "0.75s", animationDirection: "reverse" }} />
                                            </div>
                                            <p className="text-sm font-bold text-slate-400">Cargando cuentas...</p>
                                        </div>
                                    </td></tr>
                                ) : filtered.length === 0 ? (
                                    <tr><td colSpan={7} className="py-28">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-20 h-20 rounded-[24px] flex items-center justify-center text-4xl"
                                                style={{ background: "linear-gradient(135deg, #f1f5f9, #e2e8f0)", boxShadow: "inset 0 2px 8px rgba(15,23,42,0.06)" }}>
                                                🔍
                                            </div>
                                            <p className="text-lg font-black text-slate-700">Sin resultados</p>
                                            <p className="text-sm text-slate-400 font-medium">Intenta con otro número de cuenta.</p>
                                        </div>
                                    </td></tr>
                                ) : (
                                    filtered.map((acc, idx) => {
                                        const isHov = hovered === acc._id;
                                        return (
                                            <tr key={acc._id}
                                                onMouseEnter={() => setHovered(acc._id)}
                                                onMouseLeave={() => setHovered(null)}
                                                className="border-b border-slate-100/80 transition-all duration-200 relative"
                                                style={{
                                                    background: isHov
                                                        ? "linear-gradient(90deg, rgba(238,242,255,0.9) 0%, rgba(240,253,254,0.6) 100%)"
                                                        : "transparent",
                                                    animation: `rowSlide 0.4s ${idx * 30}ms ease both`,
                                                }}
                                            >
                                                <td className="px-5 py-3.5 pl-4 sm:pl-7">
                                                    <div className="flex items-center gap-3.5">
                                                        <div
                                                            className="relative w-10 h-10 rounded-[14px] flex-shrink-0 flex items-center justify-center text-base ring-2 ring-white transition-transform duration-200"
                                                            style={{
                                                                background: "linear-gradient(135deg, #4f46e5 0%, #0891b2 100%)",
                                                                boxShadow: isHov
                                                                    ? "0 6px 18px -2px rgba(79,70,229,0.45), 0 1px 3px rgba(0,0,0,0.1)"
                                                                    : "0 3px 10px -2px rgba(79,70,229,0.28), 0 1px 3px rgba(0,0,0,0.08)",
                                                                transform: isHov ? "scale(1.07)" : "scale(1)",
                                                            }}
                                                        >
                                                            🏦
                                                            <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-[12px] bg-white/15" />
                                                        </div>
                                                        <div>
                                                            <p className="font-black text-slate-800 font-mono text-sm tracking-wider">{acc.accountNumber}</p>
                                                            <p className="text-[10px] text-slate-400 font-bold mt-0.5 uppercase tracking-[0.2em]">Cuenta bancaria</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-3.5"><Badge value={acc.accountType} /></td>
                                                <td className="px-5 py-3.5"><Badge value={acc.currency} /></td>

                                                <td className="px-5 py-3.5">
                                                    <BalanceChip amount={acc.balance} currency={acc.currency} />
                                                </td>

                                                <td className="px-5 py-3.5"><Badge value={acc.status} /></td>

                                                <td className="px-5 py-3.5">
                                                    <div className="flex items-center gap-2.5">
                                                        <Avatar name={acc.ownerName || acc.ownerId} idx={idx} />
                                                        <div>
                                                            <p className="font-bold text-slate-800 text-sm leading-tight">{acc.ownerName || "Propietario"}</p>
                                                            <p className="text-[10px] text-slate-400 font-bold mt-0.5 uppercase tracking-[0.18em]">Cliente</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-3.5 pr-4 sm:pr-7">
                                                    <div className="flex items-center gap-2 transition-opacity duration-200"
                                                        style={{ opacity: isHov ? 1 : 0.6 }}>
                                                        <Btn onClick={() => setOwnerModal(acc)} v="ghost">Ver info</Btn>
                                                        <Btn onClick={() => setModal({ type: "edit", account: acc })} v="primary">Editar</Btn>
                                                        <Btn onClick={() => setModal({ type: "delete", account: acc })} v="danger">Eliminar</Btn>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {pagination?.totalPages > 1 && (
                        <>
                            <div className="h-px mx-4 sm:mx-7" style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.2) 30%, rgba(6,182,212,0.2) 70%, transparent)" }} />
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 sm:px-7 py-4 gap-4"
                                style={{ background: "linear-gradient(90deg, rgba(248,250,252,0.9), rgba(241,245,249,0.5))" }}>

                                <div className="flex items-center gap-2.5 flex-wrap">
                                    <span className="text-xs text-slate-400 font-semibold">Página</span>
                                    <div className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-black text-slate-700 tabular-nums"
                                        style={{ boxShadow: "0 1px 3px rgba(15,23,42,0.06)" }}>
                                        {pagination?.currentPage}
                                    </div>
                                    <span className="text-xs text-slate-400 font-semibold">de {pagination?.totalPages}</span>
                                    <div className="w-px h-4 bg-slate-200 mx-0.5 hidden sm:block" />
                                    <span className="text-[11px] text-slate-400 font-medium">{pagination?.totalRecords} registros</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => changePage(Number(pagination?.currentPage) - 1)}
                                        disabled={pagination?.currentPage <= 1}
                                        className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-bold hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
                                        style={{ boxShadow: "0 1px 2px rgba(15,23,42,0.04)" }}
                                    >
                                        ← Anterior
                                    </button>
                                    <button
                                        onClick={() => changePage(Number(pagination?.currentPage) + 1)}
                                        disabled={pagination?.currentPage >= pagination?.totalPages}
                                        className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl text-white text-xs font-black disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 hover:scale-[1.03] transition-all"
                                        style={{
                                            background: "linear-gradient(135deg, #4f46e5, #0891b2)",
                                            boxShadow: "0 4px 14px -2px rgba(79,70,229,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
                                        }}
                                    >
                                        Siguiente →
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

            </div>

            {modal?.type === "create" && <AccountModal onClose={() => setModal({ type: null })} onSave={handleCreate} loading={loading} />}
            {ownerModal && <AccountOwnerModal account={ownerModal} onClose={() => setOwnerModal(null)} />}
            {modal?.type === "edit" && <AccountModal initial={modal.account} onClose={() => setModal({ type: null })} onSave={handleEdit} loading={loading} />}
            {modal?.type === "delete" && <ConfirmModal account={modal.account} onClose={() => setModal({ type: null })} onConfirm={handleDelete} loading={loading} />}
        </>
    );
};