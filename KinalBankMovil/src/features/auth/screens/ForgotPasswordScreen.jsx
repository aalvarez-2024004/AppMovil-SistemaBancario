import React, { useState } from 'react';
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
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../../shared/store/useAuthStore';
import { SPACING, BORDER_RADIUS } from '../../../shared/constants/theme';

/* ── Paleta Kinal Bank ──────────────────────────────────────────────────────── */
const KB = {
  navy:        '#0F1F3D',
  navyMid:     '#162847',
  navyLight:   '#1E3A5F',
  accentBlue:  '#3B7DD8',
  white:       '#FFFFFF',
  gray:        '#8FA3BF',
  success:     '#10B981',
  successBg:   'rgba(16,185,129,0.12)',
  error:       '#FF6B6B',
  errorBg:     'rgba(255,107,107,0.12)',
  warning:     '#F59E0B',
  warningBg:   'rgba(245,158,11,0.1)',
  inputBg:     'rgba(255,255,255,0.07)',
  inputBorder: 'rgba(255,255,255,0.15)',
};

/* ── Stepper visual ─────────────────────────────────────────────────────────── */
const STEPS = [
  { id: 1, icon: '✉️', label: 'Correo'     },
  { id: 2, icon: '🔑', label: 'Código'     },
  { id: 3, icon: '🔒', label: 'Contraseña' },
];

const StepBar = ({ current }) => (
  <View style={sb.row}>
    {STEPS.map((step, i) => {
      const done   = current > step.id;
      const active = current === step.id;
      return (
        <React.Fragment key={step.id}>
          <View style={sb.item}>
            <View style={[sb.circle, active && sb.circleActive, done && sb.circleDone]}>
              {done
                ? <Text style={sb.checkText}>✓</Text>
                : <Text style={[sb.numText, active && sb.numActive]}>{step.id}</Text>
              }
            </View>
            <Text style={[sb.label, active && sb.labelActive, done && sb.labelDone]}>
              {step.label}
            </Text>
          </View>
          {i < STEPS.length - 1 && (
            <View style={[sb.line, done && sb.lineDone]} />
          )}
        </React.Fragment>
      );
    })}
  </View>
);
const sb = StyleSheet.create({
  row:   { flexDirection: 'row', alignItems: 'flex-start', marginBottom: SPACING.lg },
  item:  { alignItems: 'center', gap: 6 },
  circle: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  circleActive: { backgroundColor: KB.accentBlue, borderColor: KB.accentBlue },
  circleDone:   { backgroundColor: KB.success,    borderColor: KB.success    },
  checkText: { color: KB.white, fontSize: 14, fontWeight: '800' },
  numText:   { color: KB.gray,  fontSize: 14, fontWeight: '700' },
  numActive: { color: KB.white },
  label:     { fontSize: 9, fontWeight: '600', color: KB.gray, textAlign: 'center', letterSpacing: 0.3 },
  labelActive: { color: KB.white },
  labelDone:   { color: KB.success },
  line:     { flex: 1, height: 1.5, backgroundColor: 'rgba(255,255,255,0.1)', marginTop: 17, marginHorizontal: 4 },
  lineDone: { backgroundColor: KB.success },
});

/* ── Campo de texto ─────────────────────────────────────────────────────────── */
const KBInput = ({ label, placeholder, value, onChangeText, secureTextEntry,
  keyboardType, error, autoCapitalize = 'none', maxLength, large }) => {
  const [focused,  setFocused]  = useState(false);
  const [showPass, setShowPass] = useState(false);

  return (
    <View style={fi.wrapper}>
      <Text style={fi.label}>{label}</Text>
      <View style={[
        fi.box,
        large     && fi.boxLarge,
        focused   && fi.boxFocused,
        error     && fi.boxError,
      ]}>
        <TextInput
          style={[fi.input, large && fi.inputLarge]}
          placeholder={placeholder}
          placeholderTextColor={KB.gray}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPass}
          keyboardType={keyboardType || 'default'}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          textAlign={large ? 'center' : 'left'}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPass(!showPass)} style={fi.eye}>
            <Text style={fi.eyeText}>{showPass ? '🙈' : '👁'}</Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={fi.error}>{error}</Text>}
    </View>
  );
};
const fi = StyleSheet.create({
  wrapper: { marginBottom: SPACING.md },
  label: {
    fontSize: 11, fontWeight: '700', letterSpacing: 1,
    textTransform: 'uppercase', color: KB.gray, marginBottom: 8,
  },
  box: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: KB.inputBg, borderWidth: 1, borderColor: KB.inputBorder,
    borderRadius: BORDER_RADIUS.lg, paddingHorizontal: SPACING.md, height: 54,
  },
  boxLarge: { height: 70, borderRadius: 14 },
  boxFocused: { borderColor: KB.accentBlue, backgroundColor: 'rgba(59,125,216,0.08)' },
  boxError:   { borderColor: KB.error,      backgroundColor: KB.errorBg              },
  input:      { flex: 1, fontSize: 15, color: KB.white },
  inputLarge: { fontSize: 28, fontWeight: '700', letterSpacing: 10 },
  eye:        { padding: 4 },
  eyeText:    { fontSize: 16 },
  error:      { fontSize: 12, color: KB.error, marginTop: 5, fontWeight: '500' },
});

