import React from "react";
import { MenuItem, Dialog, Box, TextField } from "@mui/material";
import "./timeFormate.css";

const TimeFormateDialog = (props) => {
    const timeVal = JSON.parse(localStorage.getItem("timeVal"));

  const {
    timeFormateDialogOpen,
    setTimeFormateDialogOpen,
    timeOnChangeHandler,
    timeFormateVal,
  } = props;

  const Time = [
    {
      id: 1,
      time: "02:30 PM",
      alphabets: "HH:MM:A",
    },
    {
      id: 2,
      time: "14:30",
      alphabets: "HH:MM",
    },
  ];

  return (
    <Dialog
      open={timeFormateDialogOpen}
      onClose={() => setTimeFormateDialogOpen(false)}
    >
      <Box width={360} padding={"2vmax"}>
        <TextField
          id="standard-select-currency"
          select
          fullWidth
          defaultValue={ timeVal?? timeVal}
          value={timeFormateVal}
          helperText="Please select your Time Formate"
          variant="standard"
          onChange={timeOnChangeHandler}
        >
          {Time.map((obj) => (
            <MenuItem key={obj.id} value={obj.time}>
              <Box display="flex" justifyContent="space-between" width={200}>
                <span>{obj.time}</span>
                <span>{obj.alphabets}</span>
              </Box>
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Dialog>
  );
};

export default TimeFormateDialog;

// <MenuItem value={{name: 'John', age: 20}}>
// <Box display="flex" justifyContent="space-between" width={200}>
//   <span>John</span>
//   <span>20</span>
// </Box>
// </MenuItem>
// <MenuItem value={{name: 'Jane', age: 30}}>
// <Box display="flex" justifyContent="space-between" width={200}>
//   <span>Jane</span>
//   <span>30</span>
// </Box>
// </MenuItem>
