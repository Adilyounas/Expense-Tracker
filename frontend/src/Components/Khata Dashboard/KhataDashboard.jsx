import React from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LenaDena from "./laenaDena/LenaDena";
import Searching from "./Searching/Searching";
import UserList from "./User List/UserList";
import "./khata.css";
import EnterCustomer from "./EnterCustomer";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

// sx:0
// sm:600
// md:900
// lg:1200

const KhataDashboard = () => {
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
              <IconButton onClick={() => window.history.go(-1)}>
                <KeyboardReturnIcon color="warning" fontSize="large" />
              </IconButton>
              <Typography component={"h1"} fontSize={"1.8rem"}>
                Khata
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
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>

            {/* menu end here */}

            
          </Stack>
        </Stack>
        <Stack
          p={"0 2rem"}
          spacing={1}
          direction={"row"}
          sx={{ justifyContent: { xs: "space-around", sm: "space-between" } }}
          alignItems={"center"}
        >
          <LenaDena />
        </Stack>

        {/* Searching */}
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          p={"2rem 2.4rem"}
        >
          <Searching />
        </Stack>

        {/* User list */}
        <Stack
          sx={{
            p: "0 2.4rem",
            maxHeight: { xs: "600px", sm: "450px" },
            overflowY: "auto", // Enable vertical scrolling
            "&::-webkit-scrollbar": {
              width: "0.5em",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "transparent",
            },
          }}
          spacing={3}
        >
          <UserList />
        </Stack>

        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <EnterCustomer />
        </Stack>
      </Paper>
    </Box>
  );
};

export default KhataDashboard;
