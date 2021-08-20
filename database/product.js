const mongoose = require("mongoose");
const db = require("./connect.js");
mongoose.Promise = global.Promise;

const ProductsSchema = new mongoose.Schema(
  {
    name: String,
    desription: String,
    image: String,
    price: Number,
    number: Number,
    type: { type: String, default: "Products" },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Products", ProductsSchema);

module.exports = Products;
