import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  RefreshControl, StatusBar, ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../../shared/store/authStore';
import { getMyAccounts, getMyTransactions } from '../../../shared/api/accountsClient';
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
  const [activeAccount, setActiveAccount] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const [accRes, txRes] = await Promise.all([
        getMyAccounts(token),
        getMyTransactions(token, 1, 5),
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

  const currentAccount = accounts?.[activeAccount];

  const balance = currentAccount?.balance ?? 0;

  const totalGTQ = accounts
    .filter(a => a.currency === 'GTQ' || !a.currency)
    .reduce((sum, a) => sum + (a.balance ?? 0), 0);

  const totalUSD = accounts
    .filter(a => a.currency === 'USD')
    .reduce((sum, a) => sum + (a.balance ?? 0), 0);

  const activeCount = accounts.filter(
    a => a.status === 'ACTIVA' || a.isActive === true
  ).length;

  const isActiveAccount =
    currentAccount?.status?.toString()?.trim()?.toUpperCase() === 'ACTIVA' ||
    currentAccount?.isActive === true;

  const quickActions = [
    { icon: '↑', label: 'Transferir', screen: 'Transfer' },
    { icon: '📋', label: 'Movimientos', screen: 'Transactions' },
    { icon: '★', label: 'Favoritos', screen: 'Favorites' },
    { icon: '🛍', label: 'Productos', screen: 'Products' },
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

        {/* HEADER (NO TOCADO) */}
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

          <View style={s.statsStrip}>
            <View style={s.statItem}>
              <Text style={s.statVal}>{activeCount}</Text>
              <Text style={s.statLbl}>Cuentas activas</Text>
            </View>

            <View style={s.statDivider} />

            <View style={s.statItem}>
              <Text style={[s.statVal, { color: '#7DD3FC' }]}>
                {fmt(totalGTQ)}
              </Text>
              <Text style={s.statLbl}>Total en GTQ</Text>
            </View>

            <View style={s.statDivider} />

            <View style={s.statItem}>
              <Text style={[s.statVal, { color: '#86EFAC' }]}>
                {fmt(totalUSD, 'USD')}
              </Text>
              <Text style={s.statLbl}>Total en USD</Text>
            </View>
          </View>
        </View>

        <View style={s.body}>

          {/* TARJETA (COMPLETA + FIX SOLO LÓGICA) */}
          {accounts.length > 0 ? (
            <>
              <View style={s.card}>
                <View style={s.cardGrad} />
                <View style={s.cardTop}>
                  <Text style={s.cardBank}>KINAL BANK</Text>
                  <View style={s.cardChip} />
                </View>

                <View style={s.cardMid}>
                  <Text style={s.cardBalanceLbl}>SALDO DISPONIBLE</Text>

                  <TouchableOpacity onPress={() => setBalanceHidden(!balanceHidden)}>
                    <Text style={s.cardBalance}>
                      {balanceHidden ? '••••••••' : fmt(balance)}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={s.cardBot}>
                  <View>
                    <Text style={s.cardMeta}>Número de cuenta</Text>
                    <Text style={s.cardNum}>
                      •••••• {currentAccount?.accountNumber?.slice(-4) ?? '----'}
                    </Text>
                  </View>

                  <View
                    style={[
                      s.statusBadge,
                      isActiveAccount ? s.badgeActive : s.badgeInactive,
                    ]}
                  >
                    <Text style={s.badgeText}>
                      {isActiveAccount ? 'ACTIVA' : 'BLOQUEADA'}
                    </Text>
                  </View>
                </View>
              </View>

              {accounts.length > 1 && (
                <View style={s.dotRow}>
                  {accounts.map((_, i) => (
                    <TouchableOpacity key={i} onPress={() => setActiveAccount(i)}>
                      <View style={[s.dot, i === activeAccount && s.dotActive]} />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </>
          ) : (
            <View style={s.emptyCard}>
              <Text style={s.emptyIcon}>🏦</Text>
              <Text style={s.emptyTitle}>Sin cuentas activas</Text>
              <Text style={s.emptyText}>
                Un administrador debe asignarte una cuenta para continuar.
              </Text>
            </View>
          )}

          {/* ACCIONES (SIN TOCAR) */}
          <Text style={s.sectionTitle}>Acciones rápidas</Text>

          <View style={s.actionsRow}>
            {quickActions.map((a) => (
              <TouchableOpacity
                key={a.label}
                style={s.actionBtn}
                onPress={() => navigation.navigate(a.screen)}
              >
                <View style={s.actionIcon}>
                  <Text style={s.actionIconText}>{a.icon}</Text>
                </View>
                <Text style={s.actionLabel}>{a.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* MOVIMIENTOS (SIN TOCAR) */}
          <View style={s.sectionRow}>
            <Text style={s.sectionTitle}>Movimientos recientes</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
              <Text style={s.seeAll}>Ver todos →</Text>
            </TouchableOpacity>
          </View>

          {transactions.length === 0 ? (
            <View style={s.emptyTx}>
              <Text style={s.emptyIcon}>📭</Text>
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