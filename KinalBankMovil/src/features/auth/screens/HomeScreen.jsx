import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  RefreshControl, StatusBar, ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../../shared/store/authStore';
import { getMyAccountsRequest, getMyTransactionsRequest } from '../../../shared/api/bankClient';
import { s, KB, chipStyles } from '../../../shared/constants/home';

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Buenos días';
  if (h < 18) return 'Buenas tardes';
  return 'Buenas noches';
};

const fmt = (amount, currency = 'GTQ') =>
  new Intl.NumberFormat('es-GT', { style: 'currency', currency }).format(amount ?? 0);

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, token, logout } = useAuthStore();

  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

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

  const quickActions = [
    { icon: '↗️', label: 'Transferir', screen: 'Transfer', bg: KB.blueLight, color: KB.accent },
    { icon: '💳', label: 'Cuentas', screen: 'MisCuentas', bg: KB.redLight, color: KB.accent },
    { icon: '📋', label: 'Movimientos', screen: 'MisMovimientos', bg: KB.goldLight, color: KB.gold },
    { icon: '⭐', label: 'Favoritos', screen: 'Favorites', bg: KB.greenLight, color: KB.success },
    { icon: '🏦', label: 'Productos', screen: 'Products', bg: KB.blueLight, color: KB.accent },
  ];

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

        {/* HEADER */}
        <View style={s.header}>
          <View style={s.circle1} pointerEvents="none" />
          <View style={s.circle2} pointerEvents="none" />

          <View style={s.headerTop}>
            <View>
              <Text style={s.greeting}>{getGreeting()}</Text>
              <Text style={s.userName}>
                Hola, {user?.name?.split(' ')[0] || user?.username || 'Usuario'} 👋
              </Text>
              <Text style={s.tagline}>Aquí está tu resumen financiero</Text>
            </View>

            <TouchableOpacity
              style={s.avatar}
              onPress={() => navigation.navigate('Profile')}
            >
              <Text style={s.avatarText}>
                {(user?.name?.[0] || user?.username?.[0] || 'U').toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={s.body}>

          {/* BALANCE TOTAL + ACCIONES RÁPIDAS (tarjeta blanca flotante) */}
          <View style={s.balanceCard}>
            <Text style={s.balanceLbl}>BALANCE TOTAL · CUENTAS ACTIVAS</Text>

            <View style={s.balanceRow}>
              <TouchableOpacity onPress={() => setBalanceHidden(!balanceHidden)}>
                <Text style={s.balanceValue}>
                  {balanceHidden ? 'Q ••••••' : fmt(totalGTQ)}
                </Text>
              </TouchableOpacity>

              <View style={s.balanceActions}>
                {quickActions.map((a) => (
                  <TouchableOpacity
                    key={a.label}
                    style={s.quickActionBtn}
                    onPress={() => {
                      navigation.navigate(a.screen);
                    }}
                  >
                    <View style={[s.quickActionIcon, { backgroundColor: a.bg }]}>
                      <Text style={s.quickActionIconText}>{a.icon}</Text>
                    </View>
                    <Text style={s.quickActionLabel}>{a.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={s.balanceProgressBar} />
          </View>

          {/* GRID DE STATS 2x2 */}
          <View style={s.statsGrid}>
            <View style={s.statCard}>
              <View style={[s.statIconWrap, { backgroundColor: KB.blueLight }]}>
                <Text style={[s.statIconText, { color: KB.accent }]}>💳</Text>
              </View>
              <View>
                <Text style={s.statCardLbl}>CUENTAS ACTIVAS</Text>
                <Text style={s.statCardVal}>{activeCount}</Text>
              </View>
            </View>

            <View style={s.statCard}>
              <View style={[s.statIconWrap, { backgroundColor: KB.greenLight }]}>
                <Text style={[s.statIconText, { color: KB.success }]}>GT</Text>
              </View>
              <View>
                <Text style={s.statCardLbl}>TOTAL EN GTQ</Text>
                <Text style={s.statCardVal}>{fmt(totalGTQ)}</Text>
              </View>
            </View>

            <View style={s.statCard}>
              <View style={[s.statIconWrap, { backgroundColor: KB.goldLight }]}>
                <Text style={[s.statIconText, { color: KB.gold }]}>US</Text>
              </View>
              <View>
                <Text style={s.statCardLbl}>TOTAL EN USD</Text>
                <Text style={s.statCardVal}>{fmt(totalUSD, 'USD')}</Text>
              </View>
            </View>

            <View style={s.statCard}>
              <View style={[s.statIconWrap, { backgroundColor: KB.blueLight }]}>
                <Text style={[s.statIconText, { color: KB.accent }]}>📋</Text>
              </View>
              <View>
                <Text style={s.statCardLbl}>MOVIMIENTOS</Text>
                <Text style={s.statCardVal}>{transactions.length}</Text>
              </View>
            </View>
          </View>

          {/* MIS CUENTAS */}
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
              <Text style={s.emptyText}>
                Un administrador debe asignarte una cuenta para continuar.
              </Text>
            </View>
          ) : (
            <View style={s.accountsBox}>
              {accounts.map((acc, i) => (
                <View
                  key={acc.id ?? i}
                  style={[s.accountRow, i > 0 && s.accountRowDivider]}
                >
                  <View style={s.accountInfo}>
                    <View style={s.accountIconWrap}>
                      <Text>🏦</Text>
                    </View>
                    <View>
                      <Text style={s.accountNum}>
                        •••••• {acc?.accountNumber?.slice(-4) ?? '----'}
                      </Text>
                      <Text style={s.accountStatus}>
                        {isAccountActive(acc) ? 'Activa' : 'Bloqueada'} · {acc.currency ?? 'GTQ'}
                      </Text>
                    </View>
                  </View>
                  <Text style={s.accountBalance}>{fmt(acc.balance, acc.currency ?? 'GTQ')}</Text>
                </View>
              ))}
            </View>
          )}

          {/* MOVIMIENTOS RECIENTES */}
          <View style={s.sectionRow}>
            <Text style={s.sectionTitle}>Movimientos recientes</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MisMovimientos')}>
              <Text style={s.seeAll}>Ver todos →</Text>
            </TouchableOpacity>
          </View>

          {transactions.length === 0 ? (
            <View style={s.emptyTx}>
              <Text style={s.emptyIcon}>🏦</Text>
              <Text style={s.emptyText}>Sin movimientos recientes</Text>
            </View>
          ) : (
            transactions.slice(0, 5).map((tx, i) => (
              <View key={tx.id ?? i} style={s.txRow}>
                <View style={s.txInfo}>
                  <Text style={s.txDesc}>{tx.description}</Text>
                  <Text style={s.txDate}>
                    {tx.createdAt
                      ? new Date(tx.createdAt).toLocaleDateString('es-GT')
                      : '—'}
                  </Text>
                </View>

                <Text style={s.txAmount}>
                  {fmt(tx.amount)}
                </Text>
              </View>
            ))
          )}

          {/* LOGOUT */}
          <TouchableOpacity style={s.logoutBtn} onPress={logout}>
            <Text style={s.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;