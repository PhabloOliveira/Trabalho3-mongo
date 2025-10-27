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

        // Verifica se o livro existe primeiro
        const bookExists = await Book.findById(bookId);
        if (!bookExists) return res.status(404).json({ message: 'Livro não encontrado' });

        const now = new Date();
        const returnDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

        // Tentar atualizar o livro de forma atômica apenas se:
        // - isAvailable === true OR
        // - expectedReturnDate < now
        // Isso evita condições de corrida onde dois pedidos tentam pegar o mesmo livro.
        const updatedBook = await Book.findOneAndUpdate(
            {
                _id: bookId,
                $or: [
                    { isAvailable: true },
                    { expectedReturnDate: { $lt: now } },
                ],
            },
            {
                $set: {
                    isAvailable: false,
                    expectedReturnDate: returnDate,
                },
            },
            { new: true }
        );

        // Se updatedBook for null, significa que o livro não pôde ser reservado (está emprestado e previsão posterior)
        if (!updatedBook) {
            const currentBook = await Book.findById(bookId);
            return res.status(400).json({ message: 'Livro não disponível para empréstimo', expectedReturnDate: currentBook ? currentBook.expectedReturnDate : null });
        }

        // Criar empréstimo com dados em string conforme schema existente
        const loanPayload = {
            user: user.name,
            book: updatedBook.title,
            loanDate: now.toISOString(),
            returnDate: returnDate.toISOString(),
        };

        const loan = await Loan.create(loanPayload);

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
