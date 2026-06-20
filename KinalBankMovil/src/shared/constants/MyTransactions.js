import { StyleSheet, Dimensions, Platform } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const COLORS = {
  navy:          "#0B1B33",
  navyLight:     "#16294D",
  navyDeep:      "#071122",
  accent:        "#4F8DFF",
  accentDark:    "#2F6FE0",
  bg:            "#F4F5F8",
  white:         "#FFFFFF",
  success:       "#15803D",
  successBg:     "#E7F8EE",
  danger:        "#D92D20",
  dangerBg:      "#FCEAE9",
  warning:       "#B25E09",
  warningBg:     "#FBF0DD",
  infoBg:        "#EAF1FE",
  info:          "#2563EB",
  textPrimary:   "#0F172A",
  textSecondary: "#475569",
  textMuted:     "#94A3B8",
  border:        "#ECEFF4",
  shadow:        "#0B1B33",
};

export const TABS = [
  { key: "all",      label: "Todos",          icon: "apps-outline" },
  { key: "deposit",  label: "Depósitos",      icon: "arrow-down-circle-outline" },
  { key: "withdraw", label: "Retiros",        icon: "arrow-up-circle-outline" },
  { key: "transfer", label: "Transferencias", icon: "swap-horizontal-outline" },
];

export const TX_TYPE_MAP = {
  deposit:  { label: "Depósito recibido",     iconName: "arrow-down-circle-outline", bg: COLORS.successBg, color: COLORS.success },
  withdraw: { label: "Retiro realizado",      iconName: "arrow-up-circle-outline",   bg: COLORS.dangerBg,  color: COLORS.danger  },
  transfer: { label: "Transferencia enviada", iconName: "paper-plane-outline",       bg: COLORS.infoBg,    color: COLORS.info    },
  received: { label: "Transferencia recibida",iconName: "download-outline",          bg: COLORS.infoBg,    color: COLORS.info    },
};

// Reusable elevation presets (iOS shadow + Android elevation)
const cardShadow = {
  shadowColor: COLORS.shadow,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.06,
  shadowRadius: 10,
  elevation: 2,
};

const softShadow = {
  shadowColor: COLORS.shadow,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 6,
  elevation: 1,
};

