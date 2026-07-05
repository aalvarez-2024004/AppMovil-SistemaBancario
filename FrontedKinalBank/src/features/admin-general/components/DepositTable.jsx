import { useDepositStore } from "../store/useDepositStore.js";

const CURRENCY_SYMBOLS = { GTQ: "Q", USD: "$", EUR: "€" };

const formatMonto = (deposit) => {
    const symbol = CURRENCY_SYMBOLS[deposit.currency] ?? "Q"; 
    return `${symbol} ${Number(deposit.amount).toLocaleString("es-GT", { minimumFractionDigits: 2 })}`;
};
export const DepositTable = ({ deposits }) => {

    const {
        revertDeposit,
        deleteDeposit,
        getDeposits
    } = useDepositStore();

    const handleRevert = async (id) => {

        const confirmAction = window.confirm(
            "¿Deseas revertir este depósito?"
        );

        if (!confirmAction) return;

        try {

            await revertDeposit(id);

            await getDeposits();

            alert("Depósito revertido correctamente");

        } catch (error) {

            console.log(error);

            alert("Error al revertir depósito");
        }
    };

    const handleDelete = async (id) => {

        const confirmAction = window.confirm(
            "¿Deseas eliminar este depósito?"
        );

        if (!confirmAction) return;

        try {

            await deleteDeposit(id);

            await getDeposits();

            alert("Depósito eliminado");

        } catch (error) {

            console.log(error);

            alert("Error al eliminar depósito");
        }
    };

    return (
        <div className="overflow-x-auto">

            <table className="w-full border-collapse">

                <thead>

                    <tr className="border-b border-slate-200">

                        <th className="text-left py-4 px-4 text-sm font-semibold text-slate-600">
                            Cuenta
                        </th>

                        <th className="text-left py-4 px-4 text-sm font-semibold text-slate-600">
                            Monto
                        </th>

                        <th className="text-left py-4 px-4 text-sm font-semibold text-slate-600">
                            Estado
                        </th>

                        <th className="text-left py-4 px-4 text-sm font-semibold text-slate-600">
                            Fecha
                        </th>

                        <th className="text-center py-4 px-4 text-sm font-semibold text-slate-600">
                            Acciones
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        deposits?.length > 0 ? (
                            deposits.map((deposit) => {

                                const isCompleted =
                                    deposit.estado === "COMPLETADO";

                                return (
                                    <tr
                                        key={deposit._id}
                                        className="border-b border-slate-100 hover:bg-slate-50 transition-all"
                                    >

                                        {/* Cuenta */}
                                        <td className="py-4 px-4">

                                            <div>
                                                <p className="font-semibold text-slate-800">
                                                    {deposit.accountNumber}
                                                </p>

                                                <p className="text-xs text-slate-400">
                                                    {deposit.accountId}
                                                </p>
                                            </div>

                                        </td>

                                        {/* Monto */}
                                        <td className="py-4 px-4">

                                            <span className="font-bold text-slate-800">
                                                {formatMonto(deposit)}
                                            </span>

                                        </td>

                                        {/* Estado */}
                                        <td className="py-4 px-4">

                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${isCompleted
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-600"
                                                    }`}
                                            >
                                                {deposit.estado}
                                            </span>

                                        </td>

                                        {/* Fecha */}
                                        <td className="py-4 px-4 text-sm text-slate-600">

                                            {
                                                new Date(
                                                    deposit.fecha
                                                ).toLocaleString()
                                            }

                                        </td>

                                        {/* Acciones */}
                                        <td className="py-4 px-4">

                                            <div className="flex items-center justify-center gap-2">

                                                {
                                                    deposit.estado !== "REVERTIDO" && (
                                                        <button
                                                            onClick={() =>
                                                                handleRevert(
                                                                    deposit._id
                                                                )
                                                            }
                                                            className="bg-amber-100 hover:bg-amber-200 text-amber-700 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                                                        >
                                                            Revertir
                                                        </button>
                                                    )
                                                }

                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            deposit._id
                                                        )
                                                    }
                                                    className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                                                >
                                                    Eliminar
                                                </button>

                                            </div>

                                        </td>

                                    </tr>
                                );
                            })
                        ) : (
                            <tr>

                                <td
                                    colSpan="5"
                                    className="text-center py-10 text-slate-500"
                                >
                                    No hay depósitos registrados
                                </td>

                            </tr>
                        )
                    }

                </tbody>

            </table>

        </div>
    );
};