import React, { useEffect, useState } from "react";
import "./login.css";
import "./forgotPassword.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import Loading from "../Loading/Loading";
import forgotPassword_Action from "../../Redux/Actions/forgotPassword_Action";


const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");

  const { userFound } = useSelector((state) => state.GetUserData);
  const { generalLoading } = useSelector((state) => state.generalLoading);

  const sendEmailHandler = () => {
    dispatch(forgotPassword_Action(email))
    setEmail("")
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
              <h2 id="headingCharm">Forgot Password</h2>
            </div>

            <Box className="login_body" component={"form"}>
              <TextField
                name="email"
                label="Email"
                type="email"
                fullWidth
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />

              <Button
                onClick={sendEmailHandler}
                variant="contained"
                type="submit"
                endIcon={<SendIcon />}
              >
                Send
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

export default ForgotPassword;
