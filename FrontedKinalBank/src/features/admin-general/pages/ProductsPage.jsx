import { useEffect, useState } from "react";
import { ProductModal } from "../components/ProductModal.jsx";
import { CreateProductModal } from "../components/CreateProductModal.jsx";
import { useProductsStore } from "../store/useProductStore.js";

const PackageIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const ShoppingCartIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>
);

const ZapIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const PlusIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const EyeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EditIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const SparklesIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
  </svg>
);

const TagIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const GridIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const TrendingUpIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const DatabaseIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
        style={{
          left: `${10 + i * 12}%`,
          top: `${15 + (i % 4) * 20}%`,
          animationDelay: `${i * 0.4}s`,
          animationDuration: `${3 + i * 0.3}s`
        }}
      />
    ))}
  </div>
);

const AnimatedNumber = ({ value, duration = 1000 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const steps = 25;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{displayValue}</span>;
};

const StatCard = ({ label, value, sub, icon, color, index = 0 }) => {
  const colorVariants = {
    indigo: {
      glow: "bg-indigo-500",
      iconBg: "from-indigo-100 via-indigo-50 to-white",
      iconText: "text-indigo-600",
      iconRing: "ring-indigo-100",
      iconShadow: "shadow-indigo-100/80",
      accentLine: "from-indigo-500 to-cyan-500",
      hoverGlow: "group-hover:bg-indigo-100/50"
    },
    blue: {
      glow: "bg-blue-500",
      iconBg: "from-blue-100 via-blue-50 to-white",
      iconText: "text-blue-600",
      iconRing: "ring-blue-100",
      iconShadow: "shadow-blue-100/80",
      accentLine: "from-blue-500 to-indigo-500",
      hoverGlow: "group-hover:bg-blue-100/50"
    },
    purple: {
      glow: "bg-purple-500",
      iconBg: "from-purple-100 via-purple-50 to-white",
      iconText: "text-purple-600",
      iconRing: "ring-purple-100",
      iconShadow: "shadow-purple-100/80",
      accentLine: "from-purple-500 to-pink-500",
      hoverGlow: "group-hover:bg-purple-100/50"
    }
  };

  const colorKey = color.includes("indigo") ? "indigo" : color.includes("blue") ? "blue" : "purple";
  const colors = colorVariants[colorKey];

  return (
    <div
      className="group relative overflow-hidden rounded-[24px] border border-slate-200/60 bg-white/95 backdrop-blur-xl shadow-xl shadow-slate-200/40 px-6 py-5 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-300/50 hover:scale-[1.02] hover:-translate-y-1 cursor-default"
      style={{ animation: `fadeSlideIn 0.5s ease-out ${index * 0.1}s both` }}
    >
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.accentLine} opacity-80`} />

      <div className={`absolute top-[-40px] right-[-40px] w-32 h-32 rounded-full blur-3xl opacity-20 ${colors.glow} transition-all duration-500 group-hover:opacity-40 group-hover:scale-125`} />
      <div className={`absolute bottom-[-30px] left-[-30px] w-24 h-24 rounded-full blur-2xl opacity-0 ${colors.hoverGlow} transition-all duration-500`} />

      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
        <SparklesIcon className={`w-4 h-4 ${colors.iconText} opacity-50`} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

      <div className="relative z-10 flex items-center justify-between gap-5">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-2.5 flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${colors.glow} opacity-60`} />
            {label}
          </p>

          <h3 className="text-[2.5rem] leading-none font-black text-slate-800 whitespace-nowrap tabular-nums group-hover:scale-105 transition-transform duration-300 origin-left">
            <AnimatedNumber value={value} />
          </h3>

          {sub && (
            <p className="text-xs text-slate-400 mt-3 truncate font-medium flex items-center gap-1.5">
              <TrendingUpIcon className="w-3 h-3 text-slate-300" />
              {sub}
            </p>
          )}
        </div>

        <div className={`
                    relative w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.iconBg} 
                    flex items-center justify-center ${colors.iconText} 
                    shadow-lg ${colors.iconShadow} ring-1 ${colors.iconRing}
                    flex-shrink-0 transition-all duration-400 
                    group-hover:scale-110 group-hover:rotate-3 overflow-hidden
                `}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />

          <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>

          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/50 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute inset-0 rounded-2xl border-2 border-white/30 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
        </div>
      </div>

      <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r ${colors.accentLine} group-hover:w-full transition-all duration-700`} />
    </div>
  );
};

const ProductCard = ({ product, onView, onEdit, onDelete, index }) => {
  const isService = product.type === "SERVICIO";

  return (
    <div
      className="group relative bg-white rounded-[24px] border border-slate-100/80 p-6 shadow-lg shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
      style={{ animation: `fadeSlideIn 0.5s ease-out ${index * 0.08}s both` }}
    >
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${isService ? "from-purple-500 to-pink-500" : "from-blue-500 to-indigo-500"} opacity-80`} />

      <div className={`absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-500 ${isService ? "bg-purple-400" : "bg-blue-400"}`} />
      <div className={`absolute -bottom-12 -left-12 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-15 transition-all duration-500 ${isService ? "bg-pink-300" : "bg-indigo-300"}`} />

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isService ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"}`}>
              {isService ? <ZapIcon className="w-4 h-4" /> : <ShoppingCartIcon className="w-4 h-4" />}
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">#{product._id.slice(-6)}</span>
          </div>
          <span className={`
                        relative px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider overflow-hidden
                        ${isService
              ? "bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 ring-1 ring-purple-200/50"
              : "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 ring-1 ring-blue-200/50"
            }
                    `}>
            <span className="relative z-10 flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isService ? "bg-purple-500" : "bg-blue-500"}`} />
              {product.type}
            </span>
          </span>
        </div>

        {/* Title */}
        <h3 className="font-black text-xl text-slate-800 mb-2 group-hover:text-slate-900 transition-colors leading-tight">{product.name}</h3>

        <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">{product.description}</p>
      </div>

      <div className="relative z-10 mt-5 pt-4 border-t border-slate-100/80">
        <div className="flex justify-between items-center">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-slate-400 font-medium">Q</span>
            <span className={`font-black text-2xl tabular-nums ${isService ? "text-purple-600" : "text-indigo-600"}`}>
              {Number(product.price).toLocaleString("es-GT", { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex gap-1.5">
            <button
              onClick={() => onView(product)}
              className="group/btn relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-indigo-500/10 scale-0 group-hover/btn:scale-100 rounded-xl transition-transform duration-300" />
              <EyeIcon className="w-5 h-5 relative z-10 transition-transform group-hover/btn:scale-110" />
            </button>
            <button
              onClick={() => onEdit(product)}
              className="group/btn relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-emerald-500/10 scale-0 group-hover/btn:scale-100 rounded-xl transition-transform duration-300" />
              <EditIcon className="w-5 h-5 relative z-10 transition-transform group-hover/btn:scale-110" />
            </button>
            <button
              onClick={() => onDelete(product._id)}
              className="group/btn relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-red-500/10 scale-0 group-hover/btn:scale-100 rounded-xl transition-transform duration-300" />
              <TrashIcon className="w-5 h-5 relative z-10 transition-transform group-hover/btn:scale-110" />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`w-1 h-1 rounded-full transition-all duration-300 ${isService ? "bg-purple-400" : "bg-indigo-400"}`}
            style={{ transitionDelay: `${i * 50}ms` }}
          />
        ))}
      </div>
    </div>
  );
};

