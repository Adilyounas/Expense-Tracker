const express = require("express");
const {
  register,
  login,
  logout,
  getUserDetails,
  forgotPass,
  resetPassword,
} = require("../Controller/userController");
const { parseId } = require("../middleware/parseId");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/getUserDetails").get(parseId, getUserDetails);
router.route("/forgotPassword").post(forgotPass);
router.route("/resetPassword/:token").put(resetPassword);

module.exports = router;
