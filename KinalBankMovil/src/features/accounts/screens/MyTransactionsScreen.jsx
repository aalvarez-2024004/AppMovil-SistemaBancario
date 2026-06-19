import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
  Dimensions,
} from "react-native";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthStore } from "../../../shared/store/authStore";
import { useTransactionStore } from "../../../shared/store/transactionStore";

const formatAmount = (amount, type) => {
  const formatted = `Q ${Math.abs(amount).toLocaleString("es-GT", { minimumFractionDigits: 2 })}`;
  const isCredit = type === "deposit" || type === "received";
  return { text: isCredit ? `+${formatted}` : `-${formatted}`, isCredit };
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const now  = new Date();
  const diff = Math.floor((now - date) / 86400000);
  if (diff === 0) return date.toLocaleTimeString("es-GT", { hour: "2-digit", minute: "2-digit" });
  if (diff === 1) return "Ayer";
  return date.toLocaleDateString("es-GT", { day: "numeric", month: "short" });
};

const groupByDate = (transactions) => {
  const groups = {};
  transactions.forEach((tx) => {
    const date  = new Date(tx.createdAt);
    const now   = new Date();
    const diff  = Math.floor((now - date) / 86400000);
    let label;
    if (diff === 0)      label = "Hoy";
    else if (diff === 1) label = "Ayer";
    else                 label = date.toLocaleDateString("es-GT", { weekday: "long", day: "numeric", month: "long" });
    if (!groups[label]) groups[label] = [];
    groups[label].push(tx);
  });
  return Object.entries(groups).map(([title, data]) => ({ title, data }));
};

const MyTransactionsScreen= () => {
  const insets = useSafeAreaInsets();
  const token  = useAuthStore((s) => s.token);

  const { transactions, isLoading, error, hasMore, totalRecords, fetchTransactions, loadMore, resetTransactions } =
    useTransactionStore();

  const [activeTab,    setActiveTab]    = useState("all");
  const [search,       setSearch]       = useState("");
  const [refreshing,   setRefreshing]   = useState(false);
  const [showSearch,   setShowSearch]   = useState(false);

  useEffect(() => {
    if (token) fetchTransactions(token, 1);
    return () => resetTransactions();
  }, [token]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchTransactions(token, 1);
    setRefreshing(false);
  }, [token]);

  const filtered = useMemo(() => {
    let list = transactions;
    if (activeTab !== "all") list = list.filter((t) => t.type === activeTab);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.type?.toLowerCase().includes(q) ||
          t.fromAccount?.accountNumber?.toString().includes(q) ||
          t.toAccount?.accountNumber?.toString().includes(q)
      );
    }
    return list;
  }, [transactions, activeTab, search]);

  const grouped = useMemo(() => groupByDate(filtered), [filtered]);

  const flatData = useMemo(() => {
    const rows = [];
    grouped.forEach(({ title, data }) => {
      rows.push({ type: "header", title, key: `h-${title}` });
      data.forEach((tx) => rows.push({ type: "item", ...tx, key: tx._id || tx.id }));
    });
    return rows;
  }, [grouped]);

  const totals = useMemo(() => {
    const entradas = transactions.filter((t) => t.type === "deposit" || t.type === "received")
      .reduce((s, t) => s + (t.amount || 0), 0);
    const salidas = transactions.filter((t) => t.type === "withdraw" || t.type === "transfer")
      .reduce((s, t) => s + (t.amount || 0), 0);
    return { entradas, salidas };
  }, [transactions]);

  const renderItem = ({ item }) => {
    if (item.type === "header") return <SectionHeader title={item.title} />;
    return <TransactionItem item={item} />;
  };

  const renderFooter = () => {
    if (!hasMore) return null;
    if (isLoading && transactions.length > 0) {
      return <ActivityIndicator style={{ margin: 16 }} color={COLORS.accent} />;
    }
    return (
      <TouchableOpacity style={styles.loadMore} onPress={() => loadMore(token)} activeOpacity={0.7}>
        <Text style={styles.loadMoreText}>Cargar más movimientos</Text>
        <Ionicons name="chevron-down" size={14} color={COLORS.accent} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Mis movimientos</Text>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setShowSearch((v) => !v)} activeOpacity={0.7}>
            <Ionicons name={showSearch ? "close" : "search"} size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.balanceRow}>
          <View>
            <Text style={styles.balanceLabel}>TOTAL REGISTRADO</Text>
            <Text style={styles.balanceAmount}>
              Q {(totals.entradas - totals.salidas).toLocaleString("es-GT", { minimumFractionDigits: 2 })}
            </Text>
            <Text style={styles.balanceSub}>{totalRecords} transacciones en total</Text>
          </View>
        </View>

        <View style={styles.pillsRow}>
          <View style={styles.pill}>
            <View style={styles.pillDotGreen} />
            <View>
              <Text style={styles.pillLabel}>ENTRADAS</Text>
              <Text style={styles.pillAmount}>
                Q {totals.entradas.toLocaleString("es-GT", { minimumFractionDigits: 2 })}
              </Text>
            </View>
          </View>
          <View style={styles.pill}>
            <View style={styles.pillDotRed} />
            <View>
              <Text style={styles.pillLabel}>SALIDAS</Text>
              <Text style={styles.pillAmount}>
                Q {totals.salidas.toLocaleString("es-GT", { minimumFractionDigits: 2 })}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {showSearch && (
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={15} color={COLORS.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar movimiento..."
              placeholderTextColor={COLORS.textMuted}
              value={search}
              onChangeText={setSearch}
              autoFocus
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch("")}>
                <Ionicons name="close-circle" size={16} color={COLORS.textMuted} />
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Tabs */}
        <FlatList
          data={TABS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(t) => t.key}
          contentContainerStyle={styles.tabsContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.tab, activeTab === item.key && styles.tabActive]}
              onPress={() => setActiveTab(item.key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, activeTab === item.key && styles.tabTextActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* Error */}
        {error && (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle-outline" size={16} color={COLORS.danger} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* List */}
        {isLoading && transactions.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.accent} />
            <Text style={styles.loadingText}>Cargando movimientos...</Text>
          </View>
        ) : (
          <FlatList
            data={flatData}
            keyExtractor={(item) => item.key || item._id}
            renderItem={renderItem}
            ListEmptyComponent={<EmptyState />}
            ListFooterComponent={renderFooter}
            contentContainerStyle={[
              styles.listContent,
              { paddingBottom: insets.bottom + 16 },
            ]}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.accent} />
            }
            onEndReached={() => hasMore && !isLoading && loadMore(token)}
            onEndReachedThreshold={0.3}
          />
        )}
      </View>
    </View>
  );
}

export default MyTransactionsScreen;