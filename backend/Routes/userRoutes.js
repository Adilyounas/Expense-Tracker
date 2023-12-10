const express = require("express");
const { register, login, logout, getUserDetails } = require("../Controller/userController");
const {parseId} = require("../middleware/parseId")
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/getUserDetails").get(parseId,getUserDetails );


module.exports = router;
