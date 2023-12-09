import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allTransaction_IncomeAndExpenseArr: [],
  filtered_IncomeAndExpenseArr: [],
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
    },

    modifiedData: (state, actions) => {
      state.filtered_IncomeAndExpenseArr = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { AllTransaction_IncomeAndExpense_Reducer, modifiedData } =
  All_IncomeAndExpense.actions;

export default All_IncomeAndExpense.reducer;
