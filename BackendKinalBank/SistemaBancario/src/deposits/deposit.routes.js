import { Router } from "express";
import { createDeposit, getDeposits, revertDeposit, getDepositById, updateDeposit, deleteDeposit, getMyDeposits} from "./deposit.controller.js";
import { validateJWT } from '../middlewares/validate-jwt.js';
import { validateClient } from '../middlewares/validate-client.js';
import { validateAdmin } from "../middlewares/validate-admin.js";
const router = Router();

router.post(
    '/create',
    validateJWT, 
    validateAdmin,
    createDeposit
);

//los depositos solo las puede ver el admin
router.get(
    '/', 
    validateJWT,
    validateAdmin,
    getDeposits
);

router.get(
    '/my/:accountId',
    validateJWT,
    validateClient,
    getMyDeposits  
);

router.put(
    '/revert/:id',
    validateJWT, 
    validateAdmin,
    revertDeposit
);

router.get(
    '/:id', 
    validateJWT, 
    validateAdmin, 
    getDepositById
);

router.put(
    '/update/:id', 
    validateJWT, 
    validateAdmin, 
    updateDeposit
);

router.delete(
    '/:id', 
    validateJWT, 
    validateAdmin, 
    deleteDeposit
);

export default router;
