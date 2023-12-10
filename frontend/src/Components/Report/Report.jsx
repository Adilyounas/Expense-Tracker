import React, { useEffect, useState } from "react";
import "./report.css";
import { Box, Container } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterDrawer from "../FilterDrawer/FilterDrawer";
import { useSelector, useDispatch } from "react-redux";

import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import getAllIncomeAndExpenses from "../../Redux/Actions/getAllinComeAndExpense";
import Loading from "../Loading/Loading";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import { resetFilterData_To_ApiFreshData_Reducer } from "../../Redux/Slice/All_IncomeAndExpenseSlice";

const Report = () => {
  let currencySymbol = JSON.parse(localStorage.getItem("currencySymbol"));

  const dispatch = useDispatch();
  const { generalLoading } = useSelector((state) => state.generalLoading);
  const { allTransaction_IncomeAndExpenseArr, filtered_IncomeAndExpenseArr } =
    useSelector((state) => state.All_IncomeAndExpenseSlice);

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const filterDrawerOpenCloseHandler = () => {
    setFilterDrawerOpen(!filterDrawerOpen);
  };

  let expenseDataCustom = [];
  let IncomeDataCustom = [];

  if (filtered_IncomeAndExpenseArr) {
    filtered_IncomeAndExpenseArr.forEach((transaction) => {
      if (transaction.type === "Expense") {
        const existingCategory = expenseDataCustom.find(
          (item) => item.category === transaction.category
        );

        if (existingCategory) {
          existingCategory.amount += transaction.amount;
        } else {
          expenseDataCustom.push({
            category: transaction.category,
            amount: transaction.amount,
          });
        }
      }

      if (transaction.type === "Income") {
        const existingCategory = IncomeDataCustom.find(
          (item) => item.category === transaction.category
        );

        if (existingCategory) {
          existingCategory.amount += transaction.amount;
        } else {
          IncomeDataCustom.push({
            category: transaction.category,
            amount: transaction.amount,
          });
        }
      }
    });
  }

  const expenseSum = expenseDataCustom.reduce((acc, ele) => {
    return (acc = acc + ele.amount);
  }, 0);

  const incomeSum = IncomeDataCustom.reduce((acc, ele) => {
    return (acc = acc + ele.amount);
  }, 0);

  const data = [];
  const data2 = [];

  expenseDataCustom.forEach((ele) => {
    data.push({ value: ele.amount, label: ele.category });
  });

  IncomeDataCustom.forEach((ele) => {
    data2.push({ value: ele.amount, label: ele.category });
  });

  useEffect(() => {
    dispatch(getAllIncomeAndExpenses());
  }, [dispatch]);

  return (
    <>
      {generalLoading ? (
        <Loading />
      ) : (
        <>
          <Box
            sx={{
              m: "10vh 0 20vh 0 ",
            }}
          >
            <Container
              maxWidth="sm"
              sx={{
                flexGrow: 1,
                border: "1px solid #e1e1e1",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                p: "1vmax",
                borderRadius: "7px",
                boxShadow: "0px 10px 10px 0px #e1e1e1",
              }}
            >
              <span className="reportPageTitle">Report Page </span>
              <FilterAltIcon
                onClick={filterDrawerOpenCloseHandler}
                className="ReportPagefilterIcon"
              />
            </Container>

            {expenseDataCustom && expenseDataCustom.length > 0 ? (
              <div id="expenseReport">
                <PieChart
                  series={[
                    {
                      arcLabel: (item) => `${currencySymbol}:${expenseSum}`,
                      arcLabelMinAngle: 45,
                      data: data,
                      innerRadius: 120,

                      outerRadius: 170,
                    },
                  ]}
                  sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                      fill: "red",
                      fontWeight: "bold",
                    },
                  }}
                  height={700}
                />

                <Box id="expenseAccordian">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography id="expenseAccordianTitle">
                        Expense
                      </Typography>
                    </AccordionSummary>
                    {expenseDataCustom &&
                      expenseDataCustom.length > 0 &&
                      expenseDataCustom.map((ele, index) => (
                        <AccordionDetails key={index}>
                          <Box id="expenseAccordianSummary">
                            <span>{ele.category}</span>
                            <span
                              style={{ color: "red" }}
                            >{`- ${ele.amount}`}</span>
                          </Box>
                        </AccordionDetails>
                      ))}
                  </Accordion>
                </Box>
              </div>
            ) : (
              <Box
                sx={{
                  fontSize: "2rem",
                  textAlign: "center",
                  padding: "5vmax 0",
                }}
              >
                No Expense Transaction
              </Box>
            )}

            {IncomeDataCustom && IncomeDataCustom.length > 0 ? (
              <div className="incomeReport">
                <PieChart
                  series={[
                    {
                      arcLabel: (item) => `${currencySymbol}:${incomeSum}`,
                      arcLabelMinAngle: 45,
                      data: data2,
                      innerRadius: 120,

                      outerRadius: 170,
                    },
                  ]}
                  sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                      fill: "green",
                      fontWeight: "bold",
                    },
                  }}
                  height={700}
                />

                <Box id="expenseAccordian">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography id="expenseAccordianTitle">Income</Typography>
                    </AccordionSummary>
                    {IncomeDataCustom &&
                      IncomeDataCustom.length > 0 &&
                      IncomeDataCustom.map((ele, index) => (
                        <AccordionDetails key={index}>
                          <Box id="expenseAccordianSummary">
                            <span>{ele.category}</span>
                            <span
                              style={{ color: "green" }}
                            >{`+ ${ele.amount}`}</span>
                          </Box>
                        </AccordionDetails>
                      ))}
                  </Accordion>
                </Box>
              </div>
            ) : (
              <Box
                sx={{
                  fontSize: "2rem",
                  textAlign: "center",
                  padding: "5vmax 0",
                }}
              >
                No Income Transaction
              </Box>
            )}

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
          </Box>
        </>
      )}
    </>
  );
};

export default Report;
