import React from "react";
import { Box, Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LinearProgress from "@mui/material/LinearProgress";
import "./dashboardCenter.css";
import { NavLink } from "react-router-dom";
// import AddIcon from "@mui/icons-material/Add";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";

const DashboardCenter = (props) => {
  const budget = JSON.parse(localStorage.getItem("budget"));
  const currencySymbol = JSON.parse(localStorage.getItem("currencySymbol"));

  const {
    menuDrawerHander,
    incomeSum,
    expenseSum,
    overAllSum,
    overAllExpense,
  } = props;

  const curruntDate = new Date();

  //TODO < ------------  CALCULATION FOR MONTHLY INCOME AND EXPENSE --------------->

  const total = Math.abs(incomeSum) + Math.abs(expenseSum);

  const incomePercentage =
    ((Math.abs(incomeSum) - Math.abs(expenseSum)) / total) * 100;

  const expensePercentage = 100 - incomePercentage;

  const incomeAndExpenseDiff = incomeSum - expenseSum;

  // <-----------------------------
  // Calculate the percentage of expense relative to the budget
  const percentage = (expenseSum / budget) * 100;
  const normalizedPercentage = Math.min(100, Math.max(0, percentage));

  //TODO < -----------  CALCULATION FOR OVER ALL -  INCOME AND EXPENSE --------------->

  const total2 = Math.abs(overAllSum) + Math.abs(overAllExpense);

  const incomePercentage2 =
    ((Math.abs(overAllSum) - Math.abs(overAllExpense)) / total2) * 100;

  const expensePercentage2 = 100 - incomePercentage2;

  return (
    <>
      <Box className="dashboardContainer">
        <div id="dashboard_box_1">
          <div className="dashboard_box_1_leftSide">
            <Box component={"h3"}>{`${
              curruntDate.getMonth() + 1
            }-${curruntDate.getFullYear()}-Balance`}</Box>
            <Box component={"h4"}>
              Month Income {`${currencySymbol}: + ${incomeSum}`}{" "}
            </Box>
            <Box component={"h4"}>
              Month Expense {`${currencySymbol}: - ${expenseSum}`}
            </Box>
            <Box component={"h1"}>
              {" "}
              {`${currencySymbol}: ${incomeAndExpenseDiff}`}
            </Box>
          </div>
          <div className="dashboard_box_1_rightSide">
            <Button onClick={menuDrawerHander} style={{ color: "white" }}>
              <MoreHorizIcon />
            </Button>
          </div>
        </div>

        <div id="dashboard_box_1">
          <div className="dashboard_box_1_leftSide">
            <Box component={"h3"}> Over - All</Box>
            <Box component={"h4"}>
              Income {`${currencySymbol}: + ${overAllSum}`}{" "}
            </Box>
            <Box component={"h4"}>
              Expense {`${currencySymbol}: - ${overAllExpense}`}
            </Box>
            <Box component={"h1"}>
              {" "}
              {`${currencySymbol}: ${overAllSum - overAllExpense}`}
            </Box>
          </div>
        </div>

        <NavLink id="dashboard_budget_box" to={"/setBudget"}>
          <Box component={"h2"}>Budget {`${currencySymbol}: ${budget}`}</Box>

          <LinearProgress variant="determinate" value={normalizedPercentage} />
          {budget > 0 ? (
            <Box component={"h3"}>
              Remaining Budget{" "}
              {`${currencySymbol}: ${
                budget > expenseSum ? budget - expenseSum : "0"
              }`}
            </Box>
          ) : (
            ""
          )}
        </NavLink>

        <div id="detailsInPercentage_box">
          {/* <Box component={"h2"}></Box> */}

          <Box component={"div"} textAlign={"center"}>
            <h2 id="base">Monthly Base</h2>
            <div>
              <Box component={"h2"}>Balance%</Box>
              <Box className="income_p_percentage" component={"p"}>
                {incomePercentage !== Infinity
                  ? `${Math.round(incomePercentage)}%`
                  : "0%"}
              </Box>
            </div>

            <div>
              <Box component={"h2"}>Expense%</Box>
              <Box className="expense_p_percentage" component={"p"}>
                {expensePercentage !== Infinity
                  ? `${Math.round(expensePercentage)}%`
                  : "0%"}
              </Box>
            </div>
          </Box>

          <Box textAlign={"center"}>
            <h2 id="base">Over All Base</h2>
            <div>
              <Box component={"h2"}>Balance%</Box>
              <Box className="income_p_percentage" component={"p"}>
                {incomePercentage2 !== Infinity
                  ? `${Math.round(incomePercentage2)}%`
                  : "0%"}
              </Box>
            </div>

            <div>
              <Box component={"h2"}>Expense%</Box>
              <Box className="expense_p_percentage" component={"p"}>
                {expensePercentage2 !== Infinity
                  ? `${Math.round(expensePercentage2)}%`
                  : "0%"}
              </Box>
            </div>
          </Box>
        </div>
        <div id="actionAndDetails_box">
          <NavLink to={"/addIncome"}>
            <AttachMoneyIcon />
            <Box component={"h2"}>Add Income</Box>
          </NavLink>

          <NavLink to={"/addExpense"}>
            <PointOfSaleIcon />
            <Box component={"h2"}>Add Expense</Box>
          </NavLink>

          <NavLink to={"allTransitions"}>
            <ReceiptLongIcon />
            <Box component={"h2"}>All Transitions</Box>
          </NavLink>

          <NavLink to={"/reports"}>
            <DonutSmallIcon />
            <Box component={"h2"}>Report</Box>
          </NavLink>
        </div>
      </Box>
    </>
  );
};

export default DashboardCenter;
