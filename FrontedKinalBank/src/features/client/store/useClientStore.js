import { create } from "zustand";
import {
    makeTransfer,
    getTransactionById,
    getMyTransactions
} from "../../../shared/api/transactions.js";
import { getMyAccounts } from "../../../shared/api/client.js";
import { getMyDeposits } from "../../../shared/api/deposits.js";
 
export const useClientStore = create((set, get) => ({
    accounts: [],
    transactions: [],
    deposits: [], 
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalRecords: 0,
        limit: 10,
    },
 
    loading: false,
    loadingTransfer: false,
 
    error: null,
    transferError: null,
    transferSuccess: null,
 
    fetchMyAccounts: async () => {
        set({ loading: true, error: null });
 
        try {
            const { data } = await getMyAccounts();
 
            set({
                accounts: data.data ?? [],
            });
 
        } catch (err) {
            set({
                error:
                    err.response?.data?.message ??
                    "Error al cargar cuentas",
            });
        } finally {
            set({ loading: false });
        }
    },

    fetchMyDeposits: async (accountId) => {  
        set({ loading: true, error: null });
        try {
            const { data } = await getMyDeposits(accountId);
            set({ deposits: data.deposits ?? [] });
        } catch (err) {
            set({ error: err.response?.data?.message ?? "Error al cargar depósitos" });
        } finally {
            set({ loading: false });
        }
    },
 
    fetchMyTransactions: async (page = 1) => {
        set({ loading: true, error: null });
 
        try {
            const { data } = await getMyTransactions(page);
 
            set({
                transactions: data.data ?? [],
                pagination: data.pagination ?? get().pagination,
            });
 
        } catch (err) {
            set({
                error:
                    err.response?.data?.message ??
                    "Error al cargar movimientos",
            });
        } finally {
            set({ loading: false });
        }
    },
 
    transfer: async (payload) => {
        set({
            loadingTransfer: true,
            transferError: null,
            transferSuccess: null,
        });
 
        try {
            const { data } = await makeTransfer(payload);
 
            set({
                    transferSuccess:
                        data.message ??
                        "Transferencia realizada exitosamente",
                });
    
                // refresca cuentas y movimientos después de transferir
                await Promise.all([
                    get().fetchMyAccounts(),
                    get().fetchMyTransactions(get().pagination.currentPage),
                ]);
    
                return { success: true };
 
        } catch (err) {
            const msg =
                err.response?.data?.message ??
                "Error al realizar la transferencia";
 
            set({
                transferError: msg,
            });
 
            return { success: false, message: msg };
 
        } finally {
            set({ loadingTransfer: false });
        }
    },
 
    getTransactionById: async (id) => {
        try {
            const { data } = await getTransactionById(id);
            return data;
        } catch (err) {
            return {
                success: false,
                message:
                    err.response?.data?.message ??
                    "Error al obtener transacción",
            };
        }
    },
 
    clearTransferState: () =>
        set({ transferError: null, transferSuccess: null }),
 
    clearError: () => set({ error: null }),
}));