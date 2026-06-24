import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  StatusBar,
  useWindowDimensions,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../../shared/store/useAuthStore';
import { SPACING, BORDER_RADIUS } from '../../../shared/constants/theme';

const KB = {
  navy:        '#0F1F3D',
  navyMid:     '#162847',
  navyLight:   '#1E3A5F',
  accentBlue:  '#3B7DD8',
  white:       '#FFFFFF',
  gray:        '#8FA3BF',
  error:       '#FF6B6B',
  errorBg:     'rgba(255,107,107,0.12)',
  warning:     '#F59E0B',
  warningBg:   'rgba(245,158,11,0.12)',
  inputBg:     'rgba(255,255,255,0.07)',
  inputBorder: 'rgba(255,255,255,0.15)',
};

/* ── Campo de texto con estilo Kinal Bank ───────────────────────────────────── */
const KBInput = ({ label, placeholder, value, onChangeText, secureTextEntry, keyboardType, error }) => {
  const [focused, setFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);

  return (
    <View style={fi.wrapper}>
      <Text style={fi.label}>{label}</Text>
      <View style={[fi.box, focused && fi.boxFocused, error && fi.boxError]}>
        <TextInput
          style={fi.input}
          placeholder={placeholder}
          placeholderTextColor={KB.gray}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPass}
          keyboardType={keyboardType || 'default'}
          autoCapitalize="none"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={s.forgotRow}
            onPress={() => {
              Keyboard.dismiss();
              navigation.navigate('ForgotPassword');
            }}
          >
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={fi.error}>{error}</Text> : null}
    </View>
  );
};

const fi = StyleSheet.create({
  wrapper: { marginBottom: SPACING.md },
  label: {
    fontSize: 11,
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
    height: 54,
  },
  boxFocused: {
    borderColor: KB.accentBlue,
    backgroundColor: 'rgba(59,125,216,0.08)',
  },
  boxError: {
    borderColor: KB.error,
    backgroundColor: KB.errorBg,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: KB.white,
  },
  eye: { padding: 4 },
  eyeText: { fontSize: 16 },
  error: {
    fontSize: 12,
    color: KB.error,
    marginTop: 5,
    fontWeight: '500',
  },
});

