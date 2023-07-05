const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const GetUserToken = require("../utils/getUserToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
//Create New user - /api/v1/register
exports.createUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  let avatar;
  if (req.file) {
    let BASE_URL = process.env.BACKEND_URL;
    if (process.env.NODE_ENV === "production") {
      BASE_URL = `${req.protocol}://${req.get("host")}`;
    }
    avatar = `${BASE_URL}/uploads/users/${req.file.originalname}`;
  }
  const user = await userModel.create({ name, email, password, avatar });

  // console.log(token);
  GetUserToken(user, 201, res);
});

//login operation - /api/v1/login , with body email and password
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email and Password"));
  }
  //get user mail and password. password not shown on find. so we get that from select(+password)
  const user = await userModel.findOne({ email }).select("+password");
  // console.log(user);
  //validating userdata
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  } else if (!(await user.isValidPassword(password))) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  } else {
    GetUserToken(user, 201, res);
  }
});

//user logout operation - /api/v1/logout
// clear cookie will logout the user
exports.logoutUser = (req, res, next) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: "Logged Out Success",
    });
};

//forgot password - send token to reset password  - /api/v1/forgot/password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("Enter your valid Email ID"));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  console.log(resetToken);

  //Create reset URL
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/reset/password/${resetToken}`;
  console.log(resetUrl);

  //message to send password reset token to user mail
  const message = `To reset Your password click here \n\n ${resetUrl} . \n\n  If you did not do that, omit this message..`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request form TNkart",
      message,
    });

    res.status(200).json({
      success: true,
      messsage: `Kindly check your mail to recover your Password .`,
    });
  } catch (err) {
    //reset values and throw error
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(err.message, 500));
  }
});
//reset password - /api/v1/reset/password/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //hashing the token came from mail id
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  //validate if the password token expire time
  const user = await userModel.findOne({
    resetPasswordToken,
    resetPasswordTokenExpire: { $gt: Date.now() },
  });
  //validate user based on token and expiry time
  if (!user) {
    next(new ErrorHandler("Time Expired for Password Reset."));
  } else if (req.body.password != req.body.confirmPassword) {
    next(new ErrorHandler("Please check the passwords to be same."));
  } else {
    //need to set new password else it will be undefined
    user.password = req.body.password;
    //need to remobe token on db
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    GetUserToken(user, 201, res);
  }
});

//Get User Profile -/api/v1/myprofile
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await userModel.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

//Change logged in user password - /api/v1/myprofile/resetpassword
exports.resetUserPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await userModel.findById(req.user.id).select("+password");

  if (!(await user.isValidPassword(req.body.enteredOldPassword))) {
    next(new ErrorHandler("Please Enter valid old password."));
  }

  user.password = req.body.enteredNewPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password Changed.",
  });
});

//update user profile datas -  /api/v1/myprofile/updateprofile
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    avatar: req.body.avatar,
  };
  const user = await userModel.findByIdAndUpdate(req.user.id, newUserData, {
    //new to show updated data only
    new: true,
    //set validation based on schema
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "User Data Updated.",
  });
});

//ADMIN - get all userdata - /api/v1/admin/users
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const user = await userModel.find();

  res.status(200).json({
    success: true,
    user,
  });
});
//ADMIN - get all userdata - /api/v1/admin/user:id
exports.getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    next(new ErrorHandler(`User not found for the Given ID  ${req.params.id}`));
  }
  res.status(200).json({
    success: true,
    user,
  });
});
//ADMIN - update user profile datas -  /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    avatar: req.body.avatar,
    role: req.body.role,
  };
  const user = await userModel.findByIdAndUpdate(req.params.id, newUserData, {
    //new to show updated data only
    new: true,
    //set validation based on schema
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "User Data Updated.",
  });
});
//Admin - delete user profile - api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User NOT FOUND",
    });
  } else {
    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User Data Deleted.",
    });
  }
});
