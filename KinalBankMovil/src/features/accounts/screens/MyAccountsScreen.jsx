import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import {COLORS, styles} from "../../../shared/constants/MyAccounts"

const MisCuentasScreen = () => {
  const { token } = useSelector((state) => state.auth);

  const [accounts, setAccounts]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [refreshing, setRefreshing]     = useState(false);
  const [error, setError]               = useState(null);
  const [selectedAccount, setSelected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // ── Fetch ──
  const fetchAccounts = useCallback(async () => {
    try {
      setError(null);
      const res = await getMyAccountsRequest(token);
      // Admite { accounts: [] } o directamente []
      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.accounts ?? res.data?.data ?? [];
      setAccounts(data);
    } catch (err) {
      setError("No se pudieron cargar tus cuentas. Intenta de nuevo.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchAccounts();
  };

  // ── Modal ──
  const openModal = (account) => {
    setSelected(account);
    setModalVisible(true);
  };
  const closeModal = () => setModalVisible(false);

  // ── Derivados ──
  const totalBalance  = accounts.reduce(
    (acc, a) => acc + Number(a.balance || a.saldo || 0), 0
  );
  const activeAccounts   = accounts.filter(
    (a) => a.status === "active" || a.estado === "activa"
  );
  const inactiveAccounts = accounts.filter(
    (a) => a.status !== "active" && a.estado !== "activa"
  );

  // ── Render ──
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bgCard} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.accent}
            colors={[COLORS.accent]}
          />
        }
      >
        {/* ── Hero ── */}
        <View style={styles.hero}>
          <Text style={styles.heroLabel}>KinalBank</Text>
          <Text style={styles.heroTitle}>
            Mis{"\n"}
            <Text style={styles.heroTitleAccent}>Cuentas</Text>
          </Text>
          <Text style={styles.heroSubtitle}>
            {accounts.length} {accounts.length === 1 ? "cuenta" : "cuentas"} ·{" "}
            {activeAccounts.length} activa{activeAccounts.length !== 1 ? "s" : ""}
          </Text>

          {/* Balance total */}
          <View style={styles.balanceBox}>
            <Text style={styles.balanceLabel}>+ Balance total</Text>
            <Text style={styles.balanceAmount}>
              {formatCurrency(totalBalance)}
            </Text>
            <Text style={styles.balanceSub}>
              {activeAccounts.length} cuenta
              {activeAccounts.length !== 1 ? "s" : ""} activa
              {activeAccounts.length !== 1 ? "s" : ""}
            </Text>
          </View>
        </View>

        {/* ── Stats ── */}
        <View style={styles.statsRow}>
          <StatCard
            icon="albums-outline"
            iconBg={COLORS.bgCardAlt}
            value={accounts.length}
            label="Total cuentas"
            sublabel={`${activeAccounts.length} activa${activeAccounts.length !== 1 ? "s" : ""}`}
          />
          <StatCard
            icon="checkmark-circle-outline"
            iconBg={COLORS.activeLight}
            value={activeAccounts.length}
            valueStyle={styles.statValueActive}
            label="Activas"
            sublabel="En operación"
          />
          <StatCard
            icon="close-circle-outline"
            iconBg={COLORS.inactiveLight}
            value={inactiveAccounts.length}
            valueStyle={inactiveAccounts.length > 0 ? styles.statValueInactive : null}
            label="Inactivas"
            sublabel="Suspendidas"
          />
        </View>

        {/* ── Lista de cuentas ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionTitle}>Cuentas Activas</Text>
            </View>
            {activeAccounts.length > 0 && (
              <View style={styles.sectionBadge}>
                <Text style={styles.sectionBadgeText}>
                  {activeAccounts.length}
                </Text>
              </View>
            )}
          </View>

          {/* Loading */}
          {loading ? (
            <SkeletonCards />
          ) : error ? (
            /* Error */
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Ionicons name="wifi-outline" size={28} color={COLORS.inactive} />
              </View>
              <Text style={styles.emptyTitle}>Sin conexión</Text>
              <Text style={styles.emptySubtitle}>{error}</Text>
              <TouchableOpacity
                style={[styles.accountActionBtn, { marginTop: 12 }]}
                onPress={fetchAccounts}
              >
                <Text style={styles.accountActionText}>Reintentar</Text>
                <Ionicons name="refresh" size={14} color={COLORS.accent} />
              </TouchableOpacity>
            </View>
          ) : activeAccounts.length === 0 ? (
            /* Vacío */
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Ionicons name="card-outline" size={28} color={COLORS.textMuted} />
              </View>
              <Text style={styles.emptyTitle}>Sin cuentas activas</Text>
              <Text style={styles.emptySubtitle}>
                No tienes cuentas activas en este momento.
              </Text>
            </View>
          ) : (
            activeAccounts.map((account) => (
              <AccountCard
                key={account._id || account.id}
                account={account}
                onPress={openModal}
              />
            ))
          )}

          {/* Cuentas inactivas (si las hay) */}
          {!loading && !error && inactiveAccounts.length > 0 && (
            <>
              <View style={[styles.sectionHeader, { marginTop: 24 }]}>
                <View style={styles.sectionTitleRow}>
                  <View style={[styles.sectionDot, { backgroundColor: COLORS.inactive }]} />
                  <Text style={styles.sectionTitle}>Inactivas</Text>
                </View>
                <View style={styles.sectionBadge}>
                  <Text style={styles.sectionBadgeText}>
                    {inactiveAccounts.length}
                  </Text>
                </View>
              </View>
              {inactiveAccounts.map((account) => (
                <AccountCard
                  key={account._id || account.id}
                  account={account}
                  onPress={openModal}
                />
              ))}
            </>
          )}
        </View>
      </ScrollView>

      {/* ── Modal de detalle ── */}
      <AccountDetailModal
        visible={modalVisible}
        account={selectedAccount}
        onClose={closeModal}
      />
    </View>
  );
};

export default MisCuentasScreen;