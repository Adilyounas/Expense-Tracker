import React from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  Typography,
} from "@mui/material";
const ClearAllRecordsDialog = (props) => {
  const {
    clearAllRecordDialogOpen,
    clearAllRecordDialogOpenHandler,
    clearAllRecordConfirmedHandler,
  } = props;

  return (
    <Dialog
      open={clearAllRecordDialogOpen}
      onClose={clearAllRecordDialogOpenHandler}
    >
      <Alert severity="warning">
        <AlertTitle color="red">Warning</AlertTitle>
        <Typography marginRight={"3vmax"}>
          This is a Clear All Records — <strong>check it out!</strong>
        </Typography>
        <Box marginTop={"2vmax"} display={"flex"} justifyContent={"flex-end"}>
          <Button color="primary" onClick={clearAllRecordDialogOpenHandler}>
            Cancle
          </Button>
          <Button
            sx={{ color: "red" }}
            onClick={clearAllRecordConfirmedHandler}
          >
            Delete All
          </Button>
        </Box>
      </Alert>
    </Dialog>
  );
};

export default ClearAllRecordsDialog;
