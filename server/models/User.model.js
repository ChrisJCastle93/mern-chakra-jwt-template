const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
    googleId: String,
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;