// db.js
const mongoose = require("mongoose");
const DB_NAME = process.env.DB_NAME || "";
const DB_USERNAME = process.env.DB_USERNAME || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";

const dbURI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.6yg6q.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(dbURI);

mongoose.connection.on("connected", function () {
  console.log(`Mongoose connection open to ${dbURI}`);
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose connection disconnected");
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose connection disconnected through app termination");
    process.exit(0);
  });
});
