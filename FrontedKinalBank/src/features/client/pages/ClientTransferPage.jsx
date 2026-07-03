import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useClientStore } from "../store/useClientStore.js";
import { TransferModal } from "../components/TransferModal.jsx";

const CURRENCY_SYMBOLS = {
    GTQ: "Q", USD: "$", EUR: "€", GBP: "£", MXN: "MX$",
    CAD: "C$", JPY: "¥", CHF: "Fr", BRL: "R$", COP: "COL$",
};

const getCurrencySymbol = (currency) => CURRENCY_SYMBOLS[currency] ?? currency ?? "Q";

export const ClientTransferPage = () => {
    const location = useLocation();
    const prefill  = location.state ?? {};

    const {
        accounts, loadingTransfer, transferError, transferSuccess,
        fetchMyAccounts, transfer, clearTransferState,
    } = useClientStore();

    const [form, setForm] = useState({
        fromAccount: "",
        toAccount:   prefill.toAccount ?? "",
        amount:      "",
        description: prefill.alias ? `Transferencia a ${prefill.alias}` : "",
    });
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        fetchMyAccounts();
        return () => clearTransferState();
    }, []);

    const activeAccounts = accounts.filter(a => a.status === "ACTIVA");
    const handleChange   = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = () => {
        if (!form.fromAccount || !form.toAccount || !form.amount) return;
        clearTransferState();
        setShowConfirm(true);
    };

    const handleConfirm = async () => {
        setShowConfirm(false);
        const fromAccountObj = accounts.find(a => a._id === form.fromAccount);
        const result = await transfer({
            type:        "TRANSFERENCIA",
            fromAccount: fromAccountObj?.accountNumber ?? form.fromAccount,
            toAccount:   form.toAccount,
            amount:      Number(form.amount),
            description: form.description || "Transferencia entre cuentas",
        });
        if (result.success) {
            setForm({ fromAccount: "", toAccount: "", amount: "", description: "" });
        }
    };

    const selectedAccount   = accounts.find(a => a._id === form.fromAccount);
    const toAccount         = accounts.find(a => a.accountNumber === form.toAccount);
    const symbol            = getCurrencySymbol(selectedAccount?.currency);
    const toAccountComplete = form.toAccount.length === 10;
    const canSubmit         = !!(form.fromAccount && toAccountComplete && form.amount && !loadingTransfer);
    const amountNum         = Number(form.amount);
    const amountPct         = Math.min((amountNum / 2000) * 100, 100);
    const willConvert       = selectedAccount && toAccount && selectedAccount.currency !== toAccount.currency;

    const barColor = amountPct >= 90 ? "#ef4444" : amountPct >= 60 ? "#f59e0b" : "#10b981";

    return (
        <>
            <TransferModal
                open={showConfirm}
                onConfirm={handleConfirm}
                onCancel={() => setShowConfirm(false)}
                data={form}
                accounts={accounts}
                loading={loadingTransfer}
            />

            {/* ── Full-width wrapper ── */}
            <div className="w-full min-h-screen" style={{ background: "#f0f4f8" }}>

                {/* ── Hero banner — card flotante igual a Mis Movimientos ── */}
                <div className="w-full px-4 sm:px-6 pt-4 sm:pt-6">
                    <div
                        className="relative overflow-hidden w-full px-5 sm:px-8 py-6 sm:py-7"
                        style={{
                            background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #312e81 100%)",
                            borderRadius: "20px",
                            boxShadow: "0 8px 32px rgba(15,23,42,0.35)",
                        }}
                    >
                        {/* Decorative orbs */}
                        <div className="absolute -top-16 right-24 w-60 h-60 rounded-full pointer-events-none"
                            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.20) 0%, transparent 70%)" }} />
                        <div className="absolute bottom-0 left-1/3 w-40 h-40 rounded-full pointer-events-none"
                            style={{ background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)" }} />

                        {/* Left accent bar */}
                        <div className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full"
                            style={{ background: "linear-gradient(180deg,#ffffff,#7dd3fc,#0ea5e9)" }} />

                        <div className="relative flex items-center justify-between gap-6 sm:gap-8 flex-wrap">

                            {/* Title */}
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-5 h-0.5 rounded-full flex-shrink-0"
                                        style={{ background: "linear-gradient(90deg,#ffffff,#7dd3fc)" }} />
                                    <p className="text-[9px] font-black tracking-[0.35em] uppercase"
                                        style={{ color: "#818cf8" }}>KinalBank</p>
                                </div>
                                <h1 className="text-3xl sm:text-4xl font-black leading-none tracking-tighter mb-1.5">
                                    <span style={{ color: "#ffffff" }}>Transferir</span>
                                    <span style={{ color: "#38bdf8" }}> Fondos</span>
                                </h1>
                                <p className="text-slate-400 text-sm">Mueve dinero de forma segura e inmediata.</p>
                            </div>

                            {/* Stats cards — idéntico a Mis Movimientos */}
                            <div className="grid grid-cols-3 gap-2 sm:flex sm:items-stretch sm:gap-3 w-full sm:w-auto">

                                {/* Card 1 — Límite diario (estilo "Registros" azul) */}
                                <div
                                    className="rounded-xl sm:rounded-2xl px-2.5 sm:px-5 py-3 sm:py-4 flex flex-col justify-between min-w-0 sm:min-w-[130px]"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(56,189,248,0.22) 0%, rgba(14,165,233,0.12) 100%)",
                                        border: "1px solid rgba(56,189,248,0.40)",
                                        boxShadow: "0 0 20px rgba(56,189,248,0.15)",
                                    }}
                                >
                                    <p className="text-[7px] sm:text-[9px] font-black tracking-[0.15em] sm:tracking-[0.3em] uppercase mb-1"
                                        style={{ color: "#7dd3fc" }}>✦ Límite</p>
                                    <p className="text-lg sm:text-4xl font-black text-white leading-none">10,000</p>
                                    <p className="text-[8px] sm:text-[10px] mt-1 sm:mt-2 hidden sm:flex items-center gap-1"
                                        style={{ color: "rgba(125,211,252,0.65)" }}>
                                        <span className="inline-block w-1.5 h-1.5 rounded-full"
                                            style={{ background: "#38bdf8" }}></span>
                                        Q 2,000 por operación
                                    </p>
                                </div>

                                {/* Card 2 — Entradas (verde) */}
                                <div
                                    className="rounded-xl sm:rounded-2xl px-2.5 sm:px-5 py-3 sm:py-4 flex flex-col justify-between min-w-0 sm:min-w-[130px]"
                                    style={{
                                        background: "rgba(16,185,129,0.10)",
                                        border: "1px solid rgba(16,185,129,0.30)",
                                    }}
                                >
                                    <p className="text-[7px] sm:text-[9px] font-black tracking-[0.15em] sm:tracking-[0.3em] uppercase mb-1"
                                        style={{ color: "#6ee7b7" }}>↓ Entradas</p>
                                    <p className="text-sm sm:text-2xl font-black leading-none truncate" style={{ color: "#34d399" }}>
                                        Q {activeAccounts
                                            .reduce((s, a) => s + Number(a.balance), 0)
                                            .toLocaleString("es-GT", { minimumFractionDigits: 2 })}
                                    </p>
                                    <p className="text-[8px] sm:text-[10px] mt-1 sm:mt-2 hidden sm:block" style={{ color: "rgba(110,231,183,0.55)" }}>
                                        Depósitos y créditos
                                    </p>
                                </div>

                                {/* Card 3 — Salidas (rojo) */}
                                <div
                                    className="rounded-xl sm:rounded-2xl px-2.5 sm:px-5 py-3 sm:py-4 flex flex-col justify-between min-w-0 sm:min-w-[130px]"
                                    style={{
                                        background: "rgba(239,68,68,0.09)",
                                        border: "1px solid rgba(239,68,68,0.28)",
                                    }}
                                >
                                    <p className="text-[7px] sm:text-[9px] font-black tracking-[0.15em] sm:tracking-[0.3em] uppercase mb-1"
                                        style={{ color: "#fca5a5" }}>↑ Salidas</p>
                                    <p className="text-sm sm:text-2xl font-black leading-none truncate" style={{ color: "#f87171" }}>
                                        Q {amountNum > 0
                                            ? amountNum.toLocaleString("es-GT", { minimumFractionDigits: 2 })
                                            : "0.00"}
                                    </p>
                                    <p className="text-[8px] sm:text-[10px] mt-1 sm:mt-2 hidden sm:block" style={{ color: "rgba(252,165,165,0.5)" }}>
                                        Compras y transferencias
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Two-column body ── */}
                <div className="w-full px-4 sm:px-6 py-4 sm:py-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5 sm:gap-8">

                    {/* ══════════════ LEFT — main form ══════════════ */}
                    <div className="space-y-4 sm:space-y-5 min-w-0">

                        {/* Favorito banner */}
                        {prefill.toAccount && (
                            <div className="rounded-2xl px-4 sm:px-5 py-4 flex items-center gap-3"
                                style={{
                                    background: "linear-gradient(135deg, rgba(129,140,248,0.12), rgba(99,102,241,0.06))",
                                    border: "1px solid rgba(129,140,248,0.3)",
                                }}>
                                <span className="text-xl flex-shrink-0">⭐</span>
                                <div className="min-w-0">
                                    <p className="text-sm font-bold" style={{ color: "#818cf8" }}>Transferencia a favorito</p>
                                    <p className="text-xs font-mono mt-0.5 text-slate-400 truncate">
                                        {prefill.alias && <span className="mr-2">{prefill.alias} ·</span>}
                                        {prefill.toAccount}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Alertas */}
                        {transferSuccess && (
                            <div className="rounded-2xl px-4 sm:px-5 py-4 flex items-center gap-3 text-sm font-semibold"
                                style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d" }}>
                                <span>✅</span> {transferSuccess}
                            </div>
                        )}
                        {transferError && (
                            <div className="rounded-2xl px-4 sm:px-5 py-4 flex items-center gap-3 text-sm font-semibold"
                                style={{ background: "#fff1f2", border: "1px solid #fecdd3", color: "#be123c" }}>
                                <span>⚠️</span> {transferError}
                            </div>
                        )}

                        {/* ── Main card ── */}
                        <div className="rounded-3xl overflow-hidden bg-white"
                            style={{ border: "1px solid #e2e8f0", boxShadow: "0 4px 32px rgba(0,0,0,0.07)" }}>

                            {/* Card header */}
                            <div className="relative overflow-hidden px-5 sm:px-8 py-5 flex items-center gap-4"
                                style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)" }}>
                                <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full pointer-events-none"
                                    style={{ background: "radial-gradient(circle, rgba(56,189,248,0.15), transparent)" }} />
                                <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 relative"
                                    style={{ background: "rgba(56,189,248,0.15)", border: "1px solid rgba(56,189,248,0.3)" }}>
                                    💸
                                </div>
                                <div className="relative min-w-0">
                                    <p className="text-white font-black text-base">Nueva transferencia</p>
                                    <p className="text-[11px] mt-0.5" style={{ color: "rgba(125,211,252,0.6)" }}>
                                        Límite: Q 2,000 por operación · Q 10,000 diarios
                                    </p>
                                </div>
                            </div>

                            <div className="p-5 sm:p-8 space-y-6 sm:space-y-7">

                                {/* Origen + Destino */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">

                                    {/* Cuenta origen */}
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                                            Cuenta origen
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base pointer-events-none">💳</span>
                                            <select
                                                name="fromAccount"
                                                value={form.fromAccount}
                                                onChange={handleChange}
                                                className="w-full rounded-xl pl-10 pr-3 py-3 text-sm text-slate-800 bg-white appearance-none cursor-pointer focus:outline-none transition-all"
                                                style={{ border: "1.5px solid #e2e8f0" }}
                                                onFocus={e => e.target.style.borderColor = "#38bdf8"}
                                                onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                                            >
                                                <option value="">Selecciona…</option>
                                                {activeAccounts.map(acc => (
                                                    <option key={acc._id} value={acc._id}>
                                                        {acc.accountNumber} · {getCurrencySymbol(acc.currency)}
                                                        {Number(acc.balance).toLocaleString("es-GT", { minimumFractionDigits: 2 })}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {selectedAccount && (
                                            <p className="text-[11px] text-slate-400 mt-1.5">
                                                Disponible: <span className="font-bold text-slate-600">
                                                    {symbol} {Number(selectedAccount.balance).toLocaleString("es-GT", { minimumFractionDigits: 2 })}
                                                </span>
                                            </p>
                                        )}
                                    </div>

                                    {/* Cuenta destino */}
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                                            Cuenta destino
                                        </label>
                                        <div className="flex items-center rounded-xl overflow-hidden transition-all"
                                            style={{ border: `1.5px solid ${form.toAccount.length > 0 && !toAccountComplete ? "#fbbf24" : "#e2e8f0"}` }}>
                                            <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center border-r border-slate-100 bg-slate-50 text-base">
                                                {prefill.toAccount ? "⭐" : "🏦"}
                                            </div>
                                            <input
                                                type="text"
                                                name="toAccount"
                                                value={form.toAccount}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                                                    setForm(p => ({ ...p, toAccount: val }));
                                                }}
                                                placeholder="0000000000"
                                                maxLength={10}
                                                className="flex-1 min-w-0 px-3 py-3 text-sm text-slate-800 bg-white focus:outline-none font-mono tracking-wider placeholder-slate-300"
                                            />
                                            <div className={`flex-shrink-0 px-3 text-xs font-black tabular-nums ${toAccountComplete ? "text-cyan-500" : "text-slate-300"}`}>
                                                {form.toAccount.length}/10
                                            </div>
                                        </div>
                                        <p className="text-[11px] mt-1.5 text-slate-400">
                                            {form.toAccount.length > 0 && !toAccountComplete
                                                ? <span className="text-amber-500 font-semibold">Faltan {10 - form.toAccount.length} dígitos</span>
                                                : prefill.toAccount
                                                    ? `Cuenta de ${prefill.alias ?? "favorito"}`
                                                    : "Ingresa los 10 dígitos"}
                                        </p>
                                    </div>
                                </div>

                                {/* Aviso conversión */}
                                {willConvert && (
                                    <div className="rounded-xl px-4 py-3 flex items-center gap-2.5"
                                        style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
                                        <span className="text-lg flex-shrink-0">🔄</span>
                                        <p className="text-xs text-amber-700 font-medium">
                                            Se aplicará conversión automática de <strong>{selectedAccount.currency}</strong> → <strong>{toAccount.currency}</strong> al tipo de cambio vigente.
                                        </p>
                                    </div>
                                )}

                                {/* Monto + Descripción side by side */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">

                                    {/* Monto */}
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                                            Monto
                                        </label>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-shrink-0 h-14 px-4 flex flex-col items-center justify-center rounded-xl"
                                                style={{ background: "linear-gradient(135deg,#0f172a,#1e1b4b)", border: "1.5px solid rgba(56,189,248,0.3)" }}>
                                                <span className="text-base font-black font-mono leading-none" style={{ color: "#38bdf8" }}>{symbol}</span>
                                                {selectedAccount && (
                                                    <span className="text-[8px] font-black tracking-wider mt-0.5" style={{ color: "rgba(56,189,248,0.5)" }}>
                                                        {selectedAccount.currency}
                                                    </span>
                                                )}
                                            </div>
                                            <input
                                                type="number"
                                                name="amount"
                                                value={form.amount}
                                                onChange={handleChange}
                                                placeholder="0.00"
                                                min="0.01" max="2000" step="0.01"
                                                className="flex-1 min-w-0 rounded-xl px-4 py-3 text-2xl sm:text-3xl font-black text-slate-900 placeholder-slate-200 focus:outline-none h-14 transition-all"
                                                style={{ border: "1.5px solid #e2e8f0" }}
                                                onFocus={e => e.target.style.borderColor = "#38bdf8"}
                                                onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                                            />
                                        </div>
                                        {amountNum > 0 && (
                                            <div className="mt-2">
                                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full rounded-full transition-all duration-500"
                                                        style={{ width: `${amountPct}%`, background: barColor }} />
                                                </div>
                                                <p className="text-[11px] text-slate-400 mt-1">
                                                    {amountPct.toFixed(0)}% del límite por transferencia
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Descripción */}
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                                            Descripción <span className="text-slate-300 font-normal normal-case">· opcional</span>
                                        </label>
                                        <textarea
                                            name="description"
                                            value={form.description}
                                            onChange={handleChange}
                                            placeholder="Ej. Pago de servicio, préstamo…"
                                            rows={3}
                                            className="w-full rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 focus:outline-none transition-all resize-none"
                                            style={{ border: "1.5px solid #e2e8f0", height: "56px" }}
                                            onFocus={e => e.target.style.borderColor = "#38bdf8"}
                                            onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                                        />
                                    </div>
                                </div>

                                {/* Botón */}
                                <button
                                    onClick={handleSubmit}
                                    disabled={!canSubmit}
                                    className="w-full font-black text-base py-4 rounded-2xl transition-all duration-200"
                                    style={canSubmit ? {
                                        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
                                        color: "#38bdf8",
                                        border: "1px solid rgba(56,189,248,0.4)",
                                        boxShadow: "0 4px 20px rgba(56,189,248,0.15)",
                                        cursor: "pointer",
                                    } : {
                                        background: "#f1f5f9",
                                        color: "#94a3b8",
                                        border: "1px solid #e2e8f0",
                                        cursor: "not-allowed",
                                    }}>
                                    {loadingTransfer ? "Procesando…" : "Continuar con la transferencia →"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ══════════════ RIGHT — info panel ══════════════ */}
                    <div className="space-y-4 sm:space-y-5 min-w-0">

                        {/* Resumen del monto */}
                        {amountNum > 0 && (
                            <div className="rounded-3xl overflow-hidden"
                                style={{
                                    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
                                    border: "1px solid rgba(56,189,248,0.2)",
                                    boxShadow: "0 8px 32px rgba(15,23,42,0.25)",
                                }}>
                                <div className="px-5 sm:px-6 pt-6 pb-4">
                                    <p className="text-[9px] font-black tracking-[0.3em] uppercase mb-4" style={{ color: "#818cf8" }}>
                                        ✦ Resumen
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center gap-2">
                                            <span className="text-xs text-slate-400 flex-shrink-0">Monto a enviar</span>
                                            <span className="text-lg font-black text-white truncate">{symbol} {amountNum.toLocaleString("es-GT", { minimumFractionDigits: 2 })}</span>
                                        </div>
                                        {selectedAccount && (
                                            <div className="flex justify-between items-center gap-2">
                                                <span className="text-xs text-slate-400 flex-shrink-0">Desde</span>
                                                <span className="text-xs font-mono text-slate-300 truncate">{selectedAccount.accountNumber}</span>
                                            </div>
                                        )}
                                        {toAccountComplete && (
                                            <div className="flex justify-between items-center gap-2">
                                                <span className="text-xs text-slate-400 flex-shrink-0">Hacia</span>
                                                <span className="text-xs font-mono text-slate-300 truncate">{form.toAccount}</span>
                                            </div>
                                        )}
                                        <div className="h-px mt-2" style={{ background: "rgba(255,255,255,0.07)" }} />
                                        <div className="flex justify-between items-center gap-2">
                                            <span className="text-xs text-slate-400 flex-shrink-0">Uso del límite</span>
                                            <span className="text-xs font-black" style={{ color: barColor }}>
                                                {amountPct.toFixed(0)}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mx-5 sm:mx-6 mb-5">
                                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full rounded-full transition-all duration-500"
                                            style={{ width: `${amountPct}%`, background: barColor }} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Info cards verticales */}
                        <div className="rounded-3xl overflow-hidden bg-white"
                            style={{ border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                            <div className="px-5 sm:px-6 py-5 border-b border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Información</p>
                            </div>
                            <div className="divide-y divide-slate-50">
                                {[
                                    { icon: "🛡️", title: "Transferencia segura", desc: "Tus movimientos están cifrados de extremo a extremo.", accent: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.15)" },
                                    { icon: "⚡", title: "Tiempo real", desc: "El saldo se actualiza al instante en ambas cuentas.", accent: "rgba(56,189,248,0.08)", border: "rgba(56,189,248,0.15)" },
                                    { icon: "🔁", title: "Conversión automática", desc: "Si las cuentas tienen monedas distintas, aplicamos el tipo de cambio vigente.", accent: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.15)" },
                                ].map((item, i) => (
                                    <div key={i} className="px-5 sm:px-6 py-5 flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                                            style={{ background: item.accent, border: `1px solid ${item.border}` }}>
                                            {item.icon}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-black text-slate-800 mb-0.5">{item.title}</p>
                                            <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Límites breakdown */}
                        <div className="rounded-3xl overflow-hidden bg-white"
                            style={{ border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                            <div className="px-5 sm:px-6 py-5 border-b border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Límites de operación</p>
                            </div>
                            <div className="px-5 sm:px-6 py-5 space-y-4">
                                {[
                                    { label: "Por transferencia", value: "Q 2,000", pct: 100, color: "#818cf8" },
                                    { label: "Diario", value: "Q 10,000", pct: 100, color: "#38bdf8" },
                                ].map((item, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between mb-1.5">
                                            <span className="text-xs text-slate-500">{item.label}</span>
                                            <span className="text-xs font-black text-slate-800">{item.value}</span>
                                        </div>
                                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#f1f5f9" }}>
                                            <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Aviso final */}
                        <div className="rounded-2xl px-4 sm:px-5 py-4 flex items-start gap-3"
                            style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
                            <span className="text-lg flex-shrink-0 mt-0.5">⚠️</span>
                            <p className="text-xs font-semibold leading-relaxed" style={{ color: "#92400e" }}>
                                Las transferencias son procesadas en tiempo real. Verifica bien la cuenta destino antes de confirmar.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};