import { useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Pressable,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useAuthStore } from "../../../shared/store/useAuthStore";
import { useTransactionStore } from "../../../shared/store/useTransactionStore";

import { styles, COLORS } from "../../../shared/constants/profile";
import {
    ProfileHeader,
    AccountCard,
    SectionLabel,
    InfoCard,
    InfoRow,
    maskDPI,
} from "../../../shared/components/ProfileComponents";

const ProfileScreen = () => {
    const { user, token, isLoading, updateProfile, logout } = useAuthStore();
    const { accounts, fetchMyAccounts } = useTransactionStore();

    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);
    const [loggingOut, setLoggingOut] = useState(false);
    const [confirmLogoutVisible, setConfirmLogoutVisible] = useState(false);

    const [form, setForm] = useState({
        phone: "",
        address: "",
        occupation: "",
        monthlyIncome: "",
    });

    useEffect(() => {
        if (token) {
            fetchMyAccounts(token);
        }
    }, [token]);

    // Se usa la primera cuenta activa como cuenta principal a mostrar en la tarjeta azul.
    const primaryAccount = useMemo(
        () => (accounts || []).find((a) => a.status === "ACTIVA") || accounts?.[0] || null,
        [accounts]
    );

    const startEditing = () => {
        setSaveError(null);
        setForm({
            phone: user?.phone || "",
            address: user?.address || "",
            occupation: user?.occupation || "",
            monthlyIncome: user?.monthlyIncome != null ? String(user.monthlyIncome) : "",
        });
        setEditing(true);
    };

    const cancelEditing = () => {
        setSaveError(null);
        setEditing(false);
    };

    const handleSave = async () => {
        setSaving(true);
        setSaveError(null);

        const payload = {
            phone: form.phone.trim(),
            address: form.address.trim(),
            occupation: form.occupation.trim(),
            monthlyIncome: form.monthlyIncome ? Number(form.monthlyIncome) : undefined,
        };

        const res = await updateProfile(payload);
        setSaving(false);

        if (res.success) {
            setEditing(false);
        } else {
            setSaveError(res.error || "No se pudo actualizar tu perfil. Intenta de nuevo.");
        }
    };

    // Nota: no usamos Alert.alert aquí porque no funciona en react-native-web
    // (en web no muestra ningún diálogo y el botón parece no responder).
    // En su lugar mostramos un overlay propio controlado por estado (sin <Modal>,
    // ya que el Modal de RN en web deja un overlay fantasma que bloquea los clics
    // de toda la pantalla incluso cuando visible={false}).
    const confirmLogout = async () => {
        setLoggingOut(true);
        await logout();
        setLoggingOut(false);
        setConfirmLogoutVisible(false);
        // Si después de esto sigues viendo esta pantalla, el navegador raíz no
        // está reaccionando a isAuthenticated=false; revisa el componente que
        // decide entre <AuthStack /> y <AppStack />.
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <ProfileHeader user={user} isActive={user?.status !== "INACTIVA"} />
                <AccountCard accountNumber={primaryAccount?.accountNumber} />

                <View style={styles.section}>
                    <SectionLabel>Información personal</SectionLabel>
                    <InfoCard>
                        <InfoRow icon="mail-outline" label="Correo electrónico" value={user?.email} />
                        <InfoRow
                            icon="call-outline"
                            label="Teléfono"
                            value={editing ? form.phone : user?.phone}
                            editable
                            editing={editing}
                            onChangeText={(v) => setForm((f) => ({ ...f, phone: v }))}
                            placeholder="Ej. 12345678"
                            keyboardType="phone-pad"
                        />
                        <InfoRow
                            icon="location-outline"
                            label="Dirección"
                            value={editing ? form.address : user?.address}
                            editable
                            editing={editing}
                            onChangeText={(v) => setForm((f) => ({ ...f, address: v }))}
                            placeholder="Ej. Zona 6"
                            isLast
                        />
                    </InfoCard>
                </View>

                <View style={styles.section}>
                    <SectionLabel>Información laboral</SectionLabel>
                    <InfoCard>
                        {!!user?.dpi && (
                            <InfoRow icon="card-outline" label="DPI" value={maskDPI(user.dpi)} />
                        )}
                        <InfoRow
                            icon="briefcase-outline"
                            label="Ocupación"
                            value={editing ? form.occupation : user?.occupation}
                            editable
                            editing={editing}
                            onChangeText={(v) => setForm((f) => ({ ...f, occupation: v }))}
                            placeholder="Ej. Estudiante"
                        />
                        <InfoRow
                            icon="cash-outline"
                            label="Ingreso mensual"
                            value={
                                editing
                                    ? form.monthlyIncome
                                    : user?.monthlyIncome != null
                                        ? `Q ${Number(user.monthlyIncome).toLocaleString("es-GT", { minimumFractionDigits: 2 })}`
                                        : null
                            }
                            editable
                            editing={editing}
                            onChangeText={(v) => setForm((f) => ({ ...f, monthlyIncome: v.replace(/[^0-9.]/g, "") }))}
                            placeholder="Ej. 2500"
                            keyboardType="decimal-pad"
                            isLast
                        />
                    </InfoCard>
                </View>

                {saveError && (
                    <View style={styles.errorBox}>
                        <Ionicons name="alert-circle-outline" size={18} color={COLORS.danger} />
                        <Text style={styles.errorBoxText}>{saveError}</Text>
                    </View>
                )}

                <View style={styles.actionsWrap}>
                    {editing ? (
                        <>
                            <TouchableOpacity
                                style={[styles.editBtn, saving && styles.btnDisabled]}
                                onPress={handleSave}
                                disabled={saving}
                                activeOpacity={0.85}
                            >
                                {saving ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <>
                                        <Ionicons name="checkmark" size={18} color="#fff" />
                                        <Text style={styles.editBtnText}>Guardar cambios</Text>
                                    </>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cancelBtn}
                                onPress={cancelEditing}
                                disabled={saving}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.cancelBtnText}>Cancelar</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <TouchableOpacity style={styles.editBtn} onPress={startEditing} activeOpacity={0.85}>
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <>
                                    <Ionicons name="pencil" size={16} color="#fff" />
                                    <Text style={styles.editBtnText}>Editar perfil</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={styles.logoutBtn}
                        onPress={() => setConfirmLogoutVisible(true)}
                        activeOpacity={0.85}
                    >
                        <Ionicons name="log-out-outline" size={18} color={COLORS.danger} />
                        <Text style={styles.logoutBtnText}>Cerrar sesión</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {confirmLogoutVisible && (
                <View style={[styles.modalBackdrop, { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }]}>
                    <Pressable
                        style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "center" }}
                        onPress={() => !loggingOut && setConfirmLogoutVisible(false)}
                    >
                        <Pressable onPress={() => {}} style={styles.modalCard}>
                            <View style={styles.modalIconWrap}>
                                <Ionicons name="log-out-outline" size={24} color={COLORS.danger} />
                            </View>
                            <Text style={styles.modalTitle}>Cerrar sesión</Text>
                            <Text style={styles.modalMessage}>
                                ¿Estás seguro que deseas salir de tu cuenta?
                            </Text>
                            <View style={styles.modalActions}>
                                <TouchableOpacity
                                    style={styles.modalCancelBtn}
                                    onPress={() => setConfirmLogoutVisible(false)}
                                    disabled={loggingOut}
                                    activeOpacity={0.75}
                                >
                                    <Text style={styles.modalCancelBtnText}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalConfirmBtn}
                                    onPress={confirmLogout}
                                    disabled={loggingOut}
                                    activeOpacity={0.85}
                                >
                                    {loggingOut ? (
                                        <ActivityIndicator color="#fff" />
                                    ) : (
                                        <Text style={styles.modalConfirmBtnText}>Salir</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </Pressable>
                    </Pressable>
                </View>
            )}
        </KeyboardAvoidingView>
    );
};

export default ProfileScreen;