import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavoritesStore } from "../store/useFavoritesStore.js";
import { AddFavoriteModal } from "../components/AddFavoriteModal.jsx";
import { EditFavoriteModal } from "../components/EditFavoriteModal.jsx";

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
  <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-base">⭐</div>
      <div>
        <p className="text-sm font-semibold text-[#16213E]">{alias}</p>
        <p className="text-xs text-slate-400">{date}</p>
      </div>
    </div>
    <span className={`text-sm font-bold ${positive ? "text-emerald-500" : "text-red-500"}`}>
      {positive ? "+" : "-"}Q{amount}
    </span>
  </div>
);

const TipCard = ({ icon, title, desc }) => (
  <div className="flex items-start gap-3 rounded-2xl bg-indigo-50 p-4">
    <span className="text-xl">{icon}</span>
    <div>
      <p className="text-sm font-bold text-[#16213E]">{title}</p>
      <p className="mt-0.5 text-xs text-slate-500">{desc}</p>
    </div>
  </div>
);

const FavoriteCard = ({ favorite, onEdit, onDelete, onTransfer, deleting }) => (
  <div className="group relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
    <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-4">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#16213E] to-indigo-600 text-white shadow-sm">
          <span className="text-lg font-extrabold">{favorite.alias?.charAt(0).toUpperCase()}</span>
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-[10px] text-white ring-2 ring-white">✓</span>
        </div>
        <div>
          <h3 className="text-base font-bold text-[#16213E]">{favorite.alias}</h3>
          <p className="mt-0.5 font-mono text-xs tracking-wider text-slate-400">{favorite.accountNumber}</p>
          <div className="mt-1.5"><Badge color="emerald">Verificado</Badge></div>
        </div>
      </div>
      <div className="flex gap-2 opacity-0 transition-all group-hover:opacity-100">
        <button onClick={() => onEdit(favorite)} className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-500 transition hover:bg-amber-100" title="Editar">✏️</button>
        <button onClick={() => onDelete(favorite._id)} disabled={deleting === favorite._id} className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-100 disabled:opacity-50" title="Eliminar">
          {deleting === favorite._id ? "..." : "✕"}
        </button>
      </div>
    </div>
    <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-3">
      <div className="text-center">
        <p className="text-xs text-slate-400">Banco</p>
        <p className="mt-0.5 text-xs font-bold text-[#16213E]">KinalBank</p>
      </div>
      <div className="text-center border-l border-slate-200">
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

  const [showAddModal, setShowAddModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchFavorites();
    return () => clearMessages();
  }, []);

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
            {favorites.length} FAV
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
                <span style={{ color: "#38bdf8" }}>Favoritos</span>
              </h1>
              <p className="text-slate-400 text-sm">
                {favorites.length} favorito{favorites.length !== 1 ? "s" : ""} · {favorites.length} activo{favorites.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex items-center gap-4 flex-wrap flex-shrink-0">
              {/* Contador */}
              <div className="rounded-2xl px-7 py-5 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(56,189,248,0.2) 0%, rgba(14,165,233,0.1) 100%)",
                  border: "1px solid rgba(56,189,248,0.4)",
                  boxShadow: "0 0 32px rgba(56,189,248,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}>
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(56,189,248,0.3), transparent)" }} />
                <p className="text-[9px] font-black tracking-[0.3em] uppercase mb-2 relative" style={{ color: "#7dd3fc" }}>✦ Tus favoritos</p>
                <p className="text-5xl font-black tabular-nums relative leading-none" style={{ color: "#ffffff" }}>{favorites.length}</p>
                <div className="mt-3 flex items-center gap-1.5 relative">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{ boxShadow: "0 0 6px #38bdf8" }} />
                  <p className="text-[11px] font-bold" style={{ color: "#7dd3fc" }}>Cuentas favoritas</p>
                </div>
              </div>

              {/* Agregar */}
              <div className="rounded-2xl px-6 py-4 flex-shrink-0"
                style={{ background: "rgba(129,140,248,0.12)", border: "1px solid rgba(129,140,248,0.3)" }}>
                <p className="text-[9px] font-black tracking-[0.3em] uppercase mb-2" style={{ color: "#a5b4fc" }}>● Acción rápida</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="rounded-xl px-4 py-2 text-xs font-black text-white transition"
                  style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)", boxShadow: "0 4px 12px rgba(99,102,241,0.4)" }}>
                  + Agregar favorito
                </button>
              </div>

              {/* Seguridad */}
              <div className="rounded-2xl px-6 py-4 flex-shrink-0"
                style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)" }}>
                <p className="text-[9px] font-black tracking-[0.3em] uppercase mb-1" style={{ color: "#6ee7b7" }}>● Seguridad</p>
                <p className="text-base font-black" style={{ color: "#34d399" }}>Protegido</p>
                <p className="text-[10px] mt-0.5" style={{ color: "rgba(110,231,183,0.5)" }}>Cifrado extremo a extremo</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-4 gap-5">
          {[
            { label: "Total favoritos", value: favorites.length, sub: `${favorites.length} activo${favorites.length !== 1 ? "s" : ""}`, accent: "#6366f1" },
            { label: "Transferencias rápidas", value: "Activas", sub: "En operación", accent: "#10b981", valueColor: "#10b981" },
            { label: "Seguridad", value: "Protegido", sub: "Cifrado de extremo a extremo", accent: "#f87171", valueColor: "#ef4444" },
            { label: "Límite diario", value: "Q10,000", sub: "Disponible hoy", accent: "#f59e0b" },
          ].map((s, i) => (
            <div key={i} className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm"
              style={{ border: "1px solid #e2e8f0" }}>
              <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl" style={{ background: s.accent }} />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{s.label}</p>
              <h2 className="mt-3 text-3xl font-black" style={{ color: s.valueColor ?? "#16213E" }}>{s.value}</h2>
              <p className="mt-1 text-xs text-slate-400">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Alertas */}
        {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600 shadow-sm">{error}</div>}
        {successMessage && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-600 shadow-sm">{successMessage}</div>}

        {/* ── Two-column body ── */}
        <div className="grid gap-8" style={{ gridTemplateColumns: "1fr 340px" }}>

          {/* LEFT */}
          <div className="space-y-5">
            {favorites.length > 0 && (
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
                <input value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por alias o número de cuenta..."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 pl-11 text-sm text-slate-700 shadow-sm outline-none transition-all focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100" />
              </div>
            )}

            {loading && favorites.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-20 text-center shadow-sm">
                <p className="text-slate-400">Cargando favoritos...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-20 text-center shadow-sm">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-indigo-50 text-5xl">⭐</div>
                <h3 className="mt-6 text-2xl font-bold text-[#16213E]">No tienes favoritos todavía</h3>
                <p className="mt-2 text-slate-400">Guarda cuentas frecuentes para transferir rápidamente.</p>
                <button onClick={() => setShowAddModal(true)}
                  className="mt-8 rounded-2xl bg-[#16213E] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-700">
                  Agregar favorito
                </button>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">
                {filtered.map((fav) => (
                  <FavoriteCard key={fav._id} favorite={fav} onEdit={setEditTarget} onDelete={handleDelete} onTransfer={handleTransfer} deleting={deleting} />
                ))}
              </div>
            )}

            {favorites.length > 0 && (
              <div className="flex justify-end">
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 shadow-sm">
                  {filtered.length} favorito{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#16213E]">Actividad reciente</h3>
                <Badge color="indigo">Últimos 7 días</Badge>
              </div>
              {recentActivity.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">Sin actividad reciente.</p>
              ) : (
                recentActivity.map((a, i) => <ActivityItem key={i} {...a} />)
              )}
              <button className="mt-4 w-full rounded-xl bg-slate-50 py-2.5 text-xs font-semibold text-slate-500 hover:bg-slate-100 transition">
                Ver todos los movimientos →
              </button>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-sm font-bold text-[#16213E]">💡 Consejos rápidos</h3>
              <div className="space-y-3">
                <TipCard icon="🔒" title="Verifica el número" desc="Siempre confirma el número de cuenta antes de transferir." />
                <TipCard icon="⭐" title="Usa alias descriptivos" desc="Nombra cada favorito para identificarlos fácilmente." />
                <TipCard icon="📲" title="Notificaciones activas" desc="Activa alertas para confirmar cada transferencia." />
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🛡️</span>
                <h3 className="text-sm font-bold text-emerald-800">Cuenta protegida</h3>
              </div>
              <p className="text-xs text-emerald-700">Tus transferencias están protegidas con cifrado bancario.</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-2 flex-1 rounded-full bg-emerald-200">
                  <div className="h-2 w-full rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs font-bold text-emerald-700">100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddModal && <AddFavoriteModal onClose={() => { setShowAddModal(false); clearMessages(); }} />}
      {editTarget && <EditFavoriteModal favorite={editTarget} onClose={() => { setEditTarget(null); clearMessages(); }} />}
    </>
  );
};