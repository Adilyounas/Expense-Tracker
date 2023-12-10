import React from "react";
import "./menu.css";
import { Box, Drawer } from "@mui/material";
import expenseTracker from "../../Assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import CategoryIcon from "@mui/icons-material/Category";
import PaymentsIcon from "@mui/icons-material/Payments";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import logout_Action from "../../Redux/Actions/logoutAction"
import {useDispatch} from "react-redux"

const Menu = (props) => {
  const { menuDrawerOpen, menuDrawerHander } = props;
  const dispatch = useDispatch();


  const navigate = useNavigate();


  const logOutHandler = ()=>{
    dispatch(logout_Action(navigate))
  }

  return (
    <Drawer open={menuDrawerOpen} onClose={menuDrawerHander}>
      <Box id="manu_major_Container">
        <div className="manu_Container">
          <NavLink>
            <div className="logoSection" onClick={menuDrawerHander}>
              <img src={expenseTracker} alt="logo" />
              <Box
                display={"flex"}
                justifyContent={"center"}
                flexDirection={"column"}
              >
                <span>
                  {" "}
                  <s>Expense </s>{" "}
                </span>
                <span>Tracker</span>
              </Box>
            </div>
          </NavLink>

          <div className="detailSetting">
            <div>
              <MenuBookIcon />
              <a href="/">How to use</a>
            </div>
            <div>
              <CategoryIcon />
              <NavLink to={"/addCategory"}>Add Category</NavLink>
            </div>
            <div>
              <PaymentsIcon />
              <NavLink to={"/paymentModes"}>Payment Mode</NavLink>
            </div>
            <div>
              <PsychologyAltIcon />
              <NavLink to={"/setBudget"}>Set Budget</NavLink>
            </div>
            <div>
              <SettingsIcon />
              <NavLink to={"/settings"}>Setting</NavLink>
            </div>

            <div>
              <LogoutIcon />
              <NavLink onClick={logOutHandler}>Logout</NavLink>
            </div>
          </div>
        </div>
      </Box>
    </Drawer>
  );
};

export default Menu;
