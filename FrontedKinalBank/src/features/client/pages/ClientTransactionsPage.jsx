import { useEffect, useState } from "react";
import { ArrowDownLeft, ArrowUpRight, CreditCard, Wallet, Landmark } from "lucide-react";
import { useClientStore } from "../store/useClientStore.js";

const CURRENCY_SYMBOLS = {
    GTQ: "Q", USD: "$", EUR: "€", GBP: "£", MXN: "MX$",
};

const TYPE_META = {
    DEPOSITO:      { label: "Depósito",      color: "emerald", icon: <ArrowDownLeft size={18} /> },
    TRANSFERENCIA: { label: "Transferencia", color: "sky",     icon: <ArrowUpRight size={18} /> },
    COMPRA:        { label: "Compra",        color: "orange",  icon: <CreditCard size={18} /> },
    CREDITO:       { label: "Crédito",       color: "violet",  icon: <Wallet size={18} /> },
};

const colorMap = {
    emerald: { bg: "bg-emerald-100", text: "text-emerald-700", amount: "text-emerald-500", bar: "#10b981" },
    sky:     { bg: "bg-sky-100",     text: "text-sky-700",     amount: "text-sky-500",     bar: "#0ea5e9" },
    orange:  { bg: "bg-orange-100",  text: "text-orange-700",  amount: "text-rose-500",    bar: "#f97316" },
    violet:  { bg: "bg-violet-100",  text: "text-violet-700",  amount: "text-violet-600",  bar: "#8b5cf6" },
};

const formatDate = (iso) => {
    const d = new Date(iso);
    return {
        date: d.toLocaleDateString("es-GT", { day: "2-digit", month: "short" }),
        time: d.toLocaleTimeString("es-GT", { hour: "2-digit", minute: "2-digit" }),
    };
};

const FILTERS = [
    { key: "TODOS",         label: "Todos" },
    { key: "DEPOSITO",      label: "Depósitos" },
    { key: "TRANSFERENCIA", label: "Transferencias" },
    { key: "COMPRA",        label: "Compras" },
    { key: "CREDITO",       label: "Créditos" },
];

