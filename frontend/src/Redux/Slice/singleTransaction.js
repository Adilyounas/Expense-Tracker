import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singleTransactionData: {},
};

export const SingleTransaction = createSlice({
  name: "singleTransaction",
  initialState,
  reducers: {
    getSingleTransactionReducer: (state, actions) => {
      state.singleTransactionData = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getSingleTransactionReducer } = SingleTransaction.actions;

export default SingleTransaction.reducer;
