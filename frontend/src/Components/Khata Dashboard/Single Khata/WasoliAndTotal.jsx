import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import DownloadingIcon from "@mui/icons-material/Downloading";
import { green, red } from "@mui/material/colors";
import { DatePicker } from "@mui/x-date-pickers";

import { styled } from "@mui/system";

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
    width: "50px",
    height: "50px",
  },
});

const WasoliAndTotal = (props) => {
  const {leneHanTotal,deneHanTotal } = props

  const denaHanDifference = deneHanTotal - leneHanTotal;
  const denaD = denaHanDifference < 0 ? 0 : denaHanDifference;

  const lenaHanDifference = leneHanTotal - deneHanTotal;
  const lenaD = lenaHanDifference < 0 ? 0 : lenaHanDifference;


  const greaterValue = Math.max(denaD, lenaD);

  // Display the greater value if it's greater than 0, otherwise display 0
  const showValue = greaterValue > 0 ? greaterValue : 0;



  const [selectedDate, setSelectedDate] = useState(null);

  console.log(selectedDate!==null?selectedDate.getDate():"error");


  return (
    <>
      <Stack
        sx={{
          bgcolor: lenaD>0? red[100]:green[100],
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
            <DownloadingIcon sx={{color:lenaD>0? red[700]:green[700], }} />
          </IconButton>
          <Box>
            <Typography
              sx={{ color:lenaD>0? red[700]:green[700], fontWeight: "bold" }}
              variant="subtitle1"
            >
              Rs:{showValue}
            </Typography>
            <Typography
              sx={{ color:lenaD>denaD? red[700]:green[700], fontWeight: "bold" }}
              variant="body2"
            >
            {lenaD>denaD?"Maine Lene hain": "Maine Dene hain"}
            
            </Typography>
          </Box>
        </Box>

        <StyledDatePicker
        //  views={["day", "month"]}
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue.$d)}
          sx={{
            width: "170px",
            display:lenaD>denaD?"block":"none"
          }}
         label="Wasoli"
        />
      </Stack>
    </>
  );
};

export default WasoliAndTotal;
