import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { styles, COLORS, TABS, TX_TYPE_MAP, HEADER_GRADIENT } from "../constants/MyTransactions";

const getFromId = (tx) => String(tx.fromAccount?._id ?? tx.fromAccount ?? "");

export const isCreditTx = (tx, myAccountIds = []) => {
  const fromId = getFromId(tx);
  return (
    tx.type === "DEPOSITO" ||
    tx.type === "CREDITO" ||
    (tx.type === "TRANSFERENCIA" && !myAccountIds.includes(fromId))
  );
};

const CURRENCY_SYMBOLS = { GTQ: "Q", USD: "$", EUR: "€", GBP: "£", MXN: "MX$" };

export const formatAmount = (tx, myAccountIds = []) => {
  const credit   = isCreditTx(tx, myAccountIds);
  const amount   = Number(credit ? tx.amountReceived : tx.amountSent) || 0;
  const currency = credit ? (tx.currencyTo ?? "GTQ") : (tx.currencyFrom ?? "GTQ");
  const symbol   = CURRENCY_SYMBOLS[currency] ?? currency;
  const formatted = `${symbol} ${Math.abs(amount).toLocaleString("es-GT", { minimumFractionDigits: 2 })}`;
  return { text: credit ? `+${formatted}` : `-${formatted}`, isCredit: credit, amount, currency };
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

const getMeta = (item, isCredit) => {
  if (item.type === "DEPOSITO" || item.type === "CREDITO") return TX_TYPE_MAP.deposit;
  if (item.type === "RETIRO")        return TX_TYPE_MAP.withdraw;
  if (item.type === "COMPRA")        return TX_TYPE_MAP.purchase;
  if (item.type === "TRANSFERENCIA") return isCredit ? TX_TYPE_MAP.received : TX_TYPE_MAP.transfer;
  return TX_TYPE_MAP.transfer;
};

const BANK_DESTINATION_TYPES = ["COMPRA", "PAGO", "PAGO_SERVICIO", "PRODUCTO"];

const getCounterpart = (item, isCredit) => {
  const acc = isCredit ? item.fromAccount : item.toAccount;
  const name = acc?.holderName || acc?.ownerName || acc?.name || acc?.fullName || null;
  const accountNumber = acc?.accountNumber ? String(acc.accountNumber) : null;
  return { name, accountNumber };
};

// Texto de respaldo cuando no hay cuenta/nombre asociado al movimiento.
const getFallbackLabel = (item, isCredit) => {
  if (!isCredit && BANK_DESTINATION_TYPES.includes(item.type)) return "KinalBank";
  return isCredit ? "Origen desconocido" : "Destino desconocido";
};

export const TransactionItem = ({ item, myAccountIds = [], onPress }) => {
  const credit    = isCreditTx(item, myAccountIds);
  const meta      = getMeta(item, credit);
  const amount    = formatAmount(item, myAccountIds);
  const isPending = item.status === "pending";

  const { name, accountNumber } = getCounterpart(item, credit);
  const maskedAccount = accountNumber ? `Cuenta •••••• ${accountNumber.slice(-4)}` : null;
  const mainLabel      = name || maskedAccount || getFallbackLabel(item, credit);
  const showSubAccount = Boolean(name && maskedAccount);

  return (
    <TouchableOpacity
      style={styles.txItem}
      activeOpacity={0.75}
      onPress={() => onPress?.(item)}
    >
      <View style={[styles.txAccentBar, { backgroundColor: meta.color }]} />

      <View>
        <View style={[styles.txIconRing, { backgroundColor: meta.bg }]}>
          <View style={styles.txIcon}>
            <Ionicons name={meta.iconName} size={20} color={meta.color} />
          </View>
        </View>
        <View
          style={[
            styles.txDirBadge,
            { backgroundColor: credit ? COLORS.success : COLORS.danger },
          ]}
        >
          <Ionicons name={credit ? "arrow-down" : "arrow-up"} size={9} color="#fff" />
        </View>
      </View>

      <View style={styles.txInfo}>
        <Text style={styles.txType} numberOfLines={1}>
          {item.description || meta.label}
        </Text>

        {/* recuadro blanco: nombre + número de cuenta de a quién se pagó / de quién vino */}
        <View style={styles.txCounterpartBox}>
          <View style={styles.txCounterpartTextWrap}>
            <Text style={styles.txCounterpartName} numberOfLines={1}>
              {credit ? "De: " : "Para: "}
              {mainLabel}
            </Text>
            {showSubAccount && (
              <Text style={styles.txCounterpartAccount} numberOfLines={1}>
                {maskedAccount}
              </Text>
            )}
          </View>
        </View>

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

/* ------------------------------------------------------------------ */
/*  Modal de detalle de transacción (bottom sheet)                     */
/* ------------------------------------------------------------------ */
const DetailRow = ({ label, value }) => (
  <View style={styles.modalDetailRow}>
    <Text style={styles.modalDetailLabel}>{label}</Text>
    <Text style={styles.modalDetailValue} numberOfLines={1}>{value}</Text>
  </View>
);

export const TransactionDetailModal = ({ visible, transaction, myAccountIds = [], onClose }) => {
  if (!transaction) return null;

  const credit    = isCreditTx(transaction, myAccountIds);
  const meta      = getMeta(transaction, credit);
  const amount    = formatAmount(transaction, myAccountIds);
  const isPending = transaction.status === "pending";

  const { name, accountNumber } = getCounterpart(transaction, credit);
  const maskedAccount = accountNumber ? `Cuenta •••••• ${accountNumber.slice(-4)}` : null;
  const mainLabel = name || maskedAccount || getFallbackLabel(transaction, credit);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable onPress={onClose} style={styles.modalBackdrop} />

      <View style={styles.modalSheet}>
        <View style={styles.modalHandle} />

        <View style={styles.modalHeader}>
          <View style={[styles.txIconRing, { backgroundColor: meta.bg }]}>
            <Ionicons name={meta.iconName} size={22} color={meta.color} />
          </View>
          <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
            <Ionicons name="close" size={20} color={COLORS.textMuted} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.modalAmount, amount.isCredit ? styles.amountCredit : styles.amountDebit]}>
          {amount.text}
        </Text>
        <Text style={styles.modalType}>{transaction.description || meta.label}</Text>

        <View
          style={[
            styles.badge,
            isPending ? styles.badgePending : styles.badgeDone,
            { alignSelf: "center", marginTop: 8 },
          ]}
        >
          <View style={[styles.badgeDot, { backgroundColor: isPending ? COLORS.warning : COLORS.success }]} />
          <Text style={[styles.badgeText, isPending ? styles.badgeTextPending : styles.badgeTextDone]}>
            {isPending ? "Pendiente" : "Completado"}
          </Text>
        </View>

        <ScrollView style={styles.modalDetails}>
          <DetailRow label={credit ? "De" : "Para"} value={mainLabel} />
          {maskedAccount && name && <DetailRow label="Cuenta" value={maskedAccount} />}
          <DetailRow label="Fecha" value={new Date(transaction.createdAt).toLocaleString("es-GT")} />
          <DetailRow label="Tipo" value={transaction.type} />
          {transaction._id && <DetailRow label="No. de referencia" value={transaction._id} />}
        </ScrollView>
      </View>
    </Modal>
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

/* ------------------------------------------------------------------ */
/*  Header con degradado azul (igual estilo que "Mis Cuentas")          */
/* ------------------------------------------------------------------ */
export const TransactionHeader = ({ totals, balanceDisplay, totalRecords, onBack }) => (
  <LinearGradient
    colors={HEADER_GRADIENT}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.header}
  >
    <View style={styles.headerDecoOne} pointerEvents="none" />
    <View style={styles.headerDecoTwo} pointerEvents="none" />

    <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
      <Ionicons name="arrow-back" size={18} color="#fff" />
    </TouchableOpacity>

    <View style={styles.headerTop}>
      <Text style={styles.headerTitle}>
        Mis{"\n"}
        <Text style={styles.headerTitleAccent}>Movimientos</Text>
      </Text>
    </View>

    <View style={styles.balanceRow}>
      <Text style={styles.balanceLabel}>SALDO ACTUAL</Text>
      <Text style={styles.balanceAmount}>
        {balanceDisplay}
      </Text>
      <Text style={styles.balanceSub}>
        {totalRecords} {totalRecords === 1 ? "transacción" : "transacciones"} en total
      </Text>
    </View>

    <View style={styles.pillsRow}>
      <View style={styles.pill}>
        <View style={[styles.pillIconWrap, styles.pillIconWrapIn]}>
          <Ionicons name="arrow-down-outline" size={16} color={COLORS.success} />
        </View>
        <View>
          <Text style={styles.pillLabel}>ENTRADAS</Text>
          {totals.entradasList.map((line, i) => (
            <Text key={i} style={styles.pillAmount}>{line}</Text>
          ))}
        </View>
      </View>

      <View style={styles.pill}>
        <View style={[styles.pillIconWrap, styles.pillIconWrapOut]}>
          <Ionicons name="arrow-up-outline" size={16} color={COLORS.danger} />
        </View>
        <View>
          <Text style={styles.pillLabel}>SALIDAS</Text>
          {totals.salidasList.map((line, i) => (
            <Text key={i} style={styles.pillAmount}>{line}</Text>
          ))}
        </View>
      </View>
    </View>
  </LinearGradient>
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