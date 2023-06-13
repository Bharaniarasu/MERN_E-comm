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
  //Get all products count by using product model to pad=ginate on frontend
  const totalProductCount = await productModel.countDocuments();

  //promise settimeout to delay the output
  // const promise = await new Promise((resolve) => setTimeout(resolve, 2000));
  // to set manual server error
  // return next(new ErrorHandler("Unable to get Data"));
  res.status(200).json({
    success: true,
    count: totalProductCount,
    products,
    productPerPage,
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

//Add Review API Service
exports.addReview = catchAsyncErrors(async (req, res, next) => {
  const { productId, rating, comment } = req.body;
  const review = { user: req.user.id, rating, comment };
  const product = await productModel.findById(productId);
  //check user already reviewed or not
  const isReviewed = product.reviews.find((item) => {
    return item.user.toString() == req.user.id.toString();
  });

  if (isReviewed) {
    product.reviews.forEach((item) => {
      //if reviewed , update the existing review
      if (item.user.toString() == req.user.id.toString()) {
        item.rating = rating;
        item.comment = comment;
      }
    });
  } else {
    //if not reviewed new review added
    product.reviews.push(review);
    product.countOfReviews = product.reviews.length;
  }
  //Find the average rating for the product
  product.ratings =
    product.reviews.reduce((acc, review) => {
      return +review.rating + acc;
    }, 0) / product.reviews.length;
  // if rating is empty it apply 0
  product.ratings = isNaN(product.ratings) ? 0 : product.ratings;
  await product.save({ validateBeforeSave: false });
  res.status(201).json({
    success: true,
    message: "Review added successfully",
  });
});

//Get Reviews -api/v1/reviews
exports.getReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await productModel.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete a review - api/v1/review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await productModel.findById(req.query.productId);
  //get all reviews excluding the given review id
  const filteredReviews = product.reviews.filter((review) => {
    return review._id.toString() !== req.query.id;
  });
  const countOfReviews = filteredReviews.length;
  //calculate the average of rating
  let ratings =
    product.reviews.reduce((acc, review) => {
      return +review.rating + acc;
    }, 0) / product.reviews.length;
  //checks rating is num or NAN
  ratings = isNaN(ratings) ? 0 : ratings;
  //update on db
  await productModel.findByIdAndUpdate(req.query.productId, {
    reviews: filteredReviews,
    countOfReviews,
    ratings,
  });
  res.status(200).json({
    success: true,
    message: "Review Removed.",
  });
});
