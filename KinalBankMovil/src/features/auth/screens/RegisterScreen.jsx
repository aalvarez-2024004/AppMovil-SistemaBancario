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

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { register, isLoading } = useAuthStore();

  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    dpi: '',
    phone: '',
    address: '',
    job: '',
    monthlyIncome: '',
  });
  const [errors, setErrors] = useState({});

  const update = (field) => (value) => setForm((prev) => ({ ...prev, [field]: value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())           e.name            = 'El nombre completo es requerido';
    if (!form.username.trim())        e.username         = 'El username es requerido';
    if (!form.email.trim())           e.email            = 'El correo es requerido';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email  = 'Correo inválido';
    if (!form.password)               e.password         = 'La contraseña es requerida';
    else if (form.password.length < 8) e.password        = 'Mínimo 8 caracteres';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Las contraseñas no coinciden';
    if (!form.dpi.trim())             e.dpi              = 'El DPI es requerido';
    else if (!/^\d{13}$/.test(form.dpi)) e.dpi           = 'El DPI debe tener 13 dígitos';
    if (!form.phone.trim())           e.phone            = 'El teléfono es requerido';
    if (!form.address.trim())         e.address          = 'La dirección es requerida';
    if (!form.job.trim())             e.job              = 'La ocupación es requerida';
    if (!form.monthlyIncome)          e.monthlyIncome    = 'Los ingresos mensuales son requeridos';
    else if (Number(form.monthlyIncome) < 100) e.monthlyIncome = 'Mínimo Q100';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    const { confirmPassword, ...userData } = form;
    const result = await register({ ...userData, monthlyIncome: Number(userData.monthlyIncome) });
    if (!result.success) {
      Alert.alert('Error en el registro', result.error);
    } else {
      Alert.alert(
        'Registro enviado ⏳',
        'Tu cuenta está pendiente de aprobación por un administrador.',
        [{ text: 'Volver al login', onPress: () => navigation.navigate('Login') }]
      );
    }
  };

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
        {/* ── Encabezado ── */}
        <View style={styles.header}>
          <Text style={styles.title}>Crear cuenta</Text>
          <Text style={styles.subtitle}>Completa todos los datos para registrarte</Text>
        </View>

        <View style={styles.form}>

          {/* ── Sección: datos personales ── */}
          <SectionLabel text="Datos personales" />

          <View style={styles.row}>
            <View style={styles.half}>
              <Input
                label="Nombre completo"
                placeholder="Ana García"
                value={form.name}
                onChangeText={update('name')}
                autoCapitalize="words"
                error={errors.name}
              />
            </View>
            <View style={styles.half}>
              <Input
                label="Username"
                placeholder="anagarcia"
                value={form.username}
                onChangeText={update('username')}
                autoCapitalize="none"
                error={errors.username}
              />
            </View>
          </View>

          <Input
            label="Correo electrónico"
            placeholder="correo@ejemplo.com"
            value={form.email}
            onChangeText={update('email')}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <View style={styles.row}>
            <View style={styles.half}>
              <Input
                label="DPI"
                placeholder="1234567890101"
                value={form.dpi}
                onChangeText={update('dpi')}
                keyboardType="numeric"
                maxLength={13}
                error={errors.dpi}
              />
            </View>
            <View style={styles.half}>
              <Input
                label="Teléfono"
                placeholder="+502 0000-0000"
                value={form.phone}
                onChangeText={update('phone')}
                keyboardType="phone-pad"
                error={errors.phone}
              />
            </View>
          </View>

          <Input
            label="Dirección"
            placeholder="Ciudad de Guatemala, Zona 10"
            value={form.address}
            onChangeText={update('address')}
            autoCapitalize="sentences"
            error={errors.address}
          />

          {/* ── Sección: datos laborales ── */}
          <SectionLabel text="Datos laborales" />

          <View style={styles.row}>
            <View style={styles.half}>
              <Input
                label="Ocupación"
                placeholder="Desarrollador"
                value={form.job}
                onChangeText={update('job')}
                autoCapitalize="sentences"
                error={errors.job}
              />
            </View>
            <View style={styles.half}>
              <Input
                label="Ingresos mensuales (Q)"
                placeholder="5000"
                value={form.monthlyIncome}
                onChangeText={update('monthlyIncome')}
                keyboardType="numeric"
                error={errors.monthlyIncome}
              />
            </View>
          </View>

          {/* ── Sección: contraseña ── */}
          <SectionLabel text="Contraseña" />

          <Input
            label="Contraseña"
            placeholder="••••••••"
            value={form.password}
            onChangeText={update('password')}
            secureTextEntry
            error={errors.password}
          />

          <Input
            label="Confirmar contraseña"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChangeText={update('confirmPassword')}
            secureTextEntry
            error={errors.confirmPassword}
          />

          {/* ── Botón ── */}
          <Button
            title={isLoading ? 'Registrando...' : 'Crear cuenta'}
            onPress={handleRegister}
            isLoading={isLoading}
            style={styles.submitButton}
          />

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Inicia sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

/* Pequeño separador de sección */
const SectionLabel = ({ text }) => (
  <Text style={sectionStyles.label}>{text}</Text>
);
const sectionStyles = StyleSheet.create({
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    color: COLORS.gray400,
    marginTop: SPACING.sm,
    marginBottom: 2,
  },
});

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.gray50 },
  container: {
    flexGrow: 1,
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },
  header: { marginBottom: SPACING.lg },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.gray900,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.gray500,
  },
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
  row: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  half: { flex: 1 },
  submitButton: {
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 14,
    color: COLORS.gray500,
  },
  loginLink: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default RegisterScreen;
