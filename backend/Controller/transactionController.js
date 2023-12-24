const TransactionsModel = require("../Models/transactions");


const createOrUpdateTransaction = async (req, res) => {
  try {
    const transaction = {
      user: req.user._id,
      type: req.body.type,
      amount: req.body.amount,
      note: req.body.note,
      category: req.body.category,
      paymentMode: req.body.paymentMode,
      dateAndTime: new Date(req.body.dateAndTime),
    };

    const month = transaction.dateAndTime.getMonth();
    const year = transaction.dateAndTime.getFullYear();

    const existingDoc = await TransactionsModel.findOne({
      user: req.user._id,
      month,
      year,
    });

    if (existingDoc) {
      existingDoc.transactions.push(transaction);
      await existingDoc.save({validateBeforeSave:false});

      await TransactionsModel.findOneAndUpdate(
        {
          user: req.user._id,
          month,
          year,
        },
        {
          monthPriority: Math.floor(Date.now()),
        }
      );

      return res.status(201).json({
        success: true,
        message: `${transaction.type} Added to Existing Document Successfully ✔`,
      });
    } else {
      await TransactionsModel.create({
        user: req.user._id,
        month,
        year,
        transactions: [transaction],
      });

      return res.status(201).json({
        success: true,
        message: `${transaction.type} Added to New Document Successfully ✔`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await TransactionsModel.find({
      "transactions.user": req.user._id,
    });

    if (!transactions) {
      return res.status(404).json({
        success: false,
        message: `Transactions are not Found with this ${req.user._id} Id`,
      });
    }

    const sortedMonth = transactions.sort(
      (a, b) => b.monthPriority - a.monthPriority
    );

    res.status(201).json({
      success: true,
      monthArray: sortedMonth,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        success: true,
        message: `Transaction Id not found ${id} `,
      });
    }

    const transaction = await TransactionsModel.findOne(
      { "transactions._id": id },
      //** */ This is very important for one document
      { "transactions.$": 1 }
    );

    if (!transaction) {
      return res.status(404).json({
        success: true,
        message: `Transaction Not Found With This ${id} ID`,
      });
    }
    const { _doc } = { ...transaction.transactions[0] };

    res.status(200).json({
      success: true,
      transaction: _doc,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({
        success: true,
        message: `Transaction Id not found ${id} `,
      });
    }

    const { amount, category, dateAndTime, paymentMode } = req.body;

    if (!amount || !category || !dateAndTime || !paymentMode) {
      return res.status(500).json({
        success: true,
        message: "Give All The Values",
      });
    }

    const updatedDocument = await TransactionsModel.findOneAndUpdate(
      { "transactions._id": id },
      { $set: { "transactions.$": req.body } }
    );

    if (!updatedDocument) {
      return res.status(404).json({
        success: true,
        message: `Transaction Not Updated With This ${id} ID`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Transaction Updated ✔`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteSingleTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteDocument = await TransactionsModel.updateOne(
      { "transactions._id": id },
      { $pull: { transactions: { _id: id } } }
    );
    if (!deleteDocument) {
      return res.status(404).json({
        success: true,
        message: `Transaction Not Updated With This ${id} ID`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Document Is Deleted ✔",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteAllUserData = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "No Transactions Found for the Given User ID",
      });
    }

    const count = await TransactionsModel.countDocuments({ user: userId });

    const deleteResult = await TransactionsModel.deleteMany({ user: userId });

    if (!deleteResult) {
      return res.status(200).json({
        success: true,
        message: `Deleted ${totalDeletedCount} Transactions Successfully`,
      });
    }

    if (!count) {
      return res.status(404).json({
        success: true,
        message: `Count Not Found`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Total ${count} documents Deleted ✔`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrUpdateTransaction,
  getAllTransactions,
  getSingleTransaction,
  updateTransaction,
  deleteSingleTransaction,
  deleteAllUserData,
};
