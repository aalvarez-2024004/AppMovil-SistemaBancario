'use strict';

import Transaction from './transaction.model.js';
import Account from '../accounts/account.model.js';
import { convertirMoneda } from "../services/divisas-service.js";
import { accumulatePoints } from '../points/point.controller.js';

const AUTH_BANCO_URL = process.env.AUTH_BANCO_URL; 


const POINTS_PER_QUETZAL = 1 / 100; 

const calcularPuntos = (monto) => Math.floor(monto * POINTS_PER_QUETZAL);

export const createTransaction = async (req, res) => {
    try {
        const { type, amount, fromAccount, toAccount, description } = req.body;

        if (!type || !amount || !fromAccount || !description) {
            return res.status(400).json({
                success: false,
                message: "Datos incompletos para la transacción"
            });
        }

        const amountNumber = Number(amount);

        if (isNaN(amountNumber) || amountNumber <= 0) {
            return res.status(400).json({
                success: false,
                message: "Monto inválido"
            });
        }

        const sourceAccount = await Account.findOne({ accountNumber: fromAccount });

        if (!sourceAccount) {
            return res.status(404).json({
                success: false,
                message: "Cuenta de origen no encontrada"
            });
        }

        const destinationAccount = toAccount
            ? await Account.findOne({ accountNumber: toAccount })
            : null;

        if (toAccount && !destinationAccount) {
            return res.status(404).json({
                success: false,
                message: "Cuenta de destino no encontrada"
            });
        }

        if (type === "TRANSFERENCIA" && amountNumber > 2000) {
            return res.status(400).json({
                success: false,
                message: `No puede transferir más de 2,000 ${sourceAccount.currency} por operación`
            });
        }

        if (type === "TRANSFERENCIA") {
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);

            const transaccionesHoy = await Transaction.find({
                fromAccount: sourceAccount._id,
                type: "TRANSFERENCIA",
                createdAt: { $gte: startOfDay, $lte: endOfDay }
            });

            const totalHoy = transaccionesHoy.reduce(
                (sum, t) => sum + t.amountSent, 0
            );

            if (totalHoy + amountNumber > 10000) {
                const disponible = 10000 - totalHoy;
                return res.status(400).json({
                    success: false,
                    message: `Límite diario de 10,000 ${sourceAccount.currency} alcanzado. Disponible hoy: ${disponible.toFixed(2)} ${sourceAccount.currency}`
                });
            }
        }

        if (sourceAccount.balance < amountNumber) {
            return res.status(400).json({
                success: false,
                message: "Saldo insuficiente"
            });
        }

        let finalAmount = amountNumber;
        let exchangeRate = 1;

        if (destinationAccount && sourceAccount.currency !== destinationAccount.currency) {
            try {
                const conversion = await convertirMoneda(
                    sourceAccount.currency,
                    destinationAccount.currency,
                    amountNumber
                );

                console.log(" CONVERSIÓN:", conversion);

                finalAmount = conversion?.montoConvertido ?? amountNumber;
                exchangeRate = conversion?.tasa ?? 1;

            } catch (error) {
                console.error("ERROR DIVISAS:", error.message);
                finalAmount = amountNumber;
                exchangeRate = 1;
            }
        }

        sourceAccount.balance -= amountNumber;

        if (destinationAccount) {
            destinationAccount.balance += finalAmount;
            await destinationAccount.save();
        }

        await sourceAccount.save();

        const transaction = new Transaction({
            type,
            amountSent: amountNumber,
            amountReceived: finalAmount,
            currencyFrom: sourceAccount.currency,
            currencyTo: destinationAccount?.currency || sourceAccount.currency,
            exchangeRate,
            fromAccount: sourceAccount._id,
            toAccount: destinationAccount ? destinationAccount._id : null,
            description,
            ownerId: req.user.id
        });

        await transaction.save();

        const puntosGanados = calcularPuntos(amountNumber);
        if (puntosGanados > 0) {
            const tipoDescripcion = type === 'TRANSFERENCIA'
                ? `Transferencia de Q${amountNumber.toFixed(2)}`
                : type === 'DEPOSITO'
                    ? `Depósito de Q${amountNumber.toFixed(2)}`
                    : `Operación de Q${amountNumber.toFixed(2)}`;

            await accumulatePoints({
                ownerId: req.user.id,
                points: puntosGanados,
                description: `Puntos por ${tipoDescripcion}`,
                referenceId: transaction._id.toString(),
                type: 'ACUMULACION'
            });

            console.log(`Puntos acumulados: ${puntosGanados} para usuario ${req.user.id}`);
        }

        return res.status(201).json({
            success: true,
            message: "Transacción realizada con éxito",
            transaction,
            pointsEarned: puntosGanados
        });

    } catch (error) {
        console.error(" CREATE TRANSACTION ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Error interno al realizar la transacción",
            error: error.message
        });
    }
};

