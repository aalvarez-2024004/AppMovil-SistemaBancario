import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  RefreshControl, StatusBar, ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../../shared/store/useAuthStore';
import { getMyAccountsRequest, getMyTransactionsRequest } from '../../../shared/api/bankClient';
import { s, KB, GRADIENTS } from '../../../shared/constants/home';

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Buenos días';
  if (h < 18) return 'Buenas tardes';
  return 'Buenas noches';
};

const CURRENCY_SYMBOLS = { GTQ: 'Q', USD: '$', EUR: '€', GBP: '£', MXN: 'MX$' };

const fmt = (amount, currency = 'GTQ') => {
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;
  const value = new Intl.NumberFormat('es-GT', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount ?? 0);
  return `${symbol} ${value}`;
};

const TX_META = {
  DEPOSITO:      { icon: 'arrow-down-circle',   color: '#10B981', bg: '#E9FBF1', label: 'Depósito'      },
  CREDITO:       { icon: 'arrow-down-circle',   color: '#10B981', bg: '#E9FBF1', label: 'Crédito'       },
  TRANSFERENCIA: { icon: 'swap-horizontal',     color: '#3B7DD8', bg: '#EAF1FC', label: 'Transferencia' },
  COMPRA:        { icon: 'bag-handle-outline',  color: '#C9A84C', bg: '#FBF4E2', label: 'Compra'        },
  RETIRO:        { icon: 'arrow-up-circle',     color: '#EF4444', bg: '#FDE8E8', label: 'Retiro'        },
};

const getTxMeta = (type) => TX_META[type] ?? { icon: 'ellipse-outline', color: '#9CA3AF', bg: '#F3F4F6', label: type ?? '—' };

const isTxCredit = (tx, accountIds) => {
  if (tx.type === 'DEPOSITO' || tx.type === 'CREDITO') return true;

  if (tx.type === 'TRANSFERENCIA') {
    const fromId = String(tx.fromAccount?._id ?? tx.fromAccount ?? '');
    return !accountIds.includes(fromId);
  }

  return false;
};

