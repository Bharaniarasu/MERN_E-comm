const express = require("express");
const {
  createUser,
  getUser,
} = require("../controllers/authenticationController");
const router = express.Router();

router.route("/register").post(createUser);
router.route("/userlist").get(getUser);

module.exports = router;
