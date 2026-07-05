import { StyleSheet } from "react-native";

export const COLORS = {
  navy: "#062B5C",
  navyLight: "#0B4A8B",
  primary: "#0066FF",
  accent: "#00B4FF",
  white: "#FFFFFF",
  background: "#F5F7FB",
  card: "#FFFFFF",
  text: "#132238",
  textSecondary: "#526071",
  textMuted: "#8B98A8",
  border: "#E5EAF0",
  success: "#16A34A",
  danger: "#DC2626",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

    marketplaceWrap: {
        marginBottom: 65,
    },

    marketplaceHeader: {
        paddingTop: 55,
        paddingHorizontal: 24,
        paddingBottom: 105,
        borderBottomLeftRadius: 34,
        borderBottomRightRadius: 34,
        overflow: "hidden",
    },

    mktDecoRingOne: {
        position: "absolute",
        width: 280,
        height: 280,
        borderRadius: 140,
        borderWidth: 30,
        borderColor: "rgba(255,255,255,0.05)",
        top: -130,
        right: -90,
    },

    mktDecoCircleOne: {
        position: "absolute",
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: "rgba(255,255,255,0.10)",
        top: -40,
        right: -50,
    },

    mktDecoCircleTwo: {
        position: "absolute",
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "rgba(255,255,255,0.06)",
        left: -45,
        bottom: 10,
    },

    mktBadge: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        backgroundColor: "rgba(255,255,255,0.18)",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 25,
        marginBottom: 18,
    },

    mktBadgeIconWrap: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },

    mktBadgeText: {
        color: "#FFF",
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 1,
    },

    marketplaceTitle: {
        color: "#FFF",
        fontSize: 36,
        fontWeight: "900",
        lineHeight: 40,
    },

    marketplaceAccent: {
        color: "#7ED6FF",
    },

    marketplaceSubtitle: {
        color: "#D8E7F7",
        fontSize: 14,
        lineHeight: 22,
        marginTop: 12,
        width: "82%",
    },

    mktStatsFloating: {
        position: "absolute",
        left: 18,
        right: 18,
        bottom: -45,

        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#FFF",

        borderRadius: 24,

        paddingVertical: 22,
        paddingHorizontal: 10,

        elevation: 12,

        shadowColor: "#062B5C",
        shadowOpacity: .16,
        shadowRadius: 16,
        shadowOffset:{
            width:0,
            height:8,
        }
    },

    mktStatColumn:{
        flex:1,
        alignItems:"center",
    },

    mktStatDivider:{
        width:1,
        height:58,
        backgroundColor:"#EDF2F7",
    },

    mktStatIconWrap:{
        width:42,
        height:42,
        borderRadius:21,
        justifyContent:"center",
        alignItems:"center",
        marginBottom:8,
    },

    mktStatValue:{
        fontSize:24,
        fontWeight:"900",
        color:COLORS.text,
    },

    mktStatLabel:{
        fontSize:12,
        color:COLORS.textMuted,
        marginTop:4,
    },

  content: {
    flex: 1,
    paddingHorizontal: 18,
  },

  filterContainer: {
    flexDirection: "row",
    backgroundColor: "#E9EEF6",
    borderRadius: 18,
    padding: 5,
    marginBottom: 15,
  },

  filterTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 14,
  },

  filterTabActive: {
    backgroundColor: COLORS.white,
    elevation: 3,
  },

  filterText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.textMuted,
  },

  filterTextActive: {
    color: COLORS.navy,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    paddingHorizontal: 15,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.text,
    fontSize: 14,
  },

  sectionLabel: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 12,
  },

  productCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 18,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  productCardTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  productIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  productTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
  },

  productTypeTag: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.textMuted,
    marginTop: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  freeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
  },

  freeBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#166534",
    letterSpacing: 0.3,
  },

  productDescription: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 12,
    lineHeight: 18,
  },

  productCardDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginTop: 14,
    marginBottom: 14,
  },

  productCardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  productPriceLabel: {
    fontSize: 10.5,
    fontWeight: "700",
    color: COLORS.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2,
  },

  productPrice: {
    fontSize: 19,
    fontWeight: "800",
    color: COLORS.primary,
  },

  productDiscountHint: {
    fontSize: 11,
    fontWeight: "600",
    color: "#B45309",
    marginTop: 2,
  },

  productActionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#E8F1FF",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
  },

  productActionText: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 12,
  },

  emptyState: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
    marginTop: 15,
  },

  emptySubtitle: {
    textAlign: "center",
    color: COLORS.textMuted,
    marginTop: 8,
    lineHeight: 20,
  },

  retryText: {
    marginTop: 15,
    color: COLORS.primary,
    fontWeight: "700",
  },

  loadingContainer: {
    alignItems: "center",
    marginTop: 50,
  },

  loadingText: {
    marginTop: 12,
    color: COLORS.textSecondary,
  },

  successStrip: {
    backgroundColor: "#DCFCE7",
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
  },

  successText: {
    color: "#166534",
    fontSize: 13,
    fontWeight: "600",
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(6,43,92,0.45)",
  },

  modalSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 30,
    maxHeight: "80%",
  },

  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E2E8F0",
    alignSelf: "center",
    marginBottom: 14,
  },

  modalHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modalIconRing: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E8F1FF",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.text,
    marginTop: 16,
  },

  modalDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 6,
    lineHeight: 20,
  },

  modalPointsBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F1FF",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    marginTop: 14,
    gap: 6,
  },

  modalPointsText: {
    color: COLORS.primary,
    fontWeight: "800",
    fontSize: 15,
  },

  modalSectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 22,
    marginBottom: 4,
  },

  accountChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginRight: 10,
    backgroundColor: "#F1F5F9",
    borderWidth: 1.5,
    borderColor: "transparent",
    gap: 6,
  },

  accountChipActive: {
    backgroundColor: "#E8F1FF",
    borderColor: COLORS.primary,
  },

  accountChipText: {
    color: COLORS.textSecondary,
    fontWeight: "600",
    fontSize: 13,
  },

  accountChipTextActive: {
    color: COLORS.primary,
  },

  modalPriceBox: {
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  modalPriceLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  modalPriceValue: {
    fontSize: 26,
    fontWeight: "900",
    color: COLORS.text,
    marginTop: 4,
  },

  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1.5,
    borderColor: "transparent",
  },

  accountRowActive: {
    backgroundColor: "#EFF6FF",
    borderColor: COLORS.primary,
  },

  accountRowIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  accountRowIconActive: {
    backgroundColor: COLORS.primary,
  },

  accountRowNumber: {
    fontSize: 13.5,
    fontWeight: "700",
    color: COLORS.text,
    letterSpacing: 0.5,
  },

  accountRowCurrency: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 1,
  },

  accountRowBalance: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.textSecondary,
  },

  accountRowBalanceActive: {
    color: COLORS.primary,
  },
  
  modalErrorBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
    gap: 8,
  },

  modalErrorText: {
    flex: 1,
    color: COLORS.danger,
    fontSize: 13,
  },

  modalContinueBtn: {
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },

  modalContinueText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "800",
  },
});