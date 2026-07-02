import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClientStore } from "../store/useClientStore.js";
import { useAuthStore } from "../../auth/store/useAuthStore.js";
import { EditProfileModal } from "../components/EditProfileModal.jsx";

const StatCard = ({ label, value, sub, icon, accent }) => (
    <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center text-lg flex-shrink-0"
            style={{ background: `Q{accent}15`, color: accent }}
        >
            {icon}
        </div>
        <div className="min-w-0">
            <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-0.5">
                {label}
            </p>
            <p className="text-lg font-extrabold text-gray-900 leading-none truncate">
                {value}
            </p>
            {sub && <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>}
        </div>
    </div>
);

const QuickAction = ({ icon, label, onClick, accent }) => (
    <button
        onClick={onClick}
        className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group"
    >
        <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-transform group-hover:scale-110"
            style={{ background: `${accent}15`, color: accent }}
        >
            {icon}
        </div>
        <span className="text-[11px] font-semibold text-gray-600">{label}</span>
    </button>
);

const AccountCard = ({ account, onClick }) => {
    const isActive = account.status === "ACTIVA";
    const symbol = account.currency === "GTQ" ? "Q" : "$";
    const balance = Number(account.balance).toLocaleString("es-GT", { minimumFractionDigits: 2 });

    return (
        <div
            onClick={() => onClick(account)}
            className="relative overflow-hidden rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
            style={{
                background: "linear-gradient(145deg, #1a1f36 0%, #0f1221 100%)",
                boxShadow: "0 4px 24px rgba(15,18,33,0.18)",
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 32px rgba(99,102,241,0.25)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 24px rgba(15,18,33,0.18)"}
        >
            {/* watermark */}
            <div className="absolute -right-2 -bottom-3 text-7xl font-black select-none pointer-events-none"
                 style={{ color: "rgba(255,255,255,0.04)", lineHeight: 1 }}>
                {symbol}
            </div>

            <div className="flex items-start justify-between mb-5">
                <div className="flex gap-1">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    ))}
                </div>
                <span
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide"
                    style={
                        isActive
                            ? { background: "rgba(74,222,128,0.15)", color: "#4ade80" }
                            : { background: "rgba(248,113,113,0.15)", color: "#f87171" }
                    }
                >
                    {account.status}
                </span>
            </div>

            <p className="text-2xl font-black text-white leading-none mb-1">
                {symbol} {balance}
            </p>
            <p className="text-[10px] font-mono tracking-widest text-white/30 mb-3">
                {account.accountNumber}
            </p>
            <p className="text-[10px] font-semibold text-white/40">
                {account.currency} · {account.accountType ?? "Cuenta de Ahorro"}
            </p>
        </div>
    );
};

const TxRow = ({ tx, myAccountIds }) => {
    const fromId = String(tx.fromAccount?._id ?? tx.fromAccount ?? "");
    const isCredit =
        tx.type === "DEPOSITO" ||
        tx.type === "CREDITO"  ||
        (tx.type === "TRANSFERENCIA" && !myAccountIds.includes(fromId));

    const amount = isCredit
        ? Number(tx.amountReceived ?? tx.amount ?? 0)
        : Number(tx.amountSent    ?? tx.amount ?? 0);

    const symbol = (isCredit ? tx.currencyTo : tx.currencyFrom) === "GTQ" ? "Q" : "$";

    return (
        <div className="flex items-center gap-3 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50/60 -mx-5 px-5 rounded-xl transition-colors">
            <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0 font-bold"
                style={
                    isCredit
                        ? { background: "#dcfce7", color: "#16a34a" }
                        : { background: "#fee2e2", color: "#dc2626" }
                }
            >
                {isCredit ? "↓" : "↑"}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                    {tx.description ?? tx.type}
                </p>
                <p className="text-[10px] text-gray-400">
                    {new Date(tx.createdAt).toLocaleDateString("es-GT", {
                        day: "2-digit", month: "short", year: "numeric"
                    })}
                </p>
            </div>
            <p className={`text-sm font-extrabold flex-shrink-0 ${isCredit ? "text-green-600" : "text-red-500"}`}>
                {isCredit ? "+" : "-"}{symbol}{amount.toLocaleString("es-GT", { minimumFractionDigits: 2 })}
            </p>
        </div>
    );
};

