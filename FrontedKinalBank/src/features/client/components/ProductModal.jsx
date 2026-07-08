import { useEffect, useState } from "react";
import { useProductsStore } from "../store/useProductsStore.js";
import { useClientStore } from "../store/useClientStore.js";

const CURRENCY_SYMBOLS = {
    GTQ: "Q", USD: "$", EUR: "€", GBP: "£", MXN: "MX$",
    CAD: "C$", JPY: "¥", CHF: "Fr", BRL: "R$", COP: "COL$",
};

const TYPE_CONFIG = {
    PRODUCTO: { icon: "📦", label: "Producto", gradient: "from-indigo-500 to-blue-500", color: "indigo" },
    SERVICIO: { icon: "⚡", label: "Servicio", gradient: "from-amber-500 to-orange-500", color: "orange" },
};

export const ProductModal = ({ product, onClose }) => {
    const { buyProduct, loading, error, successMessage } = useProductsStore();
    const { accounts, fetchMyAccounts } = useClientStore();

    const [step, setStep] = useState("detail"); // "detail" | "purchase" | "success"
    const [selectedAccount, setSelectedAccount] = useState("");
    const [purchaseError, setPurchaseError] = useState(null);

    const config = TYPE_CONFIG[product?.type] ?? { icon: "🏦", label: product?.type, gradient: "from-slate-500 to-slate-700", color: "slate" };
    const activeAccounts = accounts.filter(a => a.status === "ACTIVA");
    const chosenAccount = accounts.find(a => a._id === selectedAccount);
    const symbol = CURRENCY_SYMBOLS[chosenAccount?.currency] ?? "Q";
    const hasEnough = chosenAccount ? Number(chosenAccount.balance) >= Number(product?.price ?? 0) : false;

    useEffect(() => {
        const handleEscape = (e) => { if (e.key === "Escape") handleClose(); };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, []);

    useEffect(() => {
        if (product) {
            fetchMyAccounts();
            setStep("detail");
            setSelectedAccount("");
            setPurchaseError(null);
        }
    }, [product]);

    const handleClose = () => {
        setStep("detail");
        setSelectedAccount("");
        setPurchaseError(null);
        onClose();
    };

    const handlePurchase = async () => {
        if (!selectedAccount) return;
        setPurchaseError(null);
        const result = await buyProduct(product._id, selectedAccount);
        if (result.success) {
            setStep("success");
        } else {
            setPurchaseError(result.message);
        }
    };

    if (!product) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="absolute inset-0" onClick={handleClose} />

            <div className="relative w-full max-w-lg rounded-[28px] bg-white shadow-2xl overflow-hidden">

                {/* Header */}
                <div className={`relative bg-gradient-to-br from-[#071126] to-[#0d1f4a] px-7 py-6 overflow-hidden`}>
                    <div className="absolute -top-16 -right-16 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}>
                                {config.icon}
                            </div>
                            <div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/10 border border-white/10 text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                                    {config.label}
                                </span>
                                <h2 className="text-xl font-black text-white leading-tight">{product.name}</h2>
                            </div>
                        </div>
                        <button onClick={handleClose} className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition flex items-center justify-center text-sm font-bold flex-shrink-0 cursor-pointer">✕</button>
                    </div>

                    {/* Price badge */}
                    <div className="relative mt-5 inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-2xl px-5 py-2.5">
                        <span className="text-white/50 text-xs font-bold uppercase tracking-widest">Precio</span>
                        <span className="text-2xl font-black text-white tabular-nums">
                            Q {Number(product.price ?? 0).toLocaleString("es-GT", { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>

                {/* Body */}
                {step === "detail" && (
                    <div className="p-6 space-y-5">

                        <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>

                        {/* Benefits */}
                        <div className="space-y-2.5">
                            {[
                                { color: "emerald", text: "Gestión rápida y segura" },
                                { color: "indigo",  text: "Disponible desde cualquier dispositivo" },
                                { color: "orange",  text: "Respaldo y seguridad bancaria" },
                            ].map((b, i) => (
                                <div key={i} className={`flex items-center gap-3 rounded-xl bg-${b.color}-50 border border-${b.color}-100 px-4 py-2.5`}>
                                    <span className={`text-${b.color}-500 font-bold`}>✔</span>
                                    <p className={`text-sm text-${b.color}-700 font-medium`}>{b.text}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3 pt-1">
                            <button onClick={handleClose} className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition font-semibold text-sm cursor-pointer">
                                Cerrar
                            </button>
                            <button
                                onClick={() => setStep("purchase")}
                                className={`flex-1 py-3 rounded-2xl bg-gradient-to-r ${config.gradient} text-white font-bold text-sm shadow-lg hover:scale-[1.02] transition cursor-pointer`}
                            >
                                Solicitar →
                            </button>
                        </div>
                    </div>
                )}

                {step === "purchase" && (
                    <div className="p-6 space-y-5">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Selecciona una cuenta</p>

                            {activeAccounts.length === 0 ? (
                                <div className="rounded-2xl bg-rose-50 border border-rose-100 px-4 py-4 text-sm text-rose-600 font-medium text-center">
                                    No tienes cuentas activas disponibles.
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {activeAccounts.map(acc => {
                                        const sym = CURRENCY_SYMBOLS[acc.currency] ?? "Q";
                                        const bal = Number(acc.balance);
                                        const enough = bal >= Number(product.price ?? 0);
                                        const isSelected = selectedAccount === acc._id;

                                        return (
                                            <button
                                                key={acc._id}
                                                onClick={() => enough && setSelectedAccount(acc._id)}
                                                disabled={!enough}
                                                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                                                    isSelected
                                                        ? "border-indigo-500 bg-indigo-50"
                                                        : enough
                                                            ? "border-slate-100 hover:border-indigo-200 bg-white hover:bg-indigo-50/30"
                                                            : "border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed"
                                                }`}
                                            >
                                                <div>
                                                    <p className="text-sm font-bold text-slate-700 font-mono">{acc.accountNumber}</p>
                                                    <p className="text-xs text-slate-400 mt-0.5">{acc.accountType ?? "Ahorro"} · {acc.currency}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`text-sm font-black tabular-nums ${enough ? "text-slate-800" : "text-rose-400"}`}>
                                                        {sym} {bal.toLocaleString("es-GT", { minimumFractionDigits: 2 })}
                                                    </p>
                                                    {!enough && <p className="text-[10px] text-rose-400 font-bold">Saldo insuficiente</p>}
                                                    {isSelected && <p className="text-[10px] text-indigo-600 font-bold">Seleccionada ✓</p>}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Resumen */}
                        {chosenAccount && (
                            <div className="rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3 flex items-center justify-between">
                                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Se debitará</span>
                                <span className="text-lg font-black text-slate-800">
                                    {symbol} {Number(product.price ?? 0).toLocaleString("es-GT", { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                        )}

                        {purchaseError && (
                            <div className="rounded-xl bg-rose-50 border border-rose-100 px-4 py-3 text-sm text-rose-600 font-medium flex items-center gap-2">
                                <span>⚠️</span> {purchaseError}
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button onClick={() => setStep("detail")} className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition font-semibold text-sm cursor-pointer">
                                ← Volver
                            </button>
                            <button
                                onClick={handlePurchase}
                                disabled={!selectedAccount || loading}
                                className={`flex-1 py-3 rounded-2xl font-bold text-sm transition cursor-pointer ${
                                    selectedAccount && !loading
                                        ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg hover:scale-[1.02]`
                                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                                }`}
                            >
                                {loading ? "Procesando…" : "Confirmar compra"}
                            </button>
                        </div>
                    </div>
                )}

                {step === "success" && (
                    <div className="p-8 flex flex-col items-center text-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-3xl">✅</div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900 mb-1">¡Compra exitosa!</h3>
                            <p className="text-sm text-slate-500">
                                <span className="font-bold text-slate-700">{product.name}</span> fue adquirido correctamente.
                            </p>
                        </div>
                        <div className="w-full rounded-2xl bg-emerald-50 border border-emerald-100 px-5 py-3 flex items-center justify-between">
                            <span className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Monto cobrado</span>
                            <span className="text-lg font-black text-emerald-700">
                                {symbol} {Number(product.price ?? 0).toLocaleString("es-GT", { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                        <button onClick={handleClose} className="w-full py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition cursor-pointer mt-1">
                            Listo
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};