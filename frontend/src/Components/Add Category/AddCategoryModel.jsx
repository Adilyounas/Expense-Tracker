import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import "./addcategoryEditModal.css";

const AddCategoryModel = (props) => {
  const {
    categoryEditModelOpen,
    categoryEditModelOpenCloseHandler,
    textFieldValue,
    textFieldOnChangeHandler,
    cancelEditing,
    okDone,
  } = props;

  return (
    <Dialog
      open={categoryEditModelOpen}
      onClose={categoryEditModelOpenCloseHandler}
      sx={{borderRadius:"10px"}}
    >
      <div className="addCategoryEditDialog_major">
        <div className="addCategoryEditngDialog">
          <DialogTitle>Type To Edit</DialogTitle>
          <TextField
            name="value"
            value={textFieldValue}
            onChange={textFieldOnChangeHandler}
            type="text"
            fullWidth
          />
          <DialogActions>
            <Button onClick={cancelEditing} color="secondary">
              Cancel
            </Button>
            <Button onClick={okDone} color="primary">
              Ok
            </Button>
          </DialogActions>
        </div>
      </div>
    </Dialog>
  );
};

export default AddCategoryModel;
