import toast from "react-hot-toast";
import {
  generalLoadingTrue,
  generalLoadingFalse,
} from "../Slice/generalLoading";

import axios from "axios";

const forgotPassword_Action = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Set to true to include credentials
  };

  try {
    dispatch(generalLoadingTrue());
    const { data } = await axios.post(`/api/v1/forgotPassword`, { email }, config);
    if (data.success === true) {
      toast.success(data.message);
    }


    dispatch(generalLoadingFalse());
  } catch (error) {
    dispatch(generalLoadingFalse());
    toast.error(error.response.data.message);
    console.log(error.response.data.message);
  }
};

export default forgotPassword_Action;
