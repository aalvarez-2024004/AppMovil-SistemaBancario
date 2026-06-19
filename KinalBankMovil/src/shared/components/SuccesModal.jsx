import {sm} from '../constants/register'

export const SuccessModal = ({ visible, onConfirm }) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onConfirm}
  >
    <View style={sm.overlay}>
      <View style={sm.card}>
        <View style={sm.iconCircle}>
          <Text style={sm.iconText}>✓</Text>
        </View>

        <Text style={sm.title}>¡Registro enviado!</Text>
        <Text style={sm.message}>
          Tu cuenta fue creada correctamente y está pendiente de aprobación
          por un administrador. Te avisaremos cuando esté lista.
        </Text>

        <KBButton title="IR AL LOGIN" onPress={onConfirm} />
      </View>
    </View>
  </Modal>
);