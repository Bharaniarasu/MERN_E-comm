const productModel = require("../models/productModel");
const products = require("../data/products.json");
const dotenv = require("dotenv");
const path = require("path");
const connectDatabase = require("../config/database");

//need to connect database individually coz seeder file never connected withe server file or app file
dotenv.config({ path: path.join(__dirname, "../config/config.env") });
connectDatabase();
//db related operations are promises , so async func used
const seedProducts = async () => {
  try {
    await productModel.deleteMany();
    console.log("Existing products were REMOVED .");
    await productModel.insertMany(products);
    console.log("Product Datas added from Products.json file");
  } catch (err) {
    console.log(err.message);
  }
  //to stop node running
  process.exit();
};
seedProducts();
