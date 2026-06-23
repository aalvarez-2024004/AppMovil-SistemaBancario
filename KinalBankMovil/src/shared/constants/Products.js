import { StyleSheet, Platform } from "react-native";

export const COLORS = {
    bg: "#F8F9FB",
    bgCard: "#FFFFFF",
    bgCardAlt: "#EAF1FC",
    navy: "#0F1F3D",
    accent: "#3B7DD8",
    accentLight: "#7DAEF0",

    // Estados del producto según puntos
    free: "#10B981",           // verde: canjeable gratis
    freeLight: "rgba(16,185,129,0.12)",
    discount: "#F59E0B",       // amarillo: tiene descuento
    discountLight: "rgba(245,158,11,0.12)",
    paid: "#6366F1",           // morado: solo con dinero
    paidLight: "rgba(99,102,241,0.10)",

    success: "#10B981",
    successLight: "rgba(16,185,129,0.12)",
    danger: "#EF4444",
    dangerLight: "rgba(239,68,68,0.10)",

    textPrimary: "#1A2333",
    textSecondary: "#6B7280",
    textMuted: "#9CA3AF",
    border: "#EEF1F5",
    borderLight: "#E2E8F0",
};

// Mapeo de categorías a ícono de Ionicons
export const CATEGORY_ICONS = {
    SEGUROS:             "shield-checkmark-outline",
    PRESTAMOS:           "cash-outline",
    TARJETAS:            "card-outline",
    BENEFICIOS:          "gift-outline",
    SERVICIOS_DIGITALES: "phone-portrait-outline",
    OTROS:               "grid-outline",
};

export const CATEGORY_LABELS = {
    SEGUROS:             "Seguros",
    PRESTAMOS:           "Préstamos",
    TARJETAS:            "Tarjetas",
    BENEFICIOS:          "Beneficios",
    SERVICIOS_DIGITALES: "Digital",
    OTROS:               "Otros",
};

