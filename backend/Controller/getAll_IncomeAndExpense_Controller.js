const Income = require("../Models/incomeModel");
const Expense = require("../Models/expenseMedel");

const getAllIncomesAndExpense = async (req, res) => {
  try {
    const monthsArray = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const expense = await Expense.find({ user: req.user._id });
    if (!expense) {
      return res.status(500).json({
        success: false,
        message: "Expense data not found",
      });
    }

    const incomes = await Income.find({ user: req.user._id });
    if (!incomes) {
      return res.status(500).json({
        success: false,
        message: "Income data not found",
      });
    }

    // Function to group data by month
    const groupDataByMonth = (incomes, expenses) => {
      const groupedData = {};

      const incomesWithDateObjects = incomes.map((ele) => {
        return {
          ...ele.toObject(), // Convert Mongoose document to plain JavaScript object
          dateAndTime: new Date(ele.dateAndTime),
        };
      });

      const expensesWithDateObjects = expenses.map((ele) => {
        return {
          ...ele.toObject(), // Convert Mongoose document to plain JavaScript object
          dateAndTime: new Date(ele.dateAndTime),
        };
      });

      // Combine incomes and expenses
      const allData = [...incomesWithDateObjects, ...expensesWithDateObjects];

      // Iterate through each data entry
      allData.forEach((entry) => {
        const monthYear = `${
          monthsArray[entry.dateAndTime.getMonth()]
        } ${entry.dateAndTime.getFullYear()}`;

        let day = `${entry.dateAndTime.getDate()}`;

        // Create an entry for the month if it doesn't exist
        if (!groupedData[monthYear]) {
          groupedData[monthYear] = { month: monthYear, data: [] };
        }

        // Add the entry to the array for the month
        day = parseInt(day);
        const enteryWithDay = { day, ...entry };
        groupedData[monthYear].data.push(enteryWithDay);
      });

      return groupedData;
    };

    // Group incomes and expenses by month
    const groupedData = groupDataByMonth(incomes, expense);

    // Store Object.values in a variable
    const monthArrayUnsorted = Object.values(groupedData);

    const monthArraySorted = monthArrayUnsorted.map((obj) => {
      const sortedData = obj.data.sort((a, b) => {
        const dateA = new Date(a.dateAndTime);
        const dateB = new Date(b.dateAndTime);

        // Compare transactions based on creation time (newest first)
        if (dateA.getTime() === dateB.getTime()) {
          // If creation times are equal, prioritize by milliseconds (oldest first)
          return dateA.getMilliseconds() - dateB.getMilliseconds();
        }

        // Otherwise, prioritize by creation time (newest first)
        return dateB.getTime() - dateA.getTime();
      });

      return { ...obj, data: sortedData };
    });

    function calculateTimeDifference(currentDate, transactionDate) {
      const dayDiff = Math.abs(
        currentDate.getDate() - transactionDate.getDate()
      );
      const hourDiff = Math.abs(
        currentDate.getHours() - transactionDate.getHours()
      );
      const minuteDiff = Math.abs(
        currentDate.getMinutes() - transactionDate.getMinutes()
      );
      const secondDiff = Math.abs(
        currentDate.getSeconds() - transactionDate.getSeconds()
      );

      // You can adjust the weights based on your priority
      return (
        dayDiff * 10000 +
        hourDiff * 10000 +
        minuteDiff * 20000 +
        secondDiff * 300000
      );
    }

    const monthArraySortedinh = monthArraySorted.map((obj) => {
      const sortedData = obj.data.sort((a, b) => {
        const dateA = new Date(a.dateAndTime);
        const dateB = new Date(b.dateAndTime);

        const currentDate = new Date(); // Get the current date

        const diffA = calculateTimeDifference(currentDate, dateA);
        const diffB = calculateTimeDifference(currentDate, dateB);

        return diffA - diffB;
      });

      return { ...obj, data: sortedData };
    });

    // console.log("Sorted Month Array:", monthArraySorted);

    // Now 'monthArray' contains the grouped data by month, and you can use it as needed

    //todo <---------------------------------------------------------------------------------------->

    res.status(201).json({
      success: true,
      monthArray: monthArraySortedinh,
      // containerForHeading,
      // incomeAndExpenseVal: sortedContainer,
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

    const incomeTransaction = await Income.findOne({ _id: id });
    if (incomeTransaction) {
      res.status(200).json({
        success: true,
        transaction: incomeTransaction,
      });
    }

    const expenseTransaction = await Expense.findOne({ _id: id });
    if (expenseTransaction) {
      res.status(200).json({
        success: true,
        transaction: expenseTransaction,
      });
    }
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
    const { amount, category, dateAndTime, paymentMode } = req.body;

    if (!amount || !category || !dateAndTime || !paymentMode) {
      return res.status(500).json({
        success: true,
        message: "Give All The Values",
      });
    }

    const incomeTransaction = await Income.findOne({ _id: id });
    if (incomeTransaction) {
      const incomeTransactionUpdated = await Income.findOneAndUpdate(
        { _id: id },
        req.body
      );
      return res.status(200).json({
        success: true,
        transaction: incomeTransactionUpdated,
        message: "Income Transaction Updated",
      });
    }

    const expenseTransaction = await Expense.findOne({ _id: id });
    if (expenseTransaction) {
      const expenseTransactionUpdated = await Expense.findOneAndUpdate(
        { _id: id },
        req.body
      );

      return res.status(200).json({
        success: true,
        transaction: expenseTransactionUpdated,
        message: "Expense Transaction Updated",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const deleteSingleTransaction = async(req, res) => {
  try {
    const { id } = req.params;

    let transaction = await Income.findById(id);
    if (transaction) {
      await Income.deleteOne({ _id: id });
      return res.status(200).json({
        success: true,
        message: "Tranaction Deleted Successfully",
      });
    }

    transaction = await Expense.findById(id);
    if (transaction) {
      await Expense.deleteOne({ _id: id });
      return res.status(200).json({
        success: true,
        message: "Tranaction Deleted Successfully",
      });
    }

     res.status(404).json({
      success: false,
      message: 'Transaction not found',
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


module.exports = {
  getAllIncomesAndExpense,
  getSingleTransaction,
  updateTransaction,
  deleteSingleTransaction
};
