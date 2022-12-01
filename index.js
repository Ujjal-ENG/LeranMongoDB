const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDatabase = require("./db");
dotenv.config();

const app = express();

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title of the product"],
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//create product model

const Product = mongoose.model("Products", productsSchema);


app.get("/", (req, res) => {
  res.send("WelCOme to the Home Page");
});

app.listen(process.env.PORT, async () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
  await connectDatabase();
});
