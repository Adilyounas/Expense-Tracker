import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DownloadingIcon from "@mui/icons-material/Downloading";
import { green, red } from "@mui/material/colors";
import { DatePicker } from "@mui/x-date-pickers";
import CheckIcon from "@mui/icons-material/Check";
import { styled } from "@mui/system";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Wasoli_Action from "../../../Redux/Actions/khata/Wasoli";
import dayjs from "dayjs";
import Loading from "../../Loading/Loading";

const StyledDatePicker = styled(DatePicker)({
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root": {
    width: "30px",
    height: "30px",
  },
});

// < --------------  WASOLI DATE  ----------------->

const wasoliDate = JSON.parse(localStorage.getItem("wasoliDate"))
if (!wasoliDate) {
  localStorage.setItem("wasoliDate", JSON.stringify([]));
}

const WasoliAndTotal = (props) => {
const currencySymbol = JSON.parse(localStorage.getItem("currencySymbol"))

  const dispatch = useDispatch();

  const { leneHanTotal, deneHanTotal, khataId, khata } = props;

  const wasoliInLocalStorage = JSON.parse(localStorage.getItem("wasoliDate"));

  const denaHanDifference = deneHanTotal - leneHanTotal;
  const denaD = denaHanDifference < 0 ? 0 : denaHanDifference;

  const lenaHanDifference = leneHanTotal - deneHanTotal;
  const lenaD = lenaHanDifference < 0 ? 0 : lenaHanDifference;

  const greaterValue = Math.max(denaD, lenaD);

  // Display the greater value if it's greater than 0, otherwise display 0
  const showValue = greaterValue > 0 ? greaterValue : 0;
  const { generalLoading } = useSelector((state) => state.generalLoading);

  const [selectedDate, setSelectedDate] = useState(
    khata && khata.wasoliDate ? dayjs(khata && khata.wasoliDate) : null
  );

  // console.log(selectedDate!==null?selectedDate.getDate():"error");

  const setWasoliCheckHandler = () => {
    if (selectedDate === dayjs(khata.wasoliDate) || selectedDate === null) {
      return;
    } else {
      const removeOldWasoliDate = wasoliInLocalStorage.filter(
        (wasoliDate) => wasoliDate.id !== khataId
      );

      const obj = {
        id: khataId,
        date: selectedDate,
      };
      removeOldWasoliDate.push(obj);
      localStorage.setItem("wasoliDate", JSON.stringify(removeOldWasoliDate));
      const wasoliBooleanVal = true;
      dispatch(Wasoli_Action(khataId, wasoliBooleanVal, selectedDate));
    }
  };

  return (
    <>
      {generalLoading ? (
        <Loading />
      ) : (
        <Stack
          sx={{
            bgcolor: lenaD > 0 ? red[100] : green[100],
            width: "100%",
            p: 1,
            borderRadius: 1,
          }}
          direction={"row"}
          spacing={1}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <IconButton disableRipple>
              <DownloadingIcon
                sx={{ color: lenaD > 0 ? red[700] : green[700] }}
              />
            </IconButton>
            <Box>
              <Typography
                sx={{
                  color: lenaD > 0 ? red[700] : green[700],
                  fontWeight: "bold",
                }}
                variant="subtitle1"
              >
                {currencySymbol}:{showValue}
              </Typography>
              <Typography
                sx={{
                  color: lenaD > denaD ? red[700] : green[700],
                  fontWeight: "bold",
                }}
                variant="body2"
              >
                {lenaD > denaD ? "Maine Lene hain" : "Maine Dene hain"}
              </Typography>
            </Box>
          </Box>

          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <StyledDatePicker
              //  views={["day", "month"]}
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue.$d)}
              sx={{
                width: "145px",
                display: lenaD > denaD ? "block" : "none",
              }}
              label="Wasoli"
            />

            <IconButton
              sx={{ width: "40px", height: "40px" }}
              onClick={setWasoliCheckHandler}
            >
              <CheckIcon />
            </IconButton>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default WasoliAndTotal;
