const { ExpenseService } = require('../services/ExpenseService');
const { sequelize } = require('../models/expense');
const { Op } = require('sequelize');

describe('ExpenseService', () => {

    // Teste 2: Verifica se a descrição do gasto é obrigatória
    test('should require a description', async () => {
      const expenseData = {
        value: 10,
        date: new Date(),
        groupId: 1,
        userId: 1,
      };

      const expenseService = new ExpenseService();

      await expect(expenseService.createExpense(expenseData)).rejects.toThrow();
    });

    // Teste 3: Verificar se o valor do gasto é obrigatório
    test('should require a value', async () => {
      const expenseData = {
        description: 'Test expense',
        date: new Date(),
        groupId: 1,
        userId: 1,
      };

      const expenseService = new ExpenseService();

      await expect(expenseService.createExpense(expenseData)).rejects.toThrow();
    });

    // Teste 4: Verificar se a data do gasto é obrigatória
    test('should require a date', async () => {
      const expenseData = {
        description: 'Test expense',
        value: 10,
        groupId: 1,
        userId: 1,
      };

      const expenseService = new ExpenseService();

      await expect(expenseService.createExpense(expenseData)).rejects.toThrow();
    });

    // Teste 5: Verificar se o groupId do gasto é obrigatório
    test('should require a groupId', async () => {
      const expenseData = {
        description: 'Test expense',
        value: 10,
        date: new Date(),
        userId: 1,
      };

      const expenseService = new ExpenseService();

      await expect(expenseService.createExpense(expenseData)).rejects.toThrow();
    });

    // Teste 6: Verificar se o userId do gasto é obrigatório
    test('should require a userId', async () => {
      const expenseData = {
        description: 'Test expense',
        value: 10,
        date: new Date(),
        groupId: 1,
      };

      const expenseService = new ExpenseService();

      await expect(expenseService.createExpense(expenseData)).rejects.toThrow();
    });

    // Teste 7: Verificar se a descrição do gasto não pode ser vazia
    test('should not allow an empty description', async () => {
      const expenseData = {
        description: '',
        value: 10,
        date: new Date(),
        groupId: 1,
        userId: 1,
      };

      const expenseService = new ExpenseService();

      await expect(expenseService.createExpense(expenseData)).rejects.toThrow();
    });

    // Teste 8: Verificar se o valor do gasto deve ser um número positivo
    test('should require a positive value', async () => {
      const expenseData = {
        description: 'Test expense',
        value: -10,
        date: new Date(),
        groupId: 1,
        userId: 1,
      };

      const expenseService = new ExpenseService();

      await expect(expenseService.createExpense(expenseData)).rejects.toThrow();
    });

    // Teste 9: Verificar se o groupId do gasto deve ser um número positivo
    test('should require a positive groupId', async () => {
      const expenseData = {
        description: 'Test expense',
        value: 10,
        date: new Date(),
        groupId: -1,
        userId: 1,
      };

      const expenseService = new ExpenseService();

      await expect(expenseService.createExpense(expenseData)).rejects.toThrow();
    });
      });
