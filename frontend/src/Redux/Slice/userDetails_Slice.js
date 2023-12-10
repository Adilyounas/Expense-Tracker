import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userFound: false,
  userData: {},
};

export const GetUserData = createSlice({
  name: "user Details",
  initialState,
  reducers: {
    getUserData_Reducer: (state, actions) => {
      const success_Var = actions.payload.success;
      const user_Var = actions.payload.user;

      state.userFound = success_Var;
      state.userData = user_Var;
    },
    getUserDataSucess_true_Reducer: (state, actions) => {
      state.userFound = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUserData_Reducer, getUserDataSucess_true_Reducer } =
  GetUserData.actions;

export default GetUserData.reducer;
