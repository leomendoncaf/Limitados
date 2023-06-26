const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  valor: {
    type: Number,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  data: {
    type: Date,
    default: Date.now
  },
  division: {
    type: Object,
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
  ]
});

expenseSchema.set('toJSON', { virtuals: true });

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
