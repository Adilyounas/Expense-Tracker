import { Avatar,  Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { grey } from "@mui/material/colors";
import { NavLink } from "react-router-dom";



const UserList = (props) => {
  const {khatas} = props



  return (
    <>
      {khatas.map((user) => {
        // Calculate the total amount based on khataData type
        const leneHanAmount = user.khataData
          .filter((transaction) => transaction.type === "leneHan")
          .reduce((acc, transaction) => acc + transaction.amount, 0);

        const deneHanAmount = user.khataData
          .filter((transaction) => transaction.type === "deneHan")
          .reduce((acc, transaction) => acc + transaction.amount, 0);

        return (
          <Stack spacing={2} key={user._id}>
            <NavLink id="userList" to={`/singleUser-complete-Khata/${user._id}`}>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Avatar sx={{ color: "black", bgcolor: grey[100] }}>
                  {user.name[0]}
                </Avatar>
                <Typography sx={{ color: "black" }}>{user.name}</Typography>
              </Stack>
              <Typography sx={{color:leneHanAmount>deneHanAmount?"red":"green"   }}>Rs: {leneHanAmount>deneHanAmount?leneHanAmount:deneHanAmount}</Typography>
            </NavLink>
            <Divider
              sx={{
                width: "90%",
                position: "relative",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />
          </Stack>
        );
      })}
    </>
  );
};

export default UserList;
