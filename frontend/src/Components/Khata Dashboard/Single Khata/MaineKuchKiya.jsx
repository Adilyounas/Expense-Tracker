import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import addTransactionInSingleKhata_Action from "../../../Redux/Actions/khata/addTransactionInSingleUserKhata";
import Loading from "../../Loading/Loading";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";


const MaineKuchKiya = () => {
  const location = useLocation();
  const url = location.pathname.split("/")[1];
  const khataId = location.pathname.split("/")[2];


  const [selectedDate, setSelectedDate] = useState(new Date());
  const [inputAmountVal, setInputAmountVal] = useState("");
  const disptach = useDispatch();



  const { generalLoading } = useSelector((state) => state.generalLoading);

  const MaineKuchKiyaFormHandler = (e) => {
    //type,amount,transaction Date
    e.preventDefault();
    const type = url === "MAINE-DIEY" ? "leneHan" : "deneHan";

    if (selectedDate && inputAmountVal && type && khataId) {
      console.log(selectedDate);
      console.log(inputAmountVal);
      console.log(type);

      const obj = {
        type,
        amount: inputAmountVal,
        transactionDate: selectedDate,
      };



      disptach(addTransactionInSingleKhata_Action(khataId, obj));
    } else {
      toast.error("Enter Date");
    }
  };

  return (
    <>
      {generalLoading ? (
        <Loading />
      ) : (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
          maxWidth={"100vw"}
          minHeight={"100vh"}
        >
          <Paper
            elevation={3}
            sx={{
              position: "relative",
              border: "1px solid #7b7b7b",
              minHeight: {
                xs: "100vh",
                sm: "90vh",
              },
              width: {
                xs: "100vw",
                sm: "80vw",
                md: "50vw",
                lg: "40vw",
              },
            }}
          >
            <Stack p={2}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <IconButton onClick={() => window.history.go(-1)}>
                    <KeyboardReturnIcon color="warning" fontSize="large" />
                  </IconButton>
                  <Typography component={"h1"} fontSize={"1.8rem"}>
                    {url}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            <Box
              sx={{
                height: "70vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component={"form"}
                onSubmit={MaineKuchKiyaFormHandler}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  width: {
                    xs: "70%",
                  },
                }}
              >
                {/* <StyledDatePicker
                  views={["day", "month"]}
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue.$d)}
                  label={`${url} Date`}
                /> */}



                <DateTimePicker
                onChange={setSelectedDate}
                value={selectedDate}
              />

                <TextField
                  value={inputAmountVal}
                  onChange={(e) => setInputAmountVal(e.target.value)}
                  placeholder="Enter Amount"
                  type="number"
                  label="Enter Amount"
                  fullWidth
                  required
                />
                <Button
                  type="submit"
                  sx={{
                    bgcolor: "black",
                    color: "white",
                    transition: "0.7s",
                    "&:hover": {
                      bgcolor: "white",
                      color: "black",
                    },
                  }}
                  variant="contained"
                  size="large"
                >
                  {url === "MAINE-DIEY" ? "DE-DIEY" : "LE-LIYE"}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default MaineKuchKiya;
