import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { styles, COLORS, GRADIENTS } from "../constants/NewTransaction";

const CURRENCY_SYMBOLS = { GTQ: "Q", USD: "$", EUR: "€", GBP: "£", MXN: "MX$" };

const ACCOUNT_TYPE_ICONS = {
    AHORRO: "wallet-outline",
    MONETARIA: "card-outline",
};

export const formatCurrency = (amount, currency = "GTQ") => {
    const symbol = CURRENCY_SYMBOLS[currency] ?? currency;
    return `${symbol} ${Number(amount || 0).toLocaleString("es-GT", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
};

export const maskAccount = (num = "") => {
    const str = String(num);
    return str.length > 4 ? `•••••• ${str.slice(-4)}` : str;
};

// ------------------------------------------------------------
//  NUEVO — indicador de pasos del flujo. steps: array de strings,
//  activeIndex: paso actual (0-based)
// ------------------------------------------------------------
export const StepProgress = ({ steps, activeIndex }) => (
    <View style={styles.stepRow}>
        {steps.map((_, i) => (
            <View key={i} style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                    style={[
                        styles.stepDot,
                        i < activeIndex && styles.stepDotDone,
                        i === activeIndex && styles.stepDotActive,
                    ]}
                />
                {i < steps.length - 1 && <View style={styles.stepConnector} />}
            </View>
        ))}
    </View>
);

export const SourceAccountSelector = ({ accounts, selectedId, onSelect }) => {
    if (!accounts || accounts.length === 0) {
        return (
            <View style={styles.accountOptionEmpty}>
                <Text style={styles.accountOptionEmptyText}>
                    No tienes cuentas activas disponibles para enviar dinero.
                </Text>
            </View>
        );
    }

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.accountsRow}
        >
            {accounts.map((acc) => {
                const id = acc._id || acc.id;
                const selected = id === selectedId;
                const currency = acc.currency || "GTQ";
                const iconName = ACCOUNT_TYPE_ICONS[acc.accountType] || "card-outline";

                return (
                    <TouchableOpacity
                        key={id}
                        activeOpacity={0.85}
                        onPress={() => onSelect(acc)}
                        style={selected && { transform: [{ scale: 1.02 }] }}
                    >
                        <LinearGradient
                            colors={GRADIENTS.hero}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={[
                                styles.accountCardModern,
                                selected && { borderWidth: 2, borderColor: "#7DAEF0" },
                            ]}
                        >
                            <View style={styles.accountCardDecor} pointerEvents="none" />

                            <View style={styles.accountCardTop}>
                                <View style={styles.accountCardIconGroup}>
                                    <View style={styles.accountCardIconChip}>
                                        <Ionicons name={iconName} size={19} color="#FFFFFF" />
                                    </View>
                                    <View style={styles.accountCardCurrencyBadge}>
                                        <Text style={styles.accountCardCurrencyBadgeText}>{currency}</Text>
                                    </View>
                                </View>
                                <View
                                    style={[
                                        styles.accountCardCheck,
                                        selected && styles.accountCardCheckSelected,
                                    ]}
                                >
                                    {selected && (
                                        <Ionicons name="checkmark" size={14} color={COLORS.navy} />
                                    )}
                                </View>
                            </View>

                            <Text style={styles.accountCardType}>
                                {acc.accountType || "MONETARIA"}
                            </Text>
                            <Text style={styles.accountCardNumber}>
                                {maskAccount(acc.accountNumber)}
                            </Text>

                            <Text style={styles.accountCardBalanceLabel}>Saldo disponible</Text>
                            <Text style={styles.accountCardBalance}>
                                {formatCurrency(acc.balance, currency)}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

export const FavoritesQuickPicker = ({ favorites, selectedAccountNumber, onSelect, onAddNew }) => (
    <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.favoritesRow}
    >
        {(favorites || []).map((fav) => {
            const selected = fav.accountNumber === selectedAccountNumber;
            const initial = (fav.alias || "?").trim().charAt(0).toUpperCase();
            return (
                <TouchableOpacity
                    key={fav._id}
                    style={[styles.favoriteCardModern, selected && styles.favoriteCardSelected]}
                    activeOpacity={0.8}
                    onPress={() => onSelect(fav)}
                >
                    <LinearGradient
                        colors={selected ? [COLORS.navyLight, COLORS.accentLight] : ["#EAF1FC", "#EAF1FC"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.favoriteRing}
                    >
                        <View style={styles.favoriteAvatarInner}>
                            <Text
                                style={[
                                    styles.favoriteAvatarInnerText,
                                    selected && { color: COLORS.accent },
                                ]}
                            >
                                {initial}
                            </Text>
                        </View>
                    </LinearGradient>
                    <Text style={styles.favoriteCardLabel} numberOfLines={1}>
                        {fav.alias}
                    </Text>
                </TouchableOpacity>
            );
        })}

        {onAddNew && (
            <TouchableOpacity
                style={styles.addFavoriteCardModern}
                activeOpacity={0.75}
                onPress={onAddNew}
            >
                <Ionicons name="add" size={22} color={COLORS.textMuted} />
                <Text style={[styles.favoriteCardLabel, { marginTop: 6, color: COLORS.textMuted }]}>
                    Nuevo
                </Text>
            </TouchableOpacity>
        )}
    </ScrollView>
);

export const DestinationInput = ({ value, onChangeText, matchedFavorite }) => {
    const [focused, setFocused] = useState(false);
    return (
        <View>
            <Text style={styles.inputLabel}>Número de cuenta</Text>
            <View style={[styles.inputCard, focused && styles.inputCardFocused]}>
                <View style={styles.inputRow}>
                    <View style={styles.inputIcon}>
                        <Ionicons
                            name="person-outline"
                            size={18}
                            color={focused ? COLORS.accent : COLORS.textMuted}
                        />
                    </View>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Ej. 4905980100"
                        placeholderTextColor={COLORS.textMuted}
                        value={value}
                        onChangeText={onChangeText}
                        keyboardType="number-pad"
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                    />
                </View>
            </View>

            {matchedFavorite && (
                <View style={styles.selectedFavoriteBanner}>
                    <Ionicons name="star" size={14} color={COLORS.success} />
                    <Text style={styles.selectedFavoriteBannerText}>
                        Enviarás a tu favorito "{matchedFavorite.alias}"
                    </Text>
                </View>
            )}
        </View>
    );
};

const QUICK_AMOUNTS = [50, 100, 200, 500];

export const AmountInput = ({ value, onChangeText, currency = "GTQ", quickAmounts = QUICK_AMOUNTS }) => {
    const [focused, setFocused] = useState(false);
    const active = focused || String(value || "").length > 0;
    const symbol = CURRENCY_SYMBOLS[currency] ?? currency;

    return (
        <View>
            <View style={[styles.amountCard, active && styles.amountCardActive]}>
                <View style={styles.amountRow}>
                    <Text style={styles.amountPrefix}>{symbol}</Text>
                    <TextInput
                        style={styles.amountInput}
                        placeholder="0.00"
                        placeholderTextColor={COLORS.textMuted}
                        value={value}
                        onChangeText={onChangeText}
                        keyboardType="decimal-pad"
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                    />
                </View>
                <View style={styles.amountCurrencyChip}>
                    <Text style={styles.amountCurrencyChipText}>{currency}</Text>
                </View>

                {!!quickAmounts?.length && (
                    <View style={styles.quickAmountsRow}>
                        {quickAmounts.map((q) => {
                            const selected = String(value) === String(q);
                            return (
                                <TouchableOpacity
                                    key={q}
                                    style={[
                                        styles.quickAmountChip,
                                        selected && styles.quickAmountChipSelected,
                                    ]}
                                    activeOpacity={0.8}
                                    onPress={() => onChangeText(String(q))}
                                >
                                    <Text
                                        style={[
                                            styles.quickAmountChipText,
                                            selected && styles.quickAmountChipTextSelected,
                                        ]}
                                    >
                                        {symbol}{q}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                )}
            </View>
        </View>
    );
};

export const DescriptionInput = ({ value, onChangeText }) => {
    const [focused, setFocused] = useState(false);
    return (
        <View>
            <Text style={styles.inputLabel}>Nota (opcional)</Text>
            <View style={[styles.inputCard, focused && styles.inputCardFocused]}>
                <View style={styles.inputRow}>
                    <View style={styles.inputIcon}>
                        <Ionicons
                            name="create-outline"
                            size={18}
                            color={focused ? COLORS.accent : COLORS.textMuted}
                        />
                    </View>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Ej. Pago de renta"
                        placeholderTextColor={COLORS.textMuted}
                        value={value}
                        onChangeText={onChangeText}
                        maxLength={120}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                    />
                </View>
            </View>
        </View>
    );
};

export const InfoHint = ({ text }) => (
    <View style={styles.hintBox}>
        <Ionicons name="information-circle-outline" size={18} color={COLORS.accent} />
        <Text style={styles.hintText}>{text}</Text>
    </View>
);

export const ErrorBanner = ({ message }) => {
    if (!message) return null;
    return (
        <View style={styles.errorBox}>
            <Ionicons name="alert-circle-outline" size={18} color={COLORS.danger} />
            <Text style={styles.errorBoxText}>{message}</Text>
        </View>
    );
};