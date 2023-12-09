const Income = require("../Models/incomeModel");

const addIncome = async (req, res) => {
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

    const income = await Income.create(req.body);
    if (!income) {
      return res.status(500).json({
        success: false,
        message: "Income Not Added / Created",
      });
    }

    res.status(201).json({
      success: true,
      income: income,
      message: "Income Added Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = addIncome;
