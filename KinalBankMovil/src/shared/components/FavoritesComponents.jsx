import { View, Text, TextInput, TouchableOpacity, Modal, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles, COLORS } from "../constants/Favorites";

export const maskAccount = (num = "") => {
    const str = String(num);
    return str.length > 4 ? `•••• ${str.slice(-4)}` : str;
};

export const FavoriteCard = ({ favorite, onTransfer, onEdit, onDelete }) => {
    const initial = (favorite.alias || "?").trim().charAt(0).toUpperCase();

    return (
        <View style={styles.favoriteCard}>
            <View style={styles.favoriteAvatar}>
                <Text style={styles.favoriteAvatarText}>{initial}</Text>
            </View>

            <View style={styles.favoriteInfo}>
                <Text style={styles.favoriteAlias} numberOfLines={1}>
                    {favorite.alias}
                </Text>
                <Text style={styles.favoriteAccount} numberOfLines={1}>
                    {maskAccount(favorite.accountNumber)}
                </Text>
            </View>

            <View style={styles.favoriteActions}>
                <TouchableOpacity
                    style={[styles.favoriteActionBtn, styles.favoriteActionBtnAccent]}
                    onPress={() => onTransfer(favorite)}
                    activeOpacity={0.75}
                >
                    <Ionicons name="paper-plane-outline" size={16} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.favoriteActionBtn}
                    onPress={() => onEdit(favorite)}
                    activeOpacity={0.75}
                >
                    <Ionicons name="pencil-outline" size={16} color={COLORS.textSecondary} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.favoriteActionBtn, styles.favoriteActionBtnDanger]}
                    onPress={() => onDelete(favorite)}
                    activeOpacity={0.75}
                >
                    <Ionicons name="trash-outline" size={16} color={COLORS.danger} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export const DeleteConfirmRow = ({ favorite, isDeleting, onConfirm, onCancel }) => (
    <View style={styles.confirmRow}>
        <Ionicons name="alert-circle-outline" size={18} color={COLORS.danger} />
        <Text style={styles.confirmText}>¿Eliminar a "{favorite.alias}" de tus favoritos?</Text>
        <TouchableOpacity
            style={[styles.confirmBtn, styles.confirmBtnGhost]}
            onPress={onCancel}
            activeOpacity={0.7}
        >
            <Text style={[styles.confirmBtnText, styles.confirmBtnTextGhost]}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.confirmBtn, styles.confirmBtnDanger]}
            onPress={onConfirm}
            activeOpacity={0.8}
            disabled={isDeleting}
        >
            {isDeleting ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : (
                <Text style={styles.confirmBtnText}>Eliminar</Text>
            )}
        </TouchableOpacity>
    </View>
);

export const FavoritesEmptyState = ({ onAdd }) => (
    <View style={styles.emptyState}>
        <View style={styles.emptyIcon}>
            <Ionicons name="star-outline" size={32} color={COLORS.textMuted} />
        </View>
        <Text style={styles.emptyTitle}>Aún no tienes favoritos</Text>
        <Text style={styles.emptySubtitle}>
            Guarda las cuentas a las que más transfieres para enviarles dinero en segundos.
        </Text>
        <TouchableOpacity style={styles.emptyCta} onPress={onAdd} activeOpacity={0.85}>
            <Text style={styles.emptyCtaText}>Agregar favorito</Text>
        </TouchableOpacity>
    </View>
);

export const FavoritesErrorBanner = ({ message, onRetry }) => {
    if (!message) return null;
    return (
        <View style={styles.errorBox}>
            <Ionicons name="alert-circle-outline" size={18} color={COLORS.danger} />
            <Text style={styles.errorBoxText}>{message}</Text>
            {onRetry && (
                <TouchableOpacity onPress={onRetry}>
                    <Ionicons name="refresh" size={18} color={COLORS.danger} />
                </TouchableOpacity>
            )}
        </View>
    );
};

export const FavoriteFormModal = ({
    visible,
    mode = "create",
    alias,
    accountNumber,
    onChangeAlias,
    onChangeAccountNumber,
    isSubmitting,
    error,
    onSubmit,
    onClose,
}) => (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalSheet}>
                <View style={styles.modalHandle} />

                <Text style={styles.modalTitle}>
                    {mode === "edit" ? "Editar favorito" : "Nuevo favorito"}
                </Text>
                <Text style={styles.modalSubtitle}>
                    {mode === "edit"
                        ? "Actualiza el alias o el número de cuenta."
                        : "Guarda una cuenta para transferirle más rápido."}
                </Text>

                <Text style={styles.modalLabel}>Alias</Text>
                <View style={styles.modalInputWrap}>
                    <Ionicons name="person-outline" size={18} color={COLORS.textMuted} />
                    <TextInput
                        style={styles.modalInput}
                        placeholder="Ej. Mi mamá"
                        placeholderTextColor={COLORS.textMuted}
                        value={alias}
                        onChangeText={onChangeAlias}
                        maxLength={40}
                    />
                </View>

                <Text style={styles.modalLabel}>Número de cuenta</Text>
                <View style={styles.modalInputWrap}>
                    <Ionicons name="card-outline" size={18} color={COLORS.textMuted} />
                    <TextInput
                        style={styles.modalInput}
                        placeholder="Ej. 1234567890"
                        placeholderTextColor={COLORS.textMuted}
                        value={accountNumber}
                        onChangeText={onChangeAccountNumber}
                        keyboardType="number-pad"
                    />
                </View>

                {error && <Text style={styles.modalError}>{error}</Text>}

                <TouchableOpacity
                    style={[
                        styles.modalSubmitBtn,
                        (isSubmitting || !alias.trim() || !accountNumber.trim()) &&
                        styles.modalSubmitBtnDisabled,
                    ]}
                    onPress={onSubmit}
                    disabled={isSubmitting || !alias.trim() || !accountNumber.trim()}
                    activeOpacity={0.85}
                >
                    {isSubmitting ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.modalSubmitBtnText}>
                            {mode === "edit" ? "Guardar cambios" : "Agregar favorito"}
                        </Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.modalCancelBtn} onPress={onClose} activeOpacity={0.7}>
                    <Text style={styles.modalCancelBtnText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
);