export const getTransactions = async (req, res) => {
    const transactions = await Transaction.find()
        .populate('fromAccount', 'accountNumber balance')
        .populate('toAccount', 'accountNumber');

    res.json({
        success: true,
        data: transactions
    });
};

export const getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findById(id)
            .populate('fromAccount')
            .populate('toAccount');

        if (!transaction) {
            return res.status(404).json({ success: false, message: 'Transacción no encontrada' });
        }

        res.status(200).json({ success: true, data: transaction });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;

        if (!description) {
            return res.status(400).json({
                success: false,
                message: 'Debe enviar una descripción'
            });
        }

        const transaction = await Transaction.findById(id);

        if (!transaction) {
            return res.status(400).json({
                success: false,
                message: 'Transacción no encontrada'
            });
        }

        const fiveMinutes = 5 * 60 * 1000;
        const now = new Date();
        const createdAt = new Date(transaction.createdAt);

        if (now - createdAt > fiveMinutes) {
            return res.status(400).json({
                success: false,
                message: 'Solo puede modificar la transacción dentro de los primeros 5 minutos'
            });
        }

        transaction.description = description;
        await transaction.save();

        res.status(200).json({
            success: true, data: transaction
        });
    } catch (error) {
        res.status(400).json({
            success: false, message: error.message
        });
    }
};

export const getAccountsByActivity = async (req, res) => {
    try {
        const { order = 'desc' } = req.query;

        const result = await Transaction.aggregate([
            {
                $group: {
                    _id: '$fromAccount',
                    totalMovimientos: { $sum: 1 }
                }
            },
            { $sort: { totalMovimientos: order === 'asc' ? 1 : -1 } },
            { $limit: 20 },
            {
                $lookup: {
                    from: 'accounts',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'account'
                }
            },
            { $unwind: '$account' }
        ]);

        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAccountTransactions = async (req, res) => {
    try {
        const { accountId } = req.params;
        const { limit = 5 } = req.query;

        const transactions = await Transaction.find({
            $or: [
                { fromAccount: accountId },
                { toAccount: accountId }
            ]
        })
        .populate('fromAccount', 'accountNumber currency')
        .populate('toAccount', 'accountNumber currency')
        .sort({ createdAt: -1 })
        .limit(Number(limit));

        res.json({ success: true, data: transactions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findByIdAndDelete(id);

        if (!transaction) {
            return res.status(404).json({
                success: false, message: 'Transacción no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Registro de transacción eliminado'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getMyTransactions = async (req, res) => {
    try {
        const userId = req.user.id;
        const token  = req.headers.authorization;

        const userAccounts = await Account.find({ ownerId: userId }).select('_id');
        const accountIds = userAccounts.map(a => a._id);

        const filter = {
            $or: [
                { fromAccount: { $in: accountIds } },
                { toAccount:   { $in: accountIds } }
            ]
        };

        const page  = Math.max(1, parseInt(req.query.page)  || 1);
        const limit = Math.max(1, parseInt(req.query.limit) || 10);
        const skip  = (page - 1) * limit;

        const [transactions, totalRecords] = await Promise.all([
            Transaction.find(filter)
                .populate('fromAccount', 'accountNumber currency ownerId')
                .populate('toAccount',   'accountNumber currency ownerId')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Transaction.countDocuments(filter)
        ]);

        // Recolectar los ownerId únicos de las cuentas involucradas
        const ownerIdsSet = new Set();
        transactions.forEach((t) => {
            if (t.fromAccount?.ownerId) ownerIdsSet.add(t.fromAccount.ownerId);
            if (t.toAccount?.ownerId)   ownerIdsSet.add(t.toAccount.ownerId);
        });

        // Pedir los nombres a AuthBanco vía HTTP
        let nameById = {};
        if (ownerIdsSet.size > 0) {
            try {
                const response = await fetch(`${AUTH_BANCO_URL}/users/by-ids`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify({ ids: Array.from(ownerIdsSet) })
                });

                const result = await response.json();
                if (result.success) {
                    result.users.forEach((u) => { nameById[u.Id] = u.Name; });
                }
            } catch (err) {
                console.error('Error consultando AuthBanco:', err.message);
            }
        }

        const enriched = transactions.map((t) => {
            const obj = t.toObject();
            if (obj.fromAccount?.ownerId) {
                obj.fromAccount.holderName = nameById[obj.fromAccount.ownerId] || null;
            }
            if (obj.toAccount?.ownerId) {
                obj.toAccount.holderName = nameById[obj.toAccount.ownerId] || null;
            }
            return obj;
        });

        return res.status(200).json({
            success: true,
            data: enriched,
            pagination: {
                currentPage:  page,
                totalPages:   Math.ceil(totalRecords / limit) || 1,
                totalRecords,
                limit
            }
        });

    } catch (error) {
        console.error(' GET MY TRANSACTIONS ERROR:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener transacciones',
            error: error.message
        });
    }
};