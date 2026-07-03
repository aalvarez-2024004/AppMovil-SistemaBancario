import { StyleSheet, Platform } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from './theme';

export const KB = {
  navy:      '#0F1F3D',
  navyMid:   '#16294B',
  navyLight: '#1E3A5F',
  accent:    '#3B7DD8',
  accentLight: '#5B9BF0',
  celeste:      '#7EC8E8',
  celesteSoft:  '#BFE4F5',
  celesteLight: '#EAF6FC',
  white:     '#FFFFFF',
  success:   '#10B981',
  danger:    '#EF4444',
  blueLight: '#EAF1FC',
  redLight:  '#FDE8E8',
  greenLight:'#E9FBF1',
  goldLight: '#EAF6FC',
  gold:      '#3B9FD8',
  border:    '#E7EAF0',
};

/* Gradientes reutilizables — navy → azul acento → celeste */
export const GRADIENTS = {
  header:  [KB.navy, KB.navyLight],
  balance: ['#0F1F3D', '#1E3A5F', '#3B84C4', '#7EC8E8'],
};

export const chipStyles = StyleSheet.create({
  base: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 99 },
  in:   { backgroundColor: 'rgba(16,185,129,0.12)' },
  out:  { backgroundColor: 'rgba(239,68,68,0.12)' },
  text: { fontSize: 11, fontWeight: '700' },
});

