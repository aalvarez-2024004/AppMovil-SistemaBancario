import { StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");

export const COLORS = {
  bg:           "#F8F9FB",
  bgCard:       "#FFFFFF",
  bgCardAlt:    "#EAF1FC",

  navy:         "#0F1F3D",

  accent:       "#3B7DD8",
  accentLight:  "#7DAEF0",
  accentGlow:   "rgba(59,125,216,0.08)",

  active:       "#10B981",
  activeLight:  "rgba(16,185,129,0.12)",
  inactive:     "#EF4444",
  inactiveLight:"rgba(239,68,68,0.12)",

  textPrimary:  "#1A2333",
  textSecondary:"#6B7280",
  textMuted:    "#9CA3AF",

  border:       "#EEF1F5",
  borderLight:  "#E2E8F0",
};

export const FONT = {
  xs:   11,
  sm:   13,
  md:   15,
  lg:   18,
  xl:   22,
  xxl:  28,
  hero: 30,
};

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  hero: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 64 : 48,
    paddingBottom: 56,
    backgroundColor: COLORS.navy,
  },
  heroLabel: {
    fontSize: FONT.xs,
    fontWeight: "700",
    letterSpacing: 2.5,
    color: COLORS.accentLight,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  heroTitle: {
    fontSize: FONT.hero,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 36,
  },
  heroTitleAccent: {
    color: COLORS.accentLight,
  },
  heroSubtitle: {
    fontSize: FONT.sm,
    color: "rgba(255,255,255,0.55)",
    marginTop: 8,
    marginBottom: 20,
  },

  balanceBox: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: "#0F1F3D",
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  balanceLabel: {
    fontSize: FONT.xs,
    fontWeight: "700",
    letterSpacing: 1.5,
    color: COLORS.textMuted,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: FONT.hero,
    fontWeight: "800",
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  balanceSub: {
    fontSize: FONT.sm,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  statsRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
    marginTop: -36,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.bgCard,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#0F1F3D",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    alignItems: "center",
    gap: 6,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
  },
  statValue: {
    fontSize: FONT.xxl,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
  statValueActive: {
    color: COLORS.active,
  },
  statValueInactive: {
    color: COLORS.inactive,
  },
  statLabel: {
    fontSize: FONT.xs,
    color: COLORS.textSecondary,
    textAlign: "center",
    fontWeight: "600",
  },
  statSubLabel: {
    fontSize: FONT.xs,
    color: COLORS.textMuted,
    textAlign: "center",
  },

  section: {
    paddingHorizontal: 20,
    marginTop: 28,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.active,
  },
  sectionTitle: {
    fontSize: FONT.sm,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: COLORS.textSecondary,
    textTransform: "uppercase",
  },
  sectionBadge: {
    backgroundColor: COLORS.bgCardAlt,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  sectionBadgeText: {
    fontSize: FONT.xs,
    fontWeight: "700",
    color: COLORS.accent,
  },

  /* ── Account Card ── */
  accountCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 18,
    padding: 20,
    marginBottom: 14,
    shadowColor: "#0F1F3D",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  // ✅ NUEVO: card inactiva con borde sutil
  accountCardInactive: {
    borderWidth: 1,
    borderColor: COLORS.inactiveLight,
    opacity: 0.85,
  },
  accountCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  accountTypeLabel: {
    fontSize: FONT.xs,
    fontWeight: "700",
    letterSpacing: 1.5,
    color: COLORS.textMuted,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  accountName: {
    fontSize: FONT.lg,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  accountBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  accountBadgeActive:   { backgroundColor: COLORS.activeLight },
  accountBadgeInactive: { backgroundColor: COLORS.inactiveLight },
  accountBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  accountBadgeDotActive:   { backgroundColor: COLORS.active },
  accountBadgeDotInactive: { backgroundColor: COLORS.inactive },
  accountBadgeText: {
    fontSize: FONT.xs,
    fontWeight: "700",
  },
  accountBadgeTextActive:   { color: COLORS.active },
  accountBadgeTextInactive: { color: COLORS.inactive },

  accountNumberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 20,
  },
  accountNumberDots: {
    fontSize: FONT.md,
    color: COLORS.textMuted,
    letterSpacing: 3,
  },
  accountNumberLast: {
    fontSize: FONT.md,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },

  accountCardDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 16,
  },
  accountCardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  accountBalanceLabel: {
    fontSize: FONT.xs,
    color: COLORS.textMuted,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  accountBalance: {
    fontSize: FONT.xl,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
  accountActionBtn: {
    backgroundColor: COLORS.bgCardAlt,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  accountActionText: {
    fontSize: FONT.sm,
    fontWeight: "700",
    color: COLORS.accent,
  },

  /* ── Empty state ── */
  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
    gap: 12,
    backgroundColor: COLORS.bgCard,
    borderRadius: 18,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: COLORS.bgCardAlt,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  emptyTitle: {
    fontSize: FONT.lg,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  emptySubtitle: {
    fontSize: FONT.sm,
    color: COLORS.textSecondary,
    textAlign: "center",
  },

  /* ── Skeleton ── */
  skeletonCard: {
    height: 180,
    borderRadius: 18,
    backgroundColor: COLORS.bgCard,
    marginBottom: 14,
    shadowColor: "#0F1F3D",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  skeletonInner: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  skeletonLine: {
    backgroundColor: COLORS.borderLight,
    borderRadius: 6,
  },
  skeletonDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },

  /* ── Modal ── */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15,31,61,0.5)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: COLORS.bgCard,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.borderLight,
    alignSelf: "center",
    marginBottom: 20,
  },
  // ✅ NUEVO: header del modal con icono + título alineados
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  modalHeaderIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: FONT.lg,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
  modalSubtitle: {
    fontSize: FONT.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  // ✅ NUEVO: caja de balance dentro del modal
  modalBalanceBox: {
    backgroundColor: COLORS.bgCardAlt,
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    marginBottom: 20,
  },
  modalBalanceLabel: {
    fontSize: FONT.xs,
    fontWeight: "700",
    letterSpacing: 1.2,
    color: COLORS.textMuted,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  modalBalanceBig: {
    fontSize: FONT.hero,
    fontWeight: "800",
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  modalRows: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
    marginBottom: 20,
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalRowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalRowLabel: {
    fontSize: FONT.sm,
    color: COLORS.textSecondary,
  },
  modalRowValue: {
    fontSize: FONT.sm,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  modalCloseBtn: {
    backgroundColor: COLORS.navy,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  modalCloseBtnText: {
    fontSize: FONT.md,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});