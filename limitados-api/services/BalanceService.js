const Group = require('../models/group');
const Expense = require('../models/expense');

class BalanceService {
  async calculateBalance(groupId) {
    const group = await Group.findById(groupId);
    const expenses = await Expense.find({ groupId });

    // Cálculo do total de despesas do grupo
    let totalExpense = 0;
    expenses.forEach((expense) => {
      totalExpense += expense.amount;
    });

    // Cálculo da média de despesas por usuário
    const numUsers = group.users.length;
    const averageExpense = totalExpense / numUsers;

    // Cálculo das contas a pagar
    const balances = {};
    group.users.forEach((user) => {
      balances[user] = 0;
    });
    expenses.forEach((expense) => {
      balances[expense.payer] += expense.amount;
      expense.split.forEach((user) => {
        balances[user] -= expense.amount / expense.split.length;
      });
    });
    const balanceList = [];
    for (const user in balances) {
      if (balances[user] !== 0) {
        balanceList.push({ user, amount: balances[user] });
      }
    }

    // Ordenação das contas por valor
    balanceList.sort((a, b) => b.amount - a.amount);

    // Retorno do resultado
    return {
      totalExpense,
      averageExpense,
      balanceList,
    };
  }
}

module.exports = new BalanceService();
