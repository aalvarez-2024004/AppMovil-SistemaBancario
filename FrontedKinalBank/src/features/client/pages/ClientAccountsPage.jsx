import { useEffect, useState } from "react";
import { useClientStore } from "../store/useClientStore.js";

const CURRENCY_SYMBOLS = {
    GTQ: "Q", USD: "$", EUR: "€", GBP: "£", MXN: "MX$",
    CAD: "C$", JPY: "¥", CHF: "Fr", BRL: "R$", COP: "COL$",
};

const TYPE_META = {
    DEPOSITO:      { label: "Depósito",      pill: "bg-emerald-100 text-emerald-700", icon: "↓", line: "bg-emerald-400", amount: "text-emerald-600" },
    CREDITO:       { label: "Crédito",       pill: "bg-sky-100 text-sky-700",         icon: "↓", line: "bg-sky-400",     amount: "text-sky-600" },
    RETIRO:        { label: "Retiro",        pill: "bg-rose-100 text-rose-700",       icon: "↑", line: "bg-rose-400",    amount: "text-rose-600" },
    TRANSFERENCIA: { label: "Transferencia", pill: "bg-violet-100 text-violet-700",   icon: "⇄", line: "bg-violet-400",  amount: "text-violet-600" },
    DEBITO:        { label: "Débito",        pill: "bg-orange-100 text-orange-700",   icon: "↑", line: "bg-orange-400",  amount: "text-orange-600" },
};

const getMeta = (type, isCredit) =>
    TYPE_META[type] ?? (isCredit
        ? { label: type, pill: "bg-emerald-100 text-emerald-700", icon: "↓", line: "bg-emerald-400", amount: "text-emerald-600" }
        : { label: type, pill: "bg-rose-100 text-rose-700",       icon: "↑", line: "bg-rose-400",    amount: "text-rose-600" });

