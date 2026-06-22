import { create } from "zustand";
import {
    getMyFavoritesRequest,
    addFavoriteRequest,
    updateFavoriteRequest,
    deleteFavoriteRequest,
} from "../api/bankClient";

export const useFavoriteStore = create((set, get) => ({
    favorites: [],
    isLoading: false,
    error: null,
    isSubmitting: false,
    submitError: null,

    fetchFavorites: async (token) => {
        try {
            set({ isLoading: true, error: null });

            const res = await getMyFavoritesRequest(token);
            const favorites = Array.isArray(res.data?.favorites)
                ? res.data.favorites
                : res.data?.data ?? [];

            set({ favorites, isLoading: false });

            return { success: true };
        } catch (err) {
            const message =
                err.response?.data?.message || "Error al obtener favoritos";

            set({ error: message, isLoading: false });

            return { success: false, error: message };
        }
    },

    addFavorite: async (token, data) => {
        try {
            set({ isSubmitting: true, submitError: null });

            const res = await addFavoriteRequest(token, data);
            const favorite = res.data?.favorite;

            set((state) => ({
                favorites: favorite ? [favorite, ...state.favorites] : state.favorites,
                isSubmitting: false,
            }));

            return { success: true, favorite, message: res.data?.message };
        } catch (err) {
            const message =
                err.response?.data?.message || "Error al agregar favorito";

            set({ submitError: message, isSubmitting: false });

            return { success: false, error: message };
        }
    },

    editFavorite: async (token, id, data) => {
        try {
            set({ isSubmitting: true, submitError: null });

            const res = await updateFavoriteRequest(token, id, data);
            const favorite = res.data?.favorite;

            set((state) => ({
                favorites: state.favorites.map((f) =>
                    f._id === id ? { ...f, ...(favorite ?? data) } : f
                ),
                isSubmitting: false,
            }));

            return { success: true, favorite, message: res.data?.message };
        } catch (err) {
            const message =
                err.response?.data?.message || "Error al actualizar favorito";

            set({ submitError: message, isSubmitting: false });

            return { success: false, error: message };
        }
    },

    removeFavorite: async (token, id) => {
        try {
            set({ isSubmitting: true, submitError: null });

            await deleteFavoriteRequest(token, id);

            set((state) => ({
                favorites: state.favorites.filter((f) => f._id !== id),
                isSubmitting: false,
            }));

            return { success: true };
        } catch (err) {
            const message =
                err.response?.data?.message || "Error al eliminar favorito";

            set({ submitError: message, isSubmitting: false });

            return { success: false, error: message };
        }
    },

    resetSubmitError: () => set({ submitError: null }),
}));