export const ClientHomePage = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { accounts, transactions, loading, fetchMyAccounts, fetchMyTransactions } = useClientStore();
    const [editOpen, setEditOpen] = useState(false);
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        fetchMyAccounts();
        fetchMyTransactions(1);
        const h = new Date().getHours();
        setGreeting(h < 12 ? "Buenos días" : h < 19 ? "Buenas tardes" : "Buenas noches");
    }, []);

    const totalGTQ = accounts.filter(a => a.currency === "GTQ" && a.status === "ACTIVA")
        .reduce((s, a) => s + Number(a.balance), 0);
    const totalUSD = accounts.filter(a => a.currency === "USD" && a.status === "ACTIVA")
        .reduce((s, a) => s + Number(a.balance), 0);
    const recentTx = transactions.slice(0, 5);

    return (
        <>
            <div className="max-w-5xl mx-auto space-y-6">

                {/* ── Header ─── */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                        <p className="text-xs font-bold tracking-[0.18em] uppercase text-indigo-500 mb-1">
                            {greeting}
                        </p>
                        <h1 className="text-3xl font-black text-gray-900">
                            {user?.Name
                                ? <>Hola, {user?.Name.split(" ")[0]}{" "}<span className="text-gray-500">{user.Name.split(" ").slice(1).join(" ")}</span></>
                                : "Bienvenido"
                            }
                        </h1>
                        <p className="text-sm text-gray-400 mt-1">
                            Aquí tienes un resumen de tu situación financiera.
                        </p>
                    </div>

                    <button
                        onClick={() => setEditOpen(true)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 shadow-sm transition-all whitespace-nowrap"
                    >
                        ✏️ Editar perfil
                    </button>
                </div>

                {/* ── Balance Hero ── */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-7">
                        <div>
                            <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-2">
                                Balance total · Cuentas activas
                            </p>
                            <div className="flex items-end gap-3 flex-wrap">
                                <p className="text-4xl font-black text-gray-900 leading-none">
                                    Q {totalGTQ.toLocaleString("es-GT", { minimumFractionDigits: 2 })}
                                </p>
                                {totalUSD > 0 && (
                                    <p className="text-base font-bold text-gray-400 mb-0.5">
                                        + $ {totalUSD.toLocaleString("es-GT", { minimumFractionDigits: 2 })} USD
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3 flex-wrap">
                            <QuickAction icon="↗️" label="Transferir"   onClick={() => navigate("/dashboard/client/transfer")}     accent="#6366f1" />
                            <QuickAction icon="📋" label="Movimientos"  onClick={() => navigate("/dashboard/client/transactions")} accent="#3b82f6" />
                            <QuickAction icon="⭐" label="Favoritos"    onClick={() => navigate("/dashboard/client/favorites")}    accent="#f59e0b" />
                            <QuickAction icon="🏦" label="Productos"    onClick={() => navigate("/dashboard/client/products")}     accent="#10b981" />
                        </div>
                    </div>
                    <div className="h-1" style={{ background: "linear-gradient(90deg, #6366f1, #3b82f6, #10b981, #f59e0b)" }} />
                </div>

                {/* ── Stat Cards ───*/}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <StatCard label="Cuentas activas" value={accounts.filter(a => a.status === "ACTIVA").length} icon="💳" accent="#6366f1" />
                    <StatCard label="Total en GTQ"    value={`Q ${totalGTQ.toLocaleString("es-GT", { minimumFractionDigits: 2 })}`}  icon="🇬🇹" accent="#22c55e" />
                    <StatCard label="Total en USD"    value={`$ ${totalUSD.toLocaleString("es-GT", { minimumFractionDigits: 2 })}`}  icon="🇺🇸" accent="#3b82f6" />
                    <StatCard label="Movimientos"     value={transactions.length} sub="últimos registrados" icon="📋" accent="#f59e0b" />
                </div>

                {/* ── Accounts + Transactions ── */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                    {/* Accounts */}
                    <div className="lg:col-span-3">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xs font-extrabold text-gray-500 tracking-[0.15em] uppercase">
                                Mis cuentas
                            </h2>
                            <button onClick={() => navigate("/dashboard/client/accounts")}
                                    className="text-xs font-semibold text-indigo-500 hover:text-indigo-700 transition-colors">
                                Ver todas →
                            </button>
                        </div>

                        {loading ? (
                            <div className="text-center py-10 text-sm text-gray-400">Cargando cuentas…</div>
                        ) : accounts.length === 0 ? (
                            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-10 text-center">
                                <p className="text-3xl mb-2">🏦</p>
                                <p className="text-sm text-gray-400">Aún no tienes cuentas asociadas.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {accounts.slice(0, 4).map(acc => (
                                    <AccountCard
                                        key={acc._id}
                                        account={acc}
                                        onClick={() => navigate("/dashboard/client/accounts")}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Transactions */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xs font-extrabold text-gray-500 tracking-[0.15em] uppercase">
                                Movimientos recientes
                            </h2>
                            <button onClick={() => navigate("/dashboard/client/transactions")}
                                    className="text-xs font-semibold text-indigo-500 hover:text-indigo-700 transition-colors">
                                Ver todos →
                            </button>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-2 h-full">
                            {loading ? (
                                <p className="text-center text-sm text-gray-400 py-6">Cargando movimientos…</p>
                            ) : recentTx.length === 0 ? (
                                <p className="text-center text-sm text-gray-400 py-6">Sin movimientos recientes.</p>
                            ) : (
                                recentTx.map((tx, i) => (
                                    <TxRow key={tx._id ?? i} tx={tx} myAccountIds={accounts.map(a => String(a._id))} />
                                ))
                            )}
                        </div>
                    </div>

                </div>

                <div className="h-2" />
            </div>

            {editOpen && <EditProfileModal onClose={() => setEditOpen(false)} />}
        </>
    );
};