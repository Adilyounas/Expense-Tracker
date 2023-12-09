import React, { useState } from "react";
import "./filterDrawer.css";
import { Box, Drawer } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import CheckIcon from "@mui/icons-material/Check";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import { modifiedData } from "../../Redux/Slice/All_IncomeAndExpenseSlice";
import { useDispatch } from "react-redux";
import activeRadioSelectionHandler from "./filteration";

import {
  checkAndModified,
} from "./filteration";

const FilterDrawer = (props) => {
  const dispatch = useDispatch();
  const {
    filterDrawerOpen,
    filterDrawerOpenCloseHandler,
    filtered_IncomeAndExpenseArr,
    allTransaction_IncomeAndExpenseArr,
  } = props;

  const category = JSON.parse(localStorage.getItem("category"));
  const paymentMode = JSON.parse(localStorage.getItem("paymentMode"));

  const [activeRadioValue, setActiveRadioValue] = useState("all");
  const [dateAndTimeValueFrom, setDateAndTimeValueFrom] = useState(new Date());
  const [dateAndTimeValueTo, setDateAndTimeValueTo] = useState(new Date());

  //TODO <-------------------------   DATE-FROM & TO    ---------------------------------->

  // setTimeout(() => {
  //   if (dateAndTimeValueFrom && dateAndTimeValueFrom !== dateAndTimeValueTo&& dateAndTimeValueTo ) {
  //     console.log("changing");
  //   }

  // }, 1000);

  //TODO <-------------------------------------------------------------->

  return (
    <Drawer open={filterDrawerOpen} onClose={filterDrawerOpenCloseHandler}>
      <div id="filterDrawer_Major_Container">
        <div className="filterDrawer">
          <Box
            component={"div"}
            display={"flex"}
            justifyContent={"space-around"}
            alignItems={"center"}
            //   padding={"1vmax"}
            id="filterDrawer_Action_btn_Div"
          >
            <ReplayIcon />
            <CheckIcon
              onClick={() => {
                filterDrawerOpenCloseHandler();
                checkAndModified(
                  dispatch,
                  modifiedData,
                  dateAndTimeValueFrom,
                  dateAndTimeValueTo,
                  filtered_IncomeAndExpenseArr,
                  allTransaction_IncomeAndExpenseArr
                );
              }}
            />
            {/* <Button size="large" startIcon={} /> */}
            {/* <Button  startIcon={} /> */}
          </Box>
          <h2>Quick Access</h2>
          <Box id="radioBoxes_container" component={"div"}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="all"
                name="radio-buttons-group"
                value={activeRadioValue}
                onChange={(event) =>
                  activeRadioSelectionHandler(
                    event,
                    dispatch,
                    filtered_IncomeAndExpenseArr,
                    setActiveRadioValue,
                    modifiedData,
                    allTransaction_IncomeAndExpenseArr
                  )
                }
              >
                <FormControlLabel value="all" control={<Radio />} label="All" />
                <FormControlLabel
                  value="yesterday"
                  control={<Radio />}
                  label="Yester Day"
                />
                <FormControlLabel
                  value="thisMonth"
                  control={<Radio />}
                  label="This Month"
                />

                <FormControlLabel
                  value="today"
                  control={<Radio />}
                  label="Today"
                />
                <FormControlLabel
                  value="lastWeek"
                  control={<Radio />}
                  label="Last Week"
                />
                <FormControlLabel
                  value="lastMonth"
                  control={<Radio />}
                  label="Last Month"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <h2>Between Dates</h2>
          <Box>
            <div className="beteenDate_from">
              <h3>From:- </h3>
              <DateTimePicker
                onChange={setDateAndTimeValueFrom}
                value={dateAndTimeValueFrom}
              />
              <h3>To:- </h3>
              <DateTimePicker
                onChange={setDateAndTimeValueTo}
                value={dateAndTimeValueTo}
              />
            </div>
          </Box>

          <h2>Expense Type</h2>
          <Box id="radioBoxes_container" component={"div"}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="all"
                name="radio-buttons-group"
                value={activeRadioValue}
                onChange={activeRadioSelectionHandler}
              >
                <FormControlLabel value="all" control={<Radio />} label="All" />
                <FormControlLabel
                  value="income"
                  control={<Radio />}
                  label="Income"
                />
                <FormControlLabel
                  value="expense"
                  control={<Radio />}
                  label="Expense"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <h2>Category</h2>
          <Box id="radioBoxes_container" component={"div"}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="all"
                name="radio-buttons-group"
                value={activeRadioValue}
                onChange={activeRadioSelectionHandler}
              >
                {category &&
                  category.length > 0 &&
                  category.map((ele) => (
                    <FormControlLabel
                      key={ele.id}
                      value={ele.name}
                      control={<Radio />}
                      label={ele.value}
                    />
                  ))}
              </RadioGroup>
            </FormControl>
          </Box>

          <h2>Payment Mode</h2>
          <Box id="radioBoxes_container" component={"div"}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="all"
                name="radio-buttons-group"
                value={activeRadioValue}
                onChange={activeRadioSelectionHandler}
              >
                {paymentMode.length > 0 &&
                  paymentMode.map((ele) => (
                    <FormControlLabel
                      key={ele.id}
                      value={ele.name}
                      control={<Radio />}
                      label={ele.value}
                    />
                  ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </div>
      </div>
    </Drawer>
  );
};

export default FilterDrawer;
