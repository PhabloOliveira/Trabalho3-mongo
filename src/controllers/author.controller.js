const Author = require('../models/author.model');

// Criando novo autor
exports.createAuthor = async (req, res) => {
    try {
        const { name, birthDate, sex, writingGenre } = req.body;
        const author = new Author({ name, birthDate, sex, writingGenre });
        await author.save();
        res.status(201).json(author);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Pega todos os autores existentes
exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Pega um autor pelo ID
exports.getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) {
            return res.status(404).json({ message: 'Autor não encontrado' });
        }
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

