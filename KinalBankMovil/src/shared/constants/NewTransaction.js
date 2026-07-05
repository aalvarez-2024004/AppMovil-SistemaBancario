import { StyleSheet, Platform } from "react-native";

export const COLORS = {
    bg: "#F8F9FB",
    bgCard: "#FFFFFF",
    bgCardAlt: "#EAF1FC",

    navy: "#0F1F3D",
    navyMid: "#13294D",
    navyLight: "#1E3A66",
    navyDeep: "#071122",

    accent: "#3B7DD8",
    accentLight: "#7DAEF0",
    accentGlow: "rgba(59,125,216,0.08)",
    accentGlowStrong: "rgba(59,125,216,0.16)",

    success: "#10B981",
    successLight: "rgba(16,185,129,0.12)",
    danger: "#EF4444",
    dangerLight: "rgba(239,68,68,0.10)",
    warning: "#B25E09",
    warningLight: "#FBF0DD",

    textPrimary: "#1A2333",
    textSecondary: "#6B7280",
    textMuted: "#9CA3AF",

    border: "#EEF1F5",
    borderLight: "#E2E8F0",

    white08: "rgba(255,255,255,0.08)",
    white06: "rgba(255,255,255,0.06)",
    white12: "rgba(255,255,255,0.12)",
};

export const GRADIENTS = {
    hero: [COLORS.navyMid, COLORS.navyLight, "#2E5794"],
    button: [COLORS.navy, COLORS.navyLight],
};

export const FONT = {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 22,
    xxl: 28,
    hero: 30,
};

const cardShadow = {
    shadowColor: "#0F1F3D",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
};

