const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type:{
    type: String,
    default:"Expense"

  },
  amount: {
    type: Number,
    required: [true, 'Please provide the Expense amount'],
  },
  note: {
    type: String,
  },
  category: {
    type: String,
    required: [true, 'Please provide the Expense category'],
  },
  paymentMode: {
    type: String,
    required: [true, 'Please provide the Expense mode'],
  },
  dateAndTime: {
    type: Date,
    required: [true, 'Please provide the Expense date and Time'],
  },
  priority:{
    type: Number,
    required: [true, 'Please provide the Priority'],
  }
});

const Expense = new mongoose.model('Expense', expenseSchema);

module.exports = Expense;
