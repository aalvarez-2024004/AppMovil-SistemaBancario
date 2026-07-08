const TrashIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
    </svg>
);

const WarningIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    </svg>
);

const XIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6L6 18" />
        <path d="M6 6l12 12" />
    </svg>
);

const LoadingSpinner = () => (
    <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
);

export const ConfirmModal = ({ account, onClose, onConfirm, loading }) => (
    <div
        className="fixed inset-0 flex items-center justify-center z-[200] p-4"
        onClick={onClose}
    >
        <div
            className="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-black/50 to-gray-900/60 backdrop-blur-sm"
            style={{
                animation: 'overlayFadeIn 0.2s ease-out'
            }}
        />

        <div
            className="relative bg-white rounded-2xl w-full max-w-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.35), 0 0 40px -10px rgba(239, 68, 68, 0.2)',
                animation: 'modalSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
        >
            <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                    background: 'linear-gradient(90deg, #f87171, #ef4444, #dc2626, #b91c1c, #ef4444)',
                    backgroundSize: '200% 100%',
                    animation: 'gradientShift 3s ease infinite'
                }}
            />

            {/* Botón cerrar */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200 z-10"
                style={{ transition: 'transform 0.3s ease, background-color 0.2s, color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(90deg)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
            >
                <XIcon />
            </button>

            <div className="relative pt-8 pb-7 px-7 text-center">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-40"
                        style={{
                            background: 'radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%)',
                            filter: 'blur(20px)'
                        }}
                    />
                    <div
                        className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full opacity-30"
                        style={{
                            background: 'radial-gradient(circle, rgba(251, 146, 60, 0.3) 0%, transparent 70%)',
                            filter: 'blur(20px)'
                        }}
                    />
                    {/* Patrón de puntos sutil */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                            backgroundSize: '16px 16px'
                        }}
                    />
                </div>

                <div className="relative mb-5">
                    <div
                        className="mx-auto w-20 h-20 rounded-2xl flex items-center justify-center text-white relative overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, #f87171 0%, #ef4444 50%, #dc2626 100%)',
                            boxShadow: '0 10px 30px -5px rgba(239, 68, 68, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
                            animation: 'iconPulse 2s ease-in-out infinite'
                        }}
                    >
                        <div
                            className="absolute inset-0 opacity-30"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)'
                            }}
                        />
                        {/* Animación shake en el icono */}
                        <div style={{ animation: 'iconShake 0.5s ease-in-out 0.3s' }}>
                            <TrashIcon />
                        </div>
                    </div>

                    {/* Anillo decorativo pulsante */}
                    <div
                        className="absolute inset-0 mx-auto w-20 h-20 rounded-2xl"
                        style={{
                            border: '2px solid rgba(239, 68, 68, 0.3)',
                            animation: 'ringPulse 2s ease-in-out infinite'
                        }}
                    />
                </div>

                {/* Título */}
                <h3 className="font-bold text-lg text-gray-900 mb-2 tracking-tight">
                    Eliminar cuenta
                </h3>

                {/* Badge de advertencia */}
                <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium mb-4"
                    style={{
                        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                        color: '#92400e',
                        boxShadow: '0 2px 8px -2px rgba(245, 158, 11, 0.3)'
                    }}
                >
                    <WarningIcon />
                    Acción irreversible
                </div>

                {/* Descripción */}
                <p className="text-sm text-gray-500 mb-2 leading-relaxed">
                    ¿Seguro que deseas eliminar la cuenta
                </p>

                {/* Número de cuenta destacado */}
                <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-4"
                    style={{
                        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                        border: '1px solid #e2e8f0',
                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
                    }}
                >
                    <span
                        className="font-mono font-bold text-base"
                        style={{
                            background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        {account.accountNumber}
                    </span>
                </div>

                <p className="text-xs text-gray-400 mb-6">
                    Esta acción no se puede deshacer y se perderán todos los datos asociados.
                </p>

                {/* Separador decorativo */}
                <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-200" />
                    <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-300" />
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        <div className="w-1.5 h-1.5 rounded-full bg-red-300" />
                    </div>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-200" />
                </div>

                {/* Botones */}
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={onClose}
                        className="relative px-6 py-2.5 rounded-xl text-sm font-medium text-gray-700 overflow-hidden group"
                        style={{
                            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px -4px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 8px -2px rgba(0, 0, 0, 0.1)';
                        }}
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="relative px-6 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                        style={{
                            background: loading
                                ? 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)'
                                : 'linear-gradient(135deg, #f87171 0%, #ef4444 50%, #dc2626 100%)',
                            boxShadow: '0 4px 15px -3px rgba(239, 68, 68, 0.5)',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 8px 25px -4px rgba(239, 68, 68, 0.6)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 15px -3px rgba(239, 68, 68, 0.5)';
                        }}
                    >
                        {!loading && (
                            <div
                                className="absolute inset-0 opacity-30"
                                style={{
                                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                                    backgroundSize: '200% 100%',
                                    animation: 'shimmer 2s infinite'
                                }}
                            />
                        )}
                        {loading ? (
                            <>
                                <LoadingSpinner />
                                <span>Eliminando...</span>
                            </>
                        ) : (
                            'Eliminar'
                        )}
                    </button>
                </div>
            </div>

            <style>{`
        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes iconPulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 10px 30px -5px rgba(239, 68, 68, 0.5), inset 0 1px 0 rgba(255,255,255,0.2);
          }
          50% { 
            transform: scale(1.02);
            box-shadow: 0 15px 40px -5px rgba(239, 68, 68, 0.6), inset 0 1px 0 rgba(255,255,255,0.2);
          }
        }
        
        @keyframes iconShake {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(-8deg); }
          40% { transform: rotate(8deg); }
          60% { transform: rotate(-5deg); }
          80% { transform: rotate(5deg); }
        }
        
        @keyframes ringPulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.5;
          }
          50% { 
            transform: scale(1.15);
            opacity: 0;
          }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
        </div>
    </div>
);