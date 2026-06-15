import { NavLink, Outlet } from "react-router-dom";
import { Navbar } from "../../../shared/components/layouts/Navbar";

export const ClientLayout = () => {

    const principalItems = [
        { to: "/dashboard/client", label: "Inicio", icon: "🏠", end: true },
        { to: "/dashboard/client/accounts", label: "Mis Cuentas", icon: "💳" },
    ];

    const operacionesItems = [
        { to: "/dashboard/client/transactions", label: "Movimientos", icon: "📋" },
        { to: "/dashboard/client/transfer", label: "Transferir", icon: "↗️" },
        { to: "/dashboard/client/favorites", label: "Favoritos", icon: "⭐" },
    ];

    const explorarItems = [
        { to: "/dashboard/client/products", label: "Productos y Servicios", icon: "📦" },
    ];

    return (
        <div className="h-screen w-screen bg-[#f4f7fb] flex flex-col overflow-hidden">

            <Navbar />

            <div className="flex flex-1 overflow-hidden">

                {/* Sidebar */}
                <aside className="w-72 bg-[#071126] relative overflow-hidden flex flex-col flex-shrink-0 border-r border-white/5">

                    {/* Glow */}
                    <div className="absolute top-[-120px] right-[-120px] w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full" />
                    <div className="absolute bottom-[-100px] left-[-100px] w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />

                    <div className="relative z-10 flex flex-col h-full p-6">

                        {/* Navigation */}
                        <nav className="space-y-1">

                            {/* Principal */}
                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.25em] px-3 pt-2 pb-1">
                                Principal
                            </p>

                            {principalItems.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.end}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                                            isActive
                                                ? "bg-white/10 text-white border-l-4 border-indigo-500 pl-2"
                                                : "text-white/60 hover:bg-white/5 hover:text-white"
                                        }`
                                    }
                                >
                                    <span className="text-base leading-none">
                                        {item.icon}
                                    </span>

                                    {item.label}
                                </NavLink>
                            ))}

                            {/* Operaciones */}
                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.25em] px-3 pt-4 pb-1">
                                Operaciones
                            </p>

                            {operacionesItems.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                                            isActive
                                                ? "bg-white/10 text-white border-l-4 border-emerald-500 pl-2"
                                                : "text-white/60 hover:bg-white/5 hover:text-white"
                                        }`
                                    }
                                >
                                    <span className="text-base leading-none">
                                        {item.icon}
                                    </span>

                                    {item.label}
                                </NavLink>
                            ))}

                            {/* Explorar */}
                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.25em] px-3 pt-4 pb-1">
                                Explorar
                            </p>

                            {explorarItems.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                                            isActive
                                                ? "bg-white/10 text-white border-l-4 border-orange-500 pl-2"
                                                : "text-white/60 hover:bg-white/5 hover:text-white"
                                        }`
                                    }
                                >
                                    <span className="text-base leading-none">
                                        {item.icon}
                                    </span>

                                    {item.label}
                                </NavLink>
                            ))}

                        </nav>

                        {/* Footer */}
                        <div className="mt-auto pt-6">
                            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">

                                <p className="text-white font-bold text-sm mb-1">
                                    Con tus ahorros,
                                    <br />
                                    construyes logros.
                                </p>

                                <div className="mt-4 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-xs text-emerald-300">
                                        Bancar Virtual Activa
                                    </span>
                                </div>

                            </div>
                        </div>

                    </div>
                </aside>

                {/* Contenido */}
                <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#f8fafc] to-[#eef4ff] p-8">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};