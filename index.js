const express = require("express");
const path = require("path");
var cors = require("cors");
const app = express();
var bodyParser = require("body-parser");
const Product = require("./database/product.js");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// Serve only the static files form the dist directory
app.use(express.static("./dist/greenplay"));

// Crud Products //
app.get("/api/products", (req, res) => {
  Product.find({}, function (error, result) {
    if (error) console.log("this is error ====>", error);
    res.send(result);
  });
});
app.post("/api/products", (req, res) => {
  const newM = new Product(req.body);
  newM.save((err, result) => {
    res.send({ body: "ok" });
  });
});
app.put("/api/products/:id", (req, res) => {
  Product.updateOne({ _id: req.params.id }, req.body, function (error, result) {
    if (error) console.log("this is error ====>", error);
    res.send({ result: "done" });
  });
});
app.delete("/api/products/:id", (req, res) => {
  Product.deleteOne({ _id: req.params.id }, function (error, result) {
    if (error) console.log("this is error ====>", error);
    res.send(result);
  });
});
// end products crud //


app.listen(process.env.PORT || 3000, () => {
  console.log("hahaha");
});
