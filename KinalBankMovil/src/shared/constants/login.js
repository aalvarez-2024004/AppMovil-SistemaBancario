import { StyleSheet } from 'react-native';
import { SPACING, BORDER_RADIUS } from './theme';

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
  error:       '#E5484D',
  errorBg:     'rgba(229,72,77,0.08)',
  warning:     '#F5A623',
  warningBg:   'rgba(245,166,35,0.10)',
  disabled:    '#C9D2DE',
};

export const fi = StyleSheet.create({
  wrapper: { marginBottom: SPACING.md },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: KB.textDark,
    marginBottom: 8,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: KB.white,
    borderWidth: 1.5,
    borderColor: KB.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 54,
  },
  boxFocused: {
    borderColor: KB.blueMid,
  },
  boxError: {
    borderColor: KB.error,
    backgroundColor: KB.errorBg,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: KB.textDark,
  },
  eye: { padding: 6 },
  error: {
    fontSize: 12,
    color: KB.error,
    marginTop: 6,
    fontWeight: '500',
  },
});

export const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: KB.white },
  flex1: { flex: 1 },
  scroll: {
    flexGrow: 1,
    paddingBottom: SPACING.xl,
  },

  /* Header con gradiente */
  header: {
    paddingTop: 70,
    paddingBottom: 50,
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    overflow: 'hidden',
  },
  headerDecor: {
    position: 'absolute',
    top: -30,
    left: -30,
    width: 140,
    height: 140,
    borderRadius: 28,
    borderWidth: 2.5,
    borderColor: 'rgba(255,255,255,0.25)',
    transform: [{ rotate: '10deg' }],
  },

  logoRing: {
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
  logoImage: {
    width: '80%',
    height: '80%',
    tintColor: '#FFFFFF',
  },
  brandTagTittle: {
    fontSize: 25,
    color: 'rgb(255, 255, 255)',
  },
  brandTagline: {
    fontSize: 19,
    color: 'rgba(255,255,255,0.8)',
  },

  card: {
    backgroundColor: KB.white,
    marginTop: -28,
    marginHorizontal: SPACING.lg,
    borderRadius: 20,
    padding: SPACING.lg,
    shadowColor: '#0D3B66',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  cardTitle: { fontSize: 20, fontWeight: '800', color: KB.textDark, marginBottom: 4 },
  cardSub: { fontSize: 13, color: KB.gray, marginBottom: SPACING.lg },

  forgotRow: { alignSelf: 'center', marginTop: 4, marginBottom: SPACING.lg },
  forgotText: { fontSize: 13, color: KB.blueMid, fontWeight: '600' },

  alertBox: {
    flexDirection: 'row',
    gap: 10,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
  },
  alertError:   { backgroundColor: KB.errorBg,   borderColor: 'rgba(229,72,77,0.25)' },
  alertWarning: { backgroundColor: KB.warningBg, borderColor: 'rgba(245,166,35,0.25)' },
  alertIcon:    { fontSize: 18, marginTop: 1 },
  alertTitle:   { fontSize: 13, fontWeight: '700', marginBottom: 2 },
  alertBody:    { fontSize: 12, color: KB.gray, lineHeight: 18 },

  btnPrimary: {
    backgroundColor: KB.blueMid,
    borderRadius: BORDER_RADIUS.md,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  btnPrimaryText: { color: KB.white, fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
  btnDisabled: { backgroundColor: KB.disabled },

  orRow: { flexDirection: 'row', alignItems: 'center', marginVertical: SPACING.sm },
  orLine: { flex: 1, height: 1, backgroundColor: KB.border },
  orText: { color: KB.gray, fontSize: 12, marginHorizontal: SPACING.sm },

  btnOutline: {
    borderWidth: 1.5,
    borderColor: KB.blueMid,
    borderRadius: BORDER_RADIUS.md,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnOutlineText: { color: KB.blueMid, fontSize: 14, fontWeight: '700' },

  /* Footer versión */
  footer: { alignItems: 'center', marginTop: SPACING.lg },
  footerText: { fontSize: 11, color: KB.grayLight },

  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    backgroundColor: KB.offWhite,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.md,
    borderWidth: 1,
    borderColor: KB.border,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 16, fontWeight: '800', color: KB.blueMid, marginBottom: 2 },
  statLabel: { fontSize: 10, color: KB.gray, textAlign: 'center' },
  statSep: { width: 1, height: 30, backgroundColor: KB.border },
});