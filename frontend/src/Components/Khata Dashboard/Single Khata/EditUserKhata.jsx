import React from "react";
import {
  Box,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useLocation } from "react-router-dom";
import Settings from "@mui/icons-material/Settings";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const EditUserKhata = () => {

  const location = useLocation();
  const pathSegments = location.pathname.split('/')[1]
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      maxWidth={"100vw"}
      minHeight={"100vh"}
    >
      <Paper
        elevation={3}
        sx={{
          position: "relative",
          border: "1px solid #7b7b7b",
          minHeight: {
            xs: "100vh",
            sm: "90vh",
          },
          width: {
            xs: "100vw",
            sm: "80vw",
            md: "50vw",
            lg: "40vw",
          },
        }}
      >
        <Stack p={2}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <IconButton onClick={()=>window.history.go(-1)}>
                <KeyboardReturnIcon color="warning" fontSize="large" />
              </IconButton>
              <Typography component={"h1"} fontSize={"1.8rem"}>
                Umeed
              </Typography>
            </Stack>
               {/* manu start from here */}

               <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2, width: "50px", height: "50px" }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <MoreVertIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <DeleteForeverIcon fontSize="small" />
                </ListItemIcon>
                Delete Khata
              </MenuItem>
            </Menu>

            {/* menu end here */}
          </Stack>
        </Stack>

        <Box
          sx={{
            height: "70vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component={"form"}
            sx={{
              display: "flex",
              //   justifyContent: "center",
              //   alignItems: "center",
              flexDirection: "column",
              gap: 3,
              width:{
                xs:"70%",
                sm:"60%"
              },
            }}
          >
            <TextField placeholder="Enter Name" label="Enter Name" fullWidth />
            <TextField
              placeholder="Enter Phone Number"
              type="number"
              label="Enter Number"
              fullWidth
            />
            <TextField
              placeholder="Enter Amount"
              type="number"
              label="Enter Amount"
              fullWidth
            />
            <Button
            type="submit"
              sx={{
                bgcolor: "black",
                color: "white",
                transition: "0.7s",
                "&:hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
              variant="contained"
              size="large"
            >
              {pathSegments=== "add-Khata"?"Add Khata":"Update"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default EditUserKhata;
