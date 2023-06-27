const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  total: {
    type: Number,
  },
  descricao: {
    type: String,
    required: true
  },
  data: {
    type: Date,
    default: Date.now
  },
  grupo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  },
  participantes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  ],
  memberAmount: {
    type: Object,
  }
});

expenseSchema.set('toJSON', { virtuals: true });

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
