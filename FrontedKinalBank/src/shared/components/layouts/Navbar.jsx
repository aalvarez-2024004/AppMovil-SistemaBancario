import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/useAuthStore.js";
import KinalBankLogo from "../../../assets/img/KinalBank.png";

export const Navbar = () => {

    const navigate = useNavigate();

    const logout = useAuthStore((state) => state.logout);

    // Usuario autenticado
    const user = useAuthStore((state) => state.user);

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };

    // Validar rol
    const isAdmin = user?.role === "ADMIN";

    return (
        <header className="h-[78px] bg-[#071126]/95 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-50 flex-shrink-0 relative overflow-hidden">

            {/* Glow */}
            <div className="absolute top-[-80px] left-[20%] w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full" />
            <div className="absolute right-[-120px] top-[-80px] w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />

            {/* Left */}
            <div
                className="relative z-10 flex items-center gap-5 cursor-pointer group"
                onClick={() => navigate("/dashboard")}
            >

                {/* Logo */}
                <div className="relative">

                    <div className="absolute inset-0 rounded-2xl bg-indigo-500/20 blur-xl group-hover:bg-indigo-500/30 transition-all" />

                    <div className="relative w-14 h-14 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-lg">
                        <img
                            src={KinalBankLogo}
                            alt="KinalBank"
                            className="h-9 object-contain brightness-0 invert"
                        />
                    </div>

                </div>

                {/* Text */}
                <div className="flex flex-col">

                    <h1 className="text-white font-black text-lg tracking-wide leading-none">
                        KinalBank
                    </h1>

                    <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

                        <span className="text-xs text-slate-400 tracking-[0.2em] uppercase font-semibold">
                            {isAdmin ? "Admin Dashboard" : "Cliente Dashboard"}
                        </span>
                    </div>

                </div>

            </div>

            {/* Right */}
            <div className="relative z-10 flex items-center gap-4">

                {/* User badge */}
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

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="group relative overflow-hidden px-5 py-3 rounded-2xl border border-red-500/30
                        bg-red-500/10 text-red-300 transition-all duration-300 hover:scale-105 hover:text-white"
                >
                    <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>

                    <span className="relative z-10 flex items-center gap-2 text-sm font-semibold">
                        <span className="text-base transition-transform duration-300 group-hover:rotate-12">
                            ⎋
                        </span>
                        Cerrar sesión
                    </span>
                </button>
            </div>
        </header>
    );
};