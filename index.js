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
  description: {
    type: String,
    required: [
      true,
      "Please provide a Product description elaborately for better understanding to the buyer user",
    ],
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

app.post("/products", async (req, res) => {
  try {
    //get data from request body
    const { title, price, description } = req.body;

    const newProduct = new Product({
      title,
      price,
      description,
    });

    const productData = await newProduct.save();
    res.status(201).send(productData);
    
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

app.listen(process.env.PORT, async () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
  await connectDatabase();
});
