import { Router } from "express";
import {
    createTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
    getMyTransactions ,
    getAccountsByActivity,
    getAccountTransactions
} from "./transaction.controller.js";
import { validateJWT }    from "../middlewares/validate-jwt.js";
import { validateClient } from "../middlewares/validate-client.js";
import { validateAdmin }  from "../middlewares/validate-admin.js";

const router = new Router();

router.post(
    '/create',
    validateJWT,
    validateClient,
    createTransaction
);

router.get(
    '/my-transactions',
    validateJWT,
    validateClient,
    getMyTransactions
);

// Cuentas con más movimientos
router.get(
    '/by-activity',
    validateJWT,
    validateAdmin,
    getAccountsByActivity
);

// Últimos movimientos de una cuenta
router.get(
    '/account/:accountId',
    validateJWT,
    validateAdmin,
    getAccountTransactions
);

router.get(
    '/listar',
    validateJWT,
    validateAdmin,
    getTransactions
);

router.get(
    '/:id',
    validateJWT,
    validateClient,
    getTransactionById
);

router.put(
    '/:id',
    validateJWT,
    validateClient,
    updateTransaction
);

router.delete(
    '/:id',
    validateJWT,
    validateClient,
    deleteTransaction
);

export default router;