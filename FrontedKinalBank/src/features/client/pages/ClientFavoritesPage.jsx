import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavoritesStore } from "../store/useFavoritesStore.js";
import { useClientStore } from "../store/useClientStore.js";
import { AddFavoriteModal } from "../components/AddFavoriteModal.jsx";
import { EditFavoriteModal } from "../components/EditFavoriteModal.jsx";

const CURRENCY_SYMBOLS = { GTQ: "Q", USD: "$", EUR: "€", GBP: "£", MXN: "MX$" };

const Badge = ({ children, color = "indigo" }) => {
  const colors = {
    indigo: "bg-indigo-100 text-indigo-700",
    emerald: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    slate: "bg-slate-100 text-slate-600",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors[color]}`}>
      {children}
    </span>
  );
};

const ActivityItem = ({ alias, amount, date, positive }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0 gap-2">
    <div className="flex items-center gap-3 min-w-0">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-base">⭐</div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[#16213E] truncate">{alias}</p>
        <p className="text-xs text-slate-400">{date}</p>
      </div>
    </div>
    <span className={`text-sm font-bold flex-shrink-0 ${positive ? "text-emerald-500" : "text-red-500"}`}>
      {positive ? "+" : "-"}Q{amount}
    </span>
  </div>
);

const TipCard = ({ icon, title, desc }) => (
  <div className="flex items-start gap-3 rounded-2xl bg-indigo-50 p-4">
    <span className="text-xl flex-shrink-0">{icon}</span>
    <div>
      <p className="text-sm font-bold text-[#16213E]">{title}</p>
      <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const FavoriteCard = ({ favorite, onEdit, onDelete, onTransfer, deleting }) => (
  <div className="group relative rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
    <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div className="flex items-center gap-4 min-w-0">
        <div className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#16213E] to-indigo-600 text-white shadow-sm">
          <span className="text-lg font-extrabold">{favorite.alias?.charAt(0).toUpperCase()}</span>
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-[10px] text-white ring-2 ring-white">✓</span>
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-bold text-[#16213E] truncate">{favorite.alias}</h3>
          <p className="mt-0.5 font-mono text-xs tracking-wider text-slate-400 truncate">{favorite.accountNumber}</p>
          <div className="mt-1.5"><Badge color="emerald">Verificado</Badge></div>
        </div>
      </div>
      
      <div className="flex sm:flex-col md:flex-row gap-2 self-end sm:self-start opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200">
        <button onClick={() => onEdit(favorite)} className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-500 transition hover:bg-amber-100" title="Editar">✏️</button>
        <button onClick={() => onDelete(favorite._id)} disabled={deleting === favorite._id} className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-100 disabled:opacity-50" title="Eliminar">
          {deleting === favorite._id ? "..." : "✕"}
        </button>
      </div>
    </div>

    <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-3 text-center">
      <div>
        <p className="text-xs text-slate-400">Banco</p>
        <p className="mt-0.5 text-xs font-bold text-[#16213E]">KinalBank</p>
      </div>
      <div className="border-l border-slate-200">
        <p className="text-xs text-slate-400">Tipo</p>
        <p className="mt-0.5 text-xs font-bold text-indigo-600">Monetaria</p>
      </div>
    </div>

    <div className="my-4 border-t border-slate-100" />
    
    <button onClick={() => onTransfer(favorite)} className="w-full rounded-2xl bg-gradient-to-r from-[#16213E] to-indigo-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-indigo-200 hover:shadow-lg">
      Transferir
    </button>
  </div>
);

export const ClientFavoritesPage = () => {
  const navigate = useNavigate();
  const { favorites, loading, error, successMessage, fetchFavorites, deleteFavorite, clearMessages } = useFavoritesStore();
  const { accounts, fetchMyAccounts } = useClientStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchFavorites();
    fetchMyAccounts();
    return () => clearMessages();
  }, []);

  const monedasDelUsuario = [...new Set(accounts.map(a => a.currency))];
  const limiteDiarioDisplay = monedasDelUsuario.length > 0
    ? monedasDelUsuario.map(cur => `${CURRENCY_SYMBOLS[cur] ?? cur}10,000`).join(" / ")
    : "Q10,000";

  const handleDelete = async (id) => {
    setDeleting(id);
    await deleteFavorite(id);
    setDeleting(null);
  };

  const handleTransfer = (favorite) => {
    navigate("/dashboard/client/transfer", {
      state: { toAccount: favorite.accountNumber, alias: favorite.alias },
    });
  };

  const filtered = favorites.filter(
    (f) => f.alias.toLowerCase().includes(search.toLowerCase()) || f.accountNumber.includes(search)
  );

  const recentActivity = favorites.slice(0, 3).map((f, i) => ({
    alias: f.alias,
    amount: (150 + i * 75).toFixed(2),
    date: ["Hoy, 10:32 AM", "Ayer, 3:15 PM", "Lun, 8:00 AM"][i] || "—",
    positive: i % 2 === 0,
  }));

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
        
        {/* ── Hero Panel ── */}
        <div
          className="relative overflow-hidden rounded-3xl border p-6 sm:p-8 lg:p-10 shadow-xl"
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #312e81 100%)",
            borderColor: "rgba(255,255,255,0.05)",
          }}
        >
          {/* Background Decorators */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)" }} />
          <div className="absolute -bottom-16 left-32 w-48 h-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)" }} />
          <div className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full" style={{ background: "linear-gradient(180deg,#ffffff,#7dd3fc,#0ea5e9)" }} />
          
          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[60px] sm:text-[72px] lg:text-[90px] font-black leading-none select-none pointer-events-none tracking-tighter hidden sm:block" style={{ color: "rgba(255,255,255,0.02)" }}>
            {favorites.length} FAV
          </span>

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg,#ffffff,#7dd3fc,#0ea5e9)" }} />
                <p className="text-[10px] font-black tracking-[0.3em] uppercase" style={{ color: "#818cf8" }}>KinalBank</p>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                <span className="text-white">Mis</span> <span className="text-38bdf8" style={{ color: "#38bdf8" }}>Favoritos</span>
              </h1>
              <p className="text-slate-400 text-sm">
                {favorites.length} favorito{favorites.length !== 1 ? "s" : ""} · {favorites.length} activo{favorites.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Quick Actions Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex lg:items-center gap-4 w-full lg:w-auto">
              {/* Contador */}
              <div className="rounded-2xl px-5 py-4 relative overflow-hidden flex flex-col justify-center min-w-[140px]" style={{ background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.2)" }}>
                <p className="text-[9px] font-black tracking-[0.2em] uppercase text-cyan-400 mb-1">✦ Total</p>
                <p className="text-3xl font-black text-white tabular-nums leading-none">{favorites.length}</p>
              </div>

              {/* Agregar */}
              <div className="rounded-2xl px-5 py-4 flex flex-col justify-center" style={{ background: "rgba(129,140,248,0.08)", border: "1px solid rgba(129,140,248,0.2)" }}>
                <p className="text-[9px] font-black tracking-[0.2em] uppercase text-indigo-300 mb-2">● Acción rápida</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-4 py-2 text-xs font-bold text-white transition hover:brightness-110 shadow-md active:scale-95"
                >
                  + Agregar
                </button>
              </div>

              {/* Seguridad */}
              <div className="rounded-2xl px-5 py-4 flex flex-col justify-center sm:col-span-1" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <p className="text-[9px] font-black tracking-[0.2em] uppercase text-emerald-400 mb-0.5">● Seguridad</p>
                <p className="text-sm font-bold text-emerald-400">Protegido</p>
                <p className="text-[9px] text-slate-400 truncate">Cifrado Bancario</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total favoritos", value: favorites.length, sub: `${favorites.length} activo${favorites.length !== 1 ? "s" : ""}`, accent: "#6366f1" },
            { label: "Transferencias", value: "Activas", sub: "En operación", accent: "#10b981", valueColor: "#10b981" },
            { label: "Seguridad", value: "SSL", sub: "End-to-End", accent: "#ef4444", valueColor: "#ef4444" },
            { label: "Límite diario", value: limiteDiarioDisplay, sub: "Disponible", accent: "#f59e0b" },
          ].map((s, i) => (
            <div key={i} className="relative overflow-hidden rounded-2xl bg-white p-4 sm:p-5 shadow-sm border border-slate-200">
              <div className="absolute inset-x-0 top-0 h-1" style={{ background: s.accent }} />
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400 truncate">{s.label}</p>
              <h2 className="mt-2 text-xl sm:text-2xl font-black truncate" style={{ color: s.valueColor ?? "#16213E" }}>{s.value}</h2>
              <p className="mt-0.5 text-xs text-slate-400 truncate">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Alertas */}
        {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600 shadow-sm animate-fade-in">{error}</div>}
        {successMessage && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-600 shadow-sm animate-fade-in">{successMessage}</div>}

        {/* ── Main Layout Content ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 sm:gap-8">

          {/* COLUMNA IZQUIERDA: Listado y Buscador */}
          <div className="space-y-5 order-2 lg:order-1">
            {favorites.length > 0 && (
              <div className="relative">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por alias o número de cuenta..."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3.5 pl-11 text-sm text-slate-700 shadow-sm outline-none transition-all focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            )}

            {loading && favorites.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-12 sm:p-20 text-center shadow-sm">
                <p className="text-slate-400 animate-pulse">Cargando favoritos...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 sm:p-16 text-center shadow-sm flex flex-col items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-4xl">⭐</div>
                <h3 className="mt-6 text-xl font-bold text-[#16213E]">No hay registros coincidentes</h3>
                <p className="mt-2 text-sm text-slate-400 max-w-sm">Verifica los datos de búsqueda u organiza una nueva cuenta favorita.</p>
                <button onClick={() => setShowAddModal(true)} className="mt-6 rounded-2xl bg-[#16213E] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-700 active:scale-95">
                  Agregar favorito
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filtered.map((fav) => (
                  <FavoriteCard key={fav._id} favorite={fav} onEdit={setEditTarget} onDelete={handleDelete} onTransfer={handleTransfer} deleting={deleting} />
                ))}
              </div>
            )}

            {favorites.length > 0 && (
              <div className="flex justify-end">
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs text-slate-500 shadow-sm">
                  {filtered.length} de {favorites.length} favoritos
                </div>
              </div>
            )}
          </div>

          {/* COLUMNA DERECHA: Widgets laterales */}
          <div className="space-y-6 order-1 lg:order-2">

            {/* Consejos Rápidos */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
              <h3 className="mb-4 text-sm font-bold text-[#16213E]">💡 Consejos rápidos</h3>
              <div className="space-y-3">
                <TipCard icon="🔒" title="Verifica el número" desc="Siempre confirma el número de cuenta antes de transferir." />
                <TipCard icon="⭐" title="Usa alias descriptivos" desc="Nombra cada favorito para identificarlos fácilmente." />
                <TipCard icon="📲" title="Notificaciones activas" desc="Activa alertas para confirmar cada transferencia." />
              </div>
            </div>

            {/* Estado de Seguridad */}
            <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">🛡️</span>
                <h3 className="text-sm font-bold text-emerald-800">Cuenta protegida</h3>
              </div>
              <p className="text-xs text-emerald-700 leading-relaxed">Tus transferencias están protegidas con cifrado de alto nivel.</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-1.5 flex-1 rounded-full bg-emerald-200/70">
                  <div className="h-1.5 w-full rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs font-bold text-emerald-700">100%</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modales */}
      {showAddModal && <AddFavoriteModal onClose={() => { setShowAddModal(false); clearMessages(); }} />}
      {editTarget && <EditFavoriteModal favorite={editTarget} onClose={() => { setEditTarget(null); clearMessages(); }} />}
    </>
  );
};