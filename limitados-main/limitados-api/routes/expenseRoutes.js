const express = require('express');
const ExpenseController = require('../controller/ExpenseController');
const Authorization = require('../middlewares/Authorization');

const router = express.Router();

router.post('/expense', Authorization.authenticateJWT, ExpenseController.createExpense);
router.get('/expense', Authorization.authenticateJWT, ExpenseController.getAllExpenses);
router.get('/expense/:id', Authorization.authenticateJWT, ExpenseController.getExpenseById);
router.put('/expense/:id', Authorization.authenticateJWT, ExpenseController.updateExpense);
router.delete('/expense/:id', Authorization.authenticateJWT, ExpenseController.deleteExpense);

module.exports = router;
