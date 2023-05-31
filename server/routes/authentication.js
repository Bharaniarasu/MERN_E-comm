const express = require("express");
const {
  createUser,
  getUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authenticationController");
const router = express.Router();
//Register a new user - /api/v1/register
router.route("/register").post(createUser);
router.route("/userlist").get(getUser);
//login route /api/v1/login
router.route("/login").post(loginUser);
//logout route - /api/v1/logout
router.route("/logout").get(logoutUser);
//forgot password
router.route("/forgot/password").post(forgotPassword);
//reset password
router.route("/reset/password/:token").post(resetPassword);
module.exports = router;
