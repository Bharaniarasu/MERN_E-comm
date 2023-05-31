const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const productModel = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
//get all products - /api/v1/products
exports.getProducts = async (req, res, next) => {
  console.log(req.cookies);

  const productPerPage = 3;
  const filteredProduct = new ApiFeatures(productModel.find(), req.query)
    .search()
    .filter()
    .paginate(productPerPage);
  //filterProduct returns a query
  const products = await filteredProduct.query;
  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};
//create new product - /api/v1/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  // adding schema on product about product creator
  console.log("user    ", req.user);
  req.body.createdBy = req.user.id;
  //adding datas with schema to database
  const product = await productModel.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
//get a single product values - /api/v1/product/:id (get)
//async error captured when enter an invalid product ID
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);
  //validation for show datas for a valid id // if no datas for given id 404 will trigger
  if (!product) {
    // return res.status(404).json({
    //   success: false,
    //   message: "Product NOT FOUND",
    // });
    //throwing new custom error by using error middleware
    //next to trigger the next middleware in app.js
    return next(new ErrorHandler("Product NOT FOUND !", 400));
  } else {
    res.status(201).json({
      success: true,
      product,
    });
  }
});
//update product details - /api/v1/product/:id (put)
exports.updateProduct = async (req, res, next) => {
  let product = await productModel.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product NOT FOUND",
    });
  } else {
    product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(product);

    res.status(200).json({
      success: true,
      product,
    });
  }
};
//Delete product details - /api/v1/product/:id (delete)
exports.deleteProduct = async (req, res, body) => {
  const product = await productModel.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product NOT FOUND",
    });
  } else {
    // Use deleteOne() Instead remove() function
    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted Successfully.",
    });
  }
};
