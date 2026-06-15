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
import { useAuthStore } from '../../../shared/store/authStore';
import { SPACING, BORDER_RADIUS } from '../../../shared/constants/theme';

/* ── Paleta Kinal Bank (igual que LoginScreen) ──────────────────────────────── */
const KB = {
  navy:        '#0F1F3D',
  navyMid:     '#162847',
  navyLight:   '#1E3A5F',
  accentBlue:  '#3B7DD8',
  white:       '#FFFFFF',
  gray:        '#8FA3BF',
  grayLight:   '#D4E0EE',
  success:     '#10B981',
  successBg:   'rgba(16,185,129,0.12)',
  error:       '#FF6B6B',
  errorBg:     'rgba(255,107,107,0.12)',
  inputBg:     'rgba(255,255,255,0.07)',
  inputBorder: 'rgba(255,255,255,0.15)',
};

/* ── Pasos del registro ─────────────────────────────────────────────────────── */
const STEPS = [
  { id: 1, icon: '👤', title: 'Datos personales',  sub: 'Tu información básica' },
  { id: 2, icon: '💼', title: 'Datos laborales',    sub: 'Ocupación e ingresos'  },
  { id: 3, icon: '🔒', title: 'Seguridad',          sub: 'Crea tu contraseña'    },
];

/* ── Indicador de pasos ─────────────────────────────────────────────────────── */
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
            <Text style={[sb.label, active && sb.labelActive]}>{step.title}</Text>
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
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  item: { alignItems: 'center', gap: 6 },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleActive: {
    backgroundColor: KB.accentBlue,
    borderColor: KB.accentBlue,
  },
  circleDone: {
    backgroundColor: KB.success,
    borderColor: KB.success,
  },
  checkText: { color: KB.white, fontSize: 14, fontWeight: '800' },
  numText:   { color: KB.gray,  fontSize: 14, fontWeight: '700' },
  numActive: { color: KB.white },
  label: {
    fontSize: 9,
    fontWeight: '600',
    color: KB.gray,
    textAlign: 'center',
    letterSpacing: 0.3,
    maxWidth: 64,
  },
  labelActive: { color: KB.white },
  line: {
    flex: 1,
    height: 1.5,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginTop: 17,
    marginHorizontal: 4,
  },
  lineDone: { backgroundColor: KB.success },
});

/* ── Campo de texto Kinal Bank ──────────────────────────────────────────────── */
const KBInput = ({
  label, placeholder, value, onChangeText,
  secureTextEntry, keyboardType, error,
  autoCapitalize = 'none', maxLength,
}) => {
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
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
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
  input: { flex: 1, fontSize: 15, color: KB.white },
  eye:      { padding: 4 },
  eyeText:  { fontSize: 16 },
  error:    { fontSize: 12, color: KB.error, marginTop: 5, fontWeight: '500' },
});

