export const DepositCard = ({ deposit }) => {

    const isCompleted = deposit.estado === "COMPLETADO";

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">

            
            <div className="flex items-center justify-between mb-4">

                <div>
                    <p className="text-sm text-slate-500">
                        Cuenta
                    </p>

                    <h2 className="text-lg font-bold text-slate-800">
                        {deposit.accountNumber}
                    </h2>
                </div>

                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${isCompleted
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                >
                    {deposit.estado}
                </span>

            </div>

        
            <div className="mb-4">

                <p className="text-sm text-slate-500 mb-1">
                    Monto
                </p>

                <h1 className="text-3xl font-bold text-slate-800">
                    Q {deposit.amount}
                </h1>

            </div>

            <div className="mb-5">

                <p className="text-sm text-slate-500 mb-1">
                    Fecha
                </p>

                <p className="text-sm text-slate-700">
                    {new Date(deposit.fecha).toLocaleString()}
                </p>

            </div>

            <div className="border-t border-slate-100 pt-4 flex items-center justify-between">

                <div>
                    <p className="text-xs text-slate-400">
                        ID Cuenta
                    </p>

                    <p className="text-xs font-medium text-slate-600 truncate w-36">
                        {deposit.accountId}
                    </p>
                </div>

                <div className="text-2xl">
                    💰
                </div>

            </div>

        </div>
    );
};