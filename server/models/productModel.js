const mongoose = require("mongoose");

//schema to define the given data.
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the Product Name"],
    trim: true,
    maxLength: [100, "Product name must be below 100 characters"],
  },
  price: {
    type: Number,
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter Product Description"],
  },
  ratings: {
    type: String,
    default: 0,
  },
  images: [{ image: { type: String, required: true } }],
  category: {
    type: String,
    required: [true, "Please Enter Product catagory"],
    enums: {
      values: [
        "Laptops",
        "Mobiles",
        "Electronics",
        "Accessories",
        "Headphones",
        "Men's Wear",
        "Women's Wear",
        "Books",
        "Sweets",
        "Food",
        "Footwear",
        "Sports",
        "Home",
      ],
      message: "Please select valid Catagory",
    },
  },
  seller: {
    type: String,
    required: [true, "Please Enter the Seller details"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter the Stock count"],
    maxLength: [40, "Product count must be less than 40"],
  },
  countOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
      },
      rating: { type: String, required: true },
      comment: { type: String, required: true },
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//it will return a model // plural of product set as db collection name
let productModel = mongoose.model("product", productSchema);

module.exports = productModel;