export const ProductsPage = () => {
  const { products, fetchProducts, deleteProduct } = useProductsStore();
  const [viewProduct, setViewProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalProductos = products.filter(p => p.type === "PRODUCTO").length;
  const totalServicios = products.filter(p => p.type === "SERVICIO").length;

  return (
    <div className="max-w-6xl mx-auto">
      <style>{`
                @keyframes fadeSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(16px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                        opacity: 0.3;
                    }
                    50% {
                        transform: translateY(-25px) rotate(180deg);
                        opacity: 0.7;
                    }
                }
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                .animate-gradient {
                    animation: gradient 4s ease infinite;
                    background-size: 200% 200%;
                }
                .animate-shimmer {
                    animation: shimmer 3s infinite;
                }
            `}</style>

      <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#050d1a] via-[#0a1628] to-[#12243f] p-8 md:p-10 lg:p-12 shadow-2xl shadow-slate-900/30 mb-8">
        <div className="absolute top-[-40%] right-[-15%] w-[450px] h-[450px] bg-gradient-to-br from-indigo-600/25 via-indigo-500/15 to-transparent blur-3xl rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-[-50%] left-[-10%] w-[350px] h-[350px] bg-gradient-to-tr from-cyan-500/20 via-cyan-400/10 to-transparent blur-3xl rounded-full animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-purple-500/8 to-transparent blur-3xl rounded-full" />

        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }} />


        <div className="absolute top-0 left-1/4 w-px h-28 bg-gradient-to-b from-indigo-500/40 to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-20 bg-gradient-to-b from-purple-500/30 to-transparent" />
        <div className="absolute bottom-0 left-1/3 w-px h-16 bg-gradient-to-t from-indigo-500/30 to-transparent" />
        <div className="absolute bottom-0 right-1/4 w-px h-24 bg-gradient-to-t from-cyan-500/20 to-transparent" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.08] border border-white/10 backdrop-blur-md mb-6 shadow-lg shadow-black/10 hover:bg-white/[0.12] transition-colors cursor-default group">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-40" />
                <div className="relative w-2.5 h-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-lg shadow-emerald-400/50" />
              </div>
              <span className="text-[11px] uppercase tracking-[0.3em] text-slate-300 font-bold">
                Gestion de inventario
              </span>
              <div className="w-px h-4 bg-white/20" />
              <TagIcon className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
              Gestion de
              <span className="block bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent animate-gradient mt-1">
                productos y servicios
              </span>
            </h1>

            <p className="text-slate-400 mt-5 leading-relaxed text-[15px] max-w-lg">
              Administra y supervisa todos los productos y servicios disponibles dentro del sistema en tiempo real.
            </p>

            <div className="flex items-center gap-4 mt-6 flex-wrap">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/15 transition-colors cursor-default">
                <ShoppingCartIcon className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 text-xs font-semibold">{totalProductos} productos</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/15 transition-colors cursor-default">
                <ZapIcon className="w-4 h-4 text-purple-400" />
                <span className="text-purple-300 text-xs font-semibold">{totalServicios} servicios</span>
              </div>
            </div>
          </div>


          <div className="flex flex-col items-start lg:items-end gap-5">
            <div className="relative rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-6 min-w-[220px] overflow-hidden shadow-2xl shadow-black/20 group hover:border-white/20 transition-colors">

              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 rounded-[28px]" />

              <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              <div className="absolute -top-8 -right-8 w-20 h-20 bg-indigo-500/20 rounded-full blur-xl group-hover:bg-indigo-500/30 transition-colors" />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-purple-500/15 rounded-full blur-xl" />

              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <DatabaseIcon className="w-4 h-4 text-slate-400" />
                  <p className="text-slate-400 text-xs uppercase tracking-[0.2em] font-bold">Total items</p>
                </div>
                <h2 className="text-5xl font-black text-white tabular-nums tracking-tight">
                  <AnimatedNumber value={products.length} />
                </h2>
                <div className="mt-4 flex items-center gap-2.5">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-40" />
                    <div className="relative w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
                  </div>
                  <span className="text-emerald-300 text-xs font-semibold">Sistema actualizado</span>
                </div>
              </div>

              <div className="absolute inset-0 overflow-hidden rounded-[28px] pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" style={{ animationDuration: '3s' }} />
              </div>
            </div>

            <button
              onClick={() => setShowCreate(true)}
              className="group relative px-7 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-500 text-white font-bold shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-100 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

              <div className="absolute inset-0 rounded-2xl border border-white/20" />

              <span className="relative flex items-center gap-2.5 text-sm">
                <PlusIcon className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                <span>Nuevo Producto</span>
              </span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <StatCard
          label="Total registrados"
          value={products.length}
          sub="Productos y servicios"
          color="bg-indigo-500"
          index={0}
          icon={<PackageIcon className="w-7 h-7" />}
        />

        <StatCard
          label="Productos"
          value={totalProductos}
          sub="Productos activos"
          color="bg-blue-500"
          index={1}
          icon={<ShoppingCartIcon className="w-7 h-7" />}
        />

        <StatCard
          label="Servicios"
          value={totalServicios}
          sub="Servicios activos"
          color="bg-purple-500"
          index={2}
          icon={<ZapIcon className="w-7 h-7" />}
        />
      </div>

      <div
        className="relative rounded-[32px] border border-slate-200/60 bg-white/95 backdrop-blur-xl shadow-2xl shadow-slate-300/30 overflow-hidden"
        style={{ animation: 'fadeSlideIn 0.6s ease-out 0.3s both' }}
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/30 via-transparent to-transparent pointer-events-none" />

        <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-100/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-purple-100/20 rounded-full blur-3xl" />

        <div className="relative px-7 py-6 border-b border-slate-100/80 bg-gradient-to-r from-slate-50/80 via-white to-slate-50/50">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/[0.02] to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative group cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 via-indigo-50 to-white flex items-center justify-center shadow-lg shadow-indigo-100/80 ring-1 ring-indigo-100 transition-all duration-300 group-hover:scale-105 group-hover:shadow-indigo-200">
                  <GridIcon className="w-7 h-7 text-indigo-600" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-300/50">
                  <span className="text-[9px] text-white font-bold">{products.length}</span>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight">Catalogo de productos</h2>
                <p className="text-sm text-slate-400 mt-0.5 flex items-center gap-2">
                  <PackageIcon className="w-3.5 h-3.5 text-slate-300" />
                  Todos los productos y servicios disponibles
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-100/80 shadow-sm hover:shadow-md hover:shadow-emerald-100/50 transition-all cursor-default">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-50" />
                  <div className="relative w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-400" />
                </div>
                <span className="text-sm font-bold text-emerald-700 tabular-nums">
                  {products.length} items
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative p-6">
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }} />

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product, index) => (
              <ProductCard
                key={product._id}
                product={product}
                index={index}
                onView={setViewProduct}
                onEdit={setEditProduct}
                onDelete={deleteProduct}
              />
            ))}
          </div>

          {products.length === 0 && (
            <div className="flex flex-col items-center py-20">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center mb-5 shadow-lg shadow-slate-200/50">
                <PackageIcon className="w-10 h-10 text-slate-300" />
              </div>
              <p className="text-slate-500 font-bold text-lg">Sin productos</p>
              <p className="text-slate-400 text-sm mt-1">Agrega tu primer producto o servicio</p>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>

      {viewProduct && <ProductModal product={viewProduct} onClose={() => setViewProduct(null)} />}
      {editProduct && <CreateProductModal product={editProduct} onClose={() => setEditProduct(null)} />}
      {showCreate && <CreateProductModal onClose={() => setShowCreate(false)} />}
    </div>
  );
};