'use strict';
import { Router } from 'express';
import {
    getPendingUsers,
    getApprovedUsers,
    approveUser,
    denyUser,
    getUsersByIds,
    getMyProfile,
    updateMyProfile
} from './user.controller.js';

import { validateJWT } from '../../middlewares/validate-JWT.js';
import { validateAdmin } from '../../middlewares/validate-role.js';

const router = Router();

router.get('/me', validateJWT, getMyProfile);

router.put('/me', validateJWT, updateMyProfile);

router.get('/pending', validateJWT, validateAdmin, getPendingUsers);

router.get('/approved', validateJWT, validateAdmin, getApprovedUsers);

router.put('/approve', validateJWT, validateAdmin, approveUser);

router.delete('/deny/:id', validateJWT, validateAdmin, denyUser);

router.post('/by-ids', validateJWT, validateAdmin, getUsersByIds);

export default router;