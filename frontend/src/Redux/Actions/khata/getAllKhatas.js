import {
  generalLoadingTrue,
  generalLoadingFalse,
} from "../../Slice/generalLoading";

import axios from "axios";
import {getAllKhataReducer} from "../../Slice/khata Slice/getAllKhataSlice"

const getAllKhatasAction = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch(generalLoadingTrue());
    const { data } = await axios.get("/api/v1/getAllKhatas", config);
    dispatch(getAllKhataReducer(data.khatas))
  


    dispatch(generalLoadingFalse());
  } catch (error) {
    dispatch(generalLoadingFalse());
    console.log(error);
  }
};

export default getAllKhatasAction;
