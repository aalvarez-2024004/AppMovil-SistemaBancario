import { useState, useEffect } from "react";
import { useProductsStore } from "../store/useProductStore.js";

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const PackageIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const TagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const FileTextIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const LayersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const DollarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
  </svg>
);

const SparklesIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

const EditIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const CreateProductModal = ({ product, onClose }) => {
  const { createProduct, updateProduct } = useProductsStore();
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "PRODUCTO",
    price: 0
  });

  const isEditing = !!product?._id;

  useEffect(() => {
    if (product) setForm(product);
  }, [product]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.description) return;

    setIsLoading(true);
    const payload = { ...form, price: Number(form.price) };

    if (product?._id) {
      await updateProduct(product._id, payload);
    } else {
      await createProduct(payload);
    }

    setIsLoading(false);
    onClose();
  };

  return (
    <>
      {/* CSS Animations */}
      <style>{`
        @keyframes overlayFadeIn {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(12px); }
        }
        @keyframes modalSlideIn {
          from { opacity: 0; transform: scale(0.92) translateY(30px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes gradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(10px, -10px) rotate(5deg); }
          66% { transform: translate(-5px, 5px) rotate(-3deg); }
        }
        @keyframes floatMedium {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-15px, 10px) scale(1.1); }
        }
        @keyframes floatFast {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px var(--glow-color, rgba(99, 102, 241, 0.4)), 0 0 40px var(--glow-color, rgba(99, 102, 241, 0.2)); }
          50% { box-shadow: 0 0 35px var(--glow-color, rgba(99, 102, 241, 0.6)), 0 0 70px var(--glow-color, rgba(99, 102, 241, 0.3)); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0.5; transform: scale(0.8) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.3) rotate(180deg); }
        }
        @keyframes shimmerSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes ringExpand {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 0.2; }
        }
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-4px) scale(1.05); }
        }
        @keyframes borderGlow {
          0%, 100% { border-color: rgba(99, 102, 241, 0.3); }
          50% { border-color: rgba(99, 102, 241, 0.6); }
        }
        @keyframes textShine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .modal-overlay { animation: overlayFadeIn 0.35s ease-out forwards; }
        .modal-content { animation: modalSlideIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .gradient-bar { background-size: 200% 100%; animation: gradientFlow 3s ease infinite; }
        .float-slow { animation: floatSlow 8s ease-in-out infinite; }
        .float-medium { animation: floatMedium 6s ease-in-out infinite; }
        .float-fast { animation: floatFast 4s ease-in-out infinite; }
        .pulse-glow { animation: pulseGlow 2.5s ease-in-out infinite; }
        .sparkle { animation: sparkle 2s ease-in-out infinite; }
        .ring-expand { animation: ringExpand 2s ease-in-out infinite; }
        .field-group:hover .field-icon { animation: iconFloat 0.6s ease-in-out; }
        .shimmer-effect::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmerSlide 2s infinite;
        }
        .close-btn { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .close-btn:hover { transform: rotate(90deg) scale(1.1); }
        .text-shine {
          background: linear-gradient(90deg, currentColor 40%, rgba(255,255,255,0.8) 50%, currentColor 60%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          animation: textShine 3s linear infinite;
        }
      `}</style>

      <div className="modal-overlay fixed inset-0 flex items-center justify-center z-50 p-4 bg-gradient-to-br from-slate-900/70 via-black/60 to-indigo-950/50">
        <div className="absolute inset-0" onClick={onClose} />

        <div
          className="modal-content relative w-full max-w-lg rounded-[32px] bg-white overflow-hidden"
          style={{ boxShadow: '0 25px 100px -12px rgba(0, 0, 0, 0.5), 0 0 60px rgba(99, 102, 241, 0.15)' }}
        >
          <div
            className="gradient-bar h-1.5"
            style={{
              background: isEditing
                ? 'linear-gradient(90deg, #f59e0b, #f97316, #ef4444, #ec4899, #f59e0b)'
                : 'linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7, #ec4899, #6366f1)'
            }}
          />

          <div className="relative bg-[#070d1f] px-7 py-7 overflow-hidden">
            <div
              className="float-slow absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-60"
              style={{
                background: isEditing
                  ? 'radial-gradient(circle, rgba(251, 146, 60, 0.3) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, transparent 70%)',
                filter: 'blur(40px)'
              }}
            />
            <div
              className="float-medium absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-50"
              style={{
                background: isEditing
                  ? 'radial-gradient(circle, rgba(249, 115, 22, 0.25) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
                filter: 'blur(35px)'
              }}
            />
            <div
              className="float-fast absolute top-1/3 left-1/2 w-32 h-32 rounded-full opacity-40"
              style={{
                background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
                filter: 'blur(25px)'
              }}
            />

            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '18px 18px'
              }}
            />

            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 1px, transparent 20px)'
              }}
            />

            <div className="relative flex items-start justify-between">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div
                    className="ring-expand absolute -inset-2 rounded-2xl border-2 opacity-50"
                    style={{ borderColor: isEditing ? 'rgba(251, 146, 60, 0.4)' : 'rgba(99, 102, 241, 0.4)' }}
                  />
                  <div
                    className="pulse-glow relative w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background: isEditing
                        ? 'linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ea580c 100%)'
                        : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                      '--glow-color': isEditing ? 'rgba(251, 146, 60, 0.5)' : 'rgba(99, 102, 241, 0.5)'
                    }}
                  >
                    <span className="text-white drop-shadow-lg">
                      {isEditing ? <EditIcon /> : <PackageIcon />}
                    </span>
                  </div>
                  <div
                    className="sparkle absolute -top-1 -right-1 text-yellow-400 drop-shadow-lg"
                    style={{ filter: 'drop-shadow(0 0 4px rgba(250, 204, 21, 0.8))' }}
                  >
                    <SparklesIcon />
                  </div>
                  {/* Segundo sparkle */}
                  <div
                    className="sparkle absolute -bottom-0.5 -left-1 text-cyan-400 drop-shadow-lg"
                    style={{ filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.8))', animationDelay: '0.5s' }}
                  >
                    <SparklesIcon />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1.5 rounded-full"
                      style={{
                        background: isEditing
                          ? 'linear-gradient(135deg, rgba(251, 146, 60, 0.2) 0%, rgba(249, 115, 22, 0.15) 100%)'
                          : 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)',
                        color: isEditing ? '#fdba74' : '#a5b4fc',
                        border: `1px solid ${isEditing ? 'rgba(251, 146, 60, 0.3)' : 'rgba(99, 102, 241, 0.3)'}`
                      }}
                    >
                      {isEditing ? <ClockIcon /> : <ShieldCheckIcon />}
                      {isEditing ? "Modificando" : "Nuevo registro"}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    {isEditing ? "Editar producto" : "Crear producto"}
                  </h2>
                  <p className="text-white/40 text-sm mt-1 font-medium">
                    {isEditing ? "Actualiza la informacion del producto" : "Completa todos los campos requeridos"}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="close-btn relative flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 hover:bg-white/15 text-white/50 hover:text-white border border-white/10 hover:border-white/20"
              >
                <XIcon />
              </button>
            </div>
          </div>

          <div className="relative h-8 bg-gradient-to-b from-slate-100 to-white flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200/50 to-transparent" />
            <div className="relative flex items-center gap-1.5">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-slate-300" />
              <div className={`w-2 h-2 rounded-full ${isEditing ? 'bg-amber-400' : 'bg-indigo-400'}`} />
              <div className={`w-1.5 h-1.5 rounded-full ${isEditing ? 'bg-orange-300' : 'bg-violet-300'}`} />
              <div className={`w-2 h-2 rounded-full ${isEditing ? 'bg-amber-400' : 'bg-indigo-400'}`} />
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-slate-300" />
            </div>
          </div>

          <div className="px-7 pb-6 pt-2 space-y-5 relative">
            <div
              className="absolute inset-0 opacity-[0.015] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle, ${isEditing ? '#f59e0b' : '#6366f1'} 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}
            />

            <div className="field-group relative">
              <label className="flex items-center gap-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                <span
                  className="field-icon flex items-center justify-center w-7 h-7 rounded-lg shadow-sm transition-all duration-300"
                  style={{
                    background: focusedField === 'name'
                      ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                      : 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
                    color: focusedField === 'name' ? 'white' : '#6366f1',
                    boxShadow: focusedField === 'name' ? '0 4px 12px rgba(99, 102, 241, 0.4)' : 'none'
                  }}
                >
                  <TagIcon />
                </span>
                Nombre del producto
                <span className="text-red-400 text-base">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                placeholder="Ej: Cuenta Premium Business"
                className="w-full border-2 p-4 rounded-2xl text-sm font-medium text-slate-700 placeholder:text-slate-400 transition-all duration-300 focus:outline-none"
                style={{
                  borderColor: focusedField === 'name' ? '#818cf8' : '#e2e8f0',
                  backgroundColor: focusedField === 'name' ? '#f5f3ff' : '#f8fafc',
                  boxShadow: focusedField === 'name' ? '0 4px 20px rgba(99, 102, 241, 0.15), inset 0 0 0 1px rgba(99, 102, 241, 0.1)' : 'none'
                }}
              />
            </div>

            <div className="field-group relative">
              <label className="flex items-center gap-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                <span
                  className="field-icon flex items-center justify-center w-7 h-7 rounded-lg shadow-sm transition-all duration-300"
                  style={{
                    background: focusedField === 'description'
                      ? 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)'
                      : 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
                    color: focusedField === 'description' ? 'white' : '#8b5cf6',
                    boxShadow: focusedField === 'description' ? '0 4px 12px rgba(139, 92, 246, 0.4)' : 'none'
                  }}
                >
                  <FileTextIcon />
                </span>
                Descripcion
                <span className="text-red-400 text-base">*</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                onFocus={() => setFocusedField('description')}
                onBlur={() => setFocusedField(null)}
                placeholder="Describe las caracteristicas principales del producto..."
                rows={3}
                className="w-full border-2 p-4 rounded-2xl text-sm font-medium text-slate-700 placeholder:text-slate-400 transition-all duration-300 focus:outline-none resize-none"
                style={{
                  borderColor: focusedField === 'description' ? '#a78bfa' : '#e2e8f0',
                  backgroundColor: focusedField === 'description' ? '#faf5ff' : '#f8fafc',
                  boxShadow: focusedField === 'description' ? '0 4px 20px rgba(139, 92, 246, 0.15), inset 0 0 0 1px rgba(139, 92, 246, 0.1)' : 'none'
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="field-group relative">
                <label className="flex items-center gap-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                  <span
                    className="field-icon flex items-center justify-center w-7 h-7 rounded-lg shadow-sm transition-all duration-300"
                    style={{
                      background: focusedField === 'type'
                        ? 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)'
                        : 'linear-gradient(135deg, #e0f2fe 0%, #cffafe 100%)',
                      color: focusedField === 'type' ? 'white' : '#0ea5e9',
                      boxShadow: focusedField === 'type' ? '0 4px 12px rgba(14, 165, 233, 0.4)' : 'none'
                    }}
                  >
                    <LayersIcon />
                  </span>
                  Tipo
                </label>
                <div className="relative">
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('type')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full border-2 p-4 pr-10 rounded-2xl text-sm font-medium text-slate-700 transition-all duration-300 focus:outline-none appearance-none cursor-pointer"
                    style={{
                      borderColor: focusedField === 'type' ? '#22d3ee' : '#e2e8f0',
                      backgroundColor: focusedField === 'type' ? '#ecfeff' : '#f8fafc',
                      boxShadow: focusedField === 'type' ? '0 4px 20px rgba(6, 182, 212, 0.15), inset 0 0 0 1px rgba(6, 182, 212, 0.1)' : 'none'
                    }}
                  >
                    <option value="PRODUCTO">Producto</option>
                    <option value="SERVICIO">Servicio</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="field-group relative">
                <label className="flex items-center gap-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                  <span
                    className="field-icon flex items-center justify-center w-7 h-7 rounded-lg shadow-sm transition-all duration-300"
                    style={{
                      background: focusedField === 'price'
                        ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                        : 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                      color: focusedField === 'price' ? 'white' : '#10b981',
                      boxShadow: focusedField === 'price' ? '0 4px 12px rgba(16, 185, 129, 0.4)' : 'none'
                    }}
                  >
                    <DollarIcon />
                  </span>
                  Precio
                </label>
                <div className="relative">
                  <span
                    className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-sm transition-colors duration-300"
                    style={{ color: focusedField === 'price' ? '#059669' : '#94a3b8' }}
                  >
                  </span>
                  <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('price')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="0.00"
                    className="w-full border-2 p-4 pl-9 rounded-2xl text-sm font-medium text-slate-700 placeholder:text-slate-400 transition-all duration-300 focus:outline-none"
                    style={{
                      borderColor: focusedField === 'price' ? '#34d399' : '#e2e8f0',
                      backgroundColor: focusedField === 'price' ? '#ecfdf5' : '#f8fafc',
                      boxShadow: focusedField === 'price' ? '0 4px 20px rgba(16, 185, 129, 0.15), inset 0 0 0 1px rgba(16, 185, 129, 0.1)' : 'none'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative px-7 py-5 border-t border-slate-100 bg-gradient-to-b from-slate-50/80 to-white overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
                backgroundSize: '14px 14px'
              }}
            />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <div
                  className="w-2.5 h-2.5 rounded-full animate-pulse"
                  style={{
                    backgroundColor: isEditing ? '#f59e0b' : '#22c55e',
                    boxShadow: `0 0 8px ${isEditing ? 'rgba(245, 158, 11, 0.6)' : 'rgba(34, 197, 94, 0.6)'}`
                  }}
                />
                {isEditing ? 'Modo edicion activo' : 'Listo para crear'}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-100 hover:border-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !form.name || !form.description}
                  className="shimmer-effect relative px-6 py-3 rounded-xl text-white text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 overflow-hidden flex items-center gap-2"
                  style={{
                    background: isEditing
                      ? 'linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ea580c 100%)'
                      : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                    boxShadow: isEditing
                      ? '0 4px 20px rgba(249, 115, 22, 0.4)'
                      : '0 4px 20px rgba(99, 102, 241, 0.4)'
                  }}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                        <path d="M12 2a10 10 0 019.17 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      <span>Procesando...</span>
                    </>
                  ) : (
                    <>
                      {isEditing ? <CheckIcon /> : <PlusIcon />}
                      <span>{isEditing ? "Actualizar" : "Crear producto"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};