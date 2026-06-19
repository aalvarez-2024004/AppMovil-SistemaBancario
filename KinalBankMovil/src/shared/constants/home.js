import { StyleSheet, Platform } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from './theme';

export const KB = {
  navy:      '#0F1F3D',
  navyMid:   '#162847',
  navyLight: '#1E3A5F',
  accent:    '#3B7DD8',
  gold:      '#C9A84C',
  white:     '#FFFFFF',
  success:   '#10B981',
  danger:    '#EF4444',
  blueLight: '#EAF1FC',
  redLight:  '#FDE8E8',
  greenLight:'#E9FBF1',
  goldLight: '#FBF4E2',
};

export const chipStyles = StyleSheet.create({
  base: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 99 },
  in:   { backgroundColor: 'rgba(16,185,129,0.12)' },
  out:  { backgroundColor: 'rgba(239,68,68,0.12)' },
  text: { fontSize: 11, fontWeight: '700' },
});

export const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.gray50 },

  loadingContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: KB.navy, gap: 16,
  },
  loadingText: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },

  /* Header */
  header: {
    backgroundColor: KB.navy,
    paddingTop: Platform.OS === 'ios' ? 56 : 40,
    paddingBottom: 64,
    paddingHorizontal: SPACING.lg,
    overflow: 'hidden',
  },
  circle1: {
    position: 'absolute', width: 300, height: 300, borderRadius: 150,
    backgroundColor: 'rgba(59,125,216,0.12)', top: -100, right: -80,
  },
  circle2: {
    position: 'absolute', width: 180, height: 180, borderRadius: 90,
    backgroundColor: 'rgba(201,168,76,0.07)', bottom: -60, left: -40,
  },
  headerTop: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: { fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 4 },
  userName: { fontSize: 30, fontWeight: '800', color: KB.white, marginBottom: 6 },
  tagline:  { fontSize: 13, color: 'rgba(255,255,255,0.45)' },
  avatar: {
    width: 46, height: 46, borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: KB.white, fontSize: 18, fontWeight: '700' },

  /* Body */
  body: {
    marginTop: -52,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xxl,
  },

  /* Balance + acciones rápidas, tarjeta blanca flotante */
  balanceCard: {
    backgroundColor: KB.white,
    borderRadius: 22,
    padding: SPACING.lg,
    ...SHADOWS.md,
    marginBottom: SPACING.md,
  },
  balanceLbl: {
    fontSize: 11, fontWeight: '700', color: COLORS.gray400,
    letterSpacing: 1, marginBottom: 6,
  },
  balanceRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  balanceValue: { fontSize: 30, fontWeight: '800', color: COLORS.gray900 },
  balanceActions: { flexDirection: 'row', gap: 10 },
  quickActionBtn: { alignItems: 'center', width: 64 },
  quickActionIcon: {
    width: 48, height: 48, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center', marginBottom: 4,
  },
  quickActionIconText: { fontSize: 18 },
  quickActionLabel: { fontSize: 10, color: COLORS.gray600, fontWeight: '600', textAlign: 'center' },
  balanceProgressBar: {
    height: 4, borderRadius: 2, marginTop: SPACING.md,
    backgroundColor: '#5B6CF9',
    // simple gradient illusion using overlapping colors is not supported natively,
    // a flat accent bar is used instead for RN compatibility
  },

  /* Grid de stats 2x2 */
  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between',
    marginBottom: SPACING.lg, gap: SPACING.sm,
  },
  statCard: {
    width: '48.5%',
    backgroundColor: KB.white,
    borderRadius: 18,
    padding: SPACING.md,
    flexDirection: 'row', alignItems: 'center', gap: 10,
    ...SHADOWS.sm,
    marginBottom: SPACING.sm,
  },
  statIconWrap: {
    width: 38, height: 38, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  statIconText: { fontSize: 16, fontWeight: '800' },
  statCardLbl: { fontSize: 10, color: COLORS.gray400, fontWeight: '700', letterSpacing: 0.3 },
  statCardVal: { fontSize: 16, fontWeight: '800', color: COLORS.gray900, marginTop: 2 },

  /* Secciones */
  sectionRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 12, fontWeight: '800', color: COLORS.gray500,
    letterSpacing: 1, textTransform: 'uppercase',
  },
  seeAll: { fontSize: 13, color: KB.accent, fontWeight: '600' },

  /* Mis cuentas - card horizontal con saldo */
  accountsBox: {
    backgroundColor: KB.white,
    borderRadius: 18,
    padding: SPACING.lg,
    ...SHADOWS.sm,
    marginBottom: SPACING.lg,
  },
  accountRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
  },
  accountRowDivider: {
    borderTopWidth: 1, borderTopColor: COLORS.gray100,
  },
  accountInfo: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  accountIconWrap: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: KB.blueLight,
    alignItems: 'center', justifyContent: 'center',
  },
  accountNum: { fontSize: 13, fontWeight: '700', color: COLORS.gray800 },
  accountStatus: { fontSize: 11, color: COLORS.gray400, marginTop: 2 },
  accountBalance: { fontSize: 14, fontWeight: '800', color: COLORS.gray900 },

  /* Tarjeta de cuenta destacada (estilo original, opcional al deslizar) */
  card: {
    borderRadius: 20, overflow: 'hidden',
    backgroundColor: KB.navyLight,
    padding: SPACING.lg, marginBottom: SPACING.sm,
    ...SHADOWS.md,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  cardGrad: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: KB.navyMid, opacity: 0.6,
  },
  cardTop: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: SPACING.lg,
  },
  cardBank:       { fontSize: 13, fontWeight: '900', color: KB.white, letterSpacing: 3 },
  cardChip:       { width: 32, height: 24, borderRadius: 4, backgroundColor: KB.gold, opacity: 0.85 },
  cardMid:        { marginBottom: SPACING.lg },
  cardBalanceLbl: { fontSize: 11, color: 'rgba(255,255,255,0.55)', marginBottom: 4, letterSpacing: 1 },
  cardBalance:    { fontSize: 32, fontWeight: '800', color: KB.white },
  cardBot:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  cardMeta:       { fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 2 },
  cardNum:        { fontSize: 15, fontWeight: '700', color: KB.white, letterSpacing: 2 },

  statusBadge:  { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 99 },
  badgeActive:  { backgroundColor: 'rgba(16,185,129,0.2)', borderWidth: 1, borderColor: 'rgba(16,185,129,0.4)' },
  badgeInactive:{ backgroundColor: 'rgba(239,68,68,0.2)',  borderWidth: 1, borderColor: 'rgba(239,68,68,0.4)'  },
  badgeText:    { fontSize: 10, fontWeight: '800', color: KB.white, letterSpacing: 1 },

  dotRow:    { flexDirection: 'row', justifyContent: 'center', gap: 6, marginBottom: SPACING.md },
  dot:       { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(0,0,0,0.15)' },
  dotActive: { width: 18, backgroundColor: '#3B7DD8' },

  /* Empty states */
  emptyCard: {
    backgroundColor: KB.white, borderRadius: 18, padding: SPACING.xl,
    alignItems: 'center', ...SHADOWS.sm,
  },
  emptyIcon:  { fontSize: 34, marginBottom: SPACING.sm },
  emptyTitle: { fontSize: 15, fontWeight: '700', color: COLORS.gray800, marginBottom: 4 },
  emptyText:  { fontSize: 13, color: COLORS.gray500, textAlign: 'center', lineHeight: 20 },

  emptyTx: {
    backgroundColor: KB.white, borderRadius: 18, padding: SPACING.xl,
    alignItems: 'center', ...SHADOWS.sm,
  },

  /* Movimientos recientes */
  txRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: KB.white, borderRadius: 14,
    padding: SPACING.md, marginBottom: SPACING.sm, ...SHADOWS.sm,
    gap: SPACING.sm,
  },
  txIconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  txIcon:     { fontSize: 16, fontWeight: '700', color: COLORS.gray700 },
  txInfo:     { flex: 1 },
  txDesc:     { fontSize: 14, fontWeight: '600', color: COLORS.gray800 },
  txDate:     { fontSize: 11, color: COLORS.gray400, marginTop: 2 },
  txAmount:   { fontSize: 14, fontWeight: '800' },

  /* Logout */
  logoutBtn: {
    marginTop: SPACING.lg, borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1.5, borderColor: 'rgba(239,68,68,0.3)',
    padding: SPACING.md, alignItems: 'center',
    backgroundColor: 'rgba(239,68,68,0.06)',
  },
  logoutText: { color: '#EF4444', fontWeight: '700', fontSize: 14 },
});