export const styles = StyleSheet.create({
  container:        { flex: 1, backgroundColor: COLORS.navy },

  // ---- Header ----
  header:           { backgroundColor: COLORS.navy, paddingHorizontal: 20, paddingTop: 18, paddingBottom: 28 },
  backBtn:          { width: 34, height: 34, borderRadius: 17, backgroundColor: "rgba(255,255,255,0.10)", justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", marginBottom: 16 },
  headerTop:        { marginBottom: 24 },
  brandEyebrow:     { color: COLORS.accent, fontSize: 11, fontWeight: "700", letterSpacing: 1.6, marginBottom: 6, textTransform: "uppercase" },
  headerTitle:      { color: "#fff", fontSize: 28, fontWeight: "800", letterSpacing: -0.6, lineHeight: 32 },
  headerTitleAccent:{ color: COLORS.accent, fontWeight: "800" },

  balanceRow:       { marginBottom: 22 },
  balanceLabel:     { color: "rgba(255,255,255,0.45)", fontSize: 11, fontWeight: "700", letterSpacing: 1.4, marginBottom: 8 },
  balanceAmount:    { color: "#fff", fontSize: 36, fontWeight: "800", letterSpacing: -0.8 },
  balanceSub:       { color: "rgba(255,255,255,0.40)", fontSize: 12.5, marginTop: 6 },

  pillsRow:         { flexDirection: "row", gap: 12 },
  pill:             { flex: 1, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 14, flexDirection: "row", alignItems: "center", gap: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  pillIconWrap:     { width: 32, height: 32, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  pillIconWrapIn:   { backgroundColor: "rgba(74,222,128,0.16)" },
  pillIconWrapOut:  { backgroundColor: "rgba(248,113,113,0.16)" },
  pillLabel:        { color: "rgba(255,255,255,0.45)", fontSize: 9.5, fontWeight: "700", letterSpacing: 1 },
  pillAmount:       { color: "#fff", fontSize: 14.5, fontWeight: "700", marginTop: 3, letterSpacing: -0.2 },

  // ---- Content sheet ----
  content:          { flex: 1, backgroundColor: COLORS.bg, borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingTop: 18, marginTop: -16 },

  searchBar:        { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: COLORS.white, marginHorizontal: 16, marginBottom: 14, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, ...softShadow },
  searchInput:      { flex: 1, fontSize: 14.5, color: COLORS.textPrimary, paddingVertical: 0 },

  tabsRow:          { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, gap: 10, marginBottom: 18 },
  tabsContainer:    { gap: 8 },
  searchToggleBtn:  { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.white, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: COLORS.border, ...softShadow },
  tab:              { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 15, paddingVertical: 9, borderRadius: 22, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, ...softShadow },
  tabActive:        { backgroundColor: COLORS.navy, borderColor: COLORS.navy },
  tabText:          { fontSize: 12.5, color: COLORS.textSecondary, fontWeight: "600" },
  tabTextActive:    { color: "#fff" },

  sectionLabel:     { fontSize: 11.5, color: COLORS.textMuted, fontWeight: "700", textTransform: "uppercase", letterSpacing: 1, marginHorizontal: 20, marginTop: 10, marginBottom: 10 },

  // ---- Transaction card (no more bordered rows — floating cards) ----
  txItem:           { flexDirection: "row", alignItems: "center", gap: 12, padding: 14, marginHorizontal: 16, marginBottom: 10, backgroundColor: COLORS.white, borderRadius: 18, ...cardShadow },
  txIcon:           { width: 44, height: 44, borderRadius: 14, justifyContent: "center", alignItems: "center" },
  txInfo:           { flex: 1, minWidth: 0 },
  txType:           { fontSize: 13.5, fontWeight: "700", color: COLORS.textPrimary },
  txAccount:        { fontSize: 11.5, color: COLORS.textMuted, marginTop: 3 },

  badge:            { flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, marginTop: 6 },
  badgeDot:         { width: 5, height: 5, borderRadius: 2.5 },
  badgeDone:        { backgroundColor: COLORS.successBg },
  badgePending:     { backgroundColor: COLORS.warningBg },
  badgeText:        { fontSize: 9.5, fontWeight: "700", letterSpacing: 0.2 },
  badgeTextDone:    { color: COLORS.success },
  badgeTextPending: { color: COLORS.warning },

  txRight:          { alignItems: "flex-end" },
  txAmount:         { fontSize: 14.5, fontWeight: "800", letterSpacing: -0.2, fontVariant: ["tabular-nums"] },
  amountCredit:     { color: COLORS.success },
  amountDebit:      { color: COLORS.danger },
  txDate:           { fontSize: 10.5, color: COLORS.textMuted, marginTop: 4 },

  listContent:      { paddingTop: 4, paddingBottom: 8, flexGrow: 1 },

  loadMore:         { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, padding: 16, marginHorizontal: 16, marginTop: 4, backgroundColor: COLORS.white, borderRadius: 14, borderWidth: 1, borderColor: COLORS.border },
  loadMoreText:     { color: COLORS.accentDark, fontSize: 13, fontWeight: "700" },

  emptyContainer:   { flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 20, paddingHorizontal: 40, gap: 6 },
  emptyIconWrap:    { width: 88, height: 88, borderRadius: 24, backgroundColor: COLORS.white, justifyContent: "center", alignItems: "center", marginBottom: 14, ...softShadow },
  emptyTitle:       { fontSize: 16.5, fontWeight: "700", color: COLORS.textPrimary },
  emptyText:        { fontSize: 13, color: COLORS.textMuted, textAlign: "center", lineHeight: 19 },

  errorBox:         { flexDirection: "row", alignItems: "center", gap: 8, marginHorizontal: 16, marginBottom: 12, padding: 12, backgroundColor: COLORS.dangerBg, borderRadius: 12 },
  errorText:        { fontSize: 12.5, color: COLORS.danger, flex: 1, fontWeight: "500" },

  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", gap: 14, paddingTop: 60 },
  loadingText:      { fontSize: 13, color: COLORS.textMuted, fontWeight: "500" },
});