/* ── Botón primario ─────────────────────────────────────────────────────────── */
const KBButton = ({ title, onPress, disabled, variant = 'primary' }) => (
  <TouchableOpacity
    style={[
      btn.base,
      variant === 'primary' && btn.primary,
      variant === 'outline' && btn.outline,
      variant === 'ghost'   && btn.ghost,
      disabled && btn.disabled,
    ]}
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.85}
  >
    <Text style={[btn.text, variant === 'outline' && btn.textOutline, variant === 'ghost' && btn.textGhost]}>
      {title}
    </Text>
  </TouchableOpacity>
);
const btn = StyleSheet.create({
  base: {
    height: 54,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  primary:     { backgroundColor: KB.white },
  outline:     { borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.25)' },
  ghost:       { backgroundColor: 'transparent' },
  disabled:    { opacity: 0.45 },
  text:        { color: KB.navy, fontSize: 14, fontWeight: '800', letterSpacing: 1.5 },
  textOutline: { color: KB.white, letterSpacing: 0.5, fontWeight: '600' },
  textGhost:   { color: KB.gray,  fontSize: 13, fontWeight: '500', letterSpacing: 0 },
});

/* ══════════════════════════════════════════════════════════════════════════════
   PASO 1 — Datos personales
══════════════════════════════════════════════════════════════════════════════ */
const Step1 = ({ form, errors, update, onNext }) => (
  <View>
    <View style={s.stepHeader}>
      <Text style={s.stepIcon}>👤</Text>
      <View>
        <Text style={s.stepTitle}>Datos personales</Text>
        <Text style={s.stepSub}>Cuéntanos quién eres</Text>
      </View>
    </View>

    <View style={s.row}>
      <View style={s.half}>
        <KBInput label="Nombre completo" placeholder="Ana García"
          value={form.name} onChangeText={update('name')}
          autoCapitalize="words" error={errors.name} />
      </View>
      <View style={s.half}>
        <KBInput label="Username" placeholder="anagarcia"
          value={form.username} onChangeText={update('username')}
          error={errors.username} />
      </View>
    </View>

    <KBInput label="Correo electrónico" placeholder="correo@ejemplo.com"
      value={form.email} onChangeText={update('email')}
      keyboardType="email-address" error={errors.email} />

    <View style={s.row}>
      <View style={s.half}>
        <KBInput label="DPI" placeholder="1234567890101"
          value={form.dpi} onChangeText={update('dpi')}
          keyboardType="numeric" maxLength={13} error={errors.dpi} />
      </View>
      <View style={s.half}>
        <KBInput label="Teléfono" placeholder="+502 0000-0000"
          value={form.phone} onChangeText={update('phone')}
          keyboardType="phone-pad" error={errors.phone} />
      </View>
    </View>

    <KBInput label="Dirección" placeholder="Ciudad de Guatemala, Zona 10"
      value={form.address} onChangeText={update('address')}
      autoCapitalize="sentences" error={errors.address} />

    <KBButton title="CONTINUAR →" onPress={onNext} />
  </View>
);

/* ══════════════════════════════════════════════════════════════════════════════
   PASO 2 — Datos laborales
══════════════════════════════════════════════════════════════════════════════ */
const Step2 = ({ form, errors, update, onNext, onBack }) => (
  <View>
    <View style={s.stepHeader}>
      <Text style={s.stepIcon}>💼</Text>
      <View>
        <Text style={s.stepTitle}>Datos laborales</Text>
        <Text style={s.stepSub}>Para evaluar tu perfil financiero</Text>
      </View>
    </View>

    <KBInput label="Ocupación" placeholder="Desarrollador de Software"
      value={form.job} onChangeText={update('job')}
      autoCapitalize="sentences" error={errors.job} />

    <KBInput label="Ingresos mensuales (Q)" placeholder="5000"
      value={form.monthlyIncome} onChangeText={update('monthlyIncome')}
      keyboardType="numeric" error={errors.monthlyIncome} />

    {/* Tarjeta informativa */}
    <View style={s.infoCard}>
      <Text style={s.infoCardIcon}>🔐</Text>
      <Text style={s.infoCardText}>
        Tu información financiera está protegida y solo se usa para validar tu solicitud de cuenta.
      </Text>
    </View>

    <KBButton title="CONTINUAR →" onPress={onNext} />
    <KBButton title="← Regresar" onPress={onBack} variant="ghost" />
  </View>
);

/* ══════════════════════════════════════════════════════════════════════════════
   PASO 3 — Contraseña
══════════════════════════════════════════════════════════════════════════════ */
const Step3 = ({ form, errors, update, onSubmit, onBack, isLoading }) => {
  /* Indicador de fuerza de contraseña */
  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8)            score++;
    if (/[A-Z]/.test(p))          score++;
    if (/[0-9]/.test(p))          score++;
    if (/[^A-Za-z0-9]/.test(p))   score++;
    return score;
  })();
  const strengthLabel = ['', 'Débil', 'Regular', 'Buena', 'Fuerte'][strength];
  const strengthColor = ['', KB.error, '#F59E0B', KB.accentBlue, KB.success][strength];

  return (
    <View>
      <View style={s.stepHeader}>
        <Text style={s.stepIcon}>🔒</Text>
        <View>
          <Text style={s.stepTitle}>Seguridad</Text>
          <Text style={s.stepSub}>Elige una contraseña segura</Text>
        </View>
      </View>

      <KBInput label="Contraseña" placeholder="••••••••"
        value={form.password} onChangeText={update('password')}
        secureTextEntry error={errors.password} />

      {/* Barra de fuerza */}
      {form.password.length > 0 && (
        <View style={s.strengthRow}>
          {[1,2,3,4].map(n => (
            <View
              key={n}
              style={[s.strengthBar, { backgroundColor: n <= strength ? strengthColor : 'rgba(255,255,255,0.1)' }]}
            />
          ))}
          <Text style={[s.strengthLabel, { color: strengthColor }]}>{strengthLabel}</Text>
        </View>
      )}

      <KBInput label="Confirmar contraseña" placeholder="••••••••"
        value={form.confirmPassword} onChangeText={update('confirmPassword')}
        secureTextEntry error={errors.confirmPassword} />

      {/* Checklist visual */}
      <View style={s.checkList}>
        {[
          { ok: form.password.length >= 8,          text: 'Mínimo 8 caracteres' },
          { ok: /[A-Z]/.test(form.password),         text: 'Una letra mayúscula' },
          { ok: /[0-9]/.test(form.password),         text: 'Un número' },
          { ok: form.password === form.confirmPassword && form.confirmPassword.length > 0,
                                                      text: 'Contraseñas coinciden' },
        ].map(({ ok, text }) => (
          <View key={text} style={s.checkItem}>
            <Text style={{ color: ok ? KB.success : KB.gray, fontSize: 13 }}>{ok ? '✓' : '○'}</Text>
            <Text style={[s.checkText, ok && s.checkTextOk]}>{text}</Text>
          </View>
        ))}
      </View>

      <KBButton title={isLoading ? 'Creando cuenta...' : 'CREAR CUENTA'} onPress={onSubmit} disabled={isLoading} />
      <KBButton title="← Regresar" onPress={onBack} variant="ghost" />
    </View>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
   PANTALLA PRINCIPAL
══════════════════════════════════════════════════════════════════════════════ */
const RegisterScreen = () => {
  const navigation = useNavigation();
  const { register, isLoading } = useAuthStore();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', username: '', email: '', dpi: '',
    phone: '', address: '', job: '', monthlyIncome: '',
    password: '', confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const update = (field) => (value) => setForm((prev) => ({ ...prev, [field]: value }));

  /* Validación por paso */
  const validateStep = (n) => {
    const e = {};
    if (n === 1) {
      if (!form.name.trim())    e.name    = 'Requerido';
      if (!form.username.trim()) e.username = 'Requerido';
      if (!form.email.trim())   e.email   = 'Requerido';
      else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Correo inválido';
      if (!form.dpi.trim())     e.dpi     = 'Requerido';
      else if (!/^\d{13}$/.test(form.dpi)) e.dpi = '13 dígitos';
      if (!form.phone.trim())   e.phone   = 'Requerido';
      if (!form.address.trim()) e.address = 'Requerido';
    }
    if (n === 2) {
      if (!form.job.trim())        e.job         = 'Requerido';
      if (!form.monthlyIncome)     e.monthlyIncome = 'Requerido';
      else if (Number(form.monthlyIncome) < 100) e.monthlyIncome = 'Mínimo Q100';
    }
    if (n === 3) {
      if (!form.password)              e.password        = 'Requerido';
      else if (form.password.length < 8) e.password      = 'Mínimo 8 caracteres';
      if (form.password !== form.confirmPassword) e.confirmPassword = 'No coinciden';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => { if (validateStep(step)) setStep((p) => p + 1); };
  const goBack = () => { setErrors({}); setStep((p) => p - 1); };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    const { confirmPassword, ...userData } = form;
    const result = await register({ ...userData, monthlyIncome: Number(userData.monthlyIncome) });
    if (!result.success) {
      Alert.alert('Error en el registro', result.error);
    } else {
      Alert.alert(
        'Registro enviado ⏳',
        'Tu cuenta está pendiente de aprobación por un administrador.',
        [{ text: 'Ir al login', onPress: () => navigation.navigate('Login') }]
      );
    }
  };

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={KB.navy} />

      {/* Círculos decorativos */}
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
            <Text style={s.pageTitle}>Crear cuenta</Text>
            <Text style={s.pageSub}>Paso {step} de {STEPS.length}</Text>
          </View>

          {/* Stepper */}
          <StepBar current={step} />

          {/* Card del paso actual */}
          <View style={s.card}>
            {step === 1 && <Step1 form={form} errors={errors} update={update} onNext={goNext} />}
            {step === 2 && <Step2 form={form} errors={errors} update={update} onNext={goNext} onBack={goBack} />}
            {step === 3 && <Step3 form={form} errors={errors} update={update} onSubmit={handleSubmit} onBack={goBack} isLoading={isLoading} />}
          </View>

          {/* Link al login */}
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={s.loginRow}>
            <Text style={s.loginText}>¿Ya tienes cuenta? </Text>
            <Text style={s.loginLink}>Inicia sesión</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

/* ── Estilos globales de la pantalla ────────────────────────────────────────── */
const s = StyleSheet.create({
  root:  { flex: 1, backgroundColor: KB.navy },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: 52,
    paddingBottom: SPACING.xl,
  },

  /* Decoración */
  circle1: {
    position: 'absolute',
    width: 280, height: 280, borderRadius: 140,
    backgroundColor: 'rgba(59,125,216,0.1)',
    top: -80, right: -80,
  },
  circle2: {
    position: 'absolute',
    width: 180, height: 180, borderRadius: 90,
    backgroundColor: 'rgba(16,185,129,0.07)',
    bottom: 60, left: -60,
  },

  /* Encabezado */
  header: { marginBottom: SPACING.lg },
  brandName: {
    fontSize: 12, fontWeight: '800', letterSpacing: 4,
    color: KB.accentBlue, marginBottom: 8,
  },
  pageTitle: { fontSize: 28, fontWeight: '800', color: KB.white, marginBottom: 2 },
  pageSub:   { fontSize: 13, color: KB.gray },

  /* Card */
  card: {
    backgroundColor: KB.navyMid,
    borderRadius: 20,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: SPACING.md,
  },

  /* Encabezado de cada paso */
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  stepIcon:  { fontSize: 28 },
  stepTitle: { fontSize: 18, fontWeight: '700', color: KB.white },
  stepSub:   { fontSize: 12, color: KB.gray, marginTop: 2 },

  /* Fila de 2 columnas */
  row:  { flexDirection: 'row', gap: SPACING.sm },
  half: { flex: 1 },

  /* Tarjeta informativa paso 2 */
  infoCard: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'rgba(59,125,216,0.1)',
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: 'rgba(59,125,216,0.25)',
    padding: SPACING.md,
    marginBottom: SPACING.md,
    alignItems: 'flex-start',
  },
  infoCardIcon: { fontSize: 18, marginTop: 1 },
  infoCardText: { flex: 1, fontSize: 12, color: KB.gray, lineHeight: 18 },

  /* Fuerza de contraseña */
  strengthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: -8,
    marginBottom: SPACING.md,
  },
  strengthBar: {
    flex: 1, height: 3, borderRadius: 2,
  },
  strengthLabel: { fontSize: 11, fontWeight: '700', minWidth: 42 },

  /* Checklist contraseña */
  checkList: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    gap: 8,
  },
  checkItem:   { flexDirection: 'row', alignItems: 'center', gap: 8 },
  checkText:   { fontSize: 12, color: KB.gray },
  checkTextOk: { color: KB.white },

  /* Footer */
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
  },
  loginText: { fontSize: 14, color: KB.gray },
  loginLink: { fontSize: 14, color: KB.accentBlue, fontWeight: '600' },
});

export default RegisterScreen;