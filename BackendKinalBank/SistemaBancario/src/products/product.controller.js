'use strict';

import mongoose from 'mongoose';
import Product from './product.model.js';
import Transaction from '../transactions/transaction.model.js';
import Account from '../accounts/account.model.js';
import Point from '../points/point.model.js';
import { accumulatePoints, deductPoints } from '../points/point.controller.js';
import { convertirMoneda } from '../services/divisas-service.js';

export const createProduct = async (req, res) => {
    try {
        const {
            name, description, type, price, status,
            pointsRequired, discountPercentage, pointsPerPurchase,
            redeemable, category
        } = req.body;

        if (!name || !description || !type) {
            return res.status(400).json({
                success: false,
                message: 'Nombre, descripción y tipo son obligatorios'
            });
        }

        const product = await Product.create({
            name,
            description,
            type,
            price: price ?? 0,
            status: status ?? true,
            pointsRequired: pointsRequired ?? 0,
            discountPercentage: discountPercentage ?? 0,
            pointsPerPurchase: pointsPerPurchase ?? 5,
            redeemable: redeemable ?? true,
            category: category ?? 'OTROS',
            createdBy: req.user.id
        });

        return res.status(201).json({
            success: true,
            message: 'Producto creado correctamente',
            product
        });

    } catch (error) {
        console.error('Error al crear producto:', error);
        return res.status(500).json({ success: false, message: 'Error al crear producto' });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ status: true });

        let clientPoints = 0;
        if (req.user?.id) {
            const pointRecord = await Point.findOne({ ownerId: req.user.id });
            clientPoints = pointRecord?.totalPoints ?? 0;
        }

        const enrichedProducts = products.map(p => {
            const prod = p.toObject();
            prod.clientCanRedeem   = p.redeemable && p.pointsRequired > 0 && clientPoints >= p.pointsRequired;
            prod.clientHasDiscount = p.redeemable && p.discountPercentage > 0 && clientPoints > 0 && clientPoints < p.pointsRequired;
            prod.clientPoints      = clientPoints;
            return prod;
        });

        return res.json({ success: true, products: enrichedProducts, clientPoints });

    } catch (error) {
        console.error('Error al obtener productos:', error);
        return res.status(500).json({ success: false, message: 'Error al obtener productos' });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'ID inválido' });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }

        const allowed = ['name', 'description', 'type', 'price', 'status',
            'pointsRequired', 'discountPercentage', 'pointsPerPurchase',
            'redeemable', 'category'];

        allowed.forEach(field => {
            if (req.body[field] !== undefined) product[field] = req.body[field];
        });

        await product.save();

        return res.json({ success: true, message: 'Producto actualizado correctamente', product });

    } catch (error) {
        console.error('Error al actualizar producto:', error);
        return res.status(500).json({ success: false, message: 'Error al actualizar producto' });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'ID inválido' });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }

        product.status = false;
        await product.save();

        return res.json({ success: true, message: 'Producto desactivado correctamente', product });

    } catch (error) {
        console.error('Error al eliminar producto:', error);
        return res.status(500).json({ success: false, message: 'Error al eliminar producto' });
    }
};

export const buyProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { accountId } = req.body;

        if (!accountId) {
            return res.status(400).json({ success: false, message: 'Debes seleccionar una cuenta' });
        }

        const product = await Product.findById(id);
        if (!product || !product.status) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado o inactivo' });
        }

        const account = await Account.findById(accountId);
        if (!account) {
            return res.status(404).json({ success: false, message: 'Cuenta no encontrada' });
        }

        if (account.ownerId !== req.user.id) {
            return res.status(403).json({ success: false, message: 'La cuenta no te pertenece' });
        }

        if (account.status !== 'ACTIVA') {
            return res.status(400).json({ success: false, message: 'La cuenta está bloqueada' });
        }

        let priceInAccountCurrency = product.price;
        let exchangeRate = 1;

        if (account.currency !== 'GTQ') {
            const conversion = await convertirMoneda('GTQ', account.currency, product.price);
            priceInAccountCurrency = conversion?.montoConvertido ?? product.price;
            exchangeRate = conversion?.tasa ?? 1;
        }

        if (account.balance < priceInAccountCurrency) {
            return res.status(400).json({
                success: false,
                message: `Saldo insuficiente. Necesitas ${priceInAccountCurrency.toFixed(2)} ${account.currency} y tienes ${account.balance.toFixed(2)} ${account.currency}`
            });
        }

        account.balance -= priceInAccountCurrency;
        await account.save();

        const transaction = await Transaction.create({
            type: 'COMPRA',
            amountSent: priceInAccountCurrency,   
            amountReceived: product.price,        
            currencyFrom: account.currency,
            currencyTo: 'GTQ',
            exchangeRate,
            fromAccount: account._id,
            toAccount: null,
            ownerId: req.user.id,
            description: `Compra de producto: ${product.name}`,
        });

        const pointsEarned = product.pointsPerPurchase;
        if (pointsEarned > 0) {
            await accumulatePoints({
                ownerId: req.user.id,
                points: pointsEarned,
                description: `Puntos por compra: ${product.name}`,
                referenceId: transaction._id.toString(),
                type: 'BONIFICACION'
            });
        }

        return res.status(201).json({
            success: true,
            message: 'Compra realizada correctamente',
            transaction,
            pointsEarned,
            newBalance: account.balance
        });

    } catch (error) {
        console.error('Error al comprar producto:', error);
        return res.status(500).json({ success: false, message: 'Error al procesar la compra' });
    }
};

