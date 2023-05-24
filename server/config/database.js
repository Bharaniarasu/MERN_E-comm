const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI, {
      useUnifiedTopology: true,
    })
    .then((conn) =>
      console.log(`MongoDB is connected on : ${conn.connection.host}`)
    );
  //to handle unhandled rejection excaption we omit the catch blog.
  //exception handled for all promises which is not handled the catch block
  // .catch((err) => console.log(err));
};

module.exports = connectDatabase;
