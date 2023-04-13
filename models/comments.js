const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  images: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  rating: { type: Number, required: true },
  text: { type: String, required: true },
});

const Comments = mongoose.model("Comments", commentsSchema);

module.exports = Comments;
