import { create } from "zustand";
import {
  getPendingUsers as apiGetPending,
  approveUser    as apiApprove,
  denyUser       as apiDeny,
} from "../../../shared/api/users.js";

export const useUsersStore = create((set) => ({
  pendingUsers: [],
  loading: false,
  error: null,

  clearError: () => set({ error: null }),

  getPendingUsers: async () => {
    set({ loading: true, error: null });
    try {
      const res = await apiGetPending();
      set({ pendingUsers: res.data.users ?? [] });
    } catch (err) {
      set({ error: err.response?.data?.message ?? "Error al cargar solicitudes" });
    } finally {
      set({ loading: false });
    }
  },

  approveUser: async (userId, role) => {
    set({ loading: true, error: null });
    try {
      await apiApprove(userId, role);
      set((s) => ({
        pendingUsers: s.pendingUsers.filter((u) => u.Id !== userId),
      }));
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message ?? "Error al aprobar usuario";
      set({ error: message });
      return { success: false, message };
    } finally {
      set({ loading: false });
    }
  },

  denyUser: async (userId) => {
    set({ loading: true, error: null });
    try {
      await apiDeny(userId);
      // Quitar al usuario denegado de la lista local
      set((s) => ({
        pendingUsers: s.pendingUsers.filter((u) => u.Id !== userId),
      }));
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message ?? "Error al denegar usuario";
      set({ error: message });
      return { success: false, message };
    } finally {
      set({ loading: false });
    }
  },
}));