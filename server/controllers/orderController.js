const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const OrderModel = require("../models/orderModel");
const ErrorHandler = require("../utils/errorHandler");

//Create new Order - api/v1/order/new
exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orerItems,
    shippingData,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentData,
  } = req.body;

  const order = await OrderModel.create({
    orerItems,
    shippingData,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentData,
    paidAt: Date.now(),
    user: req.user.id,
  });
  res.status(201).json({
    success: true,
    order,
  });
});

//get single order data - api/v1/order/:id

exports.getSingleOrderData = catchAsyncErrors(async (req, res, next) => {
  //populate to get name email from another users collection
  const order = await OrderModel.findById(req.params.id).populate(
    "user",
    "name email"
  );
  console.log(order);
  if (!order) {
    next(new ErrorHandler("Order not Exists."));
  }
  res.status(200).json({
    success: true,
    order,
  });
});
//get all order details - api/v1/order/all
exports.getUserOrderData = catchAsyncErrors(async (req, res, next) => {
  console.log("order");

  const order = await OrderModel.find({ user: req.user.id });
  //   if (!order) {
  //     next(new ErrorHandler("Order not Exists."));
  //   }
  res.status(200).json({
    success: true,
    order,
  });
});
