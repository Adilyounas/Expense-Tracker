const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const validator = require("validator");
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter User Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter User Name"],
    unique: [true, "Email Is Occupied"],
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
 
  created: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }else{
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

  }
});

// *{<-------------JWT Token generating---------->}*
userSchema.methods.generatingGWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

// *{<-------------Forgot password Functionality---------->}*

userSchema.methods.ResetPasswordTokenGenerator = function () {
  //generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");
  //Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + process.env.RESETPASSWORDEXPIRE * 60 * 1000;
  return resetToken;
};




const User = new mongoose.model("User", userSchema);

module.exports = User;
