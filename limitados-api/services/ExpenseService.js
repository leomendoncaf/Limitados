const Expense = require('../models/expense');

class ExpenseService {
  async createExpense(data) {
    try {
      const newExpense = new Expense(data);
      const expense = await newExpense.save();
      return expense;
    } catch (err) {
      throw new Error('Could not create expense');
    }
  }

  async getExpensesByGroupId(groupId) {
    try {
      const expenses = await Expense.find({ groupId });
      return expenses;
    } catch (err) {
      throw new Error('Could not get expenses');
    }
  }

  async updateExpense(id, data) {
    try {
      const updatedExpense = await Expense.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      );
      return updatedExpense;
    } catch (err) {
      throw new Error('Could not update expense');
    }
  }

  async deleteExpense(id) {
    try {
      const deletedExpense = await Expense.findByIdAndDelete(id);
      return deletedExpense;
    } catch (err) {
      throw new Error('Could not delete expense');
    }
  }
}

module.exports = {
  ExpenseService
};
