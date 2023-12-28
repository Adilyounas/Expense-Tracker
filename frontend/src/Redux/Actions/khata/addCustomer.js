import toast from "react-hot-toast";
import {
  generalLoadingTrue,
  generalLoadingFalse,
} from "../../Slice/generalLoading";

import axios from "axios";

const addCustomerAction = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch(generalLoadingTrue());
    const { data } = await axios.post(`/api/v1/addCustomer`, formData, config);
    if (data.message) {
      toast.success(data.message);
    }

    dispatch(generalLoadingFalse());
  } catch (error) {
    dispatch(generalLoadingFalse());
    console.log(error.response.data.message);
  }
};

export default addCustomerAction;
