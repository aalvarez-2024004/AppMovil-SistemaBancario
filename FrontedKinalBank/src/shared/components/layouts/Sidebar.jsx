import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/useAuthStore.js";

const items = [
    {
        label: "Usuarios",
        desc: "Solicitudes y clientes",
        icon: "👥",
        to: "/dashboard/users",
        color: "from-indigo-500 to-cyan-400"
    },
    {
        label: "Cuentas bancarias",
        desc: "Gestión financiera",
        icon: "🏦",
        to: "/dashboard/accounts",
        color: "from-emerald-500 to-teal-400"
    },
];

export const Sidebar = () => {
    const location = useLocation();
    const user = useAuthStore(state => state.user);

    return (
        <aside className="w-72 h-full bg-[#071126] border-r border-white/5 relative overflow-hidden">

            {/* Glow */}
            <div className="absolute top-[-120px] right-[-100px] w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full" />
            <div className="absolute bottom-[-120px] left-[-100px] w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />

            <div className="relative z-10 h-full flex flex-col p-6">

                {/* Top */}
                <div className="mb-10">

                    <div className="flex items-center gap-4 mb-5">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-xl shadow-indigo-500/30">
                            <span className="text-white text-xl font-black">KB</span>
                        </div>

                        <div>
                            <h1 className="text-white text-lg font-black">KinalBank</h1>
                            <p className="text-slate-400 text-xs tracking-[0.25em] uppercase">
                                Panel Bancario
                            </p>
                        </div>
                    </div>

                    {/* Hero Text Fijo */}
                    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center">
                        <h1 className="text-2xl md:text-3xl font-black text-white mb-2 leading-snug">
                            Con tus ahorros,<br />construyes logros.
                        </h1>
                        <p className="text-slate-400 text-xs md:text-sm">
                            Banca digital segura para Guatemala
                        </p>
                    </div>
                </div>

                {/* Menu */}
                <div className="flex-1">
                    <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-slate-500 mb-4 px-3">
                        Navegación
                    </p>

                    <ul className="flex flex-col gap-3">
                        {items.map(item => {
                            const active = location.pathname === item.to;

                            return (
                                <li key={item.to}>
                                    <Link
                                        to={item.to}
                                        className={`group relative overflow-hidden flex items-center gap-4 px-4 py-4 rounded-3xl transition-all duration-300 border ${
                                            active ? "bg-white/10 border-white/10 shadow-xl" : "border-transparent hover:bg-white/5"
                                        }`}
                                    >
                                        {active && <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-10`} />}

                                        {/* Icon */}
                                        <div className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-lg transition-all ${
                                            active ? `bg-gradient-to-br ${item.color} text-white` : "bg-white/5 text-slate-300 group-hover:bg-white/10"
                                        }`}>
                                            {item.icon}
                                        </div>

                                        {/* Text */}
                                        <div className="relative z-10 flex flex-col flex-1">
                                            <span className={`font-bold text-sm ${active ? "text-white" : "text-slate-300"}`}>
                                                {item.label}
                                            </span>
                                            <span className="text-xs text-slate-500 mt-1">
                                                {item.desc}
                                            </span>
                                        </div>

                                        {/* Active bar */}
                                        {active && (
                                            <div className={`relative z-10 w-2 h-10 rounded-full bg-gradient-to-b ${item.color}`} />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Bottom */}
                <div className="pt-6">
                    <div className="rounded-3xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 border border-indigo-400/10 p-5 backdrop-blur-md">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-white font-bold text-sm">Estado del sistema</p>
                                <p className="text-slate-400 text-xs mt-1">
                                    Todos los servicios activos
                                </p>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                                <span className="text-emerald-400 text-xl">✓</span>
                            </div>
                        </div>

                        <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                            <div className="w-[92%] h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full" />
                        </div>

                        <div className="flex items-center justify-between mt-3 text-xs">
                            <span className="text-slate-500">Rendimiento</span>
                            <span className="text-emerald-400 font-bold">92%</span>
                        </div>
                    </div>
                </div>

            </div>
        </aside>
    );
};