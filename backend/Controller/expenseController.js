const Expense = require("../Models/expenseMedel");

const addExpense = async (req, res) => {
  try {
    const { amount, category, paymentMode, dateAndTime } = req.body;
    if (!amount || !category || !dateAndTime || !paymentMode) {
      return res.status(500).json({
        success: false,
        message: "Fill All the Given fields",
      });
    }

    const obj = {
      amount: req.body.amount,
      note: req.body.note,
      category: req.body.category,
      user: req.user._id,
      paymentMode: paymentMode,
      dateAndTime: dateAndTime,
    };

    req.body = obj;

    const expense = await Expense.create(req.body);
    if (!expense) {
      return res.status(500).json({
        success: false,
        message: "Expense Not Added / Created",
      });
    }

    res.status(201).json({
      success: true,
      expense: expense,
      message: "Expense Added Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = addExpense;
