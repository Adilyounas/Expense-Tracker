import {
    generalLoadingTrue,
    generalLoadingFalse,
  } from "../../Slice/generalLoading";
  
  import axios from "axios";
  //   import { singleUserKhataSingleTransactionReducer } from "../../Slice/khata Slice/getSingleUserKhataSingleTransaction";
  import toast from "react-hot-toast";
  
  const addTransactionInSingleKhata_Action =
    (khataId,transactionValues) => async (dispatch) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        dispatch(generalLoadingTrue());

        const { data } = await axios.post(
          `/api/v1/addTransactionInKhtata/${khataId}`,transactionValues,
          config
        );
  
        toast.success(data.message);
  
        dispatch(generalLoadingFalse());
      } catch (error) {
        dispatch(generalLoadingFalse());
        console.log(error);
      }
    };

 
  
  export default addTransactionInSingleKhata_Action;
  