/* ── Botones ────────────────────────────────────────────────────────────────── */
const KBButton = ({ title, onPress, disabled, variant = 'primary' }) => (
  <TouchableOpacity
    style={[btn.base, variant === 'primary' && btn.primary, variant === 'ghost' && btn.ghost, disabled && btn.disabled]}
    onPress={onPress} disabled={disabled} activeOpacity={0.85}
  >
    <Text style={[btn.text, variant === 'ghost' && btn.textGhost]}>{title}</Text>
  </TouchableOpacity>
);
const btn = StyleSheet.create({
  base:      { height: 54, borderRadius: BORDER_RADIUS.lg, alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.sm },
  primary:   { backgroundColor: KB.white },
  ghost:     { backgroundColor: 'transparent' },
  disabled:  { opacity: 0.45 },
  text:      { color: KB.navy, fontSize: 14, fontWeight: '800', letterSpacing: 1.5 },
  textGhost: { color: KB.gray, fontSize: 13, fontWeight: '500', letterSpacing: 0   },
});

/* ── Banners ────────────────────────────────────────────────────────────────── */
const ErrorBanner = ({ title, body }) => (
  <View style={[ban.box, { backgroundColor: KB.errorBg, borderColor: 'rgba(255,107,107,0.3)' }]}>
    <Text style={[ban.title, { color: KB.error }]}>⚠️  {title}</Text>
    <Text style={ban.body}>{body}</Text>
  </View>
);
const InfoBanner = ({ children }) => (
  <View style={[ban.box, { backgroundColor: 'rgba(59,125,216,0.1)', borderColor: 'rgba(59,125,216,0.25)' }]}>
    <Text style={[ban.body, { color: '#93C5FD' }]}>{children}</Text>
  </View>
);
const ban = StyleSheet.create({
  box:   { borderWidth: 1, borderRadius: BORDER_RADIUS.md, padding: SPACING.md, marginBottom: SPACING.md },
  title: { fontSize: 13, fontWeight: '700', marginBottom: 3 },
  body:  { fontSize: 12, color: KB.gray, lineHeight: 18 },
});

