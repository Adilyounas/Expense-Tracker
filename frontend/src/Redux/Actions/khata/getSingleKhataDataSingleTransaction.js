import {
    generalLoadingTrue,
    generalLoadingFalse,
  } from "../../Slice/generalLoading";
  
  import axios from "axios";
  import { singleUserKhataSingleTransactionReducer } from "../../Slice/khata Slice/getSingleUserKhataSingleTransaction";
  
  const getSingleUserKhataDataSingleTransaction_Action = (khataId,id) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch(generalLoadingTrue());
      const { data } = await axios.get(
        `/api/v1/getSingleUserKhataOneTransaction/${khataId}?id=${id}`,
        config
      );
      dispatch(singleUserKhataSingleTransactionReducer(data.singleKhataTransaction));
  
      dispatch(generalLoadingFalse());
    } catch (error) {
      dispatch(generalLoadingFalse());
      console.log(error);
    }
  };
  
  export default getSingleUserKhataDataSingleTransaction_Action;
  