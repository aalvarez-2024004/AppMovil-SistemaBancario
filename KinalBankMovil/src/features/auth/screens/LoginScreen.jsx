import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
  Keyboard,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../../shared/store/useAuthStore';
import { KB, s } from '../../../shared/constants/login';
import { KBInput } from '../../../shared/components/LoginComponents';

const LoginScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    return () => Keyboard.dismiss();
  }, []);
  const { login, isLoading } = useAuthStore();
  const { height } = useWindowDimensions();

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
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={KB.blueDark} />

      <KeyboardAvoidingView
        style={s.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ minHeight: height }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
        >
          {/* Header con gradiente */}
          <LinearGradient
            colors={[KB.blueDark, KB.blueMid]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.header}
          >
            <View style={s.headerDecor} pointerEvents="none" />
            <View style={s.logoRing}>
              <Image
                source={require('../../../../assets/KinalBankLogo.png')}
                style={[s.logoImage, { tintColor: '#FFFFFF' }]}
                resizeMode="contain"
              />
            </View>
            <Text style={s.brandTagTittle}>KINAL BANK</Text>
            <Text style={s.brandTagline}>Con tus ahorros, construyes logros.</Text>
          </LinearGradient>

          {/* Card formulario */}
          <View style={s.card}>
            <Text style={s.cardTitle}>Bienvenido</Text>
            <Text style={s.cardSub}>Ingresa a tu cuenta</Text>

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

            <TouchableOpacity
              style={s.forgotRow}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={s.forgotText}>¿Olvidaste tu contraseña?</Text>
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

          {/* Stats */}
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

          <View style={s.footer}>
            <Text style={s.footerText}>Versión 1.0.0</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;