const quickActions = [
  { icon: 'swap-horizontal-outline', label: 'Transferir',  screen: 'Transfer',        color: '#EAF6FC' },
  { icon: 'card-outline',            label: 'Cuentas',     screen: 'MisCuentas',      color: '#BFE4F5' },
  { icon: 'list-outline',            label: 'Movimientos', screen: 'MisMovimientos',  color: '#7EC8E8' },
  { icon: 'star-outline',            label: 'Favoritos',   screen: 'Favorites',       color: '#BFE4F5' },
  { icon: 'gift-outline',            label: 'Productos',   screen: 'Productos',       color: '#EAF6FC' },
];

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
  const accountIds = accounts.map(a => String(a.id ?? a._id));

  const totalGTQ = accounts
    .filter(a => a.currency === 'GTQ' || !a.currency)
    .reduce((sum, a) => sum + (a.balance ?? 0), 0);

  const totalUSD = accounts
    .filter(a => a.currency === 'USD')
    .reduce((sum, a) => sum + (a.balance ?? 0), 0);

  const activeCount = accounts.filter(
    a => a.status === 'ACTIVA' || a.isActive === true
  ).length;

  // Balance principal: muestra la moneda que realmente tiene saldo.
  const mainCurrency = totalGTQ > 0 ? 'GTQ' : totalUSD > 0 ? 'USD' : 'GTQ';
  const mainSymbol = CURRENCY_SYMBOLS[mainCurrency] ?? mainCurrency;

  const mainBalanceDisplay =
    totalGTQ > 0 ? fmt(totalGTQ, 'GTQ')
    : totalUSD > 0 ? fmt(totalUSD, 'USD')
    : fmt(0, 'GTQ');

  const secondaryBalanceDisplay =
    totalGTQ > 0 && totalUSD > 0 ? `+ ${fmt(totalUSD, 'USD')}` : null;

  const balanceCurrencyLabel =
    totalGTQ > 0 && totalUSD > 0 ? 'GTQ y USD'
    : totalUSD > 0 && totalGTQ === 0 ? 'USD'
    : 'GTQ';

  const isAccountActive = (acc) =>
    acc?.status?.toString()?.trim()?.toUpperCase() === 'ACTIVA' || acc?.isActive === true;

  /* Inicial del avatar — usa Name/Username (mayúscula, del modelo Sequelize) */
  const avatarLetter = (user?.name?.[0] || user?.username?.[0] || 'U').toUpperCase();
  const firstName    = user?.name?.split(' ')[0] || user?.username || 'Usuario';

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
        {/* ── HEADER (gradiente) ── */}
        <LinearGradient
          colors={GRADIENTS.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={s.headerGradient}
        >
          <View style={s.circle1} pointerEvents="none" />
          <View style={s.circle2} pointerEvents="none" />

          <View style={s.headerTop}>
            <View style={{ flex: 1, marginRight: 12 }}>
              <View style={s.greetingRow}>
                <View style={s.greetingDot} />
                <Text style={s.greeting}>{getGreeting()}</Text>
              </View>
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
        </LinearGradient>

        <View style={s.body}>

          {/* ── BALANCE CARD — el hero, gradiente vivo ── */}
          <View style={s.balanceCardWrap}>
            <LinearGradient
              colors={GRADIENTS.balance}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={s.balanceCardGradient}
            >
              <View style={s.balanceGlow} pointerEvents="none" />

              <Text style={s.balanceLbl}>Balance total</Text>

              <TouchableOpacity onPress={() => setBalanceHidden(!balanceHidden)} activeOpacity={0.7}>
                <View style={s.balanceValueRow}>
                  <Text style={s.balanceValue}>
                    {balanceHidden ? `${mainSymbol} ••••••` : mainBalanceDisplay}
                  </Text>
                  <Ionicons
                    name={balanceHidden ? 'eye-off-outline' : 'eye-outline'}
                    size={18}
                    color="rgba(255,255,255,0.6)"
                    style={{ marginLeft: 8, marginTop: 6 }}
                  />
                </View>
              </TouchableOpacity>
              {!balanceHidden && secondaryBalanceDisplay && (
                <Text style={s.balanceValueSecondary}>{secondaryBalanceDisplay}</Text>
              )}
              <Text style={s.balanceSubtitle}>
                {activeCount} {activeCount === 1 ? 'cuenta activa' : 'cuentas activas'} · {balanceCurrencyLabel}
              </Text>

              <View style={s.balanceDivider} />

              <View style={s.balanceActions}>
                {quickActions.map((a) => (
                  <TouchableOpacity
                    key={a.label}
                    style={s.quickActionBtn}
                    onPress={() => navigation.navigate(a.screen)}
                    activeOpacity={0.7}
                  >
                    <View style={s.quickActionIcon}>
                      <Ionicons name={a.icon} size={19} color={a.color} />
                    </View>
                    <Text style={s.quickActionLabel}>{a.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </LinearGradient>
          </View>

          {/* ── STATS 2x2 ── */}
          <View style={s.statsGrid}>
            <StatCard bg={KB.blueLight}  icon="card-outline"    iconColor={KB.accent}  label="CUENTAS ACTIVAS" value={activeCount} />
            <StatCard bg={KB.greenLight} icon="cash-outline"    iconColor={KB.success} label="TOTAL GTQ"       value={fmt(totalGTQ)} small />
            <StatCard bg={KB.celesteLight} icon="globe-outline" iconColor={KB.gold}    label="TOTAL USD"       value={fmt(totalUSD, 'USD')} small />
            <StatCard bg={KB.blueLight}  icon="receipt-outline" iconColor={KB.accent}  label="MOVIMIENTOS"     value={transactions.length} />
          </View>

          {/* ── MIS CUENTAS ── */}
          <View style={s.sectionRow}>
            <View style={s.sectionEyebrow}>
              <View style={s.sectionDot} />
              <Text style={s.sectionTitle}>Mis cuentas</Text>
            </View>
            <TouchableOpacity style={s.seeAllRow} onPress={() => navigation.navigate('MisCuentas')}>
              <Text style={s.seeAll}>Ver todas</Text>
              <Ionicons name="chevron-forward" size={14} color={KB.accent} />
            </TouchableOpacity>
          </View>

          {accounts.length === 0 ? (
            <View style={s.emptyCard}>
              <Text style={s.emptyIcon}>🏦</Text>
              <Text style={s.emptyTitle}>Sin cuentas activas</Text>
              <Text style={s.emptyText}>Un administrador debe asignarte una cuenta para continuar.</Text>
            </View>
          ) : (
            accounts.map((acc, i) => {
              const active = isAccountActive(acc);
              return (
                <View key={acc.id ?? i} style={s.accountCard}>
                  <View style={s.accountInfo}>
                    <View style={[s.accountIconWrap, { backgroundColor: active ? KB.blueLight : KB.redLight }]}>
                      <Ionicons name="card-outline" size={18} color={active ? KB.accent : '#EF4444'} />
                    </View>
                    <View>
                      <Text style={s.accountNum}>
                        •••••• {acc?.accountNumber?.slice(-4) ?? '----'}
                      </Text>
                      <View style={s.accountStatusRow}>
                        <View style={[s.statusDot, { backgroundColor: active ? '#10B981' : '#EF4444' }]} />
                        <Text style={[s.statusText, { color: active ? '#10B981' : '#EF4444' }]}>
                          {active ? 'Activa' : 'Bloqueada'}
                        </Text>
                        <Text style={s.accountCurrency}>· {acc.currency ?? 'GTQ'}</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={s.accountBalance}>{fmt(acc.balance, acc.currency ?? 'GTQ')}</Text>
                </View>
              );
            })
          )}

          {/* ── MOVIMIENTOS RECIENTES ── */}
          <View style={s.sectionRow}>
            <View style={s.sectionEyebrow}>
              <View style={[s.sectionDot, { backgroundColor: KB.gold }]} />
              <Text style={s.sectionTitle}>Movimientos recientes</Text>
            </View>
            <TouchableOpacity style={s.seeAllRow} onPress={() => navigation.navigate('MisMovimientos')}>
              <Text style={s.seeAll}>Ver todos</Text>
              <Ionicons name="chevron-forward" size={14} color={KB.accent} />
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
              const credit = isTxCredit(tx, accountIds);
              const amount = credit ? (tx.amountReceived ?? tx.amount ?? 0) : (tx.amountSent ?? tx.amount ?? 0);
              const txCurrency = credit ? (tx.currencyTo ?? 'GTQ') : (tx.currencyFrom ?? 'GTQ');
              return (
                <View key={tx.id ?? tx._id ?? i} style={s.txRow}>
                  <View style={[s.txIconWrap, { backgroundColor: meta.bg }]}>
                    <Ionicons name={meta.icon} size={20} color={meta.color} />
                  </View>

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

                  <Text style={[s.txAmount, { color: credit ? '#10B981' : '#EF4444' }]}>
                    {credit ? '+' : '-'}{fmt(amount, txCurrency)}
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
      <Ionicons name={icon} size={17} color={iconColor} />
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