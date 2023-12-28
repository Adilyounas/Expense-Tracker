const mongoose = require("mongoose");

const userKhata = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Customer Name"],
  },
  number: {
    type: String,
    required: [true, "Please Customer Number"],
  },

  mainPriority: {
    type: Number,
    default: () => Math.floor(Date.now()),
  },
  wasoli: {
    type: Boolean,
    default: undefined,
  },
  wasoliDate: {
    type: Date,
    default: undefined,
  },

  khataData: [
    {
      type: {
        type: String,
        required: [true, "Leya ha Yan Diya ha Btaen"],
      },
      amount: {
        type: Number,
        required: [true, "Please Enter Amount"],
      },
      transactionDate: {
        type: Date,
        default: Date.now,
      },

      transactionKhataPriority: {
        type: Number,
        default: () => Math.floor(Date.now()),
      },
    },
  ],
  CreateAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model first
const UserKhata = new mongoose.model("UserKhata", userKhata);

module.exports = UserKhata;
