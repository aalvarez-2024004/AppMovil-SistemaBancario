import { useState, useEffect } from "react";
import { useFavoritesStore } from "../store/useFavoritesStore.js";

export const EditFavoriteModal = ({ favorite, onClose }) => {
  const { updateFavorite, loading, error, successMessage, clearMessages } =
    useFavoritesStore();

  const [form, setForm] = useState({
    alias: favorite.alias,
    accountNumber: favorite.accountNumber,
  });

  useEffect(() => {
    return () => clearMessages();
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.alias.trim() || !form.accountNumber.trim()) return;
    const result = await updateFavorite(favorite._id, form);
    if (result.success) {
      setTimeout(() => onClose(), 800);
    }
  };

  const hasChanges =
    form.alias !== favorite.alias ||
    form.accountNumber !== favorite.accountNumber;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-gray-900">Editar favorito</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Modifica el alias o el número de cuenta
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Formulario */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Alias
            </label>
            <input
              name="alias"
              value={form.alias}
              onChange={handleChange}
              placeholder="Ej. Mi mamá, Trabajo..."
              className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Número de cuenta
            </label>
            <input
              name="accountNumber"
              value={form.accountNumber}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                setForm((prev) => ({ ...prev, accountNumber: val }));
              }}
              placeholder="10 dígitos"
              maxLength={10}
              className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition tracking-wider"
            />
            <p className="text-xs text-gray-400 mt-1">
              {form.accountNumber.length}/10 dígitos
            </p>
          </div>
        </div>

        {/* Feedback */}
        {error && (
          <div className="mt-4 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl px-4 py-3">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="mt-4 bg-green-50 border border-green-100 text-green-600 text-xs rounded-xl px-4 py-3">
            {successMessage}
          </div>
        )}

        {/* Acciones */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 rounded-xl py-2.5 text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={
              loading ||
              !hasChanges ||
              !form.alias.trim() ||
              form.accountNumber.length !== 10
            }
            className="flex-1 bg-indigo-600 text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
          >
            {loading ? "Guardando…" : "Guardar cambios"}
          </button>
        </div>
      </div>
    </div>
  );
};