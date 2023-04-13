const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  description: { type: String, required: true },
  pricing: { type: String, required: true },
  image: { type: String, required: false },
  shippingCost: { type: Number, required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