const TransactionCard = ({ tx, myAccountIds = [] }) => {
    const fromId   = String(tx.fromAccount?._id ?? tx.fromAccount ?? "");
    const isCredit =
        tx.type === "DEPOSITO" ||
        tx.type === "CREDITO"  ||
        (tx.type === "TRANSFERENCIA" && !myAccountIds.includes(fromId));

    const amount      = Number(isCredit ? tx.amountReceived : tx.amountSent);
    const currency    = CURRENCY_SYMBOLS[isCredit ? tx.currencyTo : tx.currencyFrom] ?? "Q";
    const displayType = tx.type === "TRANSFERENCIA" && isCredit ? "DEPOSITO" : tx.type;
    const meta        = TYPE_META[displayType] ?? TYPE_META[tx.type];
    const colors      = colorMap[meta?.color ?? "sky"];
    const date        = formatDate(tx.createdAt);

    return (
        <div
            className="relative overflow-hidden rounded-2xl flex items-center gap-5 px-6 py-5 transition-all duration-200 hover:-translate-y-0.5 group"
            style={{ background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full transition-all duration-200 group-hover:top-0 group-hover:bottom-0"
                style={{ background: colors.bar }} />
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${colors.bg} ${colors.text}`}>
                {meta?.icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-[15px] font-bold text-slate-800 truncate">{tx.description ?? meta?.label}</p>
                <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide ${colors.bg} ${colors.text}`}>
                        {meta?.label}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">#{tx._id?.slice(-6)}</span>
                </div>
            </div>
            <div className="text-right flex-shrink-0">
                <p className={`text-lg font-black tabular-nums ${colors.amount}`}>
                    {isCredit ? "+" : "−"}{currency}{amount.toLocaleString("es-GT", { minimumFractionDigits: 2 })}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">{date.date} · {date.time}</p>
            </div>
        </div>
    );
};

export const ClientTransactionsPage = () => {
    const {
        accounts, transactions, pagination, loading, error,
        fetchMyAccounts, fetchMyTransactions,
    } = useClientStore();

    const [filter, setFilter] = useState("TODOS");

    useEffect(() => {
        fetchMyAccounts();
        fetchMyTransactions(1);
    }, []);

    const myAccountIds = accounts.map(a => String(a._id));

    const filtered = filter === "TODOS"
        ? transactions
        : transactions.filter(tx => tx.type === filter);

    const totalCreditos = transactions
        .filter(tx => {
            const fromId = String(tx.fromAccount?._id ?? tx.fromAccount ?? "");
            return tx.type === "DEPOSITO" || tx.type === "CREDITO" ||
                (tx.type === "TRANSFERENCIA" && !myAccountIds.includes(fromId));
        })
        .reduce((s, tx) => s + Number(tx.amountReceived ?? 0), 0);

    const totalDebitos = transactions
        .filter(tx => {
            const fromId = String(tx.fromAccount?._id ?? tx.fromAccount ?? "");
            return tx.type === "COMPRA" ||
                (tx.type === "TRANSFERENCIA" && myAccountIds.includes(fromId));
        })
        .reduce((s, tx) => s + Number(tx.amountSent ?? 0), 0);

    const changePage = (page) => {
        if (page < 1 || page > pagination.totalPages) return;
        fetchMyTransactions(page);
    };

    const totalRecords = pagination.totalRecords ?? transactions.length;

    return (
        <div className="relative max-w-7xl mx-auto pb-20 space-y-8 px-4">

            {/* ── Hero — rounded, compacto ── */}
            <div
                className="relative overflow-hidden rounded-3xl border shadow-2xl p-8"
                style={{
                    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #312e81 100%)",
                    borderColor: "rgba(255,255,255,0.05)",
                }}>

                <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)" }} />
                <div className="absolute -bottom-16 left-32 w-48 h-48 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)" }} />
                <div className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full"
                    style={{ background: "linear-gradient(180deg,#ffffff,#7dd3fc,#0ea5e9)" }} />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[72px] font-black leading-none select-none pointer-events-none tracking-tighter"
                    style={{ color: "rgba(255,255,255,0.03)" }}>
                    {totalRecords} mov.
                </span>

                <div className="relative flex items-center justify-between gap-6 flex-wrap">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-6 h-0.5 rounded-full"
                                style={{ background: "linear-gradient(90deg,#ffffff,#7dd3fc,#0ea5e9)" }} />
                            <p className="text-[9px] font-black tracking-[0.3em] uppercase" style={{ color: "#818cf8" }}>KinalBank</p>
                        </div>
                        <h1 className="text-5xl font-black leading-none tracking-tighter mb-3">
                            <span style={{ color: "#ffffff" }}>Mis</span><br />
                            <span style={{ color: "#38bdf8" }}>Movimientos</span>
                        </h1>
                        <p className="text-slate-400 text-sm">Historial completo de tus transacciones</p>
                    </div>

                    <div className="flex items-center gap-4 flex-wrap flex-shrink-0">
                        {/* Registros */}
                        <div className="rounded-2xl px-7 py-5 relative overflow-hidden"
                            style={{
                                background: "linear-gradient(135deg, rgba(56,189,248,0.2) 0%, rgba(14,165,233,0.1) 100%)",
                                border: "1px solid rgba(56,189,248,0.4)",
                                boxShadow: "0 0 32px rgba(56,189,248,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
                            }}>
                            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none"
                                style={{ background: "radial-gradient(circle, rgba(56,189,248,0.3), transparent)" }} />
                            <p className="text-[9px] font-black tracking-[0.3em] uppercase mb-2 relative" style={{ color: "#7dd3fc" }}>✦ Registros</p>
                            <p className="text-5xl font-black tabular-nums relative leading-none" style={{ color: "#ffffff" }}>{totalRecords}</p>
                            <div className="mt-3 flex items-center gap-1.5 relative">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{ boxShadow: "0 0 6px #38bdf8" }} />
                                <p className="text-[11px] font-bold" style={{ color: "#7dd3fc" }}>Página {pagination.currentPage ?? 1}</p>
                            </div>
                        </div>

                        {/* Entradas */}
                        <div className="rounded-2xl px-6 py-4 flex-shrink-0"
                            style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)" }}>
                            <p className="text-[9px] font-black tracking-[0.3em] uppercase mb-1" style={{ color: "#6ee7b7" }}>↓ Entradas</p>
                            <p className="text-xl font-black" style={{ color: "#34d399" }}>
                                Q {totalCreditos.toLocaleString("es-GT", { minimumFractionDigits: 2 })}
                            </p>
                            <p className="text-[10px] mt-0.5" style={{ color: "rgba(110,231,183,0.5)" }}>Depósitos y créditos</p>
                        </div>

                        {/* Salidas */}
                        <div className="rounded-2xl px-6 py-4 flex-shrink-0"
                            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)" }}>
                            <p className="text-[9px] font-black tracking-[0.3em] uppercase mb-1" style={{ color: "#fca5a5" }}>↑ Salidas</p>
                            <p className="text-xl font-black" style={{ color: "#f87171" }}>
                                Q {totalDebitos.toLocaleString("es-GT", { minimumFractionDigits: 2 })}
                            </p>
                            <p className="text-[10px] mt-0.5" style={{ color: "rgba(252,165,165,0.5)" }}>Compras y transferencias</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Stat cards ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                    { title: "Movimientos", icon: <Landmark size={20} />, barColor: "linear-gradient(90deg,#38bdf8,#818cf8)", valueColor: "#1e40af", value: transactions.length, sub: `Página ${pagination.currentPage ?? 1} de ${pagination.totalPages ?? 1}` },
                    { title: "Entradas", icon: <ArrowDownLeft size={20} />, barColor: "linear-gradient(90deg,#34d399,#10b981)", valueColor: "#059669", value: `Q ${totalCreditos.toLocaleString("es-GT", { minimumFractionDigits: 2 })}`, sub: "Depósitos, créditos y transferencias recibidas" },
                    { title: "Salidas", icon: <ArrowUpRight size={20} />, barColor: "linear-gradient(90deg,#fb7185,#e11d48)", valueColor: "#e11d48", value: `Q ${totalDebitos.toLocaleString("es-GT", { minimumFractionDigits: 2 })}`, sub: "Compras y transferencias enviadas" },
                ].map((s, i) => (
                    <div key={i} className="relative overflow-hidden rounded-2xl p-6 bg-white transition-all duration-300 hover:-translate-y-1"
                        style={{ border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: s.barColor }} />
                        <div className="flex items-start justify-between mb-3">
                            <p className="text-[10px] font-black tracking-[0.25em] text-slate-400 uppercase">{s.title}</p>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50" style={{ color: s.valueColor }}>{s.icon}</div>
                        </div>
                        <h2 className="text-2xl font-black tabular-nums" style={{ color: s.valueColor }}>{s.value}</h2>
                        <p className="text-xs text-slate-400 mt-2">{s.sub}</p>
                    </div>
                ))}
            </div>

            {error && (
                <div className="bg-rose-50 border-l-4 border-rose-400 text-rose-700 text-sm px-5 py-4 rounded-2xl flex items-center gap-3">
                    <span>⚠️</span> {error}
                </div>
            )}

            {/* ── Two-column body ── */}
            <div className="grid gap-8" style={{ gridTemplateColumns: "1fr 300px" }}>
                <div className="space-y-5">
                    <div className="flex flex-wrap gap-2">
                        {FILTERS.map(f => (
                            <button key={f.key} onClick={() => setFilter(f.key)}
                                className="px-5 py-2 rounded-2xl text-sm font-bold transition-all duration-200 cursor-pointer"
                                style={filter === f.key
                                    ? { background: "linear-gradient(135deg,#1e3a5f,#1e1b4b)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", boxShadow: "0 4px 12px rgba(56,189,248,0.15)" }
                                    : { background: "#fff", color: "#64748b", border: "1px solid #e2e8f0" }}>
                                {f.label}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-3">
                        {loading ? (
                            <div className="py-24 flex flex-col items-center gap-4">
                                <div className="w-10 h-10 border-[3px] border-indigo-100 border-t-indigo-500 rounded-full animate-spin" />
                                <p className="text-sm font-semibold text-slate-400">Cargando movimientos…</p>
                            </div>
                        ) : filtered.length === 0 ? (
                            <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-16 text-center">
                                <p className="text-6xl font-black text-slate-200 mb-3">0</p>
                                <p className="text-sm font-bold text-slate-500">Sin movimientos</p>
                                <p className="text-xs text-slate-400 mt-1">Tus transacciones aparecerán aquí</p>
                            </div>
                        ) : (
                            filtered.map((tx, i) => <TransactionCard key={tx._id ?? i} tx={tx} myAccountIds={myAccountIds} />)
                        )}
                    </div>

                    {pagination.totalPages > 1 && (
                        <div className="flex items-center justify-between pt-2">
                            <p className="text-sm text-slate-400">
                                Página <span className="font-bold text-slate-700">{pagination.currentPage}</span> de {pagination.totalPages}
                            </p>
                            <div className="flex gap-3">
                                <button onClick={() => changePage(pagination.currentPage - 1)} disabled={pagination.currentPage === 1}
                                    className="px-5 py-2.5 rounded-2xl text-sm font-bold transition-all disabled:opacity-40 cursor-pointer"
                                    style={{ background: "#fff", border: "1px solid #e2e8f0", color: "#475569" }}>← Anterior</button>
                                <button onClick={() => changePage(pagination.currentPage + 1)} disabled={pagination.currentPage === pagination.totalPages}
                                    className="px-5 py-2.5 rounded-2xl text-sm font-bold transition-all disabled:opacity-40 cursor-pointer"
                                    style={{ background: "linear-gradient(135deg,#1e3a5f,#1e1b4b)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)" }}>Siguiente →</button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-5">
                    <div className="rounded-3xl overflow-hidden bg-white" style={{ border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                        <div className="px-6 py-5 border-b border-slate-100">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Por tipo</p>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {Object.entries(TYPE_META).map(([key, meta]) => {
                                const count = transactions.filter(tx => tx.type === key).length;
                                const colors = colorMap[meta.color];
                                return (
                                    <div key={key} className="px-6 py-4 flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${colors.bg} ${colors.text}`}>{meta.icon}</div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-slate-700">{meta.label}</p>
                                            <div className="mt-1.5 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                                                <div className="h-full rounded-full transition-all duration-500"
                                                    style={{ width: `${transactions.length ? (count / transactions.length) * 100 : 0}%`, background: colors.bar }} />
                                            </div>
                                        </div>
                                        <span className="text-sm font-black text-slate-500 tabular-nums">{count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="rounded-3xl overflow-hidden bg-white" style={{ border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                        <div className="px-6 py-5 border-b border-slate-100">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Información</p>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {[
                                { icon: "🛡️", title: "Historial seguro", desc: "Todas tus transacciones están cifradas.", accent: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.15)" },
                                { icon: "⚡", title: "Tiempo real", desc: "Los movimientos se reflejan al instante.", accent: "rgba(56,189,248,0.08)", border: "rgba(56,189,248,0.15)" },
                                { icon: "📄", title: "Paginación", desc: `${pagination.totalPages ?? 1} página${(pagination.totalPages ?? 1) !== 1 ? "s" : ""} disponibles.`, accent: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.15)" },
                            ].map((item, i) => (
                                <div key={i} className="px-6 py-4 flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                                        style={{ background: item.accent, border: `1px solid ${item.border}` }}>{item.icon}</div>
                                    <div>
                                        <p className="text-sm font-black text-slate-800">{item.title}</p>
                                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl px-5 py-4 flex items-start gap-3"
                        style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
                        <span className="text-lg flex-shrink-0 mt-0.5">⚠️</span>
                        <p className="text-xs font-semibold leading-relaxed" style={{ color: "#92400e" }}>
                            Si detectas un movimiento desconocido, comunícate de inmediato con soporte.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};