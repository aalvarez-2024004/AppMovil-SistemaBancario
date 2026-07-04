import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    ScrollView,
    Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, styles } from "../constants/Products";

/*
=================================
        MARKETPLACE HEADER
=================================
*/
export const MarketplaceHeader = ({ totalRegistros, totalProductos, totalServicios }) => {
    return (
        <View style={styles.marketplaceWrap}>
            <LinearGradient
                colors={[COLORS.navy, COLORS.navyLight, COLORS.accent]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1.1 }}
                style={styles.marketplaceHeader}
            >
                {/* capas decorativas */}
                <View style={styles.mktDecoRingOne} pointerEvents="none" />
                <View style={styles.mktDecoCircleOne} pointerEvents="none" />
                <View style={styles.mktDecoCircleTwo} pointerEvents="none" />

                <View style={styles.mktBadge}>
                    <View style={styles.mktBadgeIconWrap}>
                        <Ionicons name="sparkles" size={12} color={COLORS.navy} />
                    </View>
                    <Text style={styles.mktBadgeText}>KINALBANK MARKETPLACE</Text>
                </View>

                <Text style={styles.marketplaceTitle}>
                    Productos{"\n"}
                    <Text style={styles.marketplaceAccent}>& Servicios</Text>
                </Text>

                <Text style={styles.marketplaceSubtitle}>
                    Crece y administra tu dinero con soluciones diseñadas para ti.
                </Text>
            </LinearGradient>

            {/* tarjeta flotante de estadísticas, superpuesta al header */}
            <View style={styles.mktStatsFloating}>
                <StatColumn
                    icon="sparkles-outline"
                    tint="#E8F1FF"
                    color={COLORS.primary}
                    value={totalRegistros}
                    label="Registros"
                />
                <View style={styles.mktStatDivider} />
                <StatColumn
                    icon="cube-outline"
                    tint="#E1F5EE"
                    color="#0F6E56"
                    value={totalProductos}
                    label="Productos"
                />
                <View style={styles.mktStatDivider} />
                <StatColumn
                    icon="flash-outline"
                    tint="#FAEEDA"
                    color="#854F0B"
                    value={totalServicios}
                    label="Servicios"
                />
            </View>
        </View>
    );
};

const StatColumn = ({ icon, tint, color, value, label }) => (
    <View style={styles.mktStatColumn}>
        <View style={[styles.mktStatIconWrap, { backgroundColor: tint }]}>
            <Ionicons name={icon} size={16} color={color} />
        </View>
        <Text style={styles.mktStatValue}>{value}</Text>
        <Text style={styles.mktStatLabel}>{label}</Text>
    </View>
);

/*
=================================
        FILTER TABS
=================================
*/
export const FilterTabs = ({
    activeFilter,
    onPress
}) => {

    const tabs = [
        { id: "TODOS", label: "Todos" },
        { id: "FREE", label: "Gratis" },
        { id: "PRODUCTO", label: "Productos" },
        { id: "SERVICIO", label: "Servicios" },
    ];

    return (
        <View style={styles.filterContainer}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab.id}
                    onPress={() => onPress(tab.id)}
                    style={[
                        styles.filterTab,
                        activeFilter === tab.id && styles.filterTabActive,
                    ]}
                >
                    <Text
                        style={[
                            styles.filterText,
                            activeFilter === tab.id && styles.filterTextActive,
                        ]}
                    >
                        {tab.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

/*
=================================
        PRODUCT CARD
=================================
*/
export const ProductCard = ({ product, onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onPress(product)}
            style={styles.productCard}
        >
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.productTitle}>{product.name}</Text>
                    <Text style={styles.productDescription}>
                        {product.description || "Producto disponible en KinalBank"}
                    </Text>
                </View>

                <Ionicons
                    name={product.type === "SERVICIO" ? "briefcase-outline" : "cube-outline"}
                    size={28}
                    color={COLORS.primary}
                />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 15 }}>
                <Text style={styles.productPrice}>
                    {product.pointsCost ? `${product.pointsCost} pts` : "Disponible"}
                </Text>

                <View style={{ backgroundColor: "#E8F1FF", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 }}>
                    <Text style={{ color: COLORS.primary, fontWeight: "700", fontSize: 12 }}>
                        Ver detalle
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

/*
=================================
        EMPTY STATE
=================================
*/
export const ProductsEmptyState = () => {
    return (
        <View style={styles.emptyState}>
            <Ionicons name="cube-outline" size={55} color={COLORS.textMuted} />
            <Text style={styles.emptyTitle}>No hay productos disponibles</Text>
            <Text style={styles.emptySubtitle}>
                Intenta cambiar el filtro o revisa nuevamente más tarde.
            </Text>
        </View>
    );
};

