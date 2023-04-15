const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  shippingHistory: { type: String, required: false },
  shippingAddress: {
    streetAddress: { type: String, required: false },
    city: { type: String, required: false },
    country: { type: String, required: false },
    zip: { type: String, required: false },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
