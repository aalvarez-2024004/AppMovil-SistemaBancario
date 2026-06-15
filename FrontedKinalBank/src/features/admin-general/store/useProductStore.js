// front/src/features/admin-general/store/productStore.js
import { create } from "zustand";
import {
  createProduct as apiCreateProduct,
  getProducts as apiGetProducts,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct
} from "../../../shared/api/products.js";

export const useProductsStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  successMessage: null,

  // ── Listar productos ───────────────────────────────────
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiGetProducts();
      set({ products: data.products ?? [] });
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message ?? "Error al cargar productos";
      set({ error: msg });
      return { success: false, message: msg };
    } finally {
      set({ loading: false });
    }
  },

  // ── Crear producto ─────────────────────────────────────
  createProduct: async (payload) => {
    set({ loading: true, error: null, successMessage: null });
    try {
      await apiCreateProduct(payload);
      await get().fetchProducts();
      set({ successMessage: "Producto creado correctamente" });
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message ?? "Error al crear producto";
      set({ error: msg });
      return { success: false, message: msg };
    } finally {
      set({ loading: false });
    }
  },

  // ── Actualizar producto ───────────────────────────────
  updateProduct: async (id, payload) => {
    set({ loading: true, error: null, successMessage: null });
    try {
      await apiUpdateProduct(id, payload);
      await get().fetchProducts();
      set({ successMessage: "Producto actualizado correctamente" });
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message ?? "Error al actualizar producto";
      set({ error: msg });
      return { success: false, message: msg };
    } finally {
      set({ loading: false });
    }
  },

  // ── Eliminar producto ──────────────────────────────────
  deleteProduct: async (id) => {
    set({ loading: true, error: null, successMessage: null });
    try {
      await apiDeleteProduct(id);
      await get().fetchProducts();
      set({ successMessage: "Producto eliminado correctamente" });
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message ?? "Error al eliminar producto";
      set({ error: msg });
      return { success: false, message: msg };
    } finally {
      set({ loading: false });
    }
  }
}));