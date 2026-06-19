import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles, COLORS, TABS, TX_TYPE_MAP  } from "../constants/MyTransactions";


export const formatAmount = (amount, type) => {
  const formatted = `Q ${Math.abs(amount).toLocaleString("es-GT", { minimumFractionDigits: 2 })}`;
  const isCredit  = type === "deposit" || type === "received";
  return { text: isCredit ? `+${formatted}` : `-${formatted}`, isCredit };
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const now  = new Date();
  const diff = Math.floor((now - date) / 86400000);
  if (diff === 0) return date.toLocaleTimeString("es-GT", { hour: "2-digit", minute: "2-digit" });
  if (diff === 1) return "Ayer";
  return date.toLocaleDateString("es-GT", { day: "numeric", month: "short" });
};

export const groupByDate = (transactions) => {
  const groups = {};
  transactions.forEach((tx) => {
    const date = new Date(tx.createdAt);
    const now  = new Date();
    const diff = Math.floor((now - date) / 86400000);
    let label;
    if (diff === 0)      label = "Hoy";
    else if (diff === 1) label = "Ayer";
    else                 label = date.toLocaleDateString("es-GT", { weekday: "long", day: "numeric", month: "long" });
    if (!groups[label]) groups[label] = [];
    groups[label].push(tx);
  });
  return Object.entries(groups).map(([title, data]) => ({ title, data }));
};

export const TransactionItem = ({ item }) => {
  const type      = item.type || "transfer";
  const meta      = TX_TYPE_MAP[type] || TX_TYPE_MAP.transfer;
  const amount    = formatAmount(item.amount || 0, type);
  const isPending = item.status === "pending";

  return (
    <View style={styles.txItem}>
      <View style={[styles.txIcon, { backgroundColor: meta.bg }]}>
        <Ionicons name={meta.iconName} size={20} color={meta.color} />
      </View>
      <View style={styles.txInfo}>
        <Text style={styles.txType} numberOfLines={1}>{meta.label}</Text>
        <Text style={styles.txAccount} numberOfLines={1}>
          {item.fromAccount?.accountNumber
            ? `De: •••• ${String(item.fromAccount.accountNumber).slice(-4)}`
            : item.toAccount?.accountNumber
            ? `A: •••• ${String(item.toAccount.accountNumber).slice(-4)}`
            : "Sin cuenta"}
        </Text>
        <View style={[styles.badge, isPending ? styles.badgePending : styles.badgeDone]}>
          <Text style={[styles.badgeText, isPending ? styles.badgeTextPending : styles.badgeTextDone]}>
            {isPending ? "Pendiente" : "Completado"}
          </Text>
        </View>
      </View>
      <View style={styles.txRight}>
        <Text style={[styles.txAmount, amount.isCredit ? styles.amountCredit : styles.amountDebit]}>
          {amount.text}
        </Text>
        <Text style={styles.txDate}>{formatDate(item.createdAt)}</Text>
      </View>
    </View>
  );
};

export const TransactionSectionHeader = ({ title }) => (
  <Text style={styles.sectionLabel}>{title}</Text>
);

export const TransactionEmptyState = () => (
  <View style={styles.emptyContainer}>
    <Ionicons name="receipt-outline" size={48} color={COLORS.textMuted} />
    <Text style={styles.emptyTitle}>Sin movimientos</Text>
    <Text style={styles.emptyText}>Tus transacciones aparecerán aquí</Text>
  </View>
);

export const TransactionHeader = ({ totals, totalRecords, showSearch, onToggleSearch }) => (
  <View style={styles.header}>
    <View style={styles.headerTop}>
      <Text style={styles.headerTitle}>Mis movimientos</Text>
      <TouchableOpacity style={styles.iconBtn} onPress={onToggleSearch} activeOpacity={0.7}>
        <Ionicons name={showSearch ? "close" : "search"} size={18} color="#fff" />
      </TouchableOpacity>
    </View>
    <View style={styles.balanceRow}>
      <Text style={styles.balanceLabel}>TOTAL REGISTRADO</Text>
      <Text style={styles.balanceAmount}>
        Q {(totals.entradas - totals.salidas).toLocaleString("es-GT", { minimumFractionDigits: 2 })}
      </Text>
      <Text style={styles.balanceSub}>{totalRecords} transacciones en total</Text>
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
);

export const TransactionSearchBar = ({ value, onChange }) => (
  <View style={styles.searchBar}>
    <Ionicons name="search-outline" size={15} color={COLORS.textMuted} />
    <TextInput
      style={styles.searchInput}
      placeholder="Buscar movimiento..."
      placeholderTextColor={COLORS.textMuted}
      value={value}
      onChangeText={onChange}
      autoFocus
    />
    {value.length > 0 && (
      <TouchableOpacity onPress={() => onChange("")}>
        <Ionicons name="close-circle" size={16} color={COLORS.textMuted} />
      </TouchableOpacity>
    )}
  </View>
);

export const TransactionTabs = ({ activeTab, onTabChange }) => (
  <FlatList
    data={TABS}
    horizontal
    showsHorizontalScrollIndicator={false}
    keyExtractor={(t) => t.key}
    contentContainerStyle={styles.tabsContainer}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={[styles.tab, activeTab === item.key && styles.tabActive]}
        onPress={() => onTabChange(item.key)}
        activeOpacity={0.7}
      >
        <Text style={[styles.tabText, activeTab === item.key && styles.tabTextActive]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    )}
  />
);