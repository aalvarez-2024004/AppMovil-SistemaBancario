import { create } from "zustand";

import {
    getDeposits,
    createDeposit,
    revertDeposit,
    deleteDeposit,
    getDepositById,
    updateDeposit,
    getMyDeposits  // 👈 nueva
} from "../../../shared/api/deposits.js";

export const useDepositStore = create((set, get) => ({

    deposits: [],
    myDeposits: [],        // 👈 nuevo
    selectedDeposit: null,
    isLoading: false,

    getDeposits: async () => {
        try {
            set({ isLoading: true });
            const response = await getDeposits();
            if (response.data.success) {
                set({ deposits: response.data.deposits });
            }
        } catch (error) {
            console.log("ERROR GET DEPOSITS:", error);
        } finally {
            set({ isLoading: false });
        }
    },

    // 👇 nueva función para el cliente
    fetchMyDeposits: async (accountId) => {
        try {
            set({ isLoading: true });
            const response = await getMyDeposits(accountId);
            if (response.data.success) {
                set({ myDeposits: response.data.deposits });
            }
        } catch (error) {
            console.log("ERROR GET MY DEPOSITS:", error);
        } finally {
            set({ isLoading: false });
        }
    },

    createDeposit: async (data) => {
        try {
            set({ isLoading: true });
            const response = await createDeposit(data);
            if (response.data.success) {
                await get().getDeposits();
            }
            return response.data;
        } catch (error) {
            console.log("ERROR CREATE DEPOSIT:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    revertDeposit: async (id) => {
        try {
            set({ isLoading: true });
            const response = await revertDeposit(id);
            if (response.data.success) {
                await get().getDeposits();
            }
            return response.data;
        } catch (error) {
            console.log("ERROR REVERT DEPOSIT:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    deleteDeposit: async (id) => {
        try {
            set({ isLoading: true });
            const response = await deleteDeposit(id);
            if (response.data.success) {
                await get().getDeposits();
            }
            return response.data;
        } catch (error) {
            console.log("ERROR DELETE DEPOSIT:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    getDepositById: async (id) => {
        try {
            set({ isLoading: true });
            const response = await getDepositById(id);
            if (response.data.success) {
                set({ selectedDeposit: response.data.data });
            }
            return response.data;
        } catch (error) {
            console.log("ERROR GET DEPOSIT BY ID:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    updateDeposit: async (id, data) => {
        try {
            set({ isLoading: true });
            const response = await updateDeposit(id, data);
            if (response.data.success) {
                await get().getDeposits();
            }
            return response.data;
        } catch (error) {
            console.log("ERROR UPDATE DEPOSIT:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    }

}));