const {
  createOrder,
  getSingleOrderData,
  getUserOrderData,
} = require("../controllers/orderController");
const { isAuthenticatedUser } = require("../middlewares/authenticate");

const express = require("express");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, createOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrderData);
router.route("/orders").get(isAuthenticatedUser, getUserOrderData);

module.exports = router;
