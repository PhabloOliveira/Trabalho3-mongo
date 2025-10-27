const mongoose = require('mongoose');

// Schema para Empréstimos (Loans)
// Campos obrigatórios conforme enunciado: user (String), book (String), loanDate (String), returnDate (String)
const loanSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    book: {
        type: String,
        required: true,
    },
    loanDate: {
        type: String,
        required: true,
    },
    returnDate: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Loan = mongoose.model('Loans', loanSchema);

module.exports = Loan;
