require('dotenv').config();
const mongoose = require('mongoose');

async function resetCollections() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/Phablo';
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection.db;

  try {
    const collections = await db.listCollections().toArray();
    for (const coll of collections) {
      const name = coll.name;
      if (name.startsWith('system.')) continue;
      console.log('Dropping collection:', name);
      try {
        await db.dropCollection(name);
      } catch (err) {
        console.warn('Erro ao dropar coleção', name, err.message);
      }
    }

    // Recriar coleções vazias necessárias
    const needed = ['users', 'authors', 'books', 'loans'];
    for (const name of needed) {
      console.log('Criando coleção vazia:', name);
      try {
        await db.createCollection(name);
      } catch (err) {
        console.warn('Erro ao criar coleção', name, err.message);
      }
    }

    console.log('Reset das coleções concluído.');
  } catch (err) {
    console.error('Erro ao resetar coleções:', err);
  } finally {
    await mongoose.disconnect();
  }
}

resetCollections();
