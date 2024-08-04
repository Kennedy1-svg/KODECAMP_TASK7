const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

  
const checkedOutItems = new mongoose.Schema(
  // {
  //   order: {
  //     type: Array,
  //     required: true,
  //   },
  //   userId: {
  //     type: mongoose.Types.ObjectId,
  //     ref: "users",
  //   },
  // },
  // { timestamps: true }
);

checkedOutItems.plugin(mongoosePaginate);
const checkedOutModel = mongoose.model("order", checkedOutItems);

module.exports = checkedOutModel;
