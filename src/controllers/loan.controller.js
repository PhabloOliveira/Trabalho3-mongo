const Loan = require('../models/loan.model');
const User = require('../models/user.model');
const Book = require('../models/book.model');

// Cria um empréstimo aplicando as regras de negócio descritas
exports.createLoan = async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        if (!userId || !bookId) return res.status(400).json({ message: 'userId e bookId são obrigatórios' });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: 'Livro não encontrado' });

        const now = new Date();

        // Regra 1 & 2: verificar disponibilidade
        let canLoan = false;
        if (book.isAvailable === true) {
            canLoan = true;
        } else if (book.expectedReturnDate && new Date(book.expectedReturnDate) < now) {
            // expectedReturnDate anterior à data atual -> permitir
            canLoan = true;
        }

        if (!canLoan) {
            return res.status(400).json({ message: 'Livro não disponível para empréstimo', expectedReturnDate: book.expectedReturnDate });
        }

        // Criar loan: returnDate = now + 3 dias
        const returnDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

        const loan = await Loan.create({
            user: user._id,
            userName: user.name,
            book: book._id,
            bookTitle: book.title,
            loanDate: now,
            returnDate,
        });

        // Atualizar status do livro
        book.isAvailable = false;
        book.expectedReturnDate = returnDate;
        await book.save();

        return res.status(201).json(loan);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Lista todos os empréstimos
exports.getAllLoans = async (req, res) => {
    try {
        const loans = await Loan.find().populate('user').populate('book');
        return res.status(200).json(loans);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