/* ══════════════════════════════════════════════════════════════════════════════
   PASO 1 — Correo
══════════════════════════════════════════════════════════════════════════════ */
const StepEmail = ({ onNext, onBack }) => {
  const { requestPasswordReset, isLoading } = useAuthStore();
  const [email, setEmail]   = useState('');
  const [formErr, setFormErr] = useState('');
  const [apiErr, setApiErr]   = useState(null);

  const handle = async () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setFormErr('Ingresa un correo válido'); return;
    }
    setFormErr(''); setApiErr(null);
    const res = await requestPasswordReset(email);
    if (res.success) onNext(email);
    else setApiErr(res.error);
  };

  return (
    <View>
      <View style={s.stepHeader}>
        <Text style={s.stepIcon}>✉️</Text>
        <View>
          <Text style={s.stepTitle}>Ingresa tu correo</Text>
          <Text style={s.stepSub}>Te enviaremos un código de verificación</Text>
        </View>
      </View>

      <KBInput
        label="Correo electrónico"
        placeholder="correo@ejemplo.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        error={formErr}
      />

      {apiErr && <ErrorBanner title="Error al enviar el código" body={apiErr} />}

      <KBButton title={isLoading ? 'Enviando...' : 'ENVIAR CÓDIGO'} onPress={handle} disabled={isLoading} />
      <KBButton title="← Volver al login" onPress={onBack} variant="ghost" />
    </View>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
   PASO 2 — Código
══════════════════════════════════════════════════════════════════════════════ */
const StepCode = ({ email, onNext, onBack }) => {
  const { verifyResetCode, requestPasswordReset, isLoading } = useAuthStore();
  const [code, setCode]         = useState('');
  const [formErr, setFormErr]   = useState('');
  const [apiErr, setApiErr]     = useState(null);
  const [resending, setResending] = useState(false);
  const [resent, setResent]     = useState(false);

  const handle = async () => {
    if (!/^\d{6}$/.test(code)) { setFormErr('El código debe tener 6 dígitos'); return; }
    setFormErr(''); setApiErr(null);
    const res = await verifyResetCode(email, code);
    if (res.success) onNext();
    else setApiErr(res.error);
  };

  const handleResend = async () => {
    setResending(true);
    await requestPasswordReset(email);
    setResending(false);
    setResent(true);
    setTimeout(() => setResent(false), 4000);
  };

  return (
    <View>
      <View style={s.stepHeader}>
        <Text style={s.stepIcon}>🔑</Text>
        <View>
          <Text style={s.stepTitle}>Código de verificación</Text>
          <Text style={s.stepSub}>Enviado a {email}</Text>
        </View>
      </View>

      <InfoBanner>
        Revisa tu bandeja de entrada y también la carpeta de spam. El código expira en 10 minutos.
      </InfoBanner>

      {/* Campo grande centrado para el código */}
      <KBInput
        label="Código de 6 dígitos"
        placeholder="000000"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        maxLength={6}
        error={formErr}
        large
      />

      {/* Indicador de dígitos */}
      <View style={s.dotsRow}>
        {[0,1,2,3,4,5].map(i => (
          <View key={i} style={[s.digitDot, code.length > i && s.digitDotFilled]} />
        ))}
      </View>

      {resent && (
        <View style={[ban.box, { backgroundColor: KB.successBg, borderColor: 'rgba(16,185,129,0.3)', marginBottom: SPACING.sm }]}>
          <Text style={{ fontSize: 12, color: KB.success }}>✓  Código reenviado — revisa tu correo</Text>
        </View>
      )}

      {apiErr && <ErrorBanner title="Código incorrecto" body={apiErr} />}

      <KBButton title={isLoading ? 'Verificando...' : 'VERIFICAR CÓDIGO'} onPress={handle} disabled={isLoading} />

      <View style={s.twoLinks}>
        <TouchableOpacity onPress={onBack}>
          <Text style={s.ghostLink}>← Cambiar correo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleResend} disabled={resending}>
          <Text style={[s.ghostLink, { color: resending ? 'rgba(143,163,191,0.4)' : KB.accentBlue }]}>
            {resending ? 'Reenviando...' : 'Reenviar código'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
   PASO 3 — Nueva contraseña
══════════════════════════════════════════════════════════════════════════════ */
const StepNewPassword = ({ email, onDone }) => {
  const { resetPassword, isLoading } = useAuthStore();
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm]  = useState('');
  const [errors,   setErrors]   = useState({});
  const [apiErr,   setApiErr]   = useState(null);

  const strength = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8)           s++;
    if (/[A-Z]/.test(password))         s++;
    if (/[0-9]/.test(password))         s++;
    if (/[^A-Za-z0-9]/.test(password))  s++;
    return s;
  })();
  const strengthLabel = ['', 'Débil', 'Regular', 'Buena', 'Fuerte'][strength];
  const strengthColor = ['', KB.error, KB.warning, KB.accentBlue, KB.success][strength];

  const handle = async () => {
    const e = {};
    if (!password || password.length < 8) e.password = 'Mínimo 8 caracteres';
    if (password !== confirm)              e.confirm  = 'Las contraseñas no coinciden';
    setErrors(e);
    if (Object.keys(e).length) return;
    setApiErr(null);
    const res = await resetPassword(email, password);
    if (res.success) onDone();
    else setApiErr(res.error);
  };

  return (
    <View>
      <View style={s.stepHeader}>
        <Text style={s.stepIcon}>🔒</Text>
        <View>
          <Text style={s.stepTitle}>Nueva contraseña</Text>
          <Text style={s.stepSub}>Elige una contraseña segura</Text>
        </View>
      </View>

      <KBInput label="Nueva contraseña" placeholder="••••••••"
        value={password} onChangeText={setPassword}
        secureTextEntry error={errors.password} />

      {password.length > 0 && (
        <View style={s.strengthRow}>
          {[1,2,3,4].map(n => (
            <View key={n} style={[s.strengthBar, { backgroundColor: n <= strength ? strengthColor : 'rgba(255,255,255,0.1)' }]} />
          ))}
          <Text style={[s.strengthLabel, { color: strengthColor }]}>{strengthLabel}</Text>
        </View>
      )}

      <KBInput label="Confirmar contraseña" placeholder="••••••••"
        value={confirm} onChangeText={setConfirm}
        secureTextEntry error={errors.confirm} />

      <View style={s.checkList}>
        {[
          { ok: password.length >= 8,        text: 'Mínimo 8 caracteres'   },
          { ok: /[A-Z]/.test(password),       text: 'Una letra mayúscula'   },
          { ok: /[0-9]/.test(password),       text: 'Un número'             },
          { ok: password === confirm && confirm.length > 0, text: 'Contraseñas coinciden' },
        ].map(({ ok, text }) => (
          <View key={text} style={s.checkItem}>
            <Text style={{ color: ok ? KB.success : KB.gray, fontSize: 13 }}>{ok ? '✓' : '○'}</Text>
            <Text style={[s.checkText, ok && s.checkTextOk]}>{text}</Text>
          </View>
        ))}
      </View>

      {apiErr && <ErrorBanner title="No se pudo actualizar la contraseña" body={apiErr} />}

      <KBButton title={isLoading ? 'Guardando...' : 'CAMBIAR CONTRASEÑA'} onPress={handle} disabled={isLoading} />
    </View>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
   PANTALLA PRINCIPAL
══════════════════════════════════════════════════════════════════════════════ */
const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [step,  setStep]  = useState(1);
  const [email, setEmail] = useState('');

  const handleDone = () => {
    Alert.alert(
      '¡Contraseña actualizada! 🎉',
      'Ya puedes ingresar con tu nueva contraseña.',
      [{ text: 'Ir al login', onPress: () => navigation.navigate('Login') }]
    );
  };

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={KB.navy} />

      {/* Decoración */}
      <View style={s.circle1} pointerEvents="none" />
      <View style={s.circle2} pointerEvents="none" />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={s.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Encabezado */}
          <View style={s.header}>
            <Text style={s.brandName}>KINAL BANK</Text>
            <Text style={s.pageTitle}>Recuperar acceso</Text>
            <Text style={s.pageSub}>Paso {step} de 3</Text>
          </View>

          {/* Stepper */}
          <StepBar current={step} />

          {/* Card */}
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
    </View>
  );
};

