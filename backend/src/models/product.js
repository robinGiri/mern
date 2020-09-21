const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    slug: {
      type: String,
      require: true,
      unique: true,
    },
    price: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    offre: {
      type: Number,
    },
    productImages: [{ image: { type: String } }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
