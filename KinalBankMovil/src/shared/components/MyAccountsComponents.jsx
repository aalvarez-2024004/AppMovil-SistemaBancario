import React, { useEffect, useRef } from "react";
import { Modal, Animated } from "react-native";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, styles } from "../constants/MyAccounts";

const CURRENCY_SYMBOLS = { GTQ: "Q", USD: "$", EUR: "€", GBP: "£", MXN: "MX$" };

export const formatCurrency = (amount, currency = "GTQ") =>
  `${CURRENCY_SYMBOLS[currency] ?? currency} ${Number(amount || 0).toLocaleString("es-GT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export const maskNumber = (num = "") => {
  const str = String(num);
  return `•••••• ${str.slice(-4)}`;
};

/* ─── StatCard ────────────────────────────────────────────── */
export const StatCard = ({ icon, iconBg, iconColor, value, valueStyle, label, sublabel }) => (
  <View style={styles.statCard}>
    <View style={[styles.statIcon, { backgroundColor: iconBg }]}>
      <Ionicons name={icon} size={18} color={iconColor ?? COLORS.accent} />
    </View>
    <Text style={[styles.statValue, valueStyle]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
    {sublabel ? <Text style={styles.statSubLabel}>{sublabel}</Text> : null}
  </View>
);

/* ─── AccountCard ─────────────────────────────────────────── */
export const AccountCard = ({ account, onPress }) => {
  const isActive = account.status === "ACTIVA";
  const currency = account.currency ?? "GTQ";
  const fullNumber = account.accountNumber || "----------";

  return (
    <TouchableOpacity
      style={[styles.accountCard, !isActive && styles.accountCardInactive]}
      onPress={() => onPress(account)}
      activeOpacity={0.75}
    >
      {/* Top row */}
      <View style={styles.accountCardTop}>
        <View style={{ gap: 2 }}>
          <Text style={styles.accountTypeLabel}>
            {account.accountType || "MONETARIA"} · {currency}
          </Text>
          <Text style={styles.accountName}>Cuenta {fullNumber}</Text>
        </View>

        <View style={[
          styles.accountBadge,
          isActive ? styles.accountBadgeActive : styles.accountBadgeInactive,
        ]}>
          <View style={[
            styles.accountBadgeDot,
            isActive ? styles.accountBadgeDotActive : styles.accountBadgeDotInactive,
          ]} />
          <Text style={[
            styles.accountBadgeText,
            isActive ? styles.accountBadgeTextActive : styles.accountBadgeTextInactive,
          ]}>
            {isActive ? "ACTIVA" : "BLOQUEADA"}
          </Text>
        </View>
      </View>

      {/* Número estilo tarjeta */}
      <View style={styles.accountNumberRow}>
          <Text style={styles.accountNumberLast}>{fullNumber}</Text>
      </View>

      <View style={styles.accountCardDivider} />

      {/* Balance + acción */}
      <View style={styles.accountCardBottom}>
        <View>
          <Text style={styles.accountBalanceLabel}>Saldo disponible</Text>
          <Text style={styles.accountBalance}>
            {formatCurrency(account.balance, currency)}
          </Text>
        </View>
        <View style={styles.accountActionBtn}>
          <Text style={styles.accountActionText}>Ver detalle</Text>
          <Ionicons name="chevron-forward" size={14} color={COLORS.accent} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

/* ─── SkeletonCards con animación pulse ──────────────────── */
export const SkeletonCards = () => {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1,   duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <>
      {[1, 2].map((k) => (
        <Animated.View key={k} style={[styles.skeletonCard, { opacity }]}>
          {/* Líneas de skeleton */}
          <View style={styles.skeletonInner}>
            <View style={[styles.skeletonLine, { width: "40%", height: 10 }]} />
            <View style={[styles.skeletonLine, { width: "60%", height: 18, marginTop: 6 }]} />
            <View style={[styles.skeletonLine, { width: "80%", height: 12, marginTop: 24 }]} />
            <View style={styles.skeletonDivider} />
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={[styles.skeletonLine, { width: "35%", height: 20 }]} />
              <View style={[styles.skeletonLine, { width: "25%", height: 32, borderRadius: 10 }]} />
            </View>
          </View>
        </Animated.View>
      ))}
    </>
  );
};

/* ─── AccountDetailModal ──────────────────────────────────── */
export const AccountDetailModal = ({ visible, account, onClose }) => {
  if (!account) return null;

  const isActive = account.status === "ACTIVA";
  const currency = account.currency ?? "GTQ";
  const fullNumber = account.accountNumber || "----------";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={onClose} />

        <View style={styles.modalSheet}>
          <View style={styles.modalHandle} />

          {/* Header del modal */}
          <View style={styles.modalHeader}>
            <View style={[
              styles.modalHeaderIcon,
              { backgroundColor: isActive ? COLORS.activeLight : COLORS.inactiveLight },
            ]}>
              <Ionicons
                name="card-outline"
                size={24}
                color={isActive ? COLORS.active : COLORS.inactive}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.modalTitle}>Cuenta {fullNumber}</Text>
              <Text style={styles.modalSubtitle}>
                {account.accountType || "Monetaria"} · {currency}
              </Text>
            </View>
            <View style={[
              styles.accountBadge,
              isActive ? styles.accountBadgeActive : styles.accountBadgeInactive,
            ]}>
              <View style={[
                styles.accountBadgeDot,
                isActive ? styles.accountBadgeDotActive : styles.accountBadgeDotInactive,
              ]} />
              <Text style={[
                styles.accountBadgeText,
                isActive ? styles.accountBadgeTextActive : styles.accountBadgeTextInactive,
              ]}>
                {isActive ? "ACTIVA" : "BLOQUEADA"}
              </Text>
            </View>
          </View>

          {/* Balance grande */}
          <View style={styles.modalBalanceBox}>
            <Text style={styles.modalBalanceLabel}>Saldo disponible</Text>
            <Text style={styles.modalBalanceBig}>
              {formatCurrency(account.balance, currency)}
            </Text>
          </View>

          {/* Filas de detalle */}
          <View style={styles.modalRows}>
            <ModalRow
                icon="card-outline"
                label="Número de cuenta"
                value={fullNumber}
                mono
            />
            <ModalRow
              icon="layers-outline"
              label="Tipo de cuenta"
              value={account.accountType || "Monetaria"}
            />
            <ModalRow
              icon="cash-outline"
              label="Moneda"
              value={currency}
            />
            {account.createdAt && (
              <ModalRow
                icon="calendar-outline"
                label="Fecha de apertura"
                value={new Date(account.createdAt).toLocaleDateString("es-GT", {
                  year: "numeric", month: "long", day: "numeric",
                })}
                last
              />
            )}
          </View>

          <TouchableOpacity style={styles.modalCloseBtn} onPress={onClose} activeOpacity={0.85}>
            <Text style={styles.modalCloseBtnText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

/* ─── ModalRow helper ─────────────────────────────────────── */
const ModalRow = ({ icon, label, value, mono, last }) => (
  <View style={[styles.modalRow, last && { borderBottomWidth: 0 }]}>
    <View style={styles.modalRowLeft}>
      <Ionicons name={icon} size={16} color={COLORS.accent} style={{ marginRight: 10 }} />
      <Text style={styles.modalRowLabel}>{label}</Text>
    </View>
    <Text style={[styles.modalRowValue, mono && { letterSpacing: 1 }]}>{value}</Text>
  </View>
);