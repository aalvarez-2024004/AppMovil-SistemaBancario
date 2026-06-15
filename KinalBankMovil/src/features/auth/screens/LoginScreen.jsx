import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../../shared/store/authStore';
import Button from '../../../shared/components/Button';
import Input from '../../../shared/components/Input';
import { COLORS, SPACING, BORDER_RADIUS } from '../../../shared/constants/theme';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login, isLoading } = useAuthStore();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  // Para el banner de error inline (igual al web)
  const [loginError, setLoginError] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.email.trim())  e.email    = 'El correo es requerido';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Correo inválido';
    if (!form.password)       e.password = 'La contraseña es requerida';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    setLoginError(null);
    if (!validate()) return;

    const result = await login(form.email, form.password);

    if (!result.success) {
      // El backend devuelve "pendiente" cuando la cuenta no ha sido aprobada
      setLoginError(result.error);
    }
    // Si tiene éxito, AppNavigator detecta isAuthenticated y cambia a MainTabs
    // automáticamente — no hace falta navegar manualmente.
  };

  const isPending = loginError?.toLowerCase().includes('pendiente');

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Logo / encabezado ── */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>🏦</Text>
          </View>
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.subtitle}>Inicia sesión en tu cuenta bancaria</Text>
        </View>

        {/* ── Formulario ── */}
        <View style={styles.form}>
          <Input
            label="Correo electrónico"
            placeholder="correo@ejemplo.com"
            value={form.email}
            onChangeText={(v) => setForm({ ...form, email: v })}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <Input
            label="Contraseña"
            placeholder="••••••••"
            value={form.password}
            onChangeText={(v) => setForm({ ...form, password: v })}
            secureTextEntry
            error={errors.password}
          />

          {/* ── Banner de error (cuenta pendiente o credenciales incorrectas) ── */}
          {loginError && (
            <View style={isPending ? styles.alertPending : styles.alertError}>
              <Text style={isPending ? styles.alertTitle_warning : styles.alertTitle_error}>
                {isPending ? 'Cuenta pendiente de aprobación' : 'Credenciales incorrectas'}
              </Text>
              <Text style={isPending ? styles.alertBody_warning : styles.alertBody_error}>
                {isPending
                  ? 'Un administrador debe aprobar tu cuenta antes de que puedas ingresar.'
                  : 'Verifica tu correo y contraseña e intenta de nuevo.'}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <Button
            title="Iniciar sesión"
            onPress={handleLogin}
            isLoading={isLoading}
            style={styles.loginButton}
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>o</Text>
            <View style={styles.dividerLine} />
          </View>

          <Button
            title="Crear cuenta nueva"
            onPress={() => navigation.navigate('Register')}
            variant="outline"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex:      { flex: 1, backgroundColor: COLORS.gray50 },
  container: { flexGrow: 1, padding: SPACING.lg, justifyContent: 'center' },

  /* Encabezado */
  header: { alignItems: 'center', marginBottom: SPACING.xl },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  logoIcon: { fontSize: 36 },
  title:    { fontSize: 28, fontWeight: '700', color: COLORS.gray900, marginBottom: 8 },
  subtitle: { fontSize: 15, color: COLORS.gray500, textAlign: 'center' },

  /* Tarjeta del formulario */
  form: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  /* Banners de error */
  alertError: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  alertPending: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FCD34D',
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  alertTitle_error: {
    fontSize: 13,
    fontWeight: '700',
    color: '#991B1B',
    marginBottom: 3,
  },
  alertTitle_warning: {
    fontSize: 13,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 3,
  },
  alertBody_error: {
    fontSize: 12,
    color: '#B91C1C',
    lineHeight: 18,
  },
  alertBody_warning: {
    fontSize: 12,
    color: '#A16207',
    lineHeight: 18,
  },

  /* Forgot */
  forgotButton: { alignSelf: 'flex-end', marginBottom: SPACING.md, marginTop: -4 },
  forgotText:   { fontSize: 13, color: COLORS.primary, fontWeight: '500' },

  loginButton: { marginBottom: SPACING.md },

  /* Divisor */
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.md,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.gray200 },
  dividerText: { marginHorizontal: SPACING.sm, color: COLORS.gray400, fontSize: 13 },
});

export default LoginScreen;
