import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import LenaDena from "./laenaDena/LenaDena";
import Searching from "./Searching/Searching";
import UserList from "./User List/UserList";
import "./khata.css";
import EnterCustomer from "./EnterCustomer";
import { useDispatch, useSelector } from "react-redux";
import getAllKhatasAction from "../../Redux/Actions/khata/getAllKhatas";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
// sx:0
// sm:600
// md:900
// lg:1200

const KhataDashboard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchViaName, setSearchViaName] = useState("");
  const [filteredKhatas, setFilteredKhatas] = useState([]);
  const { khatas } = useSelector((state) => state.getAllKhatasSlice);
  const { wasoliTrueKhatas } = useSelector((state) => state.getAllKhatasSlice);

  const { generalLoading } = useSelector((state) => state.generalLoading);

  const searchFieldOnChangeHandler = (e) => {
    const { value } = e.target;
    setSearchViaName(value);

    // Case-insensitive partial match search
    const filtered = khatas.filter((khata) =>
      khata.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredKhatas(filtered);
  };

  // < ------------------------ CALCULATING TOTAL  -------------->

  let lenaTotal = 0;
  let denaTotal = 0;

  if (khatas.length > 0) {
    khatas.forEach((entery) => {
      entery.khataData.forEach((transaction) => {
        if (transaction.type === "leneHan") {
          lenaTotal = lenaTotal + transaction.amount;
        } else if (transaction.type === "deneHan") {
          denaTotal = denaTotal + transaction.amount;
        }
      });
    });
  }

  const notificationHandler = () => {
    navigate("/khata/notificationPage");
  };

  //TODO <-----------------  USEEFFECT --------------------->

  useEffect(() => {
    if (searchViaName === "") {
      setFilteredKhatas(khatas);
    }
  }, [khatas, searchViaName]);

  useEffect(() => {
    dispatch(getAllKhatasAction());
  }, [dispatch]);

  return (
    <>
      {generalLoading ? (
        <Loading />
      ) : (
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
                    Khatey
                  </Typography>
                </Stack>

                <IconButton
                  onClick={notificationHandler}
                  sx={{
                    width: "50px",
                    height: "50px",
                    marginRight: "2rem",
                    cursor: "pointer",
                  }}
                >
                  <Badge
                    color="secondary"
                    badgeContent={wasoliTrueKhatas.length}
                    max={9}
                  >
                    <MailIcon />
                  </Badge>
                </IconButton>
              </Stack>
            </Stack>
            <Stack
              p={"0 2rem"}
              spacing={1}
              direction={"row"}
              sx={{
                justifyContent: { xs: "space-around", sm: "space-between" },
              }}
              alignItems={"center"}
            >
              <LenaDena lenaTotal={lenaTotal} denaTotal={denaTotal} />
            </Stack>

            {/* Searching */}
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              p={"2rem 2.4rem"}
            >
              <Searching
                searchViaName={searchViaName}
                searchFieldOnChangeHandler={searchFieldOnChangeHandler}
              />
            </Stack>

            {/* User list */}
            <Stack
              sx={{
                p: "0 2.4rem",
                maxHeight: { xs: "400px" },
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
              <UserList khatas={filteredKhatas} />
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
      )}
    </>
  );
};

export default KhataDashboard;
