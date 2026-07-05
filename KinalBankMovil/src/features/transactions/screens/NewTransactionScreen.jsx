import { useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useAuthStore } from "../../../shared/store/useAuthStore";
import { useTransactionStore } from "../../../shared/store/useTransactionStore";
import { useFavoriteStore } from "../../../shared/store/useFavoriteStore";

import { styles, COLORS, GRADIENTS } from "../../../shared/constants/NewTransaction";
import {
    formatCurrency,
    maskAccount,
    StepProgress,
    SourceAccountSelector,
    FavoritesQuickPicker,
    DestinationInput,
    AmountInput,
    DescriptionInput,
    InfoHint,
    ErrorBanner,
} from "../../../shared/components/NewTransactionComponents";

const MAX_PER_TRANSFER = 2000;
const STEPS = ["origen", "destino", "monto"];

const NewTransactionScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const token = useAuthStore((s) => s.token);

    const {
        accounts,
        fetchMyAccounts,
        createTransaction,
        isSubmitting,
        submitError,
        resetSubmitError,
    } = useTransactionStore();

    const {
        favorites,
        fetchFavorites,
        addFavorite,
        isSubmitting: isSavingFavorite,
    } = useFavoriteStore();

    const [loadingAccounts, setLoadingAccounts] = useState(true);
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [destination, setDestination] = useState(
        route.params?.prefillAccountNumber?.toString() || ""
    );
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [localError, setLocalError] = useState(null);

    const [success, setSuccess] = useState(null);
    const [showSaveFavorite, setShowSaveFavorite] = useState(false);
    const [favoriteAlias, setFavoriteAlias] = useState("");
    const [favoriteSaved, setFavoriteSaved] = useState(false);

    useEffect(() => {
        (async () => {
            setLoadingAccounts(true);
            await Promise.all([fetchMyAccounts(token), fetchFavorites(token)]);
            setLoadingAccounts(false);
        })();
    }, [token]);

    const activeAccounts = useMemo(
        () => (accounts || []).filter((a) => a.status === "ACTIVA"),
        [accounts]
    );

    useEffect(() => {
        if (!selectedAccountId && activeAccounts.length > 0) {
            setSelectedAccountId(activeAccounts[0]._id || activeAccounts[0].id);
        }
    }, [activeAccounts, selectedAccountId]);

    const selectedAccount = useMemo(
        () =>
            activeAccounts.find((a) => (a._id || a.id) === selectedAccountId) ||
            activeAccounts[0] ||
            null,
        [activeAccounts, selectedAccountId]
    );

    const matchedFavorite = useMemo(
        () => favorites.find((f) => f.accountNumber === destination.trim()) || null,
        [favorites, destination]
    );

    // paso actual del flujo, solo para el indicador visual del hero
    const activeStep = useMemo(() => {
        if (!destination.trim()) return 1;
        if (!amount) return 2;
        return 2;
    }, [destination, amount]);

    const clearErrors = () => {
        if (localError) setLocalError(null);
        if (submitError) resetSubmitError();
    };

    const validate = () => {
        if (!selectedAccount) return "Selecciona una cuenta de origen.";
        const dest = destination.trim();
        if (!dest) return "Ingresa el número de cuenta destino.";
        if (dest === selectedAccount.accountNumber)
            return "La cuenta destino no puede ser igual a la cuenta de origen.";
        const amountNumber = Number(String(amount).replace(",", "."));
        if (!amount || isNaN(amountNumber) || amountNumber <= 0)
            return "Ingresa un monto válido.";
        if (amountNumber > MAX_PER_TRANSFER)
            return `No puedes transferir más de ${formatCurrency(MAX_PER_TRANSFER)} por operación.`;
        if (amountNumber > Number(selectedAccount.balance ?? 0))
            return "Saldo insuficiente en la cuenta seleccionada.";
        return null;
    };

    const handleSubmit = async () => {
        clearErrors();
        const validationError = validate();
        if (validationError) { setLocalError(validationError); return; }

        const amountNumber = Number(String(amount).replace(",", "."));
        const dest = destination.trim();

        const res = await createTransaction(token, {
            type: "TRANSFERENCIA",
            amount: amountNumber,
            fromAccount: selectedAccount.accountNumber,
            toAccount: dest,
            description: description.trim() || "Transferencia KinalBank",
        });

        if (res.success) {
            setSuccess({ amount: amountNumber, destination: dest, favorite: matchedFavorite, sourceAccount: selectedAccount });
            setFavoriteSaved(false);
            setShowSaveFavorite(false);
            setFavoriteAlias("");
            setDestination("");
            setAmount("");
            setDescription("");
        }
    };

    const handleSaveFavorite = async () => {
        if (!favoriteAlias.trim() || !success) return;
        const res = await addFavorite(token, { alias: favoriteAlias.trim(), accountNumber: success.destination });
        if (res.success) { setFavoriteSaved(true); setShowSaveFavorite(false); }
    };

    const resetForm = () => { setSuccess(null); setLocalError(null); };
    const goToMovements = () => navigation.navigate("MainTabs", { screen: "MisMovimientos" });
    const errorMessage = localError || submitError;

    if (success) {
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
                <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
                <View style={styles.successWrap}>
                    <View style={styles.successIconOuterGlow}>
                        <View style={styles.successIconWrap}>
                            <Ionicons name="checkmark" size={48} color={COLORS.success} />
                        </View>
                    </View>
                    <Text style={styles.successTitle}>¡Transferencia exitosa!</Text>
                    <Text style={styles.successSubtitle}>Tu dinero fue enviado correctamente.</Text>
                    <Text style={styles.successAmount}>{formatCurrency(success.amount, success.sourceAccount?.currency)}</Text>

                    <View style={styles.successCard}>
                        <View style={styles.successRow}>
                            <Text style={styles.successRowLabel}>Desde</Text>
                            <Text style={styles.successRowValue}>{maskAccount(success.sourceAccount?.accountNumber)}</Text>
                        </View>
                        <View style={[styles.successRow, styles.successRowLast]}>
                            <Text style={styles.successRowLabel}>Hacia</Text>
                            <Text style={styles.successRowValue}>
                                {success.favorite?.alias
                                    ? `${success.favorite.alias} · ${maskAccount(success.destination)}`
                                    : maskAccount(success.destination)}
                            </Text>
                        </View>
                    </View>

                    {!success.favorite && !favoriteSaved && (
                        <>
                            {showSaveFavorite ? (
                                <View style={{ width: "100%", marginBottom: 12 }}>
                                    <View style={styles.inputCard}>
                                        <View style={styles.inputRow}>
                                            <View style={styles.inputIcon}>
                                                <Ionicons name="star-outline" size={18} color={COLORS.textMuted} />
                                            </View>
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder="Alias del favorito (ej. Mi mamá)"
                                                placeholderTextColor={COLORS.textMuted}
                                                value={favoriteAlias}
                                                onChangeText={setFavoriteAlias}
                                                autoFocus
                                            />
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        style={[styles.successPrimaryBtn, { marginTop: 10 }]}
                                        onPress={handleSaveFavorite}
                                        disabled={isSavingFavorite || !favoriteAlias.trim()}
                                        activeOpacity={0.85}
                                    >
                                        {isSavingFavorite
                                            ? <ActivityIndicator color="#fff" />
                                            : <Text style={styles.successPrimaryBtnText}>Guardar favorito</Text>}
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <TouchableOpacity style={styles.saveFavoriteBtn} onPress={() => setShowSaveFavorite(true)} activeOpacity={0.8}>
                                    <Ionicons name="star-outline" size={16} color={COLORS.accent} />
                                    <Text style={styles.saveFavoriteBtnText}>Guardar como favorito</Text>
                                </TouchableOpacity>
                            )}
                        </>
                    )}

                    {favoriteSaved && (
                        <View style={[styles.selectedFavoriteBanner, { width: "100%", marginTop: 0, marginBottom: 12 }]}>
                            <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
                            <Text style={styles.selectedFavoriteBannerText}>Guardado en tus favoritos</Text>
                        </View>
                    )}

                    <View style={styles.successActions}>
                        <TouchableOpacity style={styles.successPrimaryBtn} onPress={goToMovements} activeOpacity={0.85}>
                            <Text style={styles.successPrimaryBtnText}>Ver mis movimientos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.successSecondaryBtn} onPress={resetForm} activeOpacity={0.7}>
                            <Text style={styles.successSecondaryBtnText}>Hacer otra transferencia</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

            <LinearGradient
                colors={GRADIENTS.hero}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.hero}
            >
                <View style={styles.heroDecorCircleLg} pointerEvents="none" />
                <View style={styles.heroDecorCircleSm} pointerEvents="none" />

                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
                    <Ionicons name="arrow-back" size={18} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.heroTitle}>
                    Nueva{"\n"}<Text style={styles.heroTitleAccent}>Transferencia</Text>
                </Text>

                <StepProgress steps={STEPS} activeIndex={activeStep} />
            </LinearGradient>

            <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={[styles.section, { marginTop: 4 }]}>
                    <View style={styles.sectionLabelRow}>
                        <Text style={styles.sectionLabel}>Cuenta de origen</Text>
                    </View>
                    {loadingAccounts
                        ? <ActivityIndicator color={COLORS.accent} />
                        : <SourceAccountSelector accounts={activeAccounts} selectedId={selectedAccountId} onSelect={(acc) => { clearErrors(); setSelectedAccountId(acc._id || acc.id); }} />}
                </View>

                {favorites.length > 0 && (
                    <View style={styles.section}>
                        <View style={styles.sectionLabelRow}>
                            <Text style={styles.sectionLabel}>Tus favoritos</Text>
                        </View>
                        <FavoritesQuickPicker
                            favorites={favorites}
                            selectedAccountNumber={destination.trim()}
                            onSelect={(fav) => { clearErrors(); setDestination(fav.accountNumber); }}
                        />
                    </View>
                )}

                <View style={styles.section}>
                    <DestinationInput value={destination} onChangeText={(v) => { clearErrors(); setDestination(v); }} matchedFavorite={matchedFavorite} />
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionLabelRow}>
                        <Text style={styles.sectionLabel}>Monto a enviar</Text>
                    </View>
                    <AmountInput value={amount} onChangeText={(v) => { clearErrors(); setAmount(v.replace(/[^0-9.,]/g, "")); }} currency={selectedAccount?.currency || "GTQ"} />
                </View>

                <View style={styles.section}>
                    <DescriptionInput value={description} onChangeText={setDescription} />
                </View>

                <InfoHint text={`Máximo ${formatCurrency(MAX_PER_TRANSFER, selectedAccount?.currency)} por transferencia y ${formatCurrency(10000, selectedAccount?.currency)} por día.`} />
                <ErrorBanner message={errorMessage} />
            </ScrollView>

            <View style={styles.ctaBar}>
                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={isSubmitting || loadingAccounts}
                    activeOpacity={0.85}
                >
                    <LinearGradient
                        colors={GRADIENTS.button}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[styles.submitBtn, isSubmitting && styles.submitBtnDisabled]}
                    >
                        {isSubmitting
                            ? <ActivityIndicator color="#fff" />
                            : <><Ionicons name="paper-plane-outline" size={18} color="#fff" /><Text style={styles.submitBtnText}>Transferir</Text></>}
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default NewTransactionScreen;