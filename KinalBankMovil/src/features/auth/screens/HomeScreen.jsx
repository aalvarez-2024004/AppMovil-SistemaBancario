import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  RefreshControl, StatusBar, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../../shared/store/useAuthStore';
import { getMyAccountsRequest, getMyTransactionsRequest } from '../../../shared/api/bankClient';
import { s, KB } from '../../../shared/constants/home';

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Buenos días';
  if (h < 18) return 'Buenas tardes';
  return 'Buenas noches';
};

const fmt = (amount, currency = 'GTQ') =>
  new Intl.NumberFormat('es-GT', { style: 'currency', currency }).format(amount ?? 0);

/* ── Icono + color por tipo de transacción ── */
const TX_META = {
  DEPOSITO:      { icon: 'arrow-down-circle',   color: '#10B981', bg: '#E9FBF1', label: 'Depósito'      },
  CREDITO:       { icon: 'arrow-down-circle',   color: '#10B981', bg: '#E9FBF1', label: 'Crédito'       },
  TRANSFERENCIA: { icon: 'swap-horizontal',     color: '#3B7DD8', bg: '#EAF1FC', label: 'Transferencia' },
  COMPRA:        { icon: 'bag-handle-outline',  color: '#C9A84C', bg: '#FBF4E2', label: 'Compra'        },
  RETIRO:        { icon: 'arrow-up-circle',     color: '#EF4444', bg: '#FDE8E8', label: 'Retiro'        },
};

const getTxMeta = (type) => TX_META[type] ?? { icon: 'ellipse-outline', color: '#9CA3AF', bg: '#F3F4F6', label: type ?? '—' };

const isTxCredit = (tx) =>
  tx.type === 'DEPOSITO' || tx.type === 'CREDITO';

const quickActions = [
  { icon: 'swap-horizontal-outline', label: 'Transferir',  screen: 'Transfer',        bg: '#EAF1FC', color: '#3B7DD8' },
  { icon: 'card-outline',            label: 'Cuentas',     screen: 'MisCuentas',      bg: '#FDE8E8', color: '#EF4444' },
  { icon: 'list-outline',            label: 'Movimientos', screen: 'MisMovimientos',  bg: '#FBF4E2', color: '#C9A84C' },
  { icon: 'star-outline',            label: 'Favoritos',   screen: 'Favorites',       bg: '#E9FBF1', color: '#10B981' },
  { icon: 'gift-outline',            label: 'Productos',   screen: 'Productos',       bg: '#EAF1FC', color: '#3B7DD8' },
];