/*
=================================
        SUCCESS STRIP
=================================
*/
export const SuccessStrip = ({ lastSuccess, onDismiss }) => {
    if (!lastSuccess) return null;

    // Tolerante: el backend a veces manda un string, a veces el objeto completo
    // { type, message, pointsEarned, newBalance }. Siempre extraemos texto plano.
    const message =
        typeof lastSuccess === "string"
            ? lastSuccess
            : lastSuccess?.message || "Operación realizada con éxito";

    const pointsEarned =
        typeof lastSuccess === "object" ? lastSuccess?.pointsEarned : null;

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onDismiss} style={styles.successStrip}>
            <Text style={styles.successText}>
                ✓ {message}
                {pointsEarned ? ` · +${pointsEarned} pts` : ""}
            </Text>
        </TouchableOpacity>
    );
};

/*
=================================
        PURCHASE MODAL
=================================
*/
export const ProductPurchaseModal = ({
    visible,
    product,
    accounts,
    clientPoints,
    isSubmitting,
    error,
    onBuy,
    onRedeem,
    onBuyDiscount,
    onClose,
}) => {
    const [selectedAccountId, setSelectedAccountId] = useState(null);

    // Reinicia la cuenta seleccionada cada vez que se abre un producto distinto
    useEffect(() => {
        setSelectedAccountId(null);
    }, [product?._id, visible]);

    if (!product) return null;

    const isFree = product.clientCanRedeem;
    const hasAccounts = accounts?.length > 0;

    const handleContinue = () => {
        if (isFree) {
            onRedeem(product._id);
        } else {
            onBuy(product._id, selectedAccountId);
        }
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <Pressable onPress={onClose} style={styles.modalBackdrop} />

            <View style={styles.modalSheet}>
                <View style={styles.modalHandle} />

                <View style={styles.modalHeaderRow}>
                    <View style={styles.modalIconRing}>
                        <Ionicons
                            name={product.type === "SERVICIO" ? "briefcase-outline" : "cube-outline"}
                            size={22}
                            color={COLORS.primary}
                        />
                    </View>
                    <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
                        <Ionicons name="close" size={20} color={COLORS.textMuted} />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.modalTitle}>{product.name}</Text>
                    <Text style={styles.modalDescription}>
                        {product.description || "Realiza tu operación desde KinalBank"}
                    </Text>

                    {!!product.pointsCost && (
                        <View style={styles.modalPointsBadge}>
                            <Ionicons name="sparkles" size={14} color={COLORS.primary} />
                            <Text style={styles.modalPointsText}>{product.pointsCost} puntos</Text>
                        </View>
                    )}

                    {hasAccounts && !isFree && (
                        <>
                            <Text style={styles.modalSectionLabel}>Selecciona una cuenta</Text>

                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingVertical: 4 }}
                            >
                                {accounts.map((account) => {
                                    const accId = account._id || account.id || account.accountId;
                                    const isSelected = selectedAccountId === accId;
                                    return (
                                        <TouchableOpacity
                                            key={accId}
                                            onPress={() => setSelectedAccountId(accId)}
                                            activeOpacity={0.8}
                                            style={[
                                                styles.accountChip,
                                                isSelected && styles.accountChipActive,
                                            ]}
                                        >
                                            <Ionicons
                                                name={isSelected ? "checkmark-circle" : "card-outline"}
                                                size={16}
                                                color={isSelected ? COLORS.primary : COLORS.textMuted}
                                            />
                                            <Text
                                                style={[
                                                    styles.accountChipText,
                                                    isSelected && styles.accountChipTextActive,
                                                ]}
                                            >
                                                {account.accountNumber || "Cuenta"}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </ScrollView>
                        </>
                    )}

                    {!!error && (
                        <View style={styles.modalErrorBox}>
                            <Ionicons name="alert-circle-outline" size={16} color={COLORS.danger} />
                            <Text style={styles.modalErrorText}>{error}</Text>
                        </View>
                    )}
                </ScrollView>

                <TouchableOpacity
                    disabled={isSubmitting}
                    onPress={handleContinue}
                    activeOpacity={0.85}
                    style={{ marginTop: 20 }}
                >
                    <LinearGradient
                        colors={[COLORS.primary, COLORS.accent]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.modalContinueBtn}
                    >
                        <Text style={styles.modalContinueText}>
                            {isSubmitting ? "Procesando..." : "Continuar"}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};