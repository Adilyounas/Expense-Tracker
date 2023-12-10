import React from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  Typography,
} from "@mui/material";

const DeleteTransaction = (props) => {
  const {
    deleteTransactionDialogOpen,
    deleteTransactionDialogOpenHandler,
    deleteTransactionConfirmedHandler,
  } = props;

  return (
    <Dialog
      open={deleteTransactionDialogOpen}
      onClose={deleteTransactionDialogOpenHandler}
    >
      <Alert severity="warning">
        <AlertTitle color="red">Warning</AlertTitle>
        <Typography marginRight={"3vmax"}>
          This Will Delete the Transaction — <strong>check it out!</strong>
        </Typography>
        <Box marginTop={"2vmax"} display={"flex"} justifyContent={"flex-end"}>
          <Button color="primary" onClick={deleteTransactionDialogOpenHandler}>
            Cancle
          </Button>
          <Button
            sx={{ color: "red" }}
            onClick={deleteTransactionConfirmedHandler}
          >
            Delete All
          </Button>
        </Box>
      </Alert>
    </Dialog>
  );
};

export default DeleteTransaction;
