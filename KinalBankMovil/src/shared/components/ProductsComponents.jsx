import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    ScrollView,
    TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, styles } from "../constants/Products";

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
        {
            id:"TODOS",
            label:"Todos"
        },
        {
            id:"FREE",
            label:"Gratis"
        },
        {
            id:"PRODUCTO",
            label:"Productos"
        },
        {
            id:"SERVICIO",
            label:"Servicios"
        },
    ];

    return (
        <View style={styles.filterContainer}>
            {
                tabs.map(tab => (
                    <TouchableOpacity
                        key={tab.id}
                        onPress={()=>onPress(tab.id)}
                        style={[
                            styles.filterTab,
                            activeFilter===tab.id &&
                            styles.filterTabActive
                        ]}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                activeFilter===tab.id &&
                                styles.filterTextActive
                            ]}
                        >
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
};

/*
=================================
        PRODUCT CARD
=================================
*/
export const ProductCard = ({
    product,
    onPress
}) => {

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={()=>onPress(product)}
            style={styles.productCard}
        >
            <View
                style={{
                    flexDirection:"row",
                    justifyContent:"space-between",
                    alignItems:"center"
                }}
            >
                <View
                    style={{
                        flex:1
                    }}
                >
                    <Text style={styles.productTitle}>
                        {product.name}
                    </Text>

                    <Text style={styles.productDescription}>
                        {
                            product.description ||
                            "Producto disponible en KinalBank"
                        }
                    </Text>
                </View>

                <Ionicons
                    name={
                        product.type==="SERVICIO"
                        ? "briefcase-outline"
                        : "cube-outline"
                    }
                    size={28}
                    color={COLORS.primary}
                />
            </View>

            <View
                style={{
                    flexDirection:"row",
                    justifyContent:"space-between",
                    alignItems:"center",
                    marginTop:15
                }}
            >

                <Text style={styles.productPrice}>
                    {
                        product.pointsCost
                        ? `${product.pointsCost} pts`
                        : "Disponible"
                    }
                </Text>

                <View
                    style={{
                        backgroundColor:"#E8F1FF",
                        paddingHorizontal:12,
                        paddingVertical:6,
                        borderRadius:20
                    }}
                >
                    <Text
                        style={{
                            color:COLORS.primary,
                            fontWeight:"700",
                            fontSize:12
                        }}
                    >
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
export const ProductsEmptyState = ()=>{

    return (
        <View style={styles.emptyState}>
            <Ionicons
                name="cube-outline"
                size={55}
                color={COLORS.textMuted}
            />

            <Text style={styles.emptyTitle}>
                No hay productos disponibles
            </Text>

            <Text style={styles.emptySubtitle}>
                Intenta cambiar el filtro
                o revisa nuevamente más tarde.
            </Text>
        </View>
    );
};

/*
=================================
        SUCCESS STRIP
=================================
*/
export const SuccessStrip = ({
    lastSuccess,
    onDismiss
})=>{

    if(!lastSuccess)
        return null;

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onDismiss}
            style={styles.successStrip}
        >
            <Text style={styles.successText}>
                ✓ {lastSuccess}
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
    onClose
})=>{

    const [selectedAccount,setSelectedAccount] =
        useState(null);

    if(!product)
        return null;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
        >
            <View style={styles.modalOverlay}>

                <View style={styles.modalContainer}>

                    <TouchableOpacity
                        onPress={onClose}
                        style={{
                            alignSelf:"flex-end"
                        }}
                    >
                        <Ionicons
                            name="close"
                            size={25}
                            color={COLORS.text}
                        />
                    </TouchableOpacity>

                    <Text style={styles.modalTitle}>
                        {product.name}
                    </Text>

                    <Text
                        style={{
                            marginTop:10,
                            color:COLORS.textSecondary
                        }}
                    >
                        {
                            product.description
                            ||
                            "Realiza tu operación desde KinalBank"
                        }
                    </Text>

                    {
                        product.pointsCost &&
                        <Text
                            style={{
                                marginTop:15,
                                fontWeight:"800",
                                fontSize:20,
                                color:COLORS.primary
                            }}
                        >
                            {product.pointsCost} puntos
                        </Text>
                    }

                    {
                        accounts?.length > 0 &&
                        <>
                        <Text
                            style={{
                                marginTop:20,
                                fontWeight:"700"
                            }}
                        >
                            Selecciona una cuenta
                        </Text>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{
                                marginTop:10
                            }}
                        >
                        {
                            accounts.map(account=>(
                                <TouchableOpacity
                                    key={
                                        account.id ||
                                        account.accountId
                                    }
                                    onPress={()=>setSelectedAccount(account)}
                                    style={{
                                        padding:12,
                                        borderRadius:15,
                                        marginRight:10,
                                        backgroundColor:
                                        selectedAccount===account
                                        ?
                                        "#DCEBFF"
                                        :
                                        "#F1F5F9"

                                    }}
                                >
                                    <Text>
                                        {
                                            account.accountNumber
                                            ||
                                            "Cuenta"
                                        }
                                    </Text>
                                </TouchableOpacity>
                            ))
                        }

                        </ScrollView>
                        </>
                    }

                    {
                        error &&
                        <Text
                            style={{
                                color:COLORS.danger,
                                marginTop:15
                            }}
                        >
                            {error}
                        </Text>
                    }

                    <TouchableOpacity
                        disabled={isSubmitting}
                        onPress={()=>{
                            if(product.clientCanRedeem)
                                onRedeem(product.id);
                            else
                                onBuy(
                                    product.id,
                                    selectedAccount?.id
                                );
                        }}
                        style={{
                            marginTop:25,
                            backgroundColor:COLORS.primary,
                            padding:15,
                            borderRadius:18,
                            alignItems:"center"
                        }}
                    >
                        <Text
                            style={{
                                color:"#fff",
                                fontWeight:"800"
                            }}
                        >
                            {
                                isSubmitting
                                ?
                                "Procesando..."
                                :
                                "Continuar"
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};