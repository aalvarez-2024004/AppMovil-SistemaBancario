import { useEffect } from "react";

export const ProductModal = ({ product, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!product) return null;
  const isServicio = product.type === "SERVICIO";

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

      {/* Overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-xl rounded-[28px] bg-white/95 backdrop-blur-md shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-[#071126] px-6 py-6 relative overflow-hidden">
          <div className="absolute top-[-80px] right-[-80px] w-60 h-60 bg-indigo-500/20 blur-3xl rounded-full" />
          <div className="absolute bottom-[-60px] left-[-40px] w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full" />

          <div className="relative flex items-start justify-between gap-4">
            <div>
              <span
                className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider border ${
                  isServicio
                    ? "bg-violet-100 text-violet-700 border-violet-200"
                    : "bg-indigo-100 text-indigo-700 border-indigo-200"
                }`}
              >
                {product.type}
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-2">{product.name}</h2>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-2xl transition"
            >
              ✕
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="px-6 py-6 space-y-6">
          <div>
            <p className="text-sm text-slate-500">{product.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">ID</span>
              <p className="text-sm font-medium text-slate-700 break-all">{product._id}</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Precio</span>
              <p className="text-lg font-extrabold text-indigo-600">
                {Number(product.price).toLocaleString("es-GT", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end bg-slate-50">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm hover:bg-slate-100 transition"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};