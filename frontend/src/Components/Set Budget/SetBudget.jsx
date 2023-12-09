import React, { useState } from "react";
import { Box } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "../Add Category/addCategory.css";
import { NavLink } from "react-router-dom";
import EditBudget from "./EditBudget";

import EditIcon from "@mui/icons-material/Edit";
import EditStartDate from "./EditStartDate";
import toast from "react-hot-toast";

let startDate = JSON.parse(localStorage.getItem("startDate"));

if (!startDate) {
  localStorage.setItem("startDate", JSON.stringify(1));
}

const SetBudget = () => {
  let budgetLocalStorage = JSON.parse(localStorage.getItem("budget"));
  let startDate = JSON.parse(localStorage.getItem("startDate"));

  const [editBudgetOpen, setEditBudgetOpen] = useState(false);
  const [editStartDateOpen, setEditStartDateOpen] = useState(false);
  const [toasterOpen, setToasterOpen] = useState(true);

  const [inuptTextField, setInputTextField] = useState("");
  const [startDateInputField, setStartDateInputField] = useState("");

  //TODO <-------------------   EDIT StartDAte FORM SUBMIT HANDLER   ------------------->

  const editStartDateSubmitHandler = (e) => {
    e.preventDefault();

    if (startDateInputField) {
      localStorage.removeItem("startDate");
      localStorage.setItem("startDate", JSON.stringify(startDateInputField));
      // setStartDateInputField(startDateInputField);

      setEditStartDateOpen(!editStartDateOpen);
    }
  };

  //TODO <-------------------   EDIT setBUdget FORM SUBMIT HANDLER   ------------------->

  const editBudgetSubmitHandler = (e) => {
    e.preventDefault();

    if (inuptTextField) {
      localStorage.removeItem("budget");
      localStorage.setItem("budget", JSON.stringify(inuptTextField));
      setEditBudgetOpen(!editBudgetOpen);
    }
  };

  //TODO <-------------------   EDIT SET BUDGET OPEN & CLOSE HANDLER   ------------------->

  const editDialogOpenCloseHandler = () => {
    setEditBudgetOpen(!editBudgetOpen);
    setInputTextField(budgetLocalStorage);
  };

  //TODO <-------------------   EDIT Start date OPEN & CLOSE HANDLER   ------------------->

  const editStartDateOpenCloseHandler = () => {
    setEditStartDateOpen(!editStartDateOpen);
    setStartDateInputField(startDate);
  };

  //TODO <-------------------   INPUT START DATE ONCHANGE HANDLER   ------------------->

  //! <---------------------  SOME DATE CALCULATION   -------------------------------->
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1; // Note: Months are zero-based, so 3 represents April

  const firstDayOfNextMonth = new Date(year, month + 1, 1);

  // Subtract one day to get the last day of the current month
  const lastDayOfMonth = new Date(firstDayOfNextMonth - 1);

  // Return the date part (day of the month)
  const lastDayOfMonthDate = lastDayOfMonth.getDate();

  //! <------------------------------------------------------------------>
  if (!toasterOpen) {
    setTimeout(() => {
      setToasterOpen(true);
    }, 2000);
  }
  const startDateInputFieldOnchangeHandler = (e) => {
    let inputValue = e.target.value;
    parseInt(inputValue);

    // Check if the value is within the allowed range
    if (
      !isNaN(inputValue) &&
      inputValue >= 0 &&
      inputValue <= lastDayOfMonthDate
    ) {
      setStartDateInputField(inputValue);
    } else {
      if (toasterOpen) {
        toast.error(
          `This Month Consist of ${lastDayOfMonthDate} days So Enter Date Less Than ${lastDayOfMonthDate}`
        );

        setToasterOpen(false);
      }
    }
  };

  //TODO <-------------------   INPUT ONCHANGE HANDLER   ------------------->

  const inputOnChangeHandler = (e) => {
    let value = e.target.value;
    parseFloat(value);
    setInputTextField(value);
  };

  return (
    <>
      <EditStartDate
        editStartDateOpen={editStartDateOpen}
        setEditStartDateOpen={setEditStartDateOpen}
        editStartDateSubmitHandler={editStartDateSubmitHandler}
        startDateInputField={startDateInputField}
        startDateInputFieldOnchangeHandler={startDateInputFieldOnchangeHandler}
        editStartDateOpenCloseHandler={editStartDateOpenCloseHandler}
      />

      <EditBudget
        editBudgetOpen={editBudgetOpen}
        editDialogOpenCloseHandler={editDialogOpenCloseHandler}
        inuptTextField={inuptTextField}
        inputOnChangeHandler={inputOnChangeHandler}
        editBudgetSubmitHandler={editBudgetSubmitHandler}
        setEditBudgetOpen={setEditBudgetOpen}
      />

      <div id="addCategory_Major_Container">
        <div className="addCategory">
          <Box className="addCategory_title">
            <span>
              <NavLink to={"/"}>
                <KeyboardBackspaceIcon />
              </NavLink>
              <h2 id="headingCharm">Set Budget</h2>
            </span>
          </Box>

          <p>Set Budget</p>
          <Box component={"div"} id="addCategory_body">
            <span className="addcategoryName">{budgetLocalStorage}</span>
            <span className="addcategoryIcons">
              <EditIcon onClick={editDialogOpenCloseHandler} />
            </span>
          </Box>

          <p>Start Date</p>
          <Box component={"div"} id="addCategory_body">
            <span className="addcategoryName">{startDate}</span>
            <span className="addcategoryIcons">
              <EditIcon onClick={editStartDateOpenCloseHandler} />
            </span>
          </Box>
        </div>
      </div>
    </>
  );
};

export default SetBudget;
