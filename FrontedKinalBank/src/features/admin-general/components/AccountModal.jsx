import { useState, useEffect, useRef } from "react";
import { getApprovedUsers } from "../../../shared/api/users";

const XIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const SearchIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const UserIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const WalletIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2v-5z" />
        <path d="M16 12h5v4h-5a2 2 0 010-4z" />
    </svg>
);

const CurrencyIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M16 8h-6a2 2 0 100 4h4a2 2 0 110 4H8" />
        <path d="M12 18V6" />
    </svg>
);

const BankIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
    </svg>
);

const CreditCardIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
);

const ShieldIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const CheckIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const AlertIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
);

const PlusIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const EditIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

const SparklesIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
    </svg>
);

export const AccountModal = ({ initial, onClose, onSave, loading }) => {
    const isEdit = Boolean(initial?._id);

    const [form, setForm] = useState(
        isEdit
            ? { accountType: initial.accountType, currency: initial.currency, status: initial.status }
            : { accountType: "AHORRO", currency: "GTQ", balance: 0, ownerId: "" }
    );

    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searching, setSearching] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const debounceRef = useRef(null);

    const [err, setErr] = useState("");

    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    useEffect(() => {
        if (isEdit) return;

        if (!search.trim()) {
            setResults([]);
            setShowDropdown(false);
            return;
        }

        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            setSearching(true);
            try {
                const res = await getApprovedUsers(search);
                setResults(res.data.users ?? []);
                setShowDropdown(true);
            } catch {
                setResults([]);
            } finally {
                setSearching(false);
            }
        }, 350);

        return () => clearTimeout(debounceRef.current);
    }, [search]);

    const selectUser = (user) => {
        setSelectedUser(user);
        set("ownerId", user.Id);
        setSearch(`${user.Name} — ${user.DPI}`);
        setShowDropdown(false);
        setResults([]);
    };

    const clearUser = () => {
        setSelectedUser(null);
        set("ownerId", "");
        setSearch("");
    };

    const handleSubmit = async () => {
        if (!isEdit && !form.ownerId) return setErr("Debes seleccionar un propietario.");
        if (!isEdit && form.balance === undefined) return setErr("El saldo es obligatorio.");
        setErr("");
        const result = await onSave(form);
        if (result?.success === false) setErr(result.message);
    };

    return (
        <>
            <style>{`
                @keyframes modalFadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
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
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes pulse-soft {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 1; }
                }
                .animate-modal-fade {
                    animation: modalFadeIn 0.2s ease-out;
                }
                .animate-modal-slide {
                    animation: modalSlideIn 0.3s ease-out;
                }
                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }
            `}</style>

            <div
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-modal-fade"
                onClick={onClose}
            >
                <div
                    className="relative bg-white rounded-[28px] w-full max-w-md shadow-2xl shadow-slate-900/20 overflow-hidden animate-modal-slide"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${isEdit ? "from-amber-500 via-orange-500 to-amber-500" : "from-indigo-500 via-cyan-500 to-indigo-500"}`} />

                    <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 ${isEdit ? "bg-amber-400" : "bg-indigo-400"}`} />
                    <div className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-3xl opacity-10 ${isEdit ? "bg-orange-300" : "bg-cyan-300"}`} />

                    <div className="relative px-7 py-6 border-b border-slate-100/80 bg-gradient-to-r from-slate-50/80 via-white to-slate-50/50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`
                                    relative w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden
                                    ${isEdit
                                        ? "bg-gradient-to-br from-amber-100 via-amber-50 to-white shadow-amber-100/80 ring-1 ring-amber-100"
                                        : "bg-gradient-to-br from-indigo-100 via-indigo-50 to-white shadow-indigo-100/80 ring-1 ring-indigo-100"
                                    }
                                `}>
                                    {isEdit
                                        ? <EditIcon className="w-6 h-6 text-amber-600" />
                                        : <PlusIcon className="w-6 h-6 text-indigo-600" />
                                    }
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-slate-800 tracking-tight">
                                        {isEdit ? "Editar cuenta" : "Nueva cuenta"}
                                    </h2>
                                    <p className="text-sm text-slate-400 mt-0.5">
                                        {isEdit ? "Modifica los datos de la cuenta" : "Crea una cuenta bancaria"}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="group w-10 h-10 rounded-xl bg-slate-100/80 hover:bg-red-50 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all duration-300 hover:scale-110 hover:rotate-90"
                            >
                                <XIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="relative px-7 py-6 space-y-5">
                        <div className="absolute inset-0 opacity-[0.02]" style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
                            backgroundSize: '20px 20px'
                        }} />

                        <div className="relative space-y-5">
                            {!isEdit && (
                                <Field label="Propietario" icon={<UserIcon className="w-4 h-4" />}>
                                    <div className="relative">
                                        <div className="relative flex items-center">
                                            <input
                                                className="w-full px-4 pr-10 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 text-sm outline-none transition-all bg-white hover:border-slate-300 font-medium"
                                                value={search}
                                                onChange={(e) => {
                                                    setSearch(e.target.value);
                                                    if (selectedUser) clearUser();
                                                }}
                                                placeholder="Buscar por nombre o DPI..."
                                                autoComplete="off"
                                            />
                                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                                {searching && (
                                                    <div className="relative w-5 h-5">
                                                        <div className="absolute inset-0 rounded-full border-2 border-slate-200" />
                                                        <div className="absolute inset-0 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                                                    </div>
                                                )}
                                                {selectedUser && !searching && (
                                                    <button
                                                        onClick={clearUser}
                                                        className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-red-100 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all"
                                                        title="Limpiar seleccion"
                                                    >
                                                        <XIcon className="w-3.5 h-3.5" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Dropdown */}
                                        {showDropdown && (
                                            <ul className="absolute z-20 left-0 right-0 top-full mt-2 bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden max-h-52 overflow-y-auto">
                                                {results.length === 0 ? (
                                                    <li className="px-5 py-4 text-center">
                                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-2">
                                                            <UserIcon className="w-5 h-5 text-slate-400" />
                                                        </div>
                                                        <p className="text-sm text-slate-400 font-medium">Sin resultados</p>
                                                    </li>
                                                ) : results.map((u, index) => (
                                                    <li
                                                        key={u.Id}
                                                        onClick={() => selectUser(u)}
                                                        className="group/item px-4 py-3 cursor-pointer hover:bg-gradient-to-r hover:from-indigo-50/80 hover:to-transparent transition-all flex items-center gap-3.5 border-b border-slate-100/80 last:border-0"
                                                        style={{ animationDelay: `${index * 50}ms` }}
                                                    >
                                                        <div className="relative">
                                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white font-bold text-sm flex items-center justify-center shadow-lg shadow-indigo-200/50 group-hover/item:scale-110 transition-transform">
                                                                {u.Name?.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-bold text-slate-800 group-hover/item:text-indigo-900 transition-colors truncate">{u.Name}</p>
                                                            <p className="text-[11px] text-slate-400 font-mono mt-0.5">{u.DPI}</p>
                                                        </div>
                                                        <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                                                            <CheckIcon className="w-3.5 h-3.5 text-indigo-600" />
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    {/* Selected user badge */}
                                    {selectedUser && (
                                        <div className="flex items-center gap-3 mt-3 px-4 py-3 bg-gradient-to-r from-indigo-50 via-indigo-50/80 to-cyan-50/50 border border-indigo-100/80 rounded-xl shadow-sm">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 text-white font-bold text-xs flex items-center justify-center shadow-md shadow-indigo-200/50">
                                                {selectedUser.Name?.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-indigo-800 truncate">{selectedUser.Name}</p>
                                                <p className="text-[10px] text-indigo-400 font-mono">DPI: {selectedUser.DPI}</p>
                                            </div>
                                            <CheckIcon className="w-5 h-5 text-emerald-500" />
                                        </div>
                                    )}
                                </Field>
                            )}

                            {/* Tipo de cuenta */}
                            <Field label="Tipo de cuenta" icon={<WalletIcon className="w-4 h-4" />}>
                                <div className="relative">
                                    <select
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 text-sm outline-none transition-all bg-white hover:border-slate-300 font-medium appearance-none cursor-pointer"
                                        value={form.accountType}
                                        onChange={(e) => set("accountType", e.target.value)}
                                    >
                                        {[
                                            { value: "AHORRO", label: "Cuenta de Ahorro", icon: "piggy" },
                                            { value: "MONETARIA", label: "Cuenta Monetaria", icon: "bank" },
                                            { value: "CREDITO", label: "Cuenta de Credito", icon: "credit" }
                                        ].map((t) => (
                                            <option key={t.value} value={t.value}>{t.label}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </div>
                                </div>
                            </Field>

                            {/* Moneda */}
                            <Field label="Moneda" icon={<CurrencyIcon className="w-4 h-4" />}>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { value: "GTQ", label: "GTQ", symbol: "Q" },
                                        { value: "USD", label: "USD", symbol: "$" },
                                        { value: "EUR", label: "EUR", symbol: "€" }
                                    ].map((c) => (
                                        <button
                                            key={c.value}
                                            type="button"
                                            onClick={() => set("currency", c.value)}
                                            className={`
                                                group relative px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all duration-300 overflow-hidden
                                                ${form.currency === c.value
                                                    ? "border-indigo-400 bg-gradient-to-br from-indigo-50 to-indigo-100/50 text-indigo-700 shadow-lg shadow-indigo-100/50"
                                                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                                                }
                                            `}
                                        >
                                            {/* Selected indicator */}
                                            {form.currency === c.value && (
                                                <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center">
                                                    <CheckIcon className="w-2.5 h-2.5 text-white" />
                                                </div>
                                            )}
                                            <span className="block text-lg mb-0.5">{c.symbol}</span>
                                            <span className="block text-[10px] uppercase tracking-wider opacity-70">{c.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </Field>

                            {/* Saldo inicial */}
                            {!isEdit && (
                                <Field label="Saldo inicial" icon={<CreditCardIcon className="w-4 h-4" />}>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 text-sm outline-none transition-all bg-white hover:border-slate-300 font-bold tabular-nums"
                                            value={form.balance}
                                            onChange={(e) => set("balance", Number(e.target.value))}
                                            placeholder="0.00"
                                        />
                                    </div>
                                </Field>
                            )}

                            {/* Estado */}
                            {isEdit && (
                                <Field label="Estado de la cuenta" icon={<ShieldIcon className="w-4 h-4" />}>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { value: "ACTIVA", label: "Activa", color: "emerald" },
                                            { value: "BLOQUEADA", label: "Bloqueada", color: "red" }
                                        ].map((s) => (
                                            <button
                                                key={s.value}
                                                type="button"
                                                onClick={() => set("status", s.value)}
                                                className={`
                                                    group relative px-4 py-3.5 rounded-xl border-2 text-sm font-bold transition-all duration-300 overflow-hidden flex items-center justify-center gap-2
                                                    ${form.status === s.value
                                                        ? s.color === "emerald"
                                                            ? "border-emerald-400 bg-gradient-to-br from-emerald-50 to-emerald-100/50 text-emerald-700 shadow-lg shadow-emerald-100/50"
                                                            : "border-red-400 bg-gradient-to-br from-red-50 to-red-100/50 text-red-700 shadow-lg shadow-red-100/50"
                                                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                                                    }
                                                `}
                                            >
                                                <div className={`
                                                    w-2.5 h-2.5 rounded-full
                                                    ${form.status === s.value
                                                        ? s.color === "emerald" ? "bg-emerald-500" : "bg-red-500"
                                                        : "bg-slate-300"
                                                    }
                                                `} />
                                                {s.label}
                                                {form.status === s.value && (
                                                    <CheckIcon className={`w-4 h-4 ${s.color === "emerald" ? "text-emerald-500" : "text-red-500"}`} />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </Field>
                            )}

                            {err && (
                                <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-red-50 to-red-100/50 border border-red-200/80 rounded-xl">
                                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                                        <AlertIcon className="w-4 h-4 text-red-500" />
                                    </div>
                                    <p className="text-sm text-red-600 font-medium">{err}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="relative px-7 py-5 border-t border-slate-100/80 bg-gradient-to-r from-slate-50/50 via-white to-slate-50/50">
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="group px-6 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className={`
                                    group relative px-7 py-3 rounded-xl text-white text-sm font-bold shadow-lg transition-all duration-300 overflow-hidden
                                    ${loading
                                        ? "bg-slate-400 cursor-not-allowed"
                                        : isEdit
                                            ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:shadow-amber-500/40 hover:scale-105"
                                            : "bg-gradient-to-r from-indigo-500 to-cyan-500 hover:shadow-indigo-500/40 hover:scale-105"
                                    }
                                `}
                            >
                                {/* Button glow */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

                                {/* Shine sweep */}
                                {!loading && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                )}

                                <span className="relative z-10 flex items-center gap-2">
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                            <span>Guardando...</span>
                                        </>
                                    ) : (
                                        <>
                                            {isEdit ? <CheckIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                                            <span>{isEdit ? "Guardar cambios" : "Crear cuenta"}</span>
                                        </>
                                    )}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

function Field({ label, icon, children }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] flex items-center gap-2">
                {icon && <span className="text-slate-400">{icon}</span>}
                {label}
            </label>
            {children}
        </div>
    );
}