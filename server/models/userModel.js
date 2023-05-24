const mongoose = require("mongoose");
//validator library for validating the email and some other datas
const validator = require("validator");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Username"],
  },
  email: {
    type: String,
    required: [true, "Please enter Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter valid Email ID"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    minLength: [8, "Enter a valid password must be above 8 characters"],
    maxLength: [15, "Enter a valid password below 15 characters"],
  },
  avatar: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "User",
  },
  resetPasswordToken: String,
  resetTokenExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
//pre runs before db process // use normal function here
UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
});
let userModel = mongoose.model("User", UserSchema);
module.exports = userModel;
