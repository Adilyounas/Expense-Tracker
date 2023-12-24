import { Box, Button, Typography } from "@mui/material";
import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { grey } from "@mui/material/colors";
import { NavLink } from "react-router-dom";

const EnterCustomer = () => {

  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        bottom: "1%",
        transform: "translateX(-50%)",
        height: "10vh",
        width: "100%",
        p: "0.3rem 2rem",
      }}
    >
      <NavLink
        to={"/add-Khata/asdfdsfdsaf"}
        style={{
          direction: "row",
          display: "flex",
          gap: 2,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
        }}
      >
        <Button
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "65%",
            height: "70%",
            borderRadius: 10,
            bgcolor: grey[900],
            gap: 1,
            "&:hover": {
              bgcolor: grey[800],
            },
          }}
        >
          <ArrowDownwardIcon sx={{ color: "#fff" }} />
          <Typography sx={{ color: "#fff" }}>Add Customer Khata</Typography>
        </Button>
      </NavLink>
    </Box>
  );
};

export default EnterCustomer;
