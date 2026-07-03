import React, { useState } from 'react';
import {
  View, Text, ScrollView, KeyboardAvoidingView, Platform,
  TouchableOpacity, StatusBar, Alert, useWindowDimensions, Keyboard,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../../shared/store/useAuthStore';
import { SuccessModal } from '../../../shared/components/SuccesModal';
import { s, KB, STEPS, isTablet } from '../../../shared/constants/register';
import { StepBar, Step1, Step2, Step3 } from '../../../shared/components/RegisterSteps';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { register, isLoading } = useAuthStore();
  const { height } = useWindowDimensions();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', username: '', email: '', dpi: '',
    phone: '', address: '', job: '', monthlyIncome: '',
    password: '', confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const update = (field) => (value) => setForm((prev) => ({ ...prev, [field]: value }));

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
      setShowSuccessModal(true);
    }
  };

  const handleModalConfirm = () => {
    setShowSuccessModal(false);
    navigation.navigate('Login');
  };

  const cardContainerStyle = isTablet
    ? { width: '100%', maxWidth: 560, alignSelf: 'center' }
    : null;

  return (
    <View style={[s.root, { overflow: 'hidden' }]}>
      <StatusBar barStyle="light-content" backgroundColor={KB.blueDark} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={[s.scroll, { minHeight: height }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
        >
          {/* Header con gradiente, mismo estilo que login */}
          <LinearGradient
            colors={[KB.blueDark, KB.blueMid]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.header}
          >
            <Text style={s.brandName}>KINAL BANK</Text>
            <Text style={s.pageTitle}>Crear cuenta</Text>
            <Text style={s.pageSub}>Paso {step} de {STEPS.length}</Text>
          </LinearGradient>

          <View style={[s.cardWrap, cardContainerStyle]}>
            <View style={s.stepBarWrap}>
              <StepBar current={step} />
            </View>

            <View style={s.card}>
              {step === 1 && <Step1 form={form} errors={errors} update={update} onNext={goNext} />}
              {step === 2 && <Step2 form={form} errors={errors} update={update} onNext={goNext} onBack={goBack} />}
              {step === 3 && <Step3 form={form} errors={errors} update={update} onSubmit={handleSubmit} onBack={goBack} isLoading={isLoading} />}
            </View>

            <TouchableOpacity
              onPress={() => { Keyboard.dismiss(); navigation.navigate('Login'); }}
              style={s.loginRow}
            >
              <Text style={s.loginText}>¿Ya tienes cuenta? </Text>
              <Text style={s.loginLink}>Inicia sesión</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <SuccessModal visible={showSuccessModal} onConfirm={handleModalConfirm} />
    </View>
  );
};

export default RegisterScreen;