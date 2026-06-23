'use strict';

import Point from './point.model.js';

export const getMyPoints = async (req, res) => {
    try {
        let pointRecord = await Point.findOne({ ownerId: req.user.id });

        if (!pointRecord) {
            pointRecord = await Point.create({
                ownerId: req.user.id,
                totalPoints: 0,
                lifetimePoints: 0,
                history: []
            });
        }

        return res.json({
            success: true,
            points: {
                total: pointRecord.totalPoints,
                lifetime: pointRecord.lifetimePoints,
                history: pointRecord.history.slice(-20).reverse() // últimos 20
            }
        });

    } catch (error) {
        console.error('Error al obtener puntos:', error);
        return res.status(500).json({ success: false, message: 'Error al obtener puntos' });
    }
};

export const getClientPoints = async (req, res) => {
    try {
        const { clientId } = req.params;
        const pointRecord = await Point.findOne({ ownerId: clientId });

        return res.json({
            success: true,
            points: pointRecord
                ? { total: pointRecord.totalPoints, lifetime: pointRecord.lifetimePoints }
                : { total: 0, lifetime: 0 }
        });

    } catch (error) {
        console.error('Error al obtener puntos del cliente:', error);
        return res.status(500).json({ success: false, message: 'Error al obtener puntos' });
    }
};

export const adjustPoints = async (req, res) => {
    try {
        const { clientId } = req.params;
        const { points, description } = req.body;

        if (!points || !description) {
            return res.status(400).json({ success: false, message: 'Puntos y descripción son requeridos' });
        }

        let pointRecord = await Point.findOne({ ownerId: clientId });

        if (!pointRecord) {
            pointRecord = await Point.create({
                ownerId: clientId,
                totalPoints: 0,
                lifetimePoints: 0,
                history: []
            });
        }

        const newTotal = pointRecord.totalPoints + Number(points);

        if (newTotal < 0) {
            return res.status(400).json({
                success: false,
                message: `El cliente no tiene suficientes puntos. Tiene: ${pointRecord.totalPoints}`
            });
        }

        pointRecord.totalPoints = newTotal;
        if (points > 0) pointRecord.lifetimePoints += Number(points);
        pointRecord.history.push({
            type: 'AJUSTE',
            points: Number(points),
            description,
            referenceId: req.user.id
        });

        await pointRecord.save();

        return res.json({
            success: true,
            message: 'Puntos ajustados correctamente',
            points: { total: pointRecord.totalPoints, lifetime: pointRecord.lifetimePoints }
        });

    } catch (error) {
        console.error('Error al ajustar puntos:', error);
        return res.status(500).json({ success: false, message: 'Error al ajustar puntos' });
    }
};

export const accumulatePoints = async ({ ownerId, points, description, referenceId, type = 'ACUMULACION' }) => {
    try {
        let pointRecord = await Point.findOne({ ownerId });

        if (!pointRecord) {
            pointRecord = await Point.create({
                ownerId,
                totalPoints: 0,
                lifetimePoints: 0,
                history: []
            });
        }

        pointRecord.totalPoints     += points;
        pointRecord.lifetimePoints  += points;
        pointRecord.history.push({ type, points, description, referenceId });

        await pointRecord.save();
        return pointRecord;
    } catch (error) {
        console.error('Error acumulando puntos:', error);
        return null;
    }
};

export const deductPoints = async ({ ownerId, points, description, referenceId }) => {
    let pointRecord = await Point.findOne({ ownerId });

    if (!pointRecord || pointRecord.totalPoints < points) {
        return { success: false, message: 'Puntos insuficientes' };
    }

    pointRecord.totalPoints -= points;
    pointRecord.history.push({
        type: 'CANJE',
        points: -points,
        description,
        referenceId
    });

    await pointRecord.save();
    return { success: true, remaining: pointRecord.totalPoints };
};