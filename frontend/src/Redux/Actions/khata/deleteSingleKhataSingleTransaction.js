import {
    generalLoadingTrue,
    generalLoadingFalse,
  } from "../../Slice/generalLoading";
  
  import axios from "axios";
  //   import { singleUserKhataSingleTransactionReducer } from "../../Slice/khata Slice/getSingleUserKhataSingleTransaction";
  import toast from "react-hot-toast";
  
  const deleteSingleUserKhataDataSingleTransaction_Action =
    (khataId, id,navigate) => async (dispatch) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        dispatch(generalLoadingTrue());
        const { data } = await axios.delete(
          `/api/v1/getSingleUserKhataOneTransaction_delete/${khataId}?id=${id}`,
          config
        );
  
        toast.success(data.message);

        navigate(-1)
  
        dispatch(generalLoadingFalse());
      } catch (error) {
        dispatch(generalLoadingFalse());
        console.log(error);
      }
    };
  
  export default deleteSingleUserKhataDataSingleTransaction_Action;
  