import React, { useState } from "react";
import { Box } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { NavLink } from "react-router-dom";
import "./paymentMode.css";
// import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import AddCategoryModel from "./AddCategoryModel";
// import AddNewDialog from "./AddNewDialog";
import EditPaymentDialog from "./EditPaymentDialog";
import AddNewPaymentMode from "./AddNewPaymentMode";

import { v4 as uuidv4 } from "uuid";

const AddCategory = () => {
  //TODO <---- EVERY FIRST CALL RECIEVING DATA FROM LOCAL STORAGE  --------->

  const paymentData = JSON.parse(localStorage.getItem("paymentMode"));

  //TODO <---------------  USESTATES   --------------------->

  const [categoryEditModelOpen, setCategoryEditModelOpen] = useState(false);
  const [addNewDialogOpen, setAddNewDialogOpen] = useState(false);
  const [categoryDataVal, setCategoryDataVal] = useState({});
  const [re_Render, setRe_Render] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState("");
  const [addNewCategoryTextField, setAddNewCategoryTextField] = useState({
    id: "",
    name: "",
    value: "",
  });

  //TODO <============================== ADD NEW FORM SUBMIT HANDLER   =========================================>

  const addNewCategorySubmitFormHandler = (e) => {
    e.preventDefault();
    let localStorageValuesBeforAdding = JSON.parse(
      localStorage.getItem("paymentMode")
    );
    localStorageValuesBeforAdding.push(addNewCategoryTextField);

    localStorage.setItem(
      "paymentMode",
      JSON.stringify(localStorageValuesBeforAdding)
    );
    setAddNewDialogOpen(!addNewDialogOpen);
    setRe_Render(!re_Render);
  };

  //TODO <============================== BUTTONS  =========================================>

  //** */ <------------------------  Ok & Cancel Btn for - EDIT ----------------------------->

  const okDone = () => {
    if (textFieldValue) {
      //add fresh data
      let newArr = [];
      paymentData.forEach((ele) => {
        if (ele.value === categoryDataVal.value) {
          ele.value = textFieldValue;
          ele.value =
            ele.value.charAt(0).toUpperCase() +
            ele.value.slice(1).toLowerCase();
          newArr.push(ele);
        } else {
          newArr.push(ele);
        }
      });

      localStorage.setItem("paymentMode", JSON.stringify(newArr));
      setCategoryDataVal({});
      setTextFieldValue("");
      setCategoryEditModelOpen(!categoryEditModelOpen);
      setRe_Render(!re_Render);
    } else {
      //do noting
      setCategoryEditModelOpen(!categoryEditModelOpen);
    }
  };
  const cancelEditing = () => {
    setCategoryEditModelOpen(!categoryEditModelOpen);
  };

  //** */ <------------------------  Ok & Cancel Btn for - ADD NEW ----------------------------->

  const addNewCancelBtn = () => {
    setAddNewDialogOpen(!addNewDialogOpen);
  };

  //** */ <---------------------  Edit Btn  --------------->

  const paymentModeEditHandler = (val) => {
    setTextFieldValue(val.value);
    setCategoryDataVal(val);
    setCategoryEditModelOpen(!categoryEditModelOpen);
  };

  //** */ <---------------------  DELETE Btn  --------------->

  const paymentModeDeleteHandler = (e) => {
    const id = e.id;

    const filterArr = paymentData.filter((ele) => {
      return id !== ele.id;
    });
    localStorage.removeItem("paymentMode");
    localStorage.setItem("paymentMode", JSON.stringify(filterArr));
    setRe_Render(!re_Render);
  };

  //TODO <============================== ONCHANGE HANDLER  =========================================>

  //** */ <---------------------  Input edit Onchange   --------------->
  const textFieldOnChangeHandler = (e) => {
    setTextFieldValue(e.target.value);
  };

  //** */ <---------------------  Input Add new Onchange   --------------->
  const addNewCategoryChangeHandler = (e) => {
    let firstLetter = e.target.value;
    let remaingLetters = e.target.value;
    let lowerCase = e.target.value;
    //we need name all small so,
    lowerCase.toLowerCase();
    //we need value First Capital and other smal so,,

    const UperValue =
      firstLetter.charAt(0).toUpperCase() +
      remaingLetters.slice(1).toLowerCase();

    setAddNewCategoryTextField((old) => ({
      ...old,
      value: UperValue,
      name: lowerCase,
    }));
  };

  //TODO <============================== OPEN AND CLOSE HANDLER  =========================================>

  //** */ <---------------------  OPEN AND CLOSE HANDLER - Edit    --------------->

  const categoryEditModelOpenCloseHandler = () => {
    setCategoryEditModelOpen(!categoryEditModelOpen);
  };

  //** */ <---------------------  OPEN AND CLOSE HANDLER - Add New    --------------->

  const addNewDialogOpenCloseHandler = () => {
    setAddNewDialogOpen(!addNewDialogOpen);

    //generating an unique Id......................
    setAddNewCategoryTextField((old) => ({ ...old, id: uuidv4() }));
  };

  //TODO <============================== USEFFECT HOOK  =========================================>

  React.useEffect(() => {}, [re_Render]);

  return (
    <>
      <div id="paymentMode_Major_Container">
        <AddNewPaymentMode
          addNewCategoryChangeHandler={addNewCategoryChangeHandler}
          addNewDialogOpen={addNewDialogOpen}
          addNewDialogOpenCloseHandler={addNewDialogOpenCloseHandler}
          addNewCategorySubmitFormHandler={addNewCategorySubmitFormHandler}
          addNewCancelBtn={addNewCancelBtn}
        />

        <EditPaymentDialog
          textFieldOnChangeHandler={textFieldOnChangeHandler}
          textFieldValue={textFieldValue}
          categoryEditModelOpen={categoryEditModelOpen}
          categoryEditModelOpenCloseHandler={categoryEditModelOpenCloseHandler}
          okDone={okDone}
          cancelEditing={cancelEditing}
        />

        <div className="addPayment">
          <Box className="addpaymentmode_title">
            <span>
              <NavLink to={"/"}>
                <KeyboardBackspaceIcon />
              </NavLink>
              <h2 id="headingCharm">Add Pay Mode</h2>
            </span>

            <span className="spanlinks">
              {/* <NavLink>
                <SearchIcon />
              </NavLink> */}
              <NavLink onClick={addNewDialogOpenCloseHandler}>
                <AddCircleOutlineIcon />
              </NavLink>
            </span>
          </Box>

          {paymentData &&
            paymentData.map((e) => (
              <Box key={e.id} component={"div"} id="addPaymentMode_body">
                <span className="addPaymentModeName" name={e.name}>
                  {e.value}
                </span>
                <span className="addPaymentModeIcons">
                  <EditIcon onClick={() => paymentModeEditHandler(e)} />
                  <DeleteIcon onClick={() => paymentModeDeleteHandler(e)} />
                </span>
              </Box>
            ))}
        </div>
      </div>
    </>
  );
};

export default AddCategory;
