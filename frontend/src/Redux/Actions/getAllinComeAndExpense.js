import axios from "axios";

import {
  generalLoadingTrue,
  generalLoadingFalse,
} from "../Slice/generalLoading";

import {
   AllTransaction_IncomeAndExpense_Reducer 
} from "../Slice/All_IncomeAndExpenseSlice";

const getAllIncomeAndExpenses = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Set to true to include credentials
  };

  try {
    //** */ <--------------- LOADING TRUE  ---------------->

    dispatch(generalLoadingTrue());

    //TODO <--------------- GETTING ALL INCOME SENDING DATA TO REDUCER  ---------------->

    const { data } = await axios.get(`/api/v1/getAllTransactions`, config);
    // dispatch(allTransactionHeading_Reducer(data.containerForHeading));
    dispatch(AllTransaction_IncomeAndExpense_Reducer(data.monthArray));



    //** */ <--------------- LOADING FALSE  ---------------->

    dispatch(generalLoadingFalse());
  } catch (error) {
    dispatch(generalLoadingFalse());
    // toast.error(error.response.data.message);
    console.log(error.response.data.message);
  }
};

export default getAllIncomeAndExpenses;
