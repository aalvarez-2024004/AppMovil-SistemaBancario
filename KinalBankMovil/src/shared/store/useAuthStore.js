import { create } from "zustand";

import {
  loginRequest,
  registerRequest,
  requestPasswordResetRequest,
  verifyResetCodeRequest,
  resetPasswordRequest,
  profileRequest,
  updateProfileRequest,
} from "../api/authClient";

import * as SecureStore from "expo-secure-store";

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  _hasHydrated: false,

  setHasHydrated: (state) => set({ _hasHydrated: state }),

  restoreSession: async () => {
    try {
      const token = await SecureStore.getItemAsync("refreshToken");

      if (token) {
        set({
          isAuthenticated: true,
          token,
        });
      }
    } catch (err) {
      console.log("restoreSession error:", err);
    } finally {
      set({ _hasHydrated: true });
    }
  },

  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });

      const res = await loginRequest({ email, password });
      const { user, token, refreshToken } = res.data;

      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        _hasHydrated: true,
      });

      if (refreshToken) {
        await SecureStore.setItemAsync("refreshToken", refreshToken);
      }

      return { success: true, user };
    } catch (err) {
      const message =
        err.response?.data?.message || "Error de autenticación";

      set({ error: message, isLoading: false });

      return { success: false, error: message };
    }
  },

  register: async (data) => {
    try {
      set({ isLoading: true, error: null });

      const res = await registerRequest(data);

      set({ isLoading: false });

      return { success: true, data: res.data };
    } catch (err) {
      const message =
        err.response?.data?.message || "Error en registro";

      set({ error: message, isLoading: false });

      return { success: false, error: message };
    }
  },

  requestPasswordReset: async (email) => {
    try {
      set({ isLoading: true, error: null });

      await requestPasswordResetRequest({ email });

      set({ isLoading: false });

      return { success: true };
    } catch (err) {
      const message =
        err.response?.data?.message || "Error al enviar código";

      set({ error: message, isLoading: false });

      return { success: false, error: message };
    }
  },

  verifyResetCode: async (email, code) => {
    try {
      set({ isLoading: true, error: null });

      await verifyResetCodeRequest({ email, code });

      set({ isLoading: false });

      return { success: true };
    } catch (err) {
      const message =
        err.response?.data?.message || "Código inválido";

      set({ error: message, isLoading: false });

      return { success: false, error: message };
    }
  },

  resetPassword: async (email, newPassword) => {
    try {
      set({ isLoading: true, error: null });

      await resetPasswordRequest({ email, newPassword });

      set({ isLoading: false });

      return { success: true };
    } catch (err) {
      const message =
        err.response?.data?.message || "Error al cambiar contraseña";

      set({ error: message, isLoading: false });

      return { success: false, error: message };
    }
  },

  getProfile: async () => {
    try {
      const { token } = get();

      const res = await profileRequest(token);

      set({ user: res.data.user });

      return res.data.user;
    } catch (err) {
      console.log("getProfile error:", err);
      await get().logout();
    }
  },

  updateProfile: async (data) => {
    try {
      set({ isLoading: true, error: null });

      const { token } = get();

      const res = await updateProfileRequest(data, token);

      set({
        user: res.data.user,
        isLoading: false,
      });

      return { success: true };
    } catch (err) {
      const message =
        err.response?.data?.message || "Error al actualizar perfil";

      set({ error: message, isLoading: false });

      return { success: false, error: message };
    }
  },

  logout: async () => {
    try {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });

      await SecureStore.deleteItemAsync("refreshToken");
    } catch (err) {
      console.log("logout error:", err);
    }
  },
}));