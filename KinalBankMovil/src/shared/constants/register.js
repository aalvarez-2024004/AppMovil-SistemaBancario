import { SPACING, BORDER_RADIUS } from './theme';
import { Dimensions, StyleSheet, Platform } from 'react-native';

export const KB = {
  navy:        '#0F1F3D',
  navyMid:     '#162847',
  navyLight:   '#1E3A5F',
  accentBlue:  '#3B7DD8',
  white:       '#FFFFFF',
  gray:        '#8FA3BF',
  grayLight:   '#D4E0EE',
  success:     '#10B981',
  successBg:   'rgba(16,185,129,0.12)',
  error:       '#FF6B6B',
  errorBg:     'rgba(255,107,107,0.12)',
  inputBg:     'rgba(255,255,255,0.07)',
  inputBorder: 'rgba(255,255,255,0.15)',
};

const { width: SCREEN_W } = Dimensions.get('window');
const BASE_WIDTH = 375;
const MIN_SCALE = 0.85;
const MAX_SCALE = 1.25;

export const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

export const scale = (size) => {
  const factor = clamp(SCREEN_W / BASE_WIDTH, MIN_SCALE, MAX_SCALE);
  return Math.round(size * factor);
};

export const isSmallDevice = SCREEN_W < 360;   // ej. iPhone SE
export const isTablet       = SCREEN_W >= 768; // ej. iPad / tablets Android

export const STEPS = [
  { id: 1, icon: '👤', title: 'Datos personales',  sub: 'Tu información básica' },
  { id: 2, icon: '💼', title: 'Datos laborales',    sub: 'Ocupación e ingresos'  },
  { id: 3, icon: '🔒', title: 'Seguridad',          sub: 'Crea tu contraseña'    },
];

export const sb = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  item: { alignItems: 'center', gap: 6, maxWidth: isSmallDevice ? 40 : 80 },
  circle: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleActive: {
    backgroundColor: KB.accentBlue,
    borderColor: KB.accentBlue,
  },
  circleDone: {
    backgroundColor: KB.success,
    borderColor: KB.success,
  },
  checkText: { color: KB.white, fontSize: scale(14), fontWeight: '800' },
  numText:   { color: KB.gray,  fontSize: scale(14), fontWeight: '700' },
  numActive: { color: KB.white },
  label: {
    fontSize: scale(9),
    fontWeight: '600',
    color: KB.gray,
    textAlign: 'center',
    letterSpacing: 0.3,
    maxWidth: 64,
  },
  labelActive: { color: KB.white },
  line: {
    flex: 1,
    height: 1.5,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginTop: scale(17),
    marginHorizontal: 4,
  },
  lineDone: { backgroundColor: KB.success },
});

export const fi = StyleSheet.create({
  wrapper: { marginBottom: SPACING.md },
  label: {
    fontSize: scale(11),
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: KB.gray,
    marginBottom: 8,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: KB.inputBg,
    borderWidth: 1,
    borderColor: KB.inputBorder,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    height: scale(54),
    minHeight: 48, // accesibilidad táctil mínima
  },
  boxFocused: {
    borderColor: KB.accentBlue,
    backgroundColor: 'rgba(59,125,216,0.08)',
  },
  boxError: {
    borderColor: KB.error,
    backgroundColor: KB.errorBg,
  },
  input: { flex: 1, fontSize: scale(15), color: KB.white, paddingVertical: 0 },
  eye:      { padding: 4 },
  eyeText:  { fontSize: scale(16) },
  error:    { fontSize: scale(12), color: KB.error, marginTop: 5, fontWeight: '500' },
});

