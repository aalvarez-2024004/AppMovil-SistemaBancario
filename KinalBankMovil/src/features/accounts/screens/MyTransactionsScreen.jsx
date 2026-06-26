import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useAuthStore }        from "../../../shared/store/useAuthStore";
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
import { styles, COLORS } from "../../../shared/constants/MyTransactions";

const TAB_TO_TYPE = {
  deposit:  "DEPOSITO",
  withdraw: "RETIRO",
  transfer: "TRANSFERENCIA",
};

const MyTransactionsScreen = () => {
  const insets     = useSafeAreaInsets();
  const navigation = useNavigation();
  const token      = useAuthStore((s) => s.token);

  const {
    transactions,
    accounts,
    isLoading,
    error,
    hasMore,
    totalRecords,
    fetchTransactions,
    fetchMyAccounts,
    loadMore,
    resetTransactions,
  } = useTransactionStore();

  const myAccountIds = useMemo(
    () => (accounts || []).map((a) => String(a._id)),
    [accounts]
  );

  const [activeTab,  setActiveTab]  = useState("all");
  const [search,     setSearch]     = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    if (token) {
      fetchTransactions(token, 1);
      fetchMyAccounts(token);
    }
    return () => resetTransactions();
  }, [token]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchTransactions(token, 1);
    setRefreshing(false);
  }, [token]);

  const filtered = useMemo(() => {
    let list = transactions;

    if (activeTab !== "all") {
      const backendType = TAB_TO_TYPE[activeTab];
      if (backendType) list = list.filter((t) => t.type === backendType);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.type?.toLowerCase().includes(q) ||
          t.description?.toLowerCase().includes(q) ||
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
      data.forEach((tx) =>
        rows.push({ rowType: "item", ...tx, key: tx._id || tx.id })
      );
    });
    return rows;
  }, [filtered]);

  const currentBalance = useMemo(
    () => (accounts || []).reduce((sum, a) => sum + Number(a.balance ?? 0), 0),
    [accounts]
  );

  const totals = useMemo(() => {
    let entradas = 0;
    let salidas  = 0;

    transactions.forEach((tx) => {
      const fromId           = String(tx.fromAccount?._id ?? tx.fromAccount ?? "");
      const isOwnTransferOut = tx.type === "TRANSFERENCIA" && myAccountIds.includes(fromId);

      if (tx.type === "DEPOSITO" || tx.type === "CREDITO") {
        entradas += Number(tx.amountReceived ?? 0);
      } else if (tx.type === "TRANSFERENCIA") {
        if (isOwnTransferOut) {
          salidas  += Number(tx.amountSent     ?? 0);
        } else {
          entradas += Number(tx.amountReceived ?? 0);
        }
      } else if (tx.type === "COMPRA" || tx.type === "RETIRO") {
        salidas += Number(tx.amountSent ?? 0);
      }
    });

    return { entradas, salidas };
  }, [transactions, myAccountIds]);

  const renderItem = ({ item }) => {
    if (item.type === "header")
      return <TransactionSectionHeader title={item.title} />;
    return <TransactionItem item={item} myAccountIds={myAccountIds} />;
  };

  const renderFooter = () => {
    if (!hasMore) return null;
    if (isLoading && transactions.length > 0)
      return <ActivityIndicator style={{ margin: 16 }} color={COLORS.accent} />;
    return (
      <TouchableOpacity
        style={styles.loadMore}
        onPress={() => loadMore(token)}
        activeOpacity={0.7}
      >
        <Text style={styles.loadMoreText}>Cargar más movimientos</Text>
        <Ionicons name="chevron-down" size={14} color={COLORS.accentDark} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <TransactionHeader
        totals={totals}
        currentBalance={currentBalance}
        totalRecords={totalRecords}
        onBack={() => navigation.goBack()}
      />

      <View style={styles.content}>
        {showSearch && (
          <TransactionSearchBar value={search} onChange={setSearch} />
        )}

        <TransactionTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          showSearch={showSearch}
          onToggleSearch={() => setShowSearch((v) => !v)}
        />

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
            contentContainerStyle={[
              styles.listContent,
              { paddingBottom: insets.bottom + 16 },
            ]}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={COLORS.accent}
              />
            }
            onEndReached={() => hasMore && !isLoading && loadMore(token)}
            onEndReachedThreshold={0.3}
          />
        )}
      </View>
    </View>
  );
};

export default MyTransactionsScreen;