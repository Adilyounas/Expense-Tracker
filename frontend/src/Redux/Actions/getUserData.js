import axios from "axios";

import {
  generalLoadingTrue,
  generalLoadingFalse,
} from "../Slice/generalLoading";

import {getUserData_Reducer} from "../Slice/userDetails_Slice"


const getUserDetails_Action = () => async (dispatch) => {
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

    const { data } = await axios.get(`/api/v1/getUserDetails`, config);
    
    dispatch(getUserData_Reducer(data));

    //** */ <--------------- LOADING FALSE  ---------------->

    dispatch(generalLoadingFalse());
  } catch (error) {
    dispatch(generalLoadingFalse());
    // setTimeout(() => {
    //   toast.error(error.response.data.message);
      
    // }, 3000);
    console.log(error.response.data.message);
  }
};

export default getUserDetails_Action;
