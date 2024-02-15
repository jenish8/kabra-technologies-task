const { Schema, model, Types } = require("mongoose");

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    photo: {
      type: String,
      require: true,
    },
    details: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    stock: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", ProductSchema);
