import React, { useState } from "react";

//TODO <---------  MATERIAL UI ------------------>

import { Box, Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

//TODO <---------  CSS FILE ------------------>

import "./incomeAndExpense.css";

//TODO <---------  PACKAGES IMPORRT ------------------>

import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
//REACT ROUTER DOM
import { NavLink } from "react-router-dom";

//TODO <---------  COMPONENTS FORM OTHER FILES ------------------>

import Loading from "../Loading/Loading";
import addIncomeAction from "../../Redux/Actions/incomeActions";

//TODO <--------- REACT REDUX ------------------>

import { useDispatch, useSelector } from "react-redux";

//TODO <------------  COMPONENT START FORM HERE  ---------------------->

const AddIncome = () => {
  const dispatch = useDispatch();

  //TODO <------------  GETTING DATA FROM LOCAL STORAGE ON EVERY CALL  ---------------------->
  const category = JSON.parse(localStorage.getItem("category"));
  const paymentMode = JSON.parse(localStorage.getItem("paymentMode"));

  //TODO <------------  USE SELECTOR HOOK ---------------------->

  const generalLoading = useSelector(
    (state) => state.generalLoading.generalLoading
  );

  //TODO <------------  USESTATE HOOKS  ---------------------->

  const [dateAndTimeValue, setDateAndTimeValue] = useState(new Date());

  let [incomeData, setIncomeData] = useState({
    amount: "",
    category: category[0].value,
    dateAndTime: dateAndTimeValue,
    paymentMode: paymentMode[0].value,
    note: "",
    type:"Income"
  });

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
    // console.log(incomeData);
    dispatch(addIncomeAction(incomeData));
  };
  return (
    <>
      {generalLoading ? (
        <Loading />
      ) : (
        <Box component={"div"} id="addIncome_Major_Container">
          <form className="income_Container" onSubmit={IncomeSubmitHandler}>
            <Box
              id="incomePageTitle"
              component={"div"}
              display={"flex"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <NavLink to={"/"}>
                <KeyboardBackspaceIcon />
              </NavLink>
              <h2 id="headingCharm">Add Income</h2>
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
              />
            </Box>

            <Box component={"div"}>
              {/* <p>Income Category</p> */}
              <TextField
                name="category"
                select
                fullWidth
                defaultValue={category[0].value}
                helperText="Income Category"
                onChange={onChangeHandler}
              >
                {category.map((option) => (
                  <MenuItem name={option.name} key={option.id} value={option.value}>
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
                defaultValue={paymentMode[0].value}
                helperText="Money Recieve Type"
                onChange={onChangeHandler}
              >
                {paymentMode.map((option) => (
                  <MenuItem name={option.name} key={option.id} value={option.value}>
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
              />
            </Box>

            <Button type="submit" variant="contained">
              Add Income
            </Button>
          </form>
        </Box>
      )}
    </>
  );
};

export default AddIncome;
