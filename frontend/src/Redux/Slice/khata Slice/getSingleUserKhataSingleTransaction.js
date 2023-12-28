import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singleKhataData_SingleTransaction: {},
};

export const singleUserKhataDataSingleTransaction_Slice = createSlice({
  name: "khata Single Transaction",
  initialState,
  reducers: {
    singleUserKhataSingleTransactionReducer: (state, actions) => {
      state.singleKhataData_SingleTransaction = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { singleUserKhataSingleTransactionReducer } = singleUserKhataDataSingleTransaction_Slice.actions;

export default singleUserKhataDataSingleTransaction_Slice.reducer;
