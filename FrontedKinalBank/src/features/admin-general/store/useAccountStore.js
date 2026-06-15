// front/src/features/admin-general/store/accountsStore.js
import { create } from "zustand";
import {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
} from "../../../shared/api/accounts.js";

export const useAccountsStore = create((set, get) => ({
  accounts: [],
  pagination: { currentPage: 1, totalPages: 1, totalRecords: 0, limit: 15 },
  loading: false,
  error: null,

  // ── Listar ──────────────────────────────────────────────
  fetchAccounts: async (page = 1, limit = 15) => {
    set({ loading: true, error: null });
    try {
      const { data } = await getAccounts(page, limit);
      console.log(data);
      set({ accounts: data.data, pagination: data.pagination });
    } catch (err) {
      set({ error: err.response?.data?.message ?? "Error al cargar cuentas" });
    } finally {
      set({ loading: false });
    }
  },

  // ── Crear ───────────────────────────────────────────────
  addAccount: async (payload) => {
    set({ loading: true, error: null });
    try {
      const { data } = await createAccount(payload);
      // Recargar lista desde el inicio
      await get().fetchAccounts(1);
      return { success: true, data: data.data };
    } catch (err) {
      const msg = err.response?.data?.message ?? "Error al crear cuenta";
      set({ error: msg });
      return { success: false, message: msg };
    } finally {
      set({ loading: false });
    }
  },

  // ── Actualizar ──────────────────────────────────────────
  editAccount: async (id, payload) => {
    set({ loading: true, error: null });
    try {
      const { data } = await updateAccount(id, payload);
      set((state) => ({
        accounts: state.accounts.map((a) =>
          a._id === id ? data.data : a
        ),
      }));
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message ?? "Error al actualizar cuenta";
      set({ error: msg });
      return { success: false, message: msg };
    } finally {
      set({ loading: false });
    }
  },

  // ── Eliminar ────────────────────────────────────────────
  removeAccount: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteAccount(id);
      set((state) => ({
        accounts: state.accounts.filter((a) => a._id !== id),
      }));
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message ?? "Error al eliminar cuenta";
      set({ error: msg });
      return { success: false, message: msg };
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
