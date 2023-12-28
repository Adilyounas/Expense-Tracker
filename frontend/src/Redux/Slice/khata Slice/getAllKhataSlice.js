import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  khatas: [],
  wasoliTrueKhatas: [],
};

export const getAllKhatasSlice = createSlice({
  name: "khatas",
  initialState,
  reducers: {
    getAllKhataReducer: (state, actions) => {
      const sortedKhatas = actions.payload.sort(
        (a, b) => b.mainPriority - a.mainPriority
      );
      state.khatas = sortedKhatas;

      const wasoliKhatas = [];

      if (sortedKhatas.length > 0) {
        const currentDate = new Date();
      
        sortedKhatas.forEach((entery) => {
          // Convert entery.wasoliDate to a Date object
          const wasoliDateObject = new Date(entery.wasoliDate);
      
          // Check if the dates have the same year, month, and day
          const isSameDate =
            entery.wasoli === true &&
            wasoliDateObject.getFullYear() === currentDate.getFullYear() &&
            wasoliDateObject.getMonth() === currentDate.getMonth() &&
            wasoliDateObject.getDate() === currentDate.getDate();
      
          if (isSameDate) {
            wasoliKhatas.push(entery);
          }
        });
      }
      

      state.wasoliTrueKhatas = wasoliKhatas;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAllKhataReducer } = getAllKhatasSlice.actions;

export default getAllKhatasSlice.reducer;
