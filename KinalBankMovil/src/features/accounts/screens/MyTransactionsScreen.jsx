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
  TransactionDetailModal,
} from "../../../shared/components/MyTransactionsComponents";
import { styles, COLORS } from "../../../shared/constants/MyTransactions";

const TAB_TO_TYPE = {
  deposit: "DEPOSITO",
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
  const [selectedTx, setSelectedTx] = useState(null);

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

    if (activeTab === "sent") {
      list = list.filter((t) => {
        const fromId = String(t.fromAccount?._id ?? t.fromAccount ?? "");
        return t.type === "TRANSFERENCIA" && myAccountIds.includes(fromId);
      });
    } else if (activeTab === "received") {
      list = list.filter((t) => {
        const fromId = String(t.fromAccount?._id ?? t.fromAccount ?? "");
        return t.type === "TRANSFERENCIA" && !myAccountIds.includes(fromId);
      });
    } else if (activeTab !== "all") {
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

  const CURRENCY_SYMBOLS = { GTQ: "Q", USD: "$", EUR: "€", GBP: "£", MXN: "MX$" };

  const formatByCurrencyList = (obj) => {
    const entries = Object.entries(obj);
    if (entries.length === 0) return ["Q 0.00"];
    return entries.map(([cur, val]) =>
      `${CURRENCY_SYMBOLS[cur] ?? cur} ${val.toLocaleString("es-GT", { minimumFractionDigits: 2 })}`
    );
  };


  const balanceDisplay = useMemo(() => {
    const byCurrency = (accounts || []).reduce((acc, a) => {
      const cur = a.currency ?? "GTQ";
      acc[cur] = (acc[cur] ?? 0) + Number(a.balance ?? 0);
      return acc;
    }, {});
    return formatByCurrencyList(byCurrency).join("  +  ");
  }, [accounts]);

  const totals = useMemo(() => {
    const entradasByCurrency = {};
    const salidasByCurrency  = {};

    transactions.forEach((tx) => {
      const fromId           = String(tx.fromAccount?._id ?? tx.fromAccount ?? "");
      const isOwnTransferOut = tx.type === "TRANSFERENCIA" && myAccountIds.includes(fromId);

      if (tx.type === "DEPOSITO" || tx.type === "CREDITO") {
        const cur = tx.currencyTo ?? "GTQ";
        entradasByCurrency[cur] = (entradasByCurrency[cur] ?? 0) + Number(tx.amountReceived ?? 0);
      } else if (tx.type === "TRANSFERENCIA") {
        if (isOwnTransferOut) {
          const cur = tx.currencyFrom ?? "GTQ";
          salidasByCurrency[cur] = (salidasByCurrency[cur] ?? 0) + Number(tx.amountSent ?? 0);
        } else {
          const cur = tx.currencyTo ?? "GTQ";
          entradasByCurrency[cur] = (entradasByCurrency[cur] ?? 0) + Number(tx.amountReceived ?? 0);
        }
      } else if (tx.type === "COMPRA" || tx.type === "RETIRO") {
        const cur = tx.currencyFrom ?? "GTQ";
        salidasByCurrency[cur] = (salidasByCurrency[cur] ?? 0) + Number(tx.amountSent ?? 0);
      }
    });

    return {
      entradasList: formatByCurrencyList(entradasByCurrency),
      salidasList:  formatByCurrencyList(salidasByCurrency),
    };
  }, [transactions, myAccountIds]);

  const renderItem = ({ item }) => {
    if (item.type === "header")
      return <TransactionSectionHeader title={item.title} />;
    return (
      <TransactionItem
        item={item}
        myAccountIds={myAccountIds}
        onPress={setSelectedTx}
      />
    );
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
        balanceDisplay={balanceDisplay}
        totalRecords={totalRecords}
        onBack={() => navigation.goBack()}
        activeTab={activeTab}
        onTabChange={setActiveTab}
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

      <TransactionDetailModal
        visible={!!selectedTx}
        transaction={selectedTx}
        myAccountIds={myAccountIds}
        onClose={() => setSelectedTx(null)}
      />
    </View>
  );
};

export default MyTransactionsScreen;