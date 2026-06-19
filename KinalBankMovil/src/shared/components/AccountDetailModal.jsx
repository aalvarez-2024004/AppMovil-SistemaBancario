import { Modal } from "react-native";

export const AccountDetailModal = ({ visible, account, onClose }) => {
  if (!account) return null;

  const isActive = account.status === "active" || account.estado === "activa";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalSheet}>
          <View style={styles.modalHandle} />

          <Text style={styles.modalTitle}>
            {account.name || account.nombre || "Mi Cuenta"}
          </Text>
          <Text style={styles.modalSubtitle}>
            {account.type || account.tipo || "Cuenta Monetaria"}
          </Text>

          <Text style={styles.modalBalanceBig}>
            {formatCurrency(account.balance || account.saldo)}
          </Text>

          <View style={styles.modalRow}>
            <Text style={styles.modalRowLabel}>Número de cuenta</Text>
            <Text style={styles.modalRowValue}>
              •••• {String(account.accountNumber || account.numero || "----").slice(-4)}
            </Text>
          </View>

          <View style={styles.modalRow}>
            <Text style={styles.modalRowLabel}>Estado</Text>
            <Text style={[styles.modalRowValue, { color: isActive ? COLORS.active : COLORS.inactive }]}>
              {isActive ? "Activa" : "Inactiva"}
            </Text>
          </View>

          <View style={styles.modalRow}>
            <Text style={styles.modalRowLabel}>Tipo</Text>
            <Text style={styles.modalRowValue}>
              {account.type || account.tipo || "Monetaria"}
            </Text>
          </View>

          {account.createdAt && (
            <View style={styles.modalRow}>
              <Text style={styles.modalRowLabel}>Fecha de apertura</Text>
              <Text style={styles.modalRowValue}>
                {new Date(account.createdAt).toLocaleDateString("es-GT")}
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.modalCloseBtn} onPress={onClose}>
            <Text style={styles.modalCloseBtnText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};