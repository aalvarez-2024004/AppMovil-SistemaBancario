import { create } from "zustand";
import {
    getProductsRequest,
    getMyPointsRequest,
    buyProductRequest,
    redeemProductRequest,
    buyWithDiscountRequest,
} from "../api/bankClient";

export const useProductStore = create((set, get) => ({
    products: [],
    clientPoints: 0,
    pointsHistory: [],
    isLoading: false,
    error: null,
    isSubmitting: false,
    submitError: null,
    lastSuccess: null,

    fetchProducts: async (token) => {
        try {
            set({ isLoading: true, error: null });

            const res = await getProductsRequest(token);
            const products   = res.data?.products  ?? [];
            const clientPoints = res.data?.clientPoints ?? 0;

            set({ products, clientPoints, isLoading: false });

            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || "Error al obtener productos";
            set({ error: message, isLoading: false });
            return { success: false, error: message };
        }
    },

    // ── Cargar mis puntos ────────────────────────────────────────────
    fetchMyPoints: async (token) => {
        try {
            const res = await getMyPointsRequest(token);
            set({
                clientPoints:  res.data?.points?.total   ?? 0,
                pointsHistory: res.data?.points?.history ?? [],
            });
            return { success: true };
        } catch (err) {
            return { success: false };
        }
    },

    buyProduct: async (token, productId, accountId) => {
        try {
            set({ isSubmitting: true, submitError: null, lastSuccess: null });

            const res = await buyProductRequest(token, productId, { accountId });
            const { pointsEarned, newBalance, message } = res.data;

            set((state) => ({
                clientPoints: state.clientPoints + (pointsEarned ?? 0),
                isSubmitting: false,
                lastSuccess: {
                    type: "BUY",
                    message: message || "Compra realizada",
                    pointsEarned,
                    newBalance,
                },
            }));

            return { success: true, data: res.data };
        } catch (err) {
            const message = err.response?.data?.message || "Error al comprar producto";
            set({ submitError: message, isSubmitting: false });
            return { success: false, error: message };
        }
    },

    // ── Canjear con puntos (gratis) ──────────────────────────────────
    redeemProduct: async (token, productId) => {
        try {
            set({ isSubmitting: true, submitError: null, lastSuccess: null });

            const res = await redeemProductRequest(token, productId);
            const { pointsUsed, pointsRemaining, message } = res.data;

            set({
                clientPoints: pointsRemaining ?? 0,
                isSubmitting: false,
                lastSuccess: {
                    type: "REDEEM",
                    message: message || "Canje exitoso",
                    pointsUsed,
                    pointsRemaining,
                },
            });

            return { success: true, data: res.data };
        } catch (err) {
            const message = err.response?.data?.message || "Error al canjear producto";
            set({ submitError: message, isSubmitting: false });
            return { success: false, error: message };
        }
    },

    buyWithDiscount: async (token, productId, accountId) => {
        try {
            set({ isSubmitting: true, submitError: null, lastSuccess: null });

            const res = await buyWithDiscountRequest(token, productId, { accountId });
            const { finalPrice, discountPercentage, pointsUsed, message } = res.data;

            set((state) => ({
                clientPoints: Math.max(0, state.clientPoints - (pointsUsed ?? 0)),
                isSubmitting: false,
                lastSuccess: {
                    type: "DISCOUNT",
                    message: message || "Compra con descuento exitosa",
                    finalPrice,
                    discountPercentage,
                    pointsUsed,
                },
            }));

            return { success: true, data: res.data };
        } catch (err) {
            const message = err.response?.data?.message || "Error al comprar con descuento";
            set({ submitError: message, isSubmitting: false });
            return { success: false, error: message };
        }
    },

    resetSubmitError: () => set({ submitError: null }),
    clearLastSuccess: () => set({ lastSuccess: null }),
}));