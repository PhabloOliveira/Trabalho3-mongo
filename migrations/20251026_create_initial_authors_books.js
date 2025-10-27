module.exports = {
  async up(db, client) {
    // Cria um autor seed e um livro seed referenciando o autor
    const now = new Date();

    const authorResult = await db.collection('authors').insertOne({
      name: 'Autor Seed',
      birthDate: new Date('1980-01-01'),
      sex: 'M',
      writingGenre: 'Novel',
      createdAt: now,
    });

    const authorId = authorResult.insertedId;

    await db.collection('books').insertOne({
      title: 'Livro Seed',
      synopsis: 'Sinopse do livro seed inserido pela migration',
      year: 2024,
      author: authorId,
      isAvailable: true,
      expectedReturnDate: null,
      createdAt: now,
    });

    // Exemplo de índice (opcional): criar índice em title para buscas rápidas
    await db.collection('books').createIndex({ title: 1 });
  },

  async down(db, client) {
    // Remove os seeds criados
    await db.collection('books').deleteOne({ title: 'Livro Seed' });
    await db.collection('authors').deleteOne({ name: 'Autor Seed' });

    // Remove índice criado (se existir)
    try {
      await db.collection('books').dropIndex('title_1');
    } catch (err) {
      // ignora se o índice não existir
    }
  }
};
