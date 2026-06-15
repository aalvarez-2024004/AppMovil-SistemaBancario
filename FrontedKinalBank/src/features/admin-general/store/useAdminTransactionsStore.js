import { create } from "zustand";
import {
    getAccountsByActivity,
    getAccountTransactions,
} from "../../../shared/api/transactions.js";

export const useAdminTransactionsStore = create((set) => ({
    accountsByActivity: [],
    accountTransactions: [],
    order: "desc",
    loading: false,
    loadingTransactions: false,
    error: null,

    fetchAccountsByActivity: async (order = "desc") => {
        set({ loading: true, error: null, order });
        try {
            const { data } = await getAccountsByActivity(order);
            set({ accountsByActivity: data.data ?? [] });
        } catch (err) {
            set({ error: err.response?.data?.message ?? "Error al cargar actividad" });
        } finally {
            set({ loading: false });
        }
    },

    fetchAccountTransactions: async (accountId) => {
        set({ loadingTransactions: true, accountTransactions: [] });
        try {
            const { data } = await getAccountTransactions(accountId, 5);
            set({ accountTransactions: data.data ?? [] });
        } catch (err) {
            set({ error: err.response?.data?.message ?? "Error al cargar movimientos" });
        } finally {
            set({ loadingTransactions: false });
        }
    },

    clearError: () => set({ error: null }),
}));