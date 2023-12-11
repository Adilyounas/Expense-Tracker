import React, { useEffect, useState } from "react";

//TODO <---------  MATERIAL UI ------------------>

import { Box, Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

//TODO <---------  CSS FILE ------------------>

//TODO <---------  PACKAGES IMPORRT ------------------>

import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
//REACT ROUTER DOM
import { NavLink } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
//TODO <---------  COMPONENTS FORM OTHER FILES ------------------>

import Loading from "../Loading/Loading";
import updateTransaction from "../../Redux/Actions/updateTransaction";
import deleteTransactionAction from "../../Redux/Actions/deleteTransaction";
//TODO <--------- REACT REDUX ------------------>

import { useDispatch, useSelector } from "react-redux";
import singleTransactionAction from "../../Redux/Actions/singleTransaction";
import DeleteIcon from "@mui/icons-material/Delete";

import DeleteTransaction from "./DeleteTransaction";

//TODO <------------  COMPONENT START FORM HERE  ---------------------->

const EditTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //TODO <------------  GETTING DATA FROM LOCAL STORAGE ON EVERY CALL  ---------------------->
  const category = JSON.parse(localStorage.getItem("category"));
  const paymentMode = JSON.parse(localStorage.getItem("paymentMode"));

  //TODO <------------  USE SELECTOR HOOK ---------------------->

  const { generalLoading } = useSelector((state) => state.generalLoading);

  const { singleTransactionData } = useSelector(
    (state) => state.SingleTransaction
  );



  //TODO <------------  USESTATE HOOKS  ---------------------->

  const [dateAndTimeValue, setDateAndTimeValue] = useState(new Date());

  const [deleteTransactionDialogOpen, setDeleteTransactionDialogOpen] =
    useState(false);

  const deleteTransactionDialogOpenHandler = () => {
    setDeleteTransactionDialogOpen(!deleteTransactionDialogOpen);
  };

  const deleteTransactionConfirmedHandler = () => {
    dispatch(deleteTransactionAction(id, navigate));
    setDeleteTransactionDialogOpen(!deleteTransactionDialogOpen);
  };

  let [incomeData, setIncomeData] = useState({
    amount: "",
    category: "",
    dateAndTime: "",
    paymentMode: "",
    note: "",
  });

  if (singleTransactionData && incomeData.amount === "") {
    setTimeout(() => {
      setDateAndTimeValue(singleTransactionData.dateAndTime);
      setIncomeData((old) => ({
        ...old,
        amount: singleTransactionData.amount,
        category: singleTransactionData.category,
        dateAndTime: singleTransactionData.dateAndTime,
        paymentMode: singleTransactionData.paymentMode,
        note: singleTransactionData.note,
      }));
    }, 1000);
  }

  const timeAndDataChangeHandler = (e) => {
    setDateAndTimeValue(e);
    setIncomeData((old) => ({ ...old, dateAndTime: e }));
  };

  const onChangeHandler = (e) => {
    let { name, value } = e.target;

    if (name === "amount") {
      value = parseFloat(value);
      setIncomeData((old) => ({ ...old, [name]: value }));
    }

    setIncomeData((old) => ({ ...old, [name]: value }));
  };

  const IncomeSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateTransaction(incomeData, id, navigate));
  };

  useEffect(() => {
    dispatch(singleTransactionAction(id));
  }, [dispatch, id]);

  return (
    <>
      {generalLoading ? (
        <Loading />
      ) : singleTransactionData && singleTransactionData ? (
        <Box component={"div"} id="addIncome_Major_Container">
          <form className="income_Container" onSubmit={IncomeSubmitHandler}>
            <Box
              id="editTransactionPage"
              display={"flex"}
              justifyContent={"space-between"}
              component={"div"}
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <NavLink to={"/allTransitions"}>
                  <KeyboardBackspaceIcon />
                </NavLink>
                <h2 style={{ marginLeft: "10px" }} id="headingCharm">
                  Edit Transaction
                </h2>
              </span>
              <NavLink
                id="editTransaction_DeleteIcon"
                onClick={deleteTransactionDialogOpenHandler}
              >
                <DeleteIcon />
              </NavLink>
            </Box>

            <Box component={"div"}>
              {/* <p>Amount</p> */}

              <TextField
                name="amount"
                type="number"
                required
                placeholder="Enter Your Amount"
                fullWidth
                variant="outlined"
                onChange={onChangeHandler}
                defaultValue={singleTransactionData.amount}
              />
            </Box>

            <Box component={"div"}>
              {/* <p>Income Category</p> */}
              <TextField
                name="category"
                select
                fullWidth
                defaultValue={singleTransactionData.category ?? "Accounting"}
                helperText="Expense Category"
                onChange={onChangeHandler}
              >
                {category.map((option) => (
                  <MenuItem
                    name={option.name}
                    key={option.id}
                    value={option.value}
                  >
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box component={"div"}>
              {/* <p>Date And Time</p> */}

              <DateTimePicker
                onChange={timeAndDataChangeHandler}
                value={dateAndTimeValue}
              />
            </Box>

            <Box component={"div"}>
              {/* <p>Mode</p> */}
              <TextField
                name="paymentMode"
                id="outlined-select-currency"
                select
                fullWidth
                defaultValue={singleTransactionData.paymentMode ?? "Cash"}
                helperText="Money Giving Type"
                onChange={onChangeHandler}
              >
                {paymentMode.map((option) => (
                  <MenuItem
                    // name={option.name}
                    key={option.id}
                    value={option.value}
                  >
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box component={"div"}>
              {/* <p>Note</p> */}

              <TextField
                name="note"
                placeholder="Add Note"
                fullWidth
                variant="outlined"
                onChange={onChangeHandler}
                defaultValue={singleTransactionData.note}
              />
            </Box>

            <Button type="submit" variant="contained">
              Edit
            </Button>
          </form>
          <DeleteTransaction
            deleteTransactionDialogOpen={deleteTransactionDialogOpen}
            deleteTransactionDialogOpenHandler={
              deleteTransactionDialogOpenHandler
            }
            deleteTransactionConfirmedHandler={
              deleteTransactionConfirmedHandler
            }
          />
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default EditTransaction;
