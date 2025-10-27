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

        // Criar loan: returnDate = now + 3 dias (salvar como ISO string conforme requisito)
        const returnDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

        const loanPayload = {
            user: user.name,
            book: book.title,
            loanDate: now.toISOString(),
            returnDate: returnDate.toISOString(),
        };

        const loan = await Loan.create(loanPayload);

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
        // Retorna os empréstimos com os campos string conforme o schema
        const loans = await Loan.find().sort({ createdAt: -1 });
        return res.status(200).json(loans);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
