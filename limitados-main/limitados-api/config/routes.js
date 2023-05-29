const express = require("express");
const router = express.Router();

// Importando os controllers
const authController = require("../controller/AuthController");
const expenseController = require("../controller/ExpenseController");
const groupController = require("../controller/GroupController");
const AuthController = require("../controller/AuthController");
const userController = require("../controller/UserController");
const authMiddleware = require("../middlewares/auth");

const auth = new AuthController();
// Definindo as rotas
router.post("/signup", auth.register);
router.post("/login", auth.login);

router.get("/expenses", authMiddleware, expenseController.getExpenses);
router.post("/expenses", authMiddleware, expenseController.createExpense);
router.put("/expenses/:id", authMiddleware, expenseController.updateExpense);
router.delete("/expenses/:id", authMiddleware, expenseController.deleteExpense);

// TODO: obter todos os grupos populados
// router.get('/group', groupController.getAllGroups);
router.post("/group", authMiddleware, groupController.createGroup);
router.get("/group/:id", authMiddleware, groupController.getGroupById);
router.put("/group/:id", authMiddleware, groupController.updateGroup);
router.delete("/group/:id", authMiddleware, groupController.deleteGroup);

router.get("/users", authMiddleware, userController.getAll);
router.get("/user/:id", authMiddleware, userController.getById);
router.get("/user", authMiddleware, userController.getCurrentUser);

// Exportando o objeto router
module.exports = router;
