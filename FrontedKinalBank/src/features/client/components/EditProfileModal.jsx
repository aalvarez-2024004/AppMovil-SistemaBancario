import { useState } from "react";
import { useAuthStore } from "../../auth/store/useAuthStore.js";

export const EditProfileModal = ({ onClose }) => {
    const { user, updateProfile, loading } = useAuthStore();

    const [form, setForm] = useState({
        name: user?.name || "",
        Address: user?.Address || "",
        Job: user?.Job || "",
        MonthlyIncome: user?.MonthlyIncome || "",
    });

    const [success, setSuccess] = useState(false);
    const [error, setError]     = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setError(null);
        const result = await updateProfile(form);
        if (result.success) {
            setSuccess(true);
            setTimeout(onClose, 1200);
        } else {
            setError("No se pudo actualizar el perfil.");
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl overflow-hidden border border-gray-100 shadow-2xl bg-white">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-lg">
                            ✏️
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-gray-900">Editar perfil</h2>
                            <p className="text-xs text-gray-400">Solo puedes editar estos campos</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-4">

                    {/* Campos no editables */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">
                            <p className="text-[11px] text-gray-400 mb-1">Usuario</p>
                            <p className="text-sm font-semibold text-gray-500">
                                @{user?.username}
                            </p>
                        </div>
                        <div className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">
                            <p className="text-[11px] text-gray-400 mb-1">Correo</p>
                            <p className="text-sm font-semibold text-gray-500 truncate">
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
                        Campos editables
                    </p>

                    {/* Nombre */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                            Nombre completo
                        </label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                            placeholder="Tu nombre completo"
                        />
                    </div>

                    {/* Dirección */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                            Dirección
                        </label>
                        <input
                            name="Address"
                            value={form.Address}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                            placeholder="Tu dirección"
                        />
                    </div>

                    {/* Trabajo */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                            Empleo
                        </label>
                        <input
                            name="Job"
                            value={form.Job}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                            placeholder="Tu trabajo actual"
                        />
                    </div>

                    {/* Ingreso mensual */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                            Ingreso mensual (Q)
                        </label>
                        <input
                            name="MonthlyIncome"
                            type="number"
                            min="100"
                            value={form.MonthlyIncome}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                            placeholder="0.00"
                        />
                    </div>

                    {/* Feedback */}
                    {error && (
                        <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-red-600 text-sm">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-emerald-600 text-sm font-medium">
                            ✓ Perfil actualizado correctamente
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading || success}
                        className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 transition-colors"
                    >
                        {loading ? "Guardando..." : "Guardar cambios"}
                    </button>
                </div>

            </div>
        </div>
    );
};