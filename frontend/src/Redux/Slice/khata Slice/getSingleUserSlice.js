import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  khata: {},
};

export const singleUserKhataDataSlice = createSlice({
  name: "khata",
  initialState,
  reducers: {
    singleUserKhataDataReducer: (state, actions) => {
      state.khata = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { singleUserKhataDataReducer } = singleUserKhataDataSlice.actions;

export default singleUserKhataDataSlice.reducer;
