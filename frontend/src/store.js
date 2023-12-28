import { configureStore } from "@reduxjs/toolkit";
import addIncomeReducer from "./Redux/Slice/addIncomeSlice";
import generalLoading from "./Redux/Slice/generalLoading";
import All_IncomeAndExpenseSlice from "./Redux/Slice/All_IncomeAndExpenseSlice";
import SingleTransaction from "./Redux/Slice/singleTransaction";
import DeleteSingleTransactionSlice  from "./Redux/Slice/deleteTransaction";
import  GetUserData  from "./Redux/Slice/userDetails_Slice";
import getAllKhatasSlice from "./Redux/Slice/khata Slice/getAllKhataSlice"
import singleUserKhataDataSlice from "./Redux/Slice/khata Slice/getSingleUserSlice"
import singleUserKhataDataSingleTransaction_Slice from "./Redux/Slice/khata Slice/getSingleUserKhataSingleTransaction"


const store = configureStore({
  reducer: {
    addIncomeReducer,
    generalLoading,
    All_IncomeAndExpenseSlice,
    SingleTransaction,
    DeleteSingleTransactionSlice,
    GetUserData,
    getAllKhatasSlice,
    singleUserKhataDataSlice,
    singleUserKhataDataSingleTransaction_Slice
  },
});

export default store;
