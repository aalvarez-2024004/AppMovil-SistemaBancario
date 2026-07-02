import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '../../../shared/store/useAuthStore'; // ajusta la ruta si es necesario

/* ─── Paleta ─────────────────────────────────────────────── */
const KB = {
  navy:        '#0F1F3D',
  navyLight:   '#1A3260',
  accent:      '#3B7DD8',
  accentLight: '#EBF2FF',
  muted:       '#9CA3AF',
  mutedLight:  '#F3F5F9',
  green:       '#10B981',
  greenLight:  '#D1FAE5',
  red:         '#EF4444',
  redLight:    '#FEE2E2',
  white:       '#FFFFFF',
  border:      '#EEF1F5',
  text:        '#1F2937',
  textSub:     '#6B7280',
};

/* ─── Helpers ────────────────────────────────────────────── */
const formatCurrency = (value) =>
  value != null
    ? `Q ${Number(value).toLocaleString('es-GT', { minimumFractionDigits: 2 })}`
    : '—';

const maskDPI = (dpi) =>
  dpi ? `${dpi.slice(0, 4)} **** ${dpi.slice(-4)}` : '—';

const maskAccount = (acc) =>
  acc ? `**** **** ${acc.slice(-4)}` : '—';

/* ─── Sub-componentes ────────────────────────────────────── */
const Avatar = ({ name }) => {
  const initials = name
    ? name.trim().split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
    : '?';
  return (
    <View style={styles.avatarRing}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
    </View>
  );
};

const StatusBadge = ({ active }) => (
  <View style={[styles.badge, active ? styles.badgeGreen : styles.badgeRed]}>
    <View style={[styles.badgeDot, { backgroundColor: active ? KB.green : KB.red }]} />
    <Text style={[styles.badgeText, { color: active ? KB.green : KB.red }]}>
      {active ? 'Cuenta activa' : 'Cuenta pendiente'}
    </Text>
  </View>
);

const InfoRow = ({ icon, label, value, mono }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoIcon}>
      <Ionicons name={icon} size={16} color={KB.accent} />
    </View>
    <View style={styles.infoContent}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, mono && styles.infoMono]}>{value || '—'}</Text>
    </View>
  </View>
);

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.card}>{children}</View>
  </View>
);

