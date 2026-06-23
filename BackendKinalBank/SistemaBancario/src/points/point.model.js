'use strict';

import mongoose from 'mongoose';

const pointHistorySchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['ACUMULACION', 'CANJE', 'BONIFICACION', 'AJUSTE'],
            required: true
        },
        points: {
            type: Number,
            required: true   
        },
        description: {
            type: String,
            required: true
        },
        referenceId: {
            type: String,   
            default: null
        }
    },
    {
        timestamps: true,
        versionKey: false,
        _id: true
    }
);

const pointSchema = new mongoose.Schema(
    {
        ownerId: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        totalPoints: {
            type: Number,
            default: 0,
            min: [0, 'Los puntos no pueden ser negativos']
        },
        lifetimePoints: {
            type: Number,
            default: 0   
        },
        history: [pointHistorySchema]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model('Point', pointSchema);