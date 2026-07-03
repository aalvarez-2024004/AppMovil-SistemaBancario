import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useAuthStore } from '../store/useAuthStore';

import {KB,s,fi,btn,sb,scale,} from '../constants/register';

import { local, STEPS } from '../constants/forgotPassword';

export const KBButton = ({ title, onPress, disabled, variant = 'primary', icon }) => (
  <TouchableOpacity
    style={[
      btn.base,
      variant === 'primary' && (disabled ? btn.disabled : btn.primary),
      variant === 'ghost' && btn.ghost,
      icon && local.btnWithIcon,
    ]}
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.85}
  >
    {icon && (
      <Ionicons
        name={icon}
        size={scale(15)}
        color={variant === 'ghost' ? KB.gray : KB.white}
        style={{ marginRight: 6 }}
      />
    )}
    <Text style={[btn.text, variant === 'ghost' && btn.textGhost]}>{title}</Text>
  </TouchableOpacity>
);

export const ErrorBanner = ({ title, body }) => (
  <View style={[local.banner, { backgroundColor: KB.errorBg, borderColor: 'rgba(229,72,77,0.3)' }]}>
    <View style={local.bannerTitleRow}>
      <Ionicons name="alert-circle-outline" size={scale(16)} color={KB.error} />
      <Text style={[local.bannerTitle, { color: KB.error }]}>{title}</Text>
    </View>
    <Text style={local.bannerBody}>{body}</Text>
  </View>
);

export const InfoBanner = ({ children }) => (
  <View style={[local.banner, { backgroundColor: 'rgba(15,61,117,0.06)', borderColor: 'rgba(15,61,117,0.15)' }]}>
    <Text style={[local.bannerBody, { color: KB.blueMid }]}>{children}</Text>
  </View>
);

export const StepHeader = ({ icon, title, sub }) => (
  <View style={s.stepHeader}>
    <View style={s.stepIconCircle}>
      <Ionicons name={icon} size={scale(22)} color={KB.blueMid} />
    </View>
    <View style={s.stepHeaderText}>
      <Text style={{ fontSize: scale(17), fontWeight: '800', color: KB.textDark }}>{title}</Text>
      <Text style={{ fontSize: scale(12), color: KB.gray, marginTop: 2 }}>{sub}</Text>
    </View>
  </View>
);

export const StepEmail = ({ onNext, onBack }) => {
  const { requestPasswordReset, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [formErr, setFormErr] = useState('');
  const [apiErr, setApiErr] = useState(null);
  const [focused, setFocused] = useState(false);

  const handle = async () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setFormErr('Ingresa un correo válido');
      return;
    }
    setFormErr('');
    setApiErr(null);
    const cleanEmail = email.trim().toLowerCase();
    const res = await requestPasswordReset(cleanEmail);
    if (res.success) onNext(email);
    else setApiErr(res.error);
  };

  return (
    <View>
      <StepHeader icon="mail-outline" title="Recupera tu acceso" sub="Te enviaremos un código de verificación" />

      <View style={fi.wrapper}>
        <Text style={fi.label}>Correo electrónico</Text>
        <View style={[fi.box, focused && fi.boxFocused, !!formErr && fi.boxError]}>
          <TextInput
            style={fi.input}
            placeholder="correo@ejemplo.com"
            placeholderTextColor={KB.grayLight}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </View>
        {!!formErr && <Text style={fi.error}>{formErr}</Text>}
      </View>

      {apiErr && <ErrorBanner title="Error al enviar el código" body={apiErr} />}

      <KBButton title={isLoading ? 'ENVIANDO...' : 'ENVIAR CÓDIGO'} onPress={handle} disabled={isLoading} />
      <KBButton title="Volver al login" onPress={onBack} variant="ghost" icon="arrow-back-outline" />
    </View>
  );
};

