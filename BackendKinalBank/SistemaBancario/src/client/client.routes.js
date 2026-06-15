'use strict';

import { Router } from 'express';
import { getMyAccounts, getMyTransactions } from './client.controller.js';
import { validateJWT } from '../middlewares/validate-jwt.js';
import { validateClient } from '../middlewares/validate-client.js';

const router = Router();

// GET /kinalBank/v1/client/accounts
router.get(
    '/accounts',
    validateJWT,
    validateClient,
    getMyAccounts
);

// GET /kinalBank/v1/client/transactions?page=1&limit=10
router.get(
    '/transactions',
    validateJWT,
    validateClient,
    getMyTransactions
);

export default router;