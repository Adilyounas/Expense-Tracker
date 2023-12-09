import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";

const EditStartDate = (props) => {
  const {
    editStartDateOpen,
    setEditStartDateOpen,

    editStartDateSubmitHandler,
    startDateInputField,
    editStartDateOpenCloseHandler,
    startDateInputFieldOnchangeHandler,
  } = props;
  return (
    <Dialog open={editStartDateOpen} onClose={editStartDateOpenCloseHandler}>
      <div className="addCategoryEditDialog_major">
        <form onSubmit={editStartDateSubmitHandler} className="addCategoryEditngDialog">
          <DialogTitle>Set Start Date</DialogTitle>
          <TextField
            name="value"
            required
            value={startDateInputField}
            onChange={startDateInputFieldOnchangeHandler}
            type="text"
            placeholder="Enter New Category"
            fullWidth
            
          />
          <DialogActions>
            <Button color="secondary" onClick={()=>setEditStartDateOpen(false)}>Cancel</Button>
            <Button type="submit" color="primary">
              Ok
            </Button>
          </DialogActions>
        </form>
      </div>
    </Dialog>
  );
};

export default EditStartDate;
