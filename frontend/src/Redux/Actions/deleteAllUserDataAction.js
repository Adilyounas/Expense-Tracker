import toast from "react-hot-toast";
import axios from "axios";

import {
  generalLoadingTrue,
  generalLoadingFalse,
} from "../Slice/generalLoading";

import {deleteTransactionReducer} from "../Slice/deleteTransaction"

const deleteAllUserData_Action = (id) => async (dispatch) => {
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

    const { data } = await axios.delete(`/api/v1/deleteAllUserData`, config);
    
    dispatch(deleteTransactionReducer(data.success))
   if (data.success === true) {
    toast.success(data.message)
   }

    //** */ <--------------- LOADING FALSE  ---------------->

    dispatch(generalLoadingFalse());
  } catch (error) {
    dispatch(generalLoadingFalse());
    // toast.error(error.response.data.message);
    console.log(error.response.data.message);
  }
};

export default deleteAllUserData_Action;
