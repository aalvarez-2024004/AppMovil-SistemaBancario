'use strict';

import { Router } from 'express';
import {
    register,
    login,
    requestPasswordReset,
    verifyResetCode,
    resetPassword,
} from './auth.controller.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

// Flujo de recuperación de contraseña en 3 pasos
router.post('/forgot-password/request', requestPasswordReset); // Paso 1: solicitar código
router.post('/forgot-password/verify', verifyResetCode);       // Paso 2: verificar código
router.put('/forgot-password/reset', resetPassword);           // Paso 3: cambiar contraseña

export default router;