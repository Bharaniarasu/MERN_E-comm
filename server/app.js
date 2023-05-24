const express = require("express");
const app = express();
const products = require("./routes/products");
const authentication = require("./routes/authentication");

const errorMiddleware = require("./middlewares/error");
//to set express to accept json post request
app.use(express.json());
app.use("/api/v1", products);
app.use("/api/v1", authentication);

//if url not matches it came to the below middleware
app.use(errorMiddleware);
module.exports = app;
