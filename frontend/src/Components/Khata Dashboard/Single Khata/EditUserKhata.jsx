import React, {  useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import addCustomerAction from "../../../Redux/Actions/khata/addCustomer";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Loading/Loading";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "./editUserKhata.css";

const EditUserKhata = () => {
  const dispatch = useDispatch();

  // <--------------- User Entering Data ------------------>

  const [nameVal, setNameVal] = useState("");
  const [amountVal, setAmountVal] = useState("");
  const [checkedVal, setCheckedVal] = useState("leneHan");

  const { generalLoading } = useSelector((state) => state.generalLoading);

  // <--------------- User Entering Country code ------------------>

  const [numberVal, setNumberVal] = useState("");

  const FormSubmitHandler = (e) => {
    e.preventDefault();
    const formData = {
      name: nameVal,
      number: numberVal,
      khataData: {
        type: checkedVal,
        amount: amountVal,
      },
    };

    dispatch(addCustomerAction(formData));

    setTimeout(() => {
      setNameVal("");
      setNumberVal("");
      setAmountVal("");
      setCheckedVal("leneHan");
    }, 1000);
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
                    Naya Khata Bnaen
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
                onSubmit={FormSubmitHandler}
                component={"form"}
                sx={{
                  display: "flex",
                  //   justifyContent: "center",
                  //   alignItems: "center",
                  flexDirection: "column",
                  gap: 3,
                  width: {
                    xs: "70%",
                    sm: "70%",
                  },
                }}
              >
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <AccountCircle sx={{ color: "rgb(77 77 77)" }} />
                  <TextField
                    type="text"
                    value={nameVal}
                    onChange={(e) => setNameVal(e.target.value)}
                    placeholder="Enter Name"
                    label="Enter Name"
                    fullWidth
                    required
                  />
                </Stack>

                <PhoneInput
                  placeholder="Enter phone number"
                  value={numberVal}
                  onChange={setNumberVal}
                />

                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <MonetizationOnIcon sx={{ color: "rgb(77 77 77)" }} />
                  <TextField
                    value={amountVal}
                    onChange={(e) => setAmountVal(e.target.value)}
                    placeholder="Enter Amount"
                    type="number"
                    label="Enter Amount"
                    fullWidth
                    required
                  />
                </Stack>

                <RadioGroup row sx={{ justifyContent: "center" }}>
                  <FormControlLabel
                    checked={checkedVal === "leneHan"}
                    value="leneHan"
                    onChange={(e) => setCheckedVal(e.target.value)}
                    control={<Radio />}
                    label="Lene Han"
                  />
                  <FormControlLabel
                    checked={checkedVal === "deneHan"}
                    value="deneHan"
                    onChange={(e) => setCheckedVal(e.target.value)}
                    control={<Radio />}
                    label="Dene Han"
                  />
                </RadioGroup>
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
                  Add Khata
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default EditUserKhata;
