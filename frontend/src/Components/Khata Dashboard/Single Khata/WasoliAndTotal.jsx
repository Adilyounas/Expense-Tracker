import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import DownloadingIcon from "@mui/icons-material/Downloading";
import { red } from "@mui/material/colors";
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

const WasoliAndTotal = () => {
  const [selectedDate, setSelectedDate] = useState(null);


  return (
    <>
      <Stack
        sx={{
          bgcolor: red[50],
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
          <IconButton>
            <DownloadingIcon sx={{ color: red[700] }} />
          </IconButton>
          <Box>
            <Typography
              sx={{ color: red[700], fontWeight: "bold" }}
              variant="subtitle1"
            >
              Rs:100
            </Typography>
            <Typography
              sx={{ color: red[700], fontWeight: "bold" }}
              variant="body2"
            >
              Maine Lene hain
            </Typography>
          </Box>
        </Box>

        <StyledDatePicker
         views={["day", "month"]}
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue.$d)}
          sx={{
            width: "150px",
          }}
          label="Wasoli"
        />
      </Stack>
    </>
  );
};

export default WasoliAndTotal;