export const redeemProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product || !product.status) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado o inactivo' });
        }

        if (!product.redeemable || product.pointsRequired === 0) {
            return res.status(400).json({ success: false, message: 'Este producto no es canjeable con puntos' });
        }

        // Descontar puntos
        const result = await deductPoints({
            ownerId: req.user.id,
            points: product.pointsRequired,
            description: `Canje de producto: ${product.name}`,
            referenceId: id
        });

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message || 'Puntos insuficientes para canjear este producto'
            });
        }

        return res.status(201).json({
            success: true,
            message: `¡Producto canjeado exitosamente! Usaste ${product.pointsRequired} puntos`,
            product: { name: product.name, description: product.description, category: product.category },
            pointsUsed: product.pointsRequired,
            pointsRemaining: result.remaining
        });

    } catch (error) {
        console.error('Error al canjear producto:', error);
        return res.status(500).json({ success: false, message: 'Error al canjear producto' });
    }
};

export const buyWithDiscount = async (req, res) => {
    try {
        const { id } = req.params;
        const { accountId } = req.body;

        if (!accountId) {
            return res.status(400).json({ success: false, message: 'Debes seleccionar una cuenta' });
        }

        const product = await Product.findById(id);
        if (!product || !product.status) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }

        if (!product.redeemable || product.discountPercentage === 0) {
            return res.status(400).json({ success: false, message: 'Este producto no tiene descuento por puntos' });
        }

        const account = await Account.findById(accountId);
        if (!account) {
            return res.status(404).json({ success: false, message: 'Cuenta no encontrada' });
        }

        if (account.ownerId !== req.user.id) {
            return res.status(403).json({ success: false, message: 'La cuenta no te pertenece' });
        }

        if (account.status !== 'ACTIVA') {
            return res.status(400).json({ success: false, message: 'La cuenta está bloqueada' });
        }

        const pointRecord = await Point.findOne({ ownerId: req.user.id });
        if (!pointRecord || pointRecord.totalPoints === 0) {
            return res.status(400).json({ success: false, message: 'No tienes puntos disponibles para descuento' });
        }

        // Descuento y precio final se calculan en GTQ (moneda base del producto)
        const discountAmount = (product.price * product.discountPercentage) / 100;
        const finalPriceGTQ  = product.price - discountAmount;

        // Convertimos el precio final a la moneda de la cuenta, si aplica
        let finalPriceInAccountCurrency = finalPriceGTQ;
        let exchangeRate = 1;

        if (account.currency !== 'GTQ') {
            const conversion = await convertirMoneda('GTQ', account.currency, finalPriceGTQ);
            finalPriceInAccountCurrency = conversion?.montoConvertido ?? finalPriceGTQ;
            exchangeRate = conversion?.tasa ?? 1;
        }

        if (account.balance < finalPriceInAccountCurrency) {
            return res.status(400).json({
                success: false,
                message: `Saldo insuficiente. Con descuento necesitas ${finalPriceInAccountCurrency.toFixed(2)} ${account.currency} y tienes ${account.balance.toFixed(2)} ${account.currency}`
            });
        }

        const pointsToUse = Math.min(pointRecord.totalPoints, Math.ceil(discountAmount));

        account.balance -= finalPriceInAccountCurrency;
        await account.save();

        const transaction = await Transaction.create({
            type: 'COMPRA',
            amountSent: finalPriceInAccountCurrency,
            amountReceived: finalPriceGTQ,
            currencyFrom: account.currency,
            currencyTo: 'GTQ',
            exchangeRate,
            fromAccount: account._id,
            toAccount: null,
            ownerId: req.user.id,
            description: `Compra con ${product.discountPercentage}% descuento: ${product.name}`,
        });

        await deductPoints({
            ownerId: req.user.id,
            points: pointsToUse,
            description: `Descuento ${product.discountPercentage}% en: ${product.name}`,
            referenceId: transaction._id.toString()
        });

        return res.status(201).json({
            success: true,
            message: `Compra con descuento exitosa. Ahorraste Q${discountAmount.toFixed(2)}`,
            originalPrice: product.price,
            discountPercentage: product.discountPercentage,
            finalPrice: finalPriceGTQ,
            pointsUsed: pointsToUse,
            transaction,
            newBalance: account.balance
        });

    } catch (error) {
        console.error('Error al comprar con descuento:', error);
        return res.status(500).json({ success: false, message: 'Error al procesar compra con descuento' });
    }
};