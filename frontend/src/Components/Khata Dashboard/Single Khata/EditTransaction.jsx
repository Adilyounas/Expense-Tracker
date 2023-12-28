import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Loading/Loading";

import "react-phone-number-input/style.css";
import "./editUserKhata.css";

import getSingleUserKhataDataSingleTransaction_Action from "../../../Redux/Actions/khata/getSingleKhataDataSingleTransaction";
import updateSingleUserKhataDataSingleTransaction_Action from "../../../Redux/Actions/khata/updateSingleKhataSingleTransaction";
import deleteSingleUserKhataDataSingleTransaction_Action from "../../../Redux/Actions/khata/deleteSingleKhataSingleTransaction";

const EditTransaction = () => {
  const { khataId } = useParams();
  const navigate = useNavigate()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const id = queryParams.get("id");

  const dispatch = useDispatch();

  const pathSegments = location.pathname.split("/")[1];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { generalLoading } = useSelector((state) => state.generalLoading);
  const { singleKhataData_SingleTransaction } = useSelector(
    (state) => state.singleUserKhataDataSingleTransaction_Slice
  );
  // <--------------- User Entering Data ------------------>

  const [amountVal, setAmountVal] = useState("");

  const [checkedVal, setCheckedVal] = useState("leneHan");

  const [selectedDate, setSelectedDate] = useState(new Date());


  // <--------------- User Entering Country code ------------------>

  const FormSubmitHandler = (e) => {
    e.preventDefault();

    const updateValObj = {
        amountVal,checkedVal,selectedDate
    }

    dispatch(updateSingleUserKhataDataSingleTransaction_Action(khataId, id,updateValObj))
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteSingleUserTransactionHandler = ()=>{
    setAnchorEl(null);
    dispatch(deleteSingleUserKhataDataSingleTransaction_Action(khataId, id,navigate))
  }

//TODO   < ----------  FOR DEFAULT VALUE USE SECOND USEEFFECT MUST REQUIRED -------- >

  useEffect(() => {
    if (singleKhataData_SingleTransaction) {
      setAmountVal(singleKhataData_SingleTransaction.amount || "");
      setCheckedVal(singleKhataData_SingleTransaction.type || "leneHan");
      setSelectedDate(
        singleKhataData_SingleTransaction.transactionDate || null
      );
    }
  }, [singleKhataData_SingleTransaction]);

  useEffect(() => {
    dispatch(getSingleUserKhataDataSingleTransaction_Action(khataId, id));
  }, [dispatch, khataId, id]);

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
                    Update Transaction
                  </Typography>
                </Stack>
                {/* manu start from here */}

                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{
                    display: pathSegments === "add-Khata" ? "none" : "block",
                    ml: 2,
                    width: "50px",
                    height: "50px",
                  }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <MoreVertIcon />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={deleteSingleUserTransactionHandler}>
                    <ListItemIcon>
                      <DeleteForeverIcon fontSize="small" />
                    </ListItemIcon>
                    Delete Transaction
                  </MenuItem>
                </Menu>

                {/* menu end here */}
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
                <TextField
                  value={amountVal}
                  onChange={(e) => setAmountVal(e.target.value)}
                  placeholder="Enter Amount"
                  type="number"
                  label="Enter Amount"
                  fullWidth
                  required
                />
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

                <DateTimePicker
                  onChange={setSelectedDate}
                  value={selectedDate}
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
                  {pathSegments === "add-Khata" ? "Add Khata" : "Update"}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default EditTransaction;
