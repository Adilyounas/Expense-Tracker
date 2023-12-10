import React, { useEffect, useState } from "react";
import "../Login-register-forgot/login.css";
import "../Login-register-forgot/forgotPassword.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../Loading/Loading";
import resetPassword_Action from "../../Redux/Actions/resetPassword";

const RestPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userFound } = useSelector((state) => state.GetUserData);
  const { generalLoading } = useSelector((state) => state.generalLoading);

  const resetPasswordHandler = () => {
    dispatch(resetPassword_Action(password, confirmPassword, token,navigate));
    setPassword("");
    setConfirmPassword("");
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
              <NavLink to={"/login"}>
                <KeyboardBackspaceIcon />
              </NavLink>
              <h2 id="headingCharm">Reset Password</h2>
            </div>

            <Box className="login_body" component={"form"}>
              <TextField
                name="password"
                label="Password"
                type="password"
                fullWidth
                placeholder="Enter Your Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                fullWidth
                placeholder="Enter Your Password Again"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />

              <Button
                onClick={resetPasswordHandler}
                variant="contained"
                type="submit"
                endIcon={<SendIcon />}
              >
                Reset
              </Button>
            </Box>

            {/* <div className="login_Links">
          <NavLink to={"/forgotPassword"}>Forgot Password </NavLink>
          <NavLink to={"/register"}>Register </NavLink>
        </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default RestPassword;
