import { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles, COLORS, CATEGORY_ICONS, CATEGORY_LABELS } from "../constants/Products";

export const formatCurrency = (amount) =>
    `Q${Number(amount ?? 0).toLocaleString("es-GT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// modo de compra disponible para el cliente
export const getProductMode = (product) => {
    if (product.clientCanRedeem)    return "FREE";      // canje total con puntos
    if (product.clientHasDiscount)  return "DISCOUNT";  // descuento parcial
    return "PAID";                                       // solo dinero
};

export const PointsBanner = ({ points }) => (
    <View style={styles.pointsBanner}>
        <View style={styles.pointsIconBox}>
            <Ionicons name="star" size={22} color="#FCD34D" />
        </View>
        <View style={{ flex: 1 }}>
            <Text style={styles.pointsBannerTitle}>Mis puntos KinalBank</Text>
            <Text style={styles.pointsBannerValue}>{points} pts</Text>
            <Text style={styles.pointsBannerSub}>
                {points === 0
                    ? "Compra productos para acumular"
                    : "Úsalos para obtener beneficios gratis"}
            </Text>
        </View>
    </View>
);

export const FilterTabs = ({ activeFilter, onPress }) => {
    const tabs = [
        { key: "TODOS", label: "Todos" },
        { key: "FREE",  label: "Gratis" },
        { key: "PRODUCTO", label: "Productos" },
        { key: "SERVICIO", label: "Servicios" },
    ];

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
        >
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab.key}
                    style={[styles.filterTab, activeFilter === tab.key && styles.filterTabActive]}
                    onPress={() => onPress(tab.key)}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.filterTabText, activeFilter === tab.key && styles.filterTabTextActive]}>
                        {tab.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export const ProductCard = ({ product, onPress }) => {
    const mode     = getProductMode(product);
    const iconName = CATEGORY_ICONS[product.category] ?? "grid-outline";
    const catLabel = CATEGORY_LABELS[product.category] ?? "Otros";

    const modeConfig = {
        FREE:     { color: COLORS.free,     bg: COLORS.freeLight,     label: "GRATIS",    icon: "gift-outline" },
        DISCOUNT: { color: COLORS.discount, bg: COLORS.discountLight, label: "DESCUENTO", icon: "pricetag-outline" },
        PAID:     { color: COLORS.paid,     bg: COLORS.paidLight,     label: "PAGO",      icon: "card-outline" },
    }[mode];

    return (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => onPress(product)}
            activeOpacity={0.85}
        >
            <View style={styles.productCardTop}>
                <View style={[styles.categoryIconBox, { backgroundColor: modeConfig.bg }]}>
                    <Ionicons name={iconName} size={22} color={modeConfig.color} />
                </View>

                <View style={styles.productMeta}>
                    <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
                    <Text style={styles.productDesc} numberOfLines={2}>{product.description}</Text>

                    <View style={{ flexDirection: "row", gap: 6, marginTop: 6 }}>
                        <View style={[styles.typeBadge, { backgroundColor: modeConfig.bg }]}>
                            <Text style={[styles.typeBadgeText, { color: modeConfig.color }]}>
                                {product.type}
                            </Text>
                        </View>
                        <View style={[styles.typeBadge, { backgroundColor: COLORS.bgCardAlt }]}>
                            <Text style={[styles.typeBadgeText, { color: COLORS.accent }]}>
                                {catLabel}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.productCardBottom}>
                <View style={styles.priceBlock}>
                    {mode === "FREE" ? (
                        <>
                            <Text style={styles.priceFree}>GRATIS</Text>
                            <View style={styles.pointsTag}>
                                <Ionicons name="star" size={12} color={COLORS.accent} />
                                <Text style={styles.pointsTagText}>
                                    {product.pointsRequired} puntos
                                </Text>
                            </View>
                        </>
                    ) : mode === "DISCOUNT" ? (
                        <>
                            <Text style={styles.price}>
                                {formatCurrency(product.price * (1 - product.discountPercentage / 100))}
                            </Text>
                            <Text style={styles.priceOriginal}>{formatCurrency(product.price)}</Text>
                        </>
                    ) : (
                        <Text style={styles.price}>{formatCurrency(product.price)}</Text>
                    )}
                </View>

                <TouchableOpacity
                    style={[styles.cardActionBtn, { backgroundColor: modeConfig.color }]}
                    onPress={() => onPress(product)}
                    activeOpacity={0.85}
                >
                    <Ionicons name={modeConfig.icon} size={14} color="#FFF" />
                    <Text style={styles.cardActionText}>Ver más</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export const ProductsEmptyState = () => (
    <View style={styles.emptyState}>
        <View style={styles.emptyIcon}>
            <Ionicons name="storefront-outline" size={28} color={COLORS.textMuted} />
        </View>
        <Text style={styles.emptyTitle}>Sin productos disponibles</Text>
        <Text style={styles.emptySubtitle}>
            No hay productos o servicios disponibles en este momento.
        </Text>
    </View>
);

export const SuccessStrip = ({ lastSuccess, onDismiss }) => {
    if (!lastSuccess) return null;

    return (
        <TouchableOpacity style={styles.successStrip} onPress={onDismiss} activeOpacity={0.8}>
            <Ionicons name="checkmark-circle" size={20} color={COLORS.free} />
            <Text style={styles.successStripText}>{lastSuccess.message}</Text>
            <Ionicons name="close" size={16} color={COLORS.free} />
        </TouchableOpacity>
    );
};

export const ProductPurchaseModal = ({
    visible,
    product,
    accounts = [],
    clientPoints = 0,
    isSubmitting,
    error,
    onBuy,
    onRedeem,
    onBuyDiscount,
    onClose,
}) => {
    const [selectedMode, setSelectedMode] = useState(null);
    const [selectedAccount, setSelectedAccount] = useState(null);

    if (!product) return null;

    const canRedeem   = product.redeemable && product.pointsRequired > 0 && clientPoints >= product.pointsRequired;
    const canDiscount = product.redeemable && product.discountPercentage > 0 && clientPoints > 0 && !canRedeem;
    const modeOptions = [];

    if (canRedeem) {
        modeOptions.push({
            key: "REDEEM",
            icon: "gift",
            iconBg: COLORS.freeLight,
            iconColor: COLORS.free,
            label: "Canjear gratis",
            sub: `Usas ${product.pointsRequired} puntos · Te quedan ${clientPoints - product.pointsRequired} pts`,
        });
    }
    if (canDiscount) {
        const discounted = product.price * (1 - product.discountPercentage / 100);
        modeOptions.push({
            key: "DISCOUNT",
            icon: "pricetag",
            iconBg: COLORS.discountLight,
            iconColor: COLORS.discount,
            label: `${product.discountPercentage}% de descuento`,
            sub: `Pagas ${formatCurrency(discounted)} con tus puntos`,
        });
    }
    modeOptions.push({
        key: "BUY",
        icon: "card",
        iconBg: COLORS.paidLight,
        iconColor: COLORS.paid,
        label: `Pagar ${formatCurrency(product.price)}`,
        sub: `Ganas ${product.pointsPerPurchase} puntos por esta compra`,
    });

    const handleConfirm = () => {
        if (selectedMode === "REDEEM") return onRedeem(product._id);
        if (!selectedAccount) return;
        if (selectedMode === "DISCOUNT") return onBuyDiscount(product._id, selectedAccount);
        return onBuy(product._id, selectedAccount);
    };

    const confirmEnabled =
        selectedMode &&
        (selectedMode === "REDEEM" || selectedAccount);

    const handleClose = () => {
        setSelectedMode(null);
        setSelectedAccount(null);
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
            <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={handleClose}>
                <TouchableOpacity activeOpacity={1} onPress={() => {}}>
                    <View style={styles.modalSheet}>
                        <View style={styles.modalHandle} />

                        <Text style={styles.modalTitle}>{product.name}</Text>
                        <Text style={styles.modalCategory}>
                            {CATEGORY_LABELS[product.category] ?? "Otros"} · {product.type}
                        </Text>
                        <Text style={styles.modalDesc}>{product.description}</Text>

                        {error ? (
                            <View style={[styles.successStrip, {
                                backgroundColor: COLORS.dangerLight,
                                borderColor: COLORS.danger,
                                marginBottom: 12
                            }]}>
                                <Ionicons name="alert-circle" size={18} color={COLORS.danger} />
                                <Text style={[styles.successStripText, { color: COLORS.danger }]}>{error}</Text>
                            </View>
                        ) : null}

                        {/* Opciones de compra */}
                        <Text style={styles.purchaseOptionsTitle}>¿Cómo quieres obtenerlo?</Text>
                        {modeOptions.map((opt) => (
                            <TouchableOpacity
                                key={opt.key}
                                style={[
                                    styles.purchaseOption,
                                    { borderColor: COLORS.border },
                                    selectedMode === opt.key && styles.purchaseOptionSelected,
                                ]}
                                onPress={() => setSelectedMode(opt.key)}
                                activeOpacity={0.8}
                            >
                                <View style={[styles.purchaseOptionIcon, { backgroundColor: opt.iconBg }]}>
                                    <Ionicons name={opt.icon} size={20} color={opt.iconColor} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.purchaseOptionLabel}>{opt.label}</Text>
                                    <Text style={styles.purchaseOptionSub}>{opt.sub}</Text>
                                </View>
                                {selectedMode === opt.key && (
                                    <Ionicons name="checkmark-circle" size={20} color={COLORS.accent} />
                                )}
                            </TouchableOpacity>
                        ))}

                        {selectedMode && selectedMode !== "REDEEM" && accounts.length > 0 && (
                            <>
                                <Text style={styles.accountSelectorLabel}>Cuenta a debitar</Text>
                                {accounts.filter(a => a.status === "ACTIVA").map((acc) => (
                                    <TouchableOpacity
                                        key={acc._id}
                                        style={[
                                            styles.accountOption,
                                            selectedAccount === acc._id && styles.accountOptionSelected,
                                        ]}
                                        onPress={() => setSelectedAccount(acc._id)}
                                        activeOpacity={0.8}
                                    >
                                        <View>
                                            <Text style={styles.accountOptionNumber}>
                                                •••• {acc.accountNumber?.slice(-4)}
                                            </Text>
                                            <Text style={styles.accountOptionBalance}>
                                                {acc.accountType} · {formatCurrency(acc.balance)} {acc.currency}
                                            </Text>
                                        </View>
                                        {selectedAccount === acc._id && (
                                            <Ionicons name="checkmark-circle" size={20} color={COLORS.accent} />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </>
                        )}

                        <TouchableOpacity
                            style={[
                                styles.confirmBtn,
                                { backgroundColor: confirmEnabled ? COLORS.accent : COLORS.border },
                                (!confirmEnabled || isSubmitting) && styles.confirmBtnDisabled,
                            ]}
                            onPress={handleConfirm}
                            disabled={!confirmEnabled || isSubmitting}
                            activeOpacity={0.85}
                        >
                            {isSubmitting ? (
                                <ActivityIndicator size="small" color="#FFFFFF" />
                            ) : (
                                <Text style={styles.confirmBtnText}>
                                    {selectedMode === "REDEEM"
                                        ? "Confirmar canje"
                                        : selectedMode === "DISCOUNT"
                                        ? "Confirmar compra con descuento"
                                        : "Confirmar compra"}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};