const accentShadow = {
    shadowColor: "#3B7DD8",
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
};

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0F1F3D" },
    scrollContent: { paddingBottom: 24 },

    hero: {
        paddingHorizontal: 20,
        paddingTop: Platform.OS === "ios" ? 56 : 40,
        paddingBottom: 28,
        position: "relative",
        overflow: "hidden",
    },
    heroDecorCircleLg: {
        position: "absolute",
        top: -70,
        right: -50,
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: "rgba(255,255,255,0.05)",
    },
    heroDecorCircleSm: {
        position: "absolute",
        top: 40,
        right: -60,
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: "rgba(125,174,240,0.12)",
    },

    heroTopRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 22,
    },
    backBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "rgba(255,255,255,0.10)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 18,
    },
    heroBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "rgba(255,255,255,0.08)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.10)",
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 20,
    },
    heroBadgeText: {
        fontSize: 10,
        fontWeight: "800",
        letterSpacing: 1.6,
        color: "#BFD7F5",
        textTransform: "uppercase",
    },

    heroTitle: {
        fontSize: 28,
        fontWeight: "800",
        color: "#FFFFFF",
        lineHeight: 32,
    },
    heroTitleAccent: { color: "#7DAEF0" },
    heroSubtitle: {
        fontSize: 13,
        color: "rgba(255,255,255,0.55)",
        marginTop: 8,
    },

    // ------------------------------------------------------------
    //  NUEVO — indicador de progreso del flujo (Origen > Destino > Monto)
    // ------------------------------------------------------------
    stepRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 18,
    },
    stepDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: "rgba(255,255,255,0.25)",
    },
    stepDotActive: {
        width: 18,
        backgroundColor: "#7DAEF0",
    },
    stepDotDone: {
        backgroundColor: "rgba(125,174,240,0.55)",
    },
    stepConnector: {
        width: 14,
        height: 1,
        backgroundColor: "rgba(255,255,255,0.18)",
        marginHorizontal: 6,
    },

    content: {
        flex: 1,
        backgroundColor: "#F8F9FB",
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        marginTop: -18,
        paddingTop: 22,
    },

    section: { paddingHorizontal: 20, marginBottom: 22 },
    sectionLabelRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    sectionLabel: {
        fontSize: 11,
        fontWeight: "800",
        letterSpacing: 1.2,
        color: "#6B7280",
        textTransform: "uppercase",
    },
    sectionLabelHint: {
        fontSize: 11,
        fontWeight: "600",
        color: "#9CA3AF",
    },

    accountsRow: { gap: 12, paddingRight: 4 },
    accountOptionEmpty: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        ...cardShadow,
    },
    accountOptionEmptyText: {
        fontSize: 13,
        color: "#6B7280",
        textAlign: "center",
    },

    favoritesRow: { gap: 10, paddingRight: 4, paddingBottom: 2 },

    // ------------------------------------------------------------
    //  Inputs — ahora con label fijo arriba (no solo placeholder)
    // ------------------------------------------------------------
    inputLabel: {
        fontSize: 11,
        fontWeight: "700",
        color: "#9CA3AF",
        marginBottom: 6,
        marginLeft: 2,
    },
    inputCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        paddingHorizontal: 16,
        borderWidth: 1.5,
        borderColor: "transparent",
        ...cardShadow,
    },
    inputCardFocused: {
        borderColor: "#3B7DD8",
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        height: 56,
        gap: 10,
    },
    inputIcon: { width: 20, alignItems: "center" },
    textInput: {
        flex: 1,
        fontSize: 15,
        color: "#1A2333",
        paddingVertical: 0,
    },
    selectedFavoriteBanner: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "rgba(16,185,129,0.12)",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginTop: 10,
    },
    selectedFavoriteBannerText: {
        flex: 1,
        fontSize: 11,
        color: "#10B981",
        fontWeight: "600",
    },

    // ------------------------------------------------------------
    //  Monto — jerarquía más clara, chip de moneda en vez de texto suelto
    // ------------------------------------------------------------
    amountCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        paddingVertical: 24,
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: "transparent",
        ...cardShadow,
    },
    amountCardActive: {
        borderColor: "#3B7DD8",
    },
    amountRow: { flexDirection: "row", alignItems: "center", gap: 6 },
    amountPrefix: { fontSize: 26, fontWeight: "800", color: "#9CA3AF" },
    amountInput: {
        fontSize: 42,
        fontWeight: "800",
        color: "#1A2333",
        minWidth: 60,
        textAlign: "center",
        paddingVertical: 0,
    },
    amountCurrencyChip: {
        marginTop: 8,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: "#EAF1FC",
    },
    amountCurrencyChipText: {
        fontSize: 11,
        color: "#3B7DD8",
        fontWeight: "700",
        letterSpacing: 0.4,
    },

    quickAmountsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 8,
        marginTop: 18,
    },
    quickAmountChip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 12,
        backgroundColor: "#EAF1FC",
        borderWidth: 1,
        borderColor: "transparent",
    },
    quickAmountChipSelected: {
        backgroundColor: "#3B7DD8",
        borderColor: "#3B7DD8",
    },
    quickAmountChipText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#3B7DD8",
    },
    quickAmountChipTextSelected: {
        color: "#FFFFFF",
    },

    hintBox: {
        flexDirection: "row",
        gap: 10,
        backgroundColor: "#EAF1FC",
        borderRadius: 14,
        padding: 14,
        marginHorizontal: 20,
        marginBottom: 14,
    },
    hintText: {
        flex: 1,
        fontSize: 11,
        color: "#6B7280",
        lineHeight: 17,
    },
    errorBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "rgba(239,68,68,0.10)",
        borderRadius: 14,
        padding: 14,
        marginHorizontal: 20,
        marginBottom: 14,
    },
    errorBoxText: {
        flex: 1,
        fontSize: 13,
        color: "#EF4444",
        fontWeight: "600",
    },

    // ------------------------------------------------------------
    //  NUEVO — CTA fija (sticky) fuera del ScrollView, con separador
    //  sutil para que no "flote" sobre el contenido al hacer scroll
    // ------------------------------------------------------------
    ctaBar: {
        paddingHorizontal: 20,
        paddingTop: 14,
        paddingBottom: Platform.OS === "ios" ? 28 : 18,
        backgroundColor: "#F8F9FB",
        borderTopWidth: 1,
        borderTopColor: "#EEF1F5",
    },
    submitWrap: { paddingHorizontal: 0 },
    submitBtn: {
        height: 56,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
        ...accentShadow,
    },
    submitBtnDisabled: { opacity: 0.5 },
    submitBtnText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
        letterSpacing: 0.3,
    },

    successWrap: {
        flex: 1,
        backgroundColor: "#F8F9FB",
        alignItems: "center",
        paddingTop: 64,
        paddingHorizontal: 28,
    },
    successIconOuterGlow: {
        width: 132,
        height: 132,
        borderRadius: 66,
        backgroundColor: "rgba(16,185,129,0.06)",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 22,
    },
    successIconWrap: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: "rgba(16,185,129,0.12)",
        justifyContent: "center",
        alignItems: "center",
    },
    successTitle: {
        fontSize: 22,
        fontWeight: "800",
        color: "#1A2333",
        marginBottom: 6,
    },
    successSubtitle: {
        fontSize: 13,
        color: "#6B7280",
        textAlign: "center",
        marginBottom: 28,
    },
    successAmount: {
        fontSize: 30,
        fontWeight: "800",
        color: "#1A2333",
        marginBottom: 6,
    },
    successCard: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 18,
        marginBottom: 18,
        ...cardShadow,
    },
    successRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#EEF1F5",
    },
    successRowLast: { borderBottomWidth: 0 },
    successRowLabel: { fontSize: 13, color: "#6B7280" },
    successRowValue: { fontSize: 13, fontWeight: "700", color: "#1A2333" },

    saveFavoriteBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        width: "100%",
        height: 50,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: "#3B7DD8",
        marginBottom: 12,
    },
    saveFavoriteBtnText: { color: "#3B7DD8", fontWeight: "700", fontSize: 13 },

    successActions: { width: "100%", gap: 10, marginTop: 4 },
    successPrimaryBtn: {
        height: 54,
        borderRadius: 16,
        backgroundColor: "#0F1F3D",
        alignItems: "center",
        justifyContent: "center",
    },
    successPrimaryBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
    successSecondaryBtn: {
        height: 54,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    successSecondaryBtnText: { color: "#6B7280", fontWeight: "700", fontSize: 15 },

    // ================================================================
    //  Tarjetas de cuenta — badge de moneda reubicado para no chocar
    //  con el check de selección (antes se superponían en la esquina)
    // ================================================================
    accountCardModern: {
        width: 230,
        borderRadius: 22,
        padding: 18,
        overflow: "hidden",
        position: "relative",
        ...accentShadow,
    },
    accountCardDecor: {
        position: "absolute",
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: "rgba(255,255,255,0.08)",
        top: -50,
        right: -40,
    },
    accountCardTop: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    accountCardIconChip: {
        width: 40,
        height: 40,
        borderRadius: 13,
        backgroundColor: "rgba(255,255,255,0.16)",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.20)",
    },
    // el badge ahora vive pegado al chip del ícono, no flotando cerca del check
    accountCardIconGroup: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    accountCardCurrencyBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
        backgroundColor: "rgba(255,255,255,0.14)",
    },
    accountCardCurrencyBadgeText: {
        fontSize: 9,
        fontWeight: "800",
        color: "#FFFFFF",
        letterSpacing: 0.5,
    },
    accountCardCheck: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: "rgba(255,255,255,0.45)",
    },
    accountCardCheckSelected: {
        backgroundColor: "#FFFFFF",
        borderColor: "#FFFFFF",
    },
    accountCardType: {
        fontSize: 10,
        fontWeight: "800",
        letterSpacing: 1.2,
        color: "rgba(255,255,255,0.60)",
        textTransform: "uppercase",
        marginBottom: 6,
    },
    accountCardNumber: {
        fontSize: 18,
        fontWeight: "800",
        color: "#FFFFFF",
        letterSpacing: 1,
        marginBottom: 18,
    },
    accountCardBalanceLabel: {
        fontSize: 9,
        fontWeight: "700",
        color: "rgba(255,255,255,0.55)",
        textTransform: "uppercase",
        letterSpacing: 0.6,
        marginBottom: 3,
    },
    accountCardBalance: {
        fontSize: 21,
        fontWeight: "800",
        color: "#FFFFFF",
        letterSpacing: -0.3,
    },

    // ================================================================
    //  Favoritos — mismo concepto, anillo con más contraste al elegir
    // ================================================================
    favoriteCardModern: {
        width: 96,
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        paddingVertical: 14,
        paddingHorizontal: 8,
        borderWidth: 1.5,
        borderColor: "transparent",
        ...cardShadow,
    },
    favoriteCardSelected: {
        backgroundColor: "rgba(59,125,216,0.06)",
        borderColor: "rgba(59,125,216,0.35)",
    },
    favoriteRing: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },
    favoriteAvatarInner: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
    },
    favoriteAvatarInnerText: {
        fontSize: 17,
        fontWeight: "800",
        color: "#3B7DD8",
    },
    favoriteCardLabel: {
        fontSize: 11,
        fontWeight: "700",
        color: "#1A2333",
        textAlign: "center",
    },
    addFavoriteCardModern: {
        width: 96,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        borderRadius: 18,
        borderWidth: 1.5,
        borderColor: "#E2E8F0",
        borderStyle: "dashed",
    },
});