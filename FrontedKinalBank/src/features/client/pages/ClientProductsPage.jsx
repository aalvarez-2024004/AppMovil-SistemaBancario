import { useEffect, useState } from "react";
import { useProductsStore } from "../store/useProductsStore.js";
import { ProductModal } from "../components/ProductModal.jsx";

const TYPE_CONFIG = {
    PRODUCTO: {
        label: "Producto",
        icon: "📦",
        gradient: "from-indigo-500 to-blue-600",
        bar: "from-indigo-400 to-blue-500",
        accentColor: "#6366f1",
        accentBg: "rgba(99,102,241,0.10)",
        accentBorder: "rgba(99,102,241,0.25)",
    },
    SERVICIO: {
        label: "Servicio",
        icon: "⚡",
        gradient: "from-amber-500 to-orange-500",
        bar: "from-amber-400 to-orange-500",
        accentColor: "#f59e0b",
        accentBg: "rgba(245,158,11,0.10)",
        accentBorder: "rgba(245,158,11,0.25)",
    },
};

const ProductCard = ({ product, setSelectedProduct }) => {
    const config = TYPE_CONFIG[product.type] ?? {
        label: product.type,
        icon: "🏦",
        gradient: "from-slate-500 to-slate-700",
        bar: "from-slate-400 to-slate-600",
        accentColor: "#64748b",
        accentBg: "rgba(100,116,139,0.10)",
        accentBorder: "rgba(100,116,139,0.25)",
    };

    return (
        <div
            className="group relative overflow-hidden bg-white flex flex-col transition-all duration-300 sm:hover:-translate-y-1.5 w-full"
            style={{ borderRadius: "20px", border: "1px solid #e8edf5", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
            onMouseEnter={e => window.innerWidth > 640 && (e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.12), 0 0 0 1px ${config.accentBorder}`)}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.06)"}
        >
            <div className={`h-[3px] w-full bg-gradient-to-r ${config.bar}`} />
            <div
                className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none transition-all duration-500 group-hover:scale-125 hidden sm:block"
                style={{ background: `radial-gradient(circle, ${config.accentBg} 0%, transparent 70%)` }}
            />
            <div className="relative p-5 sm:p-6 flex flex-col flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-4 sm:mb-5">
                    <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${config.gradient} text-white flex items-center justify-center text-lg sm:text-xl shadow-lg group-hover:scale-105 transition-transform duration-300 flex-shrink-0`}>
                        {config.icon}
                    </div>
                    <span className="px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest whitespace-nowrap self-center"
                        style={{ background: config.accentBg, border: `1px solid ${config.accentBorder}`, color: config.accentColor }}>
                        {config.label}
                    </span>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-black text-slate-900 mb-1.5 sm:mb-2 leading-snug break-words">{product.name}</h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3 sm:line-clamp-2 break-words">{product.description}</p>
                </div>
                <div className="mt-5 pt-4 flex items-center justify-between gap-3" style={{ borderTop: "1px solid #f1f5f9" }}>
                    <div className="min-w-0 flex-1">
                        <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold mb-0.5">Precio</p>
                        <p className="text-lg sm:text-xl font-black text-slate-900 tabular-nums truncate">
                            Q {Number(product.price ?? 0).toLocaleString("es-GT", { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                    <button
                        onClick={() => setSelectedProduct(product)}
                        className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r ${config.gradient} text-white text-[11px] sm:text-xs font-black shadow-md hover:shadow-lg hover:scale-102 active:scale-98 transition-all duration-200 cursor-pointer tracking-wide whitespace-nowrap flex-shrink-0`}
                    >
                        Ver más →
                    </button>
                </div>
            </div>
        </div>
    );
};

export const ClientProductsPage = () => {
    const { products, loading, error, fetchProducts } = useProductsStore();
    const [filter, setFilter] = useState("TODOS");
    const [search, setSearch] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => { fetchProducts(); }, []);

    const FILTERS = ["TODOS", "PRODUCTO", "SERVICIO"];

    const visible = products.filter(p => {
        const matchType   = filter === "TODOS" || p.type === filter;
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                            p.description.toLowerCase().includes(search.toLowerCase());
        return matchType && matchSearch;
    });

    const counts = {
        TODOS:     products.length,
        PRODUCTO: products.filter(p => p.type === "PRODUCTO").length,
        SERVICIO: products.filter(p => p.type === "SERVICIO").length,
    };

    return (
        <div className="w-full min-h-screen pb-12" style={{ background: "#f0f4f8" }}>

            {/* ── Hero — Adaptado a Responsive ── */}
            <div className="w-full px-4 sm:px-6 pt-6">
                <div
                    className="relative overflow-hidden w-full px-5 py-6 sm:px-8 sm:py-7"
                    style={{
                        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #312e81 100%)",
                        borderRadius: "20px",
                        boxShadow: "0 8px 32px rgba(15,23,42,0.35)",
                    }}
                >
                    {/* Decorative orbs */}
                    <div className="absolute -top-16 right-24 w-60 h-60 rounded-full pointer-events-none hidden md:block"
                        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.20) 0%, transparent 70%)" }} />
                    <div className="absolute bottom-0 left-1/3 w-40 h-40 rounded-full pointer-events-none hidden md:block"
                        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)" }} />

                    {/* Left accent bar */}
                    <div className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full"
                        style={{ background: "linear-gradient(180deg,#ffffff,#7dd3fc,#0ea5e9)" }} />

                    <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 min-w-0">

                        {/* Title */}
                        <div className="max-w-xl min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-5 h-0.5 rounded-full"
                                    style={{ background: "linear-gradient(90deg,#ffffff,#7dd3fc)" }} />
                                <p className="text-[9px] font-black tracking-[0.35em] uppercase truncate"
                                    style={{ color: "#818cf8" }}>KinalBank Marketplace</p>
                            </div>
                            <h1 className="text-2xl sm:text-4xl font-black leading-tight sm:leading-none tracking-tighter mb-1.5">
                                <span style={{ color: "#ffffff" }}>Productos & </span>
                                <span style={{ color: "#38bdf8" }}>Servicios</span>
                            </h1>
                            <p className="text-slate-400 text-xs sm:text-sm mt-1.5 sm:mt-2 leading-relaxed">
                                Soluciones bancarias diseñadas para ayudarte a crecer y administrar tu dinero.
                            </p>
                        </div>

                        {/* Stats cards — Grid en móviles, flex en pantallas mayores */}
                        <div className="grid grid-cols-3 sm:flex sm:items-stretch gap-2.5 sm:gap-3 w-full lg:w-auto">

                            {/* Card 1 — Total */}
                            <div className="rounded-2xl px-3 py-3 sm:px-5 sm:py-4 flex flex-col justify-between min-w-0 sm:min-w-[130px] flex-1"
                                style={{
                                    background: "linear-gradient(135deg, rgba(56,189,248,0.22) 0%, rgba(14,165,233,0.12) 100%)",
                                    border: "1px solid rgba(56,189,248,0.40)",
                                    boxShadow: "0 0 20px rgba(56,189,248,0.15)",
                                }}>
                                <p className="text-[8px] sm:text-[9px] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-1 truncate"
                                    style={{ color: "#7dd3fc" }}>✦ Registros</p>
                                <p className="text-2xl sm:text-4xl font-black text-white leading-none truncate">{counts.TODOS}</p>
                                <p className="text-[9px] sm:text-[10px] mt-1.5 sm:mt-2 flex items-center gap-1 truncate" style={{ color: "rgba(125,211,252,0.65)" }}>
                                    <span className="inline-block w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full flex-shrink-0" style={{ background: "#38bdf8" }}></span>
                                    Total
                                </p>
                            </div>

                            {/* Card 2 — Productos */}
                            <div className="rounded-2xl px-3 py-3 sm:px-5 sm:py-4 flex flex-col justify-between min-w-0 sm:min-w-[130px] flex-1"
                                style={{ background: "rgba(99,102,241,0.10)", border: "1px solid rgba(99,102,241,0.30)" }}>
                                <p className="text-[8px] sm:text-[9px] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-1 truncate"
                                    style={{ color: "#a5b4fc" }}>📦 Prod.</p>
                                <p className="text-xl sm:text-2xl font-black leading-none truncate" style={{ color: "#818cf8" }}>{counts.PRODUCTO}</p>
                                <p className="text-[9px] sm:text-[10px] mt-1.5 sm:mt-2 truncate" style={{ color: "rgba(165,180,252,0.55)" }}>Disponibles</p>
                            </div>

                            {/* Card 3 — Servicios */}
                            <div className="rounded-2xl px-3 py-3 sm:px-5 sm:py-4 flex flex-col justify-between min-w-0 sm:min-w-[130px] flex-1"
                                style={{ background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.28)" }}>
                                <p className="text-[8px] sm:text-[9px] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-1 truncate"
                                    style={{ color: "#fcd34d" }}>⚡ Serv.</p>
                                <p className="text-xl sm:text-2xl font-black leading-none truncate" style={{ color: "#fbbf24" }}>{counts.SERVICIO}</p>
                                <p className="text-[9px] sm:text-[10px] mt-1.5 sm:mt-2 truncate" style={{ color: "rgba(252,211,77,0.5)" }}>Disponibles</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* ── Body ── */}
            <div className="w-full px-4 sm:px-6 py-6 space-y-6">

                {/* Controls */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">

                    {/* Filter tabs — Scroll horizontal en teléfonos pequeños */}
                    <div className="flex items-center p-1 gap-1 max-w-full overflow-x-auto no-scrollbar flex-shrink-0"
                        style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                        {FILTERS.map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className="px-3 py-2 sm:px-4 text-[11px] sm:text-xs font-black uppercase tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap"
                                style={filter === f ? {
                                    background: "linear-gradient(135deg, #0f172a, #1e1b4b)",
                                    color: "#38bdf8",
                                    borderRadius: "12px",
                                    boxShadow: "0 2px 8px rgba(15,23,42,0.3)",
                                } : { color: "#94a3b8", borderRadius: "12px" }}
                            >
                                {f === "TODOS" ? "Todos" : f === "PRODUCTO" ? "Productos" : "Servicios"}
                                <span className="ml-1 text-[9px] sm:text-[10px] opacity-60">({counts[f]})</span>
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="w-full md:flex-1 relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-sm pointer-events-none">🔍</span>
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Buscar productos o servicios…"
                            className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-300 focus:outline-none transition-all"
                            style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "11px 16px 11px 40px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
                            onFocus={e => e.target.style.borderColor = "#38bdf8"}
                            onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                        />
                        {search && (
                            <button onClick={() => setSearch("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition cursor-pointer text-xs sm:text-sm">
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 sm:px-5 sm:py-4 text-red-600 text-xs sm:text-sm font-medium flex items-center gap-2 break-words">
                        <span className="flex-shrink-0">⚠️</span> {error}
                    </div>
                )}

                {/* Content */}
                {loading && products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 sm:py-32 gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-indigo-100 border-t-indigo-500 animate-spin" />
                        <p className="text-slate-400 text-xs sm:text-sm font-medium">Cargando productos…</p>
                    </div>

                ) : visible.length === 0 ? (
                    <div className="py-16 sm:py-24 text-center px-4"
                        style={{ background: "#ffffff", borderRadius: "24px", border: "2px dashed #e2e8f0" }}>
                        <p className="text-4xl sm:text-5xl mb-3 sm:mb-4">📦</p>
                        <h3 className="text-base sm:text-lg font-black text-slate-700 mb-1">Sin resultados</h3>
                        <p className="text-xs sm:text-sm text-slate-400">Intenta cambiar el filtro o buscar otro término.</p>
                    </div>

                ) : (
                    <>
                        {/* Grid responsive escalable */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                            {visible.map(product => (
                                <ProductCard key={product._id} product={product} setSelectedProduct={setSelectedProduct} />
                            ))}
                        </div>
                        <p className="text-[11px] sm:text-xs text-slate-400 text-center pt-2">
                            Mostrando <span className="font-bold text-slate-600">{visible.length}</span> de{" "}
                            <span className="font-bold text-slate-600">{products.length}</span> elementos
                        </p>
                    </>
                )}
            </div>

            <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        </div>
    );
};