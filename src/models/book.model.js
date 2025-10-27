const mongoose = require('mongoose');

// Schema para livros (Books)
// Campos obrigatórios: title, synopsis, year, author (ObjectId referenciando Authors)
// Campos opcionais/controle: isAvailable (default true), expectedReturnDate (default null)
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    synopsis: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Authors',
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    expectedReturnDate: {
        type: Date,
        default: null,
    },
}, { timestamps: true });

const Book = mongoose.model('Books', bookSchema);

module.exports = Book;
