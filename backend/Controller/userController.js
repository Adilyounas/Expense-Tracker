const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const sendJWT = require("../utils/jwt");
const nodeMailer = require("nodemailer");
const crypto = require("crypto")

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

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// *{<-------------Forgot Password---------->}*
const forgotPass = async (req, res) => {
  let user;
  try {


    user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email",
      });
    }


    const resetToken = await user.ResetPasswordTokenGenerator();
    if (!resetToken) {
      return res.status(500).json({
        success: false,
        message: "Reset Password Token is Not Generated",
      });
    }

    await user.save({ validateBeforeSave: false });

    // const resetPasswordURL = `${req.protocol}://${req.get(
    //   "host"
    // )}/api/v1/resetPassword/${resetToken}`;

    const resetPasswordURL = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;

    const message = `Your Password Reset Token is :- \n\n ${resetPasswordURL} \n\n If you want to reset your password Then Click it OtherWise ignore It`;


    // let transporter = nodemailer.createTransport({
    //   host: 'your-smtp-server.com',
    //   port: 587,
    //   secure: false, // true for 465, false for other ports
    // });
    const transporter = nodeMailer.createTransport({
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      secure: true,
      auth: {
        user: process.env.SMPT_USER,
        pass: process.env.SMPT_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMPT_USER,
      to: user.email,
      subject: "One Project Password Recovery",
      text: message,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: `Sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// *{<-------------Reset Password---------->}*

const resetPassword = async (req, res) => {
  try {

    const { password, confirmPassword } = req.body;
    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Enter Password and Confirm Password Both",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password should be the same",
      });
    }


    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Token is Expired or Invalid, Try Again🙄",
      });
    }
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.password = password;

    await user.save();

    // *{<-------------using jwt file function---------->}*

    const message = "Password Reset Successfully";
    
    sendJWT(user, res, 200, message);
  } catch (error) {
    //Here cast error not happaning becasue findById() does not find user because of invalid id
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { register, login, logout, getUserDetails,forgotPass,resetPassword };
