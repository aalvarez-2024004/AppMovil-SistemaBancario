import { useEffect, useState, useCallback } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    StatusBar,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useAuthStore }    from "../../../shared/store/useAuthStore";
import { useProductStore } from "../../../shared/store/useProductStore";
import { getMyAccountsRequest } from "../../../shared/api/bankClient";

import { styles, COLORS } from "../../../shared/constants/Products";
import {
    PointsBanner,
    FilterTabs,
    ProductCard,
    ProductsEmptyState,
    SuccessStrip,
    ProductPurchaseModal,
} from "../../../shared/components/ProductsComponents";

const ProductsScreen = () => {
    const navigation = useNavigation();
    const token      = useAuthStore((s) => s.token);

    const {
        products,
        clientPoints,
        isLoading,
        error,
        isSubmitting,
        submitError,
        lastSuccess,
        fetchProducts,
        buyProduct,
        redeemProduct,
        buyWithDiscount,
        resetSubmitError,
        clearLastSuccess,
    } = useProductStore();

    const [refreshing,     setRefreshing]     = useState(false);
    const [activeFilter,   setActiveFilter]   = useState("TODOS");
    const [selectedProduct, setSelected]      = useState(null);
    const [modalVisible,   setModalVisible]   = useState(false);
    const [accounts,       setAccounts]       = useState([]);

    const load = useCallback(async () => {
        if (!token) return;
        await fetchProducts(token);

        try {
            const res  = await getMyAccountsRequest(token);
            const data = Array.isArray(res.data)
                ? res.data
                : res.data?.accounts ?? res.data?.data ?? [];
            setAccounts(data);
        } catch (_) 
    }, [token]);

    useEffect(() => { load(); }, [load]);

    const onRefresh = async () => {
        setRefreshing(true);
        await load();
        setRefreshing(false);
    };

    const openModal = (product) => {
        resetSubmitError();
        setSelected(product);
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
        resetSubmitError();
    };

    const handleBuy = async (productId, accountId) => {
        const res = await buyProduct(token, productId, accountId);
        if (res.success) {
            setModalVisible(false);
            fetchProducts(token); 
        }
    };

    const handleRedeem = async (productId) => {
        const res = await redeemProduct(token, productId);
        if (res.success) {
            setModalVisible(false);
            fetchProducts(token);
        }
    };

    const handleBuyDiscount = async (productId, accountId) => {
        const res = await buyWithDiscount(token, productId, accountId);
        if (res.success) {
            setModalVisible(false);
            fetchProducts(token);
        }
    };

    const filtered = products.filter((p) => {
        if (activeFilter === "TODOS")    return true;
        if (activeFilter === "FREE")     return p.clientCanRedeem;
        if (activeFilter === "PRODUCTO") return p.type === "PRODUCTO";
        if (activeFilter === "SERVICIO") return p.type === "SERVICIO";
        return true;
    });

    const freeCount = products.filter((p) => p.clientCanRedeem).length;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

            <View style={styles.hero}>
                <Text style={styles.heroLabel}>KinalBank</Text>
                <Text style={styles.heroTitle}>
                    Productos{"\\n"}
                    <Text style={styles.heroTitleAccent}>& Servicios</Text>
                </Text>
                <Text style={styles.heroSubtitle}>
                    {products.length} disponible{products.length !== 1 ? "s" : ""}
                    {freeCount > 0 ? ` · ${freeCount} canjeables gratis` : ""}
                </Text>

                <PointsBanner points={clientPoints} />
            </View>

            <FilterTabs activeFilter={activeFilter} onPress={setActiveFilter} />

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.scrollContentInner}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={COLORS.accent}
                        colors={[COLORS.accent]}
                    />
                }
            >
                <SuccessStrip lastSuccess={lastSuccess} onDismiss={clearLastSuccess} />

                <Text style={styles.sectionLabel}>
                    {activeFilter === "FREE"
                        ? "Canjeables con tus puntos"
                        : activeFilter === "TODOS"
                        ? "Todos los productos"
                        : activeFilter === "PRODUCTO"
                        ? "Productos"
                        : "Servicios"}
                </Text>

                {isLoading && products.length === 0 ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={COLORS.accent} />
                        <Text style={styles.loadingText}>Cargando productos...</Text>
                    </View>
                ) : error ? (
                    <View style={styles.emptyState}>
                        <View style={styles.emptyIcon}>
                            <Ionicons name="wifi-outline" size={28} color={COLORS.textMuted} />
                        </View>
                        <Text style={styles.emptyTitle}>Sin conexión</Text>
                        <Text style={styles.emptySubtitle}>{error}</Text>
                        <TouchableOpacity onPress={load} style={{ marginTop: 12 }}>
                            <Text style={{ color: COLORS.accent, fontWeight: "700" }}>Reintentar</Text>
                        </TouchableOpacity>
                    </View>
                ) : filtered.length === 0 ? (
                    <ProductsEmptyState />
                ) : (
                    filtered.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onPress={openModal}
                        />
                    ))
                )}
            </ScrollView>

            <ProductPurchaseModal
                visible={modalVisible}
                product={selectedProduct}
                accounts={accounts}
                clientPoints={clientPoints}
                isSubmitting={isSubmitting}
                error={submitError}
                onBuy={handleBuy}
                onRedeem={handleRedeem}
                onBuyDiscount={handleBuyDiscount}
                onClose={closeModal}
            />
        </View>
    );
};

export default ProductsScreen;