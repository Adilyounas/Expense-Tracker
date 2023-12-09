import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";

const AddNewPaymentMode = (props) => {
  const {
    addNewDialogOpen,
    addNewDialogOpenCloseHandler,
    addNewCategoryChangeHandler,
    addNewCategorySubmitFormHandler,
    addNewCancelBtn,
  } = props;
  return (
    <Dialog
      open={addNewDialogOpen}
      onClose={addNewDialogOpenCloseHandler}
      sx={{ borderRadius: "10px" }}
    >
      <div className="paymentmodeEditDialog_major">
        <form
          onSubmit={addNewCategorySubmitFormHandler}
          className="paymentModeEditngDialog"
        >
          <DialogTitle>Add New Mode</DialogTitle>
          <TextField
            name="value"
            required
            onChange={addNewCategoryChangeHandler}
            type="text"
            placeholder="Enter New Mode"
            fullWidth
          />
          <DialogActions>
            <Button onClick={addNewCancelBtn} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Ok
            </Button>
          </DialogActions>
        </form>
      </div>
    </Dialog>
  );
};

export default AddNewPaymentMode;
