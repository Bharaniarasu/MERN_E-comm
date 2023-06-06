const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const OrderModel = require("../models/orderModel");
const ProductModel = require("../models/productModel");

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
//get all logedin user order details - api/v1/myorders
exports.getLoginOrderData = catchAsyncErrors(async (req, res, next) => {
  const order = await OrderModel.find({ user: req.user.id });
  if (!order) {
    next(new ErrorHandler("Order not Exists."));
  }
  let totalAmount = 0;
  order.forEach((item) => {
    totalAmount += item.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    order,
  });
});

//ADMIN - get all  users order details - api/v1/myorders
exports.getAllUserOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await OrderModel.find();
  if (!orders) {
    next(new ErrorHandler("Order not Exists."));
  }
  let totalAmount = 0;
  orders.forEach((item) => {
    totalAmount += item.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});
//ADMIN - update order status - api/v1/order/:id

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id);
  if (!order) {
    next(new ErrorHandler("Order not Exists."));
  } else if (order.orderStatus === "Delivered") {
    next(new ErrorHandler("Order Hase been already Delivered."));
  }
  //update product stock based on orders
  else {
    order.orderItems.forEach(async (item, next) => {
      await updateStock(item.product, item.quantity, next);
    });
    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();
    await order.save();

    res.status(201).json({
      success: true,
      message: "Order status Updated.",
    });
  }
});
//ADMIN - update stock details for each orders
const updateStock = async (productId, quantity, next) => {
  const product = await ProductModel.findById(productId);
  if (product.stock < 1) {
    next(new ErrorHandler("Product Out of Stock."));
  } else {
    product.stock = product.stock - quantity;
    product.save({ validateBeforeSave: false });
  }
};

//ADMIN - Delete Order - api/v1/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id);
  // console.log(order);
  if (!order) {
    next(new ErrorHandler("Order does not Exists."));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
    message: "Order deleted.",
  });
});
