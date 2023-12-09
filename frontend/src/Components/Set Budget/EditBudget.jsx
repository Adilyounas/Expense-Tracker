import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";

const EditBudget = (props) => {
  const {
    editBudgetOpen,
    editDialogOpenCloseHandler,
    inuptTextField,
    inputOnChangeHandler,
    editBudgetSubmitHandler,
    setEditBudgetOpen
  } = props;
  return (
    <Dialog open={editBudgetOpen} onClose={editDialogOpenCloseHandler}>
      <div className="addCategoryEditDialog_major">
        <form onSubmit={editBudgetSubmitHandler} className="addCategoryEditngDialog">
          <DialogTitle>Set New Budget</DialogTitle>
          <TextField
            name="value"
            required
            value={inuptTextField}
            onChange={inputOnChangeHandler}
            type="text"
            placeholder="Enter New Category"
            fullWidth
          />
          <DialogActions>
            <Button color="secondary" onClick={()=>setEditBudgetOpen(false)}>Cancel</Button>
            <Button type="submit" color="primary">
              Ok
            </Button>
          </DialogActions>
        </form>
      </div>
    </Dialog>
  );
};

export default EditBudget;
