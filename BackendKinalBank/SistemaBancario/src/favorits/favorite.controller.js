'use strict';

import Favorite from './favorite.model.js';


// AGREGAR FAVORITO (CLIENT)
export const addFavorite = async (req, res) => {
  try {
    const { alias, accountNumber } = req.body;

    if (!alias || !accountNumber) {
      return res.status(400).json({
        success: false,
        message: 'Alias y número de cuenta son obligatorios'
      });
    }

    // req.user.id viene de decoded.sub en validate-jwt.js
    const ownerId = req.user?.id;

    if (!ownerId) {
      return res.status(401).json({
        success: false,
        message: 'No se pudo obtener el id del usuario del token'
      });
    }

    const favorite = await Favorite.create({
      alias:         alias.trim(),
      accountNumber: accountNumber.trim(),
      ownerId
    });

    return res.status(201).json({
      success: true,
      message: 'Favorito agregado correctamente',
      favorite
    });

  } catch (error) {
    console.error('❌ addFavorite error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al agregar favorito',
      detail: error.message   // <-- expone el motivo real en desarrollo
    });
  }
};


// VER MIS FAVORITOS (CLIENT)
export const getMyFavorites = async (req, res) => {
  try {
    const ownerId = req.user?.id;

    const favorites = await Favorite.find({ ownerId }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      favorites
    });

  } catch (error) {
    console.error('❌ getMyFavorites error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener favoritos',
      detail: error.message
    });
  }
};


// EDITAR FAVORITO (CLIENT)
export const updateFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const { alias, accountNumber } = req.body;

    if (!alias && !accountNumber) {
      return res.status(400).json({
        success: false,
        message: 'Debes enviar al menos un campo a actualizar'
      });
    }

    const favorite = await Favorite.findOne({
      _id: id,
      ownerId: req.user?.id
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favorito no encontrado'
      });
    }

    if (alias)         favorite.alias         = alias.trim();
    if (accountNumber) favorite.accountNumber  = accountNumber.trim();

    await favorite.save();

    return res.json({
      success: true,
      message: 'Favorito actualizado correctamente',
      favorite
    });

  } catch (error) {
    console.error('❌ updateFavorite error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar favorito',
      detail: error.message
    });
  }
};


// ELIMINAR FAVORITO (CLIENT)
export const deleteFavorite = async (req, res) => {
  try {
    const { id } = req.params;

    const favorite = await Favorite.findOne({
      _id: id,
      ownerId: req.user?.id
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favorito no encontrado'
      });
    }

    await favorite.deleteOne();

    return res.json({
      success: true,
      message: 'Favorito eliminado correctamente'
    });

  } catch (error) {
    console.error('❌ deleteFavorite error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar favorito',
      detail: error.message
    });
  }
};