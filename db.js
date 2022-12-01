const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const url = process.env.MONGO_URL;
const connectDatabase = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/testProductDB");
    console.log("db is connected");
  } catch (error) {
    console.log("db is not connected and error is ", error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