export const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F2F8FD' },

  loadingContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: KB.navy, gap: 16,
  },
  loadingText: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },

  /* ── Header (gradiente) ── */
  headerGradient: {
    paddingTop: Platform.OS === 'ios' ? 56 : 40,
    paddingBottom: 54,
    paddingHorizontal: SPACING.lg,
    overflow: 'hidden',
    borderBottomLeftRadius: 40,
  },
  circle1: {
    position: 'absolute', width: 260, height: 260, borderRadius: 130,
    backgroundColor: 'rgba(126,200,232,0.16)', top: -110, right: -70,
  },
  circle2: {
    position: 'absolute', width: 140, height: 140, borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.05)', bottom: -50, left: -30,
  },
  headerTop: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
  },
  greetingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  greetingDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: KB.celeste },
  greeting:  { fontSize: 12, color: 'rgba(255,255,255,0.55)', fontWeight: '700', letterSpacing: 1.2, textTransform: 'uppercase' },
  userName:  { fontSize: 27, fontWeight: '800', color: KB.white, marginBottom: 6, letterSpacing: -0.3 },
  tagline:   { fontSize: 13, color: 'rgba(255,255,255,0.45)' },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1.5, borderColor: 'rgba(126,200,232,0.7)',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: KB.celesteSoft, fontSize: 17, fontWeight: '800' },

  /* ── Body ── */
  body: {
    marginTop: -28,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xxl,
  },

  /* ── Balance card — el "hero", gradiente vivo, blanco todo lo demás ── */
  balanceCardWrap: {
    borderRadius: 26,
    marginBottom: SPACING.md,
    shadowColor: KB.navy,
    shadowOpacity: 0.28,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  balanceCardGradient: {
    borderRadius: 26,
    padding: SPACING.lg,
    overflow: 'hidden',
  },
  balanceGlow: {
    position: 'absolute', width: 180, height: 180, borderRadius: 90,
    backgroundColor: 'rgba(126,200,232,0.22)', top: -70, right: -50,
  },
  balanceLbl: {
    fontSize: 11, fontWeight: '700', color: 'rgba(255,255,255,0.6)',
    letterSpacing: 1.2, marginBottom: 6, textTransform: 'uppercase',
  },
  balanceValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  balanceValue: { fontSize: 32, fontWeight: '800', color: KB.white, letterSpacing: -0.4 },
  balanceSubtitle: { fontSize: 12.5, color: 'rgba(255,255,255,0.55)', marginBottom: SPACING.md },
  balanceDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.14)', marginBottom: SPACING.md },
  balanceActions: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', width: '100%',
  },
  quickActionBtn:      { alignItems: 'center', flex: 1, maxWidth: 70 },
  quickActionIcon: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: 'rgba(126,200,232,0.22)',
    borderWidth: 1, borderColor: 'rgba(191,228,245,0.35)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 6,
  },
  quickActionLabel: { fontSize: 10, color: 'rgba(255,255,255,0.75)', fontWeight: '600', textAlign: 'center' },

  /* ── Stats 2x2 — planas, blancas, borde fino ── */
  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between',
    marginBottom: SPACING.lg, gap: SPACING.sm,
  },
  statCard: {
    width: '48.5%',
    backgroundColor: KB.white,
    borderRadius: 16,
    padding: SPACING.md,
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderWidth: 1,
    borderColor: KB.border,
    marginBottom: SPACING.sm,
  },
  statIconWrap: {
    width: 36, height: 36, borderRadius: 11,
    alignItems: 'center', justifyContent: 'center',
  },
  statCardLbl: { fontSize: 9.5, color: COLORS.gray400, fontWeight: '700', letterSpacing: 0.4 },
  statCardVal: { fontSize: 15.5, fontWeight: '800', color: COLORS.gray900, marginTop: 2 },

  /* ── Secciones ── */
  sectionRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginTop: SPACING.md, marginBottom: SPACING.md,
  },
  sectionEyebrow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  sectionDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: KB.accent },
  sectionTitle: {
    fontSize: 12, fontWeight: '800', color: COLORS.gray500,
    letterSpacing: 1, textTransform: 'uppercase',
  },
  seeAll: { fontSize: 13, color: KB.accent, fontWeight: '700' },
  seeAllRow: { flexDirection: 'row', alignItems: 'center', gap: 2 },

  /* ── Mis cuentas ── */
  accountCard: {
    backgroundColor: KB.white,
    borderRadius: 16,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: KB.border,
    marginBottom: SPACING.sm,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  accountInfo:    { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  accountIconWrap: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  accountNum:     { fontSize: 13.5, fontWeight: '700', color: COLORS.gray800, letterSpacing: 0.5 },
  accountStatusRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 3 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11.5, fontWeight: '700' },
  accountCurrency: { fontSize: 11, color: COLORS.gray400, fontWeight: '600' },
  accountBalance: { fontSize: 15, fontWeight: '800', color: COLORS.gray900 },

  /* ── Empty states ── */
  emptyCard: {
    backgroundColor: KB.white, borderRadius: 16,
    padding: SPACING.xl, alignItems: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 1, borderColor: KB.border, borderStyle: 'dashed',
  },
  emptyIcon:  { fontSize: 30, marginBottom: SPACING.sm },
  emptyTitle: { fontSize: 15, fontWeight: '700', color: COLORS.gray800, marginBottom: 4 },
  emptyText:  { fontSize: 13, color: COLORS.gray500, textAlign: 'center', lineHeight: 20 },
  emptyTx: {
    backgroundColor: KB.white, borderRadius: 16,
    padding: SPACING.xl, alignItems: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 1, borderColor: KB.border, borderStyle: 'dashed',
  },

  /* ── Movimientos recientes ── */
  txRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: KB.white, borderRadius: 16,
    padding: SPACING.md, marginBottom: SPACING.sm,
    borderWidth: 1, borderColor: KB.border, gap: SPACING.sm,
  },
  txIconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  txInfo:     { flex: 1 },
  txDesc:     { fontSize: 14, fontWeight: '700', color: COLORS.gray800 },
  txMeta:     { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  txType:     { fontSize: 11, fontWeight: '700' },
  txDot:      { fontSize: 11, color: COLORS.gray400 },
  txDate:     { fontSize: 11, color: COLORS.gray400 },
  txAmount:   { fontSize: 14, fontWeight: '800' },

  /* ── Logout ── */
  logoutBtn: {
    marginTop: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1.5, borderColor: 'rgba(239,68,68,0.25)',
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239,68,68,0.05)',
  },
  logoutText: { color: '#EF4444', fontWeight: '700', fontSize: 14 },

  /* ── Estilos legacy que se mantienen por compatibilidad ── */
  card: {
    borderRadius: 20, overflow: 'hidden', backgroundColor: KB.navyLight,
    padding: SPACING.lg, marginBottom: SPACING.sm,
    ...SHADOWS.md, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  cardGrad:       { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: KB.navyMid, opacity: 0.6 },
  cardTop:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.lg },
  cardBank:       { fontSize: 13, fontWeight: '900', color: KB.white, letterSpacing: 3 },
  cardChip:       { width: 32, height: 24, borderRadius: 4, backgroundColor: KB.gold, opacity: 0.85 },
  cardMid:        { marginBottom: SPACING.lg },
  cardBalanceLbl: { fontSize: 11, color: 'rgba(255,255,255,0.55)', marginBottom: 4, letterSpacing: 1 },
  cardBalance:    { fontSize: 32, fontWeight: '800', color: KB.white },
  cardBot:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  cardMeta:       { fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 2 },
  cardNum:        { fontSize: 15, fontWeight: '700', color: KB.white, letterSpacing: 2 },
  statusBadge:    { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 99 },
  badgeActive:    { backgroundColor: 'rgba(16,185,129,0.2)', borderWidth: 1, borderColor: 'rgba(16,185,129,0.4)' },
  badgeInactive:  { backgroundColor: 'rgba(239,68,68,0.2)', borderWidth: 1, borderColor: 'rgba(239,68,68,0.4)' },
  badgeText:      { fontSize: 10, fontWeight: '800', color: KB.white, letterSpacing: 1 },
  dotRow:         { flexDirection: 'row', justifyContent: 'center', gap: 6, marginBottom: SPACING.md },
  dot:            { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(0,0,0,0.15)' },
  dotActive:      { width: 18, backgroundColor: '#3B7DD8' },
});