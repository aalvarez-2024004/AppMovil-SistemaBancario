import { Dimensions, StyleSheet, Platform } from 'react-native';

export const KB = {
  blueDark:    '#081F3D',
  blueMid:     '#0F3D75',
  blueLight:   '#1B5FA8',
  white:       '#FFFFFF',
  offWhite:    '#F4F7FB',
  textDark:    '#0D2A47',
  gray:        '#8A99AC',
  grayLight:   '#B9C4D3',
  border:      '#DCE3EC',
  success:     '#10B981',
  successBg:   'rgba(16,185,129,0.10)',
  error:       '#E5484D',
  errorBg:     'rgba(229,72,77,0.08)',
  disabled:    '#C9D2DE',
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

export const isSmallDevice = SCREEN_W < 360;
export const isTablet       = SCREEN_W >= 768;

export const STEPS = [
  { id: 1, icon: '👤', title: 'Datos personales', sub: 'Tu información básica' },
  { id: 2, icon: '💼', title: 'Datos laborales',   sub: 'Ocupación e ingresos'  },
  { id: 3, icon: '🔒', title: 'Seguridad',         sub: 'Crea tu contraseña'    },
];

/* Stepper */
export const sb = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20 },
  item: { alignItems: 'center', gap: 6, maxWidth: isSmallDevice ? 40 : 80 },
  circle: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: KB.offWhite,
    borderWidth: 1.5,
    borderColor: KB.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleActive: { backgroundColor: KB.blueMid, borderColor: KB.blueMid },
  circleDone:   { backgroundColor: KB.success, borderColor: KB.success },
  checkText: { color: KB.white, fontSize: scale(14), fontWeight: '800' },
  numText:   { color: KB.gray,  fontSize: scale(14), fontWeight: '700' },
  numActive: { color: KB.white },
  label: {
    fontSize: scale(9), fontWeight: '600', color: KB.gray,
    textAlign: 'center', letterSpacing: 0.3, maxWidth: 64,
  },
  labelActive: { color: KB.blueMid },
  line: {
    flex: 1, height: 1.5, backgroundColor: KB.border,
    marginTop: scale(17), marginHorizontal: 4,
  },
  lineDone: { backgroundColor: KB.success },
});

/* Inputs */
export const fi = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '700', color: KB.textDark, marginBottom: 8 },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: KB.white,
    borderWidth: 1.5,
    borderColor: KB.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: scale(54),
    minHeight: 48,
  },
  boxFocused: { borderColor: KB.blueMid },
  boxError:   { borderColor: KB.error, backgroundColor: KB.errorBg },
  input: { flex: 1, fontSize: scale(15), color: KB.textDark, paddingVertical: 0 },
  eye: { padding: 4 },
  error: { fontSize: scale(12), color: KB.error, marginTop: 5, fontWeight: '500' },
});

/* Botones */
export const btn = StyleSheet.create({
  base: {
    height: scale(54), minHeight: 48, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', marginBottom: 10,
  },
  primary:  { backgroundColor: KB.blueMid },
  outline:  { borderWidth: 1.5, borderColor: KB.blueMid },
  ghost:    { backgroundColor: 'transparent' },
  disabled: { backgroundColor: KB.disabled },
  text:        { color: KB.white, fontSize: scale(14), fontWeight: '700', letterSpacing: 0.5 },
  textOutline: { color: KB.blueMid, letterSpacing: 0.3, fontWeight: '700' },
  textGhost:   { color: KB.gray,  fontSize: scale(13), fontWeight: '600', letterSpacing: 0 },
});

/* Pantalla */
export const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: KB.white },
  scroll: { flexGrow: 1, paddingBottom: 40 },

  /* Header con gradiente, igual estilo que el login */
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 44,
    paddingBottom: 44,
    paddingHorizontal: isSmallDevice ? 16 : 24,
    borderBottomLeftRadius: 40,
  },
  brandName: {
    fontSize: scale(12), fontWeight: '800', letterSpacing: 4,
    color: 'rgba(255,255,255,0.75)', marginBottom: 8,
  },
  pageTitle: { fontSize: scale(26), fontWeight: '800', color: KB.white, marginBottom: 2 },
  pageSub:   { fontSize: scale(13), color: 'rgba(255,255,255,0.8)' },

  /* Card blanca superpuesta */
  cardWrap: {
    marginTop: -26,
    paddingHorizontal: isSmallDevice ? 16 : 24,
  },
  card: {
    backgroundColor: KB.white,
    borderRadius: 20,
    padding: isSmallDevice ? 16 : 20,
    marginBottom: 16,
    shadowColor: KB.blueDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },

  /* Stepper wrapper (va arriba de la card, sobre fondo blanco) */
  stepBarWrap: { marginBottom: 16 },

  /* Encabezado de cada paso */
  stepHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    marginBottom: 18, paddingBottom: 14,
    borderBottomWidth: 1, borderBottomColor: KB.border,
  },
  stepIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(15,61,117,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepHeaderText: { flex: 1 },

  row:  isSmallDevice ? { flexDirection: 'column' } : { flexDirection: 'row', gap: 10 },
  half: { flex: 1 },

  infoCard: {
    flexDirection: 'row', gap: 10,
    backgroundColor: 'rgba(15,61,117,0.06)',
    borderRadius: 12, borderWidth: 1, borderColor: 'rgba(15,61,117,0.15)',
    padding: 14, marginBottom: 16, alignItems: 'flex-start',
  },
  infoCardIcon: { fontSize: scale(18), marginTop: 1 },
  infoCardText: { flex: 1, fontSize: scale(12), color: KB.gray, lineHeight: scale(18) },

  strengthRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: -8, marginBottom: 16 },
  strengthBar: { flex: 1, height: 3, borderRadius: 2 },
  strengthLabel: { fontSize: scale(11), fontWeight: '700', minWidth: 42 },

  checkList: {
    backgroundColor: KB.offWhite, borderRadius: 12,
    padding: 14, marginBottom: 16, gap: 8,
    borderWidth: 1, borderColor: KB.border,
  },
  checkItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  checkText: { fontSize: scale(12), color: KB.gray },
  checkTextOk: { color: KB.textDark, fontWeight: '600' },

  loginRow: { flexDirection: 'row', justifyContent: 'center', paddingVertical: 8 },
  loginText: { fontSize: scale(14), color: KB.gray },
  loginLink: { fontSize: scale(14), color: KB.blueMid, fontWeight: '700' },
});

/* Modal de éxito */
export const sm = StyleSheet.create({
  overlay: {
    flex: 1, backgroundColor: 'rgba(8,31,61,0.55)',
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20,
  },
  card: {
    width: '100%', maxWidth: isTablet ? 440 : 400,
    backgroundColor: KB.white, borderRadius: 24,
    padding: 24, alignItems: 'center',
  },
  iconCircle: {
    width: scale(64), height: scale(64), borderRadius: scale(32),
    backgroundColor: KB.successBg, borderWidth: 1.5, borderColor: KB.success,
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  iconText: { color: KB.success, fontSize: scale(30), fontWeight: '800' },
  title: { fontSize: scale(19), fontWeight: '800', color: KB.textDark, marginBottom: 8, textAlign: 'center' },
  message: { fontSize: scale(13), color: KB.gray, textAlign: 'center', lineHeight: scale(19), marginBottom: 20 },
});