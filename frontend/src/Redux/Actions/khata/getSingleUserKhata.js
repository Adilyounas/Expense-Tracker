import {
  generalLoadingTrue,
  generalLoadingFalse,
} from "../../Slice/generalLoading";

import axios from "axios";
import { singleUserKhataDataReducer } from "../../Slice/khata Slice/getSingleUserSlice";

const getSingleUserKhataData_Action = (userId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch(generalLoadingTrue());
    const { data } = await axios.get(
      `/api/v1/getSingleUserKhata/${userId}`,
      config
    );
    dispatch(singleUserKhataDataReducer(data.singleUserKhata));

    dispatch(generalLoadingFalse());
  } catch (error) {
    dispatch(generalLoadingFalse());
    console.log(error);
  }
};

export default getSingleUserKhataData_Action;
