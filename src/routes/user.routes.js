const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

// Route para criar um novo usuário
router.post('/', userController.createUser);

// Route para obter todos os usuários
router.get('/', userController.getAllUsers);

// Route para obter um usuário por ID
router.get('/:id', userController.getUserById);

// Route para atualizar um usuário por ID
router.put('/:id', userController.updateUser);

// Route para deletar um usuário por ID
router.delete('/:id', userController.deleteUser);

module.exports = router;