import { create } from "zustand";
import {
  getMyTransactionsRequest,
  getMyAccountsRequest,
  createTransactionRequest,
} from "../api/bankClient";

export const useTransactionStore = create((set, get) => ({
  transactions: [],
  accounts: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalRecords: 0,
  hasMore: true,

  isSubmitting: false,
  submitError: null,

  fetchTransactions: async (token, page = 1, limit = 10) => {
    try {
      set({ isLoading: true, error: null });

      const res = await getMyTransactionsRequest(token, page, limit);

      const { data: transactions, pagination } = res.data;

      set((state) => ({
        transactions:
          page === 1
            ? transactions
            : [...state.transactions, ...transactions],
        currentPage: pagination.currentPage,
        totalPages: pagination.totalPages,
        totalRecords: pagination.totalRecords,
        hasMore: pagination.currentPage < pagination.totalPages,
        isLoading: false,
      }));

      return { success: true };
    } catch (err) {
      const message =
        err.response?.data?.message || "Error al obtener transacciones";

      set({ error: message, isLoading: false });

      return { success: false, error: message };
    }
  },

  fetchMyAccounts: async (token) => {
    try {
      const res = await getMyAccountsRequest(token);
      console.log("RAW res.data en fetchMyAccounts:", JSON.stringify(res.data, null, 2));
      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.accounts ?? res.data?.data ?? [];
      console.log("Accounts extraídas:", JSON.stringify(data, null, 2));
      set({ accounts: data });
      return { success: true };
    } catch (err) {
      const message =
        err.response?.data?.message || "Error al obtener cuentas";
      set({ error: message });
      return { success: false, error: message };
    }
  },

  loadMore: async (token) => {
    const { currentPage, totalPages, isLoading } = get();

    if (isLoading || currentPage >= totalPages) return;

    await get().fetchTransactions(token, currentPage + 1);
  },

  createTransaction: async (token, payload) => {
    try {
      set({ isSubmitting: true, submitError: null });

      const res = await createTransactionRequest(token, payload);
      const transaction = res.data?.transaction;

      set((state) => ({
        transactions: transaction
          ? [transaction, ...state.transactions]
          : state.transactions,
        totalRecords: state.totalRecords + (transaction ? 1 : 0),
        isSubmitting: false,
      }));

      return { success: true, transaction, message: res.data?.message };
    } catch (err) {
      const message =
        err.response?.data?.message || "Error al realizar la transacción";

      set({ submitError: message, isSubmitting: false });

      return { success: false, error: message };
    }
  },

  resetSubmitError: () => set({ submitError: null }),

  resetTransactions: () =>
    set({
      transactions: [],
      currentPage: 1,
      totalPages: 1,
      totalRecords: 0,
      hasMore: true,
      error: null,
    }),
}));