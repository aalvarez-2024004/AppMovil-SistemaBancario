'use strict';

import Account from '../accounts/account.model.js';
import Transaction from '../transactions/transaction.model.js';

// GET /kinalBank/v1/client/accounts
// Retorna todas las cuentas del cliente autenticado
export const getMyAccounts = async (req, res) => {
    try {
        const ownerId = req.user.id;

        const accounts = await Account.find({ ownerId }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: accounts
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener las cuentas',
            error: error.message
        });
    }
};

// GET /kinalBank/v1/client/transactions?page=1&limit=10
// Retorna todas las transacciones donde el cliente es el propietario (ownerId)
export const getMyTransactions = async (req, res) => {
    try {
        const ownerId = req.user.id;
        const { page = 1, limit = 10 } = req.query;

        const pageNum  = Math.max(1, parseInt(page));
        const limitNum = Math.max(1, parseInt(limit));

        const filter = { ownerId };

        const [transactions, total] = await Promise.all([
            Transaction.find(filter)
                .populate('fromAccount', 'accountNumber currency')
                .populate('toAccount',   'accountNumber currency')
                .sort({ createdAt: -1 })
                .skip((pageNum - 1) * limitNum)
                .limit(limitNum),
            Transaction.countDocuments(filter)
        ]);

        return res.status(200).json({
            success: true,
            data: transactions,
            pagination: {
                currentPage:  pageNum,
                totalPages:   Math.ceil(total / limitNum),
                totalRecords: total,
                limit:        limitNum
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener las transacciones',
            error: error.message
        });
    }
};