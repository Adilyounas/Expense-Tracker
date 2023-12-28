import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

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

const SingleUserKhataList = (props) => {
  const { khata } = props;

let sortedKhataData = []
if (khata && khata.khataData) {
  sortedKhataData = khata.khataData.slice().sort((a, b) => b.transactionKhataPriority - a.transactionKhataPriority);
  
}

  return (
    <>
      {khata &&
        khata.khataData &&
        khata.khataData && sortedKhataData ? (sortedKhataData.map((transaction) => (
          <NavLink
            to={`/editSingle-Khata/${khata._id}?id=${transaction._id}`}
            key={transaction._id}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Grid container p={2}>
              <Grid item xs={6}>
                <Typography>{`${new Date(
                  transaction.transactionDate
                ).getDate()} ${
                  monthInitials[
                    new Date(transaction.transactionDate).getMonth()
                  ]
                }, ${
                  new Date(transaction.transactionDate).getHours() > 12
                    ? new Date(transaction.transactionDate).getHours() - 12
                    : new Date(transaction.transactionDate).getHours()
                }:${new Date(transaction.transactionDate).getMinutes()} ${
                  new Date(transaction.transactionDate).getHours() > 12
                    ? "PM"
                    : "AM"
                }   `}</Typography>
              </Grid>

              <Grid item xs={3}>
                <Typography textAlign={"center"} sx={{ color: "red" }}>
                  {transaction.type === "leneHan"
                    ? `Rs:${transaction.amount}`
                    : ""}
                </Typography>
              </Grid>

              <Grid item xs={3}>
                <Typography textAlign={"center"} sx={{ color: "green" }}>
                  {transaction.type === "deneHan"
                    ? `Rs:${transaction.amount}`
                    : ""}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
          </NavLink>
        ))):(<Box>No data fount</Box> )
        }
    </>
  );
};


 


export default SingleUserKhataList;
