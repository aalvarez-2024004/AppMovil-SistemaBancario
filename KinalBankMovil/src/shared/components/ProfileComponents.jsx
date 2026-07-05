import { View, Text, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { styles, COLORS, GRADIENTS } from "../constants/profile";

const CURRENCY_SYMBOLS = { GTQ: "Q", USD: "$", EUR: "€", GBP: "£", MXN: "MX$" };

export const formatCurrency = (amount, currency = "GTQ") => {
    const symbol = CURRENCY_SYMBOLS[currency] ?? currency;
    return `${symbol} ${Number(amount || 0).toLocaleString("es-GT", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
};

export const maskAccountCard = (num = "") => {
    const str = String(num || "").replace(/\D/g, "");
    if (!str) return "—";
    const last4 = str.slice(-4);
    return `••• ••• ${last4}`;
};

export const maskDPI = (dpi = "") => {
    const str = String(dpi || "").replace(/\D/g, "");
    if (!str) return "—";
    if (str.length !== 13) {
        return str.replace(/(.{4})/g, "$1 ").trim();
    }
    return `${str.slice(0, 4)} ${str.slice(4, 9)} ${str.slice(9)}`;
};

export const getInitials = (user) => {
    const parts = (user?.name || "").trim().split(/\s+/);
    const a = parts[0]?.[0] || "";
    const b = parts[1]?.[0] || "";
    return (a + b).toUpperCase() || "U";
};

export const ProfileHeader = ({ user, isActive = true }) => (
    <LinearGradient
        colors={GRADIENTS.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
    >
        <View style={styles.headerDecorCircleLg} pointerEvents="none" />
        <View style={styles.headerDecorCircleSm} pointerEvents="none" />

        <View style={styles.avatarRing}>
            <Text style={styles.avatarText}>{getInitials(user)}</Text>
        </View>

        <Text style={styles.name}>
            {user?.name}
        </Text>
        {!!user?.username && <Text style={styles.username}>@{user.username}</Text>}

        <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>{isActive ? "Cuenta activa" : "Cuenta inactiva"}</Text>
        </View>
    </LinearGradient>
);

export const AccountCard = ({ accountNumber }) => (
    <View style={styles.accountCardWrap}>
        <LinearGradient
            colors={GRADIENTS.accountCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.accountCard}
        >
            <View>
                <Text style={styles.accountCardLabel}>NÚMERO DE CUENTA</Text>
                <Text style={styles.accountCardNumber}>{maskAccountCard(accountNumber)}</Text>
            </View>
            <View style={styles.accountCardIconWrap}>
                <Ionicons name="card" size={20} color="#FFFFFF" />
            </View>
        </LinearGradient>
    </View>
);

export const SectionLabel = ({ children }) => (
    <Text style={styles.sectionLabel}>{children}</Text>
);

export const InfoRow = ({
    icon,
    label,
    value,
    isLast = false,
    editable = false,
    editing = false,
    onChangeText,
    placeholder,
    keyboardType = "default",
}) => (
    <View style={[styles.infoRow, isLast && styles.infoRowLast]}>
        <View style={styles.infoIconChip}>
            <Ionicons name={icon} size={17} color={COLORS.accent} />
        </View>
        <View style={styles.infoTextWrap}>
            <Text style={styles.infoLabel}>{label}</Text>
            {editable && editing ? (
                <TextInput
                    style={styles.infoInput}
                    value={value ?? ""}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.textMuted}
                    keyboardType={keyboardType}
                />
            ) : (
                <Text style={[styles.infoValue, !value && styles.infoValueMuted]}>
                    {value || "—"}
                </Text>
            )}
        </View>
    </View>
);

export const InfoCard = ({ children }) => (
    <View style={styles.infoCard}>{children}</View>
);