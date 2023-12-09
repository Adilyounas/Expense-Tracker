import React, { useState, useEffect } from "react";
import "./dashboard.css";
// import { Box } from "@mui/material";
import Menu from "../Menu/Menu";
import DashboardCenter from "../DashboardCenter/DashboardCenter";
import sortedCurrency from "../Static Data/Currencies";
import sortedCategory from "../Static Data/Category";
import paymentModeArr from "../Static Data/Payment";
import { useDispatch, useSelector } from "react-redux";
import getAllIncomeAndExpenses from "../../Redux/Actions/getAllinComeAndExpense";

import Loading from "../Loading/Loading";

//TODO <----  GETTTING VALUES FROM LOCAL STORAGE  ---------->
let currenciesInLocalStroage = JSON.parse(localStorage.getItem("currency"));
let currencyVal_InLocalStroage = JSON.parse(
  localStorage.getItem("currencyVal")
);

let sortedCateDataInLocal = JSON.parse(localStorage.getItem("category"));
let paymentModeDataInLocal = JSON.parse(localStorage.getItem("paymentMode"));
let budgetDataInLocal = JSON.parse(localStorage.getItem("budget"));
let currencySymbol = JSON.parse(localStorage.getItem("currencySymbol"));

//TODO <------  SETTING VALUES IF NOT IN LOCAL STORAGE  ---------->

if (!currenciesInLocalStroage) {
  localStorage.setItem("currency", JSON.stringify(sortedCurrency));
}

if (!currencyVal_InLocalStroage) {
  localStorage.setItem("currencyVal", JSON.stringify("PKR"));
}

if (!sortedCateDataInLocal) {
  localStorage.setItem("category", JSON.stringify(sortedCategory));
}

if (!paymentModeDataInLocal) {
  localStorage.setItem("paymentMode", JSON.stringify(paymentModeArr));
}

if (!budgetDataInLocal) {
  localStorage.setItem("budget", JSON.stringify(0));
}

if (!currencySymbol) {
  localStorage.setItem("currencySymbol", JSON.stringify("₨"));
}

const Dashboard = () => {
  const dispatch = useDispatch();
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);

  const { generalLoading } = useSelector((state) => state.generalLoading);
  const { allTransaction_IncomeAndExpenseArr } = useSelector(
    (state) => state.All_IncomeAndExpenseSlice
  );

  //! <---------------------  CREATING VALUES  ------------------------->

  const startDate = parseInt(JSON.parse(localStorage.getItem("startDate")));

  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1; // Note: Months are zero-based, so 3 represents April

  const firstDayOfNextMonth = new Date(year, month + 1, 1);
  // Subtract one day to get the last day of the current month
  const lastDayOfMonth = new Date(firstDayOfNextMonth - 1);
  // Return the date part (day of the month)
  const lastDayOfMonthDate = lastDayOfMonth.getDate();

  //** */ <  -------------------------- calculateExpenseStartDate_EndDate   -------------------------->

  let incomeSum = 0;
  let expenseSum = 0;
  let overAllSum = 0;
  let overAllExpense = 0;

  const calculateIncomeExpenseSums = (data) => {
    data.forEach((month) => {
      month.data.forEach((transaction) => {
        const date = new Date(transaction.dateAndTime).getDate();
        const transactionMonth =
          new Date(transaction.dateAndTime).getMonth() + 1;
        const curruntMonth = new Date().getMonth() + 1;

        if (
          transaction.type === "Income" &&
          curruntMonth === transactionMonth &&
          date >= startDate &&
          date <= lastDayOfMonthDate
        ) {
          incomeSum = incomeSum + transaction.amount;
        } else if (
          transaction.type === "Expense" &&
          curruntMonth === transactionMonth &&
          date >= startDate &&
          date <= lastDayOfMonthDate
        ) {
          expenseSum = expenseSum + transaction.amount;
        } 
      });
    });
  };

  const calculateOverAllIncomeAndExpense = (data) => {
    data.forEach((month) => {
      month.data.forEach((transaction) => {
        if (transaction.type === "Income") {
          overAllSum = overAllSum + transaction.amount;
        } else if (transaction.type === "Expense") {
          overAllExpense = overAllExpense + transaction.amount;
        }
      });
    });
  };

  //! <------------------------------------------------------------------->

  // //TODO <---------------------  CALLING FUNCTION  ------------------------->

  if (
    allTransaction_IncomeAndExpenseArr &&
    allTransaction_IncomeAndExpenseArr.length > 0
  ) {
    calculateIncomeExpenseSums(allTransaction_IncomeAndExpenseArr);
    calculateOverAllIncomeAndExpense(allTransaction_IncomeAndExpenseArr);
  }

  const menuDrawerHander = () => {
    setMenuDrawerOpen(!menuDrawerOpen);
  };

  useEffect(() => {
    dispatch(getAllIncomeAndExpenses());
  }, [dispatch]);

  return (
    <>
      {generalLoading ? (
        <Loading />
      ) : (
        <div id="Dashboard_Major_Container">
          <Menu
            menuDrawerOpen={menuDrawerOpen}
            menuDrawerHander={menuDrawerHander}
          />
          <DashboardCenter
            incomeSum={incomeSum}
            expenseSum={expenseSum}
            overAllSum={overAllSum}
            overAllExpense={overAllExpense}
            menuDrawerHander={menuDrawerHander}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;
