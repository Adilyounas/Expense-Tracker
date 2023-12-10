import toast from "react-hot-toast";
import {
  generalLoadingTrue,
  generalLoadingFalse,
} from "../Slice/generalLoading";

import axios from "axios";
import { getUserDataSucess_true_Reducer } from "../../Redux/Slice/userDetails_Slice";

const resetPassword_Action = (password, confirmPassword, token,navigate) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Set to true to include credentials
  };

  try {
    dispatch(generalLoadingTrue());
    const { data } = await axios.put(`/api/v1/resetPassword/${token}`, { password, confirmPassword }, config);

    dispatch(getUserDataSucess_true_Reducer(true));

    navigate("/")

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

export default resetPassword_Action;
