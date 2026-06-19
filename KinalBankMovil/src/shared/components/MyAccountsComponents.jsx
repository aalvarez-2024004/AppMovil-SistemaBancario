import React from "react";
import { Modal } from "react-native-web";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, styles} from "../constants/MyAccounts";

export const formatCurrency = (amount) =>
  `Q ${Number(amount || 0).toLocaleString("es-GT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export const maskNumber = (num = "") => {
  const str = String(num);
  return `•••• ${str.slice(-4)}`;
};

export const StatCard = ({ icon, iconBg, value, valueStyle, label, sublabel }) => (
  <View style={styles.statCard}>
    <View style={[styles.statIcon, { backgroundColor: iconBg }]}>
      <Ionicons name={icon} size={18} color={COLORS.textPrimary} />
    </View>
    <Text style={[styles.statValue, valueStyle]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
    {sublabel ? <Text style={styles.statSubLabel}>{sublabel}</Text> : null}
  </View>
);

export const AccountCard = ({ account, onPress }) => {
  const isActive = account.status === "ACTIVA"; // ← corregido

  return (
    <TouchableOpacity style={styles.accountCard} onPress={() => onPress(account)} activeOpacity={0.75}>
      <View style={styles.accountCardTop}>
        <View>
          <Text style={styles.accountTypeLabel}>
            {account.accountType || "MONETARIA"} 
          </Text>
          <Text style={styles.accountName}>
            •••• {String(account.accountNumber || "").slice(-4)} 
          </Text>
        </View>
        <View style={[styles.accountBadge, isActive ? styles.accountBadgeActive : styles.accountBadgeInactive]}>
          <View style={[styles.accountBadgeDot, isActive ? styles.accountBadgeDotActive : styles.accountBadgeDotInactive]} />
          <Text style={[styles.accountBadgeText, isActive ? styles.accountBadgeTextActive : styles.accountBadgeTextInactive]}>
            {isActive ? "ACTIVA" : "BLOQUEADA"}
          </Text>
        </View>
      </View>

      <View style={styles.accountNumberRow}>
        <Text style={styles.accountNumberDots}>••••  ••••  ••••</Text>
        <Text style={styles.accountNumberLast}>
          {String(account.accountNumber || "----").slice(-4)}
        </Text>
      </View>

      <View style={styles.accountCardDivider} />

      <View style={styles.accountCardBottom}>
        <View>
          <Text style={styles.accountBalanceLabel}>Saldo disponible</Text>
          <Text style={styles.accountBalance}>
            {formatCurrency(account.balance)}
          </Text>
        </View>
        <View style={styles.accountActionBtn}>
          <Text style={styles.accountActionText}>Detalle</Text>
          <Ionicons name="chevron-forward" size={14} color={COLORS.accent} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const SkeletonCards = () => (
  <>
    {[1, 2].map((k) => (
      <View key={k} style={styles.skeletonCard} />
    ))}
  </>
);

export const AccountDetailModal = ({ visible, account, onClose }) => {
  if (!account) return null;

  const isActive = account.status === "ACTIVA";

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