/* ════════════════════════════════════════════════════════════ */
const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, token, logout } = useAuthStore();

  const [accounts,     setAccounts]     = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [refreshing,   setRefreshing]   = useState(false);
  const [balanceHidden, setBalanceHidden] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [accRes, txRes] = await Promise.all([
        getMyAccountsRequest(token),
        getMyTransactionsRequest(token, 1, 5),
      ]);
      setAccounts(Array.isArray(accRes.data?.data) ? accRes.data.data : []);
      setTransactions(Array.isArray(txRes.data?.data) ? txRes.data.data : []);
    } catch (err) {
      console.log('HomeScreen error:', err?.response?.data ?? err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const onRefresh = () => { setRefreshing(true); fetchData(); };

  /* ── Derivados ── */
  const totalGTQ = accounts
    .filter(a => a.currency === 'GTQ' || !a.currency)
    .reduce((sum, a) => sum + (a.balance ?? 0), 0);

  const totalUSD = accounts
    .filter(a => a.currency === 'USD')
    .reduce((sum, a) => sum + (a.balance ?? 0), 0);

  const activeCount = accounts.filter(
    a => a.status === 'ACTIVA' || a.isActive === true
  ).length;

  const isAccountActive = (acc) =>
    acc?.status?.toString()?.trim()?.toUpperCase() === 'ACTIVA' || acc?.isActive === true;

  /* Inicial del avatar — usa Name/Username (mayúscula, del modelo Sequelize) */
  const avatarLetter = (user?.Name?.[0] || user?.Username?.[0] || 'U').toUpperCase();
  const firstName    = user?.Name?.split(' ')[0] || user?.Username || 'Usuario';

  if (loading) {
    return (
      <View style={s.loadingContainer}>
        <ActivityIndicator size="large" color={KB.accent} />
        <Text style={s.loadingText}>Cargando tu información...</Text>
      </View>
    );
  }

  return (
    <View style={s.root}>
      <StatusBar barStyle="light-content" backgroundColor={KB.navy} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={KB.accent} />
        }
      >
        {/* ── HEADER ── */}
        <View style={s.header}>
          <View style={s.circle1} pointerEvents="none" />
          <View style={s.circle2} pointerEvents="none" />

          <View style={s.headerTop}>
            <View style={{ flex: 1, marginRight: 12 }}>
              <Text style={s.greeting}>{getGreeting()}</Text>
              <Text style={s.userName} numberOfLines={1}>
                Hola, {firstName} 👋
              </Text>
              <Text style={s.tagline}>Aquí está tu resumen financiero</Text>
            </View>

            <TouchableOpacity
              style={s.avatar}
              onPress={() => navigation.navigate('Profile')}
              activeOpacity={0.75}
            >
              <Text style={s.avatarText}>{avatarLetter}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={s.body}>

          {/* ── BALANCE + ACCIONES RÁPIDAS ── */}
          <View style={s.balanceCard}>
            <Text style={s.balanceLbl}>BALANCE TOTAL · CUENTAS ACTIVAS</Text>

            <TouchableOpacity onPress={() => setBalanceHidden(!balanceHidden)} activeOpacity={0.7}>
              <View style={s.balanceValueRow}>
                <Text style={s.balanceValue}>
                  {balanceHidden ? 'Q ••••••' : fmt(totalGTQ)}
                </Text>
                <Ionicons
                  name={balanceHidden ? 'eye-off-outline' : 'eye-outline'}
                  size={18}
                  color="#9CA3AF"
                  style={{ marginLeft: 8, marginTop: 6 }}
                />
              </View>
            </TouchableOpacity>

            {/* Quick actions con Ionicons */}
            <View style={s.balanceActions}>
              {quickActions.map((a) => (
                <TouchableOpacity
                  key={a.label}
                  style={s.quickActionBtn}
                  onPress={() => navigation.navigate(a.screen)}
                  activeOpacity={0.75}
                >
                  <View style={[s.quickActionIcon, { backgroundColor: a.bg }]}>
                    <Ionicons name={a.icon} size={20} color={a.color} />
                  </View>
                  <Text style={s.quickActionLabel}>{a.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={[s.balanceProgressBar, { backgroundColor: totalGTQ > 0 ? KB.accent : '#EEF1F5' }]} />
          </View>

          {/* ── STATS 2x2 ── */}
          <View style={s.statsGrid}>
            <StatCard bg={KB.blueLight}  icon="card-outline"       iconColor={KB.accent}   label="CUENTAS ACTIVAS" value={activeCount} />
            <StatCard bg={KB.greenLight} icon="cash-outline"        iconColor={KB.success}  label="TOTAL GTQ"       value={fmt(totalGTQ)} small />
            <StatCard bg={KB.goldLight}  icon="globe-outline"       iconColor={KB.gold}     label="TOTAL USD"       value={fmt(totalUSD, 'USD')} small />
            <StatCard bg={KB.blueLight}  icon="receipt-outline"     iconColor={KB.accent}   label="MOVIMIENTOS"     value={transactions.length} />
          </View>

          {/* ── MIS CUENTAS ── */}
          <View style={s.sectionRow}>
            <Text style={s.sectionTitle}>Mis cuentas</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MisCuentas')}>
              <Text style={s.seeAll}>Ver todas →</Text>
            </TouchableOpacity>
          </View>

          {accounts.length === 0 ? (
            <View style={s.emptyCard}>
              <Text style={s.emptyIcon}>🏦</Text>
              <Text style={s.emptyTitle}>Sin cuentas activas</Text>
              <Text style={s.emptyText}>Un administrador debe asignarte una cuenta para continuar.</Text>
            </View>
          ) : (
            <View style={s.accountsBox}>
              {accounts.map((acc, i) => (
                <View key={acc.id ?? i} style={[s.accountRow, i > 0 && s.accountRowDivider]}>
                  <View style={s.accountInfo}>
                    <View style={[s.accountIconWrap, { backgroundColor: isAccountActive(acc) ? KB.blueLight : '#FDE8E8' }]}>
                      <Ionicons
                        name="card-outline"
                        size={18}
                        color={isAccountActive(acc) ? KB.accent : '#EF4444'}
                      />
                    </View>
                    <View>
                      <Text style={s.accountNum}>
                        •••• {acc?.accountNumber?.slice(-4) ?? '----'}
                      </Text>
                      <Text style={[
                        s.accountStatus,
                        { color: isAccountActive(acc) ? '#10B981' : '#EF4444' },
                      ]}>
                        {isAccountActive(acc) ? 'Activa' : 'Bloqueada'} · {acc.currency ?? 'GTQ'}
                      </Text>
                    </View>
                  </View>
                  <Text style={s.accountBalance}>{fmt(acc.balance, acc.currency ?? 'GTQ')}</Text>
                </View>
              ))}
            </View>
          )}

          {/* ── MOVIMIENTOS RECIENTES ── */}
          <View style={s.sectionRow}>
            <Text style={s.sectionTitle}>Movimientos recientes</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MisMovimientos')}>
              <Text style={s.seeAll}>Ver todos →</Text>
            </TouchableOpacity>
          </View>

          {transactions.length === 0 ? (
            <View style={s.emptyTx}>
              <Text style={s.emptyIcon}>📋</Text>
              <Text style={s.emptyText}>Sin movimientos recientes</Text>
            </View>
          ) : (
            transactions.slice(0, 5).map((tx, i) => {
              const meta   = getTxMeta(tx.type);
              const credit = isTxCredit(tx);
              const amount = tx.amountSent ?? tx.amountReceived ?? 0;
              return (
                <View key={tx.id ?? tx._id ?? i} style={s.txRow}>
                  {/* Icono */}
                  <View style={[s.txIconWrap, { backgroundColor: meta.bg }]}>
                    <Ionicons name={meta.icon} size={20} color={meta.color} />
                  </View>

                  {/* Descripción + tipo */}
                  <View style={s.txInfo}>
                    <Text style={s.txDesc} numberOfLines={1}>{tx.description || meta.label}</Text>
                    <View style={s.txMeta}>
                      <Text style={[s.txType, { color: meta.color }]}>{meta.label}</Text>
                      <Text style={s.txDot}>·</Text>
                      <Text style={s.txDate}>
                        {tx.createdAt ? new Date(tx.createdAt).toLocaleDateString('es-GT') : '—'}
                      </Text>
                    </View>
                  </View>

                  {/* Monto con color */}
                  <Text style={[s.txAmount, { color: credit ? '#10B981' : '#EF4444' }]}>
                    {credit ? '+' : '-'}{fmt(amount)}
                  </Text>
                </View>
              );
            })
          )}

          {/* ── LOGOUT ── */}
          <TouchableOpacity style={s.logoutBtn} onPress={logout} activeOpacity={0.75}>
            <Ionicons name="log-out-outline" size={16} color="#EF4444" style={{ marginRight: 6 }} />
            <Text style={s.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
};

/* ── StatCard interno ── */
const StatCard = ({ bg, icon, iconColor, label, value, small }) => (
  <View style={s.statCard}>
    <View style={[s.statIconWrap, { backgroundColor: bg }]}>
      <Ionicons name={icon} size={18} color={iconColor} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={s.statCardLbl}>{label}</Text>
      <Text style={[s.statCardVal, small && { fontSize: 13 }]} numberOfLines={1}>
        {value}
      </Text>
    </View>
  </View>
);

export default HomeScreen;
// Nota: agrega estos estilos faltantes a home.js:
// balanceValueRow, txMeta, txType, txDot