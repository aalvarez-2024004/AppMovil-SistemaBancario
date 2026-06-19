import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles, { COLORS } from "./MisCuentasStyles";

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
  const isActive = account.status === "active" || account.estado === "activa";

  return (
    <TouchableOpacity
      style={styles.accountCard}
      onPress={() => onPress(account)}
      activeOpacity={0.75}
    >
      {/* Top: nombre + estado */}
      <View style={styles.accountCardTop}>
        <View>
          <Text style={styles.accountTypeLabel}>
            {account.type || account.tipo || "Cuenta Monetaria"}
          </Text>
          <Text style={styles.accountName}>
            {account.name || account.nombre || "Mi Cuenta"}
          </Text>
        </View>

        <View style={[styles.accountBadge, isActive ? styles.accountBadgeActive : styles.accountBadgeInactive]}>
          <View style={[styles.accountBadgeDot, isActive ? styles.accountBadgeDotActive : styles.accountBadgeDotInactive]} />
          <Text style={[styles.accountBadgeText, isActive ? styles.accountBadgeTextActive : styles.accountBadgeTextInactive]}>
            {isActive ? "ACTIVA" : "INACTIVA"}
          </Text>
        </View>
      </View>

      {/* Número enmascarado */}
      <View style={styles.accountNumberRow}>
        <Text style={styles.accountNumberDots}>••••  ••••  ••••</Text>
        <Text style={styles.accountNumberLast}>
          {maskNumber(account.accountNumber || account.numero)}
        </Text>
      </View>

      {/* Divisor */}
      <View style={styles.accountCardDivider} />

      {/* Balance + botón */}
      <View style={styles.accountCardBottom}>
        <View>
          <Text style={styles.accountBalanceLabel}>Saldo disponible</Text>
          <Text style={styles.accountBalance}>
            {formatCurrency(account.balance || account.saldo)}
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