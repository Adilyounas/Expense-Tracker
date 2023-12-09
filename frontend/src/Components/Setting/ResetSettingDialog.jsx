import React from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  Typography,
} from "@mui/material";

const ResetSettingDialog = (props) => {
  const { resetDialogOpen, cancelResetHandler, clearSettingHandler } = props;
  return (
    <Dialog open={resetDialogOpen} onClose={cancelResetHandler}>
      <Alert severity="warning">
        <AlertTitle color="red">Warning</AlertTitle>
        <Typography marginRight={"3vmax"}>
          This is a Clear All Your Settings — <strong>check it out!</strong>
        </Typography>
        <Box marginTop={"2vmax"} display={"flex"} justifyContent={"flex-end"}>
          <Button color="primary" onClick={cancelResetHandler}>
            Cancle
          </Button>
          <Button color="secondary" onClick={clearSettingHandler}>
            Clear
          </Button>
        </Box>
      </Alert>
    </Dialog>
  );
};

export default ResetSettingDialog;