/* ── Estilos globales ───────────────────────────────────────────────────────── */
const s = StyleSheet.create({
  root:  { flex: 1, backgroundColor: KB.navy },
  scroll: { flexGrow: 1, paddingHorizontal: SPACING.lg, paddingTop: 52, paddingBottom: SPACING.xl },

  circle1: {
    position: 'absolute', width: 280, height: 280, borderRadius: 140,
    backgroundColor: 'rgba(59,125,216,0.1)', top: -80, right: -80,
  },
  circle2: {
    position: 'absolute', width: 180, height: 180, borderRadius: 90,
    backgroundColor: 'rgba(245,158,11,0.07)', bottom: 60, left: -60,
  },

  header:    { marginBottom: SPACING.lg },
  brandName: { fontSize: 12, fontWeight: '800', letterSpacing: 4, color: KB.accentBlue, marginBottom: 8 },
  pageTitle: { fontSize: 28, fontWeight: '800', color: KB.white, marginBottom: 2 },
  pageSub:   { fontSize: 13, color: KB.gray },

  card: {
    backgroundColor: KB.navyMid, borderRadius: 20, padding: SPACING.lg,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },

  stepHeader: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    marginBottom: SPACING.lg, paddingBottom: SPACING.md,
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  stepIcon:  { fontSize: 28 },
  stepTitle: { fontSize: 18, fontWeight: '700', color: KB.white },
  stepSub:   { fontSize: 12, color: KB.gray, marginTop: 2 },

  /* Puntos del código */
  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: -8, marginBottom: SPACING.md },
  digitDot: {
    width: 10, height: 10, borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
  },
  digitDotFilled: { backgroundColor: KB.accentBlue, borderColor: KB.accentBlue },

  /* Dos links en fila */
  twoLinks: { flexDirection: 'row', justifyContent: 'space-between', marginTop: SPACING.xs },
  ghostLink: { fontSize: 13, color: KB.gray, textDecorationLine: 'underline' },

  /* Fuerza contraseña */
  strengthRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: -8, marginBottom: SPACING.md },
  strengthBar: { flex: 1, height: 3, borderRadius: 2 },
  strengthLabel: { fontSize: 11, fontWeight: '700', minWidth: 46 },

  /* Checklist */
  checkList: {
    backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md, marginBottom: SPACING.md, gap: 8,
  },
  checkItem:   { flexDirection: 'row', alignItems: 'center', gap: 8 },
  checkText:   { fontSize: 12, color: KB.gray },
  checkTextOk: { color: KB.white },
});

export default ForgotPasswordScreen;