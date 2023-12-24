import {  Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const data = [
  {
    id: Math.random() * 1000,
    date: new Date(),
    diye: 100,
  },
  {
    id: Math.random() * 1000,
    date: new Date(),
    liye: 20,
  },
  {
    id: Math.random() * 1000,
    date: new Date(),
    diye: 100,
  },
  {
    id: Math.random() * 1000,
    date: new Date(),
    diye: 100,
  },
  {
    id: Math.random() * 1000,
    date: new Date(),
    liye: 20,
  },
  {
    id: Math.random() * 1000,
    date: new Date(),
    diye: 100,
  },
  {
    id: Math.random() * 1000,
    date: new Date(),
    diye: 100,
  },
  {
    id: Math.random() * 1000,
    date: new Date(),
    liye: 20,
  },
  {
    id: Math.random() * 1000,
    date: new Date(),
    diye: 100,
  },
  {
    id: Math.random() * 1000,
    date: new Date(),
    diye: 100,
  },
  {
    id: Math.random() * 1000,
    date: new Date(),
    liye: 20,
  },
  {
    id: Math.random() * 1000,
    date: new Date(),
    diye: 100,
  },
];

const monthInitials = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const SingleUserKhataList = () => {
  return (
    <>
      {data.map((user) => (
        <NavLink
        to={`/editSingle-Khata/${user.id}`}
          key={user.id}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Grid container p={2}>
            <Grid item xs={6}>
              <Typography>{`${user.date.getDate()} ${
                monthInitials[user.date.getMonth()]
              }, ${
                user.date.getHours() > 12
                  ? user.date.getHours() - 12
                  : user.date.getHours()
              }:${user.date.getMinutes()} ${
                user.date.getHours() > 12 ? "PM" : "AM"
              }   `}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography textAlign={"center"}>
                {user.diye ? "Rs:" : ""}
                {user.diye ? user.diye : ""}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography textAlign={"center"}>
                {user.liye ? "Rs:" : ""}
                {user.liye ? user.liye : ""}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
        </NavLink>
      ))}
    </>
  );
};

export default SingleUserKhataList;
