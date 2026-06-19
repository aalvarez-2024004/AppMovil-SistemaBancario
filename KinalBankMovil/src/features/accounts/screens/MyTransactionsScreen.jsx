import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
} from "react-native";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useAuthStore }        from "../../../shared/store/authStore";
import { useTransactionStore } from "../../../shared/store/useTransactionStore";

import {
  groupByDate,  
  TransactionHeader,
  TransactionSearchBar,
  TransactionTabs,
  TransactionItem,
  TransactionSectionHeader,
  TransactionEmptyState,
} from "../../../shared/components/MyTransactionsComponents";
import { styles, COLORS, TABS, TX_TYPE_MAP } from "../../../shared/constants/MyTransactions";
import { getMyTransactionsRequest } from "../../../shared/api/bankClient";

const MyTransactionsScreen = () => {
  const insets = useSafeAreaInsets();
  const token  = useAuthStore((s) => s.token);

  const {
    transactions,
    isLoading,
    error,
    hasMore,
    totalRecords,
    fetchTransactions,
    loadMore,
    resetTransactions,
  } = useTransactionStore();

  const [activeTab,  setActiveTab]  = useState("all");
  const [search,     setSearch]     = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

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

  const flatData = useMemo(() => {
    const rows = [];
    groupByDate(filtered).forEach(({ title, data }) => {
      rows.push({ type: "header", title, key: `h-${title}` });
      data.forEach((tx) => rows.push({ type: "item", ...tx, key: tx._id || tx.id }));
    });
    return rows;
  }, [filtered]);

  const totals = useMemo(() => {
    const entradas = transactions
      .filter((t) => t.type === "deposit" || t.type === "received")
      .reduce((s, t) => s + (t.amount || 0), 0);
    const salidas = transactions
      .filter((t) => t.type === "withdraw" || t.type === "transfer")
      .reduce((s, t) => s + (t.amount || 0), 0);
    return { entradas, salidas };
  }, [transactions]);

  const renderItem = ({ item }) => {
    if (item.type === "header") return <TransactionSectionHeader title={item.title} />;
    return <TransactionItem item={item} />;
  };

  const renderFooter = () => {
    if (!hasMore) return null;
    if (isLoading && transactions.length > 0)
      return <ActivityIndicator style={{ margin: 16 }} color={COLORS.accent} />;
    return (
      <Text style={styles.loadMoreText} onPress={() => loadMore(token)}>
        Cargar más movimientos ↓
      </Text>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <TransactionHeader
        totals={totals}
        totalRecords={totalRecords}
        showSearch={showSearch}
        onToggleSearch={() => setShowSearch((v) => !v)}
      />

      <View style={styles.content}>
        {showSearch && <TransactionSearchBar value={search} onChange={setSearch} />}

        <TransactionTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {error && (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle-outline" size={16} color={COLORS.danger} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {isLoading && transactions.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.accent} />
            <Text style={styles.loadingText}>Cargando movimientos...</Text>
          </View>
        ) : (
          <FlatList
            data={flatData}
            keyExtractor={(item) => item.key}
            renderItem={renderItem}
            ListEmptyComponent={<TransactionEmptyState />}
            ListFooterComponent={renderFooter}
            contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 16 }]}
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