/* ─── Pantalla principal ─────────────────────────────────── */
const ProfileScreen = () => {
  const insets = useSafeAreaInsets();

  // Leemos directamente del store — sin AsyncStorage, sin llamadas manuales a la API
  const user       = useAuthStore((state) => state.user);
  const getProfile = useAuthStore((state) => state.getProfile);
  const logout     = useAuthStore((state) => state.logout);

  const [loading,    setLoading]    = useState(!user); // si ya hay user en cache no mostramos spinner inicial
  const [refreshing, setRefreshing] = useState(false);
  const [error,      setError]      = useState(null);

  const fetchProfile = useCallback(async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      setError(null);
      await getProfile(); // actualiza store.user internamente
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Error al cargar el perfil.';
      setError(msg);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [getProfile]);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProfile(true);
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro que deseas salir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Salir', style: 'destructive', onPress: logout },
      ]
    );
  };

  /* ── Estados de carga / error ── */
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={KB.accent} />
        <Text style={styles.loadingText}>Cargando perfil…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Ionicons name="cloud-offline-outline" size={48} color={KB.muted} />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={() => fetchProfile()}>
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!user) return null;

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom + 24 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={KB.accent}
          colors={[KB.accent]}
        />
      }
    >
      {/* ── Hero ── */}
      <View style={styles.hero}>
        <Avatar name={user.name} />
        <Text style={styles.heroName}>{user.name}</Text>
        <Text style={styles.heroUsername}>@{user.username}</Text>
        <StatusBadge active={user.status} />
      </View>

      {/* ── Tarjeta de cuenta ── */}
      <View style={styles.accountCard}>
        <View>
          <Text style={styles.accountLabel}>Número de cuenta</Text>
          <Text style={styles.accountNumber}>{maskAccount(user.accountNumber)}</Text>
        </View>
        <View style={styles.accountIcon}>
          <Ionicons name="card" size={22} color={KB.white} />
        </View>
      </View>

      {/* ── Info personal ── */}
      <Section title="Información personal">
        <InfoRow icon="mail-outline"     label="Correo electrónico" value={user.email} />
        <InfoRow icon="call-outline"     label="Teléfono"           value={user.phone} />
        <InfoRow icon="location-outline" label="Dirección"          value={user.address} />
        <InfoRow icon="card-outline"     label="DPI"                value={maskDPI(user.dpi)} mono />
      </Section>

      {/* ── Info laboral ── */}
      <Section title="Información laboral">
        <InfoRow icon="briefcase-outline" label="Ocupación"       value={user.job} />
        <InfoRow icon="cash-outline"      label="Ingreso mensual" value={formatCurrency(user.monthlyIncome)} />
      </Section>

      {/* ── Acciones ── */}
      <TouchableOpacity
        style={styles.editBtn}
        activeOpacity={0.85}
        onPress={() => Alert.alert('Editar perfil', 'Funcionalidad disponible próximamente.')}
      >
        <Ionicons name="pencil-outline" size={18} color={KB.white} style={{ marginRight: 8 }} />
        <Text style={styles.editBtnText}>Editar perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutBtn}
        activeOpacity={0.85}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={18} color={KB.red} style={{ marginRight: 8 }} />
        <Text style={styles.logoutBtnText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;

/* ─── Estilos ────────────────────────────────────────────── */
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: KB.mutedLight,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    backgroundColor: KB.mutedLight,
    padding: 24,
  },
  loadingText: {
    color: KB.muted,
    fontSize: 14,
    marginTop: 8,
  },
  errorText: {
    color: KB.textSub,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  retryBtn: {
    marginTop: 8,
    backgroundColor: KB.accent,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryText: {
    color: KB.white,
    fontWeight: '600',
    fontSize: 14,
  },

  /* Hero */
  hero: {
    backgroundColor: KB.navy,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 36,
    gap: 6,
  },
  avatarRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    borderColor: KB.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: KB.navyLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: KB.white,
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 1,
  },
  heroName: {
    color: KB.white,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  heroUsername: {
    color: KB.muted,
    fontSize: 13,
    fontWeight: '500',
  },

  /* Badge */
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 4,
  },
  badgeGreen: { backgroundColor: 'rgba(16,185,129,0.15)' },
  badgeRed:   { backgroundColor: 'rgba(239,68,68,0.15)' },
  badgeDot:   { width: 7, height: 7, borderRadius: 4 },
  badgeText:  { fontSize: 12, fontWeight: '600' },

  /* Account card */
  accountCard: {
    marginHorizontal: 16,
    marginTop: -18,
    backgroundColor: KB.accent,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: KB.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  accountLabel: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  accountNumber: {
    color: KB.white,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1.5,
    fontVariant: ['tabular-nums'],
  },
  accountIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Sections */
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: KB.textSub,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 8,
    paddingLeft: 4,
  },
  card: {
    backgroundColor: KB.white,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: KB.border,
  },

  /* Info rows */
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: KB.border,
  },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: KB.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: { flex: 1 },
  infoLabel: {
    fontSize: 11,
    color: KB.muted,
    fontWeight: '500',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: KB.text,
    fontWeight: '500',
  },
  infoMono: {
    fontVariant: ['tabular-nums'],
    letterSpacing: 1,
  },

  /* Botones */
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 28,
    backgroundColor: KB.navy,
    borderRadius: 14,
    paddingVertical: 15,
    shadowColor: KB.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  editBtnText: {
    color: KB.white,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: KB.white,
    borderRadius: 14,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  logoutBtnText: {
    color: KB.red,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});