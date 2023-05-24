const express = require("express");
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const router = express.Router();
//route to get the db datas
router.route("/products").get(getProducts);
//route to add a new data
router.route("/product/new").post(newProduct);
//route for get a single  product data
router.route("/product/:id").get(getSingleProduct);
//route for update a product
router.route("/product/:id").put(updateProduct);
//route for delete a product
router.route("/product/:id").delete(deleteProduct);
module.exports = router;
