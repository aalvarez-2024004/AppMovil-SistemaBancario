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
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = 'El nombre es requerido';
    if (!form.lastName) newErrors.lastName = 'El apellido es requerido';
    if (!form.email) newErrors.email = 'El correo es requerido';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Correo inválido';
    if (!form.phone) newErrors.phone = 'El teléfono es requerido';
    if (!form.password) newErrors.password = 'La contraseña es requerida';
    else if (form.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    const { confirmPassword, ...userData } = form;
    const result = await register(userData);
    if (!result.success) {
      Alert.alert('Error', result.error);
    } else {
      navigation.navigate('Login');
    }
  };

  const update = (field) => (value) => setForm({ ...form, [field]: value });

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
        <View style={styles.header}>
          <Text style={styles.title}>Crear cuenta</Text>
          <Text style={styles.subtitle}>Completa tus datos para registrarte</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.row}>
            <Input
              label="Nombre"
              placeholder="Juan"
              value={form.firstName}
              onChangeText={update('firstName')}
              autoCapitalize="words"
              error={errors.firstName}
              style={styles.halfInput}
            />
            <Input
              label="Apellido"
              placeholder="Pérez"
              value={form.lastName}
              onChangeText={update('lastName')}
              autoCapitalize="words"
              error={errors.lastName}
              style={styles.halfInput}
            />
          </View>

          <Input
            label="Correo electrónico"
            placeholder="tu@correo.com"
            value={form.email}
            onChangeText={update('email')}
            keyboardType="email-address"
            error={errors.email}
          />

          <Input
            label="Teléfono"
            placeholder="+502 0000-0000"
            value={form.phone}
            onChangeText={update('phone')}
            keyboardType="phone-pad"
            error={errors.phone}
          />

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

          <Button
            title="Crear cuenta"
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

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.gray50 },
  container: {
    flexGrow: 1,
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  header: {
    marginBottom: SPACING.lg,
  },
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
  halfInput: {
    flex: 1,
  },
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