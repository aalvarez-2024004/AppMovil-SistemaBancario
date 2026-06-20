import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles, COLORS, TABS, TX_TYPE_MAP } from "../constants/MyTransactions";

const getFromId = (tx) => String(tx.fromAccount?._id ?? tx.fromAccount ?? "");

export const isCreditTx = (tx, myAccountIds = []) => {
  const fromId = getFromId(tx);
  return (
    tx.type === "DEPOSITO" ||
    tx.type === "CREDITO" ||
    (tx.type === "TRANSFERENCIA" && !myAccountIds.includes(fromId))
  );
};

export const formatAmount = (tx, myAccountIds = []) => {
  const credit = isCreditTx(tx, myAccountIds);
  const amount = Number(credit ? tx.amountReceived : tx.amountSent) || 0;
  const formatted = `Q ${Math.abs(amount).toLocaleString("es-GT", { minimumFractionDigits: 2 })}`;
  return { text: credit ? `+${formatted}` : `-${formatted}`, isCredit: credit, amount };
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

export const TransactionItem = ({ item, myAccountIds = [], onPress }) => {
  const credit    = isCreditTx(item, myAccountIds);
  // Si es una transferencia recibida, mostramos el mismo ícono/etiqueta de depósito
  const mappedKey = item.type === "TRANSFERENCIA" && credit ? "DEPOSITO" : item.type;
  const meta      = TX_TYPE_MAP[mappedKey] || TX_TYPE_MAP.TRANSFERENCIA || TX_TYPE_MAP.transfer;
  const amount    = formatAmount(item, myAccountIds);
  const isPending = item.status === "pending";

  return (
    <TouchableOpacity
      style={styles.txItem}
      activeOpacity={0.7}
      onPress={() => onPress?.(item)}
    >
      <View style={[styles.txIcon, { backgroundColor: meta.bg }]}>
        <Ionicons name={meta.iconName} size={21} color={meta.color} />
      </View>

      <View style={styles.txInfo}>
        <Text style={styles.txType} numberOfLines={1}>
          {item.description || meta.label}
        </Text>
        <Text style={styles.txAccount} numberOfLines={1}>
          {item.fromAccount?.accountNumber
            ? `De: •••• ${String(item.fromAccount.accountNumber).slice(-4)}`
            : item.toAccount?.accountNumber
            ? `A: •••• ${String(item.toAccount.accountNumber).slice(-4)}`
            : "Sin cuenta"}
        </Text>
        <View style={[styles.badge, isPending ? styles.badgePending : styles.badgeDone]}>
          <View
            style={[
              styles.badgeDot,
              { backgroundColor: isPending ? COLORS.warning : COLORS.success },
            ]}
          />
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
    </TouchableOpacity>
  );
};

export const TransactionSectionHeader = ({ title }) => (
  <Text style={styles.sectionLabel}>{title}</Text>
);

export const TransactionEmptyState = () => (
  <View style={styles.emptyContainer}>
    <View style={styles.emptyIconWrap}>
      <Ionicons name="receipt-outline" size={38} color={COLORS.textMuted} />
    </View>
    <Text style={styles.emptyTitle}>Aún no tienes movimientos</Text>
    <Text style={styles.emptyText}>
      Cuando hagas un depósito, retiro o transferencia, aparecerá aquí.
    </Text>
  </View>
);

export const TransactionHeader = ({ totals, currentBalance, totalRecords, onBack }) => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
      <Ionicons name="arrow-back" size={18} color="#fff" />
    </TouchableOpacity>

    <View style={styles.headerTop}>
      <Text style={styles.brandEyebrow}>Kinalbank</Text>
      <Text style={styles.headerTitle}>
        Mis{"\n"}
        <Text style={styles.headerTitleAccent}>movimientos</Text>
      </Text>
    </View>

    <View style={styles.balanceRow}>
      <Text style={styles.balanceLabel}>SALDO ACTUAL</Text>
      <Text style={styles.balanceAmount}>
        Q {Number(currentBalance ?? 0).toLocaleString("es-GT", { minimumFractionDigits: 2 })}
      </Text>
      <Text style={styles.balanceSub}>
        {totalRecords} {totalRecords === 1 ? "transacción" : "transacciones"} en total
      </Text>
    </View>

    <View style={styles.pillsRow}>
      <View style={styles.pill}>
        <View style={[styles.pillIconWrap, styles.pillIconWrapIn]}>
          <Ionicons name="arrow-down-outline" size={16} color="#4ADE80" />
        </View>
        <View>
          <Text style={styles.pillLabel}>ENTRADAS</Text>
          <Text style={styles.pillAmount}>
            Q {totals.entradas.toLocaleString("es-GT", { minimumFractionDigits: 2 })}
          </Text>
        </View>
      </View>

      <View style={styles.pill}>
        <View style={[styles.pillIconWrap, styles.pillIconWrapOut]}>
          <Ionicons name="arrow-up-outline" size={16} color="#F87171" />
        </View>
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
    <Ionicons name="search-outline" size={16} color={COLORS.textMuted} />
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
        <Ionicons name="close-circle" size={17} color={COLORS.textMuted} />
      </TouchableOpacity>
    )}
  </View>
);

export const TransactionTabs = ({ activeTab, onTabChange, showSearch, onToggleSearch }) => (
  <View style={styles.tabsRow}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.tabsContainer}
      style={{ flex: 1 }}
    >
      {TABS.map((item) => {
        const isActive = activeTab === item.key;
        return (
          <TouchableOpacity
            key={item.key}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onTabChange(item.key)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={item.icon}
              size={14}
              color={isActive ? "#fff" : COLORS.textMuted}
            />
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>

    <TouchableOpacity
      style={styles.searchToggleBtn}
      onPress={onToggleSearch}
      activeOpacity={0.7}
    >
      <Ionicons
        name={showSearch ? "close" : "search-outline"}
        size={17}
        color={showSearch ? COLORS.danger : COLORS.textSecondary}
      />
    </TouchableOpacity>
  </View>
);