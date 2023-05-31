const express = require("express");
const app = express();
const products = require("./routes/products");
const authentication = require("./routes/authentication");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error");
//to set express to accept json post request
app.use(express.json());
// with out cookie parser we cannot get cookies // it will undefined always
app.use(cookieParser());
app.use("/api/v1", products);
app.use("/api/v1", authentication);

//if url not matches it came to the below middleware
app.use(errorMiddleware);
module.exports = app;
