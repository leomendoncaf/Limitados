const ExpenseService = require('../services/expenseService')
const { sequelize } = require('../database/models')
const { Op } = require('sequelize')

describe('ExpenseService', () => {
  describe('createExpense', () => {
      test('should create an expense', async () => {
        const expenseData = {
          description: 'Test expense',
          value: 10,
          date: new Date(),
          groupId: 1,
          userId: 1
        }
  
        const expenseService = new ExpenseService()
  
        const expense = await expenseService.createExpense(expenseData)
  
        expect(expense).toHaveProperty('id')
        expect(expense.description).toBe(expenseData.description)
        expect(expense.value).toBe(expenseData.value)
        expect(expense.date.getTime()).toBe(expenseData.date.getTime())
        expect(expense.groupId).toBe(expenseData.groupId)
        expect(expense.userId).toBe(expenseData.userId)
  
        await sequelize.queryInterface.bulkDelete('expenses', {
          id: {
            [Op.gte]: 0
          }
        })
      })
    })
  })
