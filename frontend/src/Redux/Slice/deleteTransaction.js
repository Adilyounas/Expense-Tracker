import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deleteTransactionSuccess: false,
};

export const DeleteSingleTransactionSlice = createSlice({
  name: "deleteSingleTransaction",
  initialState,
  reducers: {
    deleteTransactionReducer: (state, actions) => {
      state.deleteTransactionSuccess = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { deleteTransactionReducer } = DeleteSingleTransactionSlice.actions;

export default DeleteSingleTransactionSlice.reducer;
