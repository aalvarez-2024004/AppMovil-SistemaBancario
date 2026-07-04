import { useEffect, useState, useCallback } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    StatusBar,
    ActivityIndicator,
    TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../../../shared/store/useAuthStore";
import { useProductStore } from "../../../shared/store/useProductStore";
import { getMyAccountsRequest } from "../../../shared/api/bankClient";
import { styles, COLORS } from "../../../shared/constants/Products";

import {
    FilterTabs,
    ProductCard,
    ProductsEmptyState,
    SuccessStrip,
    ProductPurchaseModal,
    MarketplaceHeader,
} from "../../../shared/components/ProductsComponents";

const ProductsScreen = () => {
    const navigation = useNavigation();
    const token = useAuthStore((state) => state.token);
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

    const [refreshing, setRefreshing] = useState(false);
    const [activeFilter, setActiveFilter] = useState("TODOS");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [search, setSearch] = useState("");

    const load = useCallback(async () => {
        if (!token) return;
        await fetchProducts(token);
        try {
            const response = await getMyAccountsRequest(token);
            const data = Array.isArray(response.data)
                ? response.data
                : response.data?.accounts ??
                  response.data?.data ??
                  [];
            setAccounts(data);
        } catch (error) {
            console.log(
                "Error cargando cuentas:",
                error
            );
        }
    }, [token]);

    useEffect(() => {
        load();
    }, [load]);


    const onRefresh = async () => {
        setRefreshing(true);
        await load();
        setRefreshing(false);
    };

    const openModal = (product) => {
        resetSubmitError();
        setSelectedProduct(product);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        resetSubmitError();
    };

    const handleBuy = async (
        productId,
        accountId
    ) => {
        const result =
            await buyProduct(
                token,
                productId,
                accountId
            );

        if(result.success){
            setModalVisible(false);
            fetchProducts(token);
        }
    };

    const handleRedeem = async (
        productId
    ) => {
        const result =
            await redeemProduct(
                token,
                productId
            );

        if(result.success){
            setModalVisible(false);
            fetchProducts(token);
        }
    };

    const handleBuyDiscount = async (
        productId,
        accountId
    ) => {
        const result =
            await buyWithDiscount(
                token,
                productId,
                accountId
            );

        if(result.success){
            setModalVisible(false);
            fetchProducts(token);
        }
    };

    const filteredProducts =
        products.filter((product)=>{

            const matchesSearch =
                product.name
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                );

            if(!matchesSearch)
                return false;

            if(activeFilter==="TODOS")
                return true;

            if(activeFilter==="FREE")
                return product.clientCanRedeem;

            if(activeFilter==="PRODUCTO")
                return product.type==="PRODUCTO";

            if(activeFilter==="SERVICIO")
                return product.type==="SERVICIO";
            return true;
        });

    const productCount =
        products.filter(
            p=>p.type==="PRODUCTO"
        ).length;

    const serviceCount =
        products.filter(
            p=>p.type==="SERVICIO"
        ).length;

    const freeCount =
        products.filter(
            p=>p.clientCanRedeem
        ).length;

    return (
        <View style={styles.container}>

            <StatusBar
                barStyle="light-content"
                backgroundColor={COLORS.navy}
            />

            <MarketplaceHeader
                totalRegistros={products.length}
                totalProductos={productCount}
                totalServicios={serviceCount}
            />

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={COLORS.accent}
                    />
                }
            >
                <FilterTabs
                    activeFilter={activeFilter}
                    onPress={setActiveFilter}
                />

                <View style={styles.searchContainer}>
                    <Ionicons
                        name="search"
                        size={20}
                        color={COLORS.textMuted}
                    />

                    <TextInput
                        value={search}
                        onChangeText={setSearch}
                        placeholder="Buscar productos o servicios..."
                        placeholderTextColor={
                            COLORS.textMuted
                        }
                        style={styles.searchInput}
                    />
                </View>
                <SuccessStrip
                    lastSuccess={lastSuccess}
                    onDismiss={clearLastSuccess}
                />
                <Text style={styles.sectionLabel}>
                    {activeFilter==="FREE"
                        ? "Canjeables con tus puntos"
                        : activeFilter==="PRODUCTO"
                        ? "Productos"
                        : activeFilter==="SERVICIO"
                        ? "Servicios"
                        : "Todos los productos"
                    }
                </Text>

                {
                    isLoading &&
                    products.length===0 ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator
                                size="large"
                                color={COLORS.accent}
                            />
                            <Text style={styles.loadingText}>
                                Cargando productos...
                            </Text>
                        </View>
                    )
                    :
                    error ? (
                        <View style={styles.emptyState}>
                            <Ionicons
                                name="wifi-outline"
                                size={35}
                                color={COLORS.textMuted}
                            />
                            <Text style={styles.emptyTitle}>
                                Sin conexión
                            </Text>
                            <Text style={styles.emptySubtitle}>
                                {error}
                            </Text>
                            <TouchableOpacity
                                onPress={load}
                            >
                                <Text style={styles.retryText}>
                                    Reintentar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                    :
                    filteredProducts.length===0 ? (
                        <ProductsEmptyState />
                    )
                    :
                    filteredProducts.map(product=>(
                        <ProductCard
                            key={product._id}
                            product={product}
                            onPress={openModal}
                        />
                    ))
                }

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