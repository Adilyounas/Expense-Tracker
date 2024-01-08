import React from "react";
import { useDispatch, useSelector } from "react-redux";
import getAllKhatasAction from "../../../Redux/Actions/khata/getAllKhatas";
import Loading from "../../Loading/Loading";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useNavigate } from "react-router-dom";
import { WasoliUndefined_Action } from "../../../Redux/Actions/khata/Wasoli";

import PriceCheckIcon from "@mui/icons-material/PriceCheck";

const NotificationComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { generalLoading } = useSelector((state) => state.generalLoading);
  const { wasoliTrueKhatas } = useSelector((state) => state.getAllKhatasSlice);

  const markAsReadAndNavigateHandler = (khataId) => {
    if (khataId) {
      const wasoliBooleanVal = undefined;
      const selectedDate = undefined;

      dispatch(WasoliUndefined_Action(khataId, wasoliBooleanVal, selectedDate));

      navigate(`/singleUser-complete-Khata/${khataId}`);
    } else {
      console.warn("KhataId Is missing in Notification Component");
    }
  };

  React.useEffect(() => {
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
                    Notifications
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            {/* list of wasoli khatas */}

            <Stack spacing={2} p={"1rem 3rem"}>
              {wasoliTrueKhatas && wasoliTrueKhatas.length > 0 ? (
                wasoliTrueKhatas.map((khata) => {
                  return (
                    <Stack spacing={2} key={khata._id}>
                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Box
                          onClick={() =>
                            markAsReadAndNavigateHandler(khata._id)
                          }
                          sx={{
                            textDecoration: "none",
                            color: "black",
                            width: "80%",
                            padding: "0 1rem",
                            cursor: "pointer",
                          }}
                        >
                          <Typography>{khata.name}</Typography>
                        </Box>

                        <IconButton
                          sx={{
                            width: "50px",
                            height: "50px",
                          }}
                        >
                          <PriceCheckIcon />
                        </IconButton>
                      </Stack>
                      <hr
                        style={{
                          width: "90%",
                          margin: "1rem auto", // Center horizontally
                          // border: 'none',
                          borderTop: "0.5px solid rgb(192 192 192)", // Adjust border style as needed
                        }}
                      />
                    </Stack>
                  );
                })
              ) : (
                <Typography textAlign={"center"} variant="h5">
                  NO WASOLI TODAY
                </Typography>
              )}
            </Stack>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default NotificationComponent;
