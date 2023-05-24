const app = require("./app");
const dotenv = require("dotenv");
const path = require("path");
const connectDatabase = require("./config/database");
//to handle uncaught exception like -->console.log(asd);
process.on("uncaughtException", (err) => {
  console.log(`ERROR  -  ${err}`);
  server.close(() => {
    process.exit(1);
  });
});
//need to connect .env file to use env variables
//need to mention the exact path , path used to ger the current Directory
dotenv.config({ path: path.join(__dirname, "config/config.env") });
//DB Connection
connectDatabase();

//creating port for the server
//process is normal in js , we can access env variables herre
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server Listening to the PORT : ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

//For Handling Unhandled Rejection Exception
//It runs when a promise declared without catch block , helps to find error for that catch block
process.on("unhandledRejection", (err) => {
  console.log(`ERROR   -   ${err}`);
  console.log("Unhandled Rejection Error Triggers to Node Shutdown");
  server.close(() => {
    process.exit(1);
  });
});