export const StepCode = ({ email, onNext, onBack }) => {
  const { verifyResetCode, requestPasswordReset, isLoading } = useAuthStore();
  const [code, setCode] = useState('');
  const [formErr, setFormErr] = useState('');
  const [apiErr, setApiErr] = useState(null);
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const [focused, setFocused] = useState(false);

  const handle = async () => {
    if (!/^\d{6}$/.test(code)) {
      setFormErr('El código debe tener 6 dígitos');
      return;
    }
    setFormErr('');
    setApiErr(null);
    const cleanEmail = email.trim().toLowerCase();
    const res = await verifyResetCode(cleanEmail, code);
    if (res.success) onNext();
    else setApiErr(res.error);
  };

  const handleResend = async () => {
    setResending(true);
    const cleanEmail = email.trim().toLowerCase();
    await requestPasswordReset(cleanEmail);
    setResending(false);
    setResent(true);
    setTimeout(() => setResent(false), 4000);
  };

  return (
    <View>
      <StepHeader icon="key-outline" title="Código de verificación" sub={`Enviado a ${email}`} />

      <InfoBanner>
        Revisa tu bandeja de entrada y también la carpeta de spam. El código expira en 10 minutos.
      </InfoBanner>

      <View style={fi.wrapper}>
        <Text style={fi.label}>Código de 6 dígitos</Text>
        <View style={[fi.box, local.boxLarge, focused && fi.boxFocused, !!formErr && fi.boxError]}>
          <TextInput
            style={[fi.input, local.inputLarge, { textAlign: 'center' }]}
            placeholder="000000"
            placeholderTextColor={KB.grayLight}
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
            maxLength={6}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </View>
        {!!formErr && <Text style={fi.error}>{formErr}</Text>}
      </View>

      <View style={local.dotsRow}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <View key={i} style={[local.digitDot, code.length > i && local.digitDotFilled]} />
        ))}
      </View>

      {resent && (
        <View style={[local.banner, { backgroundColor: KB.successBg, borderColor: 'rgba(16,185,129,0.3)' }]}>
          <View style={local.successRow}>
            <Ionicons name="checkmark-circle-outline" size={scale(16)} color={KB.success} />
            <Text style={{ fontSize: scale(12), color: KB.success, fontWeight: '600' }}>
              Código reenviado — revisa tu correo
            </Text>
          </View>
        </View>
      )}

      {apiErr && <ErrorBanner title="Código incorrecto" body={apiErr} />}

      <KBButton title={isLoading ? 'VERIFICANDO...' : 'VERIFICAR CÓDIGO'} onPress={handle} disabled={isLoading} />

      <View style={local.twoLinks}>
        <TouchableOpacity onPress={onBack} style={local.linkWithIcon}>
          <Ionicons name="arrow-back-outline" size={scale(14)} color={KB.gray} />
          <Text style={local.ghostLink}>Cambiar correo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleResend} disabled={resending} style={local.linkWithIcon}>
          <Ionicons name="refresh-outline" size={scale(14)} color={resending ? KB.grayLight : KB.blueMid} />
          <Text
            style={[
              local.ghostLink,
              !resending && local.ghostLinkAccent,
              resending && { color: KB.grayLight },
            ]}
          >
            {resending ? 'Reenviando...' : 'Reenviar código'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const StepNewPassword = ({ email, onDone }) => {
  const { resetPassword, isLoading } = useAuthStore();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({});
  const [apiErr, setApiErr] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const strength = (() => {
    if (!password) return 0;
    let n = 0;
    if (password.length >= 8) n++;
    if (/[A-Z]/.test(password)) n++;
    if (/[0-9]/.test(password)) n++;
    if (/[^A-Za-z0-9]/.test(password)) n++;
    return n;
  })();
  const strengthLabel = ['', 'Débil', 'Regular', 'Buena', 'Fuerte'][strength];
  const strengthColor = ['', KB.error, '#F59E0B', KB.blueMid, KB.success][strength];

  const handle = async () => {
    const e = {};
    if (!password || password.length < 8) e.password = 'Mínimo 8 caracteres';
    if (password !== confirm) e.confirm = 'Las contraseñas no coinciden';
    setErrors(e);
    if (Object.keys(e).length) return;
    setApiErr(null);
    const cleanEmail = email.trim().toLowerCase();
    const res = await resetPassword(cleanEmail, password);
    if (res.success) onDone();
    else setApiErr(res.error);
  };

  return (
    <View>
      <StepHeader icon="lock-closed-outline" title="Nueva contraseña" sub="Elige una contraseña segura" />

      <View style={fi.wrapper}>
        <Text style={fi.label}>Nueva contraseña</Text>
        <View style={[fi.box, focusedField === 'p' && fi.boxFocused, !!errors.password && fi.boxError]}>
          <TextInput
            style={fi.input}
            placeholder="••••••••"
            placeholderTextColor={KB.grayLight}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPass}
            onFocus={() => setFocusedField('p')}
            onBlur={() => setFocusedField(null)}
          />
          <TouchableOpacity onPress={() => setShowPass(!showPass)} style={fi.eye}>
            <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={scale(18)} color={KB.gray} />
          </TouchableOpacity>
        </View>
        {!!errors.password && <Text style={fi.error}>{errors.password}</Text>}
      </View>

      {password.length > 0 && (
        <View style={s.strengthRow}>
          {[1, 2, 3, 4].map((n) => (
            <View
              key={n}
              style={[s.strengthBar, { backgroundColor: n <= strength ? strengthColor : KB.border }]}
            />
          ))}
          <Text style={[s.strengthLabel, { color: strengthColor }]}>{strengthLabel}</Text>
        </View>
      )}

      <View style={fi.wrapper}>
        <Text style={fi.label}>Confirmar contraseña</Text>
        <View style={[fi.box, focusedField === 'c' && fi.boxFocused, !!errors.confirm && fi.boxError]}>
          <TextInput
            style={fi.input}
            placeholder="••••••••"
            placeholderTextColor={KB.grayLight}
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry={!showConfirm}
            onFocus={() => setFocusedField('c')}
            onBlur={() => setFocusedField(null)}
          />
          <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={fi.eye}>
            <Ionicons name={showConfirm ? 'eye-off-outline' : 'eye-outline'} size={scale(18)} color={KB.gray} />
          </TouchableOpacity>
        </View>
        {!!errors.confirm && <Text style={fi.error}>{errors.confirm}</Text>}
      </View>

      <View style={s.checkList}>
        {[
          { ok: password.length >= 8, text: 'Mínimo 8 caracteres' },
          { ok: /[A-Z]/.test(password), text: 'Una letra mayúscula' },
          { ok: /[0-9]/.test(password), text: 'Un número' },
          { ok: password === confirm && confirm.length > 0, text: 'Contraseñas coinciden' },
        ].map(({ ok, text }) => (
          <View key={text} style={s.checkItem}>
            <Ionicons
              name={ok ? 'checkmark-circle' : 'ellipse-outline'}
              size={scale(15)}
              color={ok ? KB.success : KB.gray}
            />
            <Text style={[s.checkText, ok && s.checkTextOk]}>{text}</Text>
          </View>
        ))}
      </View>

      {apiErr && <ErrorBanner title="No se pudo actualizar la contraseña" body={apiErr} />}

      <KBButton title={isLoading ? 'GUARDANDO...' : 'CAMBIAR CONTRASEÑA'} onPress={handle} disabled={isLoading} />
    </View>
  );
};

export const StepBar = ({ current }) => (
  <View style={sb.row}>
    {STEPS.map((step, i) => {
      const done = current > step.id;
      const active = current === step.id;
      return (
        <React.Fragment key={step.id}>
          <View style={sb.item}>
            <View style={[sb.circle, active && sb.circleActive, done && sb.circleDone]}>
              {done ? (
                <Ionicons name="checkmark" size={scale(16)} color={KB.white} />
              ) : (
                <Text style={[sb.numText, active && sb.numActive]}>{step.id}</Text>
              )}
            </View>
            <Text style={[sb.label, active && sb.labelActive]}>{step.title}</Text>
          </View>
          {i < STEPS.length - 1 && <View style={[sb.line, done && sb.lineDone]} />}
        </React.Fragment>
      );
    })}
  </View>
);