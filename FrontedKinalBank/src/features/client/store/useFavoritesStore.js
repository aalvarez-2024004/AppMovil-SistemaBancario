import { create } from "zustand";
import {
    getMyFavorites,
    addFavorite,
    updateFavorite,
    deleteFavorite,
} from "../../../shared/api/favorites.js";

export const useFavoritesStore = create((set, get) => ({
    favorites: [],
    loading: false,
    error: null,
    successMessage: null,

    fetchFavorites: async () => {
        set({ loading: true, error: null });
        try {
        const { data } = await getMyFavorites();
        set({ favorites: data.favorites ?? [] });
        } catch (err) {
        set({ error: err.response?.data?.message ?? "Error al cargar favoritos" });
        } finally {
        set({ loading: false });
        }
    },

    addFavorite: async (payload) => {
        set({ loading: true, error: null, successMessage: null });
        try {
        const { data } = await addFavorite(payload);
        await get().fetchFavorites();
        set({ successMessage: data.message ?? "Favorito agregado correctamente" });
        return { success: true };
        } catch (err) {
        const msg = err.response?.data?.message ?? "Error al agregar favorito";
        set({ error: msg });
        return { success: false, message: msg };
        } finally {
        set({ loading: false });
        }
    },

    updateFavorite: async (id, payload) => {
        set({ loading: true, error: null, successMessage: null });
        try {
        const { data } = await updateFavorite(id, payload);
        set((state) => ({
            favorites: state.favorites.map((f) =>
            f._id === id ? { ...f, ...data.favorite } : f
            ),
            successMessage: data.message ?? "Favorito actualizado correctamente",
        }));
        return { success: true };
        } catch (err) {
        const msg = err.response?.data?.message ?? "Error al actualizar favorito";
        set({ error: msg });
        return { success: false, message: msg };
        } finally {
        set({ loading: false });
        }
    },

    deleteFavorite: async (id) => {
        set({ loading: true, error: null, successMessage: null });
        try {
        const { data } = await deleteFavorite(id);
        set((state) => ({
            favorites: state.favorites.filter((f) => f._id !== id),
            successMessage: data.message ?? "Favorito eliminado correctamente",
        }));
        return { success: true };
        } catch (err) {
        const msg = err.response?.data?.message ?? "Error al eliminar favorito";
        set({ error: msg });
        return { success: false, message: msg };
        } finally {
        set({ loading: false });
        }
    },

    clearMessages: () => set({ error: null, successMessage: null }),
}));