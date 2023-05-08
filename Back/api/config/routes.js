const express = require('express');
const router = express.Router();

// Importando os controllers
const authController = require('../controller/AuthController');
const expenseController = require('../controller/ExpenseController');
const groupController = require('../controller/GroupController');

// Definindo as rotas
router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/expenses', expenseController.getAllDespesas);
router.post('/expenses', expenseController.createDespesa);
router.put('/expenses/:id', expenseController.updateDespesa);
router.delete('/expenses/:id', expenseController.deleteDespesa);

router.get('/group', groupController.getAllGrupos);
router.post('/group', groupController.createGrupo);
router.get('/group/:id', groupController.getGrupoById);
router.put('/group/:id', groupController.updateGrupo);
router.delete('/group/:id', groupController.deleteGrupo);

// Exportando o objeto router
module.exports = router;
