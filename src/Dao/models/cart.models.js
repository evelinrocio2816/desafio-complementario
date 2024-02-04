const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  products: [
    {
      products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const CartModels =mongoose.model("carts", CartSchema)
module.exports= CartModels;