/* ── Pantalla ───────────────────────────────────────────────────────────────── */
const LoginScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    return () => {
      Keyboard.dismiss();
    };
  }, []);
  const { login, isLoading } = useAuthStore();
  const { width, height } = useWindowDimensions();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'El correo es requerido';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Correo inválido';
    if (!form.password) e.password = 'La contraseña es requerida';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    setLoginError(null);
    if (!validate()) return;
    const result = await login(form.email, form.password);
    if (!result.success) setLoginError(result.error);
  };

  const isPending = loginError?.toLowerCase().includes('pendiente');

  return (
    // ✅ root ocupa exactamente la pantalla, sin posibilidad de scroll horizontal
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={KB.navy} />

      {/* Círculos decorativos de fondo */}
      <View style={s.circle1} pointerEvents="none" />
      <View style={s.circle2} pointerEvents="none" />

      <KeyboardAvoidingView
        style={s.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[s.scroll, { minHeight: height }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          // ✅ Deshabilitar scroll horizontal que causaba el espacio en blanco
          horizontal={false}
          bounces={false}
          overScrollMode="never"
        >
          {/* Marca */}
          <View style={s.brand}>
            <View style={s.logoRing}>
              <Text style={s.logoEmoji}>🏛</Text>
            </View>
            <Text style={s.brandName}>KINAL BANK</Text>
            <Text style={s.brandTagline}>Con tus ahorros, construyes logros.</Text>
          </View>

          {/* Card formulario */}
          <View style={s.card}>
            <Text style={s.cardTitle}>Bienvenido</Text>
            <Text style={s.cardSub}>Ingresa a tu cuenta</Text>
            <View style={s.dividerLine} />

            <KBInput
              label="Correo electrónico"
              placeholder="correo@ejemplo.com"
              value={form.email}
              onChangeText={(v) => setForm({ ...form, email: v })}
              keyboardType="email-address"
              error={errors.email}
            />

            <KBInput
              label="Contraseña"
              placeholder="••••••••"
              value={form.password}
              onChangeText={(v) => setForm({ ...form, password: v })}
              secureTextEntry
              error={errors.password}
            />

            <TouchableOpacity
              style={s.forgotRow}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={s.forgotText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            {loginError ? (
              <View style={[s.alertBox, isPending ? s.alertWarning : s.alertError]}>
                <Text style={s.alertIcon}>{isPending ? '⏳' : '⚠️'}</Text>
                <View style={s.flex1}>
                  <Text style={[s.alertTitle, { color: isPending ? KB.warning : KB.error }]}>
                    {isPending ? 'Cuenta pendiente de aprobación' : 'Credenciales incorrectas'}
                  </Text>
                  <Text style={s.alertBody}>
                    {isPending
                      ? 'Un administrador debe aprobar tu cuenta para continuar.'
                      : 'Verifica tu correo y contraseña e intenta de nuevo.'}
                  </Text>
                </View>
              </View>
            ) : null}

            <TouchableOpacity
              style={[s.btnPrimary, isLoading && s.btnDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.85}
            >
              <Text style={s.btnPrimaryText}>
                {isLoading ? 'Verificando...' : 'INGRESAR'}
              </Text>
            </TouchableOpacity>

            <View style={s.orRow}>
              <View style={s.orLine} />
              <Text style={s.orText}>o</Text>
              <View style={s.orLine} />
            </View>

            <TouchableOpacity
              style={s.btnOutline}
              onPress={() => navigation.navigate('Register')}
              activeOpacity={0.85}
            >
              <Text style={s.btnOutlineText}>Crear cuenta nueva</Text>
            </TouchableOpacity>
          </View>

          {/* Stats bar */}
          <View style={s.stats}>
            <View style={s.statItem}>
              <Text style={s.statValue}>24/7</Text>
              <Text style={s.statLabel}>Disponibilidad</Text>
            </View>
            <View style={s.statSep} />
            <View style={s.statItem}>
              <Text style={s.statValue}>+85K</Text>
              <Text style={s.statLabel}>Clientes protegidos</Text>
            </View>
            <View style={s.statSep} />
            <View style={s.statItem}>
              <Text style={s.statValue}>100%</Text>
              <Text style={s.statLabel}>Seguro</Text>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const s = StyleSheet.create({
  // ✅ flex:1 + overflow hidden para evitar scroll horizontal / espacio en blanco
  root: {
    flex: 1,
    backgroundColor: KB.navy,
    overflow: 'hidden',
  },
  flex1: { flex: 1 },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: 56,
    paddingBottom: SPACING.xl,
  },

  /* Círculos decorativos */
  circle1: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(59,125,216,0.1)',
    top: -100,
    right: -100,
  },
  circle2: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(201,168,76,0.07)',
    bottom: 80,
    left: -80,
  },

  /* Marca */
  brand: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: KB.navyLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoEmoji: { fontSize: 32 },
  brandName: {
    fontSize: 22,
    fontWeight: '800',
    color: KB.white,
    letterSpacing: 5,
    marginBottom: 4,
  },
  brandTagline: {
    fontSize: 13,
    color: KB.gray,
    fontStyle: 'italic',
  },

  /* Card */
  card: {
    backgroundColor: KB.navyMid,
    borderRadius: 20,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: SPACING.lg,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: KB.white,
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 14,
    color: KB.gray,
    marginBottom: SPACING.md,
  },
  dividerLine: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginBottom: SPACING.lg,
  },

  /* Forgot */
  forgotRow: { alignSelf: 'flex-end', marginTop: -4, marginBottom: SPACING.md },
  forgotText: { fontSize: 13, color: KB.accentBlue, fontWeight: '600' },

  /* Alertas */
  alertBox: {
    flexDirection: 'row',
    gap: 10,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
  },
  alertError:   { backgroundColor: KB.errorBg,   borderColor: 'rgba(255,107,107,0.3)' },
  alertWarning: { backgroundColor: KB.warningBg, borderColor: 'rgba(245,158,11,0.3)'  },
  alertIcon:    { fontSize: 18, marginTop: 1 },
  alertTitle:   { fontSize: 13, fontWeight: '700', marginBottom: 2 },
  alertBody:    { fontSize: 12, color: KB.gray, lineHeight: 18 },

  /* Botón principal */
  btnPrimary: {
    backgroundColor: KB.white,
    borderRadius: BORDER_RADIUS.lg,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  btnPrimaryText: {
    color: KB.navy,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 2,
  },
  btnDisabled: { opacity: 0.5 },

  /* OR */
  orRow: { flexDirection: 'row', alignItems: 'center', marginVertical: SPACING.sm },
  orLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.1)' },
  orText: { color: KB.gray, fontSize: 12, marginHorizontal: SPACING.sm },

  /* Botón outline */
  btnOutline: {
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
    borderRadius: BORDER_RADIUS.lg,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnOutlineText: {
    color: KB.white,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  /* Stats */
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 17, fontWeight: '800', color: KB.white, marginBottom: 2 },
  statLabel: { fontSize: 10, color: KB.gray, textAlign: 'center', letterSpacing: 0.3 },
  statSep:   { width: 1, height: 32, backgroundColor: 'rgba(255,255,255,0.1)' },
});

export default LoginScreen;