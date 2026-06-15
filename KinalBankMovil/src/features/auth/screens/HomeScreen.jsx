import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
} from 'react-native';
import useAuthStore from '../../store/authStore';
import useBalanceStore from '../../store/balanceStore';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../shared/constants/theme';

const HomeScreen = () => {
  const { user, logout } = useAuthStore();
  const { balance, fetchBalance, isLoading } = useBalanceStore();
  const [balanceVisible, setBalanceVisible] = useState(true);

  useEffect(() => {
    fetchBalance();
  }, []);

  const formatCurrency = (amount) => {
    if (amount == null) return '—';
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
    }).format(amount);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={fetchBalance} />
      }
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{getGreeting()},</Text>
          <Text style={styles.userName}>
            {user?.firstName || user?.name || 'Usuario'} 👋
          </Text>
        </View>
        <TouchableOpacity style={styles.avatarContainer} onPress={logout}>
          <Text style={styles.avatarText}>
            {(user?.firstName?.[0] || user?.name?.[0] || 'U').toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <Text style={styles.balanceLabel}>Saldo disponible</Text>
          <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)}>
            <Text style={styles.eyeIcon}>{balanceVisible ? '👁' : '🙈'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.balanceAmount}>
          {balanceVisible
            ? formatCurrency(balance?.available ?? balance?.amount)
            : '••••••••'}
        </Text>

        {balance?.accountNumber && (
          <View style={styles.accountRow}>
            <Text style={styles.accountLabel}>No. de cuenta</Text>
            <Text style={styles.accountNumber}>
              {'•••• ' + balance.accountNumber.slice(-4)}
            </Text>
          </View>
        )}

        <View style={styles.balanceActions}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <Text style={styles.actionIconText}>↑</Text>
            </View>
            <Text style={styles.actionLabel}>Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <Text style={styles.actionIconText}>↓</Text>
            </View>
            <Text style={styles.actionLabel}>Recibir</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <Text style={styles.actionIconText}>⟳</Text>
            </View>
            <Text style={styles.actionLabel}>Historial</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Ingresos este mes</Text>
          <Text style={[styles.statAmount, { color: COLORS.success }]}>
            {formatCurrency(balance?.monthlyIncome ?? 0)}
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Gastos este mes</Text>
          <Text style={[styles.statAmount, { color: COLORS.danger }]}>
            {formatCurrency(balance?.monthlyExpenses ?? 0)}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accesos rápidos</Text>
        <View style={styles.quickGrid}>
          {[
            { icon: '💳', label: 'Mis tarjetas' },
            { icon: '📊', label: 'Estadísticas' },
            { icon: '🏧', label: 'Cajeros' },
            { icon: '⚙️', label: 'Configuración' },
          ].map((item) => (
            <TouchableOpacity key={item.label} style={styles.quickItem}>
              <Text style={styles.quickIcon}>{item.icon}</Text>
              <Text style={styles.quickLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },
  greeting: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 2,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.white,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
  balanceCard: {
    backgroundColor: COLORS.white,
    margin: SPACING.lg,
    marginTop: -SPACING.xl,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    ...SHADOWS.md,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  balanceLabel: {
    fontSize: 13,
    color: COLORS.gray500,
    fontWeight: '500',
  },
  eyeIcon: { fontSize: 18 },
  balanceAmount: {
    fontSize: 34,
    fontWeight: '700',
    color: COLORS.gray900,
    marginBottom: SPACING.sm,
  },
  accountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  accountLabel: {
    fontSize: 13,
    color: COLORS.gray400,
  },
  accountNumber: {
    fontSize: 13,
    color: COLORS.gray600,
    fontWeight: '500',
  },
  balanceActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: COLORS.gray100,
    paddingTop: SPACING.md,
  },
  actionButton: {
    alignItems: 'center',
    gap: 6,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIconText: {
    fontSize: 22,
    color: COLORS.primary,
    fontWeight: '600',
  },
  actionLabel: {
    fontSize: 12,
    color: COLORS.gray600,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.sm,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.gray400,
    marginBottom: 4,
  },
  statAmount: {
    fontSize: 18,
    fontWeight: '700',
  },
  section: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray800,
    marginBottom: SPACING.md,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  quickItem: {
    width: '47%',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    ...SHADOWS.sm,
  },
  quickIcon: { fontSize: 22 },
  quickLabel: {
    fontSize: 13,
    color: COLORS.gray700,
    fontWeight: '500',
  },
});

export default HomeScreen;