import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  generalLoading: false,
};

const generalLoading = createSlice({
  name: "generalLoading",
  initialState,
  reducers: {
    generalLoadingTrue: (state) => {
      state.generalLoading = true;
    },
    generalLoadingFalse: (state) => {
      state.generalLoading = false;
    },
  },
});

export const { generalLoadingTrue, generalLoadingFalse } =
  generalLoading.actions;

export default generalLoading.reducer;
