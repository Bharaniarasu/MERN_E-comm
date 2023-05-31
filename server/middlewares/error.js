const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statuscode = err.statuscode || 400;

  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV == "development") {
    res.status(err.statuscode).json({
      success: false,
      message: err,
      stack: err.stack,
    });
  } else if (process.env.NODE_ENV == "production") {
    let message = err.message;
    let error = new Error(message);

    ////ValidationError
    if (err.name == "ValidationError") {
      message = Object.values(err.errors).map((value) => value.message);
      //  message= ["Please enter Product Description", "Please enter the Product Name"];
      //Error convert array into string, so we call that
      error = new Error(message);
    }
    ////CastError
    //when we access with invalid id,It will run
    //mongoose convert string id into object before check that is existing or not
    if ((err.name = "CastError")) {
      message = `Resource NOT FOUND for this ${err.path}`;
      error = new Error(message);
    }
    //handle error for chech DUplicate values
    if (err.code == 11000) {
      message = `Dulicate ${Object.keys(err.keyValue)}`;
      error = new Error(message);
    }

    res.status(err.statuscode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
