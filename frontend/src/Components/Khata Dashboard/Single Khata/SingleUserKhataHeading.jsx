import {  Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

const SingleUserKhataHeading = () => {
  return (
    <>
      <Grid container   sx={{borderRadius:1,bgcolor:grey[50],p:3 }}>
        <Grid item xs={6}  >
          <Typography  sx={{fontSize:"0.8rem",textAlign:"left"}}   >
            Date
          </Typography>
        </Grid>
        <Grid item xs={3}  >
          <Typography  sx={{fontSize:"0.8rem",textAlign:"center"}}   >
           Maine diye
          </Typography>
        </Grid>
        <Grid item xs={3} >
          <Typography sx={{fontSize:"0.8rem",textAlign:"center"}}   >
            Maine Liye
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default SingleUserKhataHeading;
