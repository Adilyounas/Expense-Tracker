import { Box, Stack, Typography } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { NavLink } from "react-router-dom";

const Contact = (props) => {
  const { khata, leneHanTotal, deneHanTotal, userData } = props;

  let numberWithoutPlus = "";

  if (khata && khata.number) {
    numberWithoutPlus = khata.number.split("+")[1];
  }

  // const handleOpenWhatsApp = () => {
  //   if (khata && khata.name && khata.number && userData && userData.name && typeof leneHanTotal !== 'undefined') {
  //     const message = `Assalam alaikum ${khata.name} Ap ne ${userData.name} ka ${leneHanTotal} Dena hai`;
  //     const encodedMessage = encodeURIComponent(message);
  //     const timestamp = new Date().getTime(); // Get the current time
  //     const whatsappLink = `https://wa.me/${khata.number}?text=${encodedMessage}&t=${timestamp}`; // Add the time as a query parameter
  //     window.open(whatsappLink, "_blank");
  //   } else {
  //     console.log('One or more necessary variables are not defined');
  //   }
  // };

  const handleOpenWhatsApp = () => {
    if (
      khata &&
      khata.name &&
      khata.number &&
      userData &&
      userData.name &&
      typeof leneHanTotal !== "undefined"
    ) {
      const message = `Assalam alaikum ${khata.name} Ap ne ${userData.name} ka ${leneHanTotal} Dena hai`;
      const encodedMessage = encodeURIComponent(message);
      const timestamp = new Date().getTime(); // Get the current time
      const whatsappLink = `https://web.whatsapp.com/send?phone=${khata.number}&text=${encodedMessage}&t=${timestamp}`; // Add the time as a query parameter
      window.open(whatsappLink, "_blank");
    } else {
      console.log("One or more necessary variables are not defined");
    }
  };

  // const handleOpenWhatsApp = () => {
  //   if (khata && khata.name && khata.number && userData && userData.name && typeof leneHanTotal !== 'undefined') {
  //     const message = `Assalam alaikum ${khata.name} Ap ne ${userData.name} ka ${leneHanTotal} Dena hai`;
  //     const encodedMessage = encodeURIComponent(message);
  //     const whatsappLink = `https://wa.me/${khata.number}?text=${encodedMessage}`;
  //     window.open(whatsappLink, "_blank");
  //   } else {
  //     console.log('One or more necessary variables are not defined');
  //   }
  // };

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
      <NavLink
        onClick={handleOpenWhatsApp}
        style={{
          display: leneHanTotal > deneHanTotal ? "block" : "none",
          textDecoration: "none",
          color: "black",
        }}
      >
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <WhatsAppIcon
            sx={{
              color: green[500],
            }}
          />
          <Typography fontWeight={"bold"}>{numberWithoutPlus}</Typography>
        </Stack>
      </NavLink>
    </Stack>
  );
};

export default Contact;