export const btn = StyleSheet.create({
  base: {
    height: scale(54),
    minHeight: 48,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  primary:     { backgroundColor: KB.white },
  outline:     { borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.25)' },
  ghost:       { backgroundColor: 'transparent' },
  disabled:    { opacity: 0.45 },
  text:        { color: KB.navy, fontSize: scale(14), fontWeight: '800', letterSpacing: 1.5 },
  textOutline: { color: KB.white, letterSpacing: 0.5, fontWeight: '600' },
  textGhost:   { color: KB.gray,  fontSize: scale(13), fontWeight: '500', letterSpacing: 0 },
});

export const s = StyleSheet.create({
  root:  { flex: 1, backgroundColor: KB.navy },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: isSmallDevice ? SPACING.md : SPACING.lg,
    paddingTop: Platform.OS === 'ios' ? 52 : 36,
    paddingBottom: SPACING.xl,
  },

  /* Decoración — más chica en pantallas pequeñas para no robar espacio visual */
  circle1: {
    position: 'absolute',
    width: isSmallDevice ? 200 : 280,
    height: isSmallDevice ? 200 : 280,
    borderRadius: 140,
    backgroundColor: 'rgba(59,125,216,0.1)',
    top: -80, right: -80,
  },
  circle2: {
    position: 'absolute',
    width: isSmallDevice ? 130 : 180,
    height: isSmallDevice ? 130 : 180,
    borderRadius: 90,
    backgroundColor: 'rgba(16,185,129,0.07)',
    bottom: 60, left: -60,
  },

  /* Encabezado */
  header: { marginBottom: SPACING.lg },
  brandName: {
    fontSize: scale(12), fontWeight: '800', letterSpacing: 4,
    color: KB.accentBlue, marginBottom: 8,
  },
  pageTitle: { fontSize: scale(28), fontWeight: '800', color: KB.white, marginBottom: 2 },
  pageSub:   { fontSize: scale(13), color: KB.gray },

  /* Card */
  card: {
    backgroundColor: KB.navyMid,
    borderRadius: 20,
    padding: isSmallDevice ? SPACING.md : SPACING.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: SPACING.md,
  },

  /* Encabezado de cada paso */
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  stepHeaderText: { flex: 1 },
  stepIcon:  { fontSize: scale(28) },
  stepTitle: { fontSize: scale(18), fontWeight: '700', color: KB.white },
  stepSub:   { fontSize: scale(12), color: KB.gray, marginTop: 2 },

  /* Fila de 2 columnas — en pantallas muy chicas se apilan para que no se compriman los inputs */
  row:  isSmallDevice
    ? { flexDirection: 'column' }
    : { flexDirection: 'row', gap: SPACING.sm },
  half: isSmallDevice ? { flex: 1 } : { flex: 1 },

  /* Tarjeta informativa paso 2 */
  infoCard: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'rgba(59,125,216,0.1)',
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: 'rgba(59,125,216,0.25)',
    padding: SPACING.md,
    marginBottom: SPACING.md,
    alignItems: 'flex-start',
  },
  infoCardIcon: { fontSize: scale(18), marginTop: 1 },
  infoCardText: { flex: 1, fontSize: scale(12), color: KB.gray, lineHeight: scale(18) },

  /* Fuerza de contraseña */
  strengthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: -8,
    marginBottom: SPACING.md,
  },
  strengthBar: {
    flex: 1, height: 3, borderRadius: 2,
  },
  strengthLabel: { fontSize: scale(11), fontWeight: '700', minWidth: 42 },

  /* Checklist contraseña */
  checkList: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    gap: 8,
  },
  checkItem:   { flexDirection: 'row', alignItems: 'center', gap: 8 },
  checkText:   { fontSize: scale(12), color: KB.gray },
  checkTextOk: { color: KB.white },

  /* Footer */
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
  },
  loginText: { fontSize: scale(14), color: KB.gray },
  loginLink: { fontSize: scale(14), color: KB.accentBlue, fontWeight: '600' },
});

export const sm = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15,31,61,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
  },
  card: {
    width: '100%',
    maxWidth: isTablet ? 440 : 400,
    backgroundColor: KB.navyMid,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: SPACING.lg,
    alignItems: 'center',
  },
  iconCircle: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    backgroundColor: KB.successBg,
    borderWidth: 1.5,
    borderColor: KB.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  iconText: { color: KB.success, fontSize: scale(30), fontWeight: '800' },
  title: {
    fontSize: scale(19),
    fontWeight: '800',
    color: KB.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: scale(13),
    color: KB.gray,
    textAlign: 'center',
    lineHeight: scale(19),
    marginBottom: SPACING.lg,
  },
});