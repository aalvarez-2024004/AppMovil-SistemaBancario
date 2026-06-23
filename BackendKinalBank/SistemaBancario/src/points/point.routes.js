'use strict';

import { Router } from 'express';
import { getMyPoints, getClientPoints, adjustPoints } from './point.controller.js';
import { validateJWT } from '../middlewares/validate-jwt.js';
import { validateAdmin } from '../middlewares/validate-admin.js';
import { validateClient } from '../middlewares/validate-client.js';

const router = Router();

/**
 * @swagger
 * /api/v1/points/me:
 *   get:
 *     summary: Obtener mis puntos y historial (CLIENTE)
 *     tags: [Points]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Puntos del cliente autenticado
 */
router.get('/me', validateJWT, validateClient, getMyPoints);

/**
 * @swagger
 * /api/v1/points/client/{clientId}:
 *   get:
 *     summary: Ver puntos de un cliente (ADMIN)
 *     tags: [Points]
 *     security:
 *       - bearerAuth: []
 */
router.get('/client/:clientId', validateJWT, validateAdmin, getClientPoints);

/**
 * @swagger
 * /api/v1/points/adjust/{clientId}:
 *   post:
 *     summary: Ajuste manual de puntos (ADMIN)
 *     tags: [Points]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               points:
 *                 type: number
 *                 example: 50
 *                 description: "Positivo para agregar, negativo para quitar"
 *               description:
 *                 type: string
 *                 example: "Bonificación por apertura de cuenta"
 */
router.post('/adjust/:clientId', validateJWT, validateAdmin, adjustPoints);

export default router;