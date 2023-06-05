const express = require("express");
const {
  createUser,
  getAllUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  resetUserPassword,
  updateUserProfile,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/authenticationController");
const {
  isAuthenticatedUser,
  autheriseUserRole,
} = require("../middlewares/authenticate");
const router = express.Router();
//Register a new user - /api/v1/register
router.route("/register").post(createUser);

//login route /api/v1/login
router.route("/login").post(loginUser);
//logout route - /api/v1/logout
router.route("/logout").get(logoutUser);
//forgot password
router.route("/forgot/password").post(forgotPassword);
//reset password
router.route("/reset/password/:token").post(resetPassword);
//get login user profile
router.route("/myprofile").get(isAuthenticatedUser, getUserProfile);
// reset logged in user password
router
  .route("/myprofile/resetpassword")
  .put(isAuthenticatedUser, resetUserPassword);
//update user profile data
router
  .route("/myprofile/updateprofile")
  .put(isAuthenticatedUser, updateUserProfile);

//ADMIN -  Get all user datas -/api/v1/userlist
router
  .route("/admin/users")
  .get(isAuthenticatedUser, autheriseUserRole("admin"), getAllUser);

//ADMIN - Get a particular user data - update and delete
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, autheriseUserRole("admin"), getUser)
  .put(isAuthenticatedUser, autheriseUserRole("admin"), updateUser)
  .delete(isAuthenticatedUser, autheriseUserRole("admin"), deleteUser);

module.exports = router;
