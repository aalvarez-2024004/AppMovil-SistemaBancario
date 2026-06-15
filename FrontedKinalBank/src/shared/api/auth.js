import { axiosAuth } from "./api"

export const loginRequest = (data) =>
  axiosAuth.post('/auth/login', data)

export const registerRequest = (data) =>
  axiosAuth.post('/auth/register', data)

// ── PASO 1: Solicitar código de recuperación enviando el email ────────────────
export const requestPasswordResetRequest = (data) =>
  axiosAuth.post('/auth/forgot-password/request', data)

// ── PASO 2: Verificar el código de 6 dígitos enviado al correo ────────────────
export const verifyResetCodeRequest = (data) =>
  axiosAuth.post('/auth/forgot-password/verify', data)

// ── PASO 3: Guardar la nueva contraseña una vez verificado el código ─────────
export const resetPasswordRequest = (data) =>
  axiosAuth.put('/auth/forgot-password/reset', data)

export const profileRequest = () =>
  axiosAuth.get('/auth/profile')

export const updateProfileRequest = (data) =>
  axiosAuth.put("/users/me", data)