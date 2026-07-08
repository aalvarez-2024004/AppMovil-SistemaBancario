import { useEffect, useState } from "react";
import { useDepositStore } from "../store/useDepositStore.js";
import { useAccountsStore } from "../store/useAccountStore.js";

const CURRENCY_SYMBOLS = { GTQ: "Q", USD: "$", EUR: "€" };

export const DepositModal = () => {

    const { createDeposit, getDeposits } = useDepositStore();
    const { accounts, fetchAccounts } = useAccountsStore();

    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        accountId: "",
        amount: "",
        currency: "GTQ"
    });

    useEffect(() => {
        fetchAccounts();
    }, []);

    const handleInputChange = ({ target }) => {
        const { name, value } = target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.accountId || !formData.amount) {
            alert("Completa todos los campos");
            return;
        }

        try {

            await createDeposit({
                ...formData,
                amount: Number(formData.amount)
            });

            await getDeposits();

            setFormData({
                accountId: "",
                amount: "",
                currency: "GTQ"
            });

            setIsOpen(false);

            alert("Depósito realizado correctamente");

        } catch (error) {
            console.log(error);

            alert("Error al realizar depósito");
        }
    };

    const currentSymbol = CURRENCY_SYMBOLS[formData.currency] ?? "Q";

    return (
  <>
    {/* Trigger Button */}
    <button
      onClick={() => setIsOpen(true)}
      className="w-full sm:w-auto bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
    >
      + Nuevo Depósito
    </button>

    {/* Modal */}
    {isOpen && (
      <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center sm:px-4">
        
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Modal Card */}
        <div className="relative w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 max-h-[92vh] sm:max-h-[90vh] flex flex-col">

          {/* Top Accent Bar */}
          <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 flex-shrink-0" />

          <div className="p-5 sm:p-7 overflow-y-auto flex-1 min-h-0">

            {/* Header */}
            <div className="flex items-start justify-between mb-6 gap-3">

              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Nuevo Depósito
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Agrega fondos a una cuenta bancaria
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all flex-shrink-0"
              >
                ✕
              </button>

            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Cuenta */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Cuenta
                </label>

                <select
                  name="accountId"
                  value={formData.accountId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none transition-all"
                >
                  <option value="">Selecciona una cuenta</option>

                  {accounts?.map((account) => (
                    <option key={account._id} value={account._id}>
                      {account.accountNumber}
                    </option>
                  ))}
                </select>
              </div>

              {/* Monto */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Monto
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold pointer-events-none">
                    {currentSymbol}
                  </span>

                  <input
                    type="number"
                    name="amount"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Moneda */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Moneda
                </label>

                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                >
                  <option value="GTQ">GTQ</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4">

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-all"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-slate-900 to-slate-700 text-white font-semibold hover:shadow-lg active:scale-[0.98] transition-all"
                >
                  Realizar Depósito
                </button>

              </div>

            </form>

          </div>
        </div>
      </div>
    )}
  </>
);
};