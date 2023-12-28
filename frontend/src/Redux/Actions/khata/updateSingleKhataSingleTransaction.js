import {
  generalLoadingTrue,
  generalLoadingFalse,
} from "../../Slice/generalLoading";

import axios from "axios";
//   import { singleUserKhataSingleTransactionReducer } from "../../Slice/khata Slice/getSingleUserKhataSingleTransaction";
import toast from "react-hot-toast";

const updateSingleUserKhataDataSingleTransaction_Action =
  (khataId, id,updateValObj) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch(generalLoadingTrue());
      const { data } = await axios.put(
        `/api/v1/getSingleUserKhataOneTransaction_update/${khataId}?id=${id}`,updateValObj,
        config
      );

      toast.success(data.message);

      dispatch(generalLoadingFalse());
    } catch (error) {
      dispatch(generalLoadingFalse());
      console.log(error);
    }
  };

export default updateSingleUserKhataDataSingleTransaction_Action;
