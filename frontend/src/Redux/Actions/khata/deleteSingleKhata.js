import {
    generalLoadingTrue,
    generalLoadingFalse,
  } from "../../Slice/generalLoading";
  
  import axios from "axios";
  //   import { singleUserKhataSingleTransactionReducer } from "../../Slice/khata Slice/getSingleUserKhataSingleTransaction";
  import toast from "react-hot-toast";
  
  const delteSingleUserKhata_Action =
    (khataId,navigate) => async (dispatch) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        dispatch(generalLoadingTrue());
        const { data } = await axios.delete(
          `/api/v1/deleteSingleKhata/${khataId}`,
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
  
  export default delteSingleUserKhata_Action;
  