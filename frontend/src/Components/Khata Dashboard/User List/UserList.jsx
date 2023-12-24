import { Avatar, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { grey } from "@mui/material/colors";
import { NavLink } from "react-router-dom";

const userList = [
  {
    id: Math.random()*10000000,
    NameFirstLetter: "U",
    name: "Umeed",
    money: "11",
  },
  {
    id: Math.random()*10000000,
    NameFirstLetter: "U",
    name: "Umeed",
    money: "55",
  },
  {
    id: Math.random()*10000000,
    NameFirstLetter: "U",
    name: "Umeed",
    money: "30",
  },
  {
    id: Math.random()*10000000,
    NameFirstLetter: "U",
    name: "Umeed",
    money: "80",
  },
  {
    id: Math.random()*10000000,
    NameFirstLetter: "U",
    name: "Umeed",
    money: "10",
  },
  {
    id: Math.random()*10000000,
    NameFirstLetter: "U",
    name: "Umeed",
    money: "11",
  },
  {
    id: Math.random()*10000000,
    NameFirstLetter: "U",
    name: "Umeed",
    money: "55",
  },
  {
    id: Math.random()*10000000,
    NameFirstLetter: "U",
    name: "Umeed",
    money: "30",
  },
  {
    id: Math.random()*10000000,
    NameFirstLetter: "U",
    name: "Umeed",
    money: "80",
  },
  {
    id: Math.random()*10000000,
    NameFirstLetter: "U",
    name: "Umeed",
    money: "10",
  },
  {
    id: Math.random()*10000000,
    NameFirstLetter: "U",
    name: "Umeed",
    money: "11",
  },
  {
    id: Math.random()*10000000,
    NameFirstLetter: "U",
    name: "Umeed",
    money: "55",
  },
  {
    id: Math.random()*10000000,
    NameFirstLetter: "U",
    name: "Umeed",
    money: "30",
  },
  {
    id: Math.random()*10000000,
    NameFirstLetter: "U",
    name: "Umeed",
    money: "80",
  },
  {
    id: Math.random()*10000000,
    NameFirstLetter: "U",
    name: "Umeed",
    money: "10",
  },
  {
    id: Math.random()*10000000,
    NameFirstLetter: "U",
    name: "Umeed",
    money: "11",
  },
  {
    id: Math.random()*10000000,
    NameFirstLetter: "U",
    name: "Umeed",
    money: "55",
  },
  {
    id: Math.random()*10000000,
    NameFirstLetter: "U",
    name: "Umeed",
    money: "30",
  },
  {
    id: Math.random()*10000000,
    NameFirstLetter: "U",
    name: "Umeed",
    money: "80",
  },
  {
    id: Math.random()*10000000,
    NameFirstLetter: "U",
    name: "Umeed",
    money: "10",
  },
];

const UserList = () => {
  return (
    <>
      {userList.map((user) => (
        <Stack spacing={2} key={user.id}>
          <NavLink id="userList" to={`/singleUser-complete-Khata/${user.id}`}>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Avatar sx={{ color: "black", bgcolor: grey[100] }}>
                {user.NameFirstLetter}
              </Avatar>
              <Typography sx={{ color: "black" }}>{user.name}</Typography>
            </Stack>
            <Typography sx={{ color: "red" }}>Rs: {user.money}</Typography>
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
      ))}
    </>
  );
};

export default UserList;
