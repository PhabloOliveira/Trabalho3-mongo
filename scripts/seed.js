require('dotenv').config();
const mongoose = require('mongoose');
const Author = require('../src/models/author.model');
const Book = require('../src/models/book.model');

async function run() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/Phablo';
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Cria autor seed se não existir
    let author = await Author.findOne({ name: 'Autor Seed' });
    if (!author) {
      author = await Author.create({ name: 'Autor Seed', birthDate: new Date('1980-01-01'), sex: 'M', writingGenre: 'Novel' });
      console.log('Autor seed criado:', author._id);
    } else {
      console.log('Autor seed já existe:', author._id);
    }

    // Cria livro seed se não existir
    let book = await Book.findOne({ title: 'Livro Seed' });
    if (!book) {
      book = await Book.create({
        title: 'Livro Seed',
        synopsis: 'Sinopse do livro seed inserido pelo seed script',
        year: 2024,
        author: author._id,
        isAvailable: true,
        expectedReturnDate: null,
      });
      console.log('Livro seed criado:', book._id);
    } else {
      console.log('Livro seed já existe:', book._id);
    }

  } catch (err) {
    console.error('Erro ao rodar seed:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
