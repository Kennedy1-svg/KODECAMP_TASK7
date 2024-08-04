const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    productOwner: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);


productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model("products", productSchema);

module.exports = productModel;


