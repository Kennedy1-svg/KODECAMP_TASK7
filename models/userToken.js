const mongoose = require("mongoose");

const userTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    reset_PasswordToken: {
      type: String,
      required: true,
    },
    authPurpose: {
      type: String,
    },
  },
  { timestamps: true }
);

const userTokenModel = mongoose.model("userToken", userTokenSchema);

module.exports = userTokenModel;
