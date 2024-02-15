const { Schema, model, Types } = require("mongoose");

const CartSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
});

module.exports = model("Cart", CartSchema);
