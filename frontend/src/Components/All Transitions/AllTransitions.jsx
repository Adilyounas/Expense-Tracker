import React, { useEffect, useState } from "react";
import FilterDrawer from "../FilterDrawer/FilterDrawer";
import { Box } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import "./allTransaction.css";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import { NavLink } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import getAllIncomeAndExpenses from "../../Redux/Actions/getAllinComeAndExpense";

const AllTransitions = () => {
  // const currencyVal = JSON.parse(localStorage.getItem("currencyVal"))
  const currencySymbol = JSON.parse(localStorage.getItem("currencySymbol"))


  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const filterDrawerOpenCloseHandler = () => {
    setFilterDrawerOpen(!filterDrawerOpen);
  };

  const dispatch = useDispatch();
  const { generalLoading } = useSelector((state) => state.generalLoading);
  const { allTransaction_IncomeAndExpenseArr } =
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
          {allTransaction_IncomeAndExpenseArr ? (
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

                  {allTransaction_IncomeAndExpenseArr &&
                    allTransaction_IncomeAndExpenseArr.map((ele, index) => (
                      <Box className="alltransactions-body" key={ele.month}>
                        <h3>{ele.month}</h3>

                        {allTransaction_IncomeAndExpenseArr &&
                          allTransaction_IncomeAndExpenseArr[index].data.map(
                            (ele) => (
                              <NavLink key={ele._id} to={`/allTransitions/${ele._id}`}>
                                <span>
                                  <span className="transaction_date-Icon">
                                    <p>{ele.day}</p>
                                  </span>
                                  <Box
                                    component={"span"}
                                    className="transaction-Details"
                                  >
                                    <Box
                                      color={
                                        ele.type === "Income" ? "green" : "red"
                                      }
                                      className="p1-price"
                                    >
                                     {`${currencySymbol}:`} {ele.type === "Income" ? "+" : "-"}
                                      {ele.amount}
                                    </Box>
                                    <Box
                                      color={
                                        ele.type === "Income" ? "green" : "red"
                                      }
                                      className="p2-des"
                                    >
                                      {ele.category}
                                    </Box>
                                  </Box>
                                </span>
                                <ChevronRightIcon />
                              </NavLink>
                            )
                          )}
                      </Box>
                    ))}
                </div>
              </div>
              <FilterDrawer
                filterDrawerOpen={filterDrawerOpen}
                filterDrawerOpenCloseHandler={filterDrawerOpenCloseHandler}
              />
            </>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default AllTransitions;
