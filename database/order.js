const mongoose = require("mongoose");
const db = require("./connect.js");
mongoose.Promise = global.Promise;

const OrderssSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    address: String,
    number: String,
    order: String,
    total: Number,
    type: { type: String, default: "Orders" },
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.model("Orders", OrderssSchema);

module.exports = Orders;
