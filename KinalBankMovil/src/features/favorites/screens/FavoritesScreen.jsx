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

import { useAuthStore } from "../../../shared/store/useAuthStore";
import { useFavoriteStore } from "../../../shared/store/useFavoriteStore";

import { styles, COLORS } from "../../../shared/constants/Favorites";
import {
    FavoriteCard,
    DeleteConfirmRow,
    FavoritesEmptyState,
    FavoritesErrorBanner,
    FavoriteFormModal,
} from "../../../shared/components/FavoritesComponents";

const FavoritesScreen = () => {
    const navigation = useNavigation();
    const token = useAuthStore((s) => s.token);

    const {
        favorites,
        isLoading,
        error,
        isSubmitting,
        submitError,
        fetchFavorites,
        addFavorite,
        editFavorite,
        removeFavorite,
        resetSubmitError,
    } = useFavoriteStore();

    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [editingFavorite, setEditingFavorite] = useState(null);
    const [formAlias, setFormAlias] = useState("");
    const [formAccountNumber, setFormAccountNumber] = useState("");
    const [confirmDeleteFor, setConfirmDeleteFor] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const load = useCallback(() => {
        if (token) fetchFavorites(token);
    }, [token]);

    useEffect(() => { load(); }, [load]);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchFavorites(token);
        setRefreshing(false);
    };

    const openCreateModal = () => {
        resetSubmitError();
        setModalMode("create");
        setEditingFavorite(null);
        setFormAlias("");
        setFormAccountNumber("");
        setModalVisible(true);
    };

    const openEditModal = (favorite) => {
        resetSubmitError();
        setModalMode("edit");
        setEditingFavorite(favorite);
        setFormAlias(favorite.alias);
        setFormAccountNumber(favorite.accountNumber);
        setModalVisible(true);
    };

    const closeModal = () => { setModalVisible(false); resetSubmitError(); };

    const submitForm = async () => {
        const alias = formAlias.trim();
        const accountNumber = formAccountNumber.trim();
        if (!alias || !accountNumber) return;

        const res = modalMode === "edit"
            ? await editFavorite(token, editingFavorite._id, { alias, accountNumber })
            : await addFavorite(token, { alias, accountNumber });

        if (res.success) setModalVisible(false);
    };

    const handleDeleteConfirm = async () => {
        if (!confirmDeleteFor) return;
        setDeletingId(confirmDeleteFor._id);
        await removeFavorite(token, confirmDeleteFor._id);
        setDeletingId(null);
        setConfirmDeleteFor(null);
    };

    const handleTransfer = (favorite) => {
        navigation.navigate("Transfer", {
            prefillAccountNumber: favorite.accountNumber,
            prefillAlias: favorite.alias,
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

            <View style={styles.hero}>
                <View style={styles.backRow}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
                        <Ionicons name="arrow-back" size={18} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addBtn} onPress={openCreateModal} activeOpacity={0.8}>
                        <Ionicons name="add" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.heroLabel}>KinalBank</Text>
                <Text style={styles.heroTitle}>
                    Mis{"\n"}<Text style={styles.heroTitleAccent}>Favoritos</Text>
                </Text>
                <Text style={styles.heroSubtitle}>
                    {favorites.length} {favorites.length === 1 ? "cuenta guardada" : "cuentas guardadas"}
                </Text>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.accent} colors={[COLORS.accent]} />
                }
            >
                <Text style={styles.sectionLabel}>
                    {favorites.length > 0 ? "Tus favoritos" : "Favoritos"}
                </Text>

                <FavoritesErrorBanner message={error} onRetry={load} />

                {isLoading && favorites.length === 0 ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={COLORS.accent} />
                        <Text style={styles.loadingText}>Cargando favoritos...</Text>
                    </View>
                ) : favorites.length === 0 ? (
                    <FavoritesEmptyState onAdd={openCreateModal} />
                ) : (
                    favorites.map((fav) =>
                        confirmDeleteFor?._id === fav._id ? (
                            <DeleteConfirmRow
                                key={fav._id}
                                favorite={fav}
                                isDeleting={deletingId === fav._id}
                                onConfirm={handleDeleteConfirm}
                                onCancel={() => setConfirmDeleteFor(null)}
                            />
                        ) : (
                            <FavoriteCard
                                key={fav._id}
                                favorite={fav}
                                onTransfer={handleTransfer}
                                onEdit={openEditModal}
                                onDelete={setConfirmDeleteFor}
                            />
                        )
                    )
                )}
            </ScrollView>

            <FavoriteFormModal
                visible={modalVisible}
                mode={modalMode}
                alias={formAlias}
                accountNumber={formAccountNumber}
                onChangeAlias={setFormAlias}
                onChangeAccountNumber={setFormAccountNumber}
                isSubmitting={isSubmitting}
                error={submitError}
                onSubmit={submitForm}
                onClose={closeModal}
            />
        </View>
    );
};

export default FavoritesScreen;