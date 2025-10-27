const Book = require('../models/book.model');
const Author = require('../models/author.model');

// Cria um novo livro. Verifica se o autor existe antes de criar.
exports.createBook = async (req, res) => {
    try {
        const { title, synopsis, year, author, isAvailable, expectedReturnDate } = req.body;

        // Verifica se o autor referenciado existe
        const authorExists = await Author.findById(author);
        if (!authorExists) {
            return res.status(400).json({ message: 'Autor não encontrado' });
        }

        const book = new Book({ title, synopsis, year, author, isAvailable, expectedReturnDate });
        await book.save();
        return res.status(201).json(book);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Retorna todos os livros, populando dados do autor
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('author');
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Retorna um livro por ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('author');
        if (!book) return res.status(404).json({ message: 'Livro não encontrado' });
        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


