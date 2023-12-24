import { Stack, Typography } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
const Contact = () => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-evenly"}
      sx={{
        bgcolor: grey[50],
        width: "100%",
        p: 2,
        borderRadius: 1,
      }}
    >
      <Typography fontWeight={"bold"}>03040053938</Typography>
      <WhatsAppIcon  sx={{
        color:green[500]
      }} />
    </Stack>
  );
};

export default Contact;
