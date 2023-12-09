const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const sendJWT = require("../utils/jwt");

const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "User not Created or Added",
      });
    }
    const message = "Register Successfully";
    sendJWT(user, res, 201, message);
  } catch (error) {
    if (error.code === 11000) {
      res.status(500).json({
        success: false,
        message: `${error.keyValue.email} Email Already Taken`,
      });
    } else {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const message = "Login Successfully";
    sendJWT(user, res, 200, message);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// *{<-------------logOut---------->}*
const logout = async (req, res) => {
  try {
    const options = {
      expires: new Date(Date.now()),
      httpOnly: true,
    };

    res.status(200).cookie("token", null, options).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { register, login, logout };
