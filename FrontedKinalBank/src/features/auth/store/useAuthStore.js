import { create } from 'zustand'
import {
    loginRequest,
    registerRequest,
    requestPasswordResetRequest,
    verifyResetCodeRequest,
    resetPasswordRequest,
    profileRequest,
    updateMyProfile as updateProfileRequest
} from '../../../shared/api'

const initialUser = JSON.parse(localStorage.getItem('user')) || null
const initialToken = localStorage.getItem('token') || null

export const useAuthStore = create((set) => ({
    user: initialUser,
    token: initialToken,
    loading: false,
    error: null,

    login: async (data) => {
        try {
        set({ loading: true, error: null })
        const res = await loginRequest(data)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        set({ user: res.data.user, token: res.data.token, loading: false })
        return { success: true, user: res.data.user }
        } catch (err) {
        set({ error: err.response?.data?.message || 'Error de autenticación', loading: false })
        return { success: false, error: err.response?.data?.message || 'Error de autenticación' }
        }
    },

    register: async (data) => {
        try {
        set({ loading: true, error: null })
        const res = await registerRequest(data)
        set({ loading: false })
        return { success: true, data: res.data }
        } catch (err) {
        set({ error: err.response?.data?.message || 'Error en registro', loading: false })
        return { success: false, error: err.response?.data?.message || 'Error en registro' }
        }
    },

    // ── PASO 1: Solicitar código al correo ──────────────────────────────────────
    requestPasswordReset: async (email) => {
        try {
        set({ loading: true, error: null })
        await requestPasswordResetRequest({ email })
        set({ loading: false })
        return { success: true }
        } catch (err) {
        const message = err.response?.data?.message || 'Error al enviar el código'
        set({ error: message, loading: false })
        return { success: false, error: message }
        }
    },

    // ── PASO 2: Verificar código ────────────────────────────────────────────────
    verifyResetCode: async (email, code) => {
        try {
        set({ loading: true, error: null })
        await verifyResetCodeRequest({ email, code })
        set({ loading: false })
        return { success: true }
        } catch (err) {
        const message = err.response?.data?.message || 'Código incorrecto o expirado'
        set({ error: message, loading: false })
        return { success: false, error: message }
        }
    },

    // ── PASO 3: Cambiar contraseña ──────────────────────────────────────────────
    resetPassword: async (email, newPassword) => {
        try {
        set({ loading: true, error: null })
        await resetPasswordRequest({ email, newPassword })
        set({ loading: false })
        return { success: true }
        } catch (err) {
        const message = err.response?.data?.message || 'Error al actualizar la contraseña'
        set({ error: message, loading: false })
        return { success: false, error: message }
        }
    },

    getProfile: async () => {
        try {
        const res = await profileRequest()
        set({ user: res.data.user })
        localStorage.setItem('user', JSON.stringify(res.data.user))
        } catch {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        set({ user: null, token: null })
        }
    },

    updateProfile: async (data) => {
        try {
        set({ loading: true, error: null })
        const res = await updateProfileRequest(data)
        const updatedUser = res.data.user
        localStorage.setItem('user', JSON.stringify(updatedUser))
        set({ user: updatedUser, loading: false })
        return { success: true }
        } catch (err) {
        set({ error: err.response?.data?.message || 'Error al actualizar perfil', loading: false })
        return { success: false }
        }
    },

    logout: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        set({ user: null, token: null })
    },
}))