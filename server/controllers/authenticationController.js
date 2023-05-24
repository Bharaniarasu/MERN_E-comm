const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const userModel = require("../models/userModel");

exports.createUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;
  const user = await userModel.create({ name, email, password, avatar });

  res.status(201).json({
    success: true,
    user,
  });
});

exports.getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await userModel.find();

  res.status(201).json({
    success: true,
    user,
  });
});
