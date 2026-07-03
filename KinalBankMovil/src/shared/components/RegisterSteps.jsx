import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { sb, fi, btn, s, KB, scale, isSmallDevice, STEPS } from '../constants/register';

export const StepBar = ({ current }) => (
  <View style={sb.row}>
    {STEPS.map((step, i) => {
      const done   = current > step.id;
      const active = current === step.id;
      return (
        <React.Fragment key={step.id}>
          <View style={sb.item}>
            <View style={[sb.circle, active && sb.circleActive, done && sb.circleDone]}>
              {done
                ? <Ionicons name="checkmark" size={18} color={KB.white} />
                : <Text style={[sb.numText, active && sb.numActive]}>{step.id}</Text>
              }
            </View>
            {!isSmallDevice && (
              <Text style={[sb.label, active && sb.labelActive]} numberOfLines={2}>
                {step.title}
              </Text>
            )}
          </View>
          {i < STEPS.length - 1 && (
            <View style={[sb.line, done && sb.lineDone]} />
          )}
        </React.Fragment>
      );
    })}
  </View>
);

export const KBInput = ({
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
          <TouchableOpacity onPress={() => setShowPass(!showPass)} style={fi.eye} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={20} color={KB.gray} />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={fi.error}>{error}</Text>}
    </View>
  );
};

export const KBButton = ({ title, onPress, disabled, variant = 'primary' }) => (
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

export const Step1 = ({ form, errors, update, onNext }) => (
  <View>
    <View style={s.stepHeader}>
      <View style={s.stepIconCircle}>
        <Ionicons name="person-outline" size={22} color={KB.blueMid} />
      </View>
      <View style={s.stepHeaderText}>
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

export const Step2 = ({ form, errors, update, onNext, onBack }) => (
  <View>
    <View style={s.stepIconCircle}>
      <Ionicons name="briefcase-outline" size={22} color={KB.blueMid} />
    </View>

    <KBInput label="Ocupación" placeholder="Desarrollador de Software"
      value={form.job} onChangeText={update('job')}
      autoCapitalize="sentences" error={errors.job} />

    <KBInput label="Ingresos mensuales (Q)" placeholder="5000"
      value={form.monthlyIncome} onChangeText={update('monthlyIncome')}
      keyboardType="numeric" error={errors.monthlyIncome} />

    {/* Tarjeta informativa */}
    <View style={s.infoCard}>
      <Ionicons name="shield-checkmark-outline" size={18} color={KB.blueMid} />
      <Text style={s.infoCardText}>
        Tu información financiera está protegida y solo se usa para validar tu solicitud de cuenta.
      </Text>
    </View>

    <KBButton title="CONTINUAR →" onPress={onNext} />
    <KBButton title="← Regresar" onPress={onBack} variant="ghost" />
  </View>
);

export const Step3 = ({ form, errors, update, onSubmit, onBack, isLoading }) => {
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
      <View style={s.stepIconCircle}>
        <Ionicons name="lock-closed-outline" size={22} color={KB.blueMid} />
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
          { ok: form.password.length >= 8, text: 'Mínimo 8 caracteres' },
          { ok: /[A-Z]/.test(form.password), text: 'Una letra mayúscula' },
          { ok: /[0-9]/.test(form.password), text: 'Un número' },
          { ok: form.password === form.confirmPassword && form.confirmPassword.length > 0,
                                              text: 'Contraseñas coinciden' },
        ].map(({ ok, text }) => (
          <View key={text} style={s.checkItem}>
            <Ionicons
              name={ok ? 'checkmark-circle' : 'ellipse-outline'}
              size={16}
              color={ok ? KB.success : KB.gray}
            />
            <Text style={[s.checkText, ok && s.checkTextOk]}>{text}</Text>
          </View>
        ))}
      </View>

      <KBButton title={isLoading ? 'Creando cuenta...' : 'CREAR CUENTA'} onPress={onSubmit} disabled={isLoading} />
      <KBButton title="← Regresar" onPress={onBack} variant="ghost" />
    </View>
  );
};