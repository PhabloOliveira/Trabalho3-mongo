const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

// Rotas para livros (Books)
router.post('/', bookController.createBook); // Cria livro
router.get('/', bookController.getAllBooks); // Lista livros
router.get('/:id', bookController.getBookById); // Busca livro por ID
router.put('/:id', bookController.updateBook); // Atualiza livro
router.delete('/:id', bookController.deleteBook); // Remove livro

module.exports = router;
