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

const SparklesIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

const FIELD_STYLE = (focused) => ({
  borderColor: focused ? '#818cf8' : '#e2e8f0',
  backgroundColor: focused ? '#f5f3ff' : '#f8fafc',
  boxShadow: focused ? '0 4px 20px rgba(99,102,241,0.15), inset 0 0 0 1px rgba(99,102,241,0.1)' : 'none'
});

const Label = ({ children }) => (
  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
    {children}
  </label>
);

const Input = ({ name, type = "text", value, onChange, onFocus, onBlur, placeholder, focused, min, max }) => (
  <input
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    onFocus={() => onFocus(name)}
    onBlur={() => onBlur(null)}
    placeholder={placeholder}
    min={min}
    max={max}
    className="w-full border-2 p-3 rounded-2xl text-sm font-medium text-slate-700 placeholder:text-slate-400 transition-all duration-300 focus:outline-none"
    style={FIELD_STYLE(focused === name)}
  />
);

export const CreateProductModal = ({ product, onClose }) => {
  const { createProduct, updateProduct } = useProductsStore();
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [error, setError] = useState(null);

  const INITIAL_FORM = {
    name: "",
    description: "",
    type: "PRODUCTO",
    price: 0,
    category: "OTROS",
    pointsRequired: 0,
    discountPercentage: 0,
    pointsPerPurchase: 5,
    redeemable: true,
  };

  const [form, setForm] = useState(INITIAL_FORM);

  const isEditing = !!product?._id;

  useEffect(() => {
    if (product) {
      setForm({
        ...INITIAL_FORM,
        ...product,
        // asegurar tipos numéricos
        price: product.price ?? 0,
        pointsRequired: product.pointsRequired ?? 0,
        discountPercentage: product.discountPercentage ?? 0,
        pointsPerPurchase: product.pointsPerPurchase ?? 5,
        redeemable: product.redeemable ?? true,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: inputType === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    setError(null);
    if (!form.name || !form.description) {
      setError("Nombre y descripción son obligatorios.");
      return;
    }

    setIsLoading(true);
    const payload = {
      ...form,
      price: Number(form.price),
      pointsRequired: Number(form.pointsRequired),
      discountPercentage: Number(form.discountPercentage),
      pointsPerPurchase: Number(form.pointsPerPurchase),
    };

    const result = isEditing
      ? await updateProduct(product._id, payload)
      : await createProduct(payload);

    setIsLoading(false);
    if (result?.success) {
      onClose();
    } else {
      setError(result?.message ?? "Ocurrió un error, intentá de nuevo.");
    }
  };

  const accentGradient = isEditing
    ? 'linear-gradient(90deg, #f59e0b, #f97316, #ef4444, #f59e0b)'
    : 'linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7, #6366f1)';

  return (
    <>
      <style>{`
        @keyframes overlayFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes modalSlideIn { from{opacity:0;transform:scale(0.92) translateY(30px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes gradientFlow { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes pulseGlow { 0%,100%{box-shadow:0 0 20px rgba(99,102,241,0.4)} 50%{box-shadow:0 0 35px rgba(99,102,241,0.6)} }
        @keyframes sparkle { 0%,100%{opacity:0.5;transform:scale(0.8) rotate(0deg)} 50%{opacity:1;transform:scale(1.3) rotate(180deg)} }
        .modal-overlay{animation:overlayFadeIn 0.3s ease-out forwards}
        .modal-content{animation:modalSlideIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards}
        .gradient-bar{background-size:200% 100%;animation:gradientFlow 3s ease infinite}
        .pulse-glow{animation:pulseGlow 2.5s ease-in-out infinite}
        .sparkle-icon{animation:sparkle 2s ease-in-out infinite}
        .close-btn{transition:all 0.3s ease}
        .close-btn:hover{transform:rotate(90deg) scale(1.1)}
      `}</style>

      <div className="modal-overlay fixed inset-0 flex items-center justify-center z-50 p-4 bg-gradient-to-br from-slate-900/70 via-black/60 to-indigo-950/50">
        <div className="absolute inset-0" onClick={onClose} />

        <div
          className="modal-content relative w-full max-w-xl rounded-[32px] bg-white overflow-hidden"
          style={{ boxShadow: '0 25px 100px -12px rgba(0,0,0,0.5), 0 0 60px rgba(99,102,241,0.15)', maxHeight: '90vh', overflowY: 'auto' }}
        >
          <div className="gradient-bar h-1.5" style={{ background: accentGradient }} />

          {/* Header */}
          <div className="relative bg-[#070d1f] px-7 py-6 overflow-hidden">
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-50"
              style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)', filter: 'blur(40px)' }} />

            <div className="relative flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="pulse-glow w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: isEditing ? 'linear-gradient(135deg,#f59e0b,#f97316)' : 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                    <span className="text-white">{isEditing ? <EditIcon /> : <PackageIcon />}</span>
                  </div>
                  <div className="sparkle-icon absolute -top-1 -right-1 text-yellow-400">
                    <SparklesIcon />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    {isEditing ? "Editar producto" : "Crear producto"}
                  </h2>
                  <p className="text-white/40 text-sm mt-0.5 font-medium">
                    {isEditing ? "Actualiza la información del producto" : "Completa todos los campos"}
                  </p>
                </div>
              </div>

              <button onClick={onClose} className="close-btn w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 text-white/50 hover:text-white border border-white/10 flex items-center justify-center">
                <XIcon />
              </button>
            </div>
          </div>

          {/* Formulario */}
          <div className="px-7 pt-5 pb-3 space-y-4">

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            {/* Nombre */}
            <div>
              <Label>Nombre del producto <span className="text-red-400">*</span></Label>
              <Input name="name" value={form.name} onChange={handleChange}
                onFocus={setFocusedField} onBlur={setFocusedField}
                placeholder="Ej: Seguro de Viaje Premium" focused={focusedField} />
            </div>

            {/* Descripción */}
            <div>
              <Label>Descripción <span className="text-red-400">*</span></Label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                onFocus={() => setFocusedField('description')}
                onBlur={() => setFocusedField(null)}
                placeholder="Describe las características principales..."
                rows={3}
                className="w-full border-2 p-3 rounded-2xl text-sm font-medium text-slate-700 placeholder:text-slate-400 transition-all duration-300 focus:outline-none resize-none"
                style={FIELD_STYLE(focusedField === 'description')}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Tipo</Label>
                <select name="type" value={form.type} onChange={handleChange}
                  className="w-full border-2 p-3 rounded-2xl text-sm font-medium text-slate-700 transition-all duration-300 focus:outline-none appearance-none cursor-pointer"
                  style={FIELD_STYLE(false)}>
                  <option value="PRODUCTO">Producto</option>
                  <option value="SERVICIO">Servicio</option>
                </select>
              </div>
              <div>
                <Label>Categoría</Label>
                <select name="category" value={form.category} onChange={handleChange}
                  className="w-full border-2 p-3 rounded-2xl text-sm font-medium text-slate-700 transition-all duration-300 focus:outline-none appearance-none cursor-pointer"
                  style={FIELD_STYLE(false)}>
                  <option value="OTROS">Otros</option>
                  <option value="SEGUROS">Seguros</option>
                  <option value="PRESTAMOS">Préstamos</option>
                  <option value="TARJETAS">Tarjetas</option>
                  <option value="BENEFICIOS">Beneficios</option>
                  <option value="SERVICIOS_DIGITALES">Servicios Digitales</option>
                </select>
              </div>
            </div>

            {/* Precio */}
            <div>
              <Label>Precio (Q)</Label>
              <Input name="price" type="number" value={form.price} onChange={handleChange}
                onFocus={setFocusedField} onBlur={setFocusedField}
                placeholder="0.00" min="0" focused={focusedField} />
            </div>

            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4 space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 flex items-center gap-2">
                <span>⭐</span> Sistema de puntos
              </p>

              <div className="grid grid-cols-2 gap-3">
                {/* Puntos para canjear gratis */}
                <div>
                  <Label>Puntos para canje gratis</Label>
                  <Input name="pointsRequired" type="number" value={form.pointsRequired}
                    onChange={handleChange} onFocus={setFocusedField} onBlur={setFocusedField}
                    placeholder="0 = no canjeable" min="0" focused={focusedField} />
                  <p className="text-[10px] text-slate-400 mt-1">Puntos que necesita el cliente para obtenerlo gratis. 0 = no aplica.</p>
                </div>

                {/* Puntos que gana al comprar */}
                <div>
                  <Label>Puntos por compra con dinero</Label>
                  <Input name="pointsPerPurchase" type="number" value={form.pointsPerPurchase}
                    onChange={handleChange} onFocus={setFocusedField} onBlur={setFocusedField}
                    placeholder="5" min="0" focused={focusedField} />
                  <p className="text-[10px] text-slate-400 mt-1">Puntos que gana el cliente al comprarlo con dinero.</p>
                </div>
              </div>

              <div>
                <Label>Descuento (%) al usar puntos parciales</Label>
                <Input name="discountPercentage" type="number" value={form.discountPercentage}
                  onChange={handleChange} onFocus={setFocusedField} onBlur={setFocusedField}
                  placeholder="0" min="0" max="100" focused={focusedField} />
                <p className="text-[10px] text-slate-400 mt-1">% de descuento cuando el cliente tiene puntos pero no suficientes para canje total. 0 = no aplica.</p>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, redeemable: !p.redeemable }))}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none ${form.redeemable ? 'bg-indigo-500' : 'bg-slate-300'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${form.redeemable ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    {form.redeemable ? "Producto canjeable con puntos" : "No canjeable con puntos"}
                  </p>
                  <p className="text-[10px] text-slate-400">Si está activo, los clientes pueden obtenerlo usando sus puntos.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-7 py-5 border-t border-slate-100 bg-gradient-to-b from-slate-50/80 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${isEditing ? 'bg-amber-400' : 'bg-emerald-400'}`}
                  style={{ boxShadow: `0 0 8px ${isEditing ? 'rgba(245,158,11,0.6)' : 'rgba(34,197,94,0.6)'}` }} />
                {isEditing ? 'Modo edición activo' : 'Listo para crear'}
              </div>

              <div className="flex gap-3">
                <button onClick={onClose}
                  className="px-5 py-3 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-100 transition-all duration-300">
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !form.name || !form.description}
                  className="relative px-6 py-3 rounded-xl text-white text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  style={{
                    background: isEditing
                      ? 'linear-gradient(135deg,#f59e0b,#f97316)'
                      : 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                    boxShadow: isEditing
                      ? '0 4px 20px rgba(249,115,22,0.4)'
                      : '0 4px 20px rgba(99,102,241,0.4)'
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
