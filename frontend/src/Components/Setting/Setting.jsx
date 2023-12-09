import React, { useState } from "react";
import { Box } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "../Add Category/addCategory.css";
import "./setting.css";
import { NavLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// import currenciesArr from "../Static Data/Currencies";
import ResetSettingDialog from "./ResetSettingDialog";

import sortedCurrency from "../Static Data/Currencies";
import sortedCategory from "../Static Data/Category";
import paymentModeArr from "../Static Data/Payment";
import TimeFormateDialog from "./TimeFormateDialog";

const Settings = () => {
  //TODO <--------------  GETTING VALUES FORM LOCAL STORAGE   ---------------->

  let currencyVal = JSON.parse(localStorage.getItem("currencyVal"));
  let currenciesArr = JSON.parse(localStorage.getItem("currency"));
  const timeVal = JSON.parse(localStorage.getItem("timeVal"));
  // let currencySymbol = JSON.parse(localStorage.getItem("currencySymbol"));

  //TODO <------------------  USESTATES  -------------------->

  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [timeFormateDialogOpen, setTimeFormateDialogOpen] = useState(false);
  const [timeFormateVal, setTimeFormateVal] = useState(timeVal);

  const [reRender, setReRender] = useState(false);

  //TODO <--------------------  CLEAR YOUR SETTING  --------------------->

  const clearSettingHandler = () => {
    //** */ <--------------------  REMOVE ITEMS FROM LOCAL STORAGE  --------------------->

    localStorage.removeItem("category");
    localStorage.removeItem("paymentMode");
    localStorage.removeItem("budget");
    localStorage.removeItem("currencyVal");
    localStorage.removeItem("currency");
    localStorage.removeItem("currencySymbol");
    localStorage.removeItem("timeVal");
    localStorage.removeItem("startDate");


    //** */ <--------------------  ADD DEFAULT ITEMS TO LOCAL STORAGE  --------------------->

    localStorage.setItem("category", JSON.stringify(sortedCategory));
    localStorage.setItem("paymentMode", JSON.stringify(paymentModeArr));
    localStorage.setItem("budget", JSON.stringify(0));
    localStorage.setItem("currencyVal", JSON.stringify("PKR"));
    localStorage.setItem("currency", JSON.stringify(sortedCurrency));
    localStorage.setItem("currencySymbol", JSON.stringify("₨"));
    localStorage.setItem("timeVal", JSON.stringify("02:30 PM"));
    localStorage.setItem("startDate", JSON.stringify(1));

    //** */ <--------------------  TIME STATE IS CHANGING --------------------->
    setTimeFormateVal("02:30 PM");

    //** */ <-------- RERENDER THE SETTING COMPONENT AND CLOSE THE DIALOG   ------->

    setReRender(!reRender);
    setResetDialogOpen(!resetDialogOpen);
  };

  //TODO <--------------------  TIME ONCHANGE HANDLER  --------------------->

  const timeOnChangeHandler = (e) => {
    const time = e.target.value;
    localStorage.setItem("timeVal", JSON.stringify(time));

    setTimeFormateVal(time);
    setTimeFormateDialogOpen(!timeFormateDialogOpen);
    setReRender(!reRender);
  };

  //TODO <-----------------------  CANCEL BUTTON  ------------------------->

  const cancelResetHandler = () => {
    // console.log("cancel");
    setResetDialogOpen(!resetDialogOpen);
  };

  const currencyOnChangeHandler = (e) => {
    const selectedCurrencyObj = currenciesArr.find(
      (currency) => currency.currency === e.target.value
    );

    // Update state with the selected currency symbol
    if (selectedCurrencyObj) {
      localStorage.setItem("currencyVal", JSON.stringify(e.target.value));
      localStorage.setItem(
        "currencySymbol",
        JSON.stringify(selectedCurrencyObj.symbol)
      );
    }
    setReRender(!reRender);
  };

  React.useEffect(() => {}, [reRender]);

  return (
    <>
      <ResetSettingDialog
        resetDialogOpen={resetDialogOpen}
        clearSettingHandler={clearSettingHandler}
        cancelResetHandler={cancelResetHandler}
      />

      <TimeFormateDialog
        timeFormateDialogOpen={timeFormateDialogOpen}
        setTimeFormateDialogOpen={setTimeFormateDialogOpen}
        timeOnChangeHandler={timeOnChangeHandler}
        timeFormateVal={timeFormateVal}
        timeVal={timeVal}
      />

      <div id="addCategory_Major_Container">
        <div className="addCategory">
          <Box className="addCategory_title" id="setting_title">
            <span>
              <NavLink to={"/"}>
                <KeyboardBackspaceIcon />
              </NavLink>
              <h2 id="headingCharm">Settings</h2>
            </span>
          </Box>

          <Box component={"div"} id="setting_body">
            <div className="clearAllRecords two_spans">
              <span>
                <h3>Clear All Records</h3>
                <p>This will clear your all income, expense entries</p>
              </span>
              <span>
                <ChevronRightIcon />
              </span>
            </div>
            <div
              className="resetAllYourSetting two_spans"
              onClick={() => setResetDialogOpen(!resetDialogOpen)}
            >
              <span>
                <h3>Rest To Default Settings</h3>
                <p>
                  This will Reset, Added Set-Budget, Start-Date, Payment-Mode, Categories,
                  Time-Formate
                </p>
              </span>
              <span>
                <ChevronRightIcon />
              </span>
            </div>

            <div className="setCurrency">
              <h3>Currency</h3>
              <TextField
                id="standard-select-currency"
                select
                fullWidth
                defaultValue={currencyVal}
                value={currencyVal}
                helperText="Please select your currency"
                variant="standard"
                onChange={currencyOnChangeHandler}
              >
                {currenciesArr.length > 0 &&
                  currenciesArr.map((option) => (
                    <MenuItem key={option.id} value={option.currency}>
                      {`${option.country}   ---   (${option.symbol})`}
                    </MenuItem>
                  ))}
              </TextField>
            </div>

            {/* <div
              className="timeFormate_div two_spans"
              onClick={() => setTimeFormateDialogOpen(true)}
            >
              <span>
                <h3>Time Formate</h3>
                <p>Selete The Time Formate You Want</p>
              </span>
              <span>
                <ChevronRightIcon />
              </span>
            </div> */}
          </Box>
        </div>
      </div>
    </>
  );
};

export default Settings;
