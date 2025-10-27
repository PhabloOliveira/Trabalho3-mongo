const mongoose = require('mongoose');

// Schema para Empréstimos (Loans)
// Armazena referência ao usuário e ao livro, além das datas de empréstimo e retorno
const loanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    userName: {
        type: String,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books',
        required: true,
    },
    bookTitle: {
        type: String,
    },
    loanDate: {
        type: Date,
        default: Date.now,
    },
    returnDate: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

const Loan = mongoose.model('Loans', loanSchema);

module.exports = Loan;
