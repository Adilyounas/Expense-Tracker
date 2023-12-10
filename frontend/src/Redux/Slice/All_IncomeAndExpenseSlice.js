import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allTransaction_IncomeAndExpenseArr: [],
  filtered_IncomeAndExpenseArr: [],
  stateForResetValues:[]
};

export const All_IncomeAndExpense = createSlice({
  name: "All_IncomesAnd_Expense",
  initialState,
  reducers: {
    AllTransaction_IncomeAndExpense_Reducer: (state, actions) => {
      state.allTransaction_IncomeAndExpenseArr = actions.payload;
      let exptractedData = [];
      actions.payload.forEach((month) => {
        month.data.forEach((transaction) => {
          exptractedData.push(transaction);
        });
      });
      state.filtered_IncomeAndExpenseArr = exptractedData;
      state.stateForResetValues = exptractedData;

    },

    modifiedData: (state, actions) => {
      state.filtered_IncomeAndExpenseArr = actions.payload;
    },
    resetFilterData_To_ApiFreshData_Reducer:(state, actions)=>{
      state.filtered_IncomeAndExpenseArr = state.stateForResetValues

    }
  },
});

// Action creators are generated for each case reducer function
export const { AllTransaction_IncomeAndExpense_Reducer, modifiedData,resetFilterData_To_ApiFreshData_Reducer } =
  All_IncomeAndExpense.actions;

export default All_IncomeAndExpense.reducer;
