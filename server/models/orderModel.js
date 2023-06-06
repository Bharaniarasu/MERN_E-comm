const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  shippingData: {
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Products",
      },
    },
  ],
  itemsPrice: {
    type: Number,
    default: 0.0,
  },
  taxPrice: {
    type: Number,
    default: 0.0,
  },
  shippingPrice: {
    type: Number,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    default: 0.0,
  },
  paymentData: {
    id: {
      type: String,
      required: true,
    },
    status: { type: String, required: true },
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  paidAt: {
    type: Date,
  },
  deliveredAt: {
    type: Date,
  },
});

let OrderModel = mongoose.model("Order", OrderSchema);
module.exports = OrderModel;
