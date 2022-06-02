const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    password: String,
    role: {
      type: String,
      enum: ["ADMIN", "CUSTOMER"],
      default: "CUSTOMER"
    },
    orders: Array
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
