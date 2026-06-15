

export const TransferModal = ({ open, onConfirm, onCancel, data, accounts, loading }) => {
    if (!open) return null;

    const fromAcc = accounts.find(a => a._id === data.fromAccount);
    const toAcc   = accounts.find(a => a._id === data.toAccount);
    const symbol  = fromAcc?.currency === "GTQ" ? "Q" : "$";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
            onClick={onCancel}
        >
            <div
                onClick={e => e.stopPropagation()}
                className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
                style={{ animation: "modalIn 0.22s cubic-bezier(.34,1.56,.64,1)" }}
            >
                {/* Banda superior oscura */}
                <div className="bg-slate-900 px-7 pt-7 pb-6 relative overflow-hidden">
                    {/* Círculos decorativos */}
                    <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-indigo-500/10" />
                    <div className="absolute -bottom-6 right-14 w-16 h-16 rounded-full bg-indigo-500/10" />

                    <div className="flex items-center gap-3 relative">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-lg flex-shrink-0">
                            ↗️
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm">Confirmar transferencia</p>
                            <p className="text-white/40 text-[11px] mt-0.5">Revisa los detalles antes de continuar</p>
                        </div>
                    </div>

                    <div className="mt-5 text-center relative">
                        <p className="text-white/40 text-[10px] uppercase tracking-[2px] mb-1">Monto a transferir</p>
                        <p className="text-white text-5xl font-extrabold leading-none">
                            {symbol} {Number(data.amount).toLocaleString("es-GT", { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-white/30 text-xs mt-1.5">{fromAcc?.currency}</p>
                    </div>
                </div>

                {/* Cuerpo blanco */}
                <div className="bg-white px-7 py-6">
                    <div className="bg-slate-50 rounded-xl px-4 py-3 space-y-3 mb-4">
                        {[
                            { label: "Cuenta origen",  val: fromAcc?.accountNumber },
                            { label: "Cuenta destino", val: toAcc?.accountNumber },
                            data.description ? { label: "Descripción", val: data.description } : null,
                        ].filter(Boolean).map((row, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <span className="text-[11px] text-slate-400">{row.label}</span>
                                <span className="text-xs font-semibold text-slate-700 font-mono">{row.val}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-[11px] text-slate-300 mb-5">
                        Esta acción es inmediata y no se puede deshacer.
                    </p>

                    <div className="flex gap-3">
                        <button
                            onClick={onCancel}
                            className="flex-1 border border-slate-200 text-slate-500 text-sm font-semibold py-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="flex-1 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white text-sm font-bold py-3 rounded-xl transition-colors cursor-pointer disabled:cursor-not-allowed"
                        >
                            {loading ? "Procesando…" : "Confirmar →"}
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes modalIn {
                    from { opacity: 0; transform: scale(.93) translateY(14px); }
                    to   { opacity: 1; transform: scale(1)   translateY(0); }
                }
            `}</style>
        </div>
    );
};
