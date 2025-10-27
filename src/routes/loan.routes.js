const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loan.controller');

// Rotas para empréstimos (Loans)
router.post('/', loanController.createLoan); // Realizar empréstimo
router.get('/', loanController.getAllLoans); // Listar empréstimos

module.exports = router;
