import React, { useState, useEffect } from 'react';
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
  useWindowDimensions,
  Keyboard,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../../shared/store/useAuthStore';
import { KB, s, fi, btn, sb, isTablet, scale, isSmallDevice } from '../../../shared/constants/register';
import { STEPS, local } from '../../../shared/constants/forgotPassword';

import { StepBar, StepEmail, StepCode, StepNewPassword, SuccessModal } from '../../../shared/components/ForgotPasswordComponents';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  
  // Estado para controlar la visibilidad del Modal personalizado
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    return () => Keyboard.dismiss();
  }, []);

  // Al finalizar con éxito, en lugar de una Alerta nativa, abrimos el Modal
  const handleDone = () => {
    Keyboard.dismiss();
    setModalVisible(true);
  };

  // Función encargada de redireccionar cuando el usuario presiona "IR AL LOGIN" en el modal
  const handleCloseModal = () => {
    setModalVisible(false);
    navigation.navigate('Login');
  };

  const cardContainerStyle = isTablet ? { width: '100%', maxWidth: 560, alignSelf: 'center' } : null;

  return (
    <View style={[s.root, { overflow: 'hidden' }]}>
      <StatusBar barStyle="light-content" backgroundColor={KB.blueDark} />

      {/* RENDERIZADO DEL MODAL */}
      <SuccessModal visible={modalVisible} onClose={handleCloseModal} />

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
          {/* Header con gradiente, mismo estilo que login/registro */}
          <LinearGradient
            colors={[KB.blueDark, KB.blueMid]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.header}
          >
            <Text style={s.brandName}>KINAL BANK</Text>
            <Text style={s.pageTitle}>Recuperar acceso</Text>
            <Text style={s.pageSub}>Paso {step} de {STEPS.length}</Text>
          </LinearGradient>

          <View style={[s.cardWrap, cardContainerStyle]}>
            <View style={s.stepBarWrap}>
              <StepBar current={step} />
            </View>

            <View style={s.card}>
              {step === 1 && (
                <StepEmail
                  onNext={(resolvedEmail) => {
                    setEmail(resolvedEmail);
                    setStep(2);
                  }}
                  onBack={() => navigation.navigate('Login')}
                />
              )}
              {step === 2 && (
                <StepCode email={email} onNext={() => setStep(3)} onBack={() => setStep(1)} />
              )}
              {step === 3 && <StepNewPassword email={email} onDone={handleDone} />}
            </View>

            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                navigation.navigate('Login');
              }}
              style={s.loginRow}
            >
              <Text style={s.loginText}>¿Recordaste tu contraseña? </Text>
              <Text style={s.loginLink}>Inicia sesión</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ForgotPasswordScreen;