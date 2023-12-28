import { Box,  Stack, Typography } from "@mui/material";
import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { green,  grey,  red } from "@mui/material/colors";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/system";

const StyledNavLink = styled(NavLink)({
  width: "50%",
  height: "70%",
  textDecoration: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: red[600],
  borderRadius: 30,
  transition:".7s",
  color:"white",
  "&:hover": {
    backgroundColor: red[300],
  },
});

const StyledNavLink2 = styled(NavLink)({
  width: "50%",
  height: "70%",
  textDecoration: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: green[600],
  borderRadius: 30,
  transition:".7s",
  color:"white",
  "&:hover": {
    backgroundColor: green[300],
  },
});

const EnterKhataAmount = (props) => {
  const {userId} = props



  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        bottom: "0%",
        transform: "translateX(-50%)",
        height: "10vh",
        width: "100%",
        p: "0.3rem 2rem",
        bgcolor:grey[100]
      }}
    >
      <Stack
        direction={"row"}
        spacing={2}
        width={"100%"}
        height={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <StyledNavLink to={`/MAINE-DIEY/${userId}`   }>
          <ArrowUpwardIcon />
          <Typography>MAINE DIEY</Typography>
        </StyledNavLink>
        <StyledNavLink2 to={`/MAINE-LIYE/${userId}`}>
          <ArrowDownwardIcon />
          <Typography>MAINE LIYE</Typography>
        </StyledNavLink2>
      </Stack>
    </Box>
  );
};

export default EnterKhataAmount;
