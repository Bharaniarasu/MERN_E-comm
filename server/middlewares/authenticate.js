const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
//authentication for access products for logged users only
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.cookies);
  const { token } = req.cookies;
  //   console.log(token);

  if (!token) {
    next(new ErrorHandler("Login first for access this Resourse"), 401);
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  //   console.log(decode);
  //upcoming middlewares can access the req.user
  req.user = await userModel.findById(decode.id);
  // console.log("user  ", req.user);
  next();
});

//authenticate users for particular operations
//callback function will return
exports.autheriseUserRole =
  (...roles) =>
  (req, res, next) => {
    console.log(req.user.role);
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} is not autherized to access this Data`
        )
      );
    } else {
      next();
    }
  };
