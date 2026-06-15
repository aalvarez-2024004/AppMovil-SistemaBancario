/**
 * Ejecuta este script UNA SOLA VEZ para eliminar el índice obsoleto
 * de la colección favorites.
 *
 * Desde la raíz del SistemaBancario:
 *   node scripts/fix-favorites-index.js
 */

'use strict';

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.URI_MONGO);
    console.log('✅ Conectado a MongoDB');

    const db = mongoose.connection.db;
    const collection = db.collection('favorites');

    // Muestra todos los índices actuales para diagnóstico
    const indexes = await collection.indexes();
    console.log('\n📋 Índices actuales en "favorites":');
    indexes.forEach(idx => console.log(' -', JSON.stringify(idx)));

    // Elimina el índice obsoleto que usa los campos viejos
    try {
      await collection.dropIndex('userId_1_destinyAccountNumber_1');
      console.log('\n🗑️  Índice obsoleto "userId_1_destinyAccountNumber_1" eliminado correctamente.');
    } catch (err) {
      if (err.codeName === 'IndexNotFound') {
        console.log('\nℹ️  El índice ya no existe, nada que eliminar.');
      } else {
        throw err;
      }
    }

    // Índices restantes tras la limpieza
    const remaining = await collection.indexes();
    console.log('\n✅ Índices restantes:');
    remaining.forEach(idx => console.log(' -', JSON.stringify(idx)));

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\nDesconectado. Puedes reiniciar el servidor.');
  }
};

run();