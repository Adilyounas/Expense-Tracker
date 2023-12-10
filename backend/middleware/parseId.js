const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const parseId = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Login Required",
      });
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "Invalid token or expired",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
};

module.exports = { parseId };
