import React, { useEffect, useState } from "react";
import FilterDrawer from "../FilterDrawer/FilterDrawer";
import { Box } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import "./allTransaction.css";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import { NavLink } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { resetFilterData_To_ApiFreshData_Reducer } from "../../Redux/Slice/All_IncomeAndExpenseSlice";

import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import getAllIncomeAndExpenses from "../../Redux/Actions/getAllinComeAndExpense";

const AllTransitions = () => {
  // const currencyVal = JSON.parse(localStorage.getItem("currencyVal"))
  const currencySymbol = JSON.parse(localStorage.getItem("currencySymbol"));

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const filterDrawerOpenCloseHandler = () => {
    setFilterDrawerOpen(!filterDrawerOpen);
  };

  const dispatch = useDispatch();
  const { generalLoading } = useSelector((state) => state.generalLoading);
  const { allTransaction_IncomeAndExpenseArr, filtered_IncomeAndExpenseArr } =
    useSelector((state) => state.All_IncomeAndExpenseSlice);

  useEffect(() => {
    dispatch(getAllIncomeAndExpenses());
  }, [dispatch]);

  return (
    <>
      {generalLoading ? (
        <Loading />
      ) : (
        <>
          <div id="allTransaction_Major_Container">
            <div className="allTransactions">
              <Box className="alltransaction-title">
                <span>
                  <NavLink to={"/"}>
                    <KeyboardBackspaceIcon />
                  </NavLink>
                  <h2 id="headingCharm">All Transactions</h2>
                </span>

                <span className="spanlinks">
                  <NavLink onClick={filterDrawerOpenCloseHandler}>
                    <FilterAltIcon />
                  </NavLink>
                  <NavLink>
                    <ShortcutIcon />
                  </NavLink>
                </span>
              </Box>

              {/* ele.enteryMonth=== new Date(transaction.dateAndTime).getMonth()   */}

              {allTransaction_IncomeAndExpenseArr && allTransaction_IncomeAndExpenseArr.length>0 ? (
                allTransaction_IncomeAndExpenseArr.map((ele, index) => (
                  <Box className="alltransactions-body" key={ele.month}>
                    <h3>{ele.month}</h3>

                    {filtered_IncomeAndExpenseArr &&
                      filtered_IncomeAndExpenseArr
                        .filter(
                          (transaction) =>
                            ele.enteryMonth ===
                              new Date(transaction.dateAndTime).getMonth() &&
                            ele.enteryYear ===
                              new Date(transaction.dateAndTime).getFullYear()
                        )
                        .map((result) => (
                          <NavLink
                            key={result._id}
                            to={`/allTransitions/${result._id}`}
                          >
                            <span>
                              <span className="transaction_date-Icon">
                                <p>{result.day}</p>
                              </span>
                              <Box
                                component={"span"}
                                className="transaction-Details"
                              >
                                <Box
                                  color={
                                    result.type === "Income" ? "green" : "red"
                                  }
                                  className="p1-price"
                                >
                                  {`${currencySymbol}:`}{" "}
                                  {result.type === "Income" ? "+" : "-"}
                                  {result.amount}
                                </Box>
                                <Box
                                  color={
                                    result.type === "Income" ? "green" : "red"
                                  }
                                  className="p2-des"
                                >
                                  {result.category}
                                </Box>
                              </Box>
                            </span>
                            <ChevronRightIcon />
                          </NavLink>
                        ))}
                  </Box>
                ))
              ) : (
                <Box
                  sx={{
                    fontSize: "2rem",
                    textAlign: "center",
                    padding: "5vmax 0",
                  }}
                >
                  No Transaction
                </Box>
              )}
            </div>
            <FilterDrawer
              filterDrawerOpen={filterDrawerOpen}
              filterDrawerOpenCloseHandler={filterDrawerOpenCloseHandler}
              filtered_IncomeAndExpenseArr={filtered_IncomeAndExpenseArr}
              allTransaction_IncomeAndExpenseArr={
                allTransaction_IncomeAndExpenseArr
              }
              resetFilterData_To_ApiFreshData_Reducer={
                resetFilterData_To_ApiFreshData_Reducer
              }
            />
          </div>
        </>
      )}
    </>
  );
};

export default AllTransitions;
