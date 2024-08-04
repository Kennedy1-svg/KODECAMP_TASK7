const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "products",
    },
    totalCost: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  }
);

const orderSchema = new mongoose.Schema(
  {
    // order: {
    //   type: Array,
    //   required: true,
    // },
    order: [orderItemSchema],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);


orderSchema.plugin(mongoosePaginate);
const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
