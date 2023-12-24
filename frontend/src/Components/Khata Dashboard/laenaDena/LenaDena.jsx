import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import DownloadingIcon from "@mui/icons-material/Downloading";
import { green,red } from "@mui/material/colors";



const LenaDena = () => {
  return (
    <>
      <Stack
        sx={{ bgcolor: green[50], width:{xs:"50%",sm:"40vw" } , p:1,borderRadius:1 }}
        direction={"row"}
        spacing={1}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <IconButton>
          <DownloadingIcon   sx={{color:green[700] }} />
        </IconButton>
        <Box>
          <Typography sx={{color:green[700],fontWeight:"bold" }} variant="subtitle1">Rs:100</Typography>
          <Typography sx={{color:green[700],fontWeight:"bold" }} variant="body2">Maine Lene hain</Typography>
        </Box>
      </Stack>
      <Stack
      sx={{ bgcolor: red[50], width:{xs:"50%",sm:"40vw" }, p:1,borderRadius:1 }}
        direction={"row"}
        spacing={1}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <IconButton >
          <DownloadingIcon   sx={{color:red[600]}}/>
        </IconButton>
        <Box>
          <Typography sx={{color:red[700],fontWeight:"bold" }} variant="subtitle1">Rs:100</Typography>
          <Typography sx={{color:red[700],fontWeight:"bold" }} variant="body2">Maine Lene hain</Typography>
        </Box>
      </Stack>
    </>
  );
};

export default LenaDena;
