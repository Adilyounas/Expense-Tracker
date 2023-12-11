const mongoose = require("mongoose");

const transactionsModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  month: {
    type: Number,
    required: [true, "Please Transaction Month"],
  },
  year: {
    type: Number,
    required: [true, "Please Transaction Year"],
  },
  monthPriority: {
    type: Number,
    default: () => Math.floor(Date.now()),
  },

  transactions: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      type: {
        type: String,
        required: [true, "Please provide The Type of Transaction"],
      },
      amount: {
        type: Number,
        required: [true, "Please provide the income amount"],
      },
      note: {
        type: String,
      },
      category: {
        type: String,
        required: [true, "Please provide the income category"],
      },
      paymentMode: {
        type: String,
        required: [true, "Please provide the income mode type"],
      },
      dateAndTime: {
        type: Date,
        required: [true, "Please provide the income date and Time"],
      },
      transactionPriority: {
        type: Number,
        default: () => Math.floor(Date.now()),
      },
    },
  ],
});

// Create the model first
const TransactionsModel = new mongoose.model(
  "TransactionsModel",
  transactionsModel
);

module.exports = TransactionsModel;
