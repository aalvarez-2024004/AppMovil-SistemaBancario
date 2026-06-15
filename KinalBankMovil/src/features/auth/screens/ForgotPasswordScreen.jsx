import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../../shared/store/authStore';
import Button from '../../../shared/components/Button';
import Input from '../../../shared/components/Input';
import { COLORS, SPACING, BORDER_RADIUS } from '../../../shared/constants/theme';

/* ── Indicador de pasos ────────────────────────────────────────────────────── */
const StepIndicator = ({ step }) => (
  <View style={ind.row}>
    {[1, 2, 3].map((n, i) => (
      <React.Fragment key={n}>
        <View style={[ind.dot, step > n && ind.dotDone, step === n && ind.dotActive]} />
        {i < 2 && <View style={[ind.line, step > n && ind.lineDone]} />}
      </React.Fragment>
    ))}
  </View>
);
const ind = StyleSheet.create({
  row:      { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.md },
  dot:      { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.gray200 },
  dotActive:{ backgroundColor: COLORS.gray800 },
  dotDone:  { backgroundColor: COLORS.success },
  line:     { flex: 1, height: 1, backgroundColor: COLORS.gray200, marginHorizontal: 4 },
  lineDone: { backgroundColor: COLORS.success },
});

/* ── PASO 1: Correo ────────────────────────────────────────────────────────── */
const StepEmail = ({ onNext, onBack }) => {
  const { requestPasswordReset, isLoading } = useAuthStore();
  const [email, setEmail]     = useState('');
  const [error, setError]     = useState(null);
  const [formErr, setFormErr] = useState('');

  const handle = async () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setFormErr('Ingresa un correo válido');
      return;
    }
    setFormErr('');
    setError(null);
    const res = await requestPasswordReset(email);
    if (res.success) onNext(email);
    else setError(res.error);
  };

  return (
    <View style={s.stepContainer}>
      <StepIndicator step={1} />
      <Text style={s.stepHint}>Paso 1 de 3 · Ingresa el correo de tu cuenta y te enviaremos un código.</Text>
      <Input
        label="Correo electrónico"
        placeholder="correo@ejemplo.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        error={formErr}
      />
      {error && <ErrorBanner title="Error al enviar el código" body={error} />}
      <Button title="Enviar código" onPress={handle} isLoading={isLoading} style={s.btn} />
      <BackLink onPress={onBack} label="← Volver al login" />
    </View>
  );
};

