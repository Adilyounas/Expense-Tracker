const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type:{
    type: String,
    default:"Income"

  },
  amount: {
    type: Number,
    required: [true, 'Please provide the income amount'],
  },
  note: {
    type: String,
  },
  category: {
    type: String,
    required: [true, 'Please provide the income category'],
  },
  paymentMode: {
    type: String,
    required: [true, 'Please provide the income mode type'],
  },
  dateAndTime: {
    type: Date,
    required: [true, 'Please provide the income date and Time'],
  },
  priority:{
    type: Number,
    required: [true, 'Please provide the Priority'],
  }
});

const Income = new mongoose.model('Income', incomeSchema);

module.exports = Income;
