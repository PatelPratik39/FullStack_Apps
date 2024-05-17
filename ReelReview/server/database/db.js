const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB URI:", process.env.MONGO_URL);
const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("🥳 MongoDB connection Successfull 🥳");
});
connection.on("error", (error) => {
  console.log("❌  MongoDB connection Failed!! ❌", error);
});