/* ── PASO 2: Código ────────────────────────────────────────────────────────── */
const StepCode = ({ email, onNext, onBack }) => {
  const { verifyResetCode, requestPasswordReset, isLoading } = useAuthStore();
  const [code, setCode]       = useState('');
  const [error, setError]     = useState(null);
  const [resending, setResending] = useState(false);
  const [formErr, setFormErr] = useState('');

  const handle = async () => {
    if (!/^\d{6}$/.test(code)) {
      setFormErr('El código debe tener 6 dígitos');
      return;
    }
    setFormErr('');
    setError(null);
    const res = await verifyResetCode(email, code);
    if (res.success) onNext();
    else setError(res.error);
  };

  const handleResend = async () => {
    setResending(true);
    await requestPasswordReset(email);
    setResending(false);
    Alert.alert('Código reenviado', `Revisa tu bandeja de ${email}`);
  };

  return (
    <View style={s.stepContainer}>
      <StepIndicator step={2} />
      <View style={s.infoBanner}>
        <Text style={s.infoBannerText}>
          Paso 2 de 3 · Enviamos un código a <Text style={{ fontWeight: '700' }}>{email}</Text>.
          Revisa tu bandeja y carpeta de spam.
        </Text>
      </View>
      <Input
        label="Código de autorización"
        placeholder="000000"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        maxLength={6}
        error={formErr}
      />
      {error && <ErrorBanner title="Código incorrecto" body={error} />}
      <Button title="Verificar código" onPress={handle} isLoading={isLoading} style={s.btn} />
      <View style={s.row}>
        <BackLink onPress={onBack} label="← Cambiar correo" />
        <TouchableOpacity onPress={handleResend} disabled={resending}>
          <Text style={[s.backLink, resending && { color: COLORS.gray300 }]}>
            {resending ? 'Reenviando...' : 'Reenviar código'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/* ── PASO 3: Nueva contraseña ──────────────────────────────────────────────── */
const StepNewPassword = ({ email, onDone }) => {
  const { resetPassword, isLoading } = useAuthStore();
  const [password, setPassword]       = useState('');
  const [confirm, setConfirm]         = useState('');
  const [errors, setErrors]           = useState({});
  const [formError, setFormError]     = useState(null);

  const handle = async () => {
    const e = {};
    if (!password || password.length < 8) e.password = 'Mínimo 8 caracteres';
    if (password !== confirm)              e.confirm  = 'Las contraseñas no coinciden';
    setErrors(e);
    if (Object.keys(e).length) return;

    setFormError(null);
    const res = await resetPassword(email, password);
    if (res.success) onDone();
    else setFormError(res.error);
  };

  return (
    <View style={s.stepContainer}>
      <StepIndicator step={3} />
      <Text style={s.stepHint}>Paso 3 de 3 · Elige una nueva contraseña segura para tu cuenta.</Text>
      <Input
        label="Nueva contraseña"
        placeholder="••••••••"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        error={errors.password}
      />
      <Input
        label="Confirmar contraseña"
        placeholder="••••••••"
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry
        error={errors.confirm}
      />
      {formError && <ErrorBanner title="No se pudo actualizar la contraseña" body={formError} />}
      <Button title="Cambiar contraseña" onPress={handle} isLoading={isLoading} style={s.btn} />
    </View>
  );
};

/* ── Helpers de UI ─────────────────────────────────────────────────────────── */
const ErrorBanner = ({ title, body }) => (
  <View style={s.errorBanner}>
    <Text style={s.errorBannerTitle}>{title}</Text>
    <Text style={s.errorBannerBody}>{body}</Text>
  </View>
);
const BackLink = ({ onPress, label }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={s.backLink}>{label}</Text>
  </TouchableOpacity>
);

/* ── Pantalla principal ────────────────────────────────────────────────────── */
const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [step, setStep]   = useState(1);
  const [email, setEmail] = useState('');

  const handleDone = () => {
    Alert.alert('¡Contraseña actualizada!', 'Ya puedes ingresar con tu nueva contraseña.', [
      { text: 'Ir al login', onPress: () => navigation.navigate('Login') },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: COLORS.gray50 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={s.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={s.header}>
          <Text style={s.title}>Recuperar contraseña</Text>
          <Text style={s.subtitle}>Sigue los pasos para restablecer el acceso</Text>
        </View>

        <View style={s.card}>
          {step === 1 && (
            <StepEmail
              onNext={(resolvedEmail) => { setEmail(resolvedEmail); setStep(2); }}
              onBack={() => navigation.navigate('Login')}
            />
          )}
          {step === 2 && (
            <StepCode
              email={email}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <StepNewPassword email={email} onDone={handleDone} />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const s = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },
  header:   { marginBottom: SPACING.lg },
  title:    { fontSize: 26, fontWeight: '700', color: COLORS.gray900, marginBottom: 6 },
  subtitle: { fontSize: 15, color: COLORS.gray500 },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  stepContainer: { gap: SPACING.sm },
  stepHint: { fontSize: 13, color: COLORS.gray500, lineHeight: 20, marginBottom: SPACING.sm },
  btn:      { marginTop: SPACING.sm },
  row:      { flexDirection: 'row', justifyContent: 'space-between', marginTop: SPACING.xs },
  backLink: { fontSize: 13, color: COLORS.gray500, textDecorationLine: 'underline' },
  infoBanner: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  infoBannerText: { fontSize: 13, color: '#1D4ED8', lineHeight: 20 },
  errorBanner: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  errorBannerTitle: { fontSize: 13, fontWeight: '700', color: '#991B1B', marginBottom: 3 },
  errorBannerBody:  { fontSize: 12, color: '#B91C1C', lineHeight: 18 },
});

export default ForgotPasswordScreen;
