import toast from "react-hot-toast";
import axios from "axios";

import {
  generalLoadingTrue,
  generalLoadingFalse,
} from "../Slice/generalLoading";

import {getSingleTransactionReducer} from "../Slice/singleTransaction"


const singleTransactionAction = (id) => async (dispatch) => {
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

    const { data } = await axios.get(`/api/v1/allTransitions/${id}`, config);
    
    dispatch(getSingleTransactionReducer(data.transaction));

    //** */ <--------------- LOADING FALSE  ---------------->

    dispatch(generalLoadingFalse());
  } catch (error) {
    dispatch(generalLoadingFalse());
    toast.error(error.response.data.message);
    console.log(error.response.data.message);
  }
};

export default singleTransactionAction;
