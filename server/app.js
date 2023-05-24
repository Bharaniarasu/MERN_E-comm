const express = require("express");
const app = express();
const products = require("./routes/products");
const errorMiddleware = require("./middlewares/error");
//to set express to accept json post request
app.use(express.json());
app.use("/api/v1", products);
//if url not matches it came to the below middleware
app.use(errorMiddleware);
module.exports = app;
