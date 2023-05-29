const Expense = require('../models/expense');
const Group = require('../models/group');
const User = require('../models/user');
const { calculateExpenseDivision } = require('../services/expenseService');

class ExpenseController {
  async calculateExpenseDivision(participants, totalExpense) {
    const avgExpense = totalExpense / participants.length;
    const balance = {};

    // inicializa o objeto balance com as dívidas de cada participante
    participants.forEach(p => balance[p.id] = { owes: 0, owedBy: 0 });

    // calcula a dívida de cada participante
    participants.forEach(p => {
      const expense = p.expense || 0;
      const diff = expense - avgExpense;

      if (diff > 0) {
        // p deve receber de outros participantes
        participants.forEach(q => {
          if (q.id !== p.id) {
            balance[q.id].owes += diff / (participants.length - 1);
            balance[p.id].owedBy += diff / (participants.length - 1);
          }
        });
      } else {
        // p deve pagar para outros participantes
        participants.forEach(q => {
          if (q.id !== p.id) {
            balance[q.id].owedBy += -diff / (participants.length - 1);
            balance[p.id].owes += -diff / (participants.length - 1);
          }
        });
      }
    });

    return balance;
  }

  // Cria uma nova despesa e a associa a um grupo e a um usuário
  async createExpense(req, res) {
    const { userId, groupId, description, value } = req.body;

    try {
      // Verifica se o usuário e o grupo existem
      const user = await User.findById(userId);
      const group = await Group.findById(groupId);

      if (!user || !group) {
        return res.status(404).json({ message: 'Usuário ou grupo não encontrado' });
      }

      // Cria a nova despesa
      const expense = new Expense({
        description,
        value,
        payer: user,
        group,
      });

      // Calcula a divisão da despesa entre os membros do grupo
      const expenseDivision = calculateExpenseDivision(group.members, value);

      // Associa a divisão da despesa aos usuários do grupo
      group.members.forEach((member) => {
        expense.division.set(member._id, expenseDivision[member._id]);
      });

      // Salva a despesa no banco de dados
      await expense.save();

      // Atualiza o saldo de cada usuário do grupo
      group.members.forEach(async (member) => {
        const user = await User.findById(member._id);
        user.balance += expense.division.get(member._id);
        await user.save();
      });

      // Retorna a despesa criada
      return res.status(201).json(expense);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro ao criar despesa' });
    }
  }

  // Lista todas as despesas de um grupo
  async getExpenses(req, res) {
    const { groupId } = req.params;

    try {
      // Verifica se o grupo existe
      const group = await Group.findById(groupId);

      if (!group) {
        return res.status(404).json({ message: 'Grupo não encontrado' });
      }

      // Lista todas as despesas do grupo
      const expenses = await Expense.find({ group }).populate('payer').exec();

      return res.json(expenses);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro ao listar despesas' });
    }
  }

  // Atualiza os dados de uma despesa
  async updateExpense(req, res) {
    const { expenseId } = req.params;
    const { description, value } = req.body;

    try {
      // Verifica se a despesa existe
      const expense = await Expense.findById(expenseId);

      if (!expense) {
        return res.status(404).json({ message: 'Despesa não encontrada' });
      }

      // Atualiza os dados da despesa
      expense.description = description;
      expense.value = value;

      // Recalcula a divisão da despesa entre os membros do grupo
      const expenseDivision = calculateExpenseDivision(expense.group.members, value);

      // Atualiza a divisão da despesa nos saldos dos usuários
      expense.group.members.forEach(async (member) => {
        const user = await User.findById(member._id);
        const oldDivision = expense.division.get(member._id);
        const newDivision = expenseDivision[member._id];
        user.balance += (newDivision - oldDivision);
        await user.save();
        expense.division.set(member._id, newDivision);
      });

      // Salva a despesa atualizada no banco de dados
      await expense.save();

      // Retorna a despesa atualizada
      return res.json(expense);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro ao atualizar despesa' });
    }
  }

  // Deleta uma despesa e atualiza os saldos dos usuários
  async deleteExpense(req, res) {
    const { expenseId } = req.params;

    try {
      // Verifica se a despesa existe
      const expense = await Expense.findById(expenseId);

      if (!expense) {
        return res.status(404).json({ message: 'Despesa não encontrada' });
      }

      // Atualiza o saldo de cada usuário do grupo
      expense.group.members.forEach(async (member) => {
        const user = await User.findById(member._id);
        user.balance -= expense.division.get(member._id);
        await user.save();
      });

      // Deleta a despesa do banco de dados
      await expense.delete();

      return res.json({ message: 'Despesa deletada com sucesso' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro ao deletar despesa' });
    }
  }
}

module.exports = new ExpenseController();
