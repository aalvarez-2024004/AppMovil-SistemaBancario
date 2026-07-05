import { useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { Navbar } from "../../../shared/components/layouts/Navbar.jsx"

const MenuIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

const CloseIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

export const AdminGeneralLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="h-screen w-screen bg-[#f4f7fb] flex flex-col overflow-hidden">

            <div className="relative">
                <Navbar />
                {/* Botón hamburguesa, solo visible en móvil/tablet */}
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden absolute top-1/2 -translate-y-1/2 left-4 w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white z-20"
                >
                    <MenuIcon className="w-5 h-5" />
                </button>
            </div>

            <div className="flex flex-1 overflow-hidden relative">

                {/* Overlay oscuro cuando el sidebar está abierto en móvil */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={`
                        fixed lg:static inset-y-0 left-0 z-40
                        w-72 bg-[#071126] relative overflow-hidden flex flex-col flex-shrink-0 border-r border-white/5
                        transform transition-transform duration-300 ease-in-out
                        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
                    `}
                >

                    {/* Botón cerrar, solo en móvil */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-slate-300"
                    >
                        <CloseIcon className="w-5 h-5" />
                    </button>

                    {/* Glows */}
                    <div className="absolute top-[-120px] right-[-120px] w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full" />
                    <div className="absolute bottom-[-100px] left-[-100px] w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />

                    <div className="relative z-10 flex flex-col h-full p-6 overflow-y-auto" onClick={() => setSidebarOpen(false)}>

                        {/* Navigation */}
                        <nav className="flex flex-col gap-7">

                            {/* Usuarios */}
                            <div>
                                <p className="text-[10px] font-semibold text-slate-500/60 uppercase tracking-[0.22em] px-3 mb-3 flex items-center gap-2 after:content-[''] after:flex-1 after:h-px after:bg-gradient-to-r after:from-slate-500/20 after:to-transparent">
                                    Usuarios
                                </p>

                                <div className="space-y-1.5">
                                    <NavLink
                                        to="/dashboard/users"
                                        className={({ isActive }) =>
                                            `group relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl transition-all duration-300 ${
                                                isActive
                                                    ? "bg-gradient-to-r from-indigo-500/20 to-cyan-500/10 border border-indigo-400/20 shadow-lg shadow-indigo-500/10"
                                                    : "hover:bg-white/5 border border-transparent"
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-base transition-all duration-300 ${
                                                    isActive
                                                        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                                                        : "bg-white/5 text-slate-300 group-hover:bg-white/10"
                                                }`}>
                                                    👥
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className={`text-[13px] font-semibold ${
                                                        isActive ? "text-white" : "text-slate-300/85"
                                                    }`}>
                                                        Solicitudes
                                                    </span>

                                                    <span className="text-[11px] text-slate-500/70">
                                                        Usuarios pendientes
                                                    </span>
                                                </div>

                                                {isActive && (
                                                    <div className="ml-auto w-[3px] h-8 rounded-full bg-gradient-to-b from-indigo-400 to-cyan-400" />
                                                )}
                                            </>
                                        )}
                                    </NavLink>
                                </div>
                            </div>

                            {/* Finanzas */}
                            <div>
                                <p className="text-[10px] font-semibold text-slate-500/60 uppercase tracking-[0.22em] px-3 mb-3 flex items-center gap-2 after:content-[''] after:flex-1 after:h-px after:bg-gradient-to-r after:from-slate-500/20 after:to-transparent">
                                    Finanzas
                                </p>

                                <div className="space-y-1.5">

                                    <NavLink
                                        to="/dashboard/accounts"
                                        className={({ isActive }) =>
                                            `group relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl transition-all duration-300 ${
                                                isActive
                                                    ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-400/20 shadow-lg shadow-emerald-500/10"
                                                    : "hover:bg-white/5 border border-transparent"
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-base transition-all duration-300 ${
                                                    isActive
                                                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                                                        : "bg-white/5 text-slate-300 group-hover:bg-white/10"
                                                }`}>
                                                    🏦
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className={`text-[13px] font-semibold ${
                                                        isActive ? "text-white" : "text-slate-300/85"
                                                    }`}>
                                                        Cuentas
                                                    </span>

                                                    <span className="text-[11px] text-slate-500/70">
                                                        Gestión bancaria
                                                    </span>
                                                </div>

                                                {isActive && (
                                                    <div className="ml-auto w-[3px] h-8 rounded-full bg-gradient-to-b from-emerald-400 to-teal-400" />
                                                )}
                                            </>
                                        )}
                                    </NavLink>

                                    <NavLink
                                        to="/dashboard/transactions"
                                        className={({ isActive }) =>
                                            `group relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl transition-all duration-300 ${
                                                isActive
                                                    ? "bg-gradient-to-r from-cyan-500/20 to-indigo-500/10 border border-cyan-400/20 shadow-lg shadow-cyan-500/10"
                                                    : "hover:bg-white/5 border border-transparent"
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-base transition-all duration-300 ${
                                                    isActive
                                                        ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                                                        : "bg-white/5 text-slate-300 group-hover:bg-white/10"
                                                }`}>
                                                    📊
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className={`text-[13px] font-semibold ${
                                                        isActive ? "text-white" : "text-slate-300/85"
                                                    }`}>
                                                        Transacciones
                                                    </span>

                                                    <span className="text-[11px] text-slate-500/70">
                                                        Actividad de cuentas
                                                    </span>
                                                </div>

                                                {isActive && (
                                                    <div className="ml-auto w-[3px] h-8 rounded-full bg-gradient-to-b from-cyan-400 to-indigo-400" />
                                                )}
                                            </>
                                        )}
                                    </NavLink>

                                    <NavLink
                                        to="/dashboard/deposits"
                                        className={({ isActive }) =>
                                            `group relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl transition-all duration-300 ${
                                                isActive
                                                    ? "bg-gradient-to-r from-orange-500/20 to-amber-500/10 border border-orange-400/20 shadow-lg shadow-orange-500/10"
                                                    : "hover:bg-white/5 border border-transparent"
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-base transition-all duration-300 ${
                                                    isActive
                                                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                                                        : "bg-white/5 text-slate-300 group-hover:bg-white/10"
                                                }`}>
                                                    💰
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className={`text-[13px] font-semibold ${
                                                        isActive ? "text-white" : "text-slate-300/85"
                                                    }`}>
                                                        Depósitos
                                                    </span>

                                                    <span className="text-[11px] text-slate-500/70">
                                                        Movimientos
                                                    </span>
                                                </div>

                                                {isActive && (
                                                    <div className="ml-auto w-[3px] h-8 rounded-full bg-gradient-to-b from-orange-400 to-amber-400" />
                                                )}
                                            </>
                                        )}
                                    </NavLink>

                                    <NavLink
                                        to="/dashboard/products"
                                        className={({ isActive }) =>
                                            `group relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl transition-all duration-300 ${
                                                isActive
                                                    ? "bg-gradient-to-r from-indigo-500/20 to-cyan-500/10 border border-indigo-400/20 shadow-lg shadow-indigo-500/10"
                                                    : "hover:bg-white/5 border border-transparent"
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-base transition-all duration-300 ${
                                                    isActive
                                                        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                                                        : "bg-white/5 text-slate-300 group-hover:bg-white/10"
                                                }`}>
                                                    📦
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className={`text-[13px] font-semibold ${
                                                        isActive ? "text-white" : "text-slate-300/85"
                                                    }`}>
                                                        Productos
                                                    </span>

                                                    <span className="text-[11px] text-slate-500/70">
                                                        Servicios y productos
                                                    </span>
                                                </div>

                                                {isActive && (
                                                    <div className="ml-auto w-[3px] h-8 rounded-full bg-gradient-to-b from-indigo-400 to-cyan-400" />
                                                )}
                                            </>
                                        )}
                                    </NavLink>

                                </div>
                            </div>

                        </nav>

                        {/* Footer */}
                        <div className="mt-auto pt-6">
                            <div className="rounded-3xl border border-white/8 bg-white/[0.04] backdrop-blur-sm p-5">

                                <div className="flex items-center gap-2.5 mb-2">
                                    <div className="w-7 h-7 rounded-[10px] bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">
                                        SB
                                    </div>
                                    <p className="text-white font-semibold text-sm">
                                        Sistema bancario
                                    </p>
                                </div>

                                <p className="text-slate-400/80 text-xs leading-relaxed">
                                    Panel administrativo moderno para la gestión de usuarios y finanzas.
                                </p>

                                <div className="mt-4 flex items-center gap-2">
                                    <div className="w-[7px] h-[7px] rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-xs text-emerald-300/90">
                                        Sistema activo
                                    </span>
                                    <span className="ml-auto text-[10px] text-slate-600 bg-white/5 border border-white/[0.06] px-2 py-0.5 rounded-full">
                                        v2.1
                                    </span>
                                </div>

                            </div>
                        </div>

                    </div>
                </aside>

                {/* Contenido */}
                <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#f8fafc] to-[#eef4ff] p-4 sm:p-6 lg:p-8 [scrollbar-width:thin] [scrollbar-color:#cbd5e1_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300/60 [&::-webkit-scrollbar-thumb]:rounded-full">
                    <Outlet />
                </main>

            </div>
        </div>
    )
}