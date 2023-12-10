import toast from "react-hot-toast";
import {
  generalLoadingTrue,
  generalLoadingFalse,
} from "../Slice/generalLoading";

import { getUserDataSucess_true_Reducer } from "../../Redux/Slice/userDetails_Slice";


import axios from "axios";

const logout_Action = (navigate) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch(generalLoadingTrue());
    const { data } = await axios.get(`/api/v1/logout`, config);

    if (data.success === true) {
      toast.success(data.message);
    }
  
    dispatch(getUserDataSucess_true_Reducer(false));
    navigate("/login")

    dispatch(generalLoadingFalse());
  } catch (error) {
    dispatch(generalLoadingFalse());
    toast.error(error.response.data.message);
    console.log(error.response.data.message);
  }
};

export default logout_Action;
