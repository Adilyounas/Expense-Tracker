import React, { useEffect, useState } from "react";
import "./register.css";
import "./login.css";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import registerAction from "../../Redux/Actions/registerAction";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const { generalLoading } = useSelector((state) => state.generalLoading);
  const navigate = useNavigate();

  const { userFound } = useSelector((state) => state.GetUserData);

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const registerOnChangeHandler = (e) => {
    const { name, value } = e.target;
    setRegisterData((old) => ({ ...old, [name]: value }));
  };

  const registerFormSubmitHandler = (e) => {
    e.preventDefault();
    if (registerData.password===registerData.confirmPassword) {
      dispatch(registerAction(registerData,navigate));
  
      setRegisterData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      
    }else{
      toast.error("Enter Same Password")
    }

  };

  useEffect(() => {
    if (userFound === true) {
      navigate("/");
    }
  }, [userFound, navigate]);

  return (
    <>
      {generalLoading ? (
        <Loading />
      ) : (
        <div className="login_Major_container">
          <div className="loginContainer ">
            <div className="login_Heading">
              <NavLink to={"/login"}>
                <KeyboardBackspaceIcon />
              </NavLink>
              <h2 id="headingCharm">Register</h2>
            </div>

            <Box
              onSubmit={registerFormSubmitHandler}
              className="regiser_body"
              component={"form"}
            >
              <TextField
                name="name"
                label="Name"
                fullWidth
                placeholder="Enter Your Name"
                required
                onChange={registerOnChangeHandler}
              />
              <TextField
                name="email"
                label="Email"
                fullWidth
                placeholder="Enter Your Email"
                required
                onChange={registerOnChangeHandler}
              />
              <TextField
                name="password"
                label="Password"
                fullWidth
                placeholder="Enter Your Password"
                required
                onChange={registerOnChangeHandler}
              />
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                fullWidth
                placeholder="Enter Your Password Again"
                required
                onChange={registerOnChangeHandler}
              />
              <Button variant="contained" type="submit" endIcon={<SendIcon />}>
                Register
              </Button>
            </Box>

            {/* <div className="login_Links">
          <NavLink to={"/forgotPassword"}>Forgot Password  </NavLink>
        </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
