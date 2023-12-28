import {  InputAdornment, TextField } from "@mui/material";
import React from "react";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";

const Searching = (props) => {

  const {searchViaName, searchFieldOnChangeHandler} = props




  return (
    <>
      <TextField
      value={searchViaName}
      onChange={searchFieldOnChangeHandler}
        InputProps={{
          sx: {
            paddingBottom: "13px",
            "& input::placeholder": {
              paddingLeft: "5px",
            },
          },
          startAdornment: (
            <InputAdornment position="start">
              <LocationSearchingIcon />
            </InputAdornment>
          ),
          // endAdornment: (
          //   <InputAdornment position="start">
          //     <IconButton>
          //       <FilterAltIcon color="warning" />
          //     </IconButton>
          //   </InputAdornment>
          // ),
        }}
        id="standard-basic"
        variant="standard"
        color="warning"
        placeholder="Enter Name"
        fullWidth
      />
    </>
  );
};

export default Searching;
