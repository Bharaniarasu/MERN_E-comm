const {
  createOrder,
  getSingleOrderData,
  getLoginOrderData,
  getAllUserOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const {
  isAuthenticatedUser,
  autheriseUserRole,
} = require("../middlewares/authenticate");

const express = require("express");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, createOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrderData);
router.route("/myorders").get(isAuthenticatedUser, getLoginOrderData);
//Admin
router
  .route("/orders")
  .get(isAuthenticatedUser, autheriseUserRole("admin"), getAllUserOrders);
router
  .route("/order/:id")
  .put(isAuthenticatedUser, autheriseUserRole("admin"), updateOrder)
  .delete(isAuthenticatedUser, autheriseUserRole("admin"), deleteOrder);
module.exports = router;
