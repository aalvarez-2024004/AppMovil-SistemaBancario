import Deposit from "./deposit.model.js";
import Account from '../accounts/account.model.js';
import { convertirMoneda } from "../services/divisas-service.js";
import Transaction from '../transactions/transaction.model.js';

export const createDeposit = async (req, res) => {
    try {
        const {accountId, amount , currency} = req.body;

        // Validar campos
        if ( !accountId || !amount) {
            return res.status(400).json({
                success: false,
                message: 'Datos incompletos'
            });
        }

        const amountNumber = Number(amount);

        if (isNaN(amountNumber) || amountNumber <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Monto inválido'
            });
        }

        const toAccount = await Account.findById(accountId);


        if (!toAccount) {
            return res.status(404).json({
                success: false,
                message: 'Cuenta que recibe el depósito no encontrada'
            });
        }


        //Conversión de moneda si aplica
        let finalAmount = amountNumber;

         if (currency && currency !== toAccount.currency) {
            try {
                const conversion = await convertirMoneda(
                    currency,
                    toAccount.currency,
                    amountNumber
                );

                if (!conversion || conversion.montoConvertido === undefined) {
                    return res.status(503).json({
                        success: false,
                        message: 'Error en la conversión de moneda, intenta de nuevo'
                    });
                }

                finalAmount = conversion.montoConvertido;

            } catch (error) {
                console.error("ERROR DIVISAS (deposito):", error.message);
                return res.status(503).json({
                    success: false,
                    message: 'Servicio de conversión de moneda no disponible, intenta de nuevo'
                });
            }
        }


        toAccount.balance += finalAmount;
        await toAccount.save();


        
        const deposit = new Deposit({
            accountId: toAccount._id,
            accountNumber: toAccount.accountNumber,
            amount: finalAmount,
            ownerId: toAccount.ownerId,
            estado: 'COMPLETADO'
        });

        await deposit.save();

        const transaction = new Transaction({
            type: 'DEPOSITO',
            amountSent: finalAmount,
            amountReceived: finalAmount,
            currencyFrom: toAccount.currency,
            currencyTo: toAccount.currency,
            exchangeRate: 1,
            fromAccount: null,
            toAccount: toAccount._id,
            ownerId: toAccount.ownerId,
            description: 'Depósito realizado por administrador'
        });

        await transaction.save();

        deposit.transactionId = transaction._id;
        await deposit.save();

        return res.status(201).json({
            success: true,
            message: 'Depósito realizado',
            deposit,
            transaction
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al realizar el depósito',
            error: err.message
        });
    }
};


export const getDeposits = async (req, res) => {
    try {
        const deposits = await Deposit.find();

        return res.status(200).send({
            success: true,
            deposits
        });

    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Error al obtener depósitos",
            error: err.message
        });
    }
};

export const revertDeposit = async (req, res) => {
    try {
        const { id } = req.params;

        const deposit = await Deposit.findById(id);
        if (!deposit) {
            return res.status(404).json({
                success: false,
                message: 'Depósito no encontrado'
            });
        }

        if (deposit.estado === 'REVERTIDO') {
            return res.status(400).json({
                success: false,
                message: 'Depósito ya revertido'
            });
        }

        const diff = (Date.now() - deposit.fecha) / 1000;
        if (diff > 180) {
            return res.status(400).json({
                success: false,
                message: 'Solo se puede revertir antes dede 3 minutos'
            });
        }

        // Obtener cuentas involucradas
        const toAccount = await Account.findById(deposit.accountId);

        if (!toAccount) {
            return res.status(404).json({
                success: false,
                message: 'Cuenta no encontrada'
            });
        }

        // Revertir el deposito
        toAccount.balance -= deposit.amount;
        await toAccount.save();

        deposit.estado = 'REVERTIDO';
        await deposit.save();

        if (deposit.transactionId) {
            await Transaction.findByIdAndDelete(deposit.transactionId);
        }

        return res.json({
            success: true,
            message: 'Depósito revertido',
            deposit
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al revertir el deposito',
            error: err.message
        });
    }
};

// Buscar depósito por ID (ADMIN)
export const getDepositById = async (req, res) => {
    try {
        const { id } = req.params;
        const deposit = await Deposit.findById(id).populate('accountId');

        if (!deposit) return res.status(404).json({ 
            success: false, 
            message: 'No encontrado' 
        });

        res.status(200).json({ 
            success: true, 
            data: deposit 
        });

    } catch (error) { 
        res.status(500).json({ 
            success: false, 
            message: error.message 
        }); 
    }
};

export const updateDeposit = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const updated = await Deposit.findByIdAndUpdate(id, { estado }, { new: true });

        if (!updated) return res.status(404).json({ 
            success: false, 
            message: 'No encontrado' 
        });

        res.status(200).json({ 
            success: true, 
            data: updated 
        });

    } catch (error) { 
        res.status(400).json({ 
            success: false, 
            message: error.message 
        }); 
    }
};

export const deleteDeposit = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Deposit.findByIdAndDelete(id);

        if (!deleted) return res.status(404).json({ 
            success: false, 
            message: 'No encontrado' });

        res.status(200).json({ 
            success: true, 
            message: 'Eliminado' 
        });

    } catch (error) { 
        res.status(500).json({ 
            success: false, 
            message: error.message 
        }); 
    }
};

export const getMyDeposits = async (req, res) => {
    try {
        const { accountId } = req.params;
        const deposits = await Deposit.find({ 
            accountId,
            estado: 'COMPLETADO'
        }).sort({ fecha: -1 });

        return res.status(200).json({
            success: true,
            deposits
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener depósitos',
            error: err.message
        });
    }
};