const express = require("express");
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  addReview,
  getReviews,
  deleteReview,
} = require("../controllers/productController");
const {
  isAuthenticatedUser,
  autheriseUserRole,
} = require("../middlewares/authenticate");
const router = express.Router();
//route to get the db datas //show the products if the user is authenticated //show datas only for autherised user roles
router.route("/products").get(getProducts);
//route to add a new data
router
  .route("/product/new")
  .post(isAuthenticatedUser, autheriseUserRole("admin"), newProduct);
//route for get a single  product data
router.route("/product/:id").get(getSingleProduct);
//route for update a product
router.route("/product/:id").put(updateProduct);
//route for delete a product
router.route("/product/:id").delete(deleteProduct);

//add review for a product
router
  .route("/review")
  .put(isAuthenticatedUser, addReview)
  .delete(isAuthenticatedUser, deleteReview);

//get product reviews
router.route("/reviews").get(isAuthenticatedUser, getReviews);
module.exports = router;