/* ─── Fila de transacción ─────────────────────────────────────────────── */
const TxRow = ({ tx, accountId }) => {
    const isCredit =
        tx.type === "DEPOSITO" || tx.type === "CREDITO" ||
        String(tx.toAccount?._id) === String(accountId);

    const amount   = Number(isCredit ? tx.amountReceived : tx.amountSent) || 0;
    const currency = isCredit ? (tx.toAccount?.currency ?? tx.currencyTo) : (tx.fromAccount?.currency ?? tx.currencyFrom);
    const symbol   = CURRENCY_SYMBOLS[currency] ?? "Q";
    const meta     = getMeta(tx.type, isCredit);

    const d     = new Date(tx.createdAt);
    const day   = d.toLocaleDateString("es-GT", { day: "2-digit" });
    const month = d.toLocaleDateString("es-GT", { month: "short" }).replace(".", "").toUpperCase();

    return (
        <div className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-all duration-200 border-b border-slate-100 last:border-0 group cursor-default">
            <div className="w-10 flex-shrink-0 text-center">
                <p className="text-lg font-black text-slate-800 leading-none">{day}</p>
                <p className="text-[8px] font-bold tracking-widest text-slate-400 uppercase mt-0.5">{month}</p>
            </div>
            <div className={`w-0.5 h-10 flex-shrink-0 rounded-full ${meta.line}`} />
            <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-sm font-black flex-shrink-0 shadow-sm ${isCredit ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-600"}`}>
                {meta.icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-700 truncate">{tx.description ?? tx.type}</p>
                <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${meta.pill}`}>
                    {meta.label}
                </span>
            </div>
            <p className={`text-sm font-black tabular-nums flex-shrink-0 ${isCredit ? "text-emerald-600" : "text-rose-500"}`}>
                {isCredit ? "+" : "−"}{symbol} {amount.toLocaleString("es-GT", { minimumFractionDigits: 2 })}
            </p>
        </div>
    );
};

/* ─── Fila de depósito ────────────────────────────────────────────────── */
const DepositRow = ({ deposit, currency }) => {
    const symbol = CURRENCY_SYMBOLS[currency] ?? "Q";
    const amount = Number(deposit.amount) || 0;
    const isRevertido = deposit.estado === "REVERTIDO";

    const d     = new Date(deposit.fecha ?? deposit.createdAt);
    const day   = d.toLocaleDateString("es-GT", { day: "2-digit" });
    const month = d.toLocaleDateString("es-GT", { month: "short" }).replace(".", "").toUpperCase();

    return (
        <div className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-all duration-200 border-b border-slate-100 last:border-0">
            <div className="w-10 flex-shrink-0 text-center">
                <p className="text-lg font-black text-slate-800 leading-none">{day}</p>
                <p className="text-[8px] font-bold tracking-widest text-slate-400 uppercase mt-0.5">{month}</p>
            </div>
            <div className={`w-0.5 h-10 flex-shrink-0 rounded-full ${isRevertido ? "bg-rose-300" : "bg-emerald-400"}`} />
            <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-sm font-black flex-shrink-0 shadow-sm ${isRevertido ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-700"}`}>
                {isRevertido ? "↩" : "↓"}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-700 truncate">Depósito bancario</p>
                <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${isRevertido ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"}`}>
                    {isRevertido ? "Revertido" : "Completado"}
                </span>
            </div>
            <p className={`text-sm font-black tabular-nums flex-shrink-0 ${isRevertido ? "text-rose-400 line-through" : "text-emerald-600"}`}>
                +{symbol} {amount.toLocaleString("es-GT", { minimumFractionDigits: 2 })}
            </p>
        </div>
    );
};

/* ─── Panel lateral ───────────────────────────────────────────────────── */
const HistoryPanel = ({ account, transactions, deposits, loading, onClose, onLoadDeposits }) => {
    const [activeTab, setActiveTab] = useState("transacciones");

    useEffect(() => {
        if (account && activeTab === "depositos") {
            onLoadDeposits(account._id);
        }
    }, [activeTab, account]);

    if (!account) return null;

    const symbol = CURRENCY_SYMBOLS[account.currency] ?? "Q";

    const txs = transactions.filter(tx =>
        String(tx.fromAccount?._id) === String(account._id) ||
        String(tx.toAccount?._id)   === String(account._id)
    );

    const deps = deposits.filter(d => String(d.accountId) === String(account._id));

    const totalCreditos = txs
        .filter(tx => tx.type === "CREDITO" || String(tx.toAccount?._id) === String(account._id))
        .reduce((s, tx) => s + (Number(tx.amountReceived) || Number(tx.amount) || 0), 0)
        + deps.filter(d => d.estado === "COMPLETADO")
        .reduce((s, d) => s + (Number(d.amount) || 0), 0);

    const totalDebitos = txs
        .filter(tx => tx.type !== "CREDITO" && String(tx.toAccount?._id) !== String(account._id))
        .reduce((s, tx) => s + (Number(tx.amountSent) || Number(tx.amount) || 0), 0);

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 backdrop-blur-sm"
                style={{ background: "rgba(2,6,23,0.7)" }}
                onClick={onClose}
            />

            {/* Panel */}
            <div className="fixed top-0 right-0 h-full w-full max-w-[460px] z-50 flex flex-col shadow-2xl"
                style={{ background: "#fff" }}>

                {/* Header con gradiente vibrante */}
                <div className="relative overflow-hidden px-7 pt-7 pb-6"
                    style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #312e81 100%)" }}>

                    {/* Orbes decorativos */}
                    <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-20"
                        style={{ background: "radial-gradient(circle, #818cf8, transparent)" }} />
                    <div className="absolute bottom-0 left-12 w-24 h-24 rounded-full opacity-10"
                        style={{ background: "radial-gradient(circle, #38bdf8, transparent)" }} />

                    <div className="relative flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-5 h-5 rounded-lg flex items-center justify-center text-[10px]"
                                    style={{ background: "rgba(129,140,248,0.3)" }}>
                                    📋
                                </div>
                                <p className="text-[9px] font-black tracking-[0.3em] uppercase"
                                    style={{ color: "#a5b4fc" }}>Historial de cuenta</p>
                            </div>
                            <h2 className="text-2xl font-black text-white leading-tight mb-1">Movimientos</h2>
                            <p className="font-mono text-[11px]" style={{ color: "#64748b" }}>
                                Nº {account.accountNumber}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-bold transition-all hover:scale-110 cursor-pointer"
                            style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}>
                            ✕
                        </button>
                    </div>

                    {/* Balance strip */}
                    <div className="mt-5 rounded-2xl p-4 flex items-center justify-between"
                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <div>
                            <p className="text-[9px] font-black tracking-[0.2em] uppercase mb-1" style={{ color: "rgba(165,180,252,0.7)" }}>Saldo actual</p>
                            <p className="text-2xl font-black text-white tabular-nums">
                                {symbol} {Number(account.balance).toLocaleString("es-GT", { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-black text-white">{account.accountType ?? "Ahorro"}</p>
                            <p className="text-[10px]" style={{ color: "rgba(148,163,184,0.6)" }}>{account.currency}</p>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 border-b border-slate-100">
                    <div className="px-6 py-4 border-r border-slate-100 bg-emerald-50/50">
                        <div className="flex items-center gap-1.5 mb-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            <p className="text-[8px] font-black tracking-widest text-slate-400 uppercase">Entradas</p>
                        </div>
                        <p className="text-base font-black text-emerald-600 tabular-nums">
                            +{symbol} {totalCreditos.toLocaleString("es-GT", { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                    <div className="px-6 py-4 bg-rose-50/50">
                        <div className="flex items-center gap-1.5 mb-1.5">
                            <span className="w-2 h-2 rounded-full bg-rose-400" />
                            <p className="text-[8px] font-black tracking-widest text-slate-400 uppercase">Salidas</p>
                        </div>
                        <p className="text-base font-black text-rose-500 tabular-nums">
                            −{symbol} {totalDebitos.toLocaleString("es-GT", { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-100 bg-white">
                    {[
                        { key: "transacciones", label: "Transacciones", count: txs.length, activeColor: "text-indigo-600 border-indigo-500 bg-indigo-50/50", badgeActive: "bg-indigo-100 text-indigo-600", badgeInactive: "bg-slate-100 text-slate-400" },
                        { key: "depositos", label: "Depósitos", count: deps.length, activeColor: "text-emerald-600 border-emerald-500 bg-emerald-50/50", badgeActive: "bg-emerald-100 text-emerald-600", badgeInactive: "bg-slate-100 text-slate-400" },
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex-1 py-3 text-[11px] font-black tracking-wide uppercase transition-all cursor-pointer ${
                                activeTab === tab.key
                                    ? `${tab.activeColor} border-b-2`
                                    : "text-slate-400 hover:text-slate-600"
                            }`}>
                            {tab.label}
                            <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[9px] ${activeTab === tab.key ? tab.badgeActive : tab.badgeInactive}`}>
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Lista */}
                <div className="flex-1 overflow-y-auto bg-white">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-48 gap-3">
                            <div className="w-7 h-7 border-2 border-indigo-100 border-t-indigo-500 rounded-full animate-spin" />
                            <p className="text-sm text-slate-400">Cargando…</p>
                        </div>
                    ) : activeTab === "transacciones" ? (
                        txs.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-56 gap-3">
                                <p className="text-7xl font-black text-slate-100">0</p>
                                <p className="text-sm font-bold text-slate-400">Sin transacciones</p>
                            </div>
                        ) : (
                            <>
                                <div className="px-6 pt-4 pb-2 flex items-center gap-2">
                                    <div className="w-4 h-0.5 bg-indigo-400 rounded-full" />
                                    <p className="text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase">
                                        {txs.length} movimiento{txs.length !== 1 ? "s" : ""}
                                    </p>
                                </div>
                                {txs.map((tx, i) => <TxRow key={tx._id ?? i} tx={tx} accountId={account._id} />)}
                            </>
                        )
                    ) : (
                        deps.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-56 gap-3">
                                <p className="text-7xl font-black text-slate-100">0</p>
                                <p className="text-sm font-bold text-slate-400">Sin depósitos</p>
                            </div>
                        ) : (
                            <>
                                <div className="px-6 pt-4 pb-2 flex items-center gap-2">
                                    <div className="w-4 h-0.5 bg-emerald-400 rounded-full" />
                                    <p className="text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase">
                                        {deps.length} depósito{deps.length !== 1 ? "s" : ""}
                                    </p>
                                </div>
                                {deps.map((d, i) => <DepositRow key={d._id ?? i} deposit={d} currency={account.currency} />)}
                            </>
                        )
                    )}
                </div>
            </div>
        </>
    );
};

/* ─── Tarjeta de cuenta — nuevo diseño llamativo ──────────────────────── */
const CARD_PALETTES = [
    {
        bg: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
        accent: "#38bdf8",
        accentSoft: "rgba(56,189,248,0.15)",
        chip: "linear-gradient(90deg,#38bdf8,#0ea5e9)",
        btnBg: "rgba(56,189,248,0.2)",
        btnBorder: "rgba(56,189,248,0.5)",
        btnText: "#7dd3fc",
        glow: "56,189,248",
    },
    {
        bg: "linear-gradient(135deg, #0c1322 0%, #0f2d4a 50%, #0c1322 100%)",
        accent: "#38bdf8",
        accentSoft: "rgba(56,189,248,0.15)",
        chip: "linear-gradient(90deg,#0ea5e9,#38bdf8)",
        btnBg: "rgba(56,189,248,0.2)",
        btnBorder: "rgba(56,189,248,0.5)",
        btnText: "#7dd3fc",
        glow: "56,189,248",
    },
    {
        bg: "linear-gradient(135deg, #0a1628 0%, #163354 50%, #0a1628 100%)",
        accent: "#38bdf8",
        accentSoft: "rgba(56,189,248,0.15)",
        chip: "linear-gradient(90deg,#38bdf8,#60c8f5)",
        btnBg: "rgba(56,189,248,0.2)",
        btnBorder: "rgba(56,189,248,0.5)",
        btnText: "#7dd3fc",
        glow: "56,189,248",
    },
    {
        bg: "linear-gradient(135deg, #0d1a2e 0%, #1a3f63 50%, #0d1a2e 100%)",
        accent: "#38bdf8",
        accentSoft: "rgba(56,189,248,0.15)",
        chip: "linear-gradient(90deg,#60c8f5,#38bdf8)",
        btnBg: "rgba(56,189,248,0.2)",
        btnBorder: "rgba(56,189,248,0.5)",
        btnText: "#7dd3fc",
        glow: "56,189,248",
    },
];

const AccountCard = ({ account, onViewHistory, index }) => {
    const isActive = account.status === "ACTIVA";
    const symbol   = CURRENCY_SYMBOLS[account.currency] ?? "Q";
    const pal      = CARD_PALETTES[index % CARD_PALETTES.length];
    const bal      = Number(account.balance).toLocaleString("es-GT", { minimumFractionDigits: 2 });

    return (
        <div
            className="relative rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 group cursor-default"
            style={{
                background: pal.bg,
                boxShadow: `0 4px 24px rgba(${pal.glow},0.15), 0 1px 3px rgba(0,0,0,0.4)`,
                border: "1px solid rgba(255,255,255,0.06)",
            }}>

            {/* Top accent bar */}
            <div className="h-[3px] w-full" style={{ background: pal.chip }} />

            {/* Glow orb */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, rgba(${pal.glow},0.2) 0%, transparent 70%)` }} />

            {/* Decorative big number */}
            <div className="absolute right-4 top-8 text-[72px] font-black leading-none select-none pointer-events-none"
                style={{ color: `rgba(${pal.glow},0.07)` }}>
                {String(account.accountNumber ?? "").slice(-4) || "0000"}
            </div>

            <div className="relative p-6 flex flex-col gap-5 flex-1">
                {/* Top row */}
                <div className="flex items-center justify-between">
                    {/* Chip */}
                    <div className="w-10 h-7 rounded-lg overflow-hidden flex items-center justify-center"
                        style={{ background: pal.accentSoft, border: `1px solid rgba(${pal.glow},0.3)` }}>
                        <div className="w-6 h-4 rounded-sm" style={{ background: pal.chip }} />
                    </div>

                    {/* Status */}
                    <span className="flex items-center gap-1.5 text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full"
                        style={{
                            background: isActive ? `rgba(${pal.glow},0.12)` : "rgba(244,63,94,0.15)",
                            color: isActive ? pal.accent : "#fb7185",
                            border: `1px solid ${isActive ? `rgba(${pal.glow},0.25)` : "rgba(244,63,94,0.3)"}`,
                        }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: isActive ? pal.accent : "#fb7185", ...(isActive ? { animation: "pulse 2s infinite" } : {}) }} />
                        {account.status}
                    </span>
                </div>

                {/* Balance */}
                <div>
                    <p className="text-[9px] font-black tracking-[0.2em] uppercase mb-2" style={{ color: `rgba(${pal.glow},0.5)` }}>
                        Nº {account.accountNumber}
                    </p>
                    <p className="text-[28px] font-black text-white leading-none tabular-nums tracking-tight">
                        {symbol} {bal}
                    </p>
                    <p className="text-xs font-bold mt-2" style={{ color: pal.accent }}>
                        {account.currency} · {account.accountType ?? "Ahorro"}
                    </p>
                </div>

                {/* Divider */}
                <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

                {/* Footer */}
                <div className="flex items-end justify-between gap-3">
                    <div className="space-y-1.5">
                        {account.createdAt && (
                            <div>
                                <p className="text-[8px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>Apertura</p>
                                <p className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>
                                    {new Date(account.createdAt).toLocaleDateString("es-GT", {
                                        day: "2-digit", month: "short", year: "numeric"
                                    })}
                                </p>
                            </div>
                        )}
                        {account.owner && (
                            <div>
                                <p className="text-[8px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>Titular</p>
                                <p className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>{account.owner}</p>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => onViewHistory(account)}
                        className="flex-shrink-0 px-5 py-2.5 rounded-2xl text-[11px] font-black tracking-wide transition-all hover:scale-105 active:scale-95 cursor-pointer"
                        style={{
                            background: pal.btnBg,
                            border: `1px solid ${pal.btnBorder}`,
                            color: pal.btnText,
                        }}>
                        Historial →
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ─── Tarjeta de estadística ─────────────────────────────────────────── */
const StatCard = ({ label, value, sub, gradient, iconBg, iconText, icon }) => (
    <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-100 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
        {/* Top gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background: gradient }} />

        {/* Floating glow */}
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `radial-gradient(circle, ${iconBg}60, transparent)` }} />

        <div className="relative flex items-start justify-between mb-5 pt-2">
            <p className="text-[10px] font-black tracking-[0.25em] text-slate-400 uppercase leading-tight">{label}</p>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{ background: iconBg, color: iconText }}>
                {icon}
            </div>
        </div>

        <div className="relative">
            <h2 className="text-5xl font-black leading-none" style={{ color: iconText }}>{value}</h2>
            <p className="text-sm text-slate-400 mt-3 font-medium">{sub}</p>
        </div>
    </div>
);

/* ─── Página principal ────────────────────────────────────────────────── */
export const ClientAccountsPage = () => {
    const {
        accounts, transactions, deposits, loading, error,
        fetchMyAccounts, fetchMyTransactions, fetchMyDeposits
    } = useClientStore();

    const [selectedAccount, setSelectedAccount] = useState(null);

    useEffect(() => {
        fetchMyAccounts();
        fetchMyTransactions(1);
    }, []);

    const activas      = accounts.filter(a => a.status === "ACTIVA");
    const inactivas    = accounts.filter(a => a.status !== "ACTIVA");
    const totalBalance = activas.reduce((s, a) => s + Number(a.balance), 0);
    const totalStr     = totalBalance.toLocaleString("es-GT", { minimumFractionDigits: 2 });

    return (
        <>
            <div className="relative max-w-5xl mx-auto pb-20 space-y-8">

                {/* ── Hero banner ── */}
                <div
                    className="relative overflow-hidden rounded-3xl border shadow-2xl p-8"
                    style={{
                        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #312e81 100%)",
                        borderColor: "rgba(255,255,255,0.05)",
                    }}>

                    {/* Orbes de fondo */}
                    <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)" }} />
                    <div className="absolute -bottom-16 left-32 w-48 h-48 rounded-full pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)" }} />


                    {/* Barra lateral izquierda */}
                    <div className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full"
                        style={{ background: "linear-gradient(180deg,#ffffff,#7dd3fc,#0ea5e9)" }} />

                    {/* Balance en marca de agua */}
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[80px] font-black leading-none select-none pointer-events-none tracking-tighter whitespace-nowrap"
                        style={{ color: "rgba(255,255,255,0.03)" }}>
                        Q {totalStr}
                    </span>

                    <div className="relative flex items-end justify-between gap-6 flex-wrap">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-6 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg,#38bdf8,#818cf8)" }} />
                                <p className="text-[9px] font-black tracking-[0.3em] uppercase" style={{ color: "#818cf8" }}>KinalBank</p>
                            </div>
                            <h1 className="text-5xl font-black leading-none tracking-tighter mb-3">
                                <span style={{ color: "#ffffff" }}>Mis</span>
                                <br />
                                <span style={{ color: "#38bdf8" }}>Cuentas</span>
                            </h1>
                            <p className="text-slate-300 text-sm">
                                {accounts.length} cuenta{accounts.length !== 1 ? "s" : ""} · {activas.length} activa{activas.length !== 1 ? "s" : ""}
                            </p>
                        </div>

                        {accounts.length > 0 && (
                            <div className="rounded-2xl px-7 py-5 min-w-[210px] flex-shrink-0 relative overflow-hidden"
                                style={{
                                    background: "linear-gradient(135deg, rgba(56,189,248,0.2) 0%, rgba(14,165,233,0.1) 100%)",
                                    border: "1px solid rgba(56,189,248,0.4)",
                                    boxShadow: "0 0 32px rgba(56,189,248,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
                                }}>
                                {/* Glow orb */}
                                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none"
                                    style={{ background: "radial-gradient(circle, rgba(56,189,248,0.3), transparent)" }} />
                                <p className="text-[9px] font-black tracking-[0.3em] uppercase mb-2 relative"
                                    style={{ color: "#7dd3fc" }}>✦ Balance total</p>
                                <p className="text-4xl font-black text-white tabular-nums tracking-tight relative leading-none">
                                    Q {totalStr}
                                </p>
                                <div className="mt-3 flex items-center gap-1.5 relative">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                                        style={{ boxShadow: "0 0 6px #38bdf8" }} />
                                    <p className="text-[11px] font-bold" style={{ color: "#7dd3fc" }}>
                                        {activas.length} cuenta{activas.length !== 1 ? "s" : ""} activa{activas.length !== 1 ? "s" : ""}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Stat cards ── */}
                {accounts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <StatCard
                            label="Total cuentas"
                            value={accounts.length}
                            sub={`${activas.length} activa${activas.length !== 1 ? "s" : ""}`}
                            gradient="linear-gradient(90deg,#38bdf8,#818cf8)"
                            iconBg="#eff6ff"
                            iconText="#2563eb"
                            icon="🏦"
                        />
                        <StatCard
                            label="Cuentas activas"
                            value={activas.length}
                            sub="En operación"
                            gradient="linear-gradient(90deg,#34d399,#10b981)"
                            iconBg="#f0fdf4"
                            iconText="#059669"
                            icon="✓"
                        />
                        <StatCard
                            label="Inactivas"
                            value={inactivas.length}
                            sub="Suspendidas"
                            gradient="linear-gradient(90deg,#fb7185,#e11d48)"
                            iconBg="#fff1f2"
                            iconText="#e11d48"
                            icon="○"
                        />
                    </div>
                )}

                {/* ── Error ── */}
                {error && (
                    <div className="bg-rose-50 border-l-4 border-rose-400 text-rose-700 text-sm px-5 py-4 rounded-2xl flex items-center gap-3">
                        <span>⚠️</span> {error}
                    </div>
                )}

                {/* ── Loading / empty / cuentas ── */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-28 gap-4">
                        <div className="w-10 h-10 rounded-full border-[3px] border-indigo-100 border-t-indigo-500 animate-spin" />
                        <p className="text-sm font-semibold text-slate-400 tracking-wide">Cargando cuentas…</p>
                    </div>
                ) : accounts.length === 0 ? (
                    <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-20 text-center">
                        <p className="text-7xl font-black text-slate-200 mb-4">0</p>
                        <p className="text-sm font-bold text-slate-500">Aún no tienes cuentas asociadas</p>
                        <p className="text-xs text-slate-400 mt-1">Contacta con el banco para abrir una.</p>
                    </div>
                ) : (
                    <>
                        {activas.length > 0 && (
                            <section className="space-y-5">
                                {/* Section header */}
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2.5">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                                        <p className="text-[10px] font-black tracking-[0.25em] text-slate-500 uppercase">Cuentas Activas</p>
                                    </div>
                                    <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent" />
                                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-full">{activas.length}</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {activas.map((acc, i) => (
                                        <AccountCard key={acc._id} account={acc} onViewHistory={setSelectedAccount} index={i} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {inactivas.length > 0 && (
                            <section className="space-y-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2.5">
                                        <span className="w-2 h-2 rounded-full bg-slate-400" />
                                        <p className="text-[10px] font-black tracking-[0.25em] text-slate-500 uppercase">Cuentas Inactivas</p>
                                    </div>
                                    <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent" />
                                    <span className="text-[10px] font-black text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">{inactivas.length}</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 opacity-60">
                                    {inactivas.map((acc, i) => (
                                        <AccountCard key={acc._id} account={acc} onViewHistory={setSelectedAccount} index={activas.length + i} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </div>

            {/* ── Panel lateral ── */}
            {selectedAccount && (
                <HistoryPanel
                    account={selectedAccount}
                    transactions={transactions}
                    deposits={deposits}
                    loading={loading}
                    onClose={() => setSelectedAccount(null)}
                    onLoadDeposits={fetchMyDeposits}
                />
            )}
        </>
    );
};