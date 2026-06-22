import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles, COLORS } from "../constants/NewTransaction";

export const formatCurrency = (amount) =>
    `Q ${Number(amount || 0).toLocaleString("es-GT", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;

export const maskAccount = (num = "") => {
    const str = String(num);
    return str.length > 4 ? `•••• ${str.slice(-4)}` : str;
};

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
                return (
                    <TouchableOpacity
                        key={id}
                        style={[styles.accountOption, selected && styles.accountOptionSelected]}
                        activeOpacity={0.8}
                        onPress={() => onSelect(acc)}
                    >
                        <View style={styles.accountOptionTop}>
                            <Text style={styles.accountOptionType}>
                                {acc.accountType || "MONETARIA"} · {acc.currency || "GTQ"}
                            </Text>
                            <View
                                style={[
                                    styles.accountOptionRadio,
                                    selected && styles.accountOptionRadioSelected,
                                ]}
                            >
                                {selected && <View style={styles.accountOptionRadioDot} />}
                            </View>
                        </View>
                        <Text style={styles.accountOptionNumber}>
                            {maskAccount(acc.accountNumber)}
                        </Text>
                        <Text style={styles.accountOptionBalance}>
                            {formatCurrency(acc.balance)}
                        </Text>
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
                    style={styles.favoriteChip}
                    activeOpacity={0.75}
                    onPress={() => onSelect(fav)}
                >
                    <View style={[styles.favoriteAvatar, selected && styles.favoriteAvatarSelected]}>
                        <Text style={styles.favoriteAvatarText}>{initial}</Text>
                    </View>
                    <Text
                        style={[styles.favoriteChipLabel, selected && styles.favoriteChipLabelSelected]}
                        numberOfLines={1}
                    >
                        {fav.alias}
                    </Text>
                </TouchableOpacity>
            );
        })}

        {onAddNew && (
            <TouchableOpacity style={styles.favoriteChip} activeOpacity={0.75} onPress={onAddNew}>
                <View style={styles.addFavoriteChip}>
                    <Ionicons name="add" size={22} color={COLORS.textMuted} />
                </View>
                <Text style={styles.favoriteChipLabel} numberOfLines={1}>
                    Nuevo
                </Text>
            </TouchableOpacity>
        )}
    </ScrollView>
);

export const DestinationInput = ({ value, onChangeText, matchedFavorite }) => (
    <View>
        <View style={styles.inputCard}>
            <View style={styles.inputRow}>
                <View style={styles.inputIcon}>
                    <Ionicons name="person-outline" size={18} color={COLORS.textMuted} />
                </View>
                <TextInput
                    style={styles.textInput}
                    placeholder="Número de cuenta destino"
                    placeholderTextColor={COLORS.textMuted}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType="number-pad"
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

export const AmountInput = ({ value, onChangeText, currency = "GTQ" }) => (
    <View style={styles.amountCard}>
        <View style={styles.amountRow}>
            <Text style={styles.amountPrefix}>Q</Text>
            <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor={COLORS.textMuted}
                value={value}
                onChangeText={onChangeText}
                keyboardType="decimal-pad"
            />
        </View>
        <Text style={styles.amountCurrency}>{currency}</Text>
    </View>
);

export const DescriptionInput = ({ value, onChangeText }) => (
    <View style={styles.inputCard}>
        <View style={styles.inputRow}>
            <View style={styles.inputIcon}>
                <Ionicons name="create-outline" size={18} color={COLORS.textMuted} />
            </View>
            <TextInput
                style={styles.textInput}
                placeholder="Nota (opcional)"
                placeholderTextColor={COLORS.textMuted}
                value={value}
                onChangeText={onChangeText}
                maxLength={120}
            />
        </View>
    </View>
);

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