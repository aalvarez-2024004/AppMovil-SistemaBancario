import { View, Text, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { styles, COLORS, GRADIENTS } from "../constants/profile";

export const maskAccountCard = (num = "") => {
    const str = String(num || "");
    const last4 = str.slice(-4) || "0000";
    return `•••• •••• ${last4}`;
};

export const maskDPI = (dpi = "") => {
    const str = String(dpi || "").replace(/\D/g, "");
    if (str.length <= 8) return str || "—";
    return `${str.slice(0, 4)} •••• ${str.slice(-4)}`;
};

export const getInitials = (user) => {
    const a = user?.firstName?.[0] || "";
    const b = user?.lastName?.[0] || "";
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
            {user?.firstName} {user?.lastName}
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