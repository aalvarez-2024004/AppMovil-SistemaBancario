import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const COLORS = {
  bg:           "#0D1117",
  bgCard:       "#161B22",
  bgCardAlt:    "#1C2333",

  accent:       "#2F80ED",
  accentLight:  "#56A3F5",
  accentGlow:   "rgba(47,128,237,0.18)",

  active:       "#27AE60",
  activeLight:  "rgba(39,174,96,0.15)",
  inactive:     "#EB5757",
  inactiveLight:"rgba(235,87,87,0.15)",

  textPrimary:  "#E6EDF3",
  textSecondary:"#8B949E",
  textMuted:    "#484F58",

  border:       "#21262D",
  borderLight:  "#30363D",
};

export const FONT = {
  xs:   11,
  sm:   13,
  md:   15,
  lg:   18,
  xl:   22,
  xxl:  28,
  hero: 38,
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
    paddingTop: 56,
    paddingBottom: 32,
    backgroundColor: COLORS.bgCard,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  heroLabel: {
    fontSize: FONT.xs,
    fontWeight: "700",
    letterSpacing: 2.5,
    color: COLORS.accent,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  heroTitle: {
    fontSize: FONT.hero,
    fontWeight: "800",
    color: COLORS.textPrimary,
    lineHeight: 44,
  },
  heroTitleAccent: {
    color: COLORS.accentLight,
  },
  heroSubtitle: {
    fontSize: FONT.sm,
    color: COLORS.textSecondary,
    marginTop: 8,
    marginBottom: 24,
  },

  balanceBox: {
    backgroundColor: COLORS.accentGlow,
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  balanceLabel: {
    fontSize: FONT.xs,
    fontWeight: "700",
    letterSpacing: 1.5,
    color: COLORS.accent,
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
    marginTop: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.bgCard,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
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
  },
  statSubLabel: {
    fontSize: FONT.xs,
    color: COLORS.textMuted,
    textAlign: "center",
  },

  section: {
    paddingHorizontal: 20,
    marginTop: 32,
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
    fontWeight: "700",
    letterSpacing: 1.5,
    color: COLORS.textSecondary,
    textTransform: "uppercase",
  },
  sectionBadge: {
    backgroundColor: COLORS.bgCardAlt,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  sectionBadgeText: {
    fontSize: FONT.xs,
    fontWeight: "700",
    color: COLORS.textSecondary,
  },

  accountCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    marginBottom: 14,
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
    color: COLORS.textSecondary,
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
  accountBadgeActive: {
    backgroundColor: COLORS.activeLight,
  },
  accountBadgeInactive: {
    backgroundColor: COLORS.inactiveLight,
  },
  accountBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  accountBadgeDotActive: {
    backgroundColor: COLORS.active,
  },
  accountBadgeDotInactive: {
    backgroundColor: COLORS.inactive,
  },
  accountBadgeText: {
    fontSize: FONT.xs,
    fontWeight: "700",
  },
  accountBadgeTextActive: {
    color: COLORS.active,
  },
  accountBadgeTextInactive: {
    color: COLORS.inactive,
  },

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
    backgroundColor: COLORS.accentGlow,
    borderWidth: 1,
    borderColor: COLORS.accent,
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

  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
    gap: 12,
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

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: COLORS.bgCard,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.borderLight,
    alignSelf: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: FONT.xl,
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: FONT.sm,
    color: COLORS.textSecondary,
    marginBottom: 28,
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
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
  modalBalanceBig: {
    fontSize: FONT.hero,
    fontWeight: "800",
    color: COLORS.textPrimary,
    textAlign: "center",
    marginVertical: 24,
  },
  modalCloseBtn: {
    marginTop: 24,
    backgroundColor: COLORS.bgCardAlt,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  modalCloseBtnText: {
    fontSize: FONT.md,
    fontWeight: "700",
    color: COLORS.textSecondary,
  },

  skeleton: {
    backgroundColor: COLORS.bgCardAlt,
    borderRadius: 8,
    overflow: "hidden",
  },
  skeletonCard: {
    height: 160,
    borderRadius: 18,
    backgroundColor: COLORS.bgCard,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});
