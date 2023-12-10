import React, { useEffect, useState } from "react";
import "./login.css";
// import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { NavLink } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import loginAction from "../../Redux/Actions/loginAction";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const { generalLoading } = useSelector((state) => state.generalLoading);

  const { userFound } = useSelector((state) => state.GetUserData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginOnChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((old) => ({ ...old, [name]: value }));
  };

  const loginFormSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginAction(data, navigate));
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
          <div className="loginContainer">
            <div className="login_Heading">
              {/* <NavLink>
          <KeyboardBackspaceIcon />
          </NavLink> */}
              <h2 id="headingCharm">Login</h2>
            </div>

            <Box
              onSubmit={loginFormSubmitHandler}
              className="login_body"
              component={"form"}
            >
              <TextField
                name="email"
                label="Email"
                fullWidth
                required
                placeholder="Enter Your Email"
                onChange={loginOnChangeHandler}
              />
              <TextField
                name="password"
                label="Password"
                fullWidth
                required
                placeholder="Enter Your Password"
                onChange={loginOnChangeHandler}
              />
              <Button variant="contained" type="submit" endIcon={<SendIcon />}>
                Login
              </Button>
            </Box>

            <div className="login_Links">
              <NavLink to={"/forgotPassword"}>Forgot Password </NavLink>
              <NavLink to={"/register"}>Register </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
