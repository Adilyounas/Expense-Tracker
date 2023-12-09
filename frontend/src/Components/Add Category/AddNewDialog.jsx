import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";

const AddNewDialog = (props) => {
  const {
    addNewDialogOpen,
    addNewDialogOpenCloseHandler,
    addNewCategoryChangeHandler,
    addNewCategorySubmitFormHandler,
    addNewCancelBtn
  } = props;
  return (
    <Dialog
      open={addNewDialogOpen}
      onClose={addNewDialogOpenCloseHandler}
      sx={{ borderRadius: "10px" }}
    >
      <div className="addCategoryEditDialog_major">
        <form onSubmit={addNewCategorySubmitFormHandler} className="addCategoryEditngDialog">
          <DialogTitle>Add New Category</DialogTitle>
          <TextField
            name="value"
            required
            //   value={textFieldValue}
            onChange={addNewCategoryChangeHandler}
            type="text"
            placeholder="Enter New Category"
            fullWidth
          />
          <DialogActions>
            <Button onClick={addNewCancelBtn} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">Ok</Button>
          </DialogActions>
        </form>
      </div>
    </Dialog>
  );
};

export default AddNewDialog;