const cardShadow = {
    shadowColor: "#0F1F3D",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
};

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0F1F3D" },
    scrollContent: { paddingBottom: 48 },

    // ── Hero ──────────────────────────────────────────────────────────
    hero: {
        paddingHorizontal: 20,
        paddingTop: Platform.OS === "ios" ? 56 : 40,
        paddingBottom: 28,
    },
    heroLabel: {
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 2.5,
        color: "#7DAEF0",
        marginBottom: 6,
        textTransform: "uppercase",
    },
    heroTitle: {
        fontSize: 30,
        fontWeight: "800",
        color: "#FFFFFF",
        lineHeight: 34,
    },
    heroTitleAccent: { color: "#7DAEF0" },
    heroSubtitle: {
        fontSize: 13,
        color: "rgba(255,255,255,0.55)",
        marginTop: 8,
    },

    // ── Puntos banner ─────────────────────────────────────────────────
    pointsBanner: {
        marginHorizontal: 20,
        marginTop: 12,
        borderRadius: 16,
        backgroundColor: "rgba(59,125,216,0.18)",
        borderWidth: 1,
        borderColor: "rgba(59,125,216,0.30)",
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    pointsIconBox: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#3B7DD8",
        justifyContent: "center",
        alignItems: "center",
    },
    pointsBannerTitle: {
        fontSize: 13,
        color: "rgba(255,255,255,0.65)",
        marginBottom: 2,
    },
    pointsBannerValue: {
        fontSize: 22,
        fontWeight: "800",
        color: "#FFFFFF",
    },
    pointsBannerSub: {
        fontSize: 11,
        color: "#7DAEF0",
        marginTop: 1,
    },

    // ── Filter tabs ───────────────────────────────────────────────────
    filterRow: {
        flexDirection: "row",
        paddingHorizontal: 20,
        gap: 8,
        marginTop: 16,
        marginBottom: 4,
    },
    filterTab: {
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.08)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.10)",
    },
    filterTabActive: {
        backgroundColor: "#3B7DD8",
        borderColor: "#3B7DD8",
    },
    filterTabText: {
        fontSize: 12,
        fontWeight: "600",
        color: "rgba(255,255,255,0.55)",
    },
    filterTabTextActive: {
        color: "#FFFFFF",
    },

    // ── Content area (white) ──────────────────────────────────────────
    content: { flex: 1, backgroundColor: COLORS.bg },
    scrollContentInner: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 48 },

    sectionLabel: {
        fontSize: 12,
        fontWeight: "700",
        letterSpacing: 1.5,
        textTransform: "uppercase",
        color: COLORS.textMuted,
        marginBottom: 12,
        marginTop: 4,
    },

    // ── Product card ──────────────────────────────────────────────────
    productCard: {
        backgroundColor: COLORS.bgCard,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: "hidden",
        ...cardShadow,
    },
    productCardTop: {
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 16,
        gap: 12,
    },
    categoryIconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    productMeta: { flex: 1 },
    productName: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.textPrimary,
        marginBottom: 3,
    },
    productDesc: {
        fontSize: 12,
        color: COLORS.textSecondary,
        lineHeight: 17,
    },

    // Tipo badge
    typeBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        alignSelf: "flex-start",
        marginTop: 6,
    },
    typeBadgeText: {
        fontSize: 10,
        fontWeight: "700",
        letterSpacing: 0.5,
    },

    // Price row
    productCardBottom: {
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
    priceBlock: { flex: 1 },
    price: {
        fontSize: 18,
        fontWeight: "800",
        color: COLORS.textPrimary,
    },
    priceOriginal: {
        fontSize: 13,
        color: COLORS.textMuted,
        textDecorationLine: "line-through",
    },
    priceFree: {
        fontSize: 18,
        fontWeight: "800",
        color: COLORS.free,
    },
    pointsTag: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    pointsTagText: {
        fontSize: 11,
        fontWeight: "700",
        color: COLORS.accent,
    },

    // Action button on card
    cardActionBtn: {
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    cardActionText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#FFFFFF",
    },

    // ── Modal ─────────────────────────────────────────────────────────
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.55)",
        justifyContent: "flex-end",
    },
    modalSheet: {
        backgroundColor: COLORS.bgCard,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: Platform.OS === "ios" ? 40 : 28,
    },
    modalHandle: {
        width: 36,
        height: 4,
        borderRadius: 2,
        backgroundColor: COLORS.border,
        alignSelf: "center",
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    modalCategory: {
        fontSize: 12,
        color: COLORS.accent,
        fontWeight: "600",
        marginBottom: 12,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    modalDesc: {
        fontSize: 14,
        color: COLORS.textSecondary,
        lineHeight: 20,
        marginBottom: 20,
    },

    // Opciones de compra dentro del modal
    purchaseOptionsTitle: {
        fontSize: 12,
        fontWeight: "700",
        color: COLORS.textMuted,
        letterSpacing: 1,
        textTransform: "uppercase",
        marginBottom: 10,
    },
    purchaseOption: {
        borderRadius: 14,
        borderWidth: 1.5,
        padding: 14,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    purchaseOptionSelected: {
        borderColor: COLORS.accent,
        backgroundColor: COLORS.bgCardAlt,
    },
    purchaseOptionIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    purchaseOptionLabel: {
        fontSize: 14,
        fontWeight: "700",
        color: COLORS.textPrimary,
        marginBottom: 2,
    },
    purchaseOptionSub: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },

    // Cuenta selector
    accountSelectorLabel: {
        fontSize: 12,
        fontWeight: "700",
        color: COLORS.textMuted,
        letterSpacing: 1,
        textTransform: "uppercase",
        marginBottom: 8,
        marginTop: 4,
    },
    accountOption: {
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        padding: 12,
        marginBottom: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    accountOptionSelected: {
        borderColor: COLORS.accent,
        backgroundColor: COLORS.bgCardAlt,
    },
    accountOptionNumber: {
        fontSize: 13,
        fontWeight: "600",
        color: COLORS.textPrimary,
    },
    accountOptionBalance: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },

    // Confirm button
    confirmBtn: {
        marginTop: 16,
        borderRadius: 14,
        paddingVertical: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    confirmBtnText: {
        fontSize: 15,
        fontWeight: "800",
        color: "#FFFFFF",
    },
    confirmBtnDisabled: {
        opacity: 0.4,
    },

    // ── Empty / Error states ──────────────────────────────────────────
    emptyState: {
        alignItems: "center",
        paddingVertical: 48,
        paddingHorizontal: 24,
    },
    emptyIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: COLORS.bgCardAlt,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.textPrimary,
        marginBottom: 6,
    },
    emptySubtitle: {
        fontSize: 13,
        color: COLORS.textSecondary,
        textAlign: "center",
        lineHeight: 19,
    },

    loadingContainer: {
        alignItems: "center",
        paddingVertical: 40,
        gap: 12,
    },
    loadingText: {
        fontSize: 13,
        color: COLORS.textSecondary,
    },

    // Toast/success strip
    successStrip: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: COLORS.freeLight,
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.free,
    },
    successStripText: {
        fontSize: 13,
        fontWeight: "600",
        color: COLORS.free,
        flex: 1,
    },
});