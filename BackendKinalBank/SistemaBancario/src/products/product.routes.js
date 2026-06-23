'use strict';

import { Router } from 'express';
import {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    buyProduct,
    redeemProduct,
    buyWithDiscount
} from './product.controller.js';
import { validateJWT } from '../middlewares/validate-jwt.js';
import { validateAdmin } from '../middlewares/validate-admin.js';
import { validateClient } from '../middlewares/validate-client.js';

const router = Router();

/**
 * @swagger
 * /api/v1/products/create:
 *   post:
 *     summary: Crear producto o servicio (ADMIN)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [PRODUCTO, SERVICIO]
 *               price:
 *                 type: number
 *               pointsRequired:
 *                 type: number
 *                 description: "Puntos para obtenerlo GRATIS (0 = no canjeable)"
 *               discountPercentage:
 *                 type: number
 *                 description: "% de descuento al usar puntos parciales"
 *               pointsPerPurchase:
 *                 type: number
 *                 description: "Puntos que gana el cliente al comprar con dinero"
 *               redeemable:
 *                 type: boolean
 *               category:
 *                 type: string
 *                 enum: [SEGUROS, PRESTAMOS, TARJETAS, BENEFICIOS, SERVICIOS_DIGITALES, OTROS]
 *     responses:
 *       201:
 *         description: Producto creado
 */
router.post('/create', validateJWT, validateAdmin, createProduct);

/**
 * @swagger
 * /api/v1/products/listar:
 *   get:
 *     summary: Obtener productos activos (público, pero con JWT opcional para info de puntos del cliente)
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos con info de puntos del cliente
 */
// JWT opcional - si viene lo usa para enricher data, si no, igual funciona
router.get('/listar', (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (authHeader) {
        return validateJWT(req, res, next);
    }
    next();
}, getProducts);

/**
 * @swagger
 * /api/v1/products/update/{id}:
 *   put:
 *     summary: Actualizar producto (ADMIN)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 */
router.put('/update/:id', validateJWT, validateAdmin, updateProduct);

/**
 * @swagger
 * /api/v1/products/delete/{id}:
 *   delete:
 *     summary: Desactivar producto (ADMIN)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/delete/:id', validateJWT, validateAdmin, deleteProduct);

/**
 * @swagger
 * /api/v1/products/buy/{id}:
 *   post:
 *     summary: Comprar producto con dinero y acumular puntos (CLIENTE)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountId:
 *                 type: string
 *                 description: ID de la cuenta con la que paga
 */
router.post('/buy/:id', validateJWT, validateClient, buyProduct);

/**
 * @swagger
 * /api/v1/products/redeem/{id}:
 *   post:
 *     summary: Canjear producto GRATIS con puntos (CLIENTE)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     description: Usa los puntos acumulados para obtener el producto sin costo monetario
 */
router.post('/redeem/:id', validateJWT, validateClient, redeemProduct);

/**
 * @swagger
 * /api/v1/products/buy-discount/{id}:
 *   post:
 *     summary: Comprar con descuento usando puntos (CLIENTE)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountId:
 *                 type: string
 */
router.post('/buy-discount/:id', validateJWT, validateClient, buyWithDiscount);

export default router;