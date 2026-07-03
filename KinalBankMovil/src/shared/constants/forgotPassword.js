import { StyleSheet } from "react-native";
import { KB, scale } from "./register";

export const STEPS = [
  { id: 1, icon: 'mail-outline',         title: 'Correo',     sub: 'Tu correo registrado' },
  { id: 2, icon: 'key-outline',          title: 'Código',     sub: 'Verifica tu identidad' },
  { id: 3, icon: 'lock-closed-outline',  title: 'Contraseña', sub: 'Crea una nueva clave' },
];

export const local = StyleSheet.create({
  boxLarge:  { height: scale(70), borderRadius: 14 },
  inputLarge:{ fontSize: scale(28), fontWeight: '700', letterSpacing: 10 },

  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: -8, marginBottom: 16 },
  digitDot: {
    width: 10, height: 10, borderRadius: 5,
    backgroundColor: KB.offWhite,
    borderWidth: 1, borderColor: KB.border,
  },
  digitDotFilled: { backgroundColor: KB.blueMid, borderColor: KB.blueMid },

  twoLinks: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  ghostLink: { fontSize: scale(13), color: KB.gray, textDecorationLine: 'underline' },
  ghostLinkAccent: { color: KB.blueMid, fontWeight: '700' },

  banner: { borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 16 },
  bannerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3 },
  bannerTitle: { fontSize: scale(13), fontWeight: '700' },
  bannerBody:  { fontSize: scale(12), color: KB.gray, lineHeight: scale(18) },

  successRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },

  btnWithIcon: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  linkWithIcon: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});

export const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(24),
  },
  content: {
    backgroundColor: KB.white,
    width: '90%',
    maxWidth: scale(340),
    borderRadius: scale(24), 
    paddingVertical: scale(32), 
    paddingHorizontal: scale(24), 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 12,
  },
  iconCircle: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)', 
    padding: scale(14),
    marginBottom: scale(20),
  },
  title: {
    fontSize: scale(20), 
    fontWeight: '800',
    color: KB.textDark,
    marginBottom: scale(12),
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  body: {
    fontSize: scale(14),
    color: '#64748B', 
    textAlign: 'center',
    marginBottom: scale(28),
    lineHeight: scale(20), 
    paddingHorizontal: scale(8),
  },
});