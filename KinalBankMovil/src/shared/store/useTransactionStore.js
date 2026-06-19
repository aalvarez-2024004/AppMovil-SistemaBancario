import { create } from "zustand";
import { getMyTransactionsRequest } from "../api/bankClient";

export const useTransactionStore = create((set, get) => ({
  transactions: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  hasMore: true,

  fetchTransactions: async (token, page = 1, limit = 10) => {
    try {
      set({ isLoading: true, error: null });

      const res = await getMyTransactionsRequest(token, page, limit);

      const { transactions, totalPages } = res.data;

      set((state) => ({
        transactions: page === 1 ? transactions : [...state.transactions, ...transactions],
        currentPage: page,
        totalPages,
        hasMore: page < totalPages,
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

  loadMore: async (token) => {
    const { currentPage, totalPages, isLoading } = get();

    if (isLoading || currentPage >= totalPages) return;

    await get().fetchTransactions(token, currentPage + 1);
  },

  resetTransactions: () =>
    set({
      transactions: [],
      currentPage: 1,
      totalPages: 1,
      hasMore: true,
      error: null,
    }),
}));