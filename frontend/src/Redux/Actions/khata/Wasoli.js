import {
    generalLoadingTrue,
    generalLoadingFalse,
  } from "../../Slice/generalLoading";
  
  import axios from "axios";
  //   import { singleUserKhataSingleTransactionReducer } from "../../Slice/khata Slice/getSingleUserKhataSingleTransaction";
  import toast from "react-hot-toast";

  const Wasoli_Action =
    (khataId, wasoliBooleanVal, selectedDate) => async (dispatch) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {

        dispatch(generalLoadingTrue());
        const { data } = await axios.post(
          `/api/v1/wasoli/${khataId}`,{wasoliBooleanVal, selectedDate},
          config
        );

  
        toast.success(data.message);
  
        dispatch(generalLoadingFalse());
      } catch (error) {
        dispatch(generalLoadingFalse());
        console.log(error);
      }
    };



  export  const WasoliUndefined_Action =
    (khataId, wasoliBooleanVal, selectedDate) => async (dispatch) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {

        dispatch(generalLoadingTrue());
        const { data } = await axios.post(
          `/api/v1/wasoliUndefined/${khataId}`,{wasoliBooleanVal, selectedDate},
          config
        );

  
        
        dispatch(generalLoadingFalse());
        toast.success(data.message,{
          duration:5000
        });
      } catch (error) {
        dispatch(generalLoadingFalse());
        console.log(error);
      }
    };










  
  export default Wasoli_Action;
  