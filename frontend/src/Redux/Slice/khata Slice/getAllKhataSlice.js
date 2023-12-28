import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  khatas: [],
  filterKhatas: [],

  deneHanTotal: 0,
  leneHanTotal: 0,
};

export const getAllKhatasSlice = createSlice({
  name: "khatas",
  initialState,
  reducers: {
    getAllKhataReducer: (state, actions) => {
      const sortedKhatas = actions.payload.sort((a, b) => b.mainPriority - a.mainPriority)

      state.khatas = sortedKhatas
      state.filterKhatas = sortedKhatas

    }
  },
});

// Action creators are generated for each case reducer function
export const { getAllKhataReducer } = getAllKhatasSlice.actions;

export default getAllKhatasSlice.reducer;
