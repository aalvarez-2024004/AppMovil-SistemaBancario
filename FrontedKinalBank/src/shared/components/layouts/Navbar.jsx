import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/useAuthStore.js";
import KinalBankLogo from "../../../assets/img/KinalBank.png";

export const Navbar = ({ sidebarOpen, onToggleSidebar }) => {

    const navigate = useNavigate();

    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };

    const isAdmin = user?.role === "ADMIN";

    return (
        <header className="h-[70px] sm:h-[78px] bg-[#071126]/95 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-3 sm:px-8 sticky top-0 z-50 flex-shrink-0 relative overflow-hidden">

            <div className="absolute top-[-80px] left-[20%] w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full" />
            <div className="absolute right-[-120px] top-[-80px] w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />

            {/* Left */}
            <div className="relative z-10 flex items-center gap-2 sm:gap-5 min-w-0">

                {/* Hamburguesa (solo mobile) - vive DENTRO del navbar */}
                {onToggleSidebar && (
                    <button
                        onClick={onToggleSidebar}
                        aria-label={sidebarOpen ? "Cerrar menú" : "Abrir menú"}
                        className="lg:hidden w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center gap-1.5 text-white active:scale-95 transition-all"
                    >
                        <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${sidebarOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${sidebarOpen ? 'opacity-0' : ''}`} />
                        <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${sidebarOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                )}

                <div
                    className="flex items-center gap-2 sm:gap-5 cursor-pointer group min-w-0"
                    onClick={() => navigate("/dashboard")}
                >
                    <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 rounded-2xl bg-indigo-500/20 blur-xl group-hover:bg-indigo-500/30 transition-all" />
                        <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-lg">
                            <img
                                src={KinalBankLogo}
                                alt="KinalBank"
                                className="h-6 sm:h-9 object-contain brightness-0 invert"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col min-w-0">
                        <h1 className="text-white font-black text-sm sm:text-lg tracking-wide leading-none truncate">
                            KinalBank
                        </h1>
                        <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                            <span className="text-[9px] sm:text-xs text-slate-400 tracking-[0.12em] sm:tracking-[0.2em] uppercase font-semibold truncate">
                                {isAdmin ? "Admin Dashboard" : "Cliente Dashboard"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right */}
            <div className="relative z-10 flex items-center gap-2 sm:gap-4 flex-shrink-0">
                <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/30">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white text-sm font-semibold">
                            {user?.name || "Usuario"}
                        </span>
                        <span className="text-slate-400 text-xs">
                            {isAdmin ? "Administrador" : "Cliente"}
                        </span>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="group relative overflow-hidden px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border border-red-500/30
                        bg-red-500/10 text-red-300 transition-all duration-300 hover:scale-105 hover:text-white"
                >
                    <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                    <span className="relative z-10 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold whitespace-nowrap">
                        <span className="text-base transition-transform duration-300 group-hover:rotate-12">
                            ⎋
                        </span>
                        <span>Cerrar sesión</span>
                    </span>
                </button>
            </div>